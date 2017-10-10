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
    $this->Image('oye.jpg',25,15,150);

    $resultado = $class->consulta("SELECT U.nombres_completos FROM pagos P, usuarios U WHERE P.id_usuario = U.id AND P.id = '$_GET[id]'");
    while ($row = $class->fetch_array($resultado)) {
        $solicitante = $row[0];
    }

    $resultado2 = $class->consulta("SELECT P.fecha_solicitud, P.codigo, A.nombre, U.nombres_completos, P.detalle, P.forma_pago, P.valor_total, P.total_recibido, P.total_gasto, P.saldo FROM pagos P, usuarios U, corporativo.areas A WHERE P.destinatario = U.id AND P.id_area = A.id AND P.id = '$_GET[id]'");
    while ($row = $class->fetch_array($resultado2)) {
        $fecha_actual = $row[0];
        $codigo = $row[1];
        $para = $row[2];
        $dirigido = $row[3];
        $detalle = $row[4];
        $forma_pago = $row[5];
        $valor_total = $row[6];
        $total_recibido = $row[7];
        $total_gasto = $row[8];
        $saldo = $row[9];
    } 

    $this->SetFont('Arial','',9);
    $mydate = strtotime($fecha_actual);
    $this->Text(20, 40, utf8_encode(strftime("%A, %d de %B de %Y", $mydate)),1,0, 'L',0);/////nombre
    $this->Text(45, 50, utf8_decode($solicitante),1, 'L');
    $this->Text(45, 55, utf8_decode($dirigido),1, 'L');
    $this->Text(160, 50, utf8_decode($codigo),1, 'L');
    $this->Text(160, 55, utf8_decode($para),1, 'L');

    $this->SetFont('Arial','B',9);
    $this->Text(20, 50, utf8_decode('SOLICITANTE:'),1, 'L');
    $this->Text(20, 55, utf8_decode('DIRIGIDO:'),1, 'L');
    $this->Text(140, 50, utf8_decode('N° OFICIO:'),1, 'L');
    $this->Text(140, 55, utf8_decode('PARA:'),1, 'L');
    $this->SetFont('Arial','B',11);
    $this->Text(80, 65, 'SOLICITUD DE PAGOS',1, 'L');

    $this->setTextColor(25,25,25);
    $this->SetFont('Arial','',9);
    $this->SetY(69);
    $this->SetX(10);
    $this->multiCell(185, 3, utf8_decode($detalle),0);
    
    $this->SetFont('Arial','B',7);
    $this->SetY(90);
    $this->SetX(10);
    $this->multiCell(45, 6, utf8_decode('DESTINATARIO'),1,'C');

    $this->SetY(90);
    $this->SetX(55);
    $this->multiCell(50, 6, utf8_decode('DESCRIPCIÓN'),1,'C');

    $this->SetY(90);
    $this->SetX(105);
    $this->multiCell(43, 6, utf8_decode('CONCEPTO'),1,'C');

    $this->SetY(90);
    $this->SetX(148);
    $this->multiCell(18, 6, utf8_decode('CANTIDAD'),1,'C');

    $this->SetY(90);
    $this->SetX(166);
    $this->multiCell(20, 6, utf8_decode('PERIODO'),1,'C');

    $this->SetY(90);
    $this->SetX(186);
    $this->multiCell(15, 6, utf8_decode('VALOR'),1,'C');

    $resp = $class->consulta("SELECT * FROM detalle_pagos WHERE id_pago = '".$_GET['id']."' ORDER BY id asc");
    $posiciony = 96;
    $total_valor = 0;
    while ($row = $class->fetch_array($resp)) {
        $proveedor = $row[2];
        $descripcion = $row[3];
        $concepto = $row[4];
        $cantidad = $row[5];
        $periodo = $row[6];
        $valor = $row[7];
        $estado = $row[8];

        $this->SetFont('Arial','',6);

        $this->SetTextColor(25, 25, 25);
        $this->SetY($posiciony);
        $this->SetX(10);
        $this->multiCell(45,6, utf8_decode($proveedor),1);

        $this->SetY($posiciony);
        $this->SetX(55);
        $this->multiCell(50,6, utf8_decode($descripcion),1);

        $this->SetY($posiciony);
        $this->SetX(105);
        $this->multiCell(43,6, utf8_decode($concepto),1);

        $this->SetY($posiciony);
        $this->SetX(148);
        $this->multiCell(18,6, utf8_decode($cantidad),1,'C');

        $this->SetY($posiciony);
        $this->SetX(166);
        $this->multiCell(20,6, utf8_decode($periodo),1);

        if ($estado == '1') {
            $total_valor = $total_valor + $valor;
            $this->SetY($posiciony);
            $this->SetX(186);
            $this->multiCell(15,6, utf8_decode($valor),1);        
        } else {
            $this->SetY($posiciony);
            $this->SetX(186);
            $this->SetTextColor(25, 25, 25);
            $this->SetFillColor(122,253,2);
            $this->multiCell(15, 6, utf8_decode($valor),1,'', 1, 0, '', '', true, 0, false, true, 0);   
        }

        $posiciony = $posiciony + 6;
    }
    $this->SetFont('Arial','B',6);
    $this->SetY($posiciony);
    $this->SetX(10);
    $this->multiCell(45,6, utf8_decode('TOTAL'),1);

    $this->SetY($posiciony);
    $this->SetX(55);
    $this->multiCell(50,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(105);
    $this->multiCell(43,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(148);
    $this->multiCell(18,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(166);
    $this->multiCell(20,6, utf8_decode(''),1);

    $this->SetY($posiciony);
    $this->SetX(186);
    $this->multiCell(15,6, truncateFloat($total_valor,2),1);

    }
}

    $pdf = new PDF('P','mm','A4');
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    $pdf->Output('personal.pdf','I');
?>