<?php
	include_once('../../admin/class.php');
	include_once('../../admin/convertir.php');
	$class = new constante();
	session_start(); 
	// error_reporting(0);
	$extension = explode(".", $_FILES["archivo"]["name"]);

	$extension = end($extension);
	$type = $_FILES["archivo"]["type"];
	$tmp_name = $_FILES["archivo"]["tmp_name"];
	$size = $_FILES["archivo"]["size"];
	$nombre = basename($_FILES["archivo"]["name"], "." . $extension); 

	if ($nombre != "") { 
		$id_comprobate = $class->idz();
		$fecha = $class->fecha_hora();

		$foto = $id_comprobate . '.' . $extension;
		move_uploaded_file($_FILES["archivo"]["tmp_name"], "img_comprobantes/" . $foto);

		$class->consulta("INSERT INTO comprobante_ingreso VALUES  (		'".$id_comprobate."',
																		'".$_POST['codigo']."',
																		'".$_POST['ciudad']."',
																		'".$_POST['fecha_actual']."',
																		'".$_POST['visitador']."',
																		'".$_POST['cliente']."',
																		'".$_POST['monto']."',
																		'',
																		'".$_POST['concepto']."',
																		'',
																		'".$_SESSION['user']['id']."',
																		'".$foto."',
																		'1', 
																		'$fecha')");

		echo $id_comprobate;
	}
?>