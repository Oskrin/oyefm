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
    $resp = $class->consulta("SELECT C.razon_social, C.direccion, C.ruc_empresa, C.telefono, F.fecha_actual, F.forma_pago, F.serie, F.subtotal, F.descuento, F.base_imponible, F.iva, F.otros, F.total_pagar, F.estado FROM factura_venta F, clientes C WHERE F.id_clientes = C.id AND  F.id = '".$_GET['id']."'");
    while ($row = $class->fetch_array($resp)) {
        $cliente = $row[0];
        $direccion = $row[1];
        $ruc= $row[2];
        $telefono= $row[3];
        $fecha_actual = $row[4];
        $forma_pago = $row[5];
        $serie = substr($row[6], 8, 16);
        $subtotal = $row[7];
        $descuento = $row[8];
        $base_imponible = $row[9];
        $iva = $row[10];
        $otros = $row[11];
        $total_pagar = $row[12];
        $estado = $row[13];
    }

    $resp = $class->consulta("SELECT E.propietario, E.nombre_empresa, E.ruc_empresa, E.autorizacion_sri, E.propietario FROM empresa E WHERE E.estado = '1'");
    while ($row = $class->fetch_array($resp)) {
        $propietario = $row[0];
        $nombre_empresa = $row[1];
        $ruc_empresa = $row[2];
        $autorizacion = $row[3];
        $propietario = $row[4];
    }

    $this->SetTextColor(0,0,0);

    //Logo cabezera
    $this->Image('logo_conceptual.jpg',7,6,55);

    $this->SetFont('Arial','B',11);
    $this->Text(85, 13, 'COMPROBANTE DE INGRESO',1, 'L');

    $this->SetFont('Arial','',7);
    $this->Text(120, 47, utf8_decode('EFECTIVO'),1, 'L');
    if($forma_pago == 'EFECTIVO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(123, 55, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(134, 44, 4, 4, 0, 'DF');
    }

    $this->Text(121, 51, utf8_decode('CHEQUE'),1, 'L');
    if($forma_pago == 'CHEQUE') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(123, 62, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(134, 48, 4, 4, 0, 'DF');
    }

    $this->Text(121, 55, utf8_decode('TARJETA'),1, 'L');
    if($forma_pago == 'TARJETA') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(123, 67, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(134, 52, 4, 4, 0, 'DF');
    }

    $this->Text(119, 59, utf8_decode('DEPÓSITO'),1, 'L');
    if($forma_pago == 'DEPÓSITO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(123, 72, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(134, 56, 4, 4, 0, 'DF');
    }

    $this->Text(111, 63, utf8_decode('TRANSFERENCIA'),1, 'L');
    if($forma_pago == 'TRANSFERENCIA') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(123, 77, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(134, 60, 4, 4, 0, 'DF');
    }

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(96, 14, 45, 8, 1, 'DF');

    $this->SetFont('Arial','',8);
    $this->SetY(23);
    $this->SetX(10);
    $this->multiCell(40, 6, utf8_decode('CIUDAD'),1,'L');

    $this->SetY(23);
    $this->SetX(50);
    $this->multiCell(18, 6, utf8_decode('FECHA'),1,'C');

    $this->SetY(23);
    $this->SetX(68);
    $this->multiCell(9, 6, utf8_decode('D'),1,'L');

    $this->SetY(23);
    $this->SetX(77);
    $this->multiCell(9, 6, utf8_decode('M'),1,'L');

    $this->SetY(23);
    $this->SetX(86);
    $this->multiCell(11, 6, utf8_decode('A'),1,'L');

    $this->SetY(23);
    $this->SetX(97);
    $this->multiCell(44, 6, utf8_decode('PDC - N°.'),1,'L');

    $this->SetY(29);
    $this->SetX(10);
    $this->multiCell(21, 6, utf8_decode('RECIBIDO DE'),1,'L');

    $this->SetY(29);
    $this->SetX(31);
    $this->multiCell(45, 6, utf8_decode('NOMBRE'),1,'L');

    $this->SetY(29);
    $this->SetX(76);
    $this->multiCell(45, 6, utf8_decode('EMPRESA'),1,'L');

    $this->SetY(29);
    $this->SetX(121);
    $this->multiCell(20, 6, utf8_decode('$'),1,'L');

    $this->SetY(35);
    $this->SetX(10);
    $this->multiCell(131, 6, utf8_decode('DIRECCIÓN:'),1,'L');

    $this->SetY(42);
    $this->SetX(10);
    $this->multiCell(98, 6, utf8_decode('SON:'),1,'L');

    $this->SetY(48);
    $this->SetX(10);
    $this->multiCell(98, 6, utf8_decode('POR CONCEPTO DE:'),1,'L');

    $this->SetY(54);
    $this->SetX(10);
    $this->multiCell(98, 6, utf8_decode(''),1,'L');

    $this->SetY(42);
    $this->SetX(108);
    $this->multiCell(33, 24, utf8_decode(''),1,'L');

    $this->SetY(60);
    $this->SetX(10);
    $this->multiCell(33, 6, utf8_decode('CHEQUE N°'),1,'L');

    $this->SetY(60);
    $this->SetX(43);
    $this->multiCell(33, 6, utf8_decode('BANCO'),1,'L');

    $this->SetY(60);
    $this->SetX(76);
    $this->multiCell(32, 6, utf8_decode('CUENTA'),1,'L');

    $this->SetFont('Arial','',6);
    $this->SetY(67);
    $this->SetX(10);
    $this->multiCell(13, 5, utf8_decode('CÓDIGO'),1,'C');

    $this->SetY(72);
    $this->SetX(10);
    $this->multiCell(13, 5, utf8_decode(''),1,'C');

    $this->SetY(77);
    $this->SetX(10);
    $this->multiCell(13, 5, utf8_decode(''),1,'C');

    $this->SetY(82);
    $this->SetX(10);
    $this->multiCell(26, 15, utf8_decode(''),1,'C');

    $this->SetY(67);
    $this->SetX(23);
    $this->multiCell(13, 5, utf8_decode('CUENTA'),1,'C');

    $this->SetY(72);
    $this->SetX(23);
    $this->multiCell(13, 5, utf8_decode(''),1,'C');

    $this->SetY(77);
    $this->SetX(23);
    $this->multiCell(13, 5, utf8_decode(''),1,'C');

    $this->SetY(97);
    $this->SetX(10);
    $this->multiCell(26, 5, utf8_decode('PREPARADO'),1,'C');

    $this->SetY(67);
    $this->SetX(36);
    $this->multiCell(46, 5, utf8_decode('CONCEPTO'),1,'C');

    $this->SetY(72);
    $this->SetX(36);
    $this->multiCell(46, 5, utf8_decode(''),1,'C');

    $this->SetY(77);
    $this->SetX(36);
    $this->multiCell(46, 5, utf8_decode(''),1,'C');

    $this->SetY(82);
    $this->SetX(36);
    $this->multiCell(23, 15, utf8_decode(''),1,'C');

    $this->SetY(97);
    $this->SetX(36);
    $this->multiCell(23, 5, utf8_decode('REVISADO'),1,'C');

    $this->SetY(82);
    $this->SetX(59);
    $this->multiCell(23, 15, utf8_decode(''),1,'C');

    $this->SetY(97);
    $this->SetX(59);
    $this->multiCell(23, 5, utf8_decode('APROBADO'),1,'C');

    $this->SetY(67);
    $this->SetX(82);
    $this->multiCell(17, 5, utf8_decode('DÉBITO'),1,'C');

    $this->SetY(72);
    $this->SetX(82);
    $this->multiCell(17, 5, utf8_decode(''),1,'C');

    $this->SetY(77);
    $this->SetX(82);
    $this->multiCell(17, 5, utf8_decode(''),1,'C');

    $this->SetY(82);
    $this->SetX(82);
    $this->multiCell(17, 5, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',5);
    $this->SetY(87);
    $this->SetX(82);
    $this->multiCell(17, 5, utf8_decode('VALOR PARCIAL'),0,'C');

    $this->SetY(92);
    $this->SetX(82);
    $this->multiCell(17, 5, utf8_decode('IVA____%'),0,'C');

    $this->SetFont('Arial','',6);
    $this->SetY(97);
    $this->SetX(82);
    $this->multiCell(33, 5, utf8_decode('TOTAL   $_____________'),1,'C');

    $this->SetY(67);
    $this->SetX(99);
    $this->multiCell(16, 5, utf8_decode('CRÉDITO'),1,'C');

    $this->SetY(72);
    $this->SetX(99);
    $this->multiCell(16, 5, utf8_decode(''),1,'C');

    $this->SetY(77);
    $this->SetX(99);
    $this->multiCell(16, 5, utf8_decode(''),1,'C');

    $this->SetY(82);
    $this->SetX(99);
    $this->multiCell(16, 5, utf8_decode(''),1,'C');

    $this->SetY(87);
    $this->SetX(99);
    $this->multiCell(16, 5, utf8_decode(''),1,'C');

    $this->SetY(92);
    $this->SetX(99);
    $this->multiCell(16, 5, utf8_decode(''),1,'C');

    $this->SetY(67);
    $this->SetX(115);
    $this->multiCell(26, 5, utf8_decode('FIRMA RECIBIDO'),1,'C');

    $this->SetY(72);
    $this->SetX(115);
    $this->multiCell(26, 25, utf8_decode(''),1,'C');

    $this->SetY(72);
    $this->SetX(115);
    $this->multiCell(26, 20, utf8_decode(''),1,'C');

    $this->SetY(92);
    $this->SetX(115);
    $this->multiCell(26, 5, utf8_decode('NOMBRE'),0,'L');

    $this->SetY(97);
    $this->SetX(115);
    $this->multiCell(26, 5, utf8_decode('C.I.'),1,'L');
    }
}
    // $pdf = new PDF();
    // $pdf = new PDF('L','mm','A5');
    // $pdf->AliasNbPages();
    $pdf = new PDF('L','mm',array(150,105));
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('factura oye fm.pdf','I');
?>