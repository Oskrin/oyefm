<?php 
	include_once('../../admin/class.php');
	$class = new constante();

	$resultado = $class->consulta("SELECT  id, nombre_paquete FROM tipo_paquetes WHERE estado = '1'");
	$response = '<select>';
	while ($row = $class->fetch_array($resultado)) {
		$response .= '<option value="'.$row['id'].'">'.$row['nombre_paquete'].'</option>';
	}

	$response .= "</select>";
	print $response;
?>