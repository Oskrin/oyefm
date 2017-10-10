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
    
    $this->SetFont('Arial','B',10);
    $this->Text(130, 10, utf8_decode('LISTA CLIENTES'),1, 'L');
    $this->Text(130, 14, 'OYEFM ECUADOR',1, 'L');

    $this->SetFont('Arial','B',6);
    $this->SetY(30);
    $this->SetX(8);
    $this->multiCell(30, 6, utf8_decode('RUC'),1,'C');

    $this->SetY(30);
    $this->SetX(38);
    $this->multiCell(90, 6, utf8_decode('RAZÓN SOCIAL'),1,'C');

    $this->SetY(30);
    $this->SetX(128);
    $this->multiCell(23, 6, utf8_decode('TELÉFONO'),1,'C');

    $this->SetY(30);
    $this->SetX(151);
    $this->multiCell(23, 6, utf8_decode('CELULAR'),1,'C');

    $this->SetY(30);
    $this->SetX(174);
    $this->multiCell(70, 6, utf8_decode('DIRECCIÓN'),1,'C');

    $this->SetY(30);
    $this->SetX(244);
    $this->multiCell(45, 6, utf8_decode('CORREO'),1,'C');

    $resp = $class->consulta("SELECT C.ruc_empresa, C.razon_social, C.telefono, C.celular, C.direccion, C.correo FROM clientes C WHERE estado = '1' order by C.id asc");
    $posiciony = 36;
        while ($row = $class->fetch_array($resp)) {
            $cedula_identificacion = $row[0];
            $nombres_completos = $row[1];
            $telefono = $row[2];
            $celular = $row[3];
            $direccion = $row[4];
            $correo = $row[5];

            $this->SetY($posiciony);
            $this->SetX(8);
            $this->multiCell(30,6, utf8_decode($cedula_identificacion),1);

            $this->SetY($posiciony);
            $this->SetX(38);
            $this->multiCell(90,6, utf8_decode($nombres_completos),1);

            $this->SetY($posiciony);
            $this->SetX(128);
            $this->multiCell(23,6, utf8_decode($telefono),1,'C');

            $this->SetY($posiciony);
            $this->SetX(151);
            $this->multiCell(23,6, utf8_decode($celular),1,'C');

            $this->SetY($posiciony);
            $this->SetX(174);
            $this->multiCell(70,6, utf8_decode($direccion),1);

            $this->SetY($posiciony);
            $this->SetX(244);
            $this->multiCell(45,6, utf8_decode($correo),1);

            $posiciony = $posiciony + 6;
        }
    }
}

    $pdf = new PDF('L','mm','A4');
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    $pdf->Output('clientes.pdf','I');
?>