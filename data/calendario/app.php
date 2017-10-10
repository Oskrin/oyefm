<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

	// cargar usuarios conectados
	if (isset($_POST['llenar_evento'])) {
		$resultado = $class->consulta("SELECT * FROM agenda A, programas.programa P WHERE A.id_programa = P.id AND A.estado = '1' ORDER BY A.id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array('nombre_invitado' => $row[2], 'nombre_programa' => $row[15], 'tema' => $row[4], 'fecha_entrevista' => $row[5], 'hora_inicio' => $row[6], 'hora_final' => $row[7]);
		}

		print_r(json_encode($data));
	}
	// fin
?>