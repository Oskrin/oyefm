<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require('../../fpdf/fpdf.php');
include_once('../../admin/class.php');
include_once('../../admin/funciones_generales.php');
date_default_timezone_set('America/Guayaquil');
setlocale (LC_TIME,"spanish");
session_start();
    
class PDF extends FPDF {

function RoundedRect($x, $y, $w, $h, $r, $style = '') {
    $k = $this->k;
    $hp = $this->h;
    if($style == 'F')
        $op='f';
    elseif($style == 'FD' || $style == 'DF')
        $op ='B';
    else
        $op ='S';
    $MyArc = 4/3 * (sqrt(2) - 1);
    $this->_out(sprintf('%.2F %.2F m',($x+$r)*$k,($hp-$y)*$k ));
    $xc = $x+$w-$r ;
    $yc = $y+$r;
    $this->_out(sprintf('%.2F %.2F l', $xc*$k,($hp-$y)*$k ));

    $this->_Arc($xc + $r*$MyArc, $yc - $r, $xc + $r, $yc - $r*$MyArc, $xc + $r, $yc);
    $xc = $x+$w-$r ;
    $yc = $y+$h-$r;
    $this->_out(sprintf('%.2F %.2F l',($x+$w)*$k,($hp-$yc)*$k));
    $this->_Arc($xc + $r, $yc + $r*$MyArc, $xc + $r*$MyArc, $yc + $r, $xc, $yc + $r);
    $xc = $x+$r ;
    $yc = $y+$h-$r;
    $this->_out(sprintf('%.2F %.2F l',$xc*$k,($hp-($y+$h))*$k));
    $this->_Arc($xc - $r*$MyArc, $yc + $r, $xc - $r, $yc + $r*$MyArc, $xc - $r, $yc);
    $xc = $x+$r ;
    $yc = $y+$r;
    $this->_out(sprintf('%.2F %.2F l',($x)*$k,($hp-$yc)*$k ));
    $this->_Arc($xc - $r, $yc - $r*$MyArc, $xc - $r*$MyArc, $yc - $r, $xc, $yc - $r);
    $this->_out($op);
}

function _Arc($x1, $y1, $x2, $y2, $x3, $y3) {
    $h = $this->h;
    $this->_out(sprintf('%.2F %.2F %.2F %.2F %.2F %.2F c ', $x1*$this->k, ($h-$y1)*$this->k,
        $x2*$this->k, ($h-$y2)*$this->k, $x3*$this->k, ($h-$y3)*$this->k));
}

function SetLineStyle($style) {
    extract($style);
    if (isset($width)) {
        $width_prev = $this->LineWidth;
        $this->SetLineWidth($width);
        $this->LineWidth = $width_prev;
    }
    if (isset($cap)) {
        $ca = array('butt' => 0, 'round'=> 1, 'square' => 2);
        if (isset($ca[$cap]))
            $this->_out($ca[$cap] . ' J');
    }
    if (isset($join)) {
        $ja = array('miter' => 0, 'round' => 1, 'bevel' => 2);
        if (isset($ja[$join]))
            $this->_out($ja[$join] . ' j');
    }
    if (isset($dash)) {
        $dash_string = '';
        if ($dash) {
            $tab = explode(', ', $dash);
            $dash_string = '';
            foreach ($tab as $i => $v) {
                if ($i > 0)
                    $dash_string .= ' ';
                $dash_string .= sprintf('%.2F', $v);
            }
        }
        if (!isset($phase) || !$dash)
            $phase = 0;
        $this->_out(sprintf('[%s] %.2F d', $dash_string, $phase));
    }
    if (isset($color)) {
        list($r, $g, $b) = $color;
        $this->SetDrawColor($r, $g, $b);
    }
} 

function Line($x1, $y1, $x2, $y2, $style = null) {
    if ($style)
        $this->SetLineStyle($style);
    parent::Line($x1, $y1, $x2, $y2);
}

function SetDash($black = false, $white = false) {
    if($black and $white)
        $s = sprintf('[%.3f %.3f] 0 d', $black*$this->k, $white*$this->k);
    else
        $s = '[] 0 d';
    $this->_out($s);
}

//Cabecera de página
function Header() {   
    $class = new constante();
    $fecha_corta = $class->fecha();

    //Logo
    $this->Image('logo.png',8,10,30);
    $mydate1 = strtotime($_GET['fecha_inicio']);
    $mydate2 = strtotime($_GET['fecha_fin']);

    $departamento = 'GENERAL';
    $resp = $class->consulta("SELECT * FROM corporativo.areas WHERE id = '$_GET[id_areas]' AND estado = '1'");
    while ($row = $class->fetch_array($resp)) {
        $departamento = $row[1];
    }   
    
    $this->SetFont('Arial','B',6);
    $this->Text(130, 10, utf8_decode('NÓMINA GENERAL'),1, 'L');
    $this->Text(130, 14, $departamento,1, 'L');
    $this->Text(130, 18, 'FECHA INICIO:   '.utf8_encode('2017-03-26'),1, 'L');
    $this->Text(180, 18, 'FECHA CORTE:   '.utf8_encode('2017-04-25'),1, 'L');
    $this->Text(130, 22, 'MES:   '.utf8_encode('ABRIL'),1, 'L');
    $this->Text(180, 22, 'FECHA IMPRESION:   '.utf8_encode($fecha_corta),1, 'L');
    //$this->Text(130, 18, 'FECHA INICIO:   '.utf8_encode(strftime("%A, %d de %B de %Y", $mydate1)),1, 'L');
    //$this->Text(130, 22, 'FECHA CORTE:   '.utf8_encode(strftime("%A, %d de %B de %Y", $mydate2)),1, 'L');

    $this->SetY(30);
    $this->SetX(8);
    $this->multiCell(8, 6, utf8_decode('N°'),1,'C');

    $this->SetY(30);
    $this->SetX(16);
    $this->multiCell(48, 6, utf8_decode('NOMBRES APELLIDOS:'),1,'C');

    $this->SetY(24);
    $this->SetX(64);
    $this->multiCell(16, 12, utf8_decode('C.I.'),1,'C');

    $this->SetY(24);
    $this->SetX(80);
    $this->multiCell(10, 12, utf8_decode('DÍAS'),1,'C');

    $this->SetY(24);
    $this->SetX(90);
    $this->multiCell(11, 12, utf8_decode('EXTRAS'),1,'C');

    $this->SetY(24);
    $this->SetX(101);
    $this->multiCell(16, 12, utf8_decode('COMISIONES'),1,'C');

    $this->SetY(24);
    $this->SetX(117);
    $this->multiCell(11, 12, utf8_decode('SUELDO'),1,'C');

    $this->SetY(24);
    $this->SetX(128);
    $this->multiCell(13, 6, utf8_decode('DÉCIMO TERCERO'),1,'C');

    $this->SetY(24);
    $this->SetX(141);
    $this->multiCell(13, 6, utf8_decode('DÉCIMO CUARTO'),1,'C');

    $this->SetY(24);
    $this->SetX(154);
    $this->multiCell(14, 6, utf8_decode('TOTAL INGRESOS'),1,'C');

    $this->SetY(24);
    $this->SetX(168);
    $this->multiCell(52, 6, utf8_decode('DESCUENTOS'),1,'C');

    $this->SetY(30);
    $this->SetX(168);
    $this->multiCell(13, 6, utf8_decode('SEGURO'),1,'C');

    $this->SetY(30);
    $this->SetX(181);
    $this->multiCell(13, 6, utf8_decode('FALTAS'),1,'C');

    $this->SetY(30);
    $this->SetX(194);
    $this->multiCell(13, 6, utf8_decode('ATRASOS'),1,'C');

    $this->SetY(30);
    $this->SetX(207);
    $this->multiCell(13, 6, utf8_decode('MULTAS'),1,'C');

    $this->SetY(24);
    $this->SetX(220);
    $this->multiCell(13, 12, utf8_decode('PRÉSTAM.'),1,'C');

    $this->SetY(24);
    $this->SetX(233);
    $this->multiCell(13, 12, utf8_decode('ANTICIPO.'),1,'C');

    $this->SetY(24);
    $this->SetX(246);
    $this->multiCell(13, 6, utf8_decode('QUIROGRAFARIOS.'),1,'C');

    $this->SetY(24);
    $this->SetX(259);
    $this->multiCell(13, 12, utf8_decode('PERMISO.'),1,'C');

    $this->SetY(24);
    $this->SetX(272);
    $this->multiCell(13, 6, utf8_decode('TOTAL PAGAR'),1,'C');

    if ($_GET['id_areas'] == '') {
        $resp = $class->consulta("SELECT P.nombres_completos, P.cedula_identificacion, N.dias_laborados, N.horas_extras, N.comisiones, N.sueldo_mes, N.decimo_tercero, N.decimo_cuarto, N.total_ingresos, N.aporte_iess, N.faltas, N.atrasos, N.multas, N.anticipos, N.neto_pagar, N.fecha_nomina, N.prestamos, N.quirografarios, N.permisos FROM rol_pagos.nomina N, corporativo.personal P WHERE N.fecha_nomina BETWEEN '$_GET[fecha_inicio]' AND '$_GET[fecha_fin]' AND N.id_personal = P.id");    
    } else {
        $resp = $class->consulta("SELECT P.nombres_completos, P.cedula_identificacion, N.dias_laborados, N.horas_extras, N.comisiones, N.sueldo_mes, N.decimo_tercero, N.decimo_cuarto, N.total_ingresos, N.aporte_iess, N.faltas, N.atrasos, N.multas, N.anticipos, N.neto_pagar, N.fecha_nomina, N.prestamos, N.quirografarios, N.permisos FROM rol_pagos.nomina N, corporativo.personal P, corporativo.cargos_asignacion A WHERE N.fecha_nomina BETWEEN '$_GET[fecha_inicio]' AND '$_GET[fecha_fin]' AND N.id_personal = P.id AND A.id_areas = '$_GET[id_areas]' AND A.id_personal = P.id");    
    }
    
    $posiciony = 36;
    $count = 1;
    $total_pagar = 0;
    $total_anticipos = 0;
    $total_prestamos = 0;
    $total_multas = 0;
    $total_atrasos = 0;
    $total_faltas = 0;
    $total_quirografarios = 0;
    $total_permisos = 0;
    $total_total = 0;
    $total_sueldo = 0;
    $total_tercero = 0;
    $total_cuarto = 0;
    $total_aporte = 0;
    $total_comisiones = 0;
    $total_extras = 0;

    while ($row = $class->fetch_array($resp)) {
        $nombres_completos = $row[0];
        $cedula_identificacion = $row[1];
        $dias_laborados = $row[2];
        $horas = $row[3];
        $comisiones = $row[4];
        $sueldo_mes = $row[5];
        $decimo_tercero = $row[6];
        $decimo_cuarto = $row[7];
        $total_ingresos = $row[8];
        $aporte = $row[9];
        $faltas = $row[10];
        $atrasos = $row[11];
        $multas = $row[12];
        $anticipos = $row[13];
        $neto_pagar = $row[14];
        $prestamos = $row[16];
        $quirografarios = $row[17];
        $permisos = $row[18];
        
        $this->SetY($posiciony);
        $this->SetX(8);
        $this->multiCell(8,6, utf8_decode($count),1);   

        $this->SetY($posiciony);
        $this->SetX(16);
        $this->multiCell(48,6, maxCaracter(utf8_decode($nombres_completos),35),1);

        $this->SetY($posiciony);
        $this->SetX(64);
        $this->multiCell(16,6, utf8_decode($cedula_identificacion),1);

        $this->SetY($posiciony);
        $this->SetX(80);
        $this->multiCell(10,6, utf8_decode($dias_laborados),1,'C');

        $this->SetY($posiciony);
        $this->SetX(90);
        $this->multiCell(11,6, utf8_decode($horas),1);

        $this->SetY($posiciony);
        $this->SetX(101);
        $this->multiCell(16,6, utf8_decode($comisiones),1);

        $this->SetY($posiciony);
        $this->SetX(117);
        $this->multiCell(11,6, utf8_decode($sueldo_mes),1);

        $this->SetY($posiciony);
        $this->SetX(128);
        $this->multiCell(13,6, utf8_decode($decimo_tercero),1);

        $this->SetY($posiciony);
        $this->SetX(141);
        $this->multiCell(13,6, utf8_decode($decimo_cuarto),1);

        $this->SetY($posiciony);
        $this->SetX(154);
        $this->multiCell(14,6, utf8_decode($total_ingresos),1);

        $this->SetY($posiciony);
        $this->SetX(168);
        $this->multiCell(13,6, utf8_decode($aporte),1);

        $this->SetY($posiciony);
        $this->SetX(181);
        $this->multiCell(13,6, utf8_decode($faltas),1);

        $this->SetY($posiciony);
        $this->SetX(194);
        $this->multiCell(13,6, utf8_decode($atrasos),1);

        $this->SetY($posiciony);
        $this->SetX(207);
        $this->multiCell(13,6, utf8_decode($multas),1);

        // if($nombres_completos == 'GIRALDO MONTOYA LAURA ALEJANDRA') {
        //     $this->SetY($posiciony);
        //     $this->SetX(220);
        //     $this->multiCell(13,6, utf8_decode($prestamos. '        6/6'),1);
        // } else {
        //     $this->SetY($posiciony);
        //     $this->SetX(220);
        //     $this->multiCell(13,6, utf8_decode($prestamos),1);
           
        // }

        $this->SetY($posiciony);
        $this->SetX(220);
        $this->multiCell(13,6, utf8_decode($prestamos),1);

        $this->SetY($posiciony);
        $this->SetX(233);
        $this->multiCell(13,6, utf8_decode($anticipos),1);

        $this->SetY($posiciony);
        $this->SetX(246);
        $this->multiCell(13,6, utf8_decode($quirografarios),1);

        $this->SetY($posiciony);
        $this->SetX(259);
        $this->multiCell(13,6, utf8_decode($permisos),1);
 
        $this->SetY($posiciony);
        $this->SetX(272);
        $this->SetFillColor(255, 255, 0);
        $this->MultiCell(13, 6, utf8_decode('$ '. $neto_pagar), 1, 'C', 1, 0, '', '', true, 0, false, true, 0);

        // $this->multiCell(18,6, utf8_decode('$ '. $neto_pagar),1);

        $total_pagar = $total_pagar + $neto_pagar;
        $total_anticipos = $total_anticipos + $anticipos;
        $total_prestamos = $total_prestamos + $prestamos;
        $total_multas = $total_multas + $multas;
        $total_atrasos = $total_atrasos + $atrasos;
        $total_faltas = $total_faltas + $faltas;
        $total_quirografarios = $total_quirografarios + $quirografarios;
        $total_permisos = $total_permisos + $permisos;
        $total_total = $total_total + $total_ingresos;
        $total_sueldo = $total_sueldo + $sueldo_mes;
        $total_tercero = $total_tercero + $decimo_tercero;
        $total_cuarto = $total_cuarto + $decimo_cuarto;
        $total_aporte = $total_aporte + $aporte;
        $total_comisiones = $total_comisiones + $comisiones;
        $total_extras = $total_extras + $horas;

        $posiciony = $posiciony + 6;
        $count = $count + 1;
    }

    // $posiciony = $posiciony + 6;

    $this->SetY($posiciony);
    $this->SetX(8);
    $this->multiCell(56,6, utf8_decode('SUMA TOTAL'),1);

    $this->SetY($posiciony);
    $this->SetX(64);
    $this->multiCell(16,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(80);
    $this->multiCell(10,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(90);
    $this->multiCell(11,6, utf8_decode(number_format($total_extras, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(101);
    $this->multiCell(16,6, utf8_decode(number_format($total_comisiones, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(117);
    $this->multiCell(11,6, utf8_decode(number_format($total_sueldo, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(128);
    $this->multiCell(13,6, utf8_decode($total_tercero),1);

    $this->SetY($posiciony);
    $this->SetX(141);
    $this->multiCell(13,6, utf8_decode($total_cuarto),1);

    $this->SetY($posiciony);
    $this->SetX(154);
    $this->multiCell(14,6, utf8_decode(number_format($total_total, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(168);
    $this->multiCell(13,6, utf8_decode($total_aporte),1);

    $this->SetY($posiciony);
    $this->SetX(181);
    $this->multiCell(13,6, utf8_decode(number_format($total_faltas, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(194);
    $this->multiCell(13,6, utf8_decode(number_format($total_atrasos, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(207);
    $this->multiCell(13,6, utf8_decode(number_format($total_multas, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(220);
    $this->multiCell(13,6, utf8_decode(number_format($total_prestamos, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(233);
    $this->multiCell(13,6, utf8_decode(number_format($total_anticipos, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(246);
    $this->multiCell(13,6, utf8_decode(number_format($total_quirografarios, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(259);
    $this->multiCell(13,6, utf8_decode(number_format($total_permisos, 3, '.', '')),1);

    $this->SetY($posiciony);
    $this->SetX(272);
    $this->multiCell(13,6, utf8_decode('$ '.$total_pagar),1, 'C');

    $this->Text(65, 195, utf8_decode('REVISADO POR'), 1, 'L');
    $this->Text(215, 195, utf8_decode('APROBADO POR'), 1, 'L');

    $this->SetDash(1,1);
    $this->Line(50,190,100,190);

    $this->SetDash(1,1);
    $this->Line(200,190,250,190);
    }
}
    // $pdf = new PDF();
    $pdf = new PDF('L','mm','A4');
    // $pdf=new FPDF('L','mm','A4');
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('rol_pagos_general.pdf','I');
?>