<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	include_once('../../admin/datos_sri.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();
	$cont = 0;
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_clientes = $class->idz();

		$resp = $class->consulta("INSERT INTO clientes VALUES (			'$id_clientes',
																		'$_POST[ruc_empresa]',
																		'$_POST[nombre_comercial]',
																		'$_POST[actividad_economica]',
																		'$_POST[razon_social]',
																		'$_POST[representante_legal]',
																		'$_POST[cedula]',
																		'$_POST[celular]',
																		'$_POST[telefono]',
																		'$_POST[direccion]',
																		'$_POST[correo]',
																		'$_POST[sitio_web]',
																		'$_POST[facebook]',
																		'$_POST[twitter]',
																		'$_POST[google]',
																		'$_POST[observaciones]',
																		'defaul.jpg',
																		'1', '$fecha')");	
		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE clientes SET			        ruc_empresa = '$_POST[ruc_empresa]',
																		nombre_comercial = '$_POST[nombre_comercial]',
																		actividad_economica = '$_POST[actividad_economica]',
																		razon_social = '$_POST[razon_social]',
																		representante_legal = '$_POST[representante_legal]',
																		cedula_representante = '$_POST[cedula]',
																		celular = '$_POST[celular]',
																		telefono = '$_POST[telefono]',
																		direccion = '$_POST[direccion]',
																		correo = '$_POST[correo]',
																		sitio_web = '$_POST[sitio_web]',
																		facebook = '$_POST[facebook]',
																		twitter = '$_POST[twitter]',
																		google = '$_POST[google]',
																		observaciones = '$_POST[observaciones]',
																		fecha_creacion = '$fecha' WHERE id = '$_POST[id_cliente]'");	
		$data = 2;
		echo $data;
	}

	//Comparar ruc repetidos
	if (isset($_POST['comparar_ruc'])) {
		$resultado = $class->consulta("SELECT * FROM clientes C WHERE C.ruc_empresa = '$_POST[ruc]' AND C.estado = '1'");
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

	// consultar ruc
	if (isset($_POST['consulta_ruc'])) {
		$ruc = $_POST['txt_ruc'];
		$servicio = new ServicioSRI();///creamos nuevo objeto de servicios SRI
		$datosEmpresa = $servicio->consultar_ruc($ruc); ////accedemos a la funcion datosSRI
		$establecimientos = $servicio->establecimientoSRI($ruc);

		print_r(json_encode(['datosEmpresa'=>$datosEmpresa,'establecimientos'=>$establecimientos]));		
	}
	// fin
?>