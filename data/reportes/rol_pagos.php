<?php
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

    // datos generales factura
    $resp = $class->consulta("SELECT P.id, P.nombres_completos, P.cedula_identificacion, R.fecha_rol, P.sueldo, R.neto_pagar, R.codigo_rol, D.horas, D.dias_laborados, D.extras, D.sueldo_mes, D.horas_extras, D.comisiones, D.decimo_tercero, D.decimo_cuarto, D.total_ingresos, D.aporte_iess, D.quirografarios, D.anticipos, D.atrasos, D.permisos, D.total_descuentos, D.faltas, D.multas, R.fecha_creacion, D.dias_no_laborados, D.mes, D.prestamos, D.servicios, D.acumulable FROM corporativo.personal P, rol_pagos.rol_pagos R, rol_pagos.detalle_rol_pagos D where R.id = D.id_rol_pagos and P.id = R.id_personal and R.id = '".$_GET['id']."'");
    while ($row = $class->fetch_array($resp)) {
        $id_personal= $row[0];
        $nombres= $row[1];
        $cedula= $row[2];
        $fecha = $row[3];
        $sueldo = $row[4];
        $neto_pagar = $row[5];
        $codigo = $row[6];
        $tiempos_horas = $row[7];
        $dias_laborados = $row[8];
        $horas_trabajadas = $row[9];
        $sueldo_basico = $row[10];
        $horas_extras = $row[11];
        $comisiones = $row[12];
        $decimo_tercero = $row[13];
        $decimo_cuarto = $row[14];
        $total_ingresos = $row[15];
        $aporte_iess = $row[16];
        $prestamos_qui = $row[17];
        $anticipos = $row[18];
        $atrasos = $row[19];
        $permisos = $row[20];
        $total_descuentos = $row[21];
        $faltas = $row[22];
        $multas = $row[23];
        $fecha_creacion = substr($row[24], 10, 9);
        $dias_no_laborados = $row[25];
        $mes = $row[26];
        $prestamos = $row[27];
        $servicios = $row[28];
        $acumulable = $row[29];
    }
    // fin

    // consulta cargos    
    $resp = $class->consulta("SELECT C.nombre FROM corporativo.cargos_asignacion G, corporativo.cargos C, corporativo.personal P where P.id = G.id_personal and C.id = G.id_cargos  and G.id_personal = '".$id_personal."'");
    while ($row = $class->fetch_array($resp)) {
        $cargo = $row[0];
    }
    // fin

    // consulta areas
    $resp = $class->consulta("SELECT C.nombre FROM corporativo.personal P, corporativo.areas C, corporativo.cargos_asignacion A WHERE A.id_personal = P.id AND A.id_areas = C.id AND A.id_personal = '".$id_personal."'");
    while ($row = $class->fetch_array($resp)) {
        $area = $row[0];
    }
    // fin

    // Logo
    if ($area == 'OYEFM IBARRA 93.1') {
       $this->Image('oye.jpg',30,7,160);
    } else {
        $this->Image('logo_conceptual.jpg',50,5,100);   
    }
    // fin
    
    // Arial bold 9
    $this->SetFont('Arial','B',14);
    // Movernos a la derecha
    $this->Cell(80);
    // Título
    $this->Cell(65,50,'ROL DE PAGOS '.$mes,0,0,'C');
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(20, 31, 50, 8, 1.5, 'DF');
    
    $this->SetTextColor(255,87,51);
    $this->Text(22, 37, utf8_decode($codigo),1,0, 'L',0);/////cargos

    $this->SetTextColor(25,25,25);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(15, 45, 185, 20, 1.5, 'DF');

    $this->SetFont('Arial','B',9);
    $this->Text(18, 50, 'EMPLEADO:',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(39, 50, maxCaracter(utf8_decode($nombres),23),1,0, 'L',0);/////nombres completos
    $this->SetFont('Arial','B',9);
    $this->Text(18, 56, 'CARGO:',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(32, 56, utf8_decode($cargo),1,0, 'L',0);/////cargos
    $this->SetFont('Arial','B',9);
    $this->Text(18, 62, 'SUELDO:',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(34, 62, utf8_decode($sueldo),1, 'L');

    $this->SetFont('Arial','B',9);
    $this->Text(100, 50, 'PAGO:',1, 'L');
    $this->SetFont('Arial','',9);
    $mydate = strtotime($fecha);
    $this->Text(111, 50, utf8_decode(strftime("%d / %B / %Y", $mydate)),1, 'L');
    $this->SetFont('Arial','B',9);
    $this->Text(100, 56, 'HORA:',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(110, 56, $fecha_creacion,1, 'L');
    $this->SetFont('Arial','B',9);
    $this->Text(100, 62, utf8_decode('DÍAS NO LAB:'),1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(122, 62, $dias_no_laborados,1, 'L');

    $this->SetFont('Arial','B',9);
    $this->Text(145, 50, 'HORAS DIARIAS:',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(174, 50, $tiempos_horas,1, 'L');
    $this->SetFont('Arial','B',9);
    $this->Text(145, 56, utf8_decode('DÍAS LAB:'),1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(163, 56, $dias_laborados,1, 'L');
    $this->SetFont('Arial','B',9);
    $this->Text(145, 62, utf8_decode('HORAS EXTRAS:'),1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(174, 62, $horas_trabajadas,1, 'L');
    //Salto de línea

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(15, 67, 91, 52, 1.5, 'DF');

    $this->SetFont('Arial','B',9);
    $this->Text(45, 72, 'INGRESOS',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(18, 77, 'Sueldo Mes', 1, 'L');
    $this->SetY(73);
    $this->SetX(75);
    $this->multiCell(22, 6, '$ '.number_format($sueldo_basico, 2, '.', ''),0,'R');

    $this->Text(18, 82, 'Horas Extras', 1, 'L');
    $this->SetY(78);
    $this->SetX(75);
    $this->multiCell(22, 6, '$ '.number_format($horas_extras, 2, '.', ''),0,'R');

    $this->Text(18, 87, 'Comisiones', 1, 'L');
    $this->SetY(83);
    $this->SetX(75);
    $this->multiCell(22, 6, '$ '.number_format($comisiones, 2, '.', ''),0,'R');

    if ($acumulable == 'SI') {
        $this->Text(18, 92, utf8_decode('Décimo Tercero'), 1, 'L');
        $this->SetY(88);
        $this->SetX(75);
        $this->multiCell(22, 6, '$ '.number_format('0.00', 2, '.', ''),0,'R');

        $this->Text(18, 97, utf8_decode('Décimo Cuarto'), 1, 'L');
        $this->SetY(93);
        $this->SetX(75);
        $this->multiCell(22, 6, '$ '.number_format('0.00', 2, '.', ''),0,'R');

        $total_ingresos = $total_ingresos - $decimo_tercero - $decimo_cuarto;
        $neto_pagar = $total_ingresos - $total_descuentos;      
    } else {
        if ($acumulable == 'NO') {
            $this->Text(18, 92, utf8_decode('Décimo Tercero'), 1, 'L');
            $this->SetY(88);
            $this->SetX(75);
            $this->multiCell(22, 6, '$ '.number_format($decimo_tercero, 2, '.', ''),0,'R');

            $this->Text(18, 97, utf8_decode('Décimo Cuarto'), 1, 'L');
            $this->SetY(93);
            $this->SetX(75);
            $this->multiCell(22, 6, '$ '.number_format($decimo_cuarto, 2, '.', ''),0,'R');
        }
    }

    $this->Text(18, 102, utf8_decode('Servicios Prestados'), 1, 'L');
    $this->SetY(98);
    $this->SetX(75);
    $this->multiCell(22, 6, '$ '.number_format($servicios, 2, '.', ''),0,'R');

    $this->SetFont('Arial','B',9);
    $this->Text(18, 117, utf8_decode('TOTAL INGRESOS'), 1, 'L');
    $this->SetY(113);
    $this->SetX(75);
    $this->multiCell(22, 6, '$ '.number_format($total_ingresos, 2, '.', ''),0,'R');

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(108, 67, 92, 52, 1.5, 'DF');

    $this->Text(140, 72, 'DESCUENTOS',1, 'L');
    $this->SetFont('Arial','',9);
    $this->Text(111, 77, 'Aporte al IESS', 0, 'L');
    $this->SetY(73);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($aporte_iess, 2, '.', ''),0,'R');

    $this->Text(111, 82, utf8_decode('Préstamos Quirografarios'), 1, 'L');
    $this->SetY(78);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($prestamos_qui, 2, '.', ''),0,'R');

    $this->Text(111, 87, utf8_decode('Préstamos'), 1, 'L');
    $this->SetY(83);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($prestamos, 2, '.', ''),0,'R');

    $this->Text(111, 92, utf8_decode('Anticipos'), 1, 'L');
    $this->SetY(88);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($anticipos, 2, '.', ''),0,'R');

    $this->Text(111, 97, utf8_decode('Atrasos'), 1, 'L');
    $this->SetY(93);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($atrasos, 2, '.', ''),0,'R');

    $this->Text(111, 102, utf8_decode('Permisos'), 1, 'L');
    $this->SetY(98);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($permisos, 2, '.', ''),0,'R');

    $this->Text(111, 107, utf8_decode('Faltas'), 1, 'L');
    $this->SetY(103);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($faltas, 2, '.', ''),0,'R');

    $this->Text(111, 112, utf8_decode('Multas'), 1, 'L');
    $this->SetY(108);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($multas, 2, '.', ''),0,'R');

    $this->SetFont('Arial','B',9);
    $this->Text(111, 117, utf8_decode('TOTAL DESCUENTOS'), 1, 'L');
    $this->SetY(112);
    $this->SetX(168);
    $this->multiCell(22, 6, '$ '.number_format($total_descuentos, 2, '.', ''),0,'R');

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(15, 121, 185, 7, 1.5, 'DF');

    $this->Text(60, 126, utf8_decode('NETO A PAGAR'), 1, 'L');
    $this->Text(110, 126, utf8_decode('$ '.$neto_pagar), 1, 'L');
    $this->SetFont('Arial','B',8);
    $this->Text(13, 135, utf8_decode('REALIZADO POR:'), 1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(39, 135, utf8_decode($_SESSION['user']['name']),1,'L');
    $this->Text(160, 140, utf8_decode('RECIBÍ CONFORME'), 1, 'L');
    $this->Text(163, 143, utf8_decode('C.I: '.$cedula), 1, 'L');

    $this->SetDash(1,1);
    $this->Line(200,136,150,136);
    }
}
    // $pdf = new PDF();
    $pdf = new PDF('L','mm','A5');
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('rol_pagos_individual.pdf','I');
?>