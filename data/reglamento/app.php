<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

    // cargar usuarios conectados
	if (isset($_POST['count_conectados'])) {
		$resultado = $class->consulta("SELECT count(*) FROM usuarios WHERE id != '".$_SESSION['user']['id']."' AND chat = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('count' => $row[0]);
		}
		echo json_encode($data);
	}
	// fin

	// cargar usuarios conectados
	if (isset($_POST['usuario_conectados'])) {
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE id != '".$_SESSION['user']['id']."' AND chat = '1' ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array('id' => $row[0], 'nombres_completos' => $row[2], 'usuario' => $row[9], 'imagen' => $row[11], 'estado' => $row[12]);
		}

		print_r(json_encode($data));
	}
	// fin

	 // cargar usuarios conectados
	if (isset($_POST['consultar_chat'])) {
		$fecha = $class->fecha_hora();
		$data = "";
		$id = "";
		$resultado = $class->consulta("SELECT id FROM mensajeria.chat WHERE id_usuario = '".$_SESSION['user']['id']."' AND id_receptor = '".$_POST['id']."' OR id_usuario = '".$_POST['id']."' AND id_receptor = '".$_SESSION['user']['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$id = $row[0];
		}

		if($id == "") {
			$id_chat = $class->idz();

			$resp = $class->consulta("INSERT INTO mensajeria.chat VALUES  (		'$id_chat',
																				'".$_SESSION['user']['id']."',
																				'$_POST[id]',
																				'1',
																				'$fecha')");
			$data = $id_chat;
		} else {
			$data = $id;	
		}

		echo $data;
	}
	// fin

	if (isset($_POST['consultar_id_chat'])) {
		$resultado = $class->consulta("SELECT id FROM usuarios WHERE chat = '1' ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$id_user = $row[0];
			$resultado = $class->consulta("SELECT id FROM mensajeria.chat WHERE id_usuario = '".$id_user."' OR id_receptor = '".$id_user."'");
			while ($row = $class->fetch_array($resultado)) {
				$data[] = array('id' => $row[0]);
			}
			print_r(json_encode($data));	
		}
	}


	// cargar usuarios conectados
	if (isset($_POST['guardar_chat'])) {
		$id_chat_mensajes = $class->idz();
		$fecha = $class->fecha_hora();
		$data = "";

		$resp = $class->consulta("INSERT INTO mensajeria.chat_mensajes VALUES  (		'$id_chat_mensajes',
																						'$_POST[id]',
																						'".$_SESSION['user']['id']."',
																						'$_POST[mensaje]',
																						'FALSE',
																						'SEND',
																						'1',
																						'$fecha')");
		
		$data = array('id' => $id_chat_mensajes, 'mensaje' => $_POST['mensaje'], 'fecha_creacion' => $fecha);

		print_r(json_encode($data));
		// $data = 1;
		// echo $data;
	}
	// fin

	// cargar usuarios conectados
	if (isset($_POST['consultar_mensajes'])) {
		$resultado = $class->consulta("SELECT M.id, M.id_usuario, M.mensaje, M.visto, M.tipo_mensaje, U.imagen, M.fecha_creacion FROM mensajeria.chat_mensajes M, usuarios U WHERE M.id_usuario = U.id AND id_chat ='$_POST[id]' ORDER BY M.id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array('id' => $row[0], 'id_usuario' => $row[1], 'texto' => $row[2], 'visto' => $row[3], 'tipo_mensaje' => $row[4], 'imagen' => $row[5], 'fecha_creacion' => $row[6]);
		}

		print_r(json_encode($data));
	}
	// fin

	// cargar usuarios conectados
	if (isset($_POST['session'])) {
		$data = array('id_sesion' => $_SESSION['user']['id'],'imagen' => $_SESSION['user']['imagen']);
		// $data = $_SESSION['user']['id'];

		print_r(json_encode($data));
	}
	// fin
?>