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

	$cadena = " ".$_POST['img'];	
	$buscar = 'data:image/png;base64,';

	// modificar imagen
	if (isset($_POST['btn_gardar_imagen']) == "btn_gardar_imagen") {
		$resp = img_64("imagenes",$_POST['img'],'png',$_POST['id_vendedor']);

		$resp = $class->consulta("UPDATE vendedores SET imagen = '$_POST[id_vendedor].png' WHERE id = '$_POST[id_vendedor]'");	
		
		$data = 1;
		echo $data;
	}
	// fin

	// consultar usuarios
	if(isset($_POST['cargar_tabla'])){
		$resultado = $class->consulta("SELECT V.id, P.cedula_identificacion, P.nombres_completos, T.nombre FROM  vendedores V, corporativo.personal P, tipo_vendedor T  WHERE V.id_personal = P.id and V.id_tipo_vendedor = T.id AND V.estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row[0],
						'cedula_identificacion' => $row[1],
						'nombres_completos' => $row[2],
						'nombre' => $row[3]
						);
		}
		echo $lista = json_encode($lista);
	}
	// fin

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_vendedores = $class->idz();
		$fecha_corta = $class->fecha();

		$resp = $class->consulta("INSERT INTO vendedores VALUES (			'$id_vendedores',
																		'$_POST[codigo]',
																		'$_POST[id_personal]',
																		'$_POST[select_tipo_vendedor]',
																		'$fecha_corta',
																		'',
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

	// busqueda por personal
	if($_GET['tipo_busqueda'] == 'nombre') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM corporativo.personal WHERE nombres_completos like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_personal' => $row[0],
		            'value' => $row[4],
		            'identificacion' => $row[5]
		        );
		}
		echo $data = json_encode($data);
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

	//cargar imagen corporativo.personal
	if (isset($_POST['llenar_foto'])) {
		$resultado = $class->consulta("SELECT * FROM vendedores WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('imagen' => $row['imagen']);
		}
		print_r(json_encode($data));
	}
	//fin
?>