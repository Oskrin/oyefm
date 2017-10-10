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
    $resp = $class->consulta("SELECT M.serie_multa, M.fecha_multa, U.nombres_completos, P.nombres_Completos, T.descripcion, M.justificado FROM rol_pagos.multas M, usuarios U, corporativo.personal P, rol_pagos.tipo_multas T WHERE M.id_personal = P.id AND M.id_tipo_multa = T.id AND M.id_usuario = U.id AND M.estado = '1' AND M.id = '$_GET[id]'");

    while ($row = $class->fetch_array($resp)) {
        $serie_multa = $row[0];
        $fecha_multa = $row[1];
        $dirigido = $row[2];
        $solicitante = $row[3];
        $descripcion = $row[4];
        $justificado = $row[5];
    } 
    
    $this->SetFont('Arial','B',11);
    $this->Text(105, 11, 'AVISO MULTA', 'L');

    $this->SetFont('Arial','',9);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(76, 12, 20, 7, 1.5, 'DF');
    $this->SetFont('Arial','',7);


    $this->SetFont('Arial','B',11);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(97, 12, 47, 7, 1.5, 'DF');
    $this->setTextColor(255,87,51);
    $this->Text(100, 17, utf8_decode('PS-   N°-     '.$serie_multa) ,1, 'L');

    $this->setTextColor(25,25,25);
    $this->SetFont('Arial','',8);
    $this->Text(110, 25, utf8_decode('FECHA: '.$fecha_multa) ,1, 'L');

    $this->SetY(30);
    $this->SetX(6);
    $this->multiCell(138, 7, utf8_decode('Me dirijo a Usted:'),1);
    $this->Text(30, 34, utf8_decode($dirigido) ,1, 'L');

    $this->SetFont('Arial','',7);
    $this->SetY(40);
    $this->SetX(6);
    $this->multiCell(138, 14, utf8_decode('Yo,  '.$solicitante.', solicito de usted, para ausentarme de mis labores cotidianas'),1);

    $this->SetY(57);
    $this->SetX(6);
    $this->multiCell(80, 7, utf8_decode('TIPO MULTA'),1, 'C');

    $this->SetY(57);
    $this->SetX(86);
    $this->multiCell(58, 7, utf8_decode('JUSTIFICADO'),1, 'C');

    $this->Text(7, 69, utf8_decode('UNIFORMES'),1, 'L');
    $this->Text(35, 69, utf8_decode('ATRASOS'),1, 'L');
    $this->Text(60, 69, utf8_decode('BIOMÉTRICO'),1, 'L');
    $this->Text(100, 69, utf8_decode('SI'),1, 'L');
    $this->Text(120, 69, utf8_decode('NO'),1, 'L');

    if ($descripcion == 'No Timbrar') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(25, 66, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(25, 66, 4, 4, 0, 'DF');
    }

    if ($descripcion == 'Falta de Uniforme') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(50, 66, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(50, 66, 4, 4, 0, 'DF');
    }

    if ($descripcion == 'NINGUNO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(79, 66, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(79, 66, 4, 4, 0, 'DF');
    }

    if ($justificado == 'SI') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(105, 66, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(105, 66, 4, 4, 0, 'DF');
    }

    if ($justificado == 'NO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(126, 66, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(126, 66, 4, 4, 0, 'DF');
    }

    $this->SetY(64);
    $this->SetX(6);
    $this->multiCell(80, 8, utf8_decode(''),1, 'C');

    $this->SetY(64);
    $this->SetX(86);
    $this->multiCell(58, 8, utf8_decode(''),1, 'C');

    $this->SetY(76);
    $this->SetX(6);
    $this->multiCell(46, 14, utf8_decode(''),1, 'C');

    $this->SetY(90);
    $this->SetX(6);
    $this->multiCell(46, 7, utf8_decode('JEFE DE PERSONAL'),1);

    $this->SetY(76);
    $this->SetX(52);
    $this->multiCell(46, 14, utf8_decode(''),1, 'C');

    $this->SetY(90);
    $this->SetX(52);
    $this->multiCell(46, 7, utf8_decode('JEFE DE OFICINA'),1);

    $this->SetY(76);
    $this->SetX(98);
    $this->multiCell(46, 14, utf8_decode(''),1, 'C');

    $this->SetY(90);
    $this->SetX(98);
    $this->multiCell(46, 7, utf8_decode('SOLICITANTE CONFORME'),1);

    $this->Text(7, 80, utf8_decode('FIRMA'),1, 'L');
    $this->Text(53, 80, utf8_decode('FIRMA'),1, 'L');
    $this->Text(99, 80, utf8_decode('FIRMA'),1, 'L');
    }
}

    $pdf = new PDF('L','mm',array(150,105));
    $pdf->AliasNbPages();

    // Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('multas.pdf','I');
?>

