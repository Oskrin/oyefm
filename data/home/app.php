<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

        // cargar usuarios conectados
	if (isset($_POST['count_conectados'])) {
		$resultado = $class->consulta("SELECT count(*) FROM usuarios WHERE chat = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('count' => $row[0]);
		}
		echo json_encode($data);
	}
	// fin

	// cargar usuarios conectados
	if (isset($_POST['usuario_conectados'])) {
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE chat = '1' ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array('usuario' => $row[9], 'imagen' => $row[11], 'estado' => $row[12]);
		}

		print_r(json_encode($data));
	}
	// fin

	// if (isset($_POST['llenar_categoria'])) {
	// 	$resultado = $class->consulta("select");
	// 	$acu='';
	// 	while ($row=$class->fetch_array($resultado)) {
	// 		$acu[] = array('id' => $row['id'],'categoria' => $row['categoria']);
	// 	}
	// 	print json_encode($acu);		
	// }
?>