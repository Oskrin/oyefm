<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_pagos = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";

		$resp = $class->consulta("INSERT INTO pagos VALUES (	'$id_pagos',
																'$_POST[codigo]',
																'$_POST[fecha_registro]',
																'',
																'',
																'$_POST[fecha_pago]',
																'".$_SESSION['user']['id']."',
																'$_POST[select_areas]',
																'',
																'$_POST[select_responsable]',
																'$_POST[observaciones]',
																'$_POST[valor_total]',
																'',
																'',
																'',
																'1',
																'$fecha')");

		// datos detalle pagos
		$campo1 = $_POST['campo1'];
	    $campo2 = $_POST['campo2'];
	    $campo3 = $_POST['campo3'];
	    $campo4 = $_POST['campo4'];
	    $campo5 = $_POST['campo5'];
	    $campo6 = $_POST['campo6'];
	    // Fin

	    // descomponer detalle pagos
		$arreglo1 = explode('|', $campo1);
	    $arreglo2 = explode('|', $campo2);
	    $arreglo3 = explode('|', $campo3);
	    $arreglo4 = explode('|', $campo4);
	    $arreglo5 = explode('|', $campo5);
	    $arreglo6 = explode('|', $campo6);
	    $nelem = count($arreglo1);
	    // fin

	    for ($i = 1; $i < $nelem; $i++) {
	    	$id_detalle_pagos = $class->idz();

			$resp = $class->consulta("INSERT INTO detalle_pagos VALUES(		'$id_detalle_pagos',
																			'$id_pagos',
																			'".$arreglo1[$i]."',
																			'".$arreglo2[$i]."',
																			'".$arreglo3[$i]."',
																			'".$arreglo4[$i]."',
																			'".$arreglo5[$i]."',
																			'".$arreglo6[$i]."',
																			'0', 
																			'$fecha')");
		}

		$data = $id_pagos;
		echo $data;
	}

	// if (isset($_POST['btn_modificar']) == "btn_modificar") {

	// 	$resp = $class->consulta("UPDATE clientes SET			        eficiencia = '$_POST[score]',
	// 																	estado = '2',
	// 																	WHERE id = '$_POST[id_cliente]'");	
	// 	$data = 2;
	// 	echo $data;
	// }

	// // consultar orden trabajo
	// if(isset($_POST['llenar_pagos'])){
	// 	$resultado = $class->consulta("SELECT O.id, O.codigo, O.id_usuario, O.id_responsable, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, o.id_cliente, O.cantidad, O.presupuesto, O.observaciones, O.eficiencia, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id AND O.id = '$_POST[id]'");
	// 	while ($row=$class->fetch_array($resultado)) {
	// 			$data = array('id' => $row[0],
	// 					'codigo' => $row[1],
	// 					'id_usuario' => $row[2],
	// 					'id_responsable' => $row[3],
	// 					'fecha_inicio' => $row[4],
	// 					'fecha_entrega' => $row[5],
	// 					'tiempo_ejecucion' => $row[6],
	// 					'tipo_trabajo' => $row[7],
	// 					'descripcion' => $row[8],
	// 					'destino' => $row[9],
	// 					'id_cliente' => $row[10],
	// 					'cantidad' => $row[11],
	// 					'presupuesto' => $row[12],
	// 					'observaciones' => $row[13],
	// 					'eficiencia' => $row[14],
	// 					'estado' => $row[15]
	// 					);
	// 	}
	// 	echo json_encode($data);
	// }
	// // fin

	//cargar ultima serie pagos
	if (isset($_POST['cargar_codigo'])) {
		$resultado = $class->consulta("SELECT MAX(codigo) FROM pagos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin

	//LLena combo responsable
	if (isset($_POST['llenar_responsable'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM usuarios WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	//LLena combo clientes
	if (isset($_POST['llenar_cliente'])) {
		$resultado = $class->consulta("SELECT id, razon_social FROM clientes WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['razon_social'].'</option>';
		}
	}
	// fin

	//LLena las areas 
	if (isset($_POST['llenar_areas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.areas WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	//LLena los bancos en el Combo
	if (isset($_POST['llenar_bancos'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.bancos WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin
?>