<?php
include_once('../../fpdf/rotation.php');
include_once('../../admin/class.php');
include_once('../../admin/convertir.php');
include_once('../../admin/funciones_generales.php');
date_default_timezone_set('America/Guayaquil');
setlocale (LC_TIME,"spanish");
session_start();
    
class PDF extends PDF_Rotate {
var $widths;
var $aligns;
function SetWidths($w) {            
    $this->widths=$w;
}        
function RotatedText($x, $y, $txt, $angle) {
    $this->Rotate($angle, $x, $y);
    $this->Text($x, $y, $txt);
    $this->Rotate(0);
}

function RotatedImage($file, $x, $y, $w, $h, $angle) {
    $this->Rotate($angle, $x, $y);
    $this->Image($file, $x, $y, $w, $h);
    $this->Rotate(0);
}  

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

function SetDash($black=false, $white=false) {
    if($black and $white)
        $s = sprintf('[%.3f %.3f] 0 d', $black*$this->k, $white*$this->k);
    else
        $s = '[] 0 d';
    $this->_out($s);
}

//Cabecera de página
function Header() {
    $class = new constante();
    $letras = new EnLetras();
    $resp = $class->consulta("SELECT C.id, P.cedula_identificacion, P.nombres_completos, C.fecha_credito, C.tasa_interes, c.tipo_tasa, C.periodo_pago, C.monto_credito FROM credito C, corporativo.personal P WHERE P.id = C.id_personal AND C.estado = '1' AND  C.id = '".$_GET['id']."'");
    while ($row = $class->fetch_array($resp)) {
        $cedula_identificacion = $row[1];
        $nombres_completos = $row[2];
        $fecha_credito = $row[3];
        $tasa_interes = $row[4];
        $tipo_tasa = $row[5];
        $periodo_pago = $row[6];
        $monto_credito = $row[7];
    }

    $this->SetTextColor(0,0,0);

    //Logo cabezera
    $this->Image('oye.jpg',8,7,160);
    //Arial bold 9
    $this->SetFont('Arial','B',8);
    //Movernos a la derecha
    $this->Cell(80);

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(8, 36, 193, 21, 1, 'DF');

    $this->SetFont('Arial','B',9);
    $this->Text(10, 42, utf8_decode('IDENTIFICACIÓN:'),1, 'L');
    $this->Text(75, 42, utf8_decode('NOMBRES COMPLETOS: '),1, 'L');
    $this->Text(10, 47, utf8_decode('FECHA CRÉDITO: '),1, 'L');
    $this->Text(75, 47, utf8_decode('TAZA INTÉRES: '),1, 'L');
    $this->Text(135, 47, utf8_decode('MONTO CRÉDITO: '),1, 'L');
    $this->Text(10, 53, utf8_decode('TIPO TAZA:'),1, 'L');
    $this->Text(75, 53, utf8_decode('PERIODO DE PAGO:'),1, 'L');

    $this->SetFont('Arial','',9);
    $this->Text(38, 42, utf8_decode($cedula_identificacion),0,'C');
    $this->Text(115, 42, utf8_decode($nombres_completos),0,'C');
    $this->Text(38, 47, utf8_decode($fecha_credito),0,'C');
    $this->Text(100, 47, utf8_decode($tasa_interes),0,'C');
    $this->Text(164, 47, utf8_decode($monto_credito),0,'C');
    $this->Text(29, 53, utf8_decode($tipo_tasa),0,'C');
    $this->Text(107, 53, utf8_decode($periodo_pago),0,'C');

    $resp = $class->consulta("SELECT * FROM detalle_credito WHERE id_credito = '".$_GET['id']."' ORDER BY id ASC;");
    $posiciony = 68;
    while ($row = $class->fetch_array($resp)) {
        $fecha_pagos = $row[2];
        $interes = $row[3];
        $abono_capital = $row[4];
        $valor_cuota = $row[5];
        $saldo_capital = $row[6];

        $this->SetFont('Arial','',8);

        $this->SetY($posiciony);
        $this->SetX(8);
        $this->multiCell(35,6, utf8_decode($fecha_pagos),0,'C');

        $this->SetY($posiciony);
        $this->SetX(43);
        $this->multiCell(38, 6, utf8_decode($interes),0,'C');

        $this->SetFont('Arial','',7);
        $this->SetY($posiciony);
        $this->SetX(81);
        $this->multiCell(40, 6, utf8_decode($abono_capital),0,'C');

        $this->SetY($posiciony);
        $this->SetX(121);
        $this->multiCell(40, 6, utf8_decode($valor_cuota),0,'C');

        $this->SetY($posiciony);
        $this->SetX(161);
        $this->multiCell(40, 6, utf8_decode($saldo_capital),0,'C');

        $posiciony = $posiciony + 4;
    }

    $posicionsety = 60;

    $this->SetY($posicionsety);
    $this->SetX(8);
    $this->multiCell(35,6, utf8_decode('FECHA PAGO'),1,'C');
    $this->SetY(66);
    $this->SetX(8);
    $this->multiCell(35, 50, '',1 );
   
    $this->SetY($posicionsety);
    $this->SetX(43);
    $this->multiCell(38, 6, utf8_decode('INTERES'),1,'C');
    $this->SetY(66);
    $this->SetX(43);
    $this->multiCell(38, 50, '',1 );

    $this->SetY($posicionsety);
    $this->SetX(81);
    $this->multiCell(40, 6, utf8_decode('ABONO AL CÁPITAL'),1,'C');
    $this->SetY(66);
    $this->SetX(81);
    $this->multiCell(40, 50, '',1 );

    $this->SetY($posicionsety);
    $this->SetX(121);
    $this->multiCell(40, 6, utf8_decode('VALOR DE LA CUOTA'),1,'C');
    $this->SetY(66);
    $this->SetX(121);
    $this->multiCell(40, 50, '',1);

    $this->SetY($posicionsety);
    $this->SetX(161);
    $this->multiCell(40, 6, utf8_decode('SALDO AL CÁPITAL'),1,'C');
    $this->SetY(66);
    $this->SetX(161);
    $this->multiCell(40, 50, '',1);

    $this->Text(20, 140, utf8_decode('FIRMA GERENCIA'),1, 'L');
    $this->Text(160, 140, utf8_decode('FIRMA EMPLEADO'),1, 'L');

    //Logo cabezera
    // $this->Image('pie_factura_conceptual.jpg',8,127,193);

    // $this->SetDash(1,1);
    // $this->Line(82,118,128,118);

    }
}
    // $pdf = new PDF();
    $pdf = new PDF('L','mm','A5');
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('factura oye fm.pdf','I');
?>