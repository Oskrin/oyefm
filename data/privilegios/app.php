<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);
	$fecha = $class->fecha_hora();

	// modificar privilegios
	if (isset($_POST['updateprivilegios'])) {
		$vector = json_encode($_POST['data']);
		$data = 0;

		$resp = $class->consulta("UPDATE privilegios SET data = '$vector' WHERE id_usuario = '$_POST[user]'");
		if ($resp) {
			$data = 1;
		} 
		echo $data;
	}
	// fin

	//LLena combo usuarios
	if (isset($_POST['llenar_usuarios'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE estado = '1' order by id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombres_completos'].'</option>';
		}
	}
	// fin

	// estado privilegios
	function buscarstatus($array, $valor){
		$retorno = array_search($valor, $array);
		if ($retorno) {
			return true;
		} else {
			return false;
		}	
	}
	// fin

	// Inicios methodo recursos data
	if (isset($_POST['retornar'])) {
		$sum;
		$result = $class->consulta("SELECT * FROM privilegios WHERE id_usuario='".$_POST['id']."'");
		while ($row=$class->fetch_array($result)) {
			$sum = json_decode($row['data']);
		}

		$acumulador = 
		array(
			'IngresosGenerales' => 
			array(
				'text' => 'Generales',
				'type' => 'folder',
				'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
						array(
							'TipoPaquetes' => 
							array(
								'text' => 'Tipo Paquetes',
								'id' => 'tipo_paquetes',
								'type' => 'item',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'tipo_paquetes')
								)
							),
							'Paquetes'=> 
							array(
								'text' => 'Paquetes', 
								'type' => 'item',
								'id' => 'paquetes',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'paquetes')
								)
							),
							'TipoProgramas'=> 
							array(
								'text' => 'Tipo Programas', 
								'type' => 'item',
								'id' => 'tipo_programa',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'tipo_programa')
								)
							),
							'TipoVendedor'=> 
							array(
								'text' => 'Tipo Vendedor', 
								'type' => 'item',
								'id' => 'tipo_vendedor',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'tipo_vendedor')
								)
							),
							'TipoContrato'=> 
							array(
								'text' => 'Tipo Contrato', 
								'type' => 'item',
								'id' => 'tipo_contrato',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'tipo_contrato')
								)
							),
							'Areas'=> 
							array(
								'text' => 'Areas', 
								'type' => 'item',
								'id' => 'areas',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'areas')
								)
							),
							'Cargo'=> 
							array(
								'text' => 'Cargo', 
								'type' => 'item',
								'id' => 'cargos',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'cargos')
								)
							),
							'Bancos'=> 
							array(
								'text' => 'Bancos', 
								'type' => 'item',
								'id' => 'bancos',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'bancos')
								)
							)							
						)
					)
				),
			'Ingresos' => 
				array(
				'text' => 'Ingresos',
				'type' => 'folder',
				'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
						array(
							'Empresa'=> 
							array(
								'text' => 'Empresa', 
								'type' => 'item',
								'id' => 'empresa',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'empresa')
								)
							),
							'Programas'=> 
							array(
								'text' => 'Programas', 
								'type' => 'item',
								'id' => 'programas',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'programas')
								)
							),
							'Vendedores'=> 
							array(
								'text' => 'Vendedores', 
								'type' => 'item',
								'id' => 'vendedores',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'vendedores')
								)
							)									
						)
					)
				),
			'Clientes' => 
				array(
				'text' => 'Clientes',
				'type' => 'folder',
				'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
						array(
							'Clientes'=> 
							array(
								'text' => 'Nuevo Clientes', 
								'type' => 'item',
								'id' => 'clientes',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'clientes')
								)
							),
							'FotosClientes'=> 
							array(
								'text' => 'Fotos Clientes', 
								'type' => 'item',
								'id' => 'fotos_clientes',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'fotos_clientes')
								)
							),									
						)
					)
				),
			'Corporativo' => 
				array(
				'text' => 'Corporativo',
				'type' => 'folder',
				'additionalParameters' => 
					array(
					'id' => 1,
					'children' => 
						array(
						'FichaIngreso'=> 
							array(
								'text' => 'Ficha Ingreso', 
								'type' => 'item',
								'id' => 'ficha_ingresos',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'ficha_ingresos')
								)
							),
						'FotosPersonal'=> 
							array(
								'text' => 'Fotos Personal', 
								'type' => 'item',
								'id' => 'fotos_personal',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'fotos_personal')
								)
							),
						)
					)
				),
			'AgendaInvitados' => 
				array(
				'text' => 'Agenda Invitados',
				'type' => 'folder',
				'additionalParameters' => 
					array(
					'id' => 1,
					'children' => 
						array(
						'FichaInvitados'=> 
							array(
								'text' => 'Agenda Invitados', 
								'type' => 'item',
								'id' => 'ficha_invitados',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'ficha_invitados')
								)
							),
						)
					)
				),
			'Programas' => 
				array(
				'text' => 'Programas',
				'type' => 'folder',
				'additionalParameters' => 
				array(
					'id' => 1,
					'children' => 
					array(
						'FichaProgramas'=> 
							array(
								'text' => 'Ficha Programas', 
								'type' => 'item',
								'id' => 'ficha_programas',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'ficha_programas')
								)
							),
						)
					)
				),
			'Contratos' => 
				array(
				'text' => 'Contratos',
				'type' => 'folder',
				'additionalParameters' => 
				array(
					'id' => 1,
					'children' => 
						array(
							'ContratoSelectivo'=> 
							array(
								'text' => 'Contrato Selectivo', 
								'type' => 'item',
								'id' => 'contratos_selectivos',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'contratos_selectivos')
								)
							),
							'ContratoRotativo'=> 
							array(
								'text' => 'Contrato Rotativo', 
								'type' => 'item',
								'id' => 'contratos_rotativos',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'contratos_rotativos')
								)
							),
							array(
								'text' => 'Cuentas Cobrar', 
								'type' => 'item',
								'id' => 'cartera',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'cartera')
								)
							)
						)
					)
				),
			'Facturacion' => 
				array(
				'text' => 'Facturación',
				'type' => 'folder',
				'additionalParameters' => 
				array(
					'id' => 1,
					'children' => 
					array(
						'IngresoFacturas'=> 
							array(
								'text' => 'Ingreso Facturas', 
								'type' => 'item',
								'id' => 'facturas',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'facturas')
								)
							),
						)
					)
				),
			'RolDePagos' => 
				array(
				'text' => 'Rol De Pagos',
				'type' => 'folder',
				'additionalParameters' => 
				array(
					'id' => 1,
					'children' => 
						array(
						'IngresoRoles'=> 
							array(
								'text' => 'Ingreso Roles', 
								'type' => 'item',
								'id' => 'rol_pagos',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'rol_pagos')
								)
							),
						)
					)
				),
			'Usuarios' => 
				array(
					'text' => 'Usuarios',
					'type' => 'folder',
					'additionalParameters' => 
					array(
					'id' => 1,
					'children' => 
						array(
							'NuevoUsuario'=> 
							array(
								'text' => 'Nuevo Usuario', 
								'type' => 'item',
								'id' => 'usuarios',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'usuarios')
								)
							),
							'ImagenUsuario'=> 
							array(
								'text' => 'Fotos Usuarios', 
								'type' => 'item',
								'id' => 'fotos_usuario',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'fotos_usuario')
								)
							),
							'Perfiles'=> 
							array(
								'text' => 'Perfiles', 
								'type' => 'item',
								'id' => 'perfiles',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'perfiles')
								)
							),
							'Privilegios'=> 
							array(
								'text' => 'Privilegios', 
								'type' => 'item',
								'id' => 'privilegios',
								'additionalParameters' => 
								array(
									'item-selected' => buscarstatus($sum,'privilegios')
								)
							)
						)
					)
				)
			);
		$resultado = $class->consulta("SELECT * FROM usuarios WHERE estado = '1' order by id asc");
		while ($row=$class->fetch_array($resultado)) {
		}
		$acu2;
		for ($i = 0; $i < count($acu); $i++) { 
			$acu2[$i] = array(
							'text' => $acu[$i], 
							'type' => 'folder',
							'additionalParameters' => 
												array(
													'id' => '1',
													'children'=> 
													array('opcion2' => 
														array(
															'text' => 'opcion2', 
															'type' => 'item',
															'id'=>'moji',
															'additionalParameters' => 
															array(
																'item-selected' => true
															)
														)
													)
												)
											);
		}

		print(json_encode($acumulador));
	}
	// fin
?>

