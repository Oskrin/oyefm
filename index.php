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
      <title>Administración Oyefm</title>
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
      <link rel="stylesheet" href="dist/css/fileinput.css" media="all" type="text/css" />
      <link rel="stylesheet" href="dist/css/fullcalendar.min.css" />
      <!-- text fonts -->
      <link rel="stylesheet" href="dist/css/fontdc.css" />
      <!-- ace styles -->
      <link rel="stylesheet" href="dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
      <script src="dist/js/ace-extra.min.js"></script>
      <!-- Angular Material style sheet -->
      <link rel="stylesheet" href="./node_modules/material-design-lite/material.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link rel="stylesheet" href="./node_modules/angular-material/angular-material.min.css">
      <script src="./node_modules/material-design-lite/material.min.js"></script>
      <script src="./node_modules/angular/angular.js"></script>
      <script src="./node_modules/angular-aria/angular-aria.js"></script>
      <script src="./node_modules/angular-animate/angular-animate.js"></script>
      <script src="./node_modules/angular-material/angular-material.js"></script>
      <script src="./node_modules/angular-resource/angular-resource.js"></script>
      <script src="./node_modules/ngstorage/ngStorage.min.js"></script>
      <script src="./node_modules/angular-route/angular-route.js"></script>
      <script src="./node_modules/angular-route-segment/build/angular-route-segment.js"></script>
      <script src="./node_modules/angular-messages/angular-messages.js"></script>
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
    </head>

    <body ng-controller="mainController" class="no-skin" layout='row'>
      <div layout='column' layout-fill>
        <md-toolbar ng-controller="toolbarController"  layout-align="center center">
          <div class="md-toolbar-tools">
            <h1>Administracion OYEFM</h1>
            <span flex></span>
            <span class="mdl-chip mdl-chip--contact">
              <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">{{infoUsuario.usuario | limitTo: 1 | uppercase}}</span>
              <span class="mdl-chip__text">{{infoUsuario.usuario}}</span>
            </span>
            <div>         
              <md-button id="menu-lower-left" class="md-icon-button" aria-label="Eat cake">
                <md-icon>more_vert</md-icon>
              </md-button>
              <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="menu-lower-left">
                <li class="mdl-menu__item"><a href="#!/configuracion">Configuración</a></li>
                <li class="mdl-menu__item"><a href="login/exit.php">Salir</a></li>
              </ul>
            </div>
          </div>
        </md-toolbar>
        <md-content layout="row" flex>  
          <md-sidenav style="max-width:275px;" layout="column" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')"  flex>
            <md-content layout="column" ng-controller="menuController">
              <img src="images/menu.png">
              <md-list-item ng-href="#!{{item.url}}" ng-repeat="item in menuList">
                  <p>{{item.name}}</p>
                  <md-icon class="md-grem">{{item.icon}}</md-icon>
              </md-list-item>
            </md-content>
          </md-sidenav>
          <md-content flex class="md-padding" ng-view></md-content>
        </md-content>
      </div>      
      <script type="text/javascript">
        window.jQuery || document.write("<script src='dist/js/jquery.min.js'>" + "<" + "/script>");
      </script>

      <script type="text/javascript">
          if ('ontouchstart' in document.documentElement) document.write("<script src='dist/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
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