var dcapp = angular.module('scotchApp', ['ngRoute','ngResource']);

// configure our routes
dcapp.config(function($routeProvider) {
    $routeProvider
        // route page initial
        .when('/', {
            templateUrl : 'data/home/app.html',
            controller  : 'mainController',
            activetab: 'inicio'
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
        // proceso ficha invitados
        .when('/ficha_invitados', {
            templateUrl : 'data/ficha_invitados/app.html',
            controller  : 'invitadosController',
            activetab: 'ficha_invitados'
        })
        // proceso ficha programas
        .when('/ficha_programas', {
            templateUrl : 'data/ficha_programas/app.html',
            controller  : 'ficha_programasController',
            activetab: 'ficha_programas'
        })
        // proceso roles de pago
        .when('/rol_pagos', {
            templateUrl : 'data/rol_pagos/app.html',
            controller  : 'rolpagosController',
            activetab: 'rol_pagos'
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
    return $resource("http://apiservicios.nextbook.ec/public/getDatos/:id", {
        id: "@id"
    });
});
// fin
