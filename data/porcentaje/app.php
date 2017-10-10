<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_porcentaje = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM porcentaje WHERE descripcion = '$_POST[descripcion]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO porcentaje VALUES ('$id_porcentaje','$_POST[descripcion]','$_POST[porcentaje]','$_POST[observaciones]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM porcentaje WHERE descripcion = '$_POST[descripcion]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
		    	$resp = $class->consulta("UPDATE porcentaje SET descripcion = '$_POST[descripcion]', porcentaje = '$_POST[porcentaje]', observaciones = '$_POST[observaciones]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    }
	    } else {
	    	if ($_POST['oper'] == "del") {
	    		$resp = $class->consulta("UPDATE porcentaje SET estado = '2' WHERE id = '$_POST[id]'");
	    		$data = "4";	
	    	}	
	    }
	}    

	echo $data;
?>