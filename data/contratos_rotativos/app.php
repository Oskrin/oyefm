<?php        
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	// error_reporting(0);

	// guardar facturas
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_facturas = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";

		$resp = $class->consulta("INSERT INTO factura_venta VALUES  (				'$id_facturas',
																					'$_POST[select_ruc]',
																					'$_SESSION[Id]',
																					'$_POST[fecha_emision]',
																					'$_POST[fecha_emision]',
																					'$_POST[select_forma]',
																					'$serie',
																					'$_POST[subtotal]',
																					'$_POST[descuento_total]',
																					'$_POST[base_imponible]',
																					'$_POST[iva]',
																					'$_POST[otros]',
																					'$_POST[total_pagar]',
																					'',
																					'1', 
																					'$fecha')");

	}
	// fin

	//cargar ultima serie factura venta
	if (isset($_POST['cargar_series'])) {
		$resultado = $class->consulta("SELECT MAX(serie) FROM factura_venta GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar numero factura preimpresa
	if (isset($_POST['cargar_factura_preimpresa'])) {
		$resultado = $class->consulta("SELECT E.inicio_fac_preimpresa, E.item_factura FROM empresa E WHERE estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('inicio_fac_preimpresa' => $row[0],'item_factura' => $row[1]);
		}
		print_r(json_encode($data));
	}
	//fin

	// busqueda por ruc cliente
	if($_GET['tipo_busqueda'] == 'ruc') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM clientes WHERE ruc_empresa like '%$texto%' AND estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array(
		            'id_cliente' => $row[0],
		            'value' => $row[2],
		            'cliente' => $row[1],
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
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_paquete'].'</option>';
		}
	}
	// fin

	//LLenar combo paquetes
	if (isset($_POST['llenar_paquete'])) {
		$resultado = $class->consulta("SELECT * FROM paquetes P, tipo_paquetes T WHERE P.id_tipo_paquete = T.id AND P.id_tipo_paquete = '".$_POST['id']."'");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row[0].'">'.$row['descripcion'].'</option>';
		}
	}
	// fin

	//LLenar combo tipo contrato
	if (isset($_POST['llenar_tipo_contrato'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_contrato WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_tipo'].'</option>';
		}
	}
	// fin

	//LLenar programas
	if (isset($_POST['llenar_programa'])) {
		$resultado = $class->consulta("SELECT  * FROM programas.programa WHERE estado = '1' ORDER BY id asc");
		print'<option value="">&nbsp;</option>';
		while ($row = $class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_programa'].'</option>';
		}
	}
	// fin

	//cargar datos clientes
	if (isset($_POST['llenar_clientes'])) {
		$resultado = $class->consulta("SELECT * FROM clientes WHERE estado = '1' AND id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('representante' => $row['representante'],'identificacion' => $row['identificacion'],'empresa' => $row['empresa']);
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

?>