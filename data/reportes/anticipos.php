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
    $this->Image('logo_conceptual.jpg',4,3,70);

    $resp = $class->consulta("SELECT A.id, A.serie_anticipo, A.fecha_anticipo, P.nombres_completos, P.cedula_identificacion, F.nombre, A.monto_anticipo, A.meses_anticipo, A.forma_pago, A.cheque_numero, A.id_bancos, A.cuenta_anticipo, U.nombres_completos, U.cedula FROM rol_pagos.anticipos A, corporativo.personal P, usuarios U, corporativo.cargos_asignacion C, corporativo.cargos F  WHERE A.id_usuario = U.id AND A.id_personal = P.id AND C.id_personal = P.id AND C.id_cargos = F.id AND A.id = '$_GET[id]'");

    while ($row = $class->fetch_array($resp)) {
        $serie_anticipo = $row[1];
        $fecha_anticipo = $row[2];
        $nombres_completos = $row[3];
        $cedula_identificacion = $row[4];
        $cargo = $row[5];
        $monto_anticipo = $row[6];
        $meses_anticipo = $row[7];
        $forma_pago = $row[8];
        $cheque_numero = $row[9];
        $id_bancos = $row[10];
        $cuenta_anticipo = $row[11];
        $usuario = $row[12];
        $cedula = $row[13];

        $anio = substr($row[2], 0, 4);
        $mes = substr($row[2], 5, 8);
        $dia = substr($row[2], 5, 8);
    }

    $codigo_nomina = '';
    $resp = $class->consulta("SELECT N.codigo_nomina FROM rol_pagos.asignacion_anticipos A, rol_pagos.nomina N, rol_pagos.anticipos P WHERE A.id_nomina = N.id AND A.id_anticipos = P.id AND P.id = '$_GET[id]'");
    while ($row = $class->fetch_array($resp)) {
        $codigo_nomina = $row[0];
    } 
    
    $this->SetFont('Arial','B',11);
    $this->Text(84, 11, 'CA-',1, 'L');
    $this->Text(98, 11, 'ANTICIPOS AL PAGO',1, 'L');
    $this->SetFont('Arial','',7);

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(75, 12, 27, 7, 1.5, 'DF');
    $this->Text(76, 17, utf8_decode($codigo_nomina) ,1, 'L');

    $this->SetFont('Arial','B',11);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(104, 12, 40, 7, 1.5, 'DF');
    $this->setTextColor(255,87,51);
    $this->Text(108, 17, utf8_decode('N°-     '.$serie_anticipo) ,1, 'L');

    $this->setTextColor(25,25,25);
    $this->SetFont('Arial','',8);
    $this->SetY(21);
    $this->SetX(6);
    $this->multiCell(100, 6, utf8_decode('Yo,  '.$nombres_completos.', CON C.C. N° '.$cedula_identificacion.', que desempeño como '.$cargo.', solicito, se me conceda un anticipo a mi remuneración por el monto de $'.$monto_anticipo.' para un periodo de '.$meses_anticipo.' mes(es); y autorizo para que en la liquidación de mis haberes en caso de separación definitiva, se incluyan en los saldos pendientes de pago originados como anticipos recibidos.'),0);

    $this->SetFont('Arial','',7);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(116, 20, 28, 7, 1.5, 'DF');

    $this->SetFont('Arial','B',11);
    $this->setTextColor(255,87,51);
    $this->Text(118, 25, utf8_decode('$ '.$monto_anticipo) ,1, 'L');

   $this->setTextColor(25,25,25);
   $this->SetFont('Arial','',7);
   $this->Text(125, 31, utf8_decode('EFECTIVO'),1, 'L');
    if($forma_pago == 'EFECTIVO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(139, 28, 5, 5, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(139, 28, 5, 5, 0, 'DF');
    }

    $this->Text(127, 37, utf8_decode('CHEQUE'),1, 'L');
    if($forma_pago == 'CHEQUE') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(139, 34, 5, 5, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(139, 34, 5, 5, 0, 'DF');    
    }

    $this->Text(126, 43, utf8_decode('TARJETA'),1, 'L');
    if($forma_pago == 'TARJETA') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(139, 40, 5, 5, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(139, 40, 5, 5, 0, 'DF');    
    }

    $this->Text(124, 49, utf8_decode('DEPÓSITO'),1, 'L');
    if($forma_pago == 'DEPÓSITO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(139, 46, 5, 5, 0, 'DF');        
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(139, 46, 5, 5, 0, 'DF');
    }

    $this->Text(116, 55, utf8_decode('TRANSFERENCIA'),1, 'L');
    if($forma_pago == 'TRANSFERENCIA') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(139, 52, 5, 5, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(139, 52, 5, 5, 0, 'DF'); 
    }
    
    $this->SetY(63);
    $this->SetX(6);
    $this->multiCell(46, 6, utf8_decode('CHEQUE N°'),1, 'L');
    // $this->Text(22, 67, utf8_decode($cedula),1, 'L');

    $this->SetY(63);
    $this->SetX(52);
    $this->multiCell(46, 6, utf8_decode('BANCO'),1, 'L');
    // $this->Text(63, 67, utf8_decode($cedula),1, 'L');

    $this->SetY(63);
    $this->SetX(98);
    $this->multiCell(46, 6, utf8_decode('CUENTA'),1, 'L');
    // $this->Text(110, 67, utf8_decode($cedula),1, 'L');

    $this->SetY(69);
    $this->SetX(6);
    $this->multiCell(46, 16, utf8_decode(''),1, 'C');    

    $this->SetY(85);
    $this->SetX(6);
    $this->multiCell(46, 5, utf8_decode(''),1);

    $this->SetY(90);
    $this->SetX(6);
    $this->multiCell(46, 5, utf8_decode('C.I.'),1);
    $this->Text(12, 93, utf8_decode($cedula),1, 'L');

    $this->SetY(69);
    $this->SetX(52);
    $this->multiCell(46, 16, utf8_decode(''),1, 'C');

    $this->SetY(85);
    $this->SetX(52);
    $this->multiCell(46, 5, utf8_decode(''),1);

    $this->SetY(90);
    $this->SetX(52);
    $this->multiCell(46, 5, utf8_decode('C.I.'),1);

    $this->SetY(69);
    $this->SetX(98);
    $this->multiCell(46, 16, utf8_decode(''),1, 'C');

    $this->SetY(85);
    $this->SetX(98);
    $this->multiCell(46, 5, utf8_decode('C.I.'),1);
    $this->Text(104, 88, utf8_decode($cedula_identificacion),1, 'L');

    $this->SetY(90);
    $this->SetX(98);
    $this->multiCell(14, 5, utf8_decode('DIA'),1);
    // $this->Text(104, 93, utf8_decode($dia),1, 'L');

    $this->SetY(90);
    $this->SetX(112);
    $this->multiCell(18, 5, utf8_decode('MES'),1);
    // $this->Text(118, 93, utf8_decode($mes),1, 'L');

    $this->SetY(90);
    $this->SetX(130);
    $this->multiCell(14, 5, utf8_decode('AÑO'),1);
    $this->Text(137, 93, utf8_decode($anio),1, 'L');

    $this->Text(7, 72, utf8_decode('ELABORADO'),1, 'L');
    $this->Text(53, 72, utf8_decode('APROBADO'),1, 'L');
    $this->Text(99, 72, utf8_decode('FIRMA Y SELLO SOLICITANTE'),1, 'L');
    }
}

    $pdf = new PDF('L','mm',array(150,105));
    $pdf->AliasNbPages();

    // Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('anticipos.pdf','I');
?>

