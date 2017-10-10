<?php
	include_once('../../admin/class.php');
	include_once('../../admin/convertir.php');
	$class = new constante();
	session_start(); 
	// error_reporting(0); 

	// guardar contratos
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_contratos = $class->idz();
		$id_cuentas_cobrar = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = 1;

		$resultado = $class->consulta("SELECT codigo_contrato FROM tipo_contrato WHERE estado = '1' AND id = '".$_POST['select_tipo_contrato']."'");
		while ($row = $class->fetch_array($resultado)) {
			$codigo_contrato = $row[0];
		}

		// consulta contador codigo
		$codigo_general = "";
		$resultado1 = $class->consulta("SELECT count(*) FROM contratos WHERE id_tipo_contrato = '".$_POST['select_tipo_contrato']."'");
		while ($row = $class->fetch_array($resultado1)) {
			$count_codigo = $row[0]; 
		}
		// fin

		// consulta contador codigo general
		$resultado2 = $class->consulta("SELECT count(*) FROM contratos");
		while ($row = $class->fetch_array($resultado2)) {
			$codigo_general = $row[0]; 
		}
		// fin

		if ($codigo_general != 0) {
			// generar codigo general
			$temp = "";
			$cod = $codigo_general;
			$cod = $cod + 1;

			for ($i = strlen($cod); $i < 4; $i++) { 
				$temp = $temp . "0";
			}
			$cod_ge = $temp.$cod;
			// fin

			// generar codigos individual
			$mm = date("m"); 
			$anios = date("y");

			$res = $count_codigo + 1;
			$cadena = $codigo_contrato . $res  . '-' . $mm . $anios . $cod_ge;
		} else {
			// generar codigo inicial
			$temp = "";
			$cod = 0000;
			$cod = $cod + 1;

			for ($i = strlen($cod); $i < 4; $i++) { 
				$temp = $temp . "0";
			}
			$cod_ge = $temp.$cod;
			// fin	

			// generar codigos individual
			$mm = date("m"); 
			$anios = date("y");

			$res = $count_codigo + 1;
			$cadena = $codigo_contrato . $res  . '-' . $mm . $anios . $cod_ge;
			// fin
		}

		// $fecha_contrato = $_POST['fecha_contrato'];
		// $facturacion_inicio = new DateTime($fecha_contrato);
		// $facturacion_fin = new DateTime($fecha_contrato);
		// $pago_inicio = new DateTime($fecha_contrato);
		// $pago_fin = new DateTime($fecha_contrato);

		// $facturacion_inicio->modify('+1 day');
		// $facturacion_fin->modify('+5 day');
		// $pago_inicio->modify('+6 day');
		// $pago_fin->modify('+10 day');
		// calcular meses a pagar
		$inicio = $_POST['fecha_inicio'];
		$fin = $_POST['fecha_fin'];
		 
		$datetime1 = new DateTime($inicio);
		$datetime2 = new DateTime($fin);
		 
		# obtenemos la diferencia entre las dos fechas
		$interval = $datetime2->diff($datetime1);
		 
		# obtenemos la diferencia en meses
		$intervalMeses = $interval->format("%m");
		# obtenemos la diferencia en años y la multiplicamos por 12 para tener los meses
		$intervalAnos = $interval->format("%y") * 12;
		$meses = $intervalMeses + $intervalAnos;

		if ($_POST['select_tipo_contrato'] == '20160520111122573f372a04a4c') {
			$fecha_referencia = $_POST['fecha_inicio'];

			$dia = explode("-",$fecha_referencia);
			
			if ($dia[2] >= 16) {

				$resp = $class->consulta("INSERT INTO contratos VALUES  (	'".$id_contratos."',
																			'".$_SESSION['user']['id']."',
																			'".$_POST['id_cliente']."',
																			'".$cadena."',
																			'".$_POST['select_tipo_contrato']."',
																			'".$_POST['select_programacion']."',
																			'".$_POST['select_tipo_paquete']."',
																			'".$_POST['select_paquete']."',
																			'".$_POST['duracion']."',
																			'".$_POST['fecha_inicio']."',
																			'".$_POST['fecha_fin']."',
																			'".$_POST['select_programa']."',
																			'".$_POST['bonificacion']."',
																			'".$_POST['fecha_contrato']."',
																			'".$_POST['spots']."',
																			'".$_POST['mensiones']."',
																			'".$_POST['descuento']."',
																			'".$_POST['detalles']."',
																			'".$_POST['select_vendedor']."',
																			'".$_POST['select_porcentaje']."',
																			'".$_POST['total_contrato']."',
																			'01',
																			'05',
																			'06',
																			'10',
																			'1', 
																			'$fecha')");

				$nuevafechainifac = $dia[0]."-".$dia[1]."-01";
				$nuevafechafinfac = $dia[0]."-".$dia[1]."-05";
				$nuevafechainicob = $dia[0]."-".$dia[1]."-06";
				$nuevafechafincob = $dia[0]."-".$dia[1]."-10";
					
				for ($i = 1; $i <= $meses + 1; $i++) {
					$cobros_contrato = $class->idz();
					$pagos = 'Pago N°'.$i;

					$inifac = date('Y-m-d', strtotime("$nuevafechainifac + $i month"));
					$finfac = date('Y-m-d', strtotime("$nuevafechafinfac + $i month"));
					$inicob = date('Y-m-d', strtotime("$nuevafechainicob + $i month"));
					$fincob = date('Y-m-d', strtotime("$nuevafechafincob + $i month"));
					
					$resp = $class->consulta("INSERT INTO cobros_contrato VALUES  (		'$cobros_contrato',
																						'$id_contratos',
																						'".$pagos."',
																						'".$inifac."',
																						'".$finfac."',
																						'".$inicob."',
																						'".$fincob."',
																						'".$_POST['total_contrato']."',
																						'',
																						'',
																						'',
																						'Pendiente', 
																						'$fecha')");	
				}
			} else {
				$resp = $class->consulta("INSERT INTO contratos VALUES  (	'".$id_contratos."',
																		'".$_SESSION['user']['id']."',
																		'".$_POST['id_cliente']."',
																		'".$cadena."',
																		'".$_POST['select_tipo_contrato']."',
																		'".$_POST['select_programacion']."',
																		'".$_POST['select_tipo_paquete']."',
																		'".$_POST['select_paquete']."',
																		'".$_POST['duracion']."',
																		'".$_POST['fecha_inicio']."',
																		'".$_POST['fecha_fin']."',
																		'".$_POST['select_programa']."',
																		'".$_POST['bonificacion']."',
																		'".$_POST['fecha_contrato']."',
																		'".$_POST['spots']."',
																		'".$_POST['mensiones']."',
																		'".$_POST['descuento']."',
																		'".$_POST['detalles']."',
																		'".$_POST['select_vendedor']."',
																		'".$_POST['select_porcentaje']."',
																		'".$_POST['total_contrato']."',
																		'16',
																		'20',
																		'21',
																		'25',
																		'1', 
																		'$fecha')");

				$nuevafechainifac = $dia[0]."-".$dia[1]."-16";
				$nuevafechafinfac = $dia[0]."-".$dia[1]."-20";
				$nuevafechainicob = $dia[0]."-".$dia[1]."-21";
				$nuevafechafincob = $dia[0]."-".$dia[1]."-25";
				$cont = 1;	
				for ($i = 0; $i < $meses; $i++) {

					$cobros_contrato = $class->idz();
					$pagos = 'Pago N°'.$cont++;

					$inifac = date('Y-m-d', strtotime("$nuevafechainifac + $i month"));
					$finfac = date('Y-m-d', strtotime("$nuevafechafinfac + $i month"));
					$inicob = date('Y-m-d', strtotime("$nuevafechainicob + $i month"));
					$fincob = date('Y-m-d', strtotime("$nuevafechafincob + $i month"));
					
					$resp = $class->consulta("INSERT INTO cobros_contrato VALUES  (		'$cobros_contrato',
																						'$id_contratos',
																						'".$pagos."',
																						'".$inifac."',
																						'".$finfac."',
																						'".$inicob."',
																						'".$fincob."',
																						'".$_POST['total_contrato']."',
																						'',
																						'',
																						'',
																						'Pendiente', 
																						'$fecha')");	
				}
			}
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

		

		// // echo $fecha[2];

		// if ($_POST['select_tipo_contrato'] == '20160520111122573f372a04a4c') {
			
		// 		for ($i = 1; $i <= $meses; $i++) {
		// 			$cobros_contrato = $class->idz();
		// 			$pagos = 'Pago N°'.$i;

		// 			$inifac = date('Y-m-d', strtotime("$nuevafechainifac + $i month"));
		// 			$finfac = date('Y-m-d', strtotime("$nuevafechafinfac + $i month"));
		// 			$inicob = date('Y-m-d', strtotime("$nuevafechainicob + $i month"));
		// 			$fincob = date('Y-m-d', strtotime("$nuevafechafincob + $i month"));
					
		// 			$resp = $class->consulta("INSERT INTO cobros_contrato VALUES  (		'$cobros_contrato',
		// 																				'$id_contratos',
		// 																				'".$pagos."',
		// 																				'".$inifac."',
		// 																				'".$finfac."',
		// 																				'".$inicob."',
		// 																				'".$fincob."',
		// 																				'".$_POST['total_contrato']."',
		// 																				'',
		// 																				'',
		// 																				'',
		// 																				'Pendiente', 
		// 																				'$fecha')");	
		// 		}	

			// $nuevafechainifac = date('Y-m-d', strtotime("$inicio + 1 day"));
			// $nuevafechafinfac = date('Y-m-d', strtotime("$inicio + 5 day"));
			// $nuevafechainicob = date('Y-m-d', strtotime("$inicio + 6 day"));
			// $nuevafechafincob = date('Y-m-d', strtotime("$inicio + 10 day"));
			
		// }

		// echo $facturacion_inicio;
		

		echo $id_contratos;

		
	}
	// fin


?>