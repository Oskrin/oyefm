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
    $resp = $class->consulta("SELECT P.serie_permiso, P.codigo, P.ciudad, P.fecha_permiso, U.nombres_completos, U.cedula, C.nombres_completos, C.cedula_identificacion, P.horas, P.dias, P.hora_salida, P.regreso, P.hora_retorno, P.tiempo_salida, P.asunto, P.lugar, P.parte_de, P.cargos_a, P.tipo_permiso FROM rol_pagos.permisos P, corporativo.personal C, usuarios U WHERE P.id_personal = C.id AND P.id_usuario = U.id AND P.id = '$_GET[id]'");

    while ($row = $class->fetch_array($resp)) {
        $serie_permiso = $row[0];
        $codigo = $row[1];
        $ciudad = $row[2];
        $fecha_permiso = $row[3];
        $dirigido = $row[4];
        $solicitante = $row[6];
        $horas = $row[8];
        $dias = $row[9];
        $hora_salida = $row[10];
        $regreso = $row[11];
        $hora_retorno = $row[12];
        $tiempo_salida = $row[13];
        $asunto = $row[14];
        $lugar = $row[15];
        $parte_de = $row[16];
        $cargos_a = $row[17];
        $tipo_permiso = $row[18];
    } 
    
    $this->SetFont('Arial','B',11);
    $this->Text(78, 11, 'AVISO TEMPORAL DE '. $tipo_permiso,1, 'L');

    $this->SetFont('Arial','',9);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(76, 12, 20, 7, 1.5, 'DF');
    $this->SetFont('Arial','',7);

    $codigo_nomina = '';
    $resp = $class->consulta("SELECT N.codigo_nomina FROM rol_pagos.asignacion_permisos A, rol_pagos.nomina N, rol_pagos.permisos P WHERE A.id_nomina = N.id AND A.id_permisos = P.id AND P.id = '$_GET[id]'");
    while ($row = $class->fetch_array($resp)) {
        $codigo_nomina = $row[0];
    }
    
    if ($resp) {
        $this->Text(77, 17, utf8_decode($codigo_nomina) ,1, 'L');         
    } else {
        $this->Text(77, 17, utf8_decode($codigo_nomina) ,1, 'L');    
    }

    $this->SetFont('Arial','B',11);
    $this->SetLineWidth(0.3);
    $this->SetFillColor(255,255,255);
    $this->RoundedRect(97, 12, 47, 7, 1.5, 'DF');
    $this->setTextColor(255,87,51);
    $this->Text(100, 17, utf8_decode('PS-   N°-     '.$serie_permiso) ,1, 'L');

    $this->setTextColor(25,25,25);
    $this->SetFont('Arial','',7);
    $this->SetY(21);
    $this->SetX(6);
    $this->multiCell(45, 7, utf8_decode('CÓDIGO:'),1);
    $this->Text(19, 25, utf8_decode($codigo) ,1, 'L');

    $this->SetY(21);
    $this->SetX(51);
    $this->multiCell(48, 7, utf8_decode('CIUDAD:'),1);
    $this->Text(63, 25, utf8_decode($ciudad) ,1, 'L');

    $this->SetY(21);
    $this->SetX(99);
    $this->multiCell(45, 7, utf8_decode('FECHA:'),1);
    $this->Text(110, 25, utf8_decode($fecha_permiso) ,1, 'L');

    $this->SetY(28);
    $this->SetX(6);
    $this->multiCell(138, 7, utf8_decode('Me dirijo a Usted:'),1);
    $this->Text(28, 32, utf8_decode($dirigido) ,1, 'L');

    $this->SetFont('Arial','',7);
    $this->SetY(36);
    $this->SetX(6);
    $this->multiCell(138, 7, utf8_decode('Yo,  '.$solicitante.', solicito de usted, para ausentarme de mis labores cotidianas, durante: '.$horas.' Horas '.$dias.' Días'),1);

    $this->SetFont('Arial','B',6);
    $this->SetY(50);
    $this->SetX(6);
    $this->multiCell(18, 7, utf8_decode('HORA SALIDA'),1, 'C');
    $this->Text(11, 62, utf8_decode($hora_salida) ,1, 'L');

    $this->SetY(57);
    $this->SetX(6);
    $this->multiCell(18, 7, utf8_decode(''),1, 'C');

    $this->SetY(50);
    $this->SetX(24);
    $this->multiCell(21, 7, utf8_decode('¿REGRESÓ?'),1, 'C');
    $this->Text(25, 62, utf8_decode('SI'),1, 'L');
    $this->Text(35, 62, utf8_decode('NO'),1, 'L');

    if ($regreso == 'SI') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(28, 59, 4, 4, 0, 'DF');
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(28, 59, 4, 4, 0, 'DF');
    }

    if ($regreso == 'NO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(39, 59, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(39, 59, 4, 4, 0, 'DF');
    }

    $this->SetY(57);
    $this->SetX(24);
    $this->multiCell(21, 7, utf8_decode(''),1, 'C');

    $this->SetY(50);
    $this->SetX(45);
    $this->multiCell(20, 7, utf8_decode('HORA RETORNO'),1, 'C');
    $this->Text(50, 62, utf8_decode($hora_retorno) ,1, 'L');

    $this->SetY(57);
    $this->SetX(45);
    $this->multiCell(20, 7, utf8_decode(''),1, 'C');

    $this->SetY(50);
    $this->SetX(65);
    $this->multiCell(24, 7, utf8_decode('TIEMPO DE SALIDA'),1, 'C');
    $this->Text(67, 62, utf8_decode($tiempo_salida) ,1, 'L');

    $this->Text(99, 54, utf8_decode($asunto) ,1, 'L');
    $this->Text(99, 61, utf8_decode($lugar) ,1, 'L');

    $this->SetY(57);
    $this->SetX(65);
    $this->multiCell(24, 7, utf8_decode(''),1, 'C');

    $this->SetY(50);
    $this->SetX(89);
    $this->multiCell(55, 7, utf8_decode('Asunto:'),1);

    $this->SetY(57);
    $this->SetX(89);
    $this->multiCell(55, 7, utf8_decode('Lugar:'),1);

    $this->SetY(65);
    $this->SetX(6);
    $this->multiCell(65, 7, utf8_decode('SON PARTE DE:'),1, 'C');

    $this->SetY(72);
    $this->SetX(6);
    $this->multiCell(65, 7, utf8_decode(''),1, 'C');

    $this->Text(7, 77, utf8_decode('COMISIÓN OFICIAL'),1, 'L');
    $this->Text(36, 77, utf8_decode('ASUNTO PARTICULAR'),1, 'L');
    
    if ($parte_de == 'COMISIÓN OFICIAL') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(28, 74, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(28, 74, 4, 4, 0, 'DF');
    }

    if ($parte_de == 'ASUNTO PARTICULAR') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(61, 74, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(61, 74, 4, 4, 0, 'DF');
    }

    $this->SetY(65);
    $this->SetX(71);
    $this->multiCell(73, 7, utf8_decode('CON CARGOS A:'),1, 'C');

    $this->Text(72, 77, utf8_decode('DESCUENTOS'),1, 'L');
    $this->Text(95, 77, utf8_decode('VACACIONES'),1, 'L');
    $this->Text(117, 77, utf8_decode('NINGUNO'),1, 'L');

    if ($cargos_a == 'DESCUENTOS') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(88, 74, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(88, 74, 4, 4, 0, 'DF');
    }

    if ($cargos_a == 'VACACIONES') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(110, 74, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(110, 74, 4, 4, 0, 'DF');
    }

    if ($cargos_a == 'NINGUNO') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(25,25,25);
        $this->RoundedRect(128, 74, 4, 4, 0, 'DF');    
    } else {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255,255,255);
        $this->RoundedRect(128, 74, 4, 4, 0, 'DF');
    }

    $this->SetY(72);
    $this->SetX(71);
    $this->multiCell(73, 7, utf8_decode(''),1, 'C');

    $this->SetY(80);
    $this->SetX(6);
    $this->multiCell(46, 14, utf8_decode(''),1, 'C');

    $this->SetY(94);
    $this->SetX(6);
    $this->multiCell(46, 7, utf8_decode('SOLICITANTE'),1);

    $this->SetY(80);
    $this->SetX(52);
    $this->multiCell(46, 14, utf8_decode(''),1, 'C');

    $this->SetY(94);
    $this->SetX(52);
    $this->multiCell(46, 7, utf8_decode('JEFE DEPARTAMENTO'),1);

    $this->SetY(80);
    $this->SetX(98);
    $this->multiCell(46, 14, utf8_decode(''),1, 'C');

    $this->SetY(94);
    $this->SetX(98);
    $this->multiCell(46, 7, utf8_decode('GERENCIA / ADMINISTRADOR / GESTIÓN'),1);

    $this->Text(7, 83, utf8_decode('FIRMA'),1, 'L');
    $this->Text(53, 83, utf8_decode('FIRMA'),1, 'L');
    $this->Text(99, 83, utf8_decode('FIRMA'),1, 'L');
    }
}

    $pdf = new PDF('L','mm',array(150,105));
    $pdf->AliasNbPages();

    // Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('permisos.pdf','I');
?>

