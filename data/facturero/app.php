<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_facturero = $class->idz();
	$fecha = $class->fecha_hora();
	error_reporting(0);

	if ($_POST['oper'] == "add") {
		// $resultado = $class->consulta("SELECT count(*) FROM facturero WHERE descripcion = '$_POST[descripcion]'");
		// while ($row=$class->fetch_array($resultado)) {
		// 	$data = $row[0];
		// }

		// if ($data != 0) {
		// 	$data = "3";
		// } else {
			$resp = $class->consulta("INSERT INTO facturero VALUES ('$id_facturero','$_POST[fecha_inicio]','$_POST[fecha_caducidad]','$_POST[inicio_facturero]','$_POST[finaliza_facturero]','$_POST[autorizacion]','$_POST[num_items]','1','$fecha');");
			$data = "1";
		// }
	} else {
	    if ($_POST['oper'] == "edit") {
	  //   	$resultado = $class->consulta("SELECT count(*) FROM facturero WHERE descripcion = '$_POST[monto_multa]' AND id NOT IN ('$_POST[id]')");
			// while ($row=$class->fetch_array($resultado)) {
			// 	$data = $row[0];
			// }

			// if ($data != 0) {
			//  	$data = "3";
			// } else {
		    	$resp = $class->consulta("UPDATE facturero SET fecha_caducidad = '$_POST[fecha_caducidad]', fecha_caducidad = '$_POST[fecha_caducidad]', inicio_facturero = '$_POST[inicio_facturero]', finaliza_facturero = '$_POST[finaliza_facturero]', autorizacion = '$_POST[autorizacion]', num_items = '$_POST[num_items]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    // }
	    } if ($_POST['oper'] == "del") {
	    		$resp = $class->consulta("UPDATE facturero SET estado = '2' WHERE id = '$_POST[id]'");
	    		$data = "4";	
	    	}
	}    

	echo $data;
?>