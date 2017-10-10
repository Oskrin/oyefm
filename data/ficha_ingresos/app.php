<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);
	$cont = 0;

	// LLenar el formulario del proceso 1 
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id = $class->idz();
		$id_personal = $class->idz();
		$id_ant_trab = $class->idz();
		$id_familia = $class->idz();
		$id_cargos = $class->idz();
		
		$id_codigo_rol = $class->idz();
		$fecha = $class->fecha_hora();

		$elemento_relacion='false';
		
		$antecedentes = "NO";
		if(isset($_POST['inp_relacion']))
			$elemento_relacion='true';
		if(isset($_POST["antecedentes"]))
			$antecedentes = "SI";

		// descomponer cursos
		$campos1 = json_decode($_POST['campos1']);
		$campos2 = json_decode($_POST['campos2']);
		$data = "";

		$resp = $class->consulta("INSERT INTO corporativo.personal VALUES  (	'$id_personal',
																				'',
																				'$_POST[codigo_ficha]',
																				'$elemento_relacion',
																				'$_POST[nombres_completos]',
																				'$_POST[cedula]',
																				'$_POST[fecha_nacimiento]',
																				'$_POST[edad]',
																				'$_POST[telf_fijo]',
																				'$_POST[telf_celular]',
																				'$_POST[select_civil]',
																				'$_POST[cargas]',
																				'$_POST[email]',
																				'$_POST[rb_instruccion]',
																				'$_POST[especialidad]',
																				'$_POST[rb_vivienda]',
																				'$_POST[provincia]',
																				'$_POST[canton]',
																				'$_POST[parroquia]',
																				'$_POST[sector]',
																				'$_POST[direccion]',
																				'$_POST[select_sangre]',
																				'$_POST[alergia]',
																				'$_POST[enfermedad]',
																				'$_POST[ini_trab]',
																				'$_POST[fecha_aplicacion]',
																				'".number_format($_POST['sueldo'], 3, '.', '')."',
																				'$_POST[horas_laborar]',
																				'$antecedentes',
																				'defaul.jpg',
																				'1', 
																				'$fecha')");

		for ($i = 0; $i < count($campos1); $i++) {
			$id_cursos = $class->idz();

			$resp = $class->consulta("INSERT INTO corporativo.cursos VALUES (	'$id_cursos',
																				'$id_personal',
																				'".$campos1[$i]->curso."',
																				'".$campos1[$i]->estab."',
																				'".$campos1[$i]->tiempo."',
																				'1', 
																				'$fecha')");
		}

		for ($i = 0; $i < count($campos2); $i++) {
		$id_bancos = $class->idz();
		$resp = $class->consulta("INSERT INTO corporativo.cuentas VALUES (			'$id_bancos',
																					'".$campos2[$i]->id_cuen."',
																					'$id_personal',
																					'".$campos2[$i]->numero_cuen."',
																					'".$campos2[$i]->tipo_cuen."',
																					'1', 
																					'$fecha')");
		}

		$resp = $class->consulta("INSERT INTO corporativo.trabajo_anterior VALUES (	'$id_ant_trab',
																					'$id_personal',
																					'$_POST[empresa]',
																					'$_POST[cargo]',
																					'$_POST[direccion_trab]',
																					'$_POST[telf_fijo_trab]',
																					'$_POST[telf_celular_trab]',
																					'$_POST[jefe]',
																					'$_POST[tiempo_trabajo]',
																					'$_POST[ciudad_trab]',
		 																			'1', 
																					'$fecha')");


		$resp = $class->consulta("INSERT INTO corporativo.datos_familiar VALUES (	'$id_familia',
																					'$id_personal',
																					'$_POST[nombres_familia]',
																					'$_POST[parentesco]',
																					'$_POST[telf_familia]',
																					'$_POST[dir_fami]',
																					'$_POST[ciudad_fami]',
																					'1',
																					'$fecha')");


		$resp = $class->consulta("INSERT INTO corporativo.cargos_asignacion VALUES ('$id_cargos',
																					'$_POST[select_areas]',
																					'$id_personal',
																					'$_POST[select_cargo]',
																					'1', 
																					'$fecha')");

	
		$resp = $class->consulta("INSERT INTO rol_pagos.codigo_rol VALUES  (		'$id_codigo_rol',
																					'$id_personal',
																					'$_POST[abreviatura]',
																					'1', 
																					'$fecha')");
		$data = $id_personal;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {
		$elemento_relacion ='false';
		$antecedentes = "NO";
		if(isset($_POST['inp_relacion']))
			$elemento_relacion ='true';
		if(isset($_POST["antecedentes"]))
			$antecedentes = "SI";
		$fecha = $class->fecha_hora();

		$resp = $class->consulta("UPDATE corporativo.personal set   		relacion_dependencia = '$elemento_relacion',
																			nombres_completos = '$_POST[nombres_completos]',
																			cedula_identificacion = '$_POST[cedula]',
																			fecha_nacimiento = '$_POST[fecha_nacimiento]',
																			edad = '$_POST[edad]',
																			telf_fijo = '$_POST[telf_fijo]',
																			telf_celular = '$_POST[telf_celular]',
																			estado_civil = '$_POST[select_civil]',
																			cargas_familiares = '$_POST[cargas]',
																			email = '$_POST[email]',
																			instruccion = '$_POST[rb_instruccion]',
																			especialidad = '$_POST[especialidad]',
																			tipo_vivienda = '$_POST[rb_vivienda]',
																			provincia = '$_POST[provincia]',
																			canton = '$_POST[canton]',
																			parroquia = '$_POST[parroquia]',
																			sector = '$_POST[sector]',
																			direccion = '$_POST[direccion]',
																			tipo_sangre = '$_POST[select_sangre]',
																			alergia_antibio = '$_POST[alergia]',
																			enfermedad = '$_POST[enfermedad]',
																			fecha_ing_trab = '$_POST[ini_trab]',
																			fecha_aplicacion = '$_POST[fecha_aplicacion]', 
																			sueldo = '$_POST[sueldo]',
																			horas_laborar = '$_POST[horas_laborar]',
																			antecedentes = '$antecedentes'
																			where id = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.trabajo_anterior set  	nomre_empresa = '$_POST[empresa]',
																			cargo = '$_POST[cargo]',
																			direccion = '$_POST[direccion_trab]',
																			telf_fijo = '$_POST[telf_fijo_trab]',
																			telf_celular = '$_POST[telf_celular_trab]',
																			nombre_jefe = '$_POST[jefe]',
																			tiempo_trab = '$_POST[tiempo_trabajo]',
																			ciudad = '$_POST[ciudad_trab]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.datos_familiar set     nombres = '$_POST[nombres_familia]',
																			parentesco = '$_POST[parentesco]',
																			telefono = '$_POST[telf_familia]',
																			direccion = '$_POST[dir_fami]',
																			ciudad_fami = '$_POST[ciudad_fami]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.cargos_asignacion set 	id_areas = '$_POST[select_areas]',
																			id_cargos = '$_POST[select_cargo]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE rol_pagos.codigo_rol set 			codigo = '$_POST[abreviatura]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

	$data = $_POST['id_personal'];
	echo $data;
	}

	//comparar identificacion personal
	if (isset($_POST['comparar_cedula'])) {
		$resultado = $class->consulta("SELECT * FROM corporativo.personal WHERE cedula_identificacion = '$_POST[cedula]' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$cont++;
		}

		if ($cont == 0) {
		    $data = 0;
		} else {
		    $data = 1;
		}
		echo $data;
	}
	// fin

	// cargar ultima codigo 
	if (isset($_POST['cargar_codigo'])) {
		$resultado = $class->consulta("SELECT max(codigo_ficha) FROM corporativo.personal GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo_ficha' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	//LLena los bancos en el Combo
	if (isset($_POST['llenar_bancos'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.bancos WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

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
	
	//LLena las areas en el Combo
	if (isset($_POST['llenar_cargo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.cargos WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	// consulta la edad del personal con la fecha de nacimiento y fecha actual
	if (isset($_POST['consulta_edad'])) {
		$datetime1 = date_create($_POST['fecha']);
		$datetime2 = date_create($class->fecha());
		$interval = date_diff($datetime1, $datetime2);
		print($interval->y) ;
	}
	// fin

	// consultar ficha de ingreso general
	if(isset($_POST['cargar_tabla_fichas'])) { 
		$resultado = $class->consulta("SELECT  P.id, P.cedula_identificacion, P.nombres_completos, P.fecha_aplicacion FROM corporativo.personal P WHERE P.estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row['id'],
						'cedula_identificacion' => $row['cedula_identificacion'],
						'nombres_completos' => $row['nombres_completos'],
						'fecha_aplicacion' => $row['fecha_aplicacion']
						);
		}
		echo $lista = json_encode($lista);
	}
	// consultar ficha de ingreso personal
	if(isset($_POST['llenar_personal'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT  * FROM corporativo.personal P WHERE P.estado = '1' AND id = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['1'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		    $arr_data[] = $row['7'];
		    $arr_data[] = $row['8'];
		    $arr_data[] = $row['9'];
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
		    $arr_data[] = $row['25'];
		    $arr_data[] = $row['26'];
		    $arr_data[] = $row['27'];
		    $arr_data[] = $row['28'];
		}
		echo json_encode($arr_data);
	}
	// Llenar cursos realizados
	if (isset($_POST['llenar_cursos_realizados'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT C.nombre, C.establecimiento, C.tiempo FROM corporativo.cursos C  WHERE C.id_personal = '$_POST[id]' ");
		while ($row = $class->fetch_array($resultado)) {
			$accion = '<div class="hidden-sm hidden-xs action-buttons"> <a class="red dc_btn_accion tooltip-error" data-rel="tooltip" data-original-title="Eliminar"><i class="ace-icon fa fa-trash-o bigger-130" onclick=\"angular.element(this).scope().methodseliminar(event)\"></i></a></div>';
			print '	<tr>
						<td>'.$row['0'].'</td>					
						<td>'.$row['1'].'</td>
						<td>'.$row['2'].'</td>
						<td>'.$accion.'</td>
					</tr>';
		}
	}
	// Llenar cuentas bancarias
	if (isset($_POST['llenar_cuentas_bancarias'])) {
		$resultado = $class->consulta("SELECT C.nombre_cuenta, B.nombre, C.numero FROM corporativo.cuentas  C, corporativo.bancos B WHERE C.id_bancos = B.id AND C.id_personal = '$_POST[id]' ");
		while ($row = $class->fetch_array($resultado)) {
			print '	<tr>
						<td>'.$row['0'].'</td>					
						<td>'.$row['1'].'</td>
						<td>'.$row['2'].'</td>
						<td><div class="hidden-sm hidden-xs action-buttons"> <a class="red dc_btn_accion tooltip-error" data-rel="tooltip" data-original-title="Eliminar"><i class="ace-icon fa fa-trash-o bigger-130" onclick=\"angular.element(this).scope().methodseliminar2(event)\"></i></a></div></td>
					</tr>';
		}
	}
	// consultar ficha de ingreso nacionalidad
	if(isset($_POST['llenar_nacionalidad'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT L.id FROM corporativo.nacionalidad N, Localizacion.ciudad L, corporativo.personal P WHERE N.id_ciudad_pais = L.id AND N.id_personal = P.id and N.id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
				$data = array('id' => $row['id']);
		}
		print_r(json_encode($data));
	}
	// consultar ficha de trabajos anteriores
	if(isset($_POST['llenar_trabajos_anteriores'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM corporativo.trabajo_anterior  WHERE estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		    $arr_data[] = $row['7'];
		    $arr_data[] = $row['8'];
		    $arr_data[] = $row['9'];
		}
		echo json_encode($arr_data);
	}
	// consultar ficha de trabajos anteriores
	if(isset($_POST['llenar_datos_familiares'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM corporativo.datos_familiar  WHERE estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		}
		echo json_encode($arr_data);
	}
	// consultar ficha de trabajos anteriores
	if(isset($_POST['llenar_cargos_personales'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT C.id_areas, C.id_cargos FROM corporativo.cargos_asignacion C  WHERE  estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['1'];
		}
		echo json_encode($arr_data);
	}

	// consultar abreviatura rol
	if(isset($_POST['llenar_abreviatura'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM rol_pagos.codigo_rol C  WHERE  estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
		    $arr_data[] = $row['2'];
		}
		echo json_encode($arr_data);
	}
?>