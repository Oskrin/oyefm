<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_paquetes = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM paquetes WHERE codigo = '$_POST[codigo]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO paquetes VALUES ('$id_paquetes','$_POST[id_tipo_paquete]','$_POST[codigo]','$_POST[descripcion]','$_POST[precio]','$_POST[descuento]','$_POST[suma_mes]','$_POST[observaciones]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM paquetes WHERE codigo = '$_POST[codigo]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
		    	$resp = $class->consulta("UPDATE paquetes SET id_tipo_paquete = '$_POST[id_tipo_paquete]',codigo = '$_POST[codigo]',descripcion = '$_POST[descripcion]',precio = '$_POST[precio]',descuento = '$_POST[descuento]',suma_mes = '$_POST[suma_mes]',observaciones = '$_POST[observaciones]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    }
	    }
	}    
	echo $data;
?>