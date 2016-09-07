<?php        
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	// guardar facturas
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_contratos_selectivos = $class->idz();
		$id_cuentas_cobrar = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";

		$resp = $class->consulta("INSERT INTO contratos.contratos_selectivos VALUES  (		'$id_contratos_selectivos',
																							'".$_SESSION['user']['id']."',
																							'$_POST[id_cliente]',
																							'$_POST[codigo]',
																							'$_POST[select_tipo_contrato]',
																							'$_POST[select_tipo_paquete]',
																							'$_POST[select_paquete]',
																							'$_POST[duracion]',
																							'$_POST[fecha_inicio]',
																							'$_POST[fecha_fin]',
																							'$_POST[select_programa]',
																							'$_POST[bonificacion]',
																							'$fecha_corta',
																							'1', 
																							'$fecha')");

		// calcular meses a pagar
		$inicio = $_POST['fecha_inicio'];
		$fin = $_POST['fecha_fin'];
		 
		$datetime1 = new DateTime($inicio);
		$datetime2 = new DateTime($fin);
		 
		# obtenemos la diferencia entre las dos fechas
		$interval = $datetime2->diff($datetime1);
		 
		# obtenemos la diferencia en meses
		$intervalMeses = $interval->format("%m");
		# obtenemos la diferencia en años y la multiplicamos por 12 para tener los meses
		$intervalAnos = $interval->format("%y")*12;
		$meses = $intervalMeses + $intervalAnos;
		// fin

		// monto paquetes
		$resultado = $class->consulta("SELECT * FROM paquetes WHERE id = '$_POST[select_paquete]'");
		while ($row = $class->fetch_array($resultado)) {
			$monto =  $row['suma_mes'];
			$monto_total = $monto * $meses;
		}

		$resp = $class->consulta("INSERT INTO contratos.cuentas_cobrar VALUES  (			'$id_cuentas_cobrar',
																							'".$_SESSION['user']['id']."',
																							'$_POST[id_cliente]',
																							'$id_contratos_selectivos',
																							'$fecha_corta',
																							'$meses',
																							'".number_format($monto_total, 3, '.', '')."',
																							'".number_format($monto_total, 3, '.', '')."',
																							'1', 
																							'$fecha')");
		// fin

		// detalle cuentas por cobrar 
		$fecha_preven = date('Y-m-d', strtotime("$inicio + 1 month"));
		
		for ($i = 0; $i < $meses; $i++) {
			$id_detalle_cuentas_cobrar = $class->idz();
			$nuevaFecha = date('Y-m-d', strtotime("$fecha_preven + $i month"));
			$monto_total = $monto_total - $monto;
			
			$resp = $class->consulta("INSERT INTO contratos.detalle_cuentas_cobrar VALUES  ('$id_detalle_cuentas_cobrar',
																							'$id_cuentas_cobrar',
																							'$nuevaFecha',
																							'".number_format($monto, 3, '.', '')."',
																							'".number_format($monto_total, 3, '.', '')."',
																							'1', 
																							'$fecha')");	
		}
		// fin

		$data = 1;
		echo $data;
	}
	// fin

	// consultar usuarios
	if(isset($_POST['cargar_tabla'])){
		$resultado = $class->consulta("SELECT S.id, T.nombre_tipo, S.codigo_contrato, C.ruc_empresa, C.nombre_comercial, S.fecha_final, S.estado FROM contratos.contratos_selectivos S,tipo_contrato T, clientes C, paquetes P WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND S.id_tipo_contrato = T.id");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row[0],
						'nombre_tipo' => $row['nombre_tipo'],
						'codigo_contrato' => $row['codigo_contrato'],
						'ruc_empresa' => $row['ruc_empresa'],
						'nombre_comercial' => $row['nombre_comercial'],
						'fecha_final' => $row['fecha_final'],
						'estado' => $row['estado']
						);
		}
		echo $lista = json_encode($lista);
	}
	// fin

	//LLenar combo tipo contrato
	if (isset($_POST['llenar_tipo_contrato'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_contrato WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_tipo'].'</option>';
		}
	}
	// fin

	// busqueda por ruc cliente
	if($_GET['tipo_busqueda'] == 'ruc') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM clientes WHERE ruc_empresa like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_cliente' => $row[0],
		            'value' => $row[1],
		            'cliente' => $row[2],
		            'representante' => $row[8],
		            'identificacion' => $row[9]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	// busqueda por ruc cliente
	if($_GET['tipo_busqueda'] == 'nombre') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM clientes WHERE nombre_comercial like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_cliente' => $row[0],
		            'value' => $row[2],
		            'ruc' => $row[1],
		            'representante' => $row[8],
		            'identificacion' => $row[9]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	//LLenar combo tipo paquete
	if (isset($_POST['llenar_tipo_paquete'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_paquetes WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_paquete'].'</option>';
		}
	}
	// fin

	//LLenar combo paquetes
	if (isset($_POST['llenar_paquete'])) {
		$resultado = $class->consulta("SELECT * FROM paquetes P, tipo_paquetes T WHERE P.id_tipo_paquete = T.id AND P.id_tipo_paquete = '".$_POST['id']."'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row[0].'">'.$row['descripcion'].'</option>';
		}
	}
	// fin

	//LLenar programas
	if (isset($_POST['llenar_programa'])) {
		$resultado = $class->consulta("SELECT  * FROM programas.programa WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_programa'].'</option>';
		}
	}
	// fin

	//cargar datos clientes
	if (isset($_POST['llenar_clientes'])) {
		$resultado = $class->consulta("SELECT * FROM clientes WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('representante' => $row['representante_legal'],'identificacion' => $row['cedula_representante'],'empresa' => $row['nombre_comercial']);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar datos mensiones
	if (isset($_POST['llenar_impactos'])) {
		$resultado = $class->consulta("SELECT * FROM paquetes WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('descripcion' => $row['descripcion'],'precio' => $row['suma_mes']);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar datos mensiones
	if (isset($_POST['llenar_codigo'])) {
		$resultado = $class->consulta("SELECT * FROM tipo_contrato WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo_contrato' => $row['codigo_contrato']);
		}
		print_r(json_encode($data));
	}
	//fin
?>