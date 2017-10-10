<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);

	// require '../../admin/class.phpmailer.php';
	// require '../../admin/PHPMailerAutoload.php';
	// require '../../admin/class.smtp.php';
	// $mail = new PHPMailer(true);

	// // clases envio de correos locales 
	// class email  extends PHPMailer {
	//     //datos de remitente
	//     var $tu_email = 'oskr.trov@gmail.com';
	//     var $tu_nombre = 'Conceptual Business Group';
	//     var $tu_password ='oskrin91';

	//     public function __construct() {
	// 	    //configuracion general
	// 	    $this->IsSMTP(); // protocolo de transferencia de correo
	// 	    $this->Host = 'smtp.gmail.com' or 'smtp.live.com' or 'smtp.mail.yahoo.com';  // Servidor GMAIL
	// 	    $this->Port = 465 or 25; //puerto
	// 	    $this->SMTPAuth = true; // Habilitar la autenticación SMTP
	// 	    $this->Username = $this->tu_email;
	// 	    $this->Password = $this->tu_password;
	// 	    $this->SMTPSecure = 'ssl';  //habilita la encriptacion SSL
	// 	    //remitente
	// 	    $this->From = $this->tu_email;
	//     	$this->FromName = $this->tu_nombre;
	//     }

	//     public function enviar( $para, $nombre, $titulo , $contenido) {
	//        	$this->AddAddress( $para ,  $nombre );  // Correo y nombre a quien se envia
	//        	$this->WordWrap = 50; // Ajuste de texto
	//        	$this->IsHTML(true); //establece formato HTML para el contenido
	//        	$this->Subject =$titulo;
	//        	$this->Body    =  $contenido; //contenido con etiquetas HTML
	//        	$this->AltBody =  strip_tags($contenido); //Contenido para servidores que no aceptan HTML
	//        	//envio de e-mail y retorno de resultado
	//        	return $this->Send() ;
	//     }
	// }
	// // fin

	$cont = 0; 
	$fecha = $class->fecha_hora();

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_usuarios = $class->idz();
		$id_privilegios = $class->idz();
		// $contrasenia = md5($_POST['clave2']);
		$arreglo = array('require',
						'presentacion',
						'quienes_somos',
						'mision_vision',
						'politicas',
						'reglamento',
						'funciones', 
						'tipo_paquetes', 
						'paquetes', 
						'tipo_programa',
						'tipo_vendedor',
						'tipo_contrato',
						'areas',
						'cargos',
						'bancos',
						'empresa',
						'clientes',
						'programas',
						'vendedores',
						'ficha_ingresos',
						'ficha_invitados',
						'ficha_programas',
						'contratos_selectivos',
						'contratos_rotativos',
						'facturas',
						'rol_pagos',
						'usuarios',
						'fotos_usuario',
						'perfiles',
						'privilegios',
						'calendario',
						'galeria',
						'configuracion');

		$array = json_encode($arreglo);

	    //Se define una cadena de caractares. Te recomiendo que uses esta.
	    $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
	    //Obtenemos la longitud de la cadena de caracteres
	    $longitudCadena = strlen($cadena);
	     
	    //Se define la variable que va a contener la contraseña
	    $pass = "";
	    //Se define la longitud de la contraseña, en mi caso 10, pero puedes poner la longitud que quieras
	    $longitudPass = 10;
	     
	    //Creamos la contraseña
	    for($i = 1 ; $i <= $longitudPass ; $i++){
	        //Definimos numero aleatorio entre 0 y la longitud de la cadena de caracteres-1
	        $pos = rand(0,$longitudCadena-1);
	     
	        //Vamos formando la contraseña en cada iteraccion del bucle, añadiendo a la cadena $pass la letra correspondiente a la posicion $pos en la cadena de caracteres definida.
	        $pass .= substr($cadena,$pos,1);
	    }

		$contrasenia = md5($pass);

		$resp = $class->consulta("INSERT INTO usuarios VALUES (			'$id_usuarios',
																		'$_POST[select_cargo]',
																		'$_POST[nombres_completos]',
																		'$_POST[identificacion]',
																		'$_POST[telefono]',
																		'$_POST[celular]',
																		'$_POST[correo]',
																		'$_POST[ciudad]',
																		'$_POST[direccion]',
																		'$_POST[usuario]',
																		'$contrasenia',
																		'defaul.jpg',
																		'1', 
																		'$fecha',
																		'0')");

		$resp = $class->consulta("INSERT INTO privilegios VALUES (		'$id_privilegios',
																		'$id_usuarios',
																		'$array',
																		'1', 
																		'$fecha')");
		$para = $_POST['correo'];
		$titulo = utf8_decode('Credenciales de Acceso');
		$contenido_html = utf8_decode( 
		'<!doctype html>
			<html xmlns="http://www.w3.org/1999/xhtml">
			     <head>
			      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			      <meta name="viewport" content="initial-scale=1.0" />
			      <meta name="format-detection" content="telephone=no" />
			      <title></title>
			      <style type="text/css">
			        body {
			          width: 100%;
			          margin: 0;
			          padding: 0;
			          -webkit-font-smoothing: antialiased;
			        }
			        @media only screen and (max-width: 600px) {
			          table[class="table-row"] {
			            float: none !important;
			            width: 98% !important;
			            padding-left: 20px !important;
			            padding-right: 20px !important;
			          }
			          table[class="table-row-fixed"] {
			            float: none !important;
			            width: 98% !important;
			          }
			          table[class="table-col"], table[class="table-col-border"] {
			            float: none !important;
			            width: 100% !important;
			            padding-left: 0 !important;
			            padding-right: 0 !important;
			            table-layout: fixed;
			          }
			          td[class="table-col-td"] {
			            width: 100% !important;
			          }
			          table[class="table-col-border"] + table[class="table-col-border"] {
			            padding-top: 12px;
			            margin-top: 12px;
			            border-top: 1px solid #E8E8E8;
			          }
			          table[class="table-col"] + table[class="table-col"] {
			            margin-top: 15px;
			          }
			          td[class="table-row-td"] {
			            padding-left: 0 !important;
			            padding-right: 0 !important;
			          }
			          table[class="navbar-row"] , td[class="navbar-row-td"] {
			            width: 100% !important;
			          }
			          img {
			            max-width: 100% !important;
			            display: inline !important;
			          }
			          img[class="pull-right"] {
			            float: right;
			            margin-left: 11px;
			                  max-width: 125px !important;
			            padding-bottom: 0 !important;
			          }
			          img[class="pull-left"] {
			            float: left;
			            margin-right: 11px;
			            max-width: 125px !important;
			            padding-bottom: 0 !important;
			          }
			          table[class="table-space"], table[class="header-row"] {
			            float: none !important;
			            width: 98% !important;
			          }
			          td[class="header-row-td"] {
			            width: 100% !important;
			          }
			        }
			        @media only screen and (max-width: 480px) {
			          table[class="table-row"] {
			            padding-left: 16px !important;
			            padding-right: 16px !important;
			          }
			        }
			        @media only screen and (max-width: 320px) {
			          table[class="table-row"] {
			            padding-left: 12px !important;
			            padding-right: 12px !important;
			          }
			        }
			        @media only screen and (max-width: 458px) {
			          td[class="table-td-wrap"] {
			            width: 100% !important;
			          }
			        }
			      </style>
			     </head>
			        <body style="font-family: Arial, sans-serif; font-size:13px; color: #444444; min-height: 200px;" bgcolor="#E4E6E9"  leftmargin="0" topmargin="0" marginheight="0" marginwidth="0">
			           <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
			           <tr><td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;">
			          <table><tr><td class="table-td-wrap" align="center" width="458"><table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table>
			          <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

			          <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
			            <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
			              <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #84CA47; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px; text-align: center;" valign="top" align="left">CREDENCIALES DE ACCESO</td></tr></tbody></table>
			              <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px; text-align: center;">
			              	<h4 style="color: #84CA47;">Hola,'.$_POST['nombres_completos'].'</h4>
			                <b style="color: #777777;">Usuario: '.$_POST['identificacion'].'
			                <br>
			                <b style="color: #777777;">Contraseña: '.$pass.'
			                <br>
			                No olvides cambiar tu contraseña por seguridad.
			                <br>
			                <h4 style="color: #84CA47;">Por favor ingrese al sistema.</h4>
			              </div>
			            </td></tr></tbody></table>
			          </td></tr></tbody></table>
			              
			          <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
			          <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp;<table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>
			          <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

			          <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
			            <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
			              <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;">
			                <a href="http://administracion.oyefm.com/login/" style="color: #ffffff; text-decoration: none; margin: 0px; text-align: center; vertical-align: baseline; border: 4px solid #28ca1d; padding: 4px 9px; font-size: 15px; line-height: 21px; background-color: #28ca1d;">&nbsp; INGRESAR &nbsp;</a>
			              </div>
			              <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
			            </td></tr></tbody></table>
			          </td></tr></tbody></table>

			          <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

			          <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left">
			            <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left">
						    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top">
				            <a href="#" style="color: #428bca; text-decoration: none; background-color: transparent;">Conceptual Business Group OYEFM &copy; 2015-2016</a>
				          </td></tr></tbody></table>
			            </td></tr></tbody></table>
			          </td></tr></tbody></table>
			        </body>
			</html>');
		// Cabecera que especifica que es un HMTL
		$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		 
		// Cabeceras adicionales
		$cabeceras .= 'From: Conceptual Business Group <tarifas@example.com>' . "\r\n";
		$cabeceras .= 'Cc: archivotarifas@example.com' . "\r\n";
		$cabeceras .= 'Bcc: copiaoculta@example.com' . "\r\n";

		mail($para, $titulo, $contenido_html, $cabeceras);

		// $email = new email();
		// $email->enviar($para , $titulo, utf8_decode('CREDENCIALES DE ACCESO'),  $contenido_html);

		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE usuarios SET			        id_perfil = '$_POST[select_cargo]',
																		nombres_completos = '$_POST[nombres_completos]',
																		cedula = '$_POST[identificacion]',
																		telefono = '$_POST[telefono]',
																		celular = '$_POST[celular]',
																		email = '$_POST[correo]',
																		ciudad = '$_POST[ciudad]',
																		direccion = '$_POST[direccion]',
																		usuario = '$_POST[usuario]',
																		fecha_creacion = '$fecha' WHERE id = '$_POST[id_usuario]'");	
		$data = 2;
		echo $data;
	}

	//comparar identificacion usuarios
	if (isset($_POST['comparar_cedula'])) {
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE cedula = '$_POST[cedula]' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$cont++;
		}

		if ($cont == 0) {
		    $data = 0;
		} else {
		    $data = 1;
		}
		echo $data;
	}
	// fin

	//LLena combo cargos
	if (isset($_POST['llenar_cargo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM perfiles WHERE estado='1' order by id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	if ($_POST['oper'] == "del") {
		$resp = $class->consulta("UPDATE usuarios SET estado = '0', chat = '0' WHERE id = '$_POST[id]'");
		$data = "4";	
	}
?>