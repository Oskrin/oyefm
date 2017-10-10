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
	if (isset($_POST['btn_guardar_multa']) == "btn_guardar_multa") {
		$id_multa = $class->idz();
		$data = "";
		$justificado = "NO";
		if(isset($_POST["justificado"]))
			$justificado = "SI";
		
		$resp = $class->consulta("INSERT INTO rol_pagos.multas VALUES  (			'$id_multa',
																					'".$_SESSION['user']['id']."',
																					'',
																					'$_POST[serie_multa]',
																					'$_POST[fecha_multa]',
																					'$_POST[select_empleado]',
																					'$_POST[select_tipo_multa]',
																					'$justificado',
																					'1', 
																					'$fecha')");
		$data = $id_multa;
		echo $data;
	}
	// fin

	// if (isset($_POST['btn_modificar']) == "btn_modificar") {

	// 	$resp = $class->consulta("UPDATE clientes SET			        ruc_empresa = '$_POST[ruc_empresa]',
	// 																	nombre_comercial = '$_POST[nombre_comercial]',
	// 																	actividad_economica = '$_POST[actividad_economica]',
	// 																	razon_social = '$_POST[razon_social]',
	// 																	representante_legal = '$_POST[representante_legal]',
	// 																	cedula_representante = '$_POST[cedula]',
	// 																	celular = '$_POST[celular]',
	// 																	telefono = '$_POST[telefono]',
	// 																	direccion = '$_POST[direccion]',
	// 																	correo = '$_POST[correo]',
	// 																	sitio_web = '$_POST[sitio_web]',
	// 																	facebook = '$_POST[facebook]',
	// 																	twitter = '$_POST[twitter]',
	// 																	google = '$_POST[google]',
	// 																	observaciones = '$_POST[observaciones]',
	// 																	fecha_creacion = '$fecha' WHERE id = '$_POST[id_cliente]'");	
	// 	$data = 2;
	// 	echo $data;
	// }

	// cargar ultima codigo permisos
	if (isset($_POST['cargar_codigo_multas'])) {
		$resultado = $class->consulta("SELECT max(serie_multa) FROM rol_pagos.multas GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_multa' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	//LLena combo empleados
	if (isset($_POST['llenar_tipo_multas'])) {
		$resultado = $class->consulta("SELECT id, descripcion FROM rol_pagos.tipo_multas WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['descripcion'].'</option>';
		}
	}
	// fin
?>