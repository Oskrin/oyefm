<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }

	include_once('../../admin/class.php');
	$class = new constante();
	$fecha = $class->fecha_hora();
	$cont = 0; 

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_empresa = $class->idz();

		$resp = $class->consulta("INSERT INTO empresa VALUES (				'$id_empresa',
																			'$_POST[identificacion]',
																			'$_POST[propietario]',
																			'$_POST[nombre_empresa]',
																			'$_POST[slogan]',
																			'$_POST[telefono1]',
																			'$_POST[telefono2]',
																			'$_POST[ciudad]',
																			'$_POST[direccion]',
																			'$_POST[correo]',
																			'$_POST[fax]',
																			'$_POST[sitio_web]',
																			'$_POST[autorizacion_sri]',
																			'$_POST[inicio_fac_preimpresa]',
																			'$_POST[item_factura]',
																			'',
																			'$_POST[observaciones]',
																			'1', 
																			'$fecha');");	
		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE empresa SET			        	ruc_empresa = '$_POST[identificacion]',
																			propietario = '$_POST[propietario]',
																			nombre_empresa = '$_POST[nombre_empresa]',
																			slogan = '$_POST[slogan]',
																			telefono1 = '$_POST[telefono1]',
																			telefono2 = '$_POST[telefono2]',
																			ciudad = '$_POST[ciudad]',
																			direccion = '$_POST[direccion]',
																			correo = '$_POST[correo]',
																			fax = '$_POST[fax]',
																			sitio_web = '$_POST[sitio_web]',
																			autorizacion_sri = '$_POST[autorizacion_sri]',
																			inicio_fac_preimpresa = '$_POST[inicio_fac_preimpresa]',
																			item_factura = '$_POST[item_factura]',
																			observaciones = '$_POST[observaciones]',
																			fecha_creacion = '$fecha' WHERE id = '$_POST[id_empresa]'");

		$data = 2;
		echo $data;
	}

	//comparar identificaciones empresa
	if (isset($_POST['comparar_identificacion'])) {
		$resultado = $class->consulta("SELECT * FROM empresa E WHERE  E.ruc_empresa = '$_POST[identificacion]' AND estado = '1'");
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
?>