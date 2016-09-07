<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../../admin/funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();

	// consultar usuarios
	if(isset($_POST['cargar_tabla'])){
		$resultado = $class->consulta("SELECT C.id, S.codigo_contrato, C.fecha_contrato, P.ruc_empresa, P.nombre_comercial, C.monto_credito, C.estado  FROM contratos.cuentas_cobrar C, contratos.contratos_selectivos S, clientes P WHERE id_contrato = S.id AND C.id_cliente = P.id");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row[0],
						'codigo' => $row[1],
						'fecha' => $row[2],
						'identificacion' => $row[3],
						'cliente' => $row[4],
						'monto' => $row[5],
						'estado' => $row[6]
						);
		}
		echo $lista = json_encode($lista);
	}
	// fin

	//Llena las tablas de pagos
	if (isset($_POST['llenar_tabla_pagos'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resultado = $class->consulta("SELECT * FROM contratos.detalle_cuentas_cobrar  WHERE id_cuentas_cobrar = '$_POST[id]' ORDER BY id asc");
		$sum = 1;
		while ($row = $class->fetch_array($resultado)) {
			if($row[5] == '1') {
				print '	<tr>
						<td>'.$sum++.'</td>					
						<td>'.$row[2].'</td>
						<td>'.$row[3].'</td>
						<td>'.$row[4].'</td>
						<td><span class="label label-danger arrowed">PENDIENTE</span></td>
					</tr>';	
			} else {
				if($row[5] == '2') {
					print '	<tr>
						<td>'.$sum++.'</td>					
						<td>'.$row[2].'</td>
						<td>'.$row[3].'</td>
						<td>'.$row[4].'</td>
						<td><span class="label label-success arrowed">CANCELADO</span></td>
					</tr>';	
				}
			}
			
		}
	}
	// fin
?>