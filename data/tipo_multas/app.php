<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_tipo_multas = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM rol_pagos.tipo_multas WHERE descripcion = '$_POST[descripcion]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO rol_pagos.tipo_multas VALUES ('$id_tipo_multas','$_POST[descripcion]','$_POST[monto_multa]','$_POST[observaciones]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM rol_pagos.tipo_multas WHERE descripcion = '$_POST[monto_multa]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
		    	$resp = $class->consulta("UPDATE rol_pagos.tipo_multas SET descripcion = '$_POST[descripcion]', monto_multa = '$_POST[monto_multa]', observaciones = '$_POST[observaciones]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    }
	    } if ($_POST['oper'] == "del") {
	    		$resp = $class->consulta("UPDATE rol_pagos.tipo_multas SET estado = '2' WHERE id = '$_POST[id]'");
	    		$data = "4";	
	    	}
	}    

	echo $data;
?>