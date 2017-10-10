<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../admin/class.php');
	$class = new constante();
	// error_reporting(0);
	$fecha = $class->fecha_hora();

	// guardar rol pagos
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$data = "";
		// datos nómina
		$campo1 = $_POST['campo1'];

		 // descomponer nómina 
		$arreglo1 = explode('|', $campo1);
		$nelem = count($arreglo1);

		// for ($i = 1; $i < $nelem; $i++) {
			$resultado = $class->consulta("SELECT * FROM rol_pagos.nomina WHERE estado = '1'");
			while ($row = $class->fetch_array($resultado)) {
				$id_rol_pagos = $class->idz();
				$id_detalle_rol_pagos = $class->idz();
				$fecha_corta = $class->fecha();
				
				$id_nomina = $row[0];
				$id_personal = $row[3];
				$horas = $row[6];	
				$dias_laborados = $row[7];	
				$dias_nolaborados = $row[8];	
				$extras = $row[9];	
				$sueldo_mes = $row[10];	
				$horas_extras = $row[11];	
				$comisiones = $row[12];	
				$decimo_tercero = $row[13];	
				$decimo_cuarto = $row[14];	
				$total_ingresos = $row[15];	
				$aporte_iess = $row[16];
				$quirografarios = $row[17];	
				$anticipos = $row[18];
				$atrasos = $row[19];
				$permisos = $row[20];
				$faltas = $row[21];
				$multas = $row[22];
				$total_descuentos = $row[23];
				$neto_pagar = $row[24];
				$mes = $row[25];
				$prestamos = $row[28];
				$acumulable = $row[29];
				$servicios = $row[30];
				$facturable = $row[31];

				// consulta abreviatura individual
				$resultado2 = $class->consulta("SELECT * FROM rol_pagos.codigo_rol WHERE id_personal = '".$id_personal."'");
				while ($row = $class->fetch_array($resultado2)) {
					$abreviatura = $row[2]; 
				}
				// fin

				// consulta codigo general secuencia
				$resultado1 = $class->consulta("SELECT count(*) FROM rol_pagos.rol_pagos");
				while ($row = $class->fetch_array($resultado1)) {
					$codigo_general = $row[0]; 
				}

				$temp = "";
				$cod = $codigo_general;
				$cod = $cod + 1;

				for ($i = strlen($cod); $i < 4; $i++) { 
					$temp = $temp . "0";
				}
				$cod_ge = $temp.$cod;
				// fin

				// consulta codigo individual secuencia
				$resultado2 = $class->consulta("SELECT count(*) FROM rol_pagos.rol_pagos WHERE id_personal = '".$id_personal."'");
				while ($row = $class->fetch_array($resultado2)) {
					$codigo_individual = $row[0]; 
				}
				// fin

				// generar codigos individual
				$mm = date("m"); 
				$anios = date("y");

				$res = $codigo_individual + 1;

				$cadena = 'RDP' . $mm . $anios . $abreviatura . $res . $cod_ge;
				// fin

				$resp = $class->consulta("INSERT INTO rol_pagos.rol_pagos VALUES  (			'$id_rol_pagos',
																							'$id_personal',
																							'".$_SESSION['user']['id']."',
																							'$cadena',
																							'$fecha_corta',
																							'$neto_pagar',
																							'1', 
																							'$fecha')");

				$resp = $class->consulta("INSERT INTO rol_pagos.detalle_rol_pagos VALUES(	'$id_detalle_rol_pagos',
																							'$id_rol_pagos',
																							'$horas',
																							'$dias_laborados',
																							'$dias_nolaborados',
																							'$extras',
																							'$sueldo_mes',
																							'$horas_extras',
																							'$comisiones',
																							'$decimo_tercero',
																							'$decimo_cuarto',
																							'$total_ingresos',
																							'$aporte_iess',
																							'$quirografarios',
																							'$anticipos',
																							'$atrasos',
																							'$permisos',
																							'$faltas',
																							'$multas',
																							'$total_descuentos',
																							'1', 
																							'$fecha',
																							'$mes',
																							'$prestamos',
																							'$acumulable',
																							'$servicios',
																							'$facturable')");

				$resp = $class->consulta("UPDATE rol_pagos.nomina SET estado = '2' WHERE id = '".$id_nomina."'");
			}	
		// }

		$data = 1;
		echo $data;
	}
	// fin


	// // cargar ultima codigo rol pagos general
	// if (isset($_POST['cargar_codigo_general'])) {
	// 	$resultado = $class->consulta("SELECT max(codigo_rol) FROM rol_pagos.rol_pagos GROUP BY id ORDER BY id asc");
	// 	while ($row = $class->fetch_array($resultado)) {
	// 		$data = array('codigo' => $row[0]);
	// 	}
	// 	print_r(json_encode($data));
	// }
	// // fin

	// // cargar ultima codigo rol pagos general
	// if (isset($_POST['cargar_codigo_secuencia'])) {
	// 	$resultado = $class->consulta("SELECT max(codigo_rol) FROM rol_pagos.rol_pagos WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
	// 	while ($row = $class->fetch_array($resultado)) {
	// 		$data = array('codigo' => $row[0]);
	// 	}
	// 	print_r(json_encode($data));
	// }
	// // fin

	// // cargar ultima codigo rol pagos individual
	// if (isset($_POST['cargar_codigo_rol'])) {
	// 	$resultado = $class->consulta("SELECT * FROM rol_pagos.codigo_rol WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
	// 	while ($row = $class->fetch_array($resultado)) {
	// 		$data = array('codigo' => $row['codigo']);
	// 	}
	// 	print_r(json_encode($data));
	// }
	// // fin

	//LLena las areas en el Combo
	if (isset($_POST['llenar_areas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.areas WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin
?>