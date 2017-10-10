<?php        
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	// guardar facturas
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_creditos = $class->idz();
		// $id_cuentas_cobrar = $class->idz();
		$fecha = $class->fecha_hora();
		// $fecha_corta = $class->fecha();
		$data = "";

		$resp = $class->consulta("INSERT INTO credito VALUES  (		'$id_creditos',
																	'".$_SESSION['user']['id']."',
																	'1',
																	'$_POST[select_empleado]',
																	'$_POST[fecha_credito]',
																	'".number_format($_POST['input_monto'], 3, '.', '')."',
																	'$_POST[input_cuotas]',
																	'$_POST[input_tasa]',
																	'$_POST[select_tasa_tipo]',
																	'$_POST[select_periodo]',
																	'1', 
																	'$fecha')");

		$campos_creditos = json_decode($_POST['campos_creditos']);
		for ($i = 0; $i < count($campos_creditos); $i++) {
			$id_detalle_credito = $class->idz();

			$resp = $class->consulta("INSERT INTO detalle_credito VALUES (	'$id_detalle_credito',
																			'$id_creditos',
																			'".$campos_creditos[$i]->fecha."',
																			'".$campos_creditos[$i]->interes."',
																			'".$campos_creditos[$i]->abono_capital."',
																			'".$campos_creditos[$i]->valor_cuota."',
																			'".$campos_creditos[$i]->saldo_capital."',
																			'1', 
																			'$fecha')");
		}

		// // calcular meses a pagar
		// $inicio = $_POST['fecha_inicio'];
		// $fin = $_POST['fecha_fin'];
		 
		// $datetime1 = new DateTime($inicio);
		// $datetime2 = new DateTime($fin);
		 
		// # obtenemos la diferencia entre las dos fechas
		// $interval = $datetime2->diff($datetime1);
		 
		// # obtenemos la diferencia en meses
		// $intervalMeses = $interval->format("%m");
		// # obtenemos la diferencia en años y la multiplicamos por 12 para tener los meses
		// $intervalAnos = $interval->format("%y")*12;
		// $meses = $intervalMeses + $intervalAnos;
		// // fin

		// // monto paquetes
		// $resultado = $class->consulta("SELECT * FROM paquetes WHERE id = '$_POST[select_paquete]'");
		// while ($row = $class->fetch_array($resultado)) {
		// 	$monto =  $row['suma_mes'];
		// 	$monto_total = $monto * $meses;
		// }

		// $resp = $class->consulta("INSERT INTO contratos.cuentas_cobrar VALUES  (			'$id_cuentas_cobrar',
		// 																					'".$_SESSION['user']['id']."',
		// 																					'$_POST[id_cliente]',
		// 																					'$id_contratos_selectivos',
		// 																					'$fecha_corta',
		// 																					'$meses',
		// 																					'".number_format($monto_total, 3, '.', '')."',
		// 																					'".number_format($monto_total, 3, '.', '')."',
		// 																					'1', 
		// 																					'$fecha')");
		// // fin

		// // detalle cuentas por cobrar 
		// $fecha_preven = date('Y-m-d', strtotime("$inicio + 1 month"));
		
		// for ($i = 0; $i < $meses; $i++) {
		// 	$id_detalle_cuentas_cobrar = $class->idz();
		// 	$nuevaFecha = date('Y-m-d', strtotime("$fecha_preven + $i month"));
		// 	$monto_total = $monto_total - $monto;
			
		// 	$resp = $class->consulta("INSERT INTO contratos.detalle_cuentas_cobrar VALUES  ('$id_detalle_cuentas_cobrar',
		// 																					'$id_cuentas_cobrar',
		// 																					'$nuevaFecha',
		// 																					'".number_format($monto, 3, '.', '')."',
		// 																					'".number_format($monto_total, 3, '.', '')."',
		// 																					'1', 
		// 																					'$fecha')");	
		// }
		// // fin

		$data = 1;
		echo $data;
	}
	// fin

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin
?>