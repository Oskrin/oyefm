<?php 
	session_start();
	if(!$_SESSION) {
		header('Location: login/');
	}
?> 
<!DOCTYPE html>
<html ng-app="scotchApp" lang="es">
	<head><meta http-equiv="Content-Type" content="text/html; charset=gb18030">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		
		<title>Ingresos</title>
		<meta name="description" content="3 styles with inline editable feature" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="dist/css/font-awesome.min.css" />
		<link rel="stylesheet" href="dist/css/animate.min.css" />
		<link rel="stylesheet" href="dist/css/style.css" />

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

		<link rel="stylesheet" href="dist/css/jquery-ui.custom.min.css" />
		<link href="dist/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
		
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

		<!-- controlador procesos angular -->
  		<script src="data/app.js"></script>
  		<script src="data/home/app.js"></script>
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
  		<script src="data/clientes/app.js"></script>
  		<script src="data/fotos_clientes/app.js"></script>
  		<script src="data/ficha_ingresos/app.js"></script>
  		<script src="data/fotos_personal/app.js"></script>
  		<script src="data/ficha_programas/app.js"></script>
  		<script src="data/ficha_invitados/app.js"></script>
  		<script src="data/contratos_selectivos/app.js"></script>
  		<script src="data/contratos_rotativos/app.js"></script>
  		<script src="data/cartera/app.js"></script>
  		<script src="data/facturas/app.js"></script>
  		<script src="data/rol_pagos/app.js"></script>
  		<script src="data/reportes/app.js"></script>
  		<script src="data/usuarios/app.js"></script>
  		<script src="data/fotos_usuario/app.js"></script>
  		<script src="data/perfiles/app.js"></script>
  		<script src="data/privilegios/app.js"></script>
	</head>

	<body ng-controller="mainController" class="no-skin">
		<div id="navbar" class="navbar navbar-default">
			<script type="text/javascript">
				try{ace.settings.check('navbar' , 'fixed')}catch(e){}
			</script>
			<div class="navbar-container" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left">
					<span class="sr-only">Toggle sidebar</span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>
				</button>

				<div class="navbar-header pull-left">
					<a href="#" class="navbar-brand">
						<small>
							<i class="fa fa-music"></i>
							OYEFM 93.1
						</small>
					</a>
				</div>

				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
                                                <li class="green">
							<a data-toggle="dropdown" class="dropdown-toggle" href="">
								<i class="ace-icon fa fa-comments icon-animated-vertical"></i>
								<span class="badge badge-success">{{count}}</span>
							</a>

							<ul class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
								<li class="dropdown-header center">
									<span class="label label-success arrowed-in arrowed-in-right">Conectados</span>
								</li>

								<li class="dropdown-content">
									<ul class="dropdown-menu dropdown-navbar">
									</ul>
								</li>

				                <li ng-repeat="data in datos">
				                    <a href="" class="clearfix">
				                    	<img ng-src="data/fotos_usuario/imagenes/{{data.imagen}}" class="msg-photo" />
				                    	<span class="msg-body" >
											<span class="msg-title" >
												<span class="blue">{{data.usuario}}</span>
											</span>
										</span>
											
				                    </a>
				                </li>
				            </ul>
						</li>

						<li class="light-blue">
							<a data-toggle="dropdown" href="" class="dropdown-toggle">
								<img class="nav-user-photo" src=<?php  print_r('data/fotos_usuario/imagenes/'. $_SESSION['user']['imagen']); ?> alt="" />
								<span class="user-info">
									<small>Bienvenido,</small>
									<?php  print_r($_SESSION['user']['name']); ?>
								</span>

								<i class="ace-icon fa fa-caret-down"></i>
							</a>

							<ul class="dropdown-menu" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
								<li>
									<a href="">
										<i class="ace-icon fa fa-cog"></i>
										Configurar
									</a>
								</li>

								<li>
									<a href="profile.html">
										<i class="ace-icon fa fa-user"></i>
										Cuenta
									</a>
								</li>

								<li class="divider"></li>

								<li>
									<a href="login/exit.php">
										<i class="ace-icon fa fa-power-off"></i>
										Salir
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>

			<div id="sidebar" class="sidebar responsive">
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
				</script>

				<ul class="nav nav-list">
					<li ng-class="{active: $route.current.activetab == 'inicio'}">
						<a href="#/" >
							<i class="menu-icon fa fa-home"></i>
							<span class="menu-text"> Inicio </span>
						</a>

						<b class="arrow"></b>
					</li>

					<li ng-class=	"{'active open': 
												$route.current.activetab == 'tipo_paquetes' ||
												$route.current.activetab == 'paquetes' ||
												$route.current.activetab == 'tipo_programa' ||
												$route.current.activetab == 'tipo_vendedor' ||
												$route.current.activetab == 'tipo_contrato' ||
												$route.current.activetab == 'areas' ||
												$route.current.activetab == 'cargos' ||
												$route.current.activetab == 'bancos'
									}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-cog"></i>
							<span class="menu-text">
								Generales
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class="{active: $route.current.activetab == 'tipo_paquetes'}">
								<a href="#/tipo_paquetes">
									<i class="menu-icon fa fa-caret-right"></i>
									Tipo Paquetes
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'paquetes'}">
								<a href="#/paquetes">
									<i class="menu-icon fa fa-caret-right"></i>
									Paquetes
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'tipo_programa'}">
								<a href="#/tipo_programa">
									<i class="menu-icon fa fa-caret-right"></i>
									Tipo Programa
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'tipo_vendedor'}">
								<a href="#/tipo_vendedor">
									<i class="menu-icon fa fa-caret-right"></i>
									Tipo Vendedor
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'tipo_contrato'}">
								<a href="#/tipo_contrato">
									<i class="menu-icon fa fa-caret-right"></i>
									Tipo Contrato
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'areas'}">
								<a href="#/areas">
									<i class="menu-icon fa fa-caret-right"></i>
									Areas
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'cargos'}">
								<a href="#/cargos">
									<i class="menu-icon fa fa-caret-right"></i>
									Cargos
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'bancos'}">
								<a href="#/bancos">
									<i class="menu-icon fa fa-caret-right"></i>
									Bancos
								</a>
								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': 
												$route.current.activetab == 'empresa' ||
												$route.current.activetab == 'programas' ||
												$route.current.activetab == 'vendedores'
									}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-files-o"></i>
							<span class="menu-text">
								Ingresos
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							

							<li ng-class="{active: $route.current.activetab == 'empresa'}">
								<a href="#/empresa" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>
									Empresa
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'programas'}">
								<a href="#/programas" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>
									Programas
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'vendedores'}">
								<a href="#/vendedores" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>
									Vendedores
								</a>
								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': 
												$route.current.activetab == 'clientes' || 
												$route.current.activetab == 'fotos_clientes'
									}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-book"></i>
							<span class="menu-text">
								Clientes
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class="{active: $route.current.activetab == 'clientes'}">
								<a href="#/clientes">
									<i class="menu-icon fa fa-caret-right"></i>
									Nuevo Cliente
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'fotos_clientes'}">
								<a href="#/fotos_clientes">
									<i class="menu-icon fa fa-caret-right"></i>
									Fotos Clientes
								</a>
								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': 
												$route.current.activetab == 'ficha_ingresos' || 
												$route.current.activetab == 'fotos_personal'
									}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-users"></i>
							<span class="menu-text">
								Corporativo
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class="{active: $route.current.activetab == 'ficha_ingresos'}">
								<a href="#/ficha_ingresos">
									<i class="menu-icon fa fa-caret-right"></i>
									Ficha Ingreso
								</a>
								<b class="arrow"></b>
							</li>

							<li class="">
								<a id="abrir_buscador" style="cursor:pointer; cursor: hand">
									<i class="menu-icon fa fa-caret-right"></i>
									Buscar Ficha
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class="{active: $route.current.activetab == 'fotos_personal'}">
								<a href="#/fotos_personal">
									<i class="menu-icon fa fa-caret-right"></i>
									Fotos Personal
								</a>
								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': $route.current.activetab == 'ficha_invitados'}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-desktop"></i>
							<span class="menu-text">
								Agenda Invitados
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class =	"{active: $route.current.activetab == 'ficha_invitados'}">
								<a href="#/ficha_invitados">
									<i class="menu-icon fa fa-caret-right"></i>
									Ficha Invitados
								</a>
								<b class="arrow"></b>
							</li>

							<li class="">
								<a id="abrir_buscador_invitados" style="cursor:pointer; cursor: hand">
									<i class="menu-icon fa fa-caret-right"></i>
									Buscar Invitados
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': $route.current.activetab == 'ficha_programas'}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-folder-open-o"></i>
							<span class="menu-text">
								Programas 1
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class =	"{active: $route.current.activetab == 'ficha_programas'}">
								<a href="#/ficha_programas">
									<i class="menu-icon fa fa-caret-right"></i>
									Ficha Programas
								</a>
							</li>

							<li class="">
								<a id="abrir_buscador_programas" style="cursor:pointer; cursor: hand">
									<i class="menu-icon fa fa-caret-right"></i>
									Buscar Programas
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class=	"{'active open': 
													$route.current.activetab == 'contratos_selectivos' ||
													$route.current.activetab == 'contratos_rotativos' ||
													$route.current.activetab == 'cartera'
									}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-file"></i>
							<span class="menu-text">
								Contratos
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class =	"{active: $route.current.activetab == 'contratos_selectivos'}">
								<a href="#/contratos_selectivos">
									<i class="menu-icon fa fa-caret-right"></i>
									Contrato Selectivo
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class =	"{active: $route.current.activetab == 'contratos_rotativos'}">
								<a href="#/contratos_rotativos">
									<i class="menu-icon fa fa-caret-right"></i>
									Contrato Rotativo
								</a>

								<b class="arrow"></b>
							</li>

							<li ng-class =	"{active: $route.current.activetab == 'cartera'}">
								<a href="#/cartera">
									<i class="menu-icon fa fa-caret-right"></i>
									Cuentas Cobrar
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': $route.current.activetab == 'facturas'}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-pencil-square-o"></i>
							<span class="menu-text">
								Facturación
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class =	"{active: $route.current.activetab == 'facturas'}">
								<a href="#/facturas">
									<i class="menu-icon fa fa-caret-right"></i>
									Ingreso Facturas
								</a>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': $route.current.activetab == 'rol_pagos'}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-archive"></i>
							<span class="menu-text">
								Rol de Pagos
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class =	"{active: $route.current.activetab == 'rol_pagos'}">
								<a href="#/rol_pagos">
									<i class="menu-icon fa fa-caret-right"></i>
									Ingreso Roles
								</a>
							</li>
						</ul>
					</li>

					<li ng-class =	"{'active open': 
												$route.current.activetab == 'usuarios' ||
												$route.current.activetab == 'fotos_usuario' ||
												$route.current.activetab == 'perfiles' ||
												$route.current.activetab == 'privilegios'
									}">
						<a href="" class="dropdown-toggle">
							<i class="menu-icon fa fa-user"></i>
							<span class="menu-text">
								Usuarios
							</span>
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li ng-class =	"{active: $route.current.activetab == 'usuarios'}">
								<a href="#/usuarios">
									<i class="menu-icon fa fa-caret-right"></i>
									Nuevo Usuario
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class =	"{active: $route.current.activetab == 'fotos_usuario'}">
								<a href="#/fotos_usuario">
									<i class="menu-icon fa fa-caret-right"></i>
									Fotos Usuarios
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class =	"{active: $route.current.activetab == 'perfiles'}">
								<a href="#/perfiles">
									<i class="menu-icon fa fa-caret-right"></i>
									Perfiles
								</a>
								<b class="arrow"></b>
							</li>

							<li ng-class =	"{active: $route.current.activetab == 'privilegios'}">
								<a href="#/privilegios">
									<i class="menu-icon fa fa-caret-right"></i>
									Privilegios
								</a>
								<b class="arrow"></b>
							</li>
						</ul>
					</li>
				</ul>

				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>

				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
				</script>
			</div>

			<div class="main-content ng-view" id="main-container"></div>

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
		
		<script src="dist/js/jquery-ui.min.js"></script>
		<script src="dist/js/fileinput.js" type="text/javascript"></script>
		<script src="dist/js/bootstrap.min.js"></script>
		<script src="dist/js/jquery.form.js"></script>
		<script src="dist/js/chosen.jquery.min.js"></script>
		
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

		<!-- ace scripts -->
		<script src="dist/js/ace-elements.min.js"></script>
		<script src="dist/js/ace.min.js"></script>
		<script src="dist/js/lockr.min.js"></script>
		<script src="dist/js/sweetalert.min.js"></script>
		<script src="dist/js/jquery.blockUI.js"></script>
		<script src="dist/js/NumeroALetras.js"></script>
	</body>
</html>
