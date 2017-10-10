<?php
// session_start();
// if(!$_SESSION) {
// 	header('Location: login/');
// }
//Menu banner arriba usuario perfil dependientes del nivel de usuario
function menu_arriba(){	
	print'
	<div id="navbar" class="navbar navbar-default    navbar-collapse       h-navbar">
			<script type="text/javascript">
				try{ace.settings.check("navbar" , "fixed")}catch(e){}
			</script>

			<div class="navbar-container" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="../inici/" class="navbar-brand">
						<small>
							<i class="fa fa-database"></i>
							Contabilidad Web 
						</small>
					</a>

					<button class="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
						<span class="sr-only">Toggle user menu</span>

						<img src="../../dist/avatars/user.jpg" alt="Jasons Photo" />
					</button>

					<button class="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#sidebar">
						<span class="sr-only">Toggle sidebar</span>

						<span class="icon-bar"></span>

						<span class="icon-bar"></span>

						<span class="icon-bar"></span>
					</button>
				</div>

				<nav role="navigation" class="navbar-menu pull-right collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li>
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								Opciones &nbsp;
								<i class="ace-icon fa fa-angle-down bigger-110"></i>
							</a>

							<ul class="dropdown-menu dropdown-light-blue dropdown-caret">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										Configuración
									</a>
								</li>

								<li>
									<a href="profile.html">
										<i class="ace-icon fa fa-user"></i>
										Perfil
									</a>
								</li>

								<li class="divider"></li>

								<li>
									<a href="../salir/">
										<i class="ace-icon fa fa-power-off"></i>
										Salir
									</a>
								</li>
							</ul>
						</li>

						<li>
							<a>
								<i class="ace-icon fa fa-user"></i>
								Bienvenido: 
								
							</a>
						</li>
					</ul>

					<form class="navbar-form navbar-left form-search" role="search">
						<div class="form-group">
							<input type="text" placeholder="Buscador" />
						</div>

						<button type="button" class="btn btn-mini btn-info2">
							<i class="ace-icon fa fa-search icon-only bigger-110"></i>
						</button>
					</form>
				</nav>
			</div><!-- /.navbar-container -->
		</div>
	';
	
}
//Menu Latera perfil aplicacion
function  menu_lateral2(){
	error_reporting(0);
	$url = $_SERVER['PHP_SELF'];
	$acus = parse_url($url, PHP_URL_PATH);
	$acus = split ('/', $acus);
	print'
		<script type="text/javascript">
				try{ace.settings.check("main-container" , "fixed")}catch(e){}
		</script>';
	print'
		<div id="sidebar" class="sidebar      h-sidebar                navbar-collapse collapse">
			<script type="text/javascript">
				try{ace.settings.check("sidebar" , "fixed")}catch(e){}
			</script>

			<div class="sidebar-shortcuts" id="sidebar-shortcuts">
				<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
					<button class="btn btn-success">
						<i class="ace-icon fa fa-signal"></i>
					</button>

					<button class="btn btn-info">
						<i class="ace-icon fa fa-pencil"></i>
					</button>

					<button class="btn btn-warning">
						<i class="ace-icon fa fa-users"></i>
					</button>

					<button class="btn btn-danger">
						<i class="ace-icon fa fa-cogs"></i>
					</button>
				</div>

				<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<span class="btn btn-success"></span>

					<span class="btn btn-info"></span>

					<span class="btn btn-warning"></span>

					<span class="btn btn-danger"></span>
				</div>
			</div><!-- /.sidebar-shortcuts -->

			<ul class="nav nav-list">';
		print'
				<li class="hover">
					<a href="../inicio/">
						<i class="menu-icon fa fa-home"></i>
						<span class="menu-text"> Inicio </span>
					</a>
					<b class="arrow"></b>
				</li>

				<li class="active open hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-desktop"></i>
						<span class="menu-text">
							UI &amp; Elements
						</span>

						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="active open hover">
							<a href="#" class="dropdown-toggle">
								<i class="menu-icon fa fa-caret-right"></i>

								Layouts
								<b class="arrow fa fa-angle-down"></b>
							</a>

							<b class="arrow"></b>

							<ul class="submenu">
								<li class="active hover">
									<a href="top-menu.html">
										<i class="menu-icon fa fa-caret-right"></i>
										Top Menu
									</a>

									<b class="arrow"></b>
								</li>

								<li class="hover">
									<a href="two-menu-1.html">
										<i class="menu-icon fa fa-caret-right"></i>
										Two Menus 1
									</a>

									<b class="arrow"></b>
								</li>

								<li class="hover">
									<a href="two-menu-2.html">
										<i class="menu-icon fa fa-caret-right"></i>
										Two Menus 2
									</a>

									<b class="arrow"></b>
								</li>

								<li class="hover">
									<a href="mobile-menu-1.html">
										<i class="menu-icon fa fa-caret-right"></i>
										Default Mobile Menu
									</a>

									<b class="arrow"></b>
								</li>

								<li class="hover">
									<a href="mobile-menu-2.html">
										<i class="menu-icon fa fa-caret-right"></i>
										Mobile Menu 2
									</a>

									<b class="arrow"></b>
								</li>

								<li class="hover">
									<a href="mobile-menu-3.html">
										<i class="menu-icon fa fa-caret-right"></i>
										Mobile Menu 3
									</a>

									<b class="arrow"></b>
								</li>
							</ul>
						</li>

						<li class="hover">
							<a href="typography.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Typography
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="elements.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Elements
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="buttons.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Buttons &amp; Icons
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="content-slider.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Content Sliders
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="treeview.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Treeview
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="jquery-ui.html">
								<i class="menu-icon fa fa-caret-right"></i>
								jQuery UI
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="nestable-list.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Nestable Lists
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="#" class="dropdown-toggle">
								<i class="menu-icon fa fa-caret-right"></i>

								Three Level Menu
								<b class="arrow fa fa-angle-down"></b>
							</a>

							<b class="arrow"></b>

							<ul class="submenu">
								<li class="hover">
									<a href="#">
										<i class="menu-icon fa fa-leaf green"></i>
										Item #1
									</a>

									<b class="arrow"></b>
								</li>

								<li class="hover">
									<a href="#" class="dropdown-toggle">
										<i class="menu-icon fa fa-pencil orange"></i>

										4th level
										<b class="arrow fa fa-angle-down"></b>
									</a>

									<b class="arrow"></b>

									<ul class="submenu">
										<li class="hover">
											<a href="#">
												<i class="menu-icon fa fa-plus purple"></i>
												Add Product
											</a>

											<b class="arrow"></b>
										</li>

										<li class="hover">
											<a href="#">
												<i class="menu-icon fa fa-eye pink"></i>
												View Products
											</a>

											<b class="arrow"></b>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li class="hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-list"></i>
						<span class="menu-text"> Tables </span>

						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="hover">
							<a href="tables.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Simple &amp; Dynamic
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="jqgrid.html">
								<i class="menu-icon fa fa-caret-right"></i>
								jqGrid plugin
							</a>

							<b class="arrow"></b>
						</li>
					</ul>
				</li>

				<li class="hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-pencil-square-o"></i>
						<span class="menu-text"> Forms </span>

						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="hover">
							<a href="form-elements.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Form Elements
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="form-elements-2.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Form Elements 2
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="form-wizard.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Wizard &amp; Validation
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="wysiwyg.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Wysiwyg &amp; Markdown
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="dropzone.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Dropzone File Upload
							</a>

							<b class="arrow"></b>
						</li>
					</ul>
				</li>

				<li class="hover">
					<a href="widgets.html">
						<i class="menu-icon fa fa-list-alt"></i>
						<span class="menu-text"> Widgets </span>
					</a>

					<b class="arrow"></b>
				</li>

				<li class="hover">
					<a href="calendar.html">
						<i class="menu-icon fa fa-calendar"></i>

						<span class="menu-text">
							Calendar

							<span class="badge badge-transparent tooltip-error" title="2 Important Events">
								<i class="ace-icon fa fa-exclamation-triangle red bigger-130"></i>
							</span>
						</span>
					</a>

					<b class="arrow"></b>
				</li>

				<li class="hover">
					<a href="gallery.html">
						<i class="menu-icon fa fa-picture-o"></i>
						<span class="menu-text"> Gallery </span>
					</a>

					<b class="arrow"></b>
				</li>

				<li class="hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-tag"></i>
						<span class="menu-text"> More Pages </span>

						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="hover">
							<a href="profile.html">
								<i class="menu-icon fa fa-caret-right"></i>
								User Profile
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="inbox.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Inbox
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="pricing.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Pricing Tables
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="invoice.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Invoice
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="timeline.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Timeline
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="email.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Email Templates
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="login.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Login &amp; Register
							</a>

							<b class="arrow"></b>
						</li>
					</ul>
				</li>

				<li class="hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-file-o"></i>

						<span class="menu-text">
							Other Pages

							<span class="badge badge-primary">5</span>
						</span>

						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="hover">
							<a href="faq.html">
								<i class="menu-icon fa fa-caret-right"></i>
								FAQ
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="error-404.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Error 404
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="error-500.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Error 500
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="grid.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Grid
							</a>

							<b class="arrow"></b>
						</li>

						<li class="hover">
							<a href="blank.html">
								<i class="menu-icon fa fa-caret-right"></i>
								Blank Page
							</a>

							<b class="arrow"></b>
						</li>
					</ul>
				</li>
			</ul><!-- /.nav-list -->

			<script type="text/javascript">
				try{ace.settings.check("sidebar" , "collapsed")}catch(e){}
			</script>
		</div>

	';
}

function menu_lateral(){	
	error_reporting(0);
	$url = $_SERVER['PHP_SELF'];
	$acus = parse_url($url, PHP_URL_PATH);
	$acus = split ('/', $acus);
	
	print'<div id="sidebar" class="sidebar      h-sidebar                navbar-collapse collapse">
		<script type="text/javascript">
			try{ace.settings.check("sidebar" , "fixed")}catch(e){}
		</script>
		<div class="sidebar-shortcuts" id="sidebar-shortcuts">
				<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
					<button class="btn btn-success">
						<i class="ace-icon fa fa-signal"></i>
					</button>

					<button class="btn btn-info">
						<i class="ace-icon fa fa-pencil"></i>
					</button>

					<button class="btn btn-warning">
						<i class="ace-icon fa fa-users"></i>
					</button>

					<button class="btn btn-danger">
						<i class="ace-icon fa fa-cogs"></i>
					</button>
				</div>

				<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<span class="btn btn-success"></span>

					<span class="btn btn-info"></span>

					<span class="btn btn-warning"></span>

					<span class="btn btn-danger"></span>
				</div>
			</div><!-- /.sidebar-shortcuts -->
	<ul class="nav nav-list">';	
	print '<li class="hover">
		<a href="../inicio/">
			<i class="menu-icon fa fa-home"></i>
			<span class="menu-text"> Inicio </span>
		</a>
		<b class="arrow"></b>
	</li>';		
	print '<li ';
		if ($acus[3]=='categorias' || $acus[3]=='bodegas' || $acus[3]=='clientes' || $acus[3]=='marcas' || $acus[3]=='unidad_medida'|| $acus[3]=='usuario'|| $acus[3]=='empresa'|| $acus[3]=='tipo_producto'|| $acus[3]=='proveedores'|| $acus[3]=='productos'||$acus[3]=='formas_pago'||$acus[3]=='terminos_pago') {
		print('class="active hover open"');
		}else print('class="hover"');
	print'>
	<a href="#" class="dropdown-toggle">
		<i class="menu-icon fa fa-desktop"></i>
		<span class="menu-text">
			Ingresos
		</span>
		<b class="arrow fa fa-angle-down red"></b>
	</a>
	<b class="arrow"></b>';
	print'<ul class="submenu">
		<li ';
			if ($acus[3]=='bodegas'||$acus[3]=='categorias'||$acus[3]=='marcas'||$acus[3]=='unidad_medida'||$acus[3]=='tipo_producto'||$acus[3]=='formas_pago'||$acus[3]=='terminos_pago') {
				print('class="hover active open"');
			}else print(' class="hover"');
		print'>';			
			echo '<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-caret-right"></i>
				Generales
				<b class="arrow fa fa-angle-down"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';				
				print '<li ';
							if ($acus[3]=='bodegas') {
								print('class="hover active"');
							}else
							print('class="hover"');
				print'>
					<a href="../bodegas/">
						<i class="menu-icon fa fa-caret-right"></i>
						Bodegas
					</a>
					<b class="arrow"></b>
				</li>';
									
				print '<li ';
							if ($acus[3]=='categorias') {
								print('class="hover active"');
							}else
							print('class="hover"');
				print'>
					<a href="../categorias/">
						<i class="menu-icon fa fa-caret-right"></i>
						Categorías
					</a>
					<b class="arrow"></b>
				</li>';
									
				print '<li ';
							if ($acus[3]=='marcas') {
								print('class="hover active"');
							}else print'class="hover"';
				print'>
					<a href="../marcas/">
						<i class="menu-icon fa fa-caret-right"></i>
						Marcas
					</a>
					<b class="arrow"></b>
				</li>';
									
				print '<li ';
							if ($acus[3]=='unidad_medida') {
								print('class="hover active"');
							}else print'class="hover"';
				print'>
					<a href="../unidad_medida/">
						<i class="menu-icon fa fa-caret-right"></i>
						Unidades de Medida
					</a>
					<b class="arrow"></b>
				</li>';
								
				print '<li ';
							if ($acus[3]=='tipo_producto') {
								print('class="hover active"');
							}else print'class="hover"';
				print'>
					<a href="../tipo_producto/">
						<i class="menu-icon fa fa-caret-right"></i>
						Tipo de producto
					</a>
					<b class="arrow"></b>
				</li>';					
				print '<li ';
							if ($acus[3]=='formas_pago') {
								print('class="hover active"');
							}else print'class="hover"';
				print'>
					<a href="../formas_pago/">
						<i class="menu-icon fa fa-caret-right"></i>
						Formas de pago
					</a>
					<b class="arrow"></b>
				</li>';				
				print '<li ';if ($acus[3]=='terminos_pago') {
					print('class="active"');
				}print'>
					<a href="../terminos_pago/">
						<i class="menu-icon fa fa-caret-right"></i>
						Términos de pago
					</a>
					<b class="arrow"></b>
				</li>';				
			print '</ul>
		</li>';
					
		print '<li ';
				if ($acus[3]=='empresa') {
					print('class="hover active"');
				}else print'class="hover"';
		print'>
			<a href="../empresa/">
				<i class="menu-icon fa fa-caret-right"></i>
				Empresa
			</a>
			<b class="arrow"></b>
		</li>';	
						
		print '<li ';
				if ($acus[3]=='usuario') {
					print('class="hover active"');
				}else print'class="hover"';
		print'>
			<a href="../usuario/">
				<i class="menu-icon fa fa-caret-right"></i>
				Usuario
			</a>
			<b class="arrow"></b>
		</li>';
						
		print '<li ';
				if ($acus[3]=='clientes') {
					print('class="hover active"');
				}else print'class="hover"';
		print'>
			<a href="../clientes/">
				<i class="menu-icon fa fa-caret-right"></i>
				Clientes
			</a>
			<b class="arrow"></b>
		</li>';
			
			
		print '<li ';
				if ($acus[3]=='proveedores') {
					print('class="hover active"');
				}else print'class="hover"';
		print'>
			<a href="../proveedores/">
				<i class="menu-icon fa fa-caret-right"></i>
				Proveedores
			</a>
			<b class="arrow"></b>
		</li>';
								
		print '<li ';
				if ($acus[3]=='productos') {
					print('class="hover active"');
				}else print'class="hover"';
		print'>
				<a href="../productos/">
					<i class="menu-icon fa fa-caret-right"></i>
					Productos
				</a>
				<b class="arrow"></b>
			</li>';						
		print '</ul>
		</li>';
		
		print '<li ';
			if ($acus[3]=='factura_compra' || $acus[3]=='devolucion_compra' || $acus[3]=='factura_venta' || $acus[3]=='nota_credito' || $acus[3]=='cuentas_cobrar' || $acus[3]=='cuentas_pagar' || $acus[3]=='cuentas_cobrar' || $acus[3]=='nomina' || $acus[3]=='pagos' || $acus[3]=='kardex' || $acus[3]=='inventario' || $acus[3]=='libro_diario' ) {
				print('class="hover active open"');
			}else print('class="hover"');
			print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-cubes ranger"></i>
				<span class="menu-text">
					Procesos
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
				print '<li ';
					if ($acus[3]=='inventario') {
						print('class=" hover active"');
					}else print('class="hover"');
				print'>
					<a href="../inventario/">
						<i class="menu-icon fa fa-caret-right"></i>
						Inventario
					</a>
					<b class="arrow"></b>
				</li>';			

				print '<li ';
					if ($acus[3]=='proforma') {
						print('class=" hover active"');
					}else print('class="hover"');
				print'>
					<a href="../proforma/">
						<i class="menu-icon fa fa-caret-right"></i>
						Proforma
					</a>
					<b class="arrow"></b>
				</li>';	

				print '<li ';
					if ($acus[3]=='factura_compra' || $acus[3]=='devolucion_compra') {
						print('class="hover active open"');
					}else print('class="hover"');
				print'>
					<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Compras
					<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
				<ul class="submenu">';					
				print '<li ';
					if ($acus[3]=='factura_compra') {
						print('class="hover active"');
					}else print('class="hover"');
				print'>
					<a href="../factura_compra/">
						<i class="menu-icon fa fa-caret-right"></i>
						Productos Bodega
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
					if ($acus[3]=='devolucion_compra') {
						print('class="hover active"');
					}else print('class="hover"');
				print'>
					<a href="../devolucion_compra/">
						<i class="menu-icon fa fa-caret-right"></i>
						Devolución Compras
					</a>
					<b class="arrow"></b>
				</li>';																													
				print '</ul>
				</li>';

				print '<li ';
					if ($acus[3]=='factura_venta' || $acus[3]=='nota_credito') {
						print('class="hover active open"');
					}else print('class="hover"');
				print'>
					<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Ventas
					<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
				<ul class="submenu">';					
				print '<li ';
					if ($acus[3]=='factura_venta') {
						print('class="hover active"');
					}else print('class="hover"');
				print'>
					<a href="../factura_venta/">
						<i class="menu-icon fa fa-caret-right"></i>
						Ventas Facturación
					</a>
					<b class="arrow"></b>
				</li>';																													
				print '</ul>
				</li>';

				print '<li ';
					if ($acus[3] == 'cuentas_cobrar' || $acus[3] == 'cuentas_pagar') {
						print('class="hover active open"');
					} else print('class="hover"');
				print'>
					<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Cartera
					<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
				<ul class="submenu">';					
				print '<li ';
					if ($acus[3] == 'cuentas_cobrar') {
						print('class="hover active"');
					}else print('class="hover"');
				print'>
					<a href="../cuentas_cobrar/">
						<i class="menu-icon fa fa-caret-right"></i>
						Cuentas Cobrar
					</a>
					<b class="arrow"></b>
				</li>';		

				print '<li ';
					if ($acus[3] == 'cuentas_pagar') {
						print('class="hover active"');
					}else print('class="hover"');
				print'>
					<a href="../cuentas_pagar/">
						<i class="menu-icon fa fa-caret-right"></i>
						Cuentas Pagar
					</a>
					<b class="arrow"></b>
				</li>';	
																																
				print '</ul>
				</li>';

				print '<li ';
				if ($acus[3]=='nomina') {
					print('class=" hover active"');
				}else print('class="hover"');
				print'>
				<a href="../nomina/">
					<i class="menu-icon fa fa-caret-right"></i>
					Nómina
				</a>
				<b class="arrow"></b>
				</li>';

				print '<li ';
				if ($acus[3]=='pagos') {
					print('class=" hover active"');
				}else print('class="hover"');
				print'>
				<a href="../pagos/">
					<i class="menu-icon fa fa-caret-right"></i>
					Pagos
				</a>
				<b class="arrow"></b>
				</li>';

				print '<li ';
				if ($acus[3]=='kardex') {
					print('class=" hover active"');
				}else print('class="hover"');
				print'>
				<a href="../kardex/">
					<i class="menu-icon fa fa-caret-right"></i>
					Kardex
				</a>
				<b class="arrow"></b>
				</li>';

				print '<li ';
					if ($acus[3]=='libro_diario') {
						print('class=" hover active"');
					}else print('class="hover"');
				print'>
					<a href="../libro_diario/">
						<i class="menu-icon fa fa-caret-right"></i>
						Libro Diario
					</a>
					<b class="arrow"></b>
				</li>';															
		print '</ul>
		</li>';

		print '<li ';
			print('class="hover"');
			print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-print ranger"></i>
				<span class="menu-text">
					Reportes
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			

				print '<li ';
				print('class="hover"');
				print'>
					<a href="" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Productos
					<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
				<ul class="submenu">';					
				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="producto_general">
						<i class="menu-icon fa fa-caret-right"></i>
						Lista de Precios
					</a>
					<b class="arrow"></b>
				</li>';

				// print '<li ';
				// print('class="hover"');
				// print'>
				// 	<a href="#" id="producto_general_precio">
				// 		<i class="menu-icon fa fa-caret-right"></i>
				// 		Productos General
				// 	</a>
				// 	<b class="arrow"></b>
				// </li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#"  id="producto_marca_categoria">
						<i class="menu-icon fa fa-caret-right"></i>
						P. Categorías y Marcas
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="producto_existencia_minima">
						<i class="menu-icon fa fa-caret-right"></i>
						Existencia mínima
					</a>
					<b class="arrow"></b>
				</li>';	

				print '</ul>
				</li>';

				print '<li ';
		        print('class="hover"');
				print'>
					<a href="" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Compras Locales
					<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
				<ul class="submenu">';	

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="reporte_factura_compra">
						<i class="menu-icon fa fa-caret-right"></i>
						Facturas
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="agrupados_proveedor">
						<i class="menu-icon fa fa-caret-right"></i>
						Agrupados Proveedor
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="reporte_dev_compras">
						<i class="menu-icon fa fa-caret-right"></i>
						Devolución Compra
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="resumenFacturas">
						<i class="menu-icon fa fa-caret-right"></i>
						Facturas Proveedor
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="#" id="resumenFacturasCompras">
						<i class="menu-icon fa fa-caret-right"></i>
						Facturas Agrupadas
					</a>
					<b class="arrow"></b>
				</li>';	

				print '</ul>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="" class="dropdown-toggle">
					<i class="menu-icon fa fa-caret-right"></i>
					Ventas
					<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
					<ul class="submenu">';	
						print '<li ';
						print('class="hover"');
						print'>
						<a href="" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Flujo de Caja
						<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>
						<ul class="submenu">';	

						print '<li ';
						print('class="hover"');
						print'>
							<a href="#" id="ventaGeneralClientes">
								<i class="menu-icon fa fa-caret-right"></i>
								Resumen de venta general clientes
							</a>
							<b class="arrow"></b>
						</li>';	

						print '<li ';
						print('class="hover"');
						print'>
							<a href="#" id="ventaGeneral">
								<i class="menu-icon fa fa-caret-right"></i>
								Resumen de venta general
							</a>
							<b class="arrow"></b>
						</li>';

						print '<li ';
						print('class="hover"');
						print'>
							<a href="#" id="diario_caja">
								<i class="menu-icon fa fa-caret-right"></i>
								Diario de caja
							</a>
							<b class="arrow"></b>
						</li>';
					print '</ul>
				</li>';	

				print '<li ';
				print('class="hover"');
				print'>
					<a href="" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Resumen de:
						<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>
						<ul class="submenu">';	

						print '<li ';
						print('class="hover"');
						print'>
							<a href="" id="reporte_factura_venta">
								<i class="menu-icon fa fa-caret-right"></i>
								Facturas
							</a>
							<b class="arrow"></b>
						</li>';	

						print '<li ';
						print('class="hover"');
						print'>
							<a href="" id="reporte_facturas_notas_anuladas">
								<i class="menu-icon fa fa-caret-right"></i>
								Facturas Anuladas
							</a>
							<b class="arrow"></b>
						</li>';

						// print '<li ';
						// print('class="hover"');
						// print'>
						// 	<a href="" id="reporte_nota_credito">
						// 		<i class="menu-icon fa fa-caret-right"></i>
						// 		Notas de Crédito
						// 	</a>
						// 	<b class="arrow"></b>
						// </li>';

						print '<li ';
						print('class="hover"');
						print'>
							<a href="" id="reporte_general">
								<i class="menu-icon fa fa-caret-right"></i>
								General Facturas
							</a>
							<b class="arrow"></b>
						</li>';

						// print '<li ';
						// print('class="hover"');
						// print'>
						// 	<a href="" id="reporte_general_notas">
						// 		<i class="menu-icon fa fa-caret-right"></i>
						// 		General Notas de Venta
						// 	</a>
						// 	<b class="arrow"></b>
						// </li>';
					print '</ul>

				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="" id="reporte_utilidad_producto">
						<i class="menu-icon fa fa-caret-right"></i>
						Utilidad de producto
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="" id="reporte_utilidad_factura">
						<i class="menu-icon fa fa-caret-right"></i>
						Utilidad por factura
					</a>
					<b class="arrow"></b>
				</li>';

				print '<li ';
				print('class="hover"');
				print'>
					<a href="" id="reporte_utilidad_factura_general">
						<i class="menu-icon fa fa-caret-right"></i>
						Utilidad General Facturas
					</a>
					<b class="arrow"></b>
				</li>';

				// print '<li ';
				// print('class="hover"');
				// print'>
				// 	<a href=""  id="buscar_serie">
				// 		<i class="menu-icon fa fa-caret-right"></i>
				// 		Números de Serie
				// 	</a>
				// 	<b class="arrow"></b>
				// </li>';
																																
				print '</ul>
				</li>';


				print '<li ';
				print('class="hover"');
				print'>
					<a href="" id="reporte_utilidad_factura_general">
						<i class="menu-icon fa fa-caret-right"></i>
						Cartera
					</a>
					<b class="arrow"></b>
				</li>';															
		print '</ul>
		</li>';
		
		// print '<li ';if ($acus[3]=='r_estadistico' || $acus[3]=='r_simple') {
		// 		print('class="hover active open"');
		// 		}else print('class="hover"');
		// print'>
		// 	<a href="#" class="dropdown-toggle">
		// 		<i class="menu-icon fa fa-print ranger"></i>
		// 		<span class="menu-text">
		// 			Reportes
		// 		</span>
		// 		<b class="arrow fa fa-angle-down red"></b>
		// 	</a>
		// 	<b class="arrow"></b>
		// 	<ul class="submenu">';			
		// 	// print '<li ';
		// 	// 	if ($acus[3]=='r_estadistico') {
		// 	// 		print('class="hover active"');
		// 	// 	}else print('class="hover"');
		// 	// print'>
		// 	// 	<a href="../r_estadistico/">
		// 	// 		<i class="menu-icon fa fa-caret-right"></i>
		// 	// 		Estadisticos
		// 	// 	</a>
		// 	// 	<b class="arrow"></b>
		// 	// </li>';





		// 	print '<li ';
		// 		if ($acus[3]=='r_estadistico') {
		// 			print('class="hover active"');
		// 		}else print('class="hover"');
		// 	print'>
		// 		<a href="../r_estadistico/">
		// 			<i class="menu-icon fa fa-caret-right"></i>
		// 			Productos
		// 		</a>
		// 		<b class="arrow"></b>
		// 	</li>';


		// 	print '<li ';
		// 		if ($acus[3]=='r_simple') {
		// 		print('class="hover active"');
		// 		}else print('class="hover"');
		// 	print'>
		// 		<a href="../r_simple/">
		// 			<i class="menu-icon fa fa-caret-right"></i>
		// 			Simples
		// 		</a>
		// 		<b class="arrow"></b>
		// 	</li>';			
		// 	print '</ul>
		// </li>';			
	
		print '<li ';
			if ($acus[3]=='privilegios') {
				print('class="hover active open"');
			}else print('class="hover"');
		print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-user"></i>
				<span class="menu-text">
					Parametros
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
			print '<li ';
				if ($acus[3]=='privilegios') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../privilegios/">
					<i class="menu-icon fa fa-caret-right"></i>
					Privilegios
				</a>
				<b class="arrow"></b>
			</li>';
										
			print '</ul>			
		</li>';	

		print '<li ';
			if ($acus[3]=='contabilidad') {
				print('class="hover active open"');
			}else print('class="hover"');
		print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-database ranger"></i>
				<span class="menu-text">
					Contabilidad
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
			print '<li ';
				if ($acus[3]=='plan_cuentas') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../plan_cuentas/">
					<i class="menu-icon fa fa-caret-right"></i>
					Plan de Cuentas
				</a>
				<b class="arrow"></b>
			</li>';	
			print '<li ';
				if ($acus[3]=='grupos') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../grupos/">
					<i class="menu-icon fa fa-caret-right"></i>
					Grupos Contables
				</a>
				<b class="arrow"></b>
			</li>';							
			print '<li ';
				if ($acus[3]=='sustento_tributario') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../sustento_tributario/">
					<i class="menu-icon fa fa-caret-right"></i>
					Sustento Tributario
				</a>
				<b class="arrow"></b>
			</li>';					
			print '<li ';
				if ($acus[3]=='tipo_comprobante') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../tipo_comprobante/">
					<i class="menu-icon fa fa-caret-right"></i>
					Tipos de Comprobantes
				</a>
				<b class="arrow"></b>
			</li>';
			print '<li ';
				if ($acus[3]=='sustento_comprobante') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../sustento_comprobante/">
					<i class="menu-icon fa fa-caret-right"></i>
					Sustento - Comprobantes 
				</a>
				<b class="arrow"></b>
			</li>';					
			print '<li ';
				if ($acus[3]=='retencion_fuente') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../retencion_fuente/">
					<i class="menu-icon fa fa-caret-right"></i>
					Retenciones
				</a>
				<b class="arrow"></b>
			</li>';

			print '<li ';
				if ($acus[3]=='bancos') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../bancos/">
					<i class="menu-icon fa fa-caret-right"></i>
					Bancos
				</a>
				<b class="arrow"></b>
			</li>';

			print '<li ';
				if ($acus[3]=='cuentas') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../cuentas/">
					<i class="menu-icon fa fa-caret-right"></i>
					Cuentas
				</a>
				<b class="arrow"></b>
			</li>';

			print '<li ';
				if ($acus[3]=='periodo') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../periodo/">
					<i class="menu-icon fa fa-caret-right"></i>
					Periodos
				</a>
				<b class="arrow"></b>
			</li>';

			print '</ul>
		</li>';		

		print '<li ';
			if ($acus[3]=='formulario') {
				print('class="hover active open"');
			}else print('class="hover"');
		print'>
			<a href="#" class="dropdown-toggle">
				<i class="menu-icon fa fa-file-o"></i>
				<span class="menu-text">
					Formulario SRI
				</span>
				<b class="arrow fa fa-angle-down red"></b>
			</a>
			<b class="arrow"></b>
			<ul class="submenu">';			
			print '<li ';
				if ($acus[3]=='formulario') {				
					print('class="hover active"');
				}else print('class="hover"');
			print'>
				<a href="../formulario/">
					<i class="menu-icon fa fa-caret-right"></i>
					Formulario 101
				</a>
				<b class="arrow"></b>
			</li>';
										
			print '</ul>			
		</li>';			
	
	print '</ul><!-- /.nav-list -->
		<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
			<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
		</div>
		<script type="text/javascript">
			try{ace.settings.check("sidebar" , "collapsed")}catch(e){}
		</script>
	</div>
	';
}
//pie de Pagina Footer proceso desarrolladores empresa y datos adicionales de la misma
function footer(){
	print'<div class="footer">
		<div class="footer-inner">
			<div class="footer-content">
				<span class="bigger-120">
				<span class="blue bolder">Neltex</span>
					Aplicacion Web de Contabilidad &copy; 2015-2016
				</span>
				&nbsp; &nbsp;
				<span class="action-buttons">
				<a href="#">
					<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
				</a>
				<a href="#">
					<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
				</a>
				<a href="#">
					<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
				</a>
				</span>
			</div>
		</div>
	</div>';
} 

?>
