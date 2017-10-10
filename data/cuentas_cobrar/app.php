<?php        
	include_once('../../admin/class.php');
	include_once('../../admin/convertir.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	// guardar contratos
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_contratos_selectivos = $class->idz();
		$id_cuentas_cobrar = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";

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

		$fecha_contrato = $_POST['fecha_contrato'];
		$facturacion_inicio = new DateTime($fecha_contrato);
		$facturacion_fin = new DateTime($fecha_contrato);
		$pago_inicio = new DateTime($fecha_contrato);
		$pago_fin = new DateTime($fecha_contrato);

		$facturacion_inicio->modify('+1 day');
		$facturacion_fin->modify('+5 day');
		$pago_inicio->modify('+6 day');
		$pago_fin->modify('+10 day');

		$resp = $class->consulta("INSERT INTO contratos VALUES  (	'$id_contratos_selectivos',
																	'".$_SESSION['user']['id']."',
																	'$_POST[id_cliente]',
																	'$cadena',
																	'$_POST[select_tipo_contrato]',
																	'$_POST[select_programacion]',
																	'$_POST[select_tipo_paquete]',
																	'$_POST[select_paquete]',
																	'$_POST[duracion]',
																	'$_POST[fecha_inicio]',
																	'$_POST[fecha_fin]',
																	'$_POST[select_programa]',
																	'$_POST[bonificacion]',
																	'$_POST[fecha_contrato]',
																	'$_POST[spots]',
																	'$_POST[mensiones]',
																	'".number_format($_POST['valor'], 3, '.', '')."',
																	'$_POST[detalles]',
																	'$_POST[select_vendedor]',
																	'$_POST[select_porcentaje]',
																	'$_POST[total_contrato]'),
																	'".$facturacion_inicio->format('d')."',
																	'".$facturacion_fin->format('d')."',
																	'".$pago_inicio->format('d')."',
																	'".$pago_fin->format('d')."',
																	'1', 
																	'$fecha')");

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

		// $data = 1;
		echo $id_contratos_selectivos;
	}
	// fin

	// modificar contratos
	if (isset($_POST['btn_modificar']) == "btn_modificar") {
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();

		$resp = $class->consulta("UPDATE contratos SET		id_cliente = '$_POST[id_cliente]',
															id_tipo_contrato = '$_POST[select_tipo_contrato]',
															programacion = '$_POST[select_programacion]',
															id_tipo_paquete = '$_POST[select_tipo_paquete]',
															id_paquete = '$_POST[select_paquete]',
															duracion = '$_POST[duracion]',
															fecha_inicio = '$_POST[fecha_inicio]',
															fecha_final = '$_POST[fecha_fin]',
															id_programa = '$_POST[select_programa]',
															bonificacion = '$_POST[bonificacion]',
															fecha_contrato = '$fecha_corta',
															spots = '$_POST[spots]',
															mensiones = '$_POST[mensiones]',
															valor = '".number_format($_POST['valor'], 3, '.', '')."',
															detalle = '$_POST[detalles]',
															fecha_creacion = '$fecha' WHERE id = '$_POST[id_contrato]'");	
		$data = $_POST['id_contrato'];
		echo $resp;
	}
	// fin

	// consultar usuarios
	if(isset($_POST['llenar_contratos'])) {
		$resultado = $class->consulta("SELECT S.id, S.id_tipo_contrato, S.programacion, C.id, C.ruc_empresa, C.nombre_comercial, S.id_tipo_paquete, S.id_paquete, S.fecha_inicio, S.fecha_final, S.duracion, S.id_programa, S.bonificacion, S.spots, S.mensiones, S.valor, S.detalle FROM contratos S,tipo_contrato T, clientes C, paquetes P WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND S.id_tipo_contrato = T.id AND S.id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$lista = array(	'id' => $row[0],
							'id_tipo_contrato' => $row[1],
							'programacion' => $row[2],
							'id_empresa' => $row[3],
							'ruc_empresa' => $row[4],
							'nombre_comercial' => $row[5],
							'id_tipo_paquete' => $row[6],
							'id_paquete' => $row[7],
							'fecha_inicio' => $row[8],
							'fecha_final' => $row[9],
							'duracion' => $row[10],
							'id_programa' => $row[11],
							'bonificacion' => $row[12],
							'spots' => $row[13],
							'mensiones' => $row[14],
							'valor' => $row[15],
							'detalle' => $row[16]
						);
		}
		echo $lista = json_encode($lista);	
	}
	// fin

	// consultar usuarios
	if(isset($_POST['llenar_programacion'])) {
		$letras = new EnLetras();
		$resultado = $class->consulta("SELECT programacion FROM contratos WHERE id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$lista = array(	'programacion' => $row[0]);
		}
		echo $lista = json_encode($lista);	
	}
	// fin

	// consultar usuarios
	if(isset($_POST['llenar_pdf'])) {
		$letras = new EnLetras();
		if ($_POST['programacion'] == 'SELECTIVA') {
			$resultado = $class->consulta("SELECT T.nombre_tipo, S.programacion, S.codigo_contrato, C.representante_legal, C.cedula_representante, C.nombre_comercial, C.ruc_empresa, C.celular, S.duracion, S.fecha_inicio, S.fecha_final, P.descripcion, M.nombre_programa, S.bonificacion, P.suma_mes, S.fecha_contrato, S.spots, S.mensiones, S.valor, S.detalle, PP.nombres_Completos, PP.cedula_identificacion, PP.telf_celular FROM contratos S, tipo_contrato T, clientes C, paquetes P, programas.programa M, vendedores V, corporativo.personal PP WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND id_tipo_contrato = T.id AND S.id_programa = M.id AND V.id_personal = PP.id AND S.id_vendedor = V.id AND S.id = '".$_POST['id']."'");
			while ($row = $class->fetch_array($resultado)) {
				$suma_mes = number_format($row[14] - $row[18], 2, '.', '');

				$lista = array(	'nombre_tipo' => $row[0],
								'programacion' => $row[1],
								'codigo_contrato' => $row[2],
								'representante_legal' => $row[3],
								'cedula_representante' => $row[4],
								'nombre_comercial' => $row[5],
								'ruc_empresa' => $row[6],
								'celular' => $row[7],
								'duracion' => $row[8],
								'fecha_inicio' => $row[9],
								'fecha_final' => $row[10],
								'descripcion' => $row[11],
								'nombre_programa' => $row[12],
								'bonificacion' => $row[13],
								'suma_mes' => $suma_mes,
								'letras' => $letras->ValorEnLetras($suma_mes, 'dolares'),
								'fecha_contrato' => $row[15],
								'spots' => $row[16],
								'mensiones' => $row[17],
								'valor' => $row[18],
								'detalle' => $row[19],
								'nombre_vendedor' => $row[20],
								'ci_vendedor' => $row[21],
								'telf_vendedor' => $row[22]
							);
			}
			echo $lista = json_encode($lista);	
		} else {
			if ($_POST['programacion'] == 'ROTATIVA') {
				$resultado = $class->consulta("SELECT T.nombre_tipo, S.programacion, S.codigo_contrato, C.representante_legal, C.cedula_representante, C.nombre_comercial, C.ruc_empresa, C.celular, S.duracion, S.fecha_inicio, S.fecha_final, P.descripcion, S.bonificacion, P.suma_mes, S.fecha_contrato, S.spots, S.mensiones, S.valor, S.detalle, PP.nombres_Completos, PP.cedula_identificacion, PP.telf_celular FROM contratos S, tipo_contrato T, clientes C, paquetes P, vendedores V, corporativo.personal PP WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND id_tipo_contrato = T.id AND V.id_personal = PP.id AND S.id_vendedor = V.id AND S.id = '".$_POST['id']."'");
				while ($row = $class->fetch_array($resultado)) {
					$suma_mes = number_format($row[13] - $row[17], 2, '.', '');

					$lista = array(	'nombre_tipo' => $row[0],
									'programacion' => $row[1],
									'codigo_contrato' => $row[2],
									'representante_legal' => $row[3],
									'cedula_representante' => $row[4],
									'nombre_comercial' => $row[5],
									'ruc_empresa' => $row[6],
									'celular' => $row[7],
									'duracion' => $row[8],
									'fecha_inicio' => $row[9],
									'fecha_final' => $row[10],
									'descripcion' => $row[11],
									'nombre_programa' => 'ROTATIVO',
									'bonificacion' => $row[12],
									'suma_mes' => $suma_mes,
									'letras' => $letras->ValorEnLetras($suma_mes, 'dolares'),
									'fecha_contrato' => $row[14],
									'spots' => $row[15],
									'mensiones' => $row[16],
									'valor' => $row[17],
									'detalle' => $row[18],
									'nombre_vendedor' => $row[19],
									'ci_vendedor' => $row[20],
									'telf_vendedor' => $row[21]
								);
				}
				echo $lista = json_encode($lista);		
			}
		}
		
	}
	// fin

	//LLenar combo tipo contrato
	if (isset($_POST['llenar_tipo_contrato'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_contrato WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_tipo'].'</option>';
		}
	}
	// fin

	
	// busqueda por ruc cliente
	if($_GET['tipo_busqueda'] == 'ruc') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM clientes WHERE ruc_empresa like '%$texto%' AND estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array(
		            'id_cliente' => $row[0],
		            'value' => $row[1],
		            'cliente' => $row[2],
		            'representante' => $row[8],
		            'identificacion' => $row[9]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	// busqueda por ruc cliente
	if($_GET['tipo_busqueda'] == 'nombre') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM clientes WHERE nombre_comercial like '%$texto%' AND estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array(
		            'id_cliente' => $row[0],
		            'value' => $row[2],
		            'ruc' => $row[1],
		            'representante' => $row[8],
		            'identificacion' => $row[9]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	//LLenar combo tipo paquete
	if (isset($_POST['llenar_tipo_paquete'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_paquetes WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_paquete'].'</option>';
		}
	}
	// fin

	//LLenar combo paquetes
	if (isset($_POST['llenar_paquete'])) {
		$resultado = $class->consulta("SELECT * FROM paquetes P, tipo_paquetes T WHERE P.id_tipo_paquete = T.id AND P.estado = '1' AND P.id_tipo_paquete = '".$_POST['id']."' ORDER BY P.id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row[0].'">'.$row['descripcion'].'</option>';
		}
	}
	// fin

	//LLenar programas
	if (isset($_POST['llenar_programa'])) {
		$resultado = $class->consulta("SELECT  * FROM programas.programa WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_programa'].'</option>';
		}
	}
	// fin

	//LLenar vendedores
	if (isset($_POST['llenar_vendedor'])) {
		$resultado = $class->consulta("SELECT V.id, P.nombres_Completos FROM vendedores V, corporativo.personal P WHERE V.id_personal = P.id AND V.estado = '1' ORDER BY V.id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row[0].'">'.$row[1].'</option>';
		}
	}
	// fin

	//LLenar porcentaje
	if (isset($_POST['llenar_porcentaje'])) {
		$resultado = $class->consulta("SELECT P.id, P.descripcion, P.porcentaje FROM porcentaje P WHERE estado = '1' ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row[0].'">'.$row[1].' '.$row[2].'%'.'</option>';
		}
	}
	// fin

	//cargar datos clientes
	if (isset($_POST['llenar_clientes'])) {
		$resultado = $class->consulta("SELECT * FROM clientes WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('representante' => $row['representante_legal'],'identificacion' => $row['cedula_representante'],'empresa' => $row['nombre_comercial']);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar datos mensiones
	if (isset($_POST['llenar_impactos'])) {
		$resultado = $class->consulta("SELECT * FROM paquetes WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('descripcion' => $row['descripcion'],'precio1' => $row['suma_mes'],'precio2' => $row['suma_vendedor'],'precio3' => $row['suma_ventas'],'precio4' => $row['suma_gerencia']);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar datos mensiones
	if (isset($_POST['llenar_codigo'])) {
		$resultado = $class->consulta("SELECT * FROM tipo_contrato WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo_contrato' => $row['codigo_contrato']);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar consultar perfil
	if (isset($_POST['consultar_perfil'])) {
		$resultado = $class->consulta("SELECT P.nombre FROM usuarios U, perfiles P WHERE U.id_perfil = P.id AND U.id = '".$_SESSION['user']['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('nombre' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin
?>