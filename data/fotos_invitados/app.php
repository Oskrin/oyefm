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

	// modificar imagen
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$resp = img_64("imagenes",$_POST['img'],'png',$_POST['id_cliente']);

		$resp = $class->consulta("UPDATE clientes SET imagen = '$_POST[id_cliente].png' WHERE id = '$_POST[id_cliente]'");	
		
		$data = 1;
		echo $data;
	}
	// fin

	// consultar usuarios
	if(isset($_POST['cargar_tabla'])){
		$resultado = $class->consulta("SELECT id, ruc_empresa, nombre_comercial, razon_social, representante_legal, cedula_representante, estado FROM clientes");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row[0],
						'ruc_empresa' => $row['ruc_empresa'],
						'nombre_comercial' => $row['nombre_comercial'],
						'razon_social' => $row['razon_social'],
						'representante_legal' => $row['representante_legal'],
						'cedula_representante' => $row['cedula_representante'],
						'estado' => $row['estado']
						);
		}
		echo $lista = json_encode($lista);
	}
	// fin

	//cargar imagen corporativo.personal
	if (isset($_POST['llenar_foto'])) {
		$resultado = $class->consulta("SELECT * FROM clientes WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('imagen' => $row['imagen']);
		}
		print_r(json_encode($data));
	}
	//fin
?>