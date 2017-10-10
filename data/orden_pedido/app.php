<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
		include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	$fecha = $class->fecha_hora();
	$cont = 0;

	// guardar utiles
	if (isset($_POST['btn_guardar_utiles']) == "btn_guardar_utiles") {
		$id_utiles = $class->idz();
		$fecha_corta = $class->fecha();

		$resp = $class->consulta("INSERT INTO utiles_varios VALUES (	'$id_utiles',
																		'".$_SESSION['user']['id']."',
																		'',
																		'$_POST[codigo]',
																		'$_POST[descripcion]',
																		'$_POST[id_proveedor]',
																		'$_POST[precio]',
																		'$_POST[observaciones]',
																		'1', 
																		'$fecha')");	


		$data = 1;
		echo $data;
	}
	// fin

	// // modificar utiles
	// if (isset($_POST['btn_guardar']) == "btn_guardar") {
	// 	$id_vendedores = $class->idz();
	// 	$fecha_corta = $class->fecha();

	// 	$resp = $class->consulta("INSERT INTO vendedores VALUES (		'$id_vendedores',
	// 																	'$_POST[codigo]',
	// 																	'$_POST[id_personal]',
	// 																	'$_POST[select_tipo_vendedor]',
	// 																	'$fecha_corta',
	// 																	'',
	// 																	'$_POST[observaciones]',
	// 																	'1', '$fecha');");	


	// 	$data = 1;
	// 	echo $data;
	// }
	// // fin

	// modificar utiles
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
	// fin

	// busqueda por identificacion
	if($_GET['tipo_busqueda'] == 'codigo') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM utiles_varios WHERE codigo like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_utiles' => $row[0],
		            'value' => $row[3],
		            'descripcion' => $row[4],
		            'precio' => $row[6]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	// busqueda por personal
	if($_GET['tipo_busqueda'] == 'descripcion') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM utiles_varios WHERE descripcion like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_utiles' => $row[0],
		            'codigo' => $row[3],
		            'value' => $row[4],
		            'precio' => $row[6]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin
?>