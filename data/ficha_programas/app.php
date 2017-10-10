<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();
	// LLenar el formulario del proceso 1 que es datos personales
	// if (isset($_POST['btn_guardar']) == "btn_guardar") {
	// 	$id = $class->idz();
	// 	$id_personal = $class->idz();
	// 	$id_bancos = $class->idz();
	// 	$fecha = $class->fecha_hora();

	// 	$elemento_relacion='false';
	// 	if(isset($_POST['inp_relacion']))
	// 		$elemento_relacion='true';

	// 	$resp = $class->consulta("INSERT INTO corporativo.personal VALUES (			'$id_personal',
	// 																				'$_POST[txt_nombres]',
	// 																				'$_POST[txt_apellidos]',
	// 																				'$_POST[txt_cedula]',
	// 																				'$_POST[txt_fecha_nacimiento]',
	// 																				'$_POST[txt_edad]',
	// 																				'$_POST[txt_telf_fijo]',
	// 																				'$_POST[txt_cedula]',
	// 																				'$_POST[select_civil]',
	// 																				'$_POST[txt_cargas]',
	// 																				'$_POST[txt_email]',
	// 																				'$_POST[rb_instruccion]',
	// 																				'$_POST[txt_especialidad]',
	// 																				'$_POST[rb_vivienda]',
	// 																				'$_POST[txt_direccion]',
	// 																				'$_POST[select_sangre]',
	// 																				'$_POST[txt_alergia]',
	// 																				'$_POST[txt_enfermedad]',
	// 																				'$elemento_relacion',
	// 																				'1', '$_POST[txt_fecha_aplicacion]');");

	// 	if ($resp) {
	// 		//respuesta correcta
	// 		print_r(json_encode(array('valid' => 'true')));	
	// 	}else{
	// 		//respuesta false
	// 		print_r(json_encode(array('valid' => 'false')));
	// 	}
	// }
	//para el guardado de equipo que lo conforman
	if (isset($_POST['form-ficha-programas'])) {
		$id = $class->idz();
		$id_ficha_pro = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO programas.equipo VALUES ('$id', '', '$_POST[txt_nombre_conf]','$_POST[txt_telf_conf]','$_POST[txt_email_conf]','$_POST[select_cargo_conf]', '1', '$fecha')");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	// fin

	//LLena los cargos en el Combo
	if (isset($_POST['llenar_equipo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.cargos where estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	//LLena los genero musical en el Combo
	if (isset($_POST['llenar_genero'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM programas.genero where estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	//LLena los tipo programacion en el Combo
	if (isset($_POST['llenar_programacion'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM programas.tipo_programa where estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin

	//LLena los responsables en el Combo
	if (isset($_POST['llenar_responsables'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombres, apellidos FROM corporativo.personal where estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres']."&nbsp;".$row['apellidos'].'</option>';
		}
	}
	// fin

	//para la consulta del genero musical
	if(isset($_POST['consultar_id'])){
		$resultado = $class->consulta("SELECT id, nombre, estado, fecha FROM programas.genero where id='$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$data= array('id' => $row['id'], 'nombre'=>$row['nombre']);
		}
		print_r(json_encode($data));
	}
	// fin

	//para la consulta del cargo de equipos
	if(isset($_POST['consultar_id_cargo'])){
		$resultado = $class->consulta("SELECT id, nombre, estado, fecha_creacion FROM corporativo.cargos where id='$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$data= array('id' => $row['id'], 'nombre'=>$row['nombre']);
		}
		print_r(json_encode($data));
	}
	// fin

	//para la consulta de programacion
	if(isset($_POST['consultar_id_programacion'])){
		$resultado = $class->consulta("SELECT id, nombre, estado, fecha_creacion FROM programas.tipo_programa where id='$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$data= array('id' => $row['id'], 'nombre'=>$row['nombre']);
		}
		print_r(json_encode($data));
	}
	// fin

	//para la consulta de responsables
	if(isset($_POST['consultar_id_responsables'])){
		$resultado = $class->consulta("SELECT id, nombres, estado, fecha_creacion FROM corporativo.personal where id='$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$data= array('id' => $row['id'], 'nombres'=>$row['nombres']);
		}
		print_r(json_encode($data));
	}
	// fin

?>