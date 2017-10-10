<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	// error_reporting(0);
	
	$fecha = $class->fecha_hora();
	$cont = 0;
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_invitados = $class->idz();

		$resp = $class->consulta("INSERT INTO agenda_invitados.invitados VALUES (	'$id_invitados',
																					'$_POST[identificacion]',
																					'$_POST[nombres_completos]',
																					'$_POST[telefono1]',
																					'$_POST[telefono2]',
																					'$_POST[ciudad]',
																					'$_POST[direccion]',
																					'$_POST[correo]',
																					'$_POST[facebook]',
																					'$_POST[twitter]',
																					'$_POST[youtube]',
																					'$_POST[sitio_web]',
																					'defaul.jpg',
																					'$_POST[observaciones]',
																					'1', '$fecha')");	

		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE agenda_invitados.invitados SET		identificacion = '$_POST[identificacion]',
																			nombres_completos = '$_POST[nombres_completos]',
																			telefono1 = '$_POST[telefono1]',
																			telefono2 = '$_POST[telefono2]',
																			ciudad = '$_POST[ciudad]',
																			direccion = '$_POST[direccion]',
																			correo = '$_POST[correo]',
																			facebook = '$_POST[facebook]',
																			twitter = '$_POST[twitter]',
																			youtube = '$_POST[youtube]',
																			sitio_web = '$_POST[sitio_web]',
																			observaciones = '$_POST[observaciones]',
																			fecha_creacion = '$fecha' WHERE id = '$_POST[id_invitado]'");	
		$data = 2;
		echo $data;
	}

	//Comparar ruc repetidos
	if (isset($_POST['comparar_identificacion'])) {
		$resultado = $class->consulta("SELECT * FROM agenda_invitados.invitados WHERE identificacion = '$_POST[identificacion]' AND estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
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
?>