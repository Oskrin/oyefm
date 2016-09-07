<?php 
include_once('../../admin/class.php');
$class = new constante();
$id_adicionales = $class->idz();
$fecha = $class->fecha_hora();



$resp = $class->consulta("INSERT INTO agenda_invitados.datos_adicionales VALUES (	'$id_adicionales',
																					'$_POST[txt_id_proceso2]',
																					'$_POST[txt_pregunta1]', 
	 																				'$_POST[txt_pregunta2]',
	 																				'$_POST[txt_pregunta3]',
	 																				'$_POST[txt_pregunta4]',
	 																				'$_POST[txt_pregunta5]',
	 																				'$_POST[txt_pregunta6]',
																					'$_POST[txt_hora_llegada]', 
																					'$_POST[txt_tiempo]',
																					'$_POST[txt_nombre_director]', 
																					'$_POST[txt_nombre_conduccion]',
																					'$_POST[rb_calificacion]',
																					'$_POST[txta_sugerencia]',
																					'$_POST[observaciones]',
																					'1', '$fecha');");
?>