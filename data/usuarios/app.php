<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	// error_reporting(0);
	$cont = 0; 
	
	$fecha = $class->fecha_hora();

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_usuarios = $class->idz();
		$id_privilegios = $class->idz();
		$contrasenia = md5($_POST['clave2']);
		$arreglo = array('require', 
						'tipo_paquetes', 
						'paquetes', 
						'tipo_programa',
						'tipo_vendedor',
						'tipo_contrato',
						'areas',
						'cargos',
						'bancos',
						'empresa',
						'clientes',
						'programas',
						'vendedores',
						'ficha_ingresos',
						'ficha_invitados',
						'ficha_programas',
						'contratos_selectivos',
						'contratos_rotativos',
						'facturas',
						'rol_pagos',
						'usuarios',
						'fotos_usuario',
						'perfiles',
						'privilegios');
		$array = json_encode($arreglo);

		$resp = $class->consulta("INSERT INTO usuarios VALUES (			'$id_usuarios',
																		'$_POST[select_cargo]',
																		'$_POST[nombres_completos]',
																		'$_POST[identificacion]',
																		'$_POST[telefono]',
																		'$_POST[celular]',
																		'$_POST[correo]',
																		'$_POST[ciudad]',
																		'$_POST[direccion]',
																		'$_POST[usuario]',
																		'$contrasenia',
																		'defaul.jpg',
																		'1', 
																		'$fecha');");

		$resp = $class->consulta("INSERT INTO privilegios VALUES (		'$id_privilegios',
																		'$id_usuarios',
																		'$array',
																		'1', 
																		'$fecha');");
		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE usuarios SET			        id_perfil = '$_POST[select_cargo]',
																		nombres_completos = '$_POST[nombres_completos]',
																		cedula = '$_POST[identificacion]',
																		telefono = '$_POST[telefono]',
																		celular = '$_POST[celular]',
																		email = '$_POST[correo]',
																		ciudad = '$_POST[ciudad]',
																		direccion = '$_POST[direccion]',
																		usuario = '$_POST[usuario]',
																		fecha_creacion = '$fecha' WHERE id = '$_POST[id_usuario]'");	
		$data = 2;
		echo $data;
	}

	//comparar identificacion usuarios
	if (isset($_POST['comparar_cedula'])) {
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE cedula = '$_POST[cedula]' AND estado = '1'");
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

	//LLena combo cargos
	if (isset($_POST['llenar_cargo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM perfiles WHERE estado='1' order by id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin
?>