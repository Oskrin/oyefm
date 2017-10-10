<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_tipo_paquetes = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM tipo_paquetes WHERE nombre_paquete = '$_POST[nombre_paquete]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO tipo_paquetes VALUES ('$id_tipo_paquetes','$_POST[nombre_paquete]','$_POST[observaciones]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM tipo_paquetes WHERE nombre_paquete = '$_POST[nombre_paquete]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
				$resp = $class->consulta("UPDATE tipo_paquetes SET nombre_paquete = '$_POST[nombre_paquete]',observaciones = '$_POST[observaciones]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
	    		$data = "2";
			}
	    } else {
	    	if ($_POST['oper'] == "del") {
	    		$resp = $class->consulta("UPDATE tipo_paquetes SET estado = '2' WHERE id = '$_POST[id]'");
	    		$data = "4";	
	    	}	
	    }
	}
	    
	echo $data;
?>