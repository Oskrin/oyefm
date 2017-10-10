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
    $this->Image('logo_conceptual.jpg',8,7,80);

    // $this->SetLineWidth(0.3);
    // $this->SetFillColor(255,255,255);
    // $this->RoundedRect(8, 31, 120, 21, 1, 'DF');

    // $this->SetFont('Arial','B',8);
    // $this->Text(10, 35, 'SR.(ES):',1, 'L');
    // $this->SetFont('Arial','',8);
    // $this->Text(23, 35, maxCaracter(utf8_decode($cliente),54),1, 'L');
    // $this->SetFont('Arial','B',8);
    // $this->Text(10, 40, utf8_decode('DIRECCIÓN:'),1, 'L');
    // $this->SetFont('Arial','',8);
    // $this->Text(28, 40, utf8_decode($direccion),1, 'L');
    // $this->SetFont('Arial','B',8);
    // $this->Text(10, 45, utf8_decode('FECHA DE EMISIÓN:'),1, 'L');
    // $this->SetFont('Arial','',8);
    // $this->Text(40, 45, utf8_decode($fecha_actual),1, 'L');
    // $this->SetFont('Arial','B',8);
    // $this->Text(10, 50, utf8_decode('RUC / CI:'),1, 'L');
    // $this->SetFont('Arial','',8);
    // $this->Text(24, 50, utf8_decode($ruc),1, 'L');
    // $this->Text(65, 50, utf8_decode('FORMA PAGO:'),1, 'L');
    // $this->Text(89, 50, utf8_decode($forma_pago),1, 'L');

    $this->SetFont('Arial','',8);
    $this->SetY(27);
    $this->SetX(8);
    $this->multiCell(73, 7, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',8);
    $this->SetY(34);
    $this->SetX(8);
    $this->multiCell(73, 7, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',8);
    $this->SetY(41);
    $this->SetX(8);
    $this->multiCell(73, 7, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',8);
    $this->SetY(48);
    $this->SetX(8);
    $this->multiCell(73, 8, utf8_decode(''),1,'C');

    $this->SetFont('Arial','B',9);
    $this->Text(18, 32, utf8_decode('CONCEPTUAL BUSINES GROUP'),1, 'L');
    $this->Text(24, 39, utf8_decode('OYE FM-RED NEXTBOOK'),1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(9, 46, 'RUC:'.' '.$ruc_empresa,1, 'L');
    $this->Text(40, 46, 'AUT.SRI.'.' '.$autorizacion,1, 'L');
    $this->SetFont('Arial','B',12);
    $this->Text(9, 54, utf8_decode('RETENCIÓN'),1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(35, 54, '001-001',1, 'L');
    $this->SetFont('Arial','',14);
    $this->SetTextColor(255,87,51);
    $this->Text(47, 54, utf8_decode('N°- ' .$serie) ,1, 'L');

    $this->SetFont('Arial','',8);
    $this->SetTextColor(25,25,25);

    $this->SetY(27);
    $this->SetX(83);
    $this->multiCell(118, 29, utf8_decode(''),1,'C');

    $this->Text(85, 33, utf8_decode('PROVEEDOR:'),1, 'L');
    $this->Text(85, 38, utf8_decode('RUC:'),1, 'L');
    $this->Text(135, 38, utf8_decode('FECHA DE EMISIÓN:'),1, 'L');
    $this->Text(85, 43, utf8_decode('DIRECCIÓN:'),1, 'L');
    $this->Text(135, 43, utf8_decode('TELÉFONO:'),1, 'L');
    $this->Text(85, 48, utf8_decode('TIPO DE COMPROBANTE DE VENTA:'),1, 'L');
    $this->Text(85, 53, utf8_decode('NÚMERO DE COMPROBANTE DE VENTA:'),1, 'L');

    $this->SetFont('Arial','',7);
    $this->Text(85, 122, utf8_decode('FIRMA DEL SUSTENTO RETENIDO'),1, 'L');
    $this->Text(23, 122, utf8_decode('FIRMA AGENTE DE RETENCIÓN'),1, 'L');

    $this->SetFont('Arial','B',9);
    $this->Text(150, 117, utf8_decode('TOTAL'),1, 'L');

    $resp = $class->consulta("SELECT D.codigo, D.descripcion, D.cantidad, D.valor_unitario, D.total_venta FROM detalle_factura_venta D, factura_venta F WHERE D.id_factura_venta = F.id AND F.id = '".$_GET['id']."' ORDER BY D.id asc");
    $posiciony = 61;

    while ($row = $class->fetch_array($resp)) {
        // $codigo = $row[0];
        // $descripcion = $row[1];
        // $cantidad = $row[2];
        // $valor_unitario = $row[3];
        // $total_venta = $row[4];

        // $this->SetY($posiciony);
        // $this->SetX(8);
        // $this->multiCell(30,6, utf8_decode($codigo),0);

        // $this->SetY($posiciony);
        // $this->SetX(38);
        // $this->multiCell(75, 6, utf8_decode($descripcion),0);

        // $this->SetY($posiciony);
        // $this->SetX(113);
        // $this->multiCell(22, 6, utf8_decode($cantidad),0,'C');

        // $this->SetY($posiciony);
        // $this->SetX(135);
        // $this->multiCell(33, 6, utf8_decode($valor_unitario),0,'R');

        // $this->SetY($posiciony);
        // $this->SetX(168);
        // $this->multiCell(33, 6, utf8_decode($total_venta),0,'R');

        // $posiciony = $posiciony + 4;
    }

    $posicionsety = 60;

    $this->SetFont('Arial','B',8);
    $this->SetY($posicionsety);
    $this->SetX(8);
    $this->SetTextColor(255,255,255);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(30,6, utf8_decode('DETALLE DE LA RETENCIÓN'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(72);
    $this->SetX(8);
    $this->multiCell(30, 35, '',1);

    $this->SetY($posicionsety);
    $this->SetX(38);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(20, 6, utf8_decode('EJERCICIO FISCAL'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(72);
    $this->SetX(38);
    $this->multiCell(20, 35, '',1);

    $this->SetY($posicionsety);
    $this->SetX(58);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(35, 6, utf8_decode('BASE IMPONIBLE PARA LA RETENCIÓN'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    // $this->SetY(72);
    // $this->SetX(58);
    // $this->multiCell(35, 35, '',1);

    $this->SetY($posicionsety);
    $this->SetX(93);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(20, 12, utf8_decode('IMPUESTO'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(72);
    $this->SetX(93);
    $this->multiCell(20, 35, '',1);

    $this->SetY($posicionsety);
    $this->SetX(113);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(27, 6, utf8_decode('CÓDIGO DEL IMPUESTO'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(72);
    $this->SetX(113);
    $this->multiCell(27, 35, '',1);

    $this->SetY($posicionsety);
    $this->SetX(140);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(31, 12, utf8_decode('% DE RETENCIÓN'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    // $this->SetY(72);
    // $this->SetX(140);
    // $this->multiCell(31, 35, '',1);
    
    $this->SetY($posicionsety);
    $this->SetX(171);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(30, 12, utf8_decode('VALOR RETENIDO'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(72);
    $this->SetX(171);
    $this->multiCell(30, 35, '',1);

    $this->SetY(107);
    $this->SetX(8);
    $this->multiCell(132, 17, '',1);

    $this->SetY(107);
    $this->SetX(140);
    $this->multiCell(31, 17, '',1);

    $this->SetY(107);
    $this->SetX(171);
    $this->multiCell(30, 8, '',1);

    $this->SetY(115);
    $this->SetX(171);
    $this->multiCell(30, 9, '',1);
   
    //Logo cabezera
    $this->Image('pie_factura_conceptual.jpg',8,127,193);

    $this->SetDash(1,1);
    $this->Line(20,118,65,118);

    $this->SetDash(1,1);
    $this->Line(82,118,128,118);

    }
}
    // $pdf = new PDF();
    $pdf = new PDF('L','mm','A5');
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('retenciones.pdf','I');
?>