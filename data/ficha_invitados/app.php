<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();

	// LLenar el formulario del proceso 1 que es Pre-entrevista
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_ficha = $class->idz();
		$id_aceptado = $class->idz();
		$id_preconfirmado = $class->idz();
		$id_confirmado = $class->idz();
		$id_invitados = $class->idz();
		$id_adicionales = $class->idz();
		$fecha = $class->fecha_hora();

		// $ruta = "imagenes/"; //Decalaramos una variable con la ruta en donde almacenaremos los archivos
		// foreach ($_FILES as $key) //Iteramos el arreglo de archivos
		// {
		// 	if($key['error'] == UPLOAD_ERR_OK )//Si el archivo se paso correctamente Ccontinuamos 
		// 	{
		// 		$id_imagen = $class->idz(); //obtenemos el id de las imagenes
		// 		$extension = explode(".", $key['name']); // obtenemos la extención
		// 		$extension = end($extension); // concluimos la extensión
		// 		$NombreOriginal = $id_imagen.".". $extension;//Obtenemos el nombre original del archivo
		// 		$temporal = $key['tmp_name']; //Obtenemos la ruta Original del archivo
		// 		$Destino = $ruta.$NombreOriginal;	//Creamos una ruta de destino con la variable ruta y el nombre original del archivo	
		// 		move_uploaded_file($temporal, $Destino); //Movemos el archivo temporal a la ruta especificada

		// 		$resp = $class->consulta("INSERT INTO agenda_invitados.imagenes VALUES (	'$id_imagen',
		//  																					'$id_ficha',
		//  																					'$NombreOriginal',
		//  																					'1', '$fecha');");

		// 		echo "INSERT INTO agenda_invitados.imagenes VALUES (	'$id_imagen',
		//  																					'$id_ficha',
		//  																					'$NombreOriginal',
		//  																					'1', '$fecha');";
		// 	}
		// }

	// 	$resp = $class->consulta("INSERT INTO agenda_invitados.fichas VALUES (		'$id_ficha',
	// 																				'$_POST[select_programas]',
	// 																				'',
	// 																				'1', '$fecha');");

	if(isset($_POST['inp_aceptado']) == 'on') {
		$resp = $class->consulta("INSERT INTO agenda_invitados.aceptado VALUES (			'$id_aceptado',
																							'$id_ficha',
																							'$_POST[inp_aceptado]',
																							'$_POST[txt_contactado_por]',
																							'$_POST[txt_fecha]',
																							'$_POST[txt_hora]',
																							'$_POST[txt_forma]',
																							'$_POST[txt_contactado_con]',
																							'$_POST[select_usuarios]',
																							'1', '$fecha');");
	}

	
	if(isset($_POST['inp_preconfirmado']) == 'on') {
		$resp = $class->consulta("INSERT INTO agenda_invitados.preconfirmado VALUES (		'$id_preconfirmado',
																							'$id_ficha',
																							'$_POST[inp_preconfirmado]',
																							'$_POST[txt_preconfirmado_por]',
																							'$_POST[txt_fecha2]',
																							'$_POST[txt_hora2]', 
																							'$_POST[txt_forma2]', 
																							'$_POST[txt_preconfirmado_con]',
																							'$_POST[select_usuarios2]',
																							'1', '$fecha');");
	}

	if(isset($_POST['inp_confirmado']) == 'on') {
		$resp = $class->consulta("INSERT INTO agenda_invitados.confirmado VALUES (			'$id_confirmado',
			 																				'$id_ficha',
																						    '$_POST[inp_confirmado]',
			 																				'$_POST[txt_confirmado_por]',
			 																				'$_POST[txt_fecha3]',
			 																				'$_POST[txt_hora3]',
			 																				'$_POST[txt_forma3]',
			 																				'$_POST[txt_confirmado_con]',
			 																				'$_POST[select_usuarios3]',
																							'1', '$fecha');");
	}


		$resp = $class->consulta("INSERT INTO agenda_invitados.datos_invitado VALUES    (	'$id_invitados',
																							'$id_ficha',
																							'$_POST[txt_invitado]',
																							'$_POST[txt_contacto]', 
																							'$_POST[txt_empresa]',
																							'$_POST[txt_telf]',
																							'$_POST[txt_telf2]',
																							'$_POST[txt_telf3]',
																							'$_POST[txt_direccion]',
																							'$_POST[txt_email]',
																							'1', '$fecha');");

		$resp = $class->consulta("INSERT INTO agenda_invitados.datos_adicionales VALUES (	'$id_adicionales',
																							'$id_ficha',
																							'$_POST[txt_principal]', 
																							'$_POST[txt_secundario]',
																							'$_POST[txt_nombre1]', 
																							'$_POST[txt_nombre2]',
																							'$_POST[txt_pregunta1]', 
			 																				'$_POST[txt_pregunta2]',
			 																				'$_POST[txt_pregunta3]',
			 																				'$_POST[txt_pregunta4]',
			 																				'$_POST[txt_pregunta5]',
			 																				'$_POST[txt_pregunta6]',
																							'$_POST[txt_hora_llegada]', 
	 																						'$_POST[txt_tiempo]',
																							'$_POST[txt_nombre_director]', 
	 																						'$_POST[txt_nombre_conduccion]',
																							'$_POST[rb_calificacion]',
	 																						'$_POST[txta_sugerencia]',
																							'$_POST[txt_video]',
																							'$_POST[observaciones]',
																							'1', '$fecha');");


	// 	if ($resp) {
	// 		//respuesta correcta
	// 		print_r(json_encode(array('valid' => 'true')));	
	// 	}else{
	// 		//respuesta false
	// 		print_r(json_encode(array('valid' => 'false')));
	// 	}
	}

	//LLena los programas en el Combo
	if (isset($_POST['llenar_programas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, upper(codigo) as codigo, nombre FROM agenda_invitados.programas where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena todos los usuarios
	if (isset($_POST['llenar_usuarios'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, id_cargo, nombre FROM agenda_invitados.usuario where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//para la consulta de los datos de los programas
	if(isset($_POST['consultar_datos_programas'])){
		$resultado = $class->consulta("SELECT id, codigo, nombre, estado, fecha_creacion FROM agenda_invitados.programas where id='$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data['programa'] = array('id' => $row['id'], 'codigo'=>$row['codigo'], 'nombre'=>$row['nombre']);
		}
		// $resultado = $class->consulta("SELECT count(*) FROM agenda_invitados.fichas where id_programa='$_POST[id]';");
		// while ($row=$class->fetch_array($resultado)) {
		// 	$data['num_ficha']= array('cantidad_fichas' => $row[0] );
		//}
		print_r(json_encode($data));
	}
	//cargar id fichas invitados
	if(isset($_POST['id_ficha'])) {
		$id_ficha = $class->idz();
		$data = $id_ficha;
		echo $data;
	}
	// consultar ficha de ingreso invitados
	if(isset($_POST['cargar_tabla_fichas'])){
		$resultado = $class->consulta("select D.id_ficha, D.nom_invitado, D.contacto, D.inst_empresa from agenda_invitados.datos_invitado D  where D.estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row['id_ficha'],
						'nom_invitado' => $row['nom_invitado'],
						'contacto' => $row['contacto'],
						'inst_empresa' => $row['inst_empresa'],
						'ficha' => 'Fiffde'
						);
		}
		echo $lista = json_encode($lista);
	}
	// consultar ficha de invitados
	if(isset($_POST['llenar_datos_invitados'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM agenda_invitados.datos_invitado WHERE id_ficha = '$_POST[id]' and estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		    $arr_data[] = $row['7'];
		    $arr_data[] = $row['8'];
		    $arr_data[] = $row['9'];
		    $arr_data[] = $row['10'];
		    $arr_data[] = $row['11'];
		    $arr_data[] = $row['12'];
		    $arr_data[] = $row['13'];
		}
		echo json_encode($arr_data);
	}
	// consultar ficha de ingreso personal
	if(isset($_POST['llenar_datos_adicionales'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM agenda_invitados.datos_adicionales WHERE id_ficha = '$_POST[id]' and estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		    $arr_data[] = $row['7'];
		    $arr_data[] = $row['8'];
		    $arr_data[] = $row['9'];
		    $arr_data[] = $row['10'];
		    $arr_data[] = $row['11'];
		    $arr_data[] = $row['12'];
		    $arr_data[] = $row['13'];
		    $arr_data[] = $row['14'];
		}
		echo json_encode($arr_data);
	}

	// consultar archivos fichas de ingreso
	if(isset($_POST['cargar_imagenes'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM agenda_invitados.imagenes WHERE id_ficha = '$_POST[id]' and estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
		    $arr_data[] = $row['2'];
		}
		echo json_encode($arr_data);
	}
	
?>