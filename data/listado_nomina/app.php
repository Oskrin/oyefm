<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);
	$fecha = $class->fecha_hora();

	//LLena las areas en el Combo
	if (isset($_POST['llenar_areas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.areas WHERE estado='1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin
?>