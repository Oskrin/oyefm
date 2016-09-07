<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }
    
	include_once('../../admin/class.php');
	$class = new constante();
	$id_cargo = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM perfiles WHERE nombre = '$_POST[nombre_cargo]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO perfiles VALUES ('$id_cargo','$_POST[nombre_cargo]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM perfiles WHERE nombre = '$_POST[nombre_cargo]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
				$resp = $class->consulta("UPDATE perfiles SET nombre = '$_POST[nombre_cargo]',fecha = '$fecha' WHERE id = '$_POST[id]'");
	    		$data = "2";
			}
	    }
	}    
	echo $data;
?>