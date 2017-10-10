<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();
	$fecha_corta = $class->fecha();
	// $cont = 0;

	if (isset($_POST['btn_confirmar']) == "btn_confirmar") {
		$data = "";

		// modificar pagos
		$resp = $class->consulta("UPDATE pagos SET fecha_aprobacion = '$fecha_corta', estado = '2' where id = '$_POST[id]'");
		// fin

		// datos detalle pagos
		$campo1 = $_POST['campo1'];

		// descomponer detalle pagos
		$arreglo1 = explode('|', $campo1);

		$nelem = count($arreglo1);
		for ($i = 1; $i < $nelem; $i++) {

			$resp = $class->consulta("UPDATE detalle_pagos SET estado = '1' where id = '".$arreglo1[$i]."'");
		}
		$data = $_POST['id'];

		echo $data;

	}
?>