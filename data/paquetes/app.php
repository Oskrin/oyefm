<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_paquetes = $class->idz();
	$fecha = $class->fecha_hora();
	error_reporting(0);

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM paquetes WHERE codigo = '$_POST[codigo]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO paquetes VALUES ('$id_paquetes','$_POST[select_tipo_paquete]','$_POST[codigo]','$_POST[descripcion]','$_POST[precio]','$_POST[suma_mes]','$_POST[suma_vendedor]','$_POST[suma_ventas]','$_POST[suma_gerencia]','','1','$fecha');");
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
		    	$resp = $class->consulta("UPDATE paquetes SET id_tipo_paquete = '$_POST[id_tipo_paquete]',codigo = '$_POST[codigo]',descripcion = '$_POST[descripcion]',precio = '$_POST[precio]',suma_mes = '$_POST[suma_mes]',suma_vendedor = '$_POST[suma_vendedor]',suma_ventas = '$_POST[suma_ventas]',suma_gerencia = '$_POST[suma_gerencia]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    }
	    } else {
	    	if ($_POST['oper'] == "del") {
	    		$resp = $class->consulta("UPDATE paquetes SET estado = '2' WHERE id = '$_POST[id]'");
	    		$data = "4";	
	    	}	
	    }
	}    
	echo $data;

	//LLena combo tipo paquete
	if (isset($_POST['llenar_tipo_paquete'])) {
		$resultado = $class->consulta("SELECT * FROM tipo_paquetes WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_paquete'].'</option>';
		}
	}
	// fin
?>