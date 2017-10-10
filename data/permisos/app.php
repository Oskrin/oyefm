<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
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
	
	$fecha = $class->fecha_hora();
	$cont = 0;
	// guardar permisos
	if (isset($_POST['btn_guardar_permiso']) == "btn_guardar_permiso") {
		$id_permiso = $class->idz();
		$data = "";
		$regreso = "NO";
		if(isset($_POST["regreso"]))
			$regreso = "SI";
		
		$resp = $class->consulta("INSERT INTO rol_pagos.permisos VALUES  (			'$id_permiso',
																					'".$_SESSION['user']['id']."',
																					'$_POST[serie_permiso]',
																					'$_POST[ciudad]',
																					'$_POST[fecha_permiso]',
																					'$_POST[select_empleado]',
																					'$_POST[horas]',
																					'$_POST[dias]',
																					'$_POST[hora_salida]',
																					'$regreso',
																					'$_POST[hora_retorno]',
																					'$_POST[tiempo_salida]',
																					'$_POST[asunto]',
																					'$_POST[lugar]',
																					'$_POST[select_parte]',
																					'$_POST[select_motivo_cargos]',
																					'$_POST[codigo_permiso]',
																					'$_POST[select_tipo_permiso]',
																					'1', 
																					'$fecha')");
		$data = $id_permiso;
		echo $data;

		$resultado = $class->consulta("SELECT P.nombres_completos FROM corporativo.personal P WHERE P.id = '$_POST[select_empleado]'");
		while ($row=$class->fetch_array($resultado)) {
			$nombres_completos_solicitante = $row[0];
		}

		$resultado = $class->consulta("SELECT U.nombres_completos FROM usuarios U WHERE U.id = '".$_SESSION['user']['id']."'");
		while ($row=$class->fetch_array($resultado)) {
			$nombres_completos_responsable = $row[0];
		}

		// $para = 'oskrs11@hotmail.com';
		// $titulo = utf8_decode('Confirmación Permisos');
		// $contenido_html = utf8_decode( 
		// '<!doctype html>
		// 	<html xmlns="http://www.w3.org/1999/xhtml">
		// 	     <head>
		// 	      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		// 	      <meta name="viewport" content="initial-scale=1.0" />
		// 	      <meta name="format-detection" content="telephone=no" />
		// 	      <title></title>
		// 	      <style type="text/css">
		// 	        body {
		// 	          width: 100%;
		// 	          margin: 0;
		// 	          padding: 0;
		// 	          -webkit-font-smoothing: antialiased;
		// 	        }
		// 	        @media only screen and (max-width: 600px) {
		// 	          table[class="table-row"] {
		// 	            float: none !important;
		// 	            width: 98% !important;
		// 	            padding-left: 20px !important;
		// 	            padding-right: 20px !important;
		// 	          }
		// 	          table[class="table-row-fixed"] {
		// 	            float: none !important;
		// 	            width: 98% !important;
		// 	          }
		// 	          table[class="table-col"], table[class="table-col-border"] {
		// 	            float: none !important;
		// 	            width: 100% !important;
		// 	            padding-left: 0 !important;
		// 	            padding-right: 0 !important;
		// 	            table-layout: fixed;
		// 	          }
		// 	          td[class="table-col-td"] {
		// 	            width: 100% !important;
		// 	          }
		// 	          table[class="table-col-border"] + table[class="table-col-border"] {
		// 	            padding-top: 12px;
		// 	            margin-top: 12px;
		// 	            border-top: 1px solid #E8E8E8;
		// 	          }
		// 	          table[class="table-col"] + table[class="table-col"] {
		// 	            margin-top: 15px;
		// 	          }
		// 	          td[class="table-row-td"] {
		// 	            padding-left: 0 !important;
		// 	            padding-right: 0 !important;
		// 	          }
		// 	          table[class="navbar-row"] , td[class="navbar-row-td"] {
		// 	            width: 100% !important;
		// 	          }
		// 	          img {
		// 	            max-width: 100% !important;
		// 	            display: inline !important;
		// 	          }
		// 	          img[class="pull-right"] {
		// 	            float: right;
		// 	            margin-left: 11px;
		// 	                  max-width: 125px !important;
		// 	            padding-bottom: 0 !important;
		// 	          }
		// 	          img[class="pull-left"] {
		// 	            float: left;
		// 	            margin-right: 11px;
		// 	            max-width: 125px !important;
		// 	            padding-bottom: 0 !important;
		// 	          }
		// 	          table[class="table-space"], table[class="header-row"] {
		// 	            float: none !important;
		// 	            width: 98% !important;
		// 	          }
		// 	          td[class="header-row-td"] {
		// 	            width: 100% !important;
		// 	          }
		// 	        }
		// 	        @media only screen and (max-width: 480px) {
		// 	          table[class="table-row"] {
		// 	            padding-left: 16px !important;
		// 	            padding-right: 16px !important;
		// 	          }
		// 	        }
		// 	        @media only screen and (max-width: 320px) {
		// 	          table[class="table-row"] {
		// 	            padding-left: 12px !important;
		// 	            padding-right: 12px !important;
		// 	          }
		// 	        }
		// 	        @media only screen and (max-width: 458px) {
		// 	          td[class="table-td-wrap"] {
		// 	            width: 100% !important;
		// 	          }
		// 	        }
		// 	      </style>
		// 	     </head>
		// 	        <body style="font-family: Arial, sans-serif; font-size:13px; color: #444444; min-height: 200px;" bgcolor="#E4E6E9"  leftmargin="0" topmargin="0" marginheight="0" marginwidth="0">
		// 	           <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
		// 	           <tr><td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;">
		// 	          <table><tr><td class="table-td-wrap" align="center" width="458"><table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table>
		// 	          <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

		// 	          <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
		// 	            <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
		// 	              <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #84CA47; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px; text-align: center;" valign="top" align="left">AVISO TEMPORAL DE SALIDA!</td></tr></tbody></table>
		// 	              <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px; text-align: center;">
		// 	                <b style="color: #777777;">Yo, '.$nombres_completos_solicitante.', solicito de usted, para ausentarme de mis labores cotidianas el '.$_POST['fecha_permiso'].', durante: '.$_POST['horas'].' Horas,  '.$_POST['dias'].' Días.
		// 	                <br>
		// 	                Asunto: '.$_POST['asunto'].'.
		// 	                <br>
		// 	                Responsable: '.$nombres_completos_responsable.'.
		// 	                <br>
		// 	                Por favor confirme el permiso para continuar.
		// 	              </div>
		// 	            </td></tr></tbody></table>
		// 	          </td></tr></tbody></table>
			              
		// 	          <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
		// 	          <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp;<table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>
		// 	          <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

		// 	          <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
		// 	            <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
		// 	              <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;">
		// 	                <a href="https://www.ecomontestour.oyefm.com/ingresar.php" style="color: #ffffff; text-decoration: none; margin: 0px; text-align: center; vertical-align: baseline; border: 4px solid #28ca1d; padding: 4px 9px; font-size: 15px; line-height: 21px; background-color: #28ca1d;">&nbsp; Permitir &nbsp;</a>
		// 	                <a href="https://www.ecomontestour.oyefm.com/ingresar.php" style="color: #ffffff; text-decoration: none; margin: 0px; text-align: center; vertical-align: baseline; border: 4px solid #CA1D27; padding: 4px 9px; font-size: 15px; line-height: 21px; background-color: #CA1D27;">&nbsp; Negar &nbsp;</a>
		// 	              </div>
		// 	              <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
		// 	            </td></tr></tbody></table>
		// 	          </td></tr></tbody></table>

		// 	          <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

		// 	          <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left">
		// 	            <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left">
		// 				    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top">
		// 		            <a href="#" style="color: #428bca; text-decoration: none; background-color: transparent;">Conceptual Business Group OYEFM &copy; 2015-2016</a>
		// 		          </td></tr></tbody></table>
		// 	            </td></tr></tbody></table>
		// 	          </td></tr></tbody></table>
		// 	        </body>
		// 	</html>');
		// // Cabecera que especifica que es un HMTL
		// $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		// $cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		 
		// // Cabeceras adicionales
		// $cabeceras .= 'From: OYEFM <tarifas@example.com>' . "\r\n";
		// $cabeceras .= 'Cc: archivotarifas@example.com' . "\r\n";
		// $cabeceras .= 'Bcc: copiaoculta@example.com' . "\r\n";

		// $email = new email();
		// $email->enviar($para , $titulo, utf8_decode('AVISO TEMPORAL DE SALIDA'),  $contenido_html);
		
		// mail($para, $titulo, $contenido_html, $cabeceras);	
	}
	// fin

	if (isset($_POST['btn_modificar']) == "btn_modificar") {
		$data = "";
		$regreso = "NO";
		if(isset($_POST["regreso"]))
			$regreso = "SI";

		$resp = $class->consulta("UPDATE rol_pagos.permisos SET			id_usuario = '".$_SESSION['user']['id']."',
																		serie_permiso = '$_POST[serie_permiso]',
																		ciudad = '$_POST[ciudad]',
																		fecha_permiso = '$_POST[fecha_permiso]',
																		id_personal = '$_POST[select_empleado]',
																		horas = '$_POST[horas]',
																		dias = '$_POST[dias]',
																		hora_salida = '$_POST[hora_salida]',
																		regreso = '$regreso',
																		hora_retorno = '$_POST[hora_retorno]',
																		tiempo_salida = '$_POST[tiempo_salida]',
																		asunto = '$_POST[asunto]',
																		lugar = '$_POST[lugar]',
																		parte_de = '$_POST[select_parte]',
																		cargos_a = '$_POST[select_motivo_cargos]',
																		codigo = '$_POST[codigo_permiso]',
																		tipo_permiso = '$_POST[select_tipo_permiso]',
																		fecha_creacion = '$fecha' WHERE id = '$_POST[id_permiso]'");
	
		$data = $_POST['id_permiso'];
		echo $data;
	}

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	// cargar ultima codigo 
	if (isset($_POST['cargar_codigo'])) {
		$resultado = $class->consulta("SELECT max(codigo) FROM rol_pagos.permisos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima codigo permisos
	if (isset($_POST['cargar_codigo_permisos'])) {
		$resultado = $class->consulta("SELECT max(serie_permiso) FROM rol_pagos.permisos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_permiso' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar permisos
	if (isset($_POST['llenar_permisos'])) {
		$resultado = $class->consulta("SELECT * FROM rol_pagos.permisos WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array(	'id' => $row[0],
							'codigo' => $row[16],
							'serie_permiso' => $row[2],
							'tipo_permiso' => $row[17],
							'ciudad' => $row[3],
							'id_personal' => $row[5],
							'fecha_permiso' => $row[4],
							'horas' => $row[6],
							'dias' => $row[7],
							'regreso' => $row[9],
							'hora_salida' => $row[8],
							'hora_retorno' => $row[10],
							'tiempo_salida' => $row[11],
							'asunto' => $row[12],
							'lugar' => $row[13],
							'parte_de' => $row[14],
							'cargos_a' => $row[15]);
		}
		print_r(json_encode($data));
	}
	// fin
?>