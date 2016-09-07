<?php 
include_once('../../admin/class.php');
$class = new constante();

	$id_aceptado = $class->idz();
	$id_preconfirmado = $class->idz();
	$id_confirmado = $class->idz();
	$id_invitados = $class->idz();
	$fecha = $class->fecha_hora();

	if(isset($_POST['inp_aceptado']) == 'on') {
		$resp = $class->consulta("INSERT INTO agenda_invitados.aceptado VALUES (			'$id_aceptado',
																							'$_POST[txt_id_proceso1]',
																							'$_POST[inp_aceptado]',
																							'$_POST[txt_contactado_por]',
																							'$_POST[txt_fecha]',
																							'$_POST[txt_hora]',
																							'$_POST[txt_forma]',
																							'$_POST[txt_contactado_con]',
																							'$_POST[select_usuarios]',
																							'1', '$fecha');");
	}

	if(isset($_POST['inp_preconfirmado']) == 'on') {
		$resp = $class->consulta("INSERT INTO agenda_invitados.preconfirmado VALUES (		'$id_preconfirmado',
																							'$_POST[txt_id_proceso1]',
																							'$_POST[inp_preconfirmado]',
																							'$_POST[txt_preconfirmado_por]',
																							'$_POST[txt_fecha2]',
																							'$_POST[txt_hora2]', 
																							'$_POST[txt_forma2]', 
																							'$_POST[txt_preconfirmado_con]',
																							'$_POST[select_usuarios2]',
																							'1', '$fecha');");
	}

	if(isset($_POST['inp_confirmado']) == 'on') {
		$resp = $class->consulta("INSERT INTO agenda_invitados.confirmado VALUES (			'$id_confirmado',
			 																				'$_POST[txt_id_proceso1]',
																						    '$_POST[inp_confirmado]',
			 																				'$_POST[txt_confirmado_por]',
			 																				'$_POST[txt_fecha3]',
			 																				'$_POST[txt_hora3]',
			 																				'$_POST[txt_forma3]',
			 																				'$_POST[txt_confirmado_con]',
			 																				'$_POST[select_usuarios3]',
																							'1', '$fecha');");
		}

		$resp = $class->consulta("INSERT INTO agenda_invitados.datos_invitado VALUES    (	'$id_invitados',
																							'$_POST[txt_id_proceso1]',
																							'$_POST[txt_invitado]',
																							'$_POST[txt_contacto]', 
																							'$_POST[txt_empresa]',
																							'$_POST[txt_telf]',
																							'$_POST[txt_telf2]',
																							'$_POST[txt_telf3]',
																							'$_POST[txt_direccion]',
																							'$_POST[txt_email]',
																							'$_POST[txt_principal]', 
																							'$_POST[txt_secundario]',
																							'$_POST[txt_nombre1]', 
																							'$_POST[txt_nombre2]',
																							'1', '$fecha');");

		

 ?>