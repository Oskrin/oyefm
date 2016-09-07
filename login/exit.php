<?php 
	session_start();

        include_once('../admin/class.php');
	$class = new constante();

	$resultado = $class->consulta("UPDATE usuarios SET chat = '0' WHERE id = '".$_SESSION[user][id]."'");

	session_destroy();
	header('Location: ../login/');
?>

