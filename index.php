<?php 
	session_start();
	if(!$_SESSION) {
		header('Location: login/');
	}
?> 
<!DOCTYPE html>
<html ng-app="scotchApp" lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>Ingresos</title>
		<meta name="description" content="3 styles with inline editable feature" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		
		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="dist/css/ng-img-crop.css">
		<link rel="stylesheet" href="dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="dist/css/font-awesome.min.css" />
		<link rel="stylesheet" href="dist/css/animate.min.css" />
		<link rel="stylesheet" href="dist/css/style.css" />
		<link rel="stylesheet" href="dist/css/chat_box.css" />
		<link rel="stylesheet" href="dist/css/colorbox.min.css" />

		<!-- page specific plugin styles -->
		<link rel="stylesheet" href="dist/css/jquery.gritter.min.css" />
		<link rel="stylesheet" href="dist/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="dist/css/chosen.min.css" />
		<link rel="stylesheet" href="dist/css/select2.min.css" />
		<link rel="stylesheet" href="dist/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="dist/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="dist/css/bootstrap-datetimepicker-standalone.css" />
		<link rel="stylesheet" href="dist/css/bootstrap-editable.min.css" />
		<link rel="stylesheet" href="dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="dist/css/sweetalert.css" />
		<link rel="stylesheet" href="dist/css/bootstrap-rating.css" />
		<link rel="stylesheet" href="dist/css/star-rating.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css">

		<link rel="stylesheet" href="dist/css/jquery-ui.custom.min.css" />
		<link href="dist/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="dist/css/fullcalendar.min.css" />
		
		<!-- text fonts -->
		<link rel="stylesheet" href="dist/css/fontdc.css" />
		<!-- ace styles -->
		<link rel="stylesheet" href="dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<script src="dist/js/ace-extra.min.js"></script>

		<!-- Angular js -->
		<script src="dist/angular-1.5.0/angular.js"></script>
		<script src="dist/angular-1.5.0/angular-route.js"></script>
		<script src="dist/angular-1.5.0/angular-animate.js"></script>
		<script src="dist/angular-1.5.0/ui-bootstrap-tpls-1.1.2.min.js"></script>
		<script src="dist/angular-1.5.0/angular-resource.js"></script>
		<script src="dist/js/ngStorage.min.js"></script>
		
		<!-- <script src="dist/js/angular-socket.js"></script>
		<script src="dist/js/socket.io-1.4.5.js"></script> -->

		<!-- controlador procesos angular -->
  		<script src="data/app.js"></script>
  		<script src="data/home/app.js"></script>
  		<script src="data/menu_parametros/app.js"></script>
  		<script src="data/menu_empresas/app.js"></script>
  		<script src="data/menu_cargos/app.js"></script>
  		<script src="data/menu_corporativo/app.js"></script>
  		<script src="data/menu_ventas/app.js"></script>
  		<script src="data/menu_clientes/app.js"></script>
  		<script src="data/menu_empleados/app.js"></script>
  		<script src="data/menu_invitados/app.js"></script>
  		<script src="data/menu_programas/app.js"></script>
  		<script src="data/menu_creditos/app.js"></script>
  		<script src="data/menu_nomina/app.js"></script>
  		<script src="data/menu_rol_pagos/app.js"></script>
  		<script src="data/menu_ordenes/app.js"></script>
  		<script src="data/menu_agenda/app.js"></script>
  		<script src="data/menu_usuarios/app.js"></script>
  		<script src="data/menu_reportes/app.js"></script>
  		<script src="data/presentacion/app.js"></script>
  		<script src="data/quienes_somos/app.js"></script>
  		<script src="data/mision_vision/app.js"></script>
  		<script src="data/politicas/app.js"></script>
  		<script src="data/reglamento/app.js"></script>
  		<script src="data/funciones/app.js"></script>
  		<script src="data/precios/app.js"></script>
  		<script src="data/calendario/app.js"></script>
  		<script src="data/galeria/app.js"></script>
  		<script src="data/facturero/app.js"></script>
  		<script src="data/tipo_paquetes/app.js"></script>
  		<script src="data/paquetes/app.js"></script>
  		<script src="data/tipo_programa/app.js"></script>
  		<script src="data/tipo_vendedor/app.js"></script>
  		<script src="data/tipo_contrato/app.js"></script>
  		<script src="data/areas/app.js"></script>
  		<script src="data/cargos/app.js"></script>
  		<script src="data/bancos/app.js"></script>
  		<script src="data/empresa/app.js"></script>
  		<script src="data/programas/app.js"></script>
  		<script src="data/vendedores/app.js"></script>
  		<script src="data/porcentaje/app.js"></script>
  		<script src="data/creditos/app.js"></script>
  		<script src="data/clientes/app.js"></script>
  		<script src="data/fotos_clientes/app.js"></script>
  		<script src="data/orden_trabajo/app.js"></script>
  		<script src="data/orden_pedido/app.js"></script>
  		<script src="data/ficha_ingresos/app.js"></script>
  		<script src="data/fotos_personal/app.js"></script>
  		<script src="data/contratos_personal/app.js"></script>
  		<script src="data/ficha_programas/app.js"></script>
  		<script src="data/invitados/app.js"></script>
  		<script src="data/ficha_invitados/app.js"></script>
  		<script src="data/fotos_invitados/app.js"></script>
  		<script src="data/contratos_selectivos/app.js"></script>
  		<script src="data/contratos_rotativos/app.js"></script>
  		<script src="data/cuentas_cobrar/app.js"></script>
  		<script src="data/cartera/app.js"></script>
  		<script src="data/facturas/app.js"></script>
  		<script src="data/permisos/app.js"></script>
  		<script src="data/anticipos/app.js"></script>
  		<script src="data/tipo_multas/app.js"></script>
  		<script src="data/tipo_servicio/app.js"></script>
  		<script src="data/multas/app.js"></script>
  		<script src="data/nomina/app.js"></script>
  		<script src="data/listado_nomina/app.js"></script>
  		<script src="data/agenda/app.js"></script>
  		<script src="data/rol_pagos/app.js"></script>
  		<script src="data/generar/app.js"></script>
  		<script src="data/menu_pagos/app.js"></script>
  		<script src="data/pagos/app.js"></script>
  		<script src="data/aprobacion/app.js"></script>
  		<script src="data/conciliacion/app.js"></script>
  		<script src="data/reportes/app.js"></script>
  		<script src="data/usuarios/app.js"></script>
  		<script src="data/fotos_usuario/app.js"></script>
  		<script src="data/perfiles/app.js"></script>
  		<script src="data/privilegios/app.js"></script>
  		<script src="data/configuracion/app.js"></script>

  		<style>
		.datetimepicker{
			z-index: 100000 !important;
    		display: block;
				/*z-index:22 !important;*/
		}
		</style>
  		
  		<style type="text/css">
			.control {
				background: #307ecc;
				/*background: #eff3f8;*/
				/*background: #87b87f;*/
				/*background: #4caf50;*/
				height: 60px;
			}

			/*.dimensiones2{
				margin-top: 13px;	
			}*/

			.dimensiones {
				margin-top: 13px;
				/*border: 1px solid #6fb3e0;*/
				/*width: 20px;*/
				/*padding-bottom: 2px;
				border-radius: 4px!important;*/
			}

			.dimensiones2 {
				margin-top: 20px;
				/*border: 1px solid #6fb3e0;*/
				/*width: 20px;*/
				/*padding-bottom: 2px;
				border-radius: 4px!important;*/
			}

			.posicion { 
				margin-top: 9px;
				float: right;
				margin-left: -5px;
				margin-right: 10px;
			}

			.menu_superior {
				display: inline-block;
			    font-size: 16px;
			    color: #FFF;
			    text-align: center;
			    width: 20px;
			}
		</style>
	</head>

	<body ng-controller="mainController" class="no-skin">
		<div id="navbar" class="navbar navbar-default navbar-fixed-top">
			<script type="text/javascript">
				try{ace.settings.check('navbar' , 'fixed')}catch(e){}
			</script>

			<div class="navbar-container" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="" class="navbar-brand">
						<small>
							YOURSSYSTEM
						</small>
					</a>

					<button class="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
						<span class="sr-only"></span>

						<img src="dist/avatars/user.jpg" alt="J" />
					</button>

					<button class="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#sidebar">
						<span class="sr-only"></span>

						<span class="icon-bar"></span>

						<span class="icon-bar"></span>

						<span class="icon-bar"></span>
					</button>
				</div>

				<!-- <nav role="navigation" class="navbar-menu pull-left collapse navbar-collapse">
					<form class="navbar-form navbar-left form-search" role="search">
						<div class="form-group">
							<input type="text" placeholder="Buscar....." />
						</div>

						<button type="button" class="btn btn-mini btn-info2">
							<i class="ace-icon fa fa-search icon-only bigger-110"></i>
						</button>
					</form>
				</nav> -->

				<div class="navbar-buttons navbar-header pull-right  collapse navbar-collapse" role="navigation">			
					<ul class="nav ace-nav" style="cursor: pointer">
						<li class="transparent">
							<a data-toggle="dropdown">
								<!-- <img class="nav-user-photo" src = <?php  //print_r('data/fotos_usuario/imagenes/'. $_SESSION['user']['imagen']); ?> alt="" /> -->
								<span style="font-size: 14px;font-weight:bold;"><?php  print_r($_SESSION['user']['usuario']); ?></span>
							</a>
						</li>

						<li class="transparent" id="open-event">
							<a data-toggle="dropdown" href="#/">
								<i class="ace-icon fa fa-home bigger-110"  title="Inicio"></i>
							</a>
						</li>

						<li class="transparent">
							<a data-toggle="dropdown">
								<i class="ace-icon fa fa-comments"></i>
								<!-- Conectados -->
								<span class="badge badge-warning">{{count}}</span>
							</a>
							<ul class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
								<li class="dropdown-header">
									<i class="ace-icon fa fa-envelope-o"></i>
									Mensajes
								</li>

				                <li ng-repeat="data in datos">
				                    <a href="" class="clearfix" ng-click="open_chat(data)">
				                    	<img ng-src="data/fotos_usuario/imagenes/{{data.imagen}}" class="msg-photo" />
				                    	<span class="msg-body" >
											<span class="msg-title">
												<span class="blue">{{data.usuario}}</span>
											</span>
										</span>	
				                    </a>
				                </li>
				            </ul>
						</li>

						<li class="transparent" >
							<a href="#/configuracion">
								<i class="ace-icon fa fa-user"></i>
							</a>
						</li>

						<li class="transparent">
							<a href="login/exit.php">
								<i class="ace-icon fa fa-sign-in" data-toggle="tooltip" title="Guardar Registro"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>

			<div id="sidebar" class="sidebar navbar-collapse collapse">
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
				</script>

				<ul class="nav nav-list">
					<li ng-class="{active: $route.current.activetab == 'inicio'}">
						<a href="#/">
							<i class="menu-icon fa fa-home"></i>
							<span class="menu-text"> Inicio </span>
						</a>

						<b class="arrow"></b>
					</li>

					<li ng-class="{active: $route.current.activetab == 'facturero'}">
						<a href="#/facturero">
							<i class="menu-icon fa fa-wrench"></i>

							<span class="menu-text">Parametros</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: $route.current.activetab == 'areas'}">
						<a href="#/areas">
							<i class="menu-icon fa fa-building-o"></i>

							<span class="menu-text">Compañia</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: $route.current.activetab == 'cargos'}">
						<a href="#/cargos">
							<i class="menu-icon fa fa-tags"></i>

							<span class="menu-text">Cargos</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_corporativo' ||
										$route.current.activetab == 'anticipos' ||
										$route.current.activetab == 'permisos' ||
										$route.current.activetab == 'tipo_multas' ||
										$route.current.activetab == 'multas' ||
										$route.current.activetab == 'tipo_servicio'}">
						<a href="#/menu_corporativo">
							<i class="menu-icon fa fa-folder-open-o"></i>

							<span class="menu-text">Corporativo</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_ventas' ||
										$route.current.activetab == 'tipo_paquetes' ||
										$route.current.activetab == 'tipo_vendedor' ||
										$route.current.activetab == 'paquetes' ||
										$route.current.activetab == 'vendedores'}">
						<a href="#/menu_ventas">
							<i class="menu-icon fa fa-tasks"></i>

							<span class="menu-text">Ventas</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_clientes' ||
										$route.current.activetab == 'clientes' ||
										$route.current.activetab == 'fotos_clientes'}">
						<a href="#menu_clientes">
							<i class="menu-icon fa fa-cogs"></i>

							<span class="menu-text">Clientes</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_empleados' ||
										$route.current.activetab == 'ficha_ingresos' ||
										$route.current.activetab == 'fotos_personal' ||
										$route.current.activetab == 'contratos_personal' ||
										$route.current.activetab == 'creditos'}">
						<a href="#/menu_empleados">
							<i class="menu-icon fa fa-gear"></i>

							<span class="menu-text">Empleados</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_invitados' ||
										$route.current.activetab == 'invitados' ||
										$route.current.activetab == 'ficha_invitados'}">
										
						<a href="#/menu_invitados">
							<i class="menu-icon fa fa-group"></i>

							<span class="menu-text">Invitados</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_programas' ||
										$route.current.activetab == 'ficha_programas'}">
						<a href="#menu_programas">
							<i class="menu-icon fa fa-bell-o"></i>

							<span class="menu-text">Programas</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_nomina' ||
										$route.current.activetab == 'nomina' ||
										$route.current.activetab == 'listado_nomina'}">
						<a href="#menu_nomina">
							<i class="menu-icon fa fa-pencil-square-o"></i>

							<span class="menu-text">Nómina</span>
							<b class="arrow"></b>
						</a>
					</li>

 					<li ng-class="{active: 
 										$route.current.activetab == 'menu_rol_pagos' ||
										$route.current.activetab == 'generar' ||
										$route.current.activetab == 'rol_pagos'}">
						<a href="#menu_rol_pagos">
							<i class="menu-icon fa fa-briefcase"></i>

							<span class="menu-text">Rol de Pagos</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_ordenes' ||
										$route.current.activetab == 'orden_trabajo' ||
										$route.current.activetab == 'orden_pedido'}">
						<a href="#menu_ordenes">
							<i class="menu-icon fa fa-desktop"></i>

							<span class="menu-text">Ordenes</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_agenda' ||
										$route.current.activetab == 'agenda'}">
						<a href="#/menu_agenda">
							<i class="menu-icon fa fa-book"></i>

							<span class="menu-text">Agenda</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_pagos' ||
										$route.current.activetab == 'pagos' ||
										$route.current.activetab == 'aprobacion' ||
										$route.current.activetab == 'conciliacion'}">
						<a href="#/menu_pagos">
							<i class="menu-icon fa fa-money"></i>

							<span class="menu-text">Pagos</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: 
										$route.current.activetab == 'menu_usuarios' ||
										$route.current.activetab == 'usuarios' ||
										$route.current.activetab == 'fotos_usuario' ||
										$route.current.activetab == 'perfiles' ||
										$route.current.activetab == 'privilegios'}">
						<a href="#menu_usuarios">
							<i class="menu-icon fa fa-user"></i>

							<span class="menu-text">Usuarios</span>
							<b class="arrow"></b>
						</a>
					</li>

					<li ng-class="{active: $route.current.activetab == 'menu_reportes'}">
						<a href="#menu_reportes">
							<i class="menu-icon fa fa-file-o"></i>

							<span class="menu-text">Reportes</span>
							<b class="arrow"></b>
						</a>
					</li>
				</ul>

				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>

				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
				</script>
			</div>

			<!-- ng-view -->
			<div class="main-content">
				<div class="main-content-inner">
					<div id="sidebar" class="sidebar      h-sidebar                navbar-collapse collapse">
						<script type="text/javascript">
							try{ace.settings.check("sidebar" , "fixed")}catch(e){}
						</script>
						
						<ul class="nav nav-list">
							<li class="hover">
								<a href="">
									<i class="menu-icon fa fa-pencil-square-o"></i>
									<span class="menu-text">EMPRESA</span>

									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="hover">
										<a href="#/presentacion">
											<i class="menu-icon fa fa-caret-right"></i>
											Presentación
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#/quienes_somos">
											<i class="menu-icon fa fa-caret-right"></i>
											¿Quienes Somos?
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#/mision_vision">
											<i class="menu-icon fa fa-caret-right"></i>
											Misión / Visión 
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#/politicas">
											<i class="menu-icon fa fa-caret-right"></i>
											Políticas
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#/reglamento">
											<i class="menu-icon fa fa-caret-right"></i>
											Reglamento Interno
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#/funciones">
											<i class="menu-icon fa fa-caret-right"></i>
											Funciones
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#/precios">
											<i class="menu-icon fa fa-caret-right"></i>
											Precios
										</a>

										<b class="arrow"></b>
									</li>
								</ul>
							</li>

							<li class="hover">
								<a href="">
									<i class="menu-icon fa fa-list"></i>
									<span class="menu-text">VENTAS</span>

									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="hover">
										<a href="#/contratos_selectivos">
											<i class="menu-icon fa fa-caret-right"></i>
											Contratos
										</a>
									</li>

									<li class="hover">
										<a href="#/cuentas_cobrar">
											<i class="menu-icon fa fa-caret-right"></i>
											Cuentas Cobrar
										</a>
									</li>

									<li class="hover">
										<a href="#/facturas">
											<i class="menu-icon fa fa-caret-right"></i>
											Facturación
										</a>
									</li>

									<!-- <li class="hover">
										<a href="">
											<i class="menu-icon fa fa-caret-right"></i>
											Cartera
											<b class="arrow fa fa-angle-down"></b>
										</a>

										<b class="arrow"></b>

										<ul class="submenu">
											<li class="hover">
												<a href="#/cartera">
													<i class="menu-icon fa fa-caret-right"></i>
													Cuentas Cobrar
												</a>

												<b class="arrow"></b>
											</li>
										</ul>
									</li> -->
								</ul>
							</li>

							<li class="hover">
								<a href="">
									<i class="menu-icon fa fa-list-alt"></i>
									<span class="menu-text">PROGRAMACIÓN</span>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="hover">
										<a href="#/tipo_programa">
											<i class="menu-icon fa fa-caret-right"></i>
											Tipo Programa
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="">
											<i class="menu-icon fa fa-caret-right"></i>
											Programas
											<b class="arrow fa fa-angle-down"></b>
										</a>

										<b class="arrow"></b>

										<ul class="submenu">
											<li class="hover">
												<a href="#/ficha_programas">
													<i class="menu-icon fa fa-caret-right"></i>
													Nueva Ficha 
												</a>

												<b class="arrow"></b>
											</li>

											<li class="hover">
												<a href="#/fotos_programas">
													<i class="menu-icon fa fa-caret-right"></i>
													listado
												</a>

												<b class="arrow"></b>
											</li>
										</ul>
									</li>

									<li class="hover">
										<a href="">
											<i class="menu-icon fa fa-caret-right"></i>
											Invitados
											<b class="arrow fa fa-angle-down"></b>
										</a>

										<b class="arrow"></b>

										<ul class="submenu">
											<li class="hover">
												<a href="#/ficha_invitados">
													<i class="menu-icon fa fa-caret-right"></i>
													Nueva Ficha 
												</a>

												<b class="arrow"></b>
											</li>

											<li class="hover">
												<a href="#/fotos_invitados">
													<i class="menu-icon fa fa-caret-right"></i>
													Listado
												</a>

												<b class="arrow"></b>
											</li>
										</ul>
									</li>
								</ul>
							</li>

							<li class="hover">
								<a href="#/calendario">
									<i class="menu-icon fa fa-calendar"></i>

									<span class="menu-text">
										CALENDARIO

										<span class="badge badge-transparent tooltip-error" title="2 Eventos Importantes">
											<i class="ace-icon fa fa-exclamation-triangle red bigger-130"></i>
										</span>
									</span>
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="#/galeria">
									<i class="menu-icon fa fa-picture-o"></i>
									<span class="menu-text">GALERIA</span>
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="">
									<i class="menu-icon fa fa-music"></i>
									<span class="menu-text">PRODUCCIÓN</span>

									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="hover">
										<a href="">
											<i class="menu-icon fa fa-caret-right"></i>
											Clientes
											<b class="arrow fa fa-angle-down"></b>
										</a>

										<b class="arrow"></b>

										<ul class="submenu">
											<li class="hover">
												<a href="#/fotos_clientes">
													<i class="menu-icon fa fa-caret-right"></i>
													Listado
												</a>

												<b class="arrow"></b>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>

						<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
							<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
						</div>
						<script type="text/javascript">
							try{ace.settings.check("sidebar" , "collapsed")}catch(e){}
						</script>
					</div>

					<div class="page-content ng-view">
						       
					</div>
				</div>
			</div>


			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-120">
							<span class="green bolder">OyeFm 93.1</span>
							Applicación &copy; 2016-2017
						</span>
					</div>
				</div>
			</div>

			<aside id="sidebar_secondary" class="tabbed_sidebar ng-scope chat_sidebar" style="z-index:22" >
				<div class="popup-head">
		    		<div class="popup-head-left pull-left">
						<img class="md-user-image" alt="" title="" ng-src="data/fotos_usuario/imagenes/{{datos_chat.imagen}}" title="" alt="" />
						<h1>{{datos_chat.nombres_completos}}</h1>
					</div>

					<div class="popup-head-right pull-right">
		                <button class="chat-header-button" type="button"><i class="glyphicon glyphicon-facetime-video"></i></button>
						<button class="chat-header-button" type="button"><i class="glyphicon glyphicon-earphone"></i></button>
		                <div class="btn-group gurdeepoushan">
						   <button class="chat-header-button" data-toggle="dropdown" type="button" aria-expanded="false">
						   <i class="glyphicon glyphicon-paperclip"></i> </button>
							<ul role="menu" class="dropdown-menu pull-right">
								<li><a href=""><span class="glyphicon glyphicon-picture" aria-hidden="true"></span> Galeria</a></li>
								<li><a href=""><span class="glyphicon glyphicon-camera" aria-hidden="true"></span> Fotos</a></li>
								<li><a href=""><span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span> Video</a></li>
								<li><a href=""><span class="glyphicon glyphicon-headphones" aria-hidden="true"></span> Audio</a></li>
		                        <li><a href=""><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Lugar</a></li>
		                        <li><a href=""><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Contactos</a></li>
							</ul>
						</div>
							
						<button data-widget="remove" id="removeClass" class="chat-header-button pull-right" type="button"><i class="glyphicon glyphicon-remove"></i></button>
		            </div>
				</div>

				<div id="chat" class="chat_box_wrapper chat_box_small chat_box_active" style="opacity: 1; display: block; transform: translateX(0px);">
		            <div class="chat_box touchscroll chat_box_colors_a">
		                <div ng-repeat="mensaje in mensajes track by $index" ng-class="[{'chat_message_wrapper':mensaje.tipo_mensaje == 'SEND'},{'chat_message_wrapper chat_message_right':mensaje.tipo_mensaje == 'RECIBIDO'}]">
		                    <div class="chat_user_avatar">
			                    <img alt="" title="" ng-src="data/fotos_usuario/imagenes/{{datos_chat.imagen}}" ng-show='id_sesion != mensaje.id_usuario' class="md-user-image">
			                    <img alt="" title="" ng-src="data/fotos_usuario/imagenes/{{mensaje.imagen}}" ng-show='id_sesion == mensaje.id_usuario' class="md-user-image">
		                    </div>

		                    <ul class="chat_message">
		                        <li>
		                            <p>{{mensaje.texto}}<span class="chat_message_time"><i class="ace-icon fa fa-clock-o"></i> {{mensaje.fecha_creacion}}</span></p>
		                        </li>
		                    </ul>

		                </div>
		            </div>
		        </div>

				<div class="chat_submit_box">
				    <div class="uk-input-group">
				        <div class="gurdeep-chat-box">
					        <span style="vertical-align: sub;" class="uk-input-group-addon">
					        <a href=""><i class="fa fa-smile-o"></i></a>
					        </span>
					        
					        <input type="text" placeholder="Escribe un mensaje..." emoji-input="{buttonLabel:'Insert Emoji',wysiwyg:true}" id="submit_message" name="submit_message" class="md-input" code="13" ng-keydown="myFunction($event)" />
					        <span style="vertical-align: sub;" class="uk-input-group-addon">
					        <a href=""><i class="fa fa-camera"></i></a>
					        </span>
				        </div>
				    
					    <span class="uk-input-group-addon" ng-click="add($event)">
					    <a href="" ><i class="glyphicon glyphicon-send"></i></a>
					    </span>
		    		</div>
				</div>	
			</aside>

			<a href="" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div>

		<script type="text/javascript">
			window.jQuery || document.write("<script src='dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>

		<script src="dist/js/ng-img-crop.js"></script>
		<script src="dist/js/jquery.bootstrap-duallistbox.min.js"></script>
		<script src="dist/js/jquery.raty.min.js"></script>
		<script src="dist/js/bootstrap-multiselect.min.js"></script>
		<script src="dist/js/typeahead.jquery.min.js"></script>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.js"></script> -->
		
		<script src="dist/js/jquery-ui.min.js"></script>
		<script src="dist/js/fileinput.js" type="text/javascript"></script>
		<script src="dist/js/bootstrap.min.js"></script>
		<script src="dist/js/jquery.form.js"></script>
		<script src="dist/js/chosen.jquery.min.js"></script>
		<script src="dist/js/bootstrap-rating.js"></script>
		<!-- <script src="dist/js/croppic.min.js"></script> -->
		
		
		<script src="dist/js/jquery.validate.min.js"></script>
		<script src="dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="dist/js/jquery.gritter.min.js"></script>
		<script src="dist/js/bootbox.min.js"></script>
		<script src="dist/js/jquery.easypiechart.min.js"></script>
		<script src="dist/js/fuelux/fuelux.wizard.min.js"></script>
		<script src="dist/js/additional-methods.min.js"></script>

		<script src="dist/js/jquery.hotkeys.min.js"></script>
		<script src="dist/js/bootstrap-wysiwyg.min.js"></script>
		<script src="dist/js/select2.min.js"></script>
		<script src="dist/js/fuelux/fuelux.spinner.min.js"></script>
		<script src="dist/js/fuelux/fuelux.tree.min.js"></script>
		<script src="dist/js/x-editable/bootstrap-editable.min.js"></script>
		<script src="dist/js/x-editable/ace-editable.min.js"></script>
		<script src="dist/js/jquery.maskedinput.min.js"></script>
		<script src="dist/js/bootbox.min.js"></script>
		<script src="dist/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="dist/js/date-time/bootstrap-timepicker.min.js"></script>
		<script src="dist/js/date-time/moment.min.js"></script>
		<script src="dist/js/date-time/daterangepicker.min.js"></script>
		<script src="dist/js/date-time/bootstrap-datetimepicker.min.js"></script>
		
		<!-- script de las tablas -->
		<script src="dist/js/jqGrid/jquery.jqGrid.min.js"></script>
		<script src="dist/js/jqGrid/i18n/grid.locale-en.js"></script>
		<script src="dist/js/dataTables/jquery.dataTables.min.js"></script>
		<script src="dist/js/dataTables/jquery.dataTables.bootstrap.min.js"></script>
		<script src="dist/js/dataTables/dataTables.tableTools.min.js"></script>
		<script src="dist/js/dataTables/dataTables.colVis.min.js"></script>
		<script src="dist/js/star-rating.min.js"></script>
		<script src="dist/js/fullcalendar.min.js"></script>
		<script src="dist/js/lang-all.min.js"></script>
		<script src="dist/js/jquery.colorbox.min.js"></script>

		<!-- ace scripts -->
		<script src="dist/js/ace-elements.min.js"></script>
		<script src="dist/js/ace.min.js"></script>
		<script src="dist/js/lockr.min.js"></script>
		<script src="dist/js/sweetalert.min.js"></script>
		<script src="dist/js/jquery.blockUI.js"></script>
		<script src="dist/js/NumeroALetras.js"></script>
	</body>
</html>
