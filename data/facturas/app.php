<?php        
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	// guardar facturas
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_facturas = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";
		$serie = "001-001-".$_POST['serie_factura'];

		$resp = $class->consulta("INSERT INTO factura_venta VALUES  (				'$id_facturas',
																					'$_POST[id_cliente]',
																					'".$_SESSION['user']['id']."',
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

		// datos detalle factura
		$campo1 = $_POST['campo1'];
	    $campo2 = $_POST['campo2'];
	    $campo3 = $_POST['campo3'];
	    $campo4 = $_POST['campo4'];
	    $campo5 = $_POST['campo5'];
	    $campo6 = $_POST['campo6'];
	    $campo7 = $_POST['campo7'];
	    $campo8 = $_POST['campo8'];
	    // Fin

	    // descomponer detalle_factura_compra
		$arreglo1 = explode('|', $campo1);
	    $arreglo2 = explode('|', $campo2);
	    $arreglo3 = explode('|', $campo3);
	    $arreglo4 = explode('|', $campo4);
	    $arreglo5 = explode('|', $campo5);
	    $arreglo6 = explode('|', $campo6);
	    $arreglo7 = explode('|', $campo7);
	    $arreglo8 = explode('|', $campo8);
	    $nelem = count($arreglo1);
	    // fin

	    for ($i = 1; $i < $nelem; $i++) {
	    	$id_detalle_facturas = $class->idz();

			$resp = $class->consulta("INSERT INTO detalle_factura_venta VALUES(		'$id_detalle_facturas',
																					'$id_facturas',
																					'".$arreglo1[$i]."',
																					'".$arreglo2[$i]."',
																					'".$arreglo3[$i]."',
																					'".$arreglo4[$i]."',
																					'".$arreglo5[$i]."',
																					'".$arreglo6[$i]."',
																					'".$arreglo7[$i]."',
																					'1', 
																					'$fecha')");


			$resp = $class->consulta("UPDATE contratos.detalle_cuentas_cobrar SET estado = '2' where id = '".$arreglo8[$i]."'");
	    }

		$data = $id_facturas;
		echo $data;
	}
	// fin

	//cargar datos facturero
	if (isset($_POST['cargar_facturero'])) {
		$resultado = $class->consulta("SELECT * FROM facturero WHERE estado = '1' GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array(	'id' => $row[0],
							'fecha_inicio' => $row[1],
							'fecha_caducidad' => $row[2],
							'inicio_facturero' => $row[3],
							'finaliza_facturero' => $row[4]);
		}
		print_r(json_encode($data));
	}
	//fin

	// anular facturas
	if (isset($_POST['anular_factura'])) {
		$fecha_corta = $class->fecha();
		
		$resp = $class->consulta("UPDATE factura_venta SET estado = '2', fecha_anulacion = '$fecha_corta' where id = '".$_POST['id']."'");

		$data = 1;
		echo $data;
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

	//llenar cabezera factura venta
	if (isset($_POST['llenar_cabezera_factura'])) {
		$resultado = $class->consulta("SELECT F.id, C.id, C.ruc_empresa, C.nombre_comercial, C.direccion, C.celular, C.correo, F.fecha_actual, F.forma_pago, F.serie, F.subtotal, F.descuento, F.base_imponible, F.iva, F.otros, F.total_pagar, F.estado FROM factura_venta F, clientes C WHERE F.id_clientes = C.id AND F.id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array(  'id_factura' => $row[0],
							'id_clientes' => $row[1],
							'ruc' => $row[2],
							'cliente' => $row[3],
							'direccion' => $row[4],
							'telefono' => $row[5],
							'correo' => $row[6],
							'fecha_actual' => $row[7],
							'pago' => $row[8],
							'serie' => $row[9],
							'subtotal' => $row[10],
							'descuento' => $row[11],
							'base_imponible' => $row[12],
							'iva' => $row[13],
							'otros' => $row[14],
							'total_pagar' => $row[15],
							'estado' => $row[16]);
		}
		print_r(json_encode($data));
	}
	//fin

	//llenar detalle factura venta
	if (isset($_POST['llenar_detalle_factura'])) {
		$resultado = $class->consulta("SELECT D.id_paquete, P.codigo, P.descripcion, D.cantidad, D.valor_unitario, D.descuento, D.total_venta FROM detalle_factura_venta D, factura_venta F, paquetes P  WHERE D.id_factura_venta = F.id AND D.id_paquete = P.id AND F.id = '".$_POST['id']."' ORDER BY D.id asc");
		while ($row = $class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['1'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		}
		echo json_encode($arr_data);
	}
	//fin
	
	// busqueda por ruc cliente
	if($_GET['tipo_busqueda'] == 'ruc') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM clientes WHERE ruc_empresa like '%$texto%' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_cliente' => $row[0],
		            'value' => $row[1],
		            'cliente' => $row[4],
		            'direccion' => $row[9],
		            'telefono' => $row[7],
		            'correo' => $row[10]

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
		            'value' => $row[4],
		            'ruc' => $row[1],
		            'direccion' => $row[9],
		            'telefono' => $row[7],
		            'correo' => $row[10]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	//cargar datos mensiones
	if (isset($_POST['llenar_paquetes'])) {
		$resultado = $class->consulta("SELECT P.id, P.codigo, P.descripcion, P.descuento FROM contratos.cuentas_cobrar C, contratos.contratos_selectivos S, paquetes P WHERE C.id_contrato = S.id and S.id_paquete = P.id AND C.id = '".$_POST['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id' => $row[0],'codigo' => $row[1],'descripcion' => $row[2],'descuento' => $row[3]);
		}
		print_r(json_encode($data));
	}
	//fin

	// busqueda por codigo
	if($_GET['tipo_busqueda'] == 'codigo') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM paquetes WHERE estado = '1' AND codigo like '%$texto%'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_paquetes' => $row[0],
		            'value' => $row[2],
		            'descripcion' => $row[3],
		            'precio' => $row[4],
		            'descuento' => $row[5]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin

	// busqueda por descripcion
	if($_GET['tipo_busqueda'] == 'descripcion') {
		$texto = $_GET['term'];
		
		$resultado = $class->consulta("SELECT * FROM paquetes WHERE estado = '1' AND descripcion like '%$texto%'");
		while ($row=$class->fetch_array($resultado)) {
			$data[] = array(
		            'id_paquetes' => $row[0],
		            'value' => $row[3],
		            'codigo' => $row[2],
		            'precio' => $row[4],
		            'descuento' => $row[5]
		        );
		}
		echo $data = json_encode($data);
	}
	// fin
?>