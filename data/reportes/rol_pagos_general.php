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

    //Logo
    $this->Image('logo.png',8,10,30);
    $mydate1 = strtotime($_GET['fecha_inicio']);
    $mydate2 = strtotime($_GET['fecha_fin']);  
    
    $this->SetFont('Arial','B',6);
    $this->Text(130, 10, 'ROL PAGOS GENERAL',1, 'L');
    $this->Text(133, 14, 'RADIO OYE 93.1 FM',1, 'L');
    $this->Text(130, 18, 'FECHA INICIO:   '.utf8_encode(strftime("%A, %d de %B de %Y", $mydate1)),1, 'L');
    $this->Text(130, 22, 'FECHA FIN:   '.utf8_encode(strftime("%A, %d de %B de %Y", $mydate2)),1, 'L');

    $this->SetY(30);
    $this->SetX(8);
    $this->multiCell(56, 6, utf8_decode('NOMBRES APELLIDOS:'),1,'C');

    $this->SetY(24);
    $this->SetX(64);
    $this->multiCell(20, 12, utf8_decode('C.I.'),1,'C');

    $this->SetY(24);
    $this->SetX(84);
    $this->multiCell(36, 6, utf8_decode('DÍAS LABORABLES'),1,'C');

    $this->SetY(30);
    $this->SetX(84);
    $this->multiCell(18, 6, utf8_decode('DESDE'),1,'C');

    $this->SetY(30);
    $this->SetX(102);
    $this->multiCell(18, 6, utf8_decode('HASTA'),1,'C');

    $this->SetY(24);
    $this->SetX(120);
    $this->multiCell(10, 12, utf8_decode('DÍAS'),1,'C');

    $this->SetY(24);
    $this->SetX(130);
    $this->multiCell(15, 12, utf8_decode('HORAS'),1,'C');

    $this->SetY(24);
    $this->SetX(145);
    $this->multiCell(16, 12, utf8_decode('COMISIONES'),1,'C');

    $this->SetY(24);
    $this->SetX(161);
    $this->multiCell(19, 12, utf8_decode('SUELDO'),1,'C');

    $this->SetY(24);
    $this->SetX(180);
    $this->multiCell(20, 6, utf8_decode('TOTAL INGRESOS'),1,'C');

    $this->SetY(24);
    $this->SetX(200);
    $this->multiCell(45, 6, utf8_decode('DESCUENTOS'),1,'C');

    $this->SetY(30);
    $this->SetX(200);
    $this->multiCell(15, 6, utf8_decode('FALTAS'),1,'C');

    $this->SetY(30);
    $this->SetX(215);
    $this->multiCell(15, 6, utf8_decode('ATRASOS'),1,'C');

    $this->SetY(30);
    $this->SetX(230);
    $this->multiCell(15, 6, utf8_decode('MULTAS'),1,'C');

    $this->SetY(24);
    $this->SetX(245);
    $this->multiCell(20, 6, utf8_decode('PRÉSTAMOS Y ANTICIPOS'),1,'C');

    $this->SetY(24);
    $this->SetX(265);
    $this->multiCell(20, 12, utf8_decode('TOTAL A PAGAR'),1,'C');

    $resp = $class->consulta("SELECT P.nombres_completos, P.cedula_identificacion, D.dias_laborados, D.horas_extras, D.comisiones, D.sueldo_mes, D.total_ingresos, D.faltas, D.atrasos, D.multas, D.anticipos, R.neto_pagar, R.fecha_rol, P.id  FROM rol_pagos.rol_pagos R, corporativo.personal P, rol_pagos.detalle_rol_pagos D WHERE R.fecha_rol BETWEEN '$_GET[fecha_inicio]' AND '$_GET[fecha_fin]' AND  R.id_personal = P.id AND D.id_rol_pagos = R.id;");
    $posiciony = 36;
    $total_pagar = 0;

    while ($row = $class->fetch_array($resp)) {
        $nombres_completos = $row[0];
        $cedula_identificacion = $row[1];
        $dias_laborados = $row[2];
        $horas = $row[3];
        $comisiones = $row[4];
        $sueldo_mes = $row[5];
        $total_ingresos = $row[6];
        $faltas = $row[7];
        $atrasos = $row[8];
        $multas = $row[9];
        $anticipos = $row[10];
        $neto_pagar = $row[11];
        $id = $row[13];

        $this->SetY($posiciony);
        $this->SetX(8);
        $this->multiCell(56,6, utf8_decode($nombres_completos),1);

        $this->SetY($posiciony);
        $this->SetX(64);
        $this->multiCell(20,6, utf8_decode($cedula_identificacion),1);

        $this->SetY($posiciony);
        $this->SetX(84);
        $this->multiCell(18,6, utf8_decode($_GET['fecha_inicio']),1);

        $this->SetY($posiciony);
        $this->SetX(102);
        $this->multiCell(18,6, utf8_decode($_GET['fecha_fin']),1);

        $this->SetY($posiciony);
        $this->SetX(120);
        $this->multiCell(10,6, utf8_decode($dias_laborados),1,'C');

        $this->SetY($posiciony);
        $this->SetX(130);
        $this->multiCell(15,6, utf8_decode($horas),1);

        $this->SetY($posiciony);
        $this->SetX(145);
        $this->multiCell(16,6, utf8_decode($comisiones),1);

        $this->SetY($posiciony);
        $this->SetX(161);
        $this->multiCell(19,6, utf8_decode($sueldo_mes),1);

        $this->SetY($posiciony);
        $this->SetX(180);
        $this->multiCell(20,6, utf8_decode($total_ingresos),1);

        $this->SetY($posiciony);
        $this->SetX(200);
        $this->multiCell(15,6, utf8_decode($faltas),1);

        $this->SetY($posiciony);
        $this->SetX(215);
        $this->multiCell(15,6, utf8_decode($atrasos),1);

        $this->SetY($posiciony);
        $this->SetX(230);
        $this->multiCell(15,6, utf8_decode($multas),1);

        if($nombres_completos == 'CIFUENTES AGUIRRE JUAN CARLOS') {
            $this->SetY($posiciony);
            $this->SetX(245);
            $this->multiCell(20,6, utf8_decode($anticipos. '        2/2'),1);
        } else {
            if($nombres_completos == 'GIRALDO MONTOYA LAURA ALEJANDRA') {
                $this->SetY($posiciony);
                $this->SetX(245);
                $this->multiCell(20,6, utf8_decode($anticipos. '        4/6'),1);
            } else {
                if($nombres_completos == 'JUAN CARLOS ALMEIDA PERUGACHI') {
                    $this->SetY($posiciony);
                    $this->SetX(245);
                    $this->multiCell(20,6, utf8_decode($anticipos. '        4/4'),1);
                } else {
                    if($nombres_completos == 'JACOME CEVALLOS JONATHAN DAVID') {
                        $this->SetY($posiciony);
                        $this->SetX(245);
                        $this->multiCell(20,6, utf8_decode($anticipos. '        3/4'),1);
                    } else {
                        $this->SetY($posiciony);
                        $this->SetX(245);
                        $this->multiCell(20,6, utf8_decode($anticipos),1);
                    }
                }    
            }   
        }
 
        $this->SetY($posiciony);
        $this->SetX(265);
        $this->multiCell(20,6, utf8_decode('$ '. $neto_pagar),1);

        $total_pagar = $total_pagar + $neto_pagar;

        $posiciony = $posiciony + 6;
    }

    // $posiciony = $posiciony + 6;

    $this->SetY($posiciony);
    $this->SetX(8);
    $this->multiCell(56,6, utf8_decode('SUMA TOTAL'),1);

    $this->SetY($posiciony);
    $this->SetX(64);
    $this->multiCell(20,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(84);
    $this->multiCell(18,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(102);
    $this->multiCell(18,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(120);
    $this->multiCell(10,6, utf8_decode(''),1,'C');

    $this->SetY($posiciony);
    $this->SetX(130);
    $this->multiCell(15,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(145);
    $this->multiCell(16,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(161);
    $this->multiCell(19,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(180);
    $this->multiCell(20,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(200);
    $this->multiCell(15,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(215);
    $this->multiCell(15,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(230);
    $this->multiCell(15,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(245);
    $this->multiCell(20,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(265);
    $this->multiCell(20,6, utf8_decode('$ '.$total_pagar),1);

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