<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();

	$cadena = " ".$_POST['img'];	
	$buscar = 'data:image/png;base64,';
	$cont = 0;

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_programa = $class->idz();

		if(strpos($cadena, $buscar) ==  FALSE) {
			$resp = $class->consulta("INSERT INTO programas.programa VALUES (	'$id_programa',
																				'$_POST[select_tipo_programa]',
																				'$_POST[codigo_programa]',
																				'$_POST[nombre_programa]',
																				'$_POST[hora_inicio]',
																				'$_POST[hora_fin]',
																				'programas.png',
																				'$_POST[observaciones]',
																				'1', '$fecha');");	
		} else {
			$resp = img_64("imagenes",$_POST['img'],'png',$id_programa);
			$resp = $class->consulta("INSERT INTO programas.programa VALUES (	'$id_programa',
																				'$_POST[select_tipo_programa]',
																				'$_POST[codigo_programa]',
																				'$_POST[nombre_programa]',
																				'$_POST[hora_inicio]',
																				'$_POST[hora_fin]',
																				'".$id_programa.".png',
																				'$_POST[observaciones]',
																				'1', '$fecha');");
			}

		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		if(strpos($cadena, $buscar) ==  FALSE) {
			$resp = $class->consulta("UPDATE programas.programa SET			    id_tipo_programa = '$_POST[select_tipo_programa]',
																				codigo_programa = '$_POST[codigo_programa]',
																				nombre_programa = '$_POST[nombre_programa]',
																				hora_inicio = '$_POST[hora_inicio]',
																				hora_fin = '$_POST[hora_fin]',
																				observaciones = '$_POST[observaciones]',
																				fecha_creacion = '$fecha' WHERE id = '$_POST[id_programa]'");	
		} else {
			$resp = img_64("imagenes",$_POST['img'],'png',$_POST['id_programa']);
			$resp = $class->consulta("UPDATE programas.programa SET			    id_tipo_programa = '$_POST[select_tipo_programa]',
																				codigo_programa = '$_POST[codigo_programa]',
																				nombre_programa = '$_POST[nombre_programa]',
																				hora_inicio = '$_POST[hora_inicio]',
																				hora_fin = '$_POST[hora_fin]',
																				imagen = '$_POST[id_programa].png',
																				observaciones = '$_POST[observaciones]',
																				fecha_creacion = '$fecha' WHERE id = '$_POST[id_programa]'");
		}
		$data = 2;
		echo $data;
	}

	//Comparar ruc repetidos
	if (isset($_POST['comparar_codigo'])) {
		$resultado = $class->consulta("SELECT * FROM programas.programa C WHERE codigo_programa = '$_POST[codigo]' AND estado = '1'");
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

	//LLena combo tipo paquete
	if (isset($_POST['llenar_tipo_programa'])) {
		$resultado = $class->consulta("SELECT * FROM programas.tipo_programa WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin



?>