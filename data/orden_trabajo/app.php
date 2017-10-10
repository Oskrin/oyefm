<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();
	$cont = 0;
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_orden = $class->idz();

		$resp = $class->consulta("INSERT INTO orden_trabajo VALUES (	'$id_orden',
																		'$_POST[codigo]',
																		'".$_SESSION['user']['id']."',
																		'$_POST[select_responsable]',
																		'$_POST[fecha_inicio]',
																		'$_POST[fecha_entrega]',
																		'$_POST[tiempo_ejecucion]',
																		'$_POST[select_tipo]',
																		'$_POST[descripcion]',
																		'$_POST[select_destino]',
																		'$_POST[select_cliente]',
																		'$_POST[cantidad]',
																		'$_POST[presupuesto]',
																		'$_POST[observaciones]',
																		'$_POST[eficiencia]',
																		'1', '$fecha');");	
		$data = $id_orden;
		echo $data;
	}

	// if (isset($_POST['btn_modificar']) == "btn_modificar") {

	// 	$resp = $class->consulta("UPDATE clientes SET			        eficiencia = '$_POST[score]',
	// 																	estado = '2',
	// 																	WHERE id = '$_POST[id_cliente]'");	
	// 	$data = 2;
	// 	echo $data;
	// }

	if (isset($_POST['btn_cambiar']) == "btn_cambiar") {

		$resp = $class->consulta("UPDATE orden_trabajo SET			    eficiencia = '$_POST[eficiencia]',
																		estado = '2'
																		WHERE id = '$_POST[id_orden]'");																
		$data = 2;
		echo $data;
	}

	// consultar orden trabajo
	// if(isset($_POST['llenar_orden'])) {
	// 	$arr_data = array();
	// 	$resultado = $class->consulta("SELECT O.id, O.codigo, O.id_usuario, O.id_responsable, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, o.id_cliente, O.cantidad, O.presupuesto, O.observaciones, O.eficiencia, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id AND O.id = '$_POST[id]'");
	// 	while ($row=$class->fetch_array($resultado)) {
	// 		$arr_data[] = $row['0'];
	// 	    $arr_data[] = $row['1'];
	// 	    $arr_data[] = $row['2'];
	// 	    $arr_data[] = $row['3'];
	// 	    $arr_data[] = $row['4'];
	// 	    $arr_data[] = $row['5'];
	// 	    $arr_data[] = $row['6'];
	// 	    $arr_data[] = $row['7'];
	// 	    $arr_data[] = $row['8'];
	// 	    $arr_data[] = $row['9'];
	// 	    $arr_data[] = $row['10'];
	// 	    $arr_data[] = $row['11'];
	// 	    $arr_data[] = $row['12'];
	// 	    $arr_data[] = $row['13'];
	// 	    $arr_data[] = $row['14'];
	// 	    $arr_data[] = $row['15'];
	// 	}
	// 	echo json_encode($arr_data);
	// }

	// consultar orden trabajo
	if(isset($_POST['llenar_orden'])){
		$resultado = $class->consulta("SELECT O.id, O.codigo, O.id_usuario, O.id_responsable, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, o.id_cliente, O.cantidad, O.presupuesto, O.observaciones, O.eficiencia, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id AND O.id = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
				$data = array('id' => $row[0],
						'codigo' => $row[1],
						'id_usuario' => $row[2],
						'id_responsable' => $row[3],
						'fecha_inicio' => $row[4],
						'fecha_entrega' => $row[5],
						'tiempo_ejecucion' => $row[6],
						'tipo_trabajo' => $row[7],
						'descripcion' => $row[8],
						'destino' => $row[9],
						'id_cliente' => $row[10],
						'cantidad' => $row[11],
						'presupuesto' => $row[12],
						'observaciones' => $row[13],
						'eficiencia' => $row[14],
						'estado' => $row[15]
						);
		}
		echo json_encode($data);
	}
	// fin

	// // consultar ficha de ingreso general
	// if(isset($_POST['cargar_tabla'])){
	// 	$resultado = $class->consulta("SELECT * FROM orden_trabajo O, corporativo.personal C WHERE O.id_responsable = C.id");
	// 	while ($row=$class->fetch_array($resultado)) {
	// 		$lista[] = array('id' => $row[0],
	// 					'nombres_completos' => $row['nombres_completos'],
	// 					'fecha_inicio' => $row['fecha_inicio'],
	// 					'fecha_entrega' => $row['fecha_entrega'],
	// 					'tipo_trabajo' => $row['tipo_trabajo'],
	// 					'destino' => $row['destino'],
	// 					'estado' => $row[15]
	// 					);
	// 	}
	// 	echo $lista = json_encode($lista);
	// }
	// // fin

	//cargar ultima serie factura venta
	if (isset($_POST['cargar_codigo'])) {
		$resultado = $class->consulta("SELECT MAX(codigo) FROM orden_trabajo GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin


	//LLena combo empleados
	if (isset($_POST['llenar_responsable'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	//LLena combo empleados
	if (isset($_POST['llenar_cliente'])) {
		$resultado = $class->consulta("SELECT id, razon_social FROM clientes WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['razon_social'].'</option>';
		}
	}
	// fin
?>