<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	// error_reporting(0);

	$fecha = $class->fecha_hora();

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_agenda = $class->idz();

		$resp = $class->consulta("INSERT INTO agenda VALUES (			'$id_agenda',
																		'$_POST[titulo_agenda]',
																		'$_POST[nombres_invitado]',
																		'$_POST[select_programa]',
																		'$_POST[tema]',
																		'$_POST[fecha_evento]',
																		'$_POST[hora_inicio]',
																		'$_POST[hora_final]',
																		'$_POST[select_confirmacion]',
																		'$_POST[observaciones]',
																		'1', '$fecha')");
																		
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



	//LLenar programas
	if (isset($_POST['llenar_programa'])) {
		$resultado = $class->consulta("SELECT  * FROM programas.programa WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_programa'].'</option>';
		}
	}
	// fin
?>