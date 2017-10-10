<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();
	$fecha_corta = $class->fecha();
	// $cont = 0;

	if (isset($_POST['btn_confirmar']) == "btn_confirmar") {
		$data = "";
		// modificar pagos
		$resp = $class->consulta("UPDATE pagos SET 	fecha_conciliacion = '$fecha_corta', 
													forma_pago = '$_POST[select_forma]', 
													total_recibido = '$_POST[total_recibido]',
													total_gasto = '$_POST[total_gasto]',
													saldo = '$_POST[saldo]'
													WHERE id = '$_POST[id]'");
		// fin

		

		if ($_POST['select_forma'] == 'CHEQUE') {
			$id_asignacion_cheque = $class->idz();

			$resp = $class->consulta("INSERT INTO asignacion_cheque VALUES(	'$id_asignacion_cheque',
																			'$_POST[id]',
																			'$_POST[num_cheque]',
																			'$_POST[num_cuenta]',
																			'1', 
																			'$fecha')");
		}

		if ($_POST['select_forma'] == 'DEPÓSITO') {
			$id_asignacion_deposito = $class->idz();

			$resp = $class->consulta("INSERT INTO asignacion_deposito VALUES(	'$id_asignacion_deposito',
																				'$_POST[id]',
																				'$_POST[num_deposito]',
																				'$_POST[select_banco]',
																				'1', 
																				'$fecha')");
		}

		if ($_POST['select_forma'] == 'TRANSFERENCIA') {
			$id_asignacion_transferencia = $class->idz();

			$resp = $class->consulta("INSERT INTO asignacion_transferencia VALUES(	'$id_asignacion_transferencia',
																					'$_POST[id]',
																					'$_POST[num_transferencia]',
																					'$_POST[select_banco2]',
																					'$_POST[select_banco3]',
																					'1', 
																					'$fecha')");
		}

		$data = $_POST['id'];
		echo $data;
	}
?>