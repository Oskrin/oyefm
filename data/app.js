var dcapp = angular.module('scotchApp', ['ngRoute','ngResource','ngStorage','ngImgCrop']);

// configure our routes
dcapp.config(function($routeProvider) {
    $routeProvider
        // route page initial
        .when('/', {
            templateUrl : 'data/home/app.html',
            controller  : 'mainController',
            activetab: 'inicio'
        })
        // route menu_empresas
        .when('/menu_parametros', {
            templateUrl : 'data/menu_parametros/app.html',
            controller  : 'menu_parametrosController',
            activetab: 'menu_parametros'
        })
        // route menu_empresas
        .when('/menu_empresas', {
            templateUrl : 'data/menu_empresas/app.html',
            controller  : 'menu_empresasController',
            activetab: 'menu_empresas'
        })
        // route menu_cargos
        .when('/menu_cargos', {
            templateUrl : 'data/menu_cargos/app.html',
            controller  : 'menu_cargosController',
            activetab: 'menu_cargos'
        })
        // route menu_corporativo
        .when('/menu_corporativo', {
            templateUrl : 'data/menu_corporativo/app.html',
            controller  : 'menu_corporativoController',
            activetab: 'menu_corporativo'
        })
        // route menu_corporativo
        .when('/menu_ventas', {
            templateUrl : 'data/menu_ventas/app.html',
            controller  : 'menu_ventasController',
            activetab: 'menu_ventas'
        })
        // route menu_clientes
        .when('/menu_clientes', {
            templateUrl : 'data/menu_clientes/app.html',
            controller  : 'menu_clientesController',
            activetab: 'menu_clientes'
        })
        // route menu_empleados
        .when('/menu_empleados', {
            templateUrl : 'data/menu_empleados/app.html',
            controller  : 'menu_empleadosController',
            activetab: 'menu_empleados'
        })
        // route menu_invitados
        .when('/menu_invitados', {
            templateUrl : 'data/menu_invitados/app.html',
            controller  : 'menu_invitadosController',
            activetab: 'menu_invitados'
        })
        // route menu_programas
        .when('/menu_programas', {
            templateUrl : 'data/menu_programas/app.html',
            controller  : 'menu_programasController',
            activetab: 'menu_programas'
        })
        // route menu_creditos
        .when('/menu_creditos', {
            templateUrl : 'data/menu_creditos/app.html',
            controller  : 'menu_creditosController',
            activetab: 'menu_creditos'
        })
        // route menu_nomina
        .when('/menu_nomina', {
            templateUrl : 'data/menu_nomina/app.html',
            controller  : 'menu_nominaController',
            activetab: 'menu_nomina'
        })
        // route menu_rol_pagos
        .when('/menu_rol_pagos', {
            templateUrl : 'data/menu_rol_pagos/app.html',
            controller  : 'menu_rol_pagosController',
            activetab: 'menu_rol_pagos'
        })
        // route menu_ordenes
        .when('/menu_ordenes', {
            templateUrl : 'data/menu_ordenes/app.html',
            controller  : 'menu_ordenesController',
            activetab: 'menu_ordenes'
        })
        // route menu_agenda
        .when('/menu_agenda', {
            templateUrl : 'data/menu_agenda/app.html',
            controller  : 'menu_agendaController',
            activetab: 'menu_agenda'
        })
        // route menu_pagos
        .when('/menu_pagos', {
            templateUrl : 'data/menu_pagos/app.html',
            controller  : 'menu_pagosController',
            activetab: 'menu_pagos'
        })
        // route menu_usuarios
        .when('/menu_usuarios', {
            templateUrl : 'data/menu_usuarios/app.html',
            controller  : 'menu_usuariosController',
            activetab: 'menu_usuarios'
        })

        // route menu_reportes
        .when('/menu_reportes', {
            templateUrl : 'data/menu_reportes/app.html',
            controller  : 'menu_reportesController',
            activetab: 'menu_reportes'
        })
        // route presentacion
        .when('/presentacion', {
            templateUrl : 'data/presentacion/app.html',
            controller  : 'presentacionController',
            activetab: 'presentacion'
        })
        // route quienes somos
        .when('/quienes_somos', {
            templateUrl : 'data/quienes_somos/app.html',
            controller  : 'quienes_somosController',
            activetab: 'quienes_somos'
        })
        // route mision vision 
        .when('/mision_vision', {
            templateUrl : 'data/mision_vision/app.html',
            controller  : 'mision_visionController',
            activetab: 'mision_vision'
        })
        // route politicas
        .when('/politicas', {
            templateUrl : 'data/politicas/app.html',
            controller  : 'politicasController',
            activetab: 'politicas'
        })
        // route reglamento
        .when('/reglamento', {
            templateUrl : 'data/reglamento/app.html',
            controller  : 'reglamentoController',
            activetab: 'reglamento'
        })
        // route funciones
        .when('/funciones', {
            templateUrl : 'data/funciones/app.html',
            controller  : 'funcionesController',
            activetab: 'funciones'
        })
        // route precios
        .when('/precios', {
            templateUrl : 'data/precios/app.html',
            controller  : 'preciosController',
            activetab: 'precios'
        })
        // route calendario
        .when('/calendario', {
            templateUrl : 'data/calendario/app.html',
            controller  : 'calendarioController',
            activetab: 'calendario'
        })
        // route calendario
        .when('/galeria', {
            templateUrl : 'data/galeria/app.html',
            controller  : 'galeriaController',
            activetab: 'galeria'
        })
        // route menu_empresas
        .when('/facturero', {
            templateUrl : 'data/facturero/app.html',
            controller  : 'factureroController',
            activetab: 'facturero'
        })
        // route tipo paquetes
        .when('/tipo_paquetes', {
            templateUrl : 'data/tipo_paquetes/app.html',
            controller  : 'tipo_paquetesController',
            activetab: 'tipo_paquetes'
        })
        // route paquetes
        .when('/paquetes', {
            templateUrl : 'data/paquetes/app.html',
            controller  : 'paquetesController',
            activetab: 'paquetes'
        })
        // route tipo programas
        .when('/tipo_programa', {
            templateUrl : 'data/tipo_programa/app.html',
            controller  : 'tipo_programaController',
            activetab: 'tipo_programa'
        })
        // route tipo vendedores
        .when('/tipo_vendedor', {
            templateUrl : 'data/tipo_vendedor/app.html',
            controller  : 'tipo_vendedoresController',
            activetab: 'tipo_vendedor'
        })
        // route tipo contrato
        .when('/tipo_contrato', {
            templateUrl : 'data/tipo_contrato/app.html',
            controller  : 'tipo_contratoController',
            activetab: 'tipo_contrato'
        })
        // route tipo contrato personal
        .when('/tipo_contrato_personal', {
            templateUrl : 'data/tipo_contrato_personal/app.html',
            controller  : 'tipo_contrato_personalController',
            activetab: 'tipo_contrato_personal'
        })
        // route areas
        .when('/areas', {
            templateUrl : 'data/areas/app.html',
            controller  : 'areasController',
            activetab: 'areas'
        })
        // route cargos
        .when('/cargos', {
            templateUrl : 'data/cargos/app.html',
            controller  : 'cargosController',
            activetab: 'cargos'
        })
        // route bancos
        .when('/bancos', {
            templateUrl : 'data/bancos/app.html',
            controller  : 'bancosController',
            activetab: 'bancos'
        })
        // route empresa
        .when('/empresa', {
            templateUrl : 'data/empresa/app.html',
            controller  : 'empresaController',
            activetab: 'empresa'
        })
        // route vendedores
        .when('/vendedores', {
            templateUrl : 'data/vendedores/app.html',
            controller  : 'vendedoresController',
            activetab: 'vendedores'
        })
        // route porcentaje
        .when('/porcentaje', {
            templateUrl : 'data/porcentaje/app.html',
            controller  : 'porcentajeController',
            activetab: 'porcentaje'
        })
        // proceso creditos
        .when('/creditos', {
            templateUrl : 'data/creditos/app.html',
            controller  : 'creditosController',
            activetab: 'creditos'
        })
        // route clientes
        .when('/clientes', {
            templateUrl : 'data/clientes/app.html',
            controller  : 'clientesController',
            activetab: 'clientes'
        })
        // route fotos_clientes
        .when('/fotos_clientes', {
            templateUrl : 'data/fotos_clientes/app.html',
            controller  : 'fotos_clientesController',
            activetab: 'fotos_clientes'
        })
        // route orden_trabajo
        .when('/orden_trabajo', {
            templateUrl : 'data/orden_trabajo/app.html',
            controller  : 'orden_trabajoController',
            activetab: 'orden_trabajo'
        })
        // proceso anticipos
        .when('/orden_pedido', {
            templateUrl : 'data/orden_pedido/app.html',
            controller  : 'orden_pedidoController',
            activetab: 'orden_pedido'
        })
        // route vendedores
        .when('/programas', {
            templateUrl : 'data/programas/app.html',
            controller  : 'programasController',
            activetab: 'programas'
        })
          // route login
        .when('/login', {
            templateUrl : 'data/login/app.html',
            controller  : 'loginController',
            activetab: 'login'
        })
        // proceso ficha ingresos
        .when('/ficha_ingresos', {
            templateUrl : 'data/ficha_ingresos/app.html',
            controller  : 'fichaingresosController',
            activetab: 'ficha_ingresos'
        })
        // proceso fotos personal
        .when('/fotos_personal', {
            templateUrl : 'data/fotos_personal/app.html',
            controller  : 'fotos_personalController',
            activetab: 'fotos_personal'
        })
        // proceso contratos personal
        .when('/contratos_personal', {
            templateUrl : 'data/contratos_personal/app.html',
            controller  : 'contratos_personalController',
            activetab: 'contratos_personal'
        })
        // proceso ficha invitados
        .when('/ficha_invitados', {
            templateUrl : 'data/ficha_invitados/app.html',
            controller  : 'ficha_invitadosController',
            activetab: 'ficha_invitados'
        })
        // proceso ficha invitados
        .when('/invitados', {
            templateUrl : 'data/invitados/app.html',
            controller  : 'invitadosController',
            activetab: 'invitados'
        })
        // route fotos_invitados
        .when('/fotos_invitados', {
            templateUrl : 'data/fotos_invitados/app.html',
            controller  : 'fotos_invitadosController',
            activetab: 'fotos_invitados'
        })
        // proceso ficha programas
        .when('/ficha_programas', {
            templateUrl : 'data/ficha_programas/app.html',
            controller  : 'ficha_programasController',
            activetab: 'ficha_programas'
        })
        // proceso permisos
        .when('/permisos', {
            templateUrl : 'data/permisos/app.html',
            controller  : 'permisosController',
            activetab: 'permisos'
        })
        // proceso anticipos
        .when('/anticipos', {
            templateUrl : 'data/anticipos/app.html',
            controller  : 'anticiposController',
            activetab: 'anticipos'
        })
        // proceso tipo multas
        .when('/tipo_multas', {
            templateUrl : 'data/tipo_multas/app.html',
            controller  : 'tipo_multasController',
            activetab: 'tipo_multas'
        })
        // proceso tipo servicio
        .when('/tipo_servicio', {
            templateUrl : 'data/tipo_servicio/app.html',
            controller  : 'tipo_servicioController',
            activetab: 'tipo_servicio'
        })
        // proceso multas
        .when('/multas', {
            templateUrl : 'data/multas/app.html',
            controller  : 'multasController',
            activetab: 'multas'
        })
        // proceso roles de pago
        .when('/nomina', {
            templateUrl : 'data/nomina/app.html',
            controller  : 'nominaController',
            activetab: 'nomina'
        })
        // proceso generar roles
        .when('/listado_nomina', {
            templateUrl : 'data/listado_nomina/app.html',
            controller  : 'listado_nominaController',
            activetab: 'listado_nomina'
        })
        // proceso generar roles
        .when('/generar', {
            templateUrl : 'data/generar/app.html',
            controller  : 'generarController',
            activetab: 'generar'
        })
        // proceso roles de pago
        .when('/rol_pagos', {
            templateUrl : 'data/rol_pagos/app.html',
            controller  : 'rolpagosController',
            activetab: 'rol_pagos'
        })
        // route aprobacion
        .when('/aprobacion', {
            templateUrl : 'data/aprobacion/app.html',
            controller  : 'aprobacionController',
            activetab: 'aprobacion'
        })
        // proceso contratos selectivos
        .when('/contratos_selectivos', {
            templateUrl : 'data/contratos_selectivos/app.html',
            controller  : 'contratos_selectivosController',
            activetab: 'contratos_selectivos'
        })
        // proceso contratos rotativos
        .when('/contratos_rotativos', {
            templateUrl : 'data/contratos_rotativos/app.html',
            controller  : 'contratos_rotativosController',
            activetab: 'contratos_rotativos'
        })
        // proceso cartera
        .when('/cuentas_cobrar', {
            templateUrl : 'data/cuentas_cobrar/app.html',
            controller  : 'cuentas_cobrarController',
            activetab: 'cuentas_cobrar'
        })
        // proceso cartera
        .when('/cartera', {
            templateUrl : 'data/cartera/app.html',
            controller  : 'carteraController',
            activetab: 'cartera'
        })
        // proceso facturas
        .when('/facturas', {
            templateUrl : 'data/facturas/app.html',
            controller  : 'facturasController',
            activetab: 'facturas'
        })
        // route agenda
        .when('/agenda', {
            templateUrl : 'data/agenda/app.html',
            controller  : 'agendaController',
            activetab: 'agenda'
        })
        // route pagos
        .when('/pagos', {
            templateUrl : 'data/pagos/app.html',
            controller  : 'pagosController',
            activetab: 'pagos'
        })
        // route pagos
        .when('/pagos', {
            templateUrl : 'data/pagos/app.html',
            controller  : 'pagosController',
            activetab: 'pagos'
        })
        // route conciliacion
        .when('/conciliacion', {
            templateUrl : 'data/conciliacion/app.html',
            controller  : 'conciliacionController',
            activetab: 'conciliacion'
        })
        // route usuarios
        .when('/usuarios', {
            templateUrl : 'data/usuarios/app.html',
            controller  : 'usuariosController',
            activetab: 'usuarios'
        })
        // route imagenes
        .when('/fotos_usuario', {
            templateUrl : 'data/fotos_usuario/app.html',
            controller  : 'fotos_usuarioController',
            activetab: 'fotos_usuario'
        })
        // route perfiles
        .when('/perfiles', {
            templateUrl : 'data/perfiles/app.html',
            controller  : 'perfilesController',
            activetab: 'perfiles'
        })
        // proceso privilegios
        .when('/privilegios', {
            templateUrl : 'data/privilegios/app.html',
            controller  : 'privilegiosController',
            activetab: 'privilegios'
        })
        // proceso privilegios
        .when('/configuracion', {
            templateUrl : 'data/configuracion/app.html',
            controller  : 'configuracionController',
            activetab: 'configuracion'
        })
});

dcapp.factory('Auth', function($location) {
    var user;
    return {
        setUser : function(aUser) {
            user = aUser;
        },
        isLoggedIn : function() {
            var ruta = $location.path();
            var ruta = ruta.replace("/","");
            var accesos = JSON.parse(Lockr.get('users'));
                accesos.push('inicio');
                accesos.push('');

            var a = accesos.lastIndexOf(ruta);
            if (a < 0) {
                return false;    
            } else {
                return true;
            }
        }
    }
});


dcapp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        var rutablock = $location.path();
        if (!Auth.isLoggedIn()) {
            event.preventDefault();
            swal({
                title: "Lo sentimos acceso denegado",
                type: "warning",
            });
        } else { }
    });
}]);

// consumir servicios sri
dcapp.factory('loaddatosSRI', function($resource) {
    return $resource("http://186.4.167.12/appserviciosnext/public/index.php/getDatos/:id", {
        id: "@id"
    });
});
// fin

// consumir servicios sri
dcapp.factory('GenerarContrato', function($resource) {
    return $resource("http://186.4.167.12/api-admin-oyefm/public/index.php/Generar_Contrato_PDF", {
        id: "@id"
    });
});
// fin


