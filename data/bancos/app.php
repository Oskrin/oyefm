<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_bancos = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM corporativo.bancos WHERE nombre = '$_POST[nombre]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO corporativo.bancos VALUES ('$id_bancos','$_POST[nombre]','$_POST[telefono]','$_POST[direccion]','1','$fecha')");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM corporativo.bancos WHERE nombre = '$_POST[nombre]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
		    	$resp = $class->consulta("UPDATE corporativo.bancos SET nombre = '$_POST[nombre]',telefono = '$_POST[telefono]',direccion = '$_POST[direccion]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    }
	    } else {
	    	if ($_POST['oper'] == "del") {
	    		$resp = $class->consulta("UPDATE corporativo.bancos SET estado = '2' WHERE id = '$_POST[id]'");
	    		$data = "4";	
	    	}	
	    }
	}    
	echo $data;
?>