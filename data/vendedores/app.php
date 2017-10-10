<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
		include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_vendedores = $class->idz();
		$fecha_corta = $class->fecha();

		$resp = $class->consulta("INSERT INTO vendedores VALUES (		'$id_vendedores',
																		'$_POST[codigo]',
																		'$_POST[select_empleado]',
																		'$_POST[select_tipo_vendedor]',
																		'$_POST[observaciones]',
																		'1', '$fecha');");	


		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {
			$resp = $class->consulta("UPDATE clientes SET			        empresa = '$_POST[nombre_empresa]',
																			ruc = '$_POST[ruc_empresa]',
																			direccion = '$_POST[direccion_empresa]',
																			observaciones = '$_POST[observaciones]',
																			email = '$_POST[correo]',
																			sitio = '$_POST[txt_sitio_web]',
																			telefono = '$_POST[txt_telefono]',
																			contacto = '$_POST[txt_contacto]',
																			facebook = '$_POST[txt_facebook]',
																			twitter = '$_POST[txt_twitter]',
																			google = '$_POST[txt_google]',
																			fecha_creacion = '$fecha' WHERE id = '$_POST[id_empresa]'");	

		$data = 2;
		echo $data;
	}

	// busqueda por identificacion
	if($_GET['tipo_busqueda'] == 'identificacion') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM corporativo.personal WHERE cedula_identificacion like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_personal' => $row[0],
		            'value' => $row[5],
		            'personal' => $row[4]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	//LLenar tipo vendedor
	if (isset($_POST['llenar_tipo_vendedor'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_vendedor WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	// cargar ultima codigo 
	if (isset($_POST['cargar_codigo'])) {
		$resultado = $class->consulta("SELECT max(codigo_vendedor) FROM vendedores GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo_ficha' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin
?>