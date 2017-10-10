<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();
	$cont = 0;

	// guardar anticipos
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_anticipo = $class->idz();
		$data = "";

		$resp = $class->consulta("INSERT INTO rol_pagos.anticipos VALUES  (			'$id_anticipo',
																					'".$_SESSION['user']['id']."',
																					'$_POST[serie_anticipo]',
																					'$_POST[select_empleado]',
																					'".number_format($_POST['monto_anticipo'], 3, '.', '')."',
																					'$_POST[fecha_anticipo]',
																					'$_POST[meses_anticipo]',
																					'$_POST[select_forma_pago]',
																					'$_POST[cheque_numero]',
																					'$_POST[select_banco]',
																					'$_POST[cuenta]',
																					'1', 
																					'$fecha')");
		$data = $id_anticipo;
		echo $data;
	}
	// fin

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE rol_pagos.anticipos SET		id_usuario = '".$_SESSION['user']['id']."',
																		serie_anticipo = '$_POST[serie_anticipo]',
																		id_personal = '$_POST[select_empleado]',
																		monto_anticipo = '".number_format($_POST['monto_anticipo'], 3, '.', '')."',
																		fecha_anticipo = '$_POST[fecha_anticipo]',
																		meses_anticipo = '$_POST[meses_anticipo]',
																		forma_pago = '$_POST[select_forma_pago]',
																		cheque_numero = '$_POST[cheque_numero]',
																		id_bancos = '$_POST[select_banco]',
																		cuenta_anticipo = '$_POST[cuenta]',
																		fecha_creacion = '$fecha' WHERE id = '$_POST[id_anticipo]'");	
		$data = $_POST['id_anticipo'];
		echo $data;
	}

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	// cargar ultima codigo anticipos
	if (isset($_POST['cargar_codigo_anticipo'])) {
		$resultado = $class->consulta("SELECT max(serie_anticipo) FROM rol_pagos.anticipos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_anticipo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar datos anticipos
	if (isset($_POST['llenar_anticipos'])) {
		$resultado = $class->consulta("SELECT * FROM rol_pagos.anticipos WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array(	'id' => $row[0],
							'serie_anticipo' => $row[2],
							'id_personal' => $row[3],
							'monto_anticipo' => $row[4],
							'fecha_anticipo' => $row[5],
							'meses_anticipo' => $row[6],
							'forma_pago' => $row[7],
							'cheque_numero' => $row[8],
							'id_bancos' => $row[9],
							'cuenta_anticipo' => $row[10]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar sueldo empleado
	if (isset($_POST['llenar_sueldo'])) {
		$resultado = $class->consulta("SELECT sueldo FROM corporativo.personal WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array(	'sueldo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin
?>