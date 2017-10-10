<?php
require('../../fpdf/fpdf.php');
include_once('../../admin/class.php');
date_default_timezone_set('America/Guayaquil');
setlocale (LC_TIME,"spanish");
    
class PDF extends FPDF {

 function RoundedRect($x, $y, $w, $h, $r, $style = '') {
    $k = $this->k;
    $hp = $this->h;
    if($style == 'F')
        $op = 'f';
    elseif($style == 'FD' || $style == 'DF')
        $op = 'B';
    else
        $op = 'S';
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

//Cabecera de página
function Header() {
    $class = new constante();
    $style3 = array('width' => 0.3, 'cap' => 'round', 'join' => 'round', 'dash' => '2, 10', 'color' => array(25, 0, 0));

    $resp = $class->consulta("SELECT * from corporativo.personal where id = '".$_GET['id']."' and estado = '1'");
    while ($row = $class->fetch_array($resp)) {
        $fecha_aplicacion = $row[25];
        $relacion_dependencia = $row[3];
        $codigo_ficha = $row[2];
        $nombres_completos = $row[4];
        $ci = $row[5];
        $fecha_nacimiento = $row[6];
        $edad = $row[7];
        $tel_fijo = $row[8];
        $tel_celular = $row[9];
        $estado_civil = $row[10];
        $cargas = $row[11];
        $email = $row[12];
        $instruccion = $row[13];
        $especialidad = $row[14];
        $vivienda = $row[15];
        $ciudad = $row[17];
        $parroquia = $row[18];
        $sector = $row[19];
        $direccion_per = $row[20];
        $sangre = $row[21];
        $alergia = $row[22];
        $enfermedad = $row[23];
        $fecha_inicio_traba = $row[24];
        $imagen = $row[29];
    }

    $resp = $class->consulta("SELECT C.nombre FROM corporativo.cargos_asignacion G, corporativo.cargos C, corporativo.personal P where P.id = G.id_personal and C.id = G.id_cargoS  and G.id_personal = '".$_GET['id']."'");
    while ($row = $class->fetch_array($resp)) {
        $cargo_p = $row[0];
    }

    $resp = $class->consulta("SELECT A.nomre_empresa, A.cargo, A.direccion, A.telf_fijo, A.telf_celular, A.nombre_jefe, A.tiempo_trab, A.ciudad FROM corporativo.trabajo_anterior A, corporativo.personal P WHERE P.id= A.id_personal and A.id_personal='".$_GET['id']."'");
    while ($row = $class->fetch_array($resp)) {
        $nom_empresa = $row[0];
        $cargo = $row[1];
        $direccion = $row[2];
        $te_fijo_trab = $row[3];
        $te_celular_trab = $row[4];
        $nom_jefe = $row[5];
        $tiempo_trab = $row[6];
        $ciudad_trab = $row[7];
    } 

    $resp = $class->consulta("SELECT D.nombres, D.parentesco, D.telefono, D.direccion, D.ciudad_fami FROM corporativo.datos_familiar D, corporativo.personal P WHERE P.id=D.id_personal and D.id_personal='".$_GET['id']."'");
    while ($row=$class->fetch_array($resp)) {
        $nom_familia = $row[0];
        $perentesco = $row[1];
        $telf_fami = $row[2];
        $direccion_fami = $row[3];
        $ciudad_fami = $row[4];
    } 

    //Logo
    $this->Image('logo.png',9,8,55);
    //Arial bold 9
    $this->SetFont('Arial','B',16);
    //Movernos a la derecha
    $this->Cell(80);
    //Título
    $this->Cell(40,25,'Ficha de Ingreso',0,0,'C');
    $this->Image('../fotos_personal/imagenes/'.$imagen, 180, 8, 25, 28);
    //Salto de línea
    $this->Ln(20);
    $this->SetFont('Arial','',11);
    $mydate = strtotime($fecha_aplicacion); 
    $this->Text(5, 45, utf8_decode('Fecha de Aplicación:'), 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(43, 45, utf8_encode(strftime("%A, %d de %B de %Y", $mydate)),1,0, 'L',0);/////nombre
    $this->SetTextColor(25,25,25);
    $this->SetFont('Arial','B',12);
    $this->Text(5, 53, 'Datos personales:',1, 'L');
    $this->SetFont('Arial','B',14);
    $this->Text(75, 53, 'FICHA Nro.',1, 'L');
    $this->SetTextColor(85,107,47); 
    $this->Text(105, 53, utf8_decode($codigo_ficha),1,0, 'L',0);/////nombre
    $this->SetTextColor(25,25,25);
    $this->SetXY(5,55);
    $this->Cell(200,20,"",1);
    $this->SetFont('Arial','',10);
    $this->Text(150, 53, utf8_decode('Relación de Dependencia:'),1, 'L');

    if(utf8_decode($relacion_dependencia) == 'true') {
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(194, 48, 5, 5, 1.5, 'DF');
    } else {
        if(utf8_decode($relacion_dependencia) == 'false') {
            $this->SetLineWidth(0.3);
            $this->SetFillColor(255);
            $this->RoundedRect(194, 48, 5, 5, 1.5, 'DF');         
        } 
    }
    
    $this->Text(7, 60, 'Nombres Completos:',1, 'L');
    $this->SetTextColor(85,107,47); 
    $this->Text(7, 65, utf8_decode($nombres_completos),1,0, 'L',0);/////nombre
    $this->SetTextColor(25,25,25); 
    $this->SetTextColor(25,25,25);
    $this->Text(110, 60, utf8_decode('Cedula de identificación:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(110, 65, utf8_decode($ci),1,0, 'L',0);////ci
    $this->SetTextColor(25,25,25);
    $this->Text(7, 72, 'Fecha de nacimiento:',1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(42, 72, utf8_decode($fecha_nacimiento),1,0, 'L',0);////fecha_nacimiento
    $this->SetTextColor(25,25,25);
    $this->Text(70, 72, 'Edad:',1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(80, 72, utf8_decode($edad),1,0, 'L',0);////edad
    $this->SetTextColor(25,25,25);
    $this->Text(95, 72, utf8_decode('Teléfono Fijo:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(118, 72, utf8_decode($tel_fijo),1,0, 'L',0);////telefono fijo
    $this->SetTextColor(25,25,25);
    $this->Text(150, 72, utf8_decode('Teléfono celular:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(177, 72, utf8_decode($tel_celular),1,0, 'L',0);////telefono celular
    $this->SetTextColor(25,25,25);

    // Datos referenciales
    $this->SetFont('Arial','B',12);
    $this->Text(5, 82, 'Datos referenciales:', 1, 'L');
    $this->SetXY(5, 84);
    $this->Cell(200,71,"",1);
    $this->SetFont('Arial','',10);
    $this->Text(7, 89, 'Estado civil:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(28, 89, utf8_decode($estado_civil),1,0, 'L',0);////estado civil
    $this->SetTextColor(25,25,25);
    $this->Text(73, 89, 'Cargas familiares:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(104, 89, utf8_decode($cargas),1,0, 'L',0);////cargas
    $this->SetTextColor(25,25,25);
    $this->Text(125, 89, 'E-mail:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(138, 89, utf8_decode($email),1,0, 'L',0);////email
    $this->SetFont('Arial','B',10);
    $this->SetTextColor(25,25,25);
    $this->Text(7, 96, utf8_decode('INSTRUCCIÓN:'), 1, 'L');
    $this->SetFont('Arial','',10);
    
    if(utf8_decode($instruccion) == 'Primaria') {
        $this->Text(35, 96, 'Primaria:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(50, 92, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(35, 96, 'Primaria:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(50, 92, 5, 5, 1.5, 'DF');
    }

    if(utf8_decode($instruccion) == 'Ciclo Basico') {
        $this->Text(58, 96, utf8_decode('Ciclo básico:'), 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(79, 92, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(58, 96, utf8_decode('Ciclo básico:'), 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(79, 92, 5, 5, 1.5, 'DF'); 
    }

    if(utf8_decode($instruccion) == 'Bachiller') {
        $this->Text(87, 96, 'Bachiller:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(103, 92, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(87, 96, 'Bachiller:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(103, 92, 5, 5, 1.5, 'DF');
    }

    if(utf8_decode($instruccion) == 'Universitario') {
        $this->Text(111, 96, 'Universitario:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(133, 92, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(111, 96, 'Universitario:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(133, 92, 5, 5, 1.5, 'DF');
    }

    $this->Text(140, 96, 'Especialidad:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(162, 96, utf8_decode($especialidad),1,0, 'L',0);////especialidad
    $this->SetTextColor(25,25,25);
    $this->Text(15, 105, 'Cursos realizados de:', 1, 'L');
    $this->Text(100, 105, 'Establecimiento:', 1, 'L');
    $this->Text(165, 105, 'Tiempo:', 1, 'L');
    $resp = $class->consulta("SELECT * FROM corporativo.cursos WHERE id_personal = '".$_GET['id']."' AND estado = '1'");
    $sum = 0;
    while ($row = $class->fetch_array($resp)) {
        $sum++;
        $nombre_curso = $row[2];
        $establecimiento_curso = $row[3];
        $tiempo_curso = $row[4];

        $this->SetTextColor(85,107,47);
        if($sum == '1') {
            $this->Text(15, 110,utf8_decode($nombre_curso),1,0, 'L',0);////nombre curso
            $this->Text(100, 110,utf8_decode($establecimiento_curso),1,0, 'L',0);////establecimiento
            $this->Text(165, 110,utf8_decode($tiempo_curso),1,0, 'L',0);////tiempo   
        } else {
            if($sum == '2') {
                $this->Text(15, 115,utf8_decode($nombre_curso),1,0, 'L',0);////nombre curso
                $this->Text(100, 115,utf8_decode($establecimiento_curso),1,0, 'L',0);////establecimiento
                $this->Text(165, 115,utf8_decode($tiempo_curso),1,0, 'L',0);////tiempo  
            } else {
                if($sum == '3') {
                    $this->Text(15, 120,utf8_decode($nombre_curso),1,0, 'L',0);////nombre curso
                    $this->Text(100, 120,utf8_decode($establecimiento_curso),1,0, 'L',0);////establecimiento
                    $this->Text(165, 120,utf8_decode($tiempo_curso),1,0, 'L',0);////tiempo
                } else {
                     if($sum == '4') {
                        $this->Text(15, 125,utf8_decode($nombre_curso),1,0, 'L',0);////nombre curso
                        $this->Text(100, 125,utf8_decode($establecimiento_curso),1,0, 'L',0);////establecimiento
                        $this->Text(165, 125,utf8_decode($tiempo_curso),1,0, 'L',0);////tiempo
                     }
                }
            }
        }       
    }

    $this->SetTextColor(25,25,25);
    $this->Text(7, 110, '1.-', 1, 'L');
    $this->Text(7, 115, '2.-', 1, 'L');
    $this->Text(7, 120, '3.-', 1, 'L');
    $this->Text(7, 125, '4.-', 1, 'L');

    if(utf8_decode($vivienda) == 'PROPIA') {
        $this->Text(7, 132, 'Vivienda propia:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(35, 128, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(7, 132, 'Vivienda propia:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(35, 128, 5, 5, 1.5, 'DF');
    }

    if(utf8_decode($vivienda) == 'ARRIENDO') {
        $this->Text(55, 132, 'Vivienda en arriendo:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(91, 128, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(55, 132, 'Vivienda en arriendo:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(91, 128, 5, 5, 1.5, 'DF');  
    }

    if(utf8_decode($vivienda) == 'FAMILIAR') {
        $this->Text(112, 132, 'Vivienda familiar:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(141, 128, 5, 5, 1.5, 'DF'); 
    } else {
        $this->Text(112, 132, 'Vivienda familiar:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(141, 128, 5, 5, 1.5, 'DF'); 
    }

    if(utf8_decode($vivienda) == 'OTRO') {
        $this->Text(162, 132, 'Otra:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(123,172,56);
        $this->RoundedRect(172, 128, 5, 5, 1.5, 'DF');
    } else {
        $this->Text(162, 132, 'Otra:', 1, 'L');
        $this->SetLineWidth(0.3);
        $this->SetFillColor(255);
        $this->RoundedRect(172, 128, 5, 5, 1.5, 'DF');
    }

    $this->Text(7, 140, 'Ciudad:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(21, 140, utf8_decode($ciudad),1,0, 'L',0);////barrio
    $this->SetTextColor(25,25,25);
    $this->Text(80, 140, 'Parroquia:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(98, 140, utf8_decode($parroquia),1,0, 'L',0);////barrio
    $this->SetTextColor(25,25,25);
    $this->Text(140, 140, 'Sector:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(152, 140, utf8_decode($sector),1,0, 'L',0);////barrio
    $this->SetTextColor(25,25,25);
    $this->Text(7, 146, utf8_decode('Dirección:'), 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(24, 146, utf8_decode($direccion_per),1,0, 'L',0);////direccion
    $this->SetTextColor(25,25,25);
    $this->Text(7, 152, 'Tipo de sangre:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(33, 152, utf8_decode($sangre),1,0, 'L',0);////tipo de sangre
    $this->SetTextColor(25,25,25);
    $this->Text(70, 152, utf8_decode('Alérgico antibióticos:'), 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(104, 152, utf8_decode($alergia),1,0, 'L',0);////alergias
    $this->SetTextColor(25,25,25);
    $this->Text(135, 152, 'Enfermedad especifica:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(173, 152, utf8_decode($enfermedad),1,0, 'L',0);////enfermdad especifica
    $this->SetTextColor(25,25,25);
     
    $this->SetFont('Arial','B',12);
    $this->Text(5, 162, 'Datos Bancarios:',1, 'L');
    $this->SetXY(5, 164);
    $this->Cell(200,13,"",1);
    $this->SetFont('Arial','',10);

    $resp = $class->consulta("SELECT C.nombre_cuenta, B.nombre, C.numero FROM corporativo.cuentas  C, corporativo.bancos B WHERE B.id = C.id_bancos AND C.id_personal = '".$_GET['id']."'");
    $sum1 = 0;
    while ($row = $class->fetch_array($resp)) {
        $sum1++;
        $nombre_cuenta = $row[0];
        $nombre_banco = $row[1];
        $numero_cuenta = $row[2];

        $this->SetTextColor(85,107,47);
        if($sum1 == '1') {
            if($nombre_cuenta == 'CUENTA CORRIENTE') {
                $this->Text(36, 169,utf8_decode($nombre_cuenta),1,0, 'L',0);////nombre de cuenta de bancos
                $this->Text(93, 169, utf8_decode($nombre_banco),1,0, 'L',0);////nombre del banco 
                $this->Text(165, 169 ,utf8_decode($numero_cuenta),1,0, 'L',0);////numero de cuenta de bancos  
            } else {
                if($sum1 == '2') {
                    if($nombre_cuenta == 'CUENTA DE AHORROS') {
                        $this->Text(36, 175,utf8_decode($nombre_cuenta),1,0, 'L',0);////nombre de cuenta de bancos
                        $this->Text(93, 175, utf8_decode($nombre_banco),1,0, 'L',0);////nombre del banco 
                        $this->Text(165, 175 ,utf8_decode($numero_cuenta),1,0, 'L',0);////numero de cuenta de bancos  
                    }
                }   
            }
        }
    }

    $this->SetTextColor(25,25,25);
    $this->Text(7, 169, 'Cuenta Corriente:',1, 'L');
    $this->Text(80, 169, 'Banco:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->SetTextColor(25,25,25);
    $this->Text(150, 169,  utf8_decode('Número:'), 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->SetTextColor(25,25,25);
    $this->Text(7, 175, 'Cuenta de Ahorros:',1, 'L');
    $this->Text(80, 175, 'Banco:', 1, 'L');
    $this->Text(150, 175,  utf8_decode('Número:'),1, 'L');

    $this->SetFont('Arial','B',12);
    $this->Text(5, 184, 'Trabajo anterior:',1, 'L');
    $this->SetXY(5, 186);
    $this->Cell(200,30,"",1);
    $this->SetFont('Arial','',10);
    $this->Text(7, 191, 'Nombre de la empresa:',1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(7, 196, utf8_decode($nom_empresa),1,0, 'L',0);////nombre empresa
    $this->SetTextColor(25,25,25);
    $this->Text(90, 191, utf8_decode('Télefono fijo:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(90, 196, utf8_decode($te_fijo_trab),1,0, 'L',0);////telf fijo
    $this->SetTextColor(25,25,25);
    $this->Text(150, 191, utf8_decode('Télefono celular:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(150, 196, utf8_decode($te_celular_trab),1,0, 'L',0);////telf celular
    $this->SetTextColor(25,25,25);
    $this->Text(7, 201, 'Cargo:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(7, 206,utf8_decode($cargo),1,0, 'L',0);///cargo
    $this->SetTextColor(25,25,25);
    $this->Text(90, 201, 'Nombre del Jefe:',1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(90, 206, utf8_decode($nom_jefe),1,0, 'L',0);///nombre del jefe
    $this->SetTextColor(25,25,25);
    $this->Text(150, 201, 'Tiempo Trabajo:',1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(150, 206, utf8_decode($tiempo_trab),1,0, 'L',0);///tiempo trabajado
    $this->SetTextColor(25,25,25);
    $this->Text(7, 211, utf8_decode('Dirección:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(25, 211,utf8_decode($direccion),1,0, 'L',0);///tiempo trabajado 
    $this->SetTextColor(25,25,25);
    $this->Text(150, 211, 'Ciudad:',1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(164, 211, utf8_decode($ciudad_trab),1,0, 'L',0);///ciudad de trabajo
    $this->SetTextColor(25,25,25);

    $this->SetFont('Arial','B',12);
    $this->Text(5, 223, utf8_decode('Datos de un familiar o representante si es menor de edad con firma de autorización:'), 1, 'L');
    $this->SetXY(5, 225);
    $this->Cell(200,20,"",1);
    $this->SetFont('Arial','',10);
    $this->Text(7, 230, 'Nombres:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(7, 235, utf8_decode($nom_familia),1,0, 'L',0);///nombre familiar
    $this->SetTextColor(25,25,25);
    $this->Text(90, 230, 'Parentesco:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(90, 235, utf8_decode($perentesco),1,0, 'L',0);///parentesco
    $this->SetTextColor(25,25,25);
    $this->Text(150, 230, utf8_decode('Teléfono:'), 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(150, 235, utf8_decode($telf_fami),1,0, 'L',0);///telefono familiar
    $this->SetTextColor(25,25,25);
    $this->Text(7, 240, utf8_decode('Dirección:'),1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(25, 240, utf8_decode($direccion_fami),1,0, 'L',0);///direccion familiar
    $this->SetTextColor(25,25,25);
    $this->Text(150, 240, 'Ciudad:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $this->Text(164, 240, utf8_decode($ciudad_fami),1,0, 'L',0);///ciudad familiar
    $this->SetTextColor(25,25,25);

    $this->Text(5, 250, utf8_decode('Declaro que todos los datos aquí emitidos son reales por lo tanto autorizó su verificacion, aprobacion y aceptación.'), 1, 'L');
    $this->Text(5, 257, 'Fecha de Inicio de Trabajo:', 1, 'L');
    $this->SetTextColor(85,107,47);
    $mydate2 = strtotime($fecha_inicio_traba); 
    $this->Text(50, 257, utf8_encode(strftime("%A, %d de %B de %Y", $mydate2)),1,0, 'L',0);////especialidad
    $this->SetFont('Arial','B',11);
    $this->SetTextColor(25,25,25);
    $this->Text(5, 264, utf8_decode('FUNCIÓN O CARGO A OCUPAR:'), 1, 'L');
    $this->SetFont('Arial','',11);
    $this->SetTextColor(85,107,47);
    $this->Text(70, 264, utf8_decode($cargo_p),1,0, 'L',0);///cargo de trabajo
    $this->SetTextColor(25,25,25);
    $this->SetFont('Arial','',10);
    
    ///Funcion o cargo a ocupar
    $this->SetXY(5, 267);
    $this->Cell(110,18,"",1);
    $this->Text(7, 272, 'Cargo netamente inicial y referencial, pudiendo ser removido', 1, 'L');
    $this->Text(7, 277, 'reemplazado o reubicado de acuerdo a las necesiddes de la', 1, 'L');
    $this->Text(7, 282, 'empresa y sobre todo a sus actitudes y habilidades que demuestre.', 1, 'L');

    $this->Line(190, 272, 130, 272, $style3);
    $this->Text(140, 278, 'Firma de responsabilidad', 1, 'L');
    }
}
    //Creación del objeto de la clase heredada
    $pdf = new PDF();
    $pdf->AliasNbPages();
    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    // $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('Ficha_Personal.pdf','I');
?>