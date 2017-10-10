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
    $this->Image('logo_conceptual.jpg',4,5,60);

    $resp = $class->consulta("SELECT O.codigo, U.nombres_completos, C.nombres_completos, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, O.cantidad, O.presupuesto, O.observaciones, O.eficiencia, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id AND O.id = '$_GET[id]'");

    while ($row = $class->fetch_array($resp)) {
        $codigo = $row[0];
        $solicitante = $row[1];
        $responsable = $row[2];
        $fecha_inicio = $row[3];
        $fecha_entrega = $row[4];
        $tiempo_ejecucion = $row[5];
        $tipo_trabajo = $row[6];
        $descripcion = $row[7];
        $destino = $row[8];
        $cantidad = $row[9];
        $presupuesto = $row[10];
        $observaciones = $row[11];
        $eficiencia = $row[12];
        $estado = $row[13];
    } 
    
    $this->SetFont('Arial','B',9);
    $this->Text(70, 15, 'ORDEN DE RABAJO INTERNO',1, 'L');
    $this->SetTextColor(255, 87, 51);
    $this->Text(120, 15, $codigo ,1, 'L');

    $this->SetTextColor(25, 25, 25);
    $this->SetY(11);
    $this->SetX(68);
    $this->multiCell(76, 6, utf8_decode(''),1);

    $this->SetFont('Arial','B',7);
    $this->Text(7, 27, 'SOLICITANTE:',1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(25, 27,  maxCaracter(utf8_decode($solicitante),30),1, 'L');

    $this->SetFont('Arial','B',7);
    $this->Text(7, 37, utf8_decode('FECHA DE INICIO:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(29, 37, $fecha_inicio ,1, 'L');

    $this->SetY(22);
    $this->SetX(6);
    $this->multiCell(69, 17, utf8_decode(''),1);

    $this->SetFont('Arial','B',7);
    $this->Text(76, 27, 'RESPONSABLE:',1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(97, 27, maxCaracter(utf8_decode($responsable),30) ,1, 'L');

    $this->SetFont('Arial','B',7);
    $this->Text(76, 32, utf8_decode('TIEMPO:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(88, 32, utf8_decode($tiempo_ejecucion) ,1, 'L');

    $this->SetFont('Arial','B',7);
    $this->Text(76, 37, utf8_decode('FECHA ENTREGA:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(99, 37, utf8_decode($fecha_entrega) ,1, 'L');

    $this->SetY(22);
    $this->SetX(75);
    $this->multiCell(69, 17, utf8_decode(''),1);

    $this->SetY(40);
    $this->SetX(6);
    $this->SetTextColor(255, 255, 255);
    $this->SetFillColor(208, 116, 3);
    $this->multiCell(138, 6, utf8_decode(''),1,'C', 1, 0, '', '', true, 0, false, true, 0);

    $this->SetFont('Arial','B',8);
    $this->Text(8, 44, 'DETALLE TRABAJO',1, 'L');

    $this->SetTextColor(25, 25, 25);
    $this->SetFont('Arial','B',7);
    $this->Text(8, 51, utf8_decode('PRODUCTO'),1, 'L');

    $this->SetTextColor(25,25,25);
    $this->SetFont('Arial','B',7);
    $this->Text(33, 51, utf8_decode('SERVICIO'),1, 'L');

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(25, 48, 4, 4, 0, 'DF');

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(47, 48, 4, 4, 0, 'DF');

    if ($tipo_trabajo == 'PRODUCTO') {
            $this->SetLineWidth(0.3);
            $this->SetFillColor(25,25,25);
            $this->RoundedRect(25, 48, 4, 4, 0, 'DF'); 
    } else {
        if ($tipo_trabajo == 'SERVICIO') {
            $this->SetLineWidth(0.3);
            $this->SetFillColor(25,25,25);
            $this->RoundedRect(47, 48, 4, 4, 0, 'DF');
        }  
    }

    $this->SetTextColor(25,25,25);
    $this->SetFont('Arial','B',7);
    $this->Text(55, 51, utf8_decode('DESCRIPCIÓN:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(74, 51, $descripcion ,1, 'L');

    $this->SetTextColor(25,25,25);
    $this->SetFont('Arial','B',7);
    $this->Text(8, 56, utf8_decode('INTERNO'),1, 'L');

   
    $this->SetTextColor(25,25,25);
    $this->SetFont('Arial','B',7);
    $this->Text(33, 56, utf8_decode('EXTERNO'),1, 'L');

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(25, 53, 4, 4, 0, 'DF');

    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(47, 53, 4, 4, 0, 'DF');

    if ($destino == 'INTERNO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(25, 53, 4, 4, 0, 'DF');
    } else {
        if ($destino == 'EXTERNO') {
            $resp = $class->consulta("SELECT C.razon_social FROM orden_trabajo O, clientes C WHERE id_cliente = C.id AND O.id = '$_GET[id]'");
            while ($row = $class->fetch_array($resp)) {
                $razon_social = $row[0];
            }
            $this->SetFont('Arial','',7);
            $this->Text(68, 56, maxCaracter(utf8_decode($razon_social),50) ,1, 'L');
            $this->SetLineWidth(0.3);
            $this->SetFillColor(25,25,25);
            $this->RoundedRect(47, 53, 4, 4, 0, 'DF');
        }   
    }

    $this->SetTextColor(25, 25, 25);
    $this->SetFont('Arial','B',7);
    $this->Text(55, 56, utf8_decode('CLIENTE:'),1, 'L');

    $this->SetTextColor(25, 25, 25);
    $this->SetFont('Arial','B',7);
    $this->Text(8, 61, utf8_decode('CANTIDAD:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(23, 61, $cantidad ,1, 'L');

    $this->SetTextColor(25, 25, 25);
    $this->SetFont('Arial','B',7);
    $this->Text(50, 61, utf8_decode('PRESUPUESTO:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(72, 61, $presupuesto ,1, 'L');

    $this->SetY(46);
    $this->SetX(6);
    $this->multiCell(138,17, utf8_decode(''),1);

    $this->SetY(63);
    $this->SetX(6);
    $this->SetTextColor(255, 255, 255);
    $this->SetFillColor(58, 57, 60);
    $this->multiCell(138, 6, utf8_decode(''),1,'C', 1, 0, '', '', true, 0, false, true, 0);

    $this->SetFont('Arial','B',8);
    $this->Text(8, 67, utf8_decode('OBSERVACIÓNES'),1, 'L');
    $this->SetFont('Arial','',8);
    $this->SetTextColor(25, 25, 25);
    $this->Text(8, 73, $observaciones ,1, 'L');

    $this->SetTextColor(25, 25, 25);
    $this->SetY(69);
    $this->SetX(6);
    $this->multiCell(138, 15, utf8_decode(''),1);

    $this->SetFont('Arial','B',7);
    $this->Text(8, 82, utf8_decode('EFICIENCIA:'),1, 'L');
    $this->SetFont('Arial','',7);
    $this->Text(24, 82, $eficiencia ,1, 'L');

    $this->SetY(84);
    $this->SetX(6);
    $this->multiCell(138, 15, utf8_decode(''),1);

    $this->SetFont('Arial','B',6);
    $this->Text(10, 98, utf8_decode('REQUERIDO POR'),1, 'L');
    $this->Text(33, 98, utf8_decode('AUTORIZADO POR'),1, 'L');
    $this->Text(59, 98, utf8_decode('ELABORADO POR'),1, 'L');
    $this->Text(84, 98, utf8_decode('ENTREGUE CONFORME'),1, 'L');
    $this->Text(115, 98, utf8_decode('RECIBI CONFORME'),1, 'L');

    }
}

    $pdf = new PDF('L','mm',array(150,105));
    $pdf->AliasNbPages();

    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('orden_trabajo.pdf','I');
?>

