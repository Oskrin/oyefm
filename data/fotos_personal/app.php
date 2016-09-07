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
		$resp = img_64("imagenes",$_POST['img'],'png',$_POST['id_personal']);

		$resp = $class->consulta("UPDATE corporativo.personal SET imagen = '$_POST[id_personal].png' WHERE id = '$_POST[id_personal]'");	
		

		$data = 1;
		echo $data;
	}
	// fin

	// consultar usuarios
	if(isset($_POST['cargar_tabla'])) {
		$resultado = $class->consulta("SELECT P.id, P.cedula_identificacion, P.nombres_completos, C.nombre, P.telf_celular,P.direccion,P.estado FROM corporativo.personal P, corporativo.cargos_asignacion A, corporativo.cargos C WHERE A.id_personal = P.id and A.id_cargos = C.id and P.estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row[0],
						'cedula_identificacion' => $row['cedula_identificacion'],
						'nombres_completos' => $row['nombres_completos'],
						'cargo' => $row['nombre'],
						'telefono' => $row['telf_celular'],
						'direccion' => $row['direccion'],
						'estado' => $row['estado']
						);
		}
		echo $lista = json_encode($lista);
	}
	// fin

	//cargar imagen corporativo.personal
	if (isset($_POST['llenar_foto'])) {
		$resultado = $class->consulta("SELECT * FROM corporativo.personal WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('imagen' => $row['imagen']);
		}
		print_r(json_encode($data));
	}
	//fin
?>