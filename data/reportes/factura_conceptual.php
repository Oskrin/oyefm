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

    if($estado == '2') {
        $this->SetTextColor(249,33,33);
        $this->RotatedImage('../images/anulado.png', 175, 13, 30, 20, 20);        
    }

    $this->SetTextColor(0,0,0);

    //Logo cabezera
    $this->Image('logo_conceptual.jpg',8,7,95);

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(8, 31, 120, 21, 1, 'DF');

    $this->SetFont('Arial','B',8);
    $this->Text(10, 35, 'SR.(ES):',1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(23, 35, maxCaracter(utf8_decode($cliente),54),1, 'L');
    $this->SetFont('Arial','B',8);
    $this->Text(10, 40, utf8_decode('DIRECCIÓN:'),1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(28, 40, utf8_decode($direccion),1, 'L');
    $this->SetFont('Arial','B',8);
    $this->Text(10, 45, utf8_decode('FECHA DE EMISIÓN:'),1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(40, 45, utf8_decode($fecha_actual),1, 'L');
    $this->SetFont('Arial','B',8);
    $this->Text(10, 50, utf8_decode('RUC / CI:'),1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(24, 50, utf8_decode($ruc),1, 'L');
    // $this->Text(65, 50, utf8_decode('FORMA PAGO:'),1, 'L');
    // $this->Text(89, 50, utf8_decode($forma_pago),1, 'L');

    $this->SetFont('Arial','',8);
    $this->SetY(23);
    $this->SetX(131);
    $this->multiCell(70, 7, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',8);
    $this->SetY(30);
    $this->SetX(131);
    $this->multiCell(70, 7, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',8);
    $this->SetY(37);
    $this->SetX(131);
    $this->multiCell(70, 7, utf8_decode(''),1,'C');

    $this->SetFont('Arial','',8);
    $this->SetY(44);
    $this->SetX(131);
    $this->multiCell(70, 8, utf8_decode(''),1,'C');

    $this->SetFont('Arial','B',9);
    $this->Text(140, 28, utf8_decode($propietario),1, 'L');
    $this->Text(146, 35, utf8_decode($nombre_empresa),1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(132, 42, 'RUC:'.' '.$ruc_empresa,1, 'L');
    $this->Text(165, 42, 'AUT.SRI.'.' '.$autorizacion,1, 'L');
    $this->SetFont('Arial','B',12);
    $this->Text(132, 50, 'FACTURA',1, 'L');
    $this->SetFont('Arial','',8);
    $this->Text(155, 50, '001-001',1, 'L');
    $this->SetFont('Arial','',16);
    $this->SetTextColor(255,87,51);
    $this->Text(168, 50, utf8_decode('N°- ' .$serie) ,1, 'L');

    $this->SetFont('Arial','',9);
    $this->SetTextColor(25,25,25);

    $this->SetFont('Arial','',9);
    $this->SetY(96);
    $this->SetX(8);
    $this->multiCell(127, 5, 'SON:  '. $letras->ValorEnLetras($total_pagar, 'dolares'),1);
    // $this->multiCell(127, 5, 'SON: Trece Mil Novecientos Ocho dolares',1);
    
    $this->SetFont('Arial','B',8);
    $this->SetY(101);
    $this->SetX(8);
    $this->SetTextColor(255,255,255); 
    $this->SetFillColor(245, 116, 89);
    $this->MultiCell(70, 5, utf8_decode('FORMA PAGO'), 1, 'C', 1, 0, '', '', true, 0, false, true, 0);

    $this->SetFont('Arial','',7);
    $this->SetY(106);
    $this->SetX(8);
    $this->SetTextColor(25,25,25);
    $this->multiCell(40, 5, utf8_decode('EFECTIVO'),1,'L');

    $this->SetFont('Arial','',7);
    $this->SetY(111);
    $this->SetX(8);
    $this->multiCell(40, 5, utf8_decode('DINERO ELECTRÓNICO'),1,'L');

    $this->SetFont('Arial','',7);
    $this->SetY(116);
    $this->SetX(8);
    $this->multiCell(40, 5, utf8_decode('TARJETA CRÉDITO/DÉBITO'),1,'L');

    $this->SetFont('Arial','',7);
    $this->SetY(121);
    $this->SetX(8);
    $this->multiCell(40, 5, utf8_decode('OTROS'),1,'L');

    // condiciones
    $this->SetFont('Arial','',7);
    $this->SetY(106);
    $this->SetX(48);
    $this->multiCell(30, 5, '$ '.number_format($total_pagar, 2, ".", "."),1,'L');

    $this->SetFont('Arial','',7);
    $this->SetY(111);
    $this->SetX(48);
    $this->multiCell(30, 5, '$',1,'L');

    $this->SetFont('Arial','',7);
    $this->SetY(116);
    $this->SetX(48);
    $this->multiCell(30, 5, '$',1,'L');

    $this->SetFont('Arial','',7);
    $this->SetY(121);
    $this->SetX(48);
    $this->multiCell(30, 5, '$',1,'L');

    $this->SetFont('Arial','B',8);
    $this->Text(92, 122, utf8_decode('RECIBÍ CONFORME') ,1, 'L');
    $this->SetFont('Arial','',8);

    $resp = $class->consulta("SELECT D.codigo, D.descripcion, D.cantidad, D.valor_unitario, D.total_venta FROM detalle_factura_venta D, factura_venta F WHERE D.id_factura_venta = F.id AND F.id = '".$_GET['id']."' ORDER BY D.id asc");
    $posiciony = 61;

    while ($row = $class->fetch_array($resp)) {
        $codigo = $row[0];
        $descripcion = $row[1];
        $cantidad = $row[2];
        $valor_unitario = $row[3];
        $total_venta = $row[4];

        $this->SetY($posiciony);
        $this->SetX(8);
        $this->multiCell(30,6, utf8_decode($codigo),0);

        $this->SetY($posiciony);
        $this->SetX(38);
        $this->multiCell(75, 6, utf8_decode($descripcion),0);

        $this->SetY($posiciony);
        $this->SetX(113);
        $this->multiCell(22, 6, utf8_decode($cantidad),0,'C');

        $this->SetY($posiciony);
        $this->SetX(135);
        $this->multiCell(33, 6, utf8_decode($valor_unitario),0,'R');

        $this->SetY($posiciony);
        $this->SetX(168);
        $this->multiCell(33, 6, utf8_decode($total_venta),0,'R');

        $posiciony = $posiciony + 4;
    }

    $this->SetFont('Arial','B',8);
    $this->SetY(55);
    $this->SetX(8);
    $this->SetFillColor(245, 116, 89);
    $this->SetTextColor(255,255,255);
    $this->multiCell(30,6, utf8_decode('CÓDIGO'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(61);
    $this->SetX(8);
    $this->multiCell(30, 35, '',1 );

    $this->SetY(96);
    $this->SetX(8);
    $this->multiCell(127, 30, '',1 );
    
    $this->SetY(55);
    $this->SetX(38);
    $this->SetFillColor(245, 116, 89);
    $this->multiCell(75, 6, utf8_decode('DESCRIPCIÓN'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(61);
    $this->SetX(38);
    $this->multiCell(75, 35, '',1 );

    $this->SetY(55);
    $this->SetX(113);
    $this->SetFillColor(245, 116, 89);
    $this->multiCell(22, 6, utf8_decode('CANT.'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(61);
    $this->SetX(113);
    $this->multiCell(22, 35, '',1 );

    $this->SetY(55);
    $this->SetX(135);
    $this->SetFillColor(245, 116, 89);
    $this->multiCell(33, 6, utf8_decode('VALOR UNITARIO'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(61);
    $this->SetX(135);
    $this->multiCell(33, 35, '',0);

    $this->SetY(55);
    $this->SetX(168);
    $this->SetFillColor(245, 116, 89);
    $this->multiCell(33, 6, utf8_decode('VALOR TOTAL'),1,'C', 1, 0, '', '', true, 0, false, true, 0);
    $this->SetY(61);
    $this->SetX(168);
    $this->multiCell(33, 35, '',1);

    $this->SetY(96);
    $this->SetX(168);
    $this->multiCell(33, 30, '',1);
    $this->SetTextColor(25,25,25);

    
    $this->SetFont('Arial','B',7);
    $this->SetY(96);
    $this->SetX(135);
    $this->multiCell(33, 5, 'SUBTOTAL 14%',1);

    $this->SetY(101);
    $this->SetX(135);
    $this->multiCell(33, 5, 'DESCUENTO',1);

    $this->SetY(106);
    $this->SetX(135);
    $this->multiCell(33, 5, 'BASE IMPONIBLE',1);

    $this->SetY(111);
    $this->SetX(135);
    $this->multiCell(33, 5, 'IVA 14%',1);

    $this->SetY(116);
    $this->SetX(135);
    $this->multiCell(33, 5, 'OTROS',1);

    $this->SetY(121);
    $this->SetX(135);
    $this->multiCell(33, 5, 'VALOR TOTAL',1);

    $this->SetFont('Arial','',8);
    $this->SetY(96);
    $this->SetX(168);
    $this->multiCell(33, 5, $subtotal,0,'R');

    $this->SetY(101);
    $this->SetX(168);
    $this->multiCell(33, 5, $descuento,0,'R');

    $this->SetY(106);
    $this->SetX(168);
    $this->multiCell(33, 5, $base_imponible,0,'R');

    $this->SetY(111);
    $this->SetX(168);
    $this->multiCell(33, 5, $iva,0,'R');

    $this->SetY(116);
    $this->SetX(168);
    $this->multiCell(33, 5, $otros,0,'R');

    $this->SetY(121);
    $this->SetX(168);
    $this->multiCell(33, 5, number_format($total_pagar, 2, ".", "."),0,'R');

    //Logo cabezera
    $this->Image('pie_factura_conceptual.jpg',8,127,193);

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
    $pdf->Output('factura oye fm.pdf','I');
?>