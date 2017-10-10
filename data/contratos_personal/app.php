<?php        
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	// guardar facturas
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_contratos = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";

		$resp = $class->consulta("INSERT INTO contrato_personal VALUES  (		'$id_contratos',
																				'',
																				'".$_SESSION['user']['id']."',
																				'$_POST[codigo]',
																				'$_POST[select_empleado]',
																				'$_POST[select_tipo_contrato]',
																				'$_POST[fecha_contrato]',
																				'1', 
																				'$fecha')");
		$data = 1;
		echo $data;
	}
	// fin

	//LLenar combo tipo contrato
	if (isset($_POST['llenar_tipo_contrato'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_contrato_personal WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_tipo'].'</option>';
		}
	}
	// fin

	//cargar datos mensiones
	if (isset($_POST['llenar_codigo'])) {
		$resultado = $class->consulta("SELECT * FROM tipo_contrato WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo_contrato' => $row['codigo_contrato']);
		}
		print_r(json_encode($data));
	}
	//fin

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres_completos FROM corporativo.personal WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin
?>