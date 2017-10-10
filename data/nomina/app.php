<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);
	$fecha = $class->fecha_hora();
	
	// guardar rol pagos
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_nomina = $class->idz();
		$id_asignacion_tipo_servicio = $class->idz();
		$data = "";

		$acumulable = "NO";
		if(isset($_POST["acumulable"]))
			$acumulable = "SI";

		// guardar nomina
		$resp = $class->consulta("INSERT INTO rol_pagos.nomina VALUES(	'$id_nomina',
																		'".$_SESSION['user']['id']."',
																		'1',
																		'".$_POST['id_empleado']."',
																		'".$_POST['codigo']."',
																		'".$_POST['txt_mes']."',
																		'".$_POST['tiempo_horas']."',
																		'".$_POST['dias_laborados']."',
																		'".$_POST['no_laborado']."',
																		'".$_POST['extras']."',
																		'".number_format($_POST['sueldo_basico'], 3, '.', '')."',
																		'".number_format($_POST['horas_extras'], 3, '.', '')."',
																		'".number_format($_POST['comisiones'], 3, '.', '')."',
																		'".number_format($_POST['decimo_tercero'], 3, '.', '')."',
																		'".number_format($_POST['decimo_cuarto'], 3, '.', '')."',
																		'".number_format($_POST['total_ingresos'], 3, '.', '')."',
																		'".number_format($_POST['aporte_iess'], 3, '.', '')."',
																		'".number_format($_POST['pres_quirografarios'], 3, '.', '')."',
																		'".number_format($_POST['anti'], 3, '.', '')."',
																		'".number_format($_POST['atrasos'], 3, '.', '')."',
																		'".number_format($_POST['permisos'], 3, '.', '')."',
																		'".number_format($_POST['faltas'], 3, '.', '')."',
																		'".number_format($_POST['multas'], 3, '.', '')."',
																		'".number_format($_POST['total_descuentos'], 3, '.', '')."',
																		'".number_format($_POST['neto_pagar'], 3, '.', '')."',
																		'".$_POST['select_mes']."',
																		'1', 
																		'$fecha',
																		'".number_format($_POST['pres'], 3, '.', '')."',
																		'$acumulable',
																		'".$_POST['servicios']."',
																		'".$_POST['select_facturable']."')");
		// fin guardado nomina

		// guardado anticipos
		$tabla1 = $_POST['tabla1'];
		$arreglo1 = explode('|', $tabla1);
		$nelem = count($arreglo1);

		for ($i = 1; $i < $nelem; $i++) {
			$id_asignacion_anticipos = $class->idz();

			$resp = $class->consulta("INSERT INTO rol_pagos.asignacion_anticipos VALUES(		'$id_asignacion_anticipos',
																								'$id_nomina',
																								'".$arreglo1[$i]."',
																								'1', 
																								'$fecha')");

			$resp = $class->consulta("UPDATE rol_pagos.anticipos set estado = '2' where id = '".$arreglo1[$i]."'");
		}
		// fin guardado anticipos 

		// guardado anticipos permisos
		$tabla2 = $_POST['tabla2'];
		$arreglo2 = explode('|', $tabla2);
		$nelem2 = count($arreglo2);

		for ($i = 1; $i < $nelem2; $i++) {
			$id_asignacion_permisos = $class->idz();
			
			$resp = $class->consulta("INSERT INTO rol_pagos.asignacion_permisos VALUES(			'$id_asignacion_permisos',
																								'$id_nomina',
																								'".$arreglo2[$i]."',
																								'1', 
																								'$fecha')");

			$resp = $class->consulta("UPDATE rol_pagos.permisos set estado = '2' where id = '".$arreglo2[$i]."'");
		}
		// fin guardado anticipos

		// guardar multas
		$id_asignacion_multas = $class->idz();
		$campos_multas = json_decode($_POST['campos_multas']);

		if (count($campos_multas) != 0) {
			$resp = $class->consulta("INSERT INTO rol_pagos.asignacion_multas VALUES  (	'$id_asignacion_multas',
																					'$id_nomina',
																					'$_POST[txt_mes]',
																					'$_POST[multas]',
																					'1', 
																					'$fecha')");
		}

		for ($i = 0; $i < count($campos_multas); $i++) {
			$id_detalle_asignacion_multas = $class->idz();

			$resp = $class->consulta("INSERT INTO rol_pagos.detalle_asignacion_multas VALUES (	'$id_detalle_asignacion_multas',
																								'$id_asignacion_multas',
																								'".$campos_multas[$i]->id."',
																								'".$campos_multas[$i]->descripcion."',
																								'".$campos_multas[$i]->cantidad."',
																								'".$campos_multas[$i]->total_multa."',
																								'1', 
																								'$fecha')");
		}

		if ($_POST['select_tipo_servicio'] != '') {
			$resp = $class->consulta("INSERT INTO rol_pagos.asignacion_tipo_servicio VALUES (	'$id_asignacion_tipo_servicio',
																							'$_POST[select_tipo_servicio]',
																							'$id_nomina',
																							'1', 
																							'$fecha')");
		}

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

	//LLena combo empleados
	if (isset($_POST['llenar_bancos'])) {
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.bancos WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	// consulta rol detalles
	if (isset($_POST['consulta_rol'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * from rol_pagos.rol_pagos R, rol_pagos.detalle_rol_pagos D where R.id = D.id_rol_pagos and id_personal =  '".$_POST['id']."'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['10'];
		    $arr_data[] = $row['11'];
		    $arr_data[] = $row['12'];
		    $arr_data[] = $row['13'];
		    $arr_data[] = $row['14'];
		    $arr_data[] = $row['15'];
		    $arr_data[] = $row['16'];
		    $arr_data[] = $row['17'];
		    $arr_data[] = $row['18'];
		    $arr_data[] = $row['19'];
		    $arr_data[] = $row['20'];
		    $arr_data[] = $row['21'];
		    $arr_data[] = $row['22'];
		    $arr_data[] = $row['23'];
		    $arr_data[] = $row['24'];
		}
		echo json_encode($arr_data);
	}
	// fin

	//llenar id_cargos
	if (isset($_POST['llenar_cargos'])) {
		$resultado = $class->consulta("SELECT C.nombre FROM corporativo.cargos_asignacion G, corporativo.cargos C, corporativo.personal P where P.id = G.id_personal and C.id = G.id_cargos  and G.id_personal = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('cargo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin

	// cargar ultima codigo nomina general
	if (isset($_POST['cargar_codigo_general'])) {
		$resultado = $class->consulta("SELECT max(codigo_nomina) FROM rol_pagos.nomina GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima codigo nomina individual
	if (isset($_POST['cargar_codigo_secuencia'])) {
		$resultado = $class->consulta("SELECT max(codigo_nomina) FROM rol_pagos.nomina WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima abreviatura rol pagos individual
	if (isset($_POST['cargar_codigo_rol'])) {
		$resultado = $class->consulta("SELECT * FROM rol_pagos.codigo_rol WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row['codigo']);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar informacion anticipos personales
	if (isset($_POST['llenar_informacion_anticipos'])) {
		$resultado = $class->consulta("SELECT A.id, A.serie_anticipo, fecha_anticipo, P.nombres_completos, P.cedula_identificacion, F.nombre, A.monto_anticipo, A.meses_anticipo, A.forma_pago, A.cheque_numero, A.id_bancos, A.cuenta_anticipo, U.nombres_completos, U.cedula FROM rol_pagos.anticipos A, corporativo.personal P, usuarios U, corporativo.cargos_asignacion C, corporativo.cargos F  WHERE A.id_usuario = U.id AND A.id_personal = P.id AND C.id_personal = P.id AND C.id_cargos = F.id AND A.id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_anticipo' => $row['serie_anticipo'],
						'fecha_anticipo' => $row['fecha_anticipo'],
						'nombres_completos' => $row[3],
						'cedula_identificacion' => $row['cedula_identificacion'],
						'nombre' => $row['nombre'],
						'monto_anticipo' => $row['monto_anticipo'],
						'meses_anticipo' => $row['meses_anticipo'],
						'forma_pago' => $row['forma_pago'],
						'cheque_numero' => $row['cheque_numero'],
						'id_bancos' => $row['id_bancos'],
						'cuenta_anticipo' => $row['cuenta_anticipo'],
						'nombres_usuario' => $row['nombres_completos'],
						'cedula' => $row['cedula']);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar informacion anticipos personales
	if (isset($_POST['llenar_informacion_bancos'])) {
		$resultado = $class->consulta("SELECT B.nombre FROM corporativo.bancos B, rol_pagos.anticipos A WHERE A.id_bancos = B.id AND B.id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('banco' => $row['nombre']);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar informacion permisos personales
	if (isset($_POST['llenar_informacion_permisos'])) {
		$resultado = $class->consulta("SELECT P.id, P.serie_permiso, P.ciudad, P.fecha_permiso, U.nombres_completos, U.cedula, C.nombres_completos, C.cedula_identificacion, P.horas, P.dias, P.hora_salida, P.regreso, P.hora_retorno, P.tiempo_salida, P.asunto, P.lugar, P.parte_de, P.cargos_a FROM rol_pagos.permisos P, corporativo.personal C, usuarios U WHERE P.id_personal = C.id AND P.id_usuario = U.id AND P.id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_permiso' => $row['serie_permiso'],
						'ciudad' => $row['ciudad'],
						'fecha_permiso' => $row['fecha_permiso'],
						'nombres_usuario' => $row[4],
						'cedula' => $row[5],
						'nombre_solicitante' => $row[6],
						'cedula_solicitante' => $row[7],
						'horas' => $row['horas'],
						'dias' => $row['dias'],
						'hora_salida' => $row['hora_salida'],
						'regreso' => $row['regreso'],
						'hora_retorno' => $row['hora_retorno'],
						'tiempo_salida' => $row['tiempo_salida'],
						'asunto' => $row['asunto'],
						'lugar' => $row['lugar'],
						'parte_de' => $row['parte_de'],
						'cargos_a' => $row['cargos_a']);
		}
		print_r(json_encode($data));
	}
	// fin

	//LLena combo tipo servicio
	if (isset($_POST['llenar_servicio'])) {
		$resultado = $class->consulta("SELECT id, nombre FROM rol_pagos.tipo_servicio WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	//LLena combo tipo multas
	if (isset($_POST['llenar_multa'])) {
		$resultado = $class->consulta("SELECT id, descripcion FROM rol_pagos.tipo_multas WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['descripcion'].'</option>';
		}
	}
	// fin

	// cargar datos multas
	if (isset($_POST['consultar_multas'])) {
		$resultado = $class->consulta("SELECT * FROM rol_pagos.tipo_multas WHERE estado = '1' AND id= '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id' => $row[0], 'descripcion' => $row[1], 'monto_multa' => $row[2]);
		}
		print_r(json_encode($data));
	}
	// fin
?>