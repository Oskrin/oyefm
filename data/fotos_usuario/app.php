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
		$resp = img_64("imagenes",$_POST['img'],'png',$_POST['id_usuario']);

		$resp = $class->consulta("UPDATE usuarios SET imagen = '$_POST[id_usuario].png' WHERE id = '$_POST[id_usuario]'");	
		
		$data = 1;
		echo $data;
	}
	// fin

	// consultar usuarios
	if(isset($_POST['cargar_tabla'])){
		$resultado = $class->consulta("SELECT * FROM usuarios U, perfiles P WHERE U.id_perfil = P.id AND U.estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row[0],
						'cedula' => $row['cedula'],
						'nombres_completos' => $row['nombres_completos'],
						'usuario' => $row['usuario'],
						'nombre_cargo' => $row[16],
						'estado' => $row[11]
						);
		}
		echo $lista = json_encode($lista);
	}
	// fin

	//cargar imagen usuario
	if (isset($_POST['llenar_foto'])) {
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('imagen' => $row['imagen']);
		}
		print_r(json_encode($data));
	}
	//fin

	//borrar usuarios
	if (isset($_POST['borrar_usuario'])) {
		$data = "";
		$resp = $class->consulta("UPDATE usuarios set estado = '2' where id = '$_POST[id]'");

		$data = "1";
		echo $data;
	}
	//fin
?>