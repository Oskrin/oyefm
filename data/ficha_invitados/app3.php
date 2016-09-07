<?php 
include_once('../../admin/class.php');
$class = new constante();
// subir imagenes al servidor
$carpetaAdjunta = "imagenes/";
$imagenes = count($_FILES['archivos']['name']);	
$fecha = $class->fecha_hora();

for($i = 0; $i <$imagenes; $i++) {
	$id_imagen = $class->idz(); //obtenemos el id de las imagenes
	$extension = explode(".", $_FILES['archivos']['name'][$i]); // obtenemos la extención
	$extension = end($extension); // concluimos la extensión
	$nombre_archivo = $id_imagen.".".$extension;
	$nombretemporal = $_FILES['archivos']['tmp_name'][$i];
	$rutaarchivo = $carpetaAdjunta.$nombre_archivo;
	move_uploaded_file($nombretemporal, $rutaarchivo);

	$resp = $class->consulta("INSERT INTO agenda_invitados.imagenes VALUES (	'$id_imagen',
																				'$_POST[txt_id_proceso3]',
																				'$nombre_archivo',
																				'1', '$fecha');");
}
?>