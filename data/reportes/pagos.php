<?php
    require('../../fpdf/fpdf.php');
    include_once('../../admin/class.php');
    include_once('../../admin/convertir.php');
    include_once('../../admin/funciones_generales.php');
    $class = new constante();   
    $letras = new EnLetras();
    date_default_timezone_set('America/Guayaquil');
    setlocale (LC_TIME,"spanish");
    session_start();

    class PDF extends FPDF {   
        var $widths;
        var $aligns;       
        function SetWidths($w){            
            $this->widths=$w;
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

        function SetDash($black = false, $white = false) {
            if($black and $white)
                $s = sprintf('[%.3f %.3f] 0 d', $black*$this->k, $white*$this->k);
            else
                $s = '[] 0 d';
            $this->_out($s);
        }

        function Header() {                         
            // $this->AddFont('Amble-Regular','','Amble-Regular.php');
            // $this->SetFont('Amble-Regular','',10);        
            // $fecha = date('Y-m-d', time());
                                                                                                                          
            // $this->SetFont('Amble-Regular','',10);        
            // $this->Ln(3);
            // $this->SetFillColor(255,255,225);            
            // $this->SetLineWidth(0.2);                                        
        }

        function Footer() {            
            // $this->SetY(-15);            
            // $this->SetFont('Arial','I',8);            
            // $this->Cell(0,10,'Pag. '.$this->PageNo().'/{nb}',0,0,'C');
        }               
    }

    $pdf = new PDF('P','mm','a4');
    $pdf->AddPage();
    $pdf->SetMargins(0,0,0,0);
    $pdf->AliasNbPages();
    $pdf->AddFont('Amble-Regular');                    
    $pdf->SetFont('Amble-Regular','',10);       
    $pdf->SetFont('Arial','B',9);   
    $pdf->SetX(5);    
    $pdf->SetFont('Amble-Regular','',9);
    $pdf->Image('oye.jpg',25,15,150);

    $resultado = $class->consulta("SELECT U.nombres_completos FROM pagos P, usuarios U WHERE P.id_usuario = U.id AND P.id = '$_GET[id]'");
    while ($row = $class->fetch_array($resultado)) {
        $solicitante = $row[0];
    }

    $resultado2 = $class->consulta("SELECT P.fecha_solicitud, P.codigo, A.nombre, U.nombres_completos, P.detalle, P.forma_pago, P.valor_total, P.total_recibido, P.total_gasto, P.saldo FROM pagos P, usuarios U, corporativo.areas A WHERE P.destinatario = U.id AND P.id_area = A.id AND P.id = '$_GET[id]'");
    while ($row = $class->fetch_array($resultado2)) {
        $fecha_solicitud = $row[0];
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

    $pdf->SetFont('Arial','',9);
    $mydate = strtotime($fecha_solicitud);
    $pdf->Text(20, 40, utf8_encode(strftime("%A, %d de %B de %Y", $mydate)),1,0, 'L',0);/////nombre
    $pdf->Text(45, 50, utf8_decode($solicitante),1, 'L');
    $pdf->Text(45, 55, utf8_decode($dirigido),1, 'L');
    $pdf->Text(160, 50, utf8_decode($codigo),1, 'L');
    $pdf->Text(160, 55, utf8_decode($para),1, 'L');

    $pdf->SetFont('Arial','B',9);
    $pdf->Text(20, 50, utf8_decode('SOLICITANTE:'),1, 'L');
    $pdf->Text(20, 55, utf8_decode('DIRIGIDO:'),1, 'L');
    $pdf->Text(140, 50, utf8_decode('N° OFICIO:'),1, 'L');
    $pdf->Text(140, 55, utf8_decode('PARA:'),1, 'L');
    $pdf->SetFont('Arial','B',11);
    $pdf->Text(80, 65, 'SOLICITUD DE PAGOS',1, 'L');

    $pdf->setTextColor(25,25,25);
    $pdf->SetFont('Arial','',9);
    $pdf->SetY(69);
    $pdf->SetX(20);
    $pdf->multiCell(165, 3, utf8_decode($detalle),0);

    $pdf->SetFont('Arial','B',9);
    $pdf->Text(20, 84, utf8_decode('RECIBO'),1, 'L');

    $pdf->SetFont('Arial','',9);
    $pdf->Text(20, 90, utf8_decode('Yo, '.$solicitante.' recibo la cantidad de '. $letras->ValorEnLetras($valor_total, 'dolares')),1, 'L');

    $pdf->Text(20, 96, utf8_decode('EN EFECTIVO'),1, 'L');
    if ($forma_pago == 'EFECTIVO') {
        $pdf->Text(20, 103, utf8_decode('El Pago se realizo en efectivo.'),1, 'L');
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(25,25,25);
        $pdf->RoundedRect(45, 93, 4, 4, 0, 'DF');
    } else {
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(255,255,255);
        $pdf->RoundedRect(45, 93, 4, 4, 0, 'DF');
    }

    $pdf->Text(56, 96, utf8_decode('CHEQUE'),1, 'L');
    if ($forma_pago == 'CHEQUE') {
        // $resultado = $class->consulta("SELECT A.num_cheque, A.num_cuenta FROM asignacion_cheque A WHERE id_pago = '$_GET[id]'");
        // while ($row = $class->fetch_array($resultado)) {
        //     $num_cheque = $row[0];
        //     $num_cuenta = $row[1];
        // }

        // $pdf->Text(20, 103, utf8_decode('Cheque N° '.$num_cheque.'          Cuenta N° '.$num_cuenta .'          Banco '.$num_cuenta),1, 'L');

        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(25,25,25);
        $pdf->RoundedRect(73, 93, 4, 4, 0, 'DF');
    } else {
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(255,255,255);
        $pdf->RoundedRect(73, 93, 4, 4, 0, 'DF');
    }

    $pdf->Text(85, 96, utf8_decode('DEPÓSITO'),1, 'L');
    if ($forma_pago == 'DEPÓSITO') {
        // $resultado = $class->consulta("SELECT A.num_deposito, B.nombre FROM asignacion_deposito A, corporativo.bancos B WHERE A.banco = B.id AND id_pago = '$_GET[id]'");
        // while ($row = $class->fetch_array($resultado)) {
        //     $num_deposito = $row[0];
        //     $banco = $row[1];
        // }

        // $pdf->Text(20, 103, utf8_decode('El Pago se realizo con el depósito N° '.$num_deposito.' en el Banco '.$banco),1, 'L');

        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(25,25,25);
        $pdf->RoundedRect(105, 93, 4, 4, 0, 'DF');    
    } else {
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(255,255,255);
        $pdf->RoundedRect(105, 93, 4, 4, 0, 'DF');
    }

    $pdf->Text(117, 96, utf8_decode('TRANSFERENCIA'),1, 'L');
    if ($forma_pago == 'TRANSFERENCIA') {
        // $resultado = $class->consulta("SELECT A.num_transferencia, B.nombre FROM asignacion_transferencia A, corporativo.bancos B WHERE A.origen = B.id AND id_pago = '$_GET[id]'");
        // while ($row = $class->fetch_array($resultado)) {
        //     $num_transferencia = $row[0];
        //     $desde = $row[1];
        // }

        // $resultado1 = $class->consulta("SELECT B.nombre FROM asignacion_transferencia A, corporativo.bancos B WHERE A.destino = B.id AND id_pago = '$_GET[id]'");
        // while ($row1 = $class->fetch_array($resultado1)) {
        //     $hacia = $row1[0];
        // }

        // $pdf->Text(20, 103, utf8_decode('El Pago se realizó con la trasferencia N° '.$num_transferencia.' del Banco '.$desde.' hacia el Banco del '.$hacia),1, 'L');

        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(25,25,25);
        $pdf->RoundedRect(147, 93, 4, 4, 0, 'DF');    
    } else {
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(255,255,255);
        $pdf->RoundedRect(147, 93, 4, 4, 0, 'DF');
    }

    $pdf->Text(160, 96, utf8_decode('OTROS'),1, 'L');
    if ($forma_pago == 'OTROS') {
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(25,25,25);
        $pdf->RoundedRect(175, 93, 4, 4, 0, 'DF');    
    } else {
        $pdf->SetLineWidth(0.3);
        $pdf->SetFillColor(255,255,255);
        $pdf->RoundedRect(175, 93, 4, 4, 0, 'DF');
    }

    $pdf->SetFont('Arial','B',8);
    $pdf->SetY(109);
    $pdf->SetX(20);
    $pdf->multiCell(45, 6, utf8_decode('DESTINATARIO'),1,'C');

    $pdf->SetY(109);
    $pdf->SetX(65);
    $pdf->multiCell(40, 6, utf8_decode('DESCRIPCIÓN'),1,'C');

    $pdf->SetY(109);
    $pdf->SetX(105);
    $pdf->multiCell(40, 6, utf8_decode('CONCEPTO'),1,'C');

    $pdf->SetY(109);
    $pdf->SetX(145);
    $pdf->multiCell(23, 6, utf8_decode('PERIODO'),1,'C');

    $pdf->SetY(109);
    $pdf->SetX(168);
    $pdf->multiCell(23, 6, utf8_decode('VALOR'),1,'C');

    $resp = $class->consulta("SELECT * FROM detalle_pagos WHERE id_pago = '".$_GET['id']."' ORDER BY id asc");
    $posiciony = 115;
    while ($row = $class->fetch_array($resp)) {
        $proveedor = $row[2];
        $descripcion = $row[3];
        $concepto = $row[4];
        $periodo = $row[5];
        $valor = $row[6];

        $pdf->SetFont('Arial','',8);

        $pdf->SetY($posiciony);
        $pdf->SetX(20);
        $pdf->multiCell(45,6, utf8_decode($proveedor),1);

        $pdf->SetY($posiciony);
        $pdf->SetX(65);
        $pdf->multiCell(40,6, utf8_decode($descripcion),1);

        $pdf->SetY($posiciony);
        $pdf->SetX(105);
        $pdf->multiCell(40,6, utf8_decode($concepto),1);

        $pdf->SetY($posiciony);
        $pdf->SetX(145);
        $pdf->multiCell(23,6, utf8_decode($periodo),1);

        $pdf->SetY($posiciony);
        $pdf->SetX(168);
        $pdf->multiCell(23,6, utf8_decode($valor),1);

        $posiciony = $posiciony + 6;
    }

    $pdf->SetFont('Arial','B',8);
    $pdf->SetY($posiciony);
    $pdf->SetX(20);
    $pdf->multiCell(45,6, utf8_decode('TOTAL'),1);

    $pdf->SetY($posiciony);
    $pdf->SetX(65);
    $pdf->multiCell(40,6, utf8_decode(''),1);

    $pdf->SetY($posiciony);
    $pdf->SetX(105);
    $pdf->multiCell(40,6, utf8_decode(''),1);

    $pdf->SetY($posiciony);
    $pdf->SetX(145);
    $pdf->multiCell(23,6, utf8_decode(''),1);

    $pdf->SetY($posiciony);
    $pdf->SetX(168);
    $pdf->multiCell(23,6, utf8_decode($valor_total),1);

    $pdf->SetY($posiciony + 15);
    $pdf->SetX(20);
    $pdf->multiCell(45, 5, utf8_decode('DESCARGOS'),0,'');

    $pdf->SetFont('Arial','',8);
    $pdf->SetY($posiciony + 25);
    $pdf->SetX(60);
    $pdf->multiCell(45, 5, utf8_decode('TOTAL RECIBIDO'),1,'');

    $pdf->SetY($posiciony + 25);
    $pdf->SetX(105);
    $pdf->multiCell(25, 5, utf8_decode('$ '.$total_recibido),1,'');

    $pdf->SetY($posiciony + 30);
    $pdf->SetX(60);
    $pdf->multiCell(45, 5, utf8_decode('TOTAL DEL GASTO REAL'),1,'');

    $pdf->SetY($posiciony + 30);
    $pdf->SetX(105);
    $pdf->multiCell(25, 5, utf8_decode('$ '.$total_gasto),1,'');

    $pdf->SetFont('Arial','B',8);
    $pdf->SetY($posiciony + 35);
    $pdf->SetX(60);
    $pdf->multiCell(45, 5, utf8_decode('SALDO'),1,'');

    $pdf->SetY($posiciony + 35);
    $pdf->SetX(105);
    $pdf->multiCell(25, 5, utf8_decode('$ '.$saldo),1,'');

    $pdf->SetY($posiciony + 35);
    $pdf->SetX(130);
    $pdf->multiCell(10, 5, utf8_decode('+/-'),1,'C');

    $pdf->SetFont('Arial','',8);
    $pdf->SetY(270);
    $pdf->SetX(40);
    $pdf->multiCell(30, 5, utf8_decode('CONFIRMADO POR'),0,'C');

    $pdf->SetY(270);
    $pdf->SetX(120);
    $pdf->multiCell(45, 5, utf8_decode('APROBADO POR GERENCIA'),0,'C');
         
    $pdf->Output();
?>