let app = angular.module('loginApp', ['ngMaterial'])

app.controller('AppCtrl', function($scope, $location, $timeout, $interval, $window) {
  $scope.max = 2;
  $scope.selectedIndex = 0;
  $scope.nextTab = function() {
    var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
    $scope.selectedIndex = index;

  };
  
  jQuery(function($) {
    $scope.myFunction = function() {
      $.ajax({
        url:'login.php',
        type:'POST',
        dataType:'json',
        data:{consultar_login_user:'',txt_nombre:$('#txt_nombre').val(),txt_clave:$('#txt_clave').val()},
        success:function(data) {
            if (data['status'] == 'ok') {
                $.blockUI({ css: { 
                    border: 'none', 
                    padding: '10px',
                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: 0.5, 
                    color: '#fff' 
                    },
                    message: '<h4><img style="width:100px;border-radius: 50%;" src="../data/fotos_usuario/imagenes/'+data['imagen']+'" />     BIENVENIDO: <span>'+data['name']+'</h4>',
                });
                $interval(function() {
                    $.unblockUI();
                    Lockr.set('users', data['privilegio']);
                    $window.location = '../#/'; 
                }, 2000);
            } else{
                if (data['status'] == 'error') {
                    $.blockUI({ css: { 
                        border: 'none', 
                        padding: '10px',
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: 0.5, 
                        color: '#fff' 
                        },
                        message: '<h4><img style="width:100px;border-radius: 50%;" src="../data/fotos_usuario/imagenes/error.jpg" />     DATOS INCORRECTOS</h4>',
                    });
                    $interval(function() {  
                        $.unblockUI();
                    }, 1000);
                }    
            }
          // Lockr.flush()
          // if (data['status'] == 'ok') {
          //   $.gritter.add({
          //     title: 'Información Mensaje',
          //     text: ' <span class="fa fa-shield"></span>'
          //           +' Bienvenido: <span class="text-success">'+$('#txt_nombre').val().toUpperCase()
          //         +'</span><br><span class="fa fa-paw"></span> Dame unos segundos para acceder a la aplicación <span class="text-succes fa fa-spinner fa-spin"></span>'
          //         ,
          //     image: '../dist/avatars/avatar1.png', //in Ace demo dist will be replaced by correct assets path
          //     sticky: false,
          //     time: 3000,                       
          //   });   
          //   Lockr.set('users', data['privilegio']);
          //   redireccionar();
          // };
          // if (data['status'] == 'error') {
          //   $.gritter.add({
          //     title: '<span>Información Mensaje</span>',
          //     text: ' <span class="fa fa-shield"></span>'
          //           +' <span class="text-danger">Su usuario o contraseña son incorrectos</span>'
          //         +'<span class="fa fa-ban fa-stack-2x text-danger"></span>',
          //     image: '../dist/avatars/avatar1.png', //in Ace demo dist will be replaced by correct assets path
          //     sticky: false,
          //     time: 3000,                       
          //   }); 
          //   //Limpiar formulario
          //   $('#form_proceso').each (function(){
          //     this.reset();
          //   });
          // };
          // if (data['status'] != 'ok' && data['status'] != 'error') {
          //   $.gritter.add({
          //     title: '<span>Información Mensaje</span>',
          //     text: ' <span class="fa fa-shield"></span>'
          //           +' <span class="text-danger">ERROR PROCESO AUTENTIFICACIÓN<BR></span>'
          //         +'<span class="fa fa-ban fa-stack-2x text-danger"></span>',
          //     image: '../dist/avatars/avatar1.png', //in Ace demo dist will be replaced by correct assets path
          //     sticky: false,
          //     time: 3000,                       
          //   }); 
          // };
        }
      });
    }
  });
 

  // $('#btn_ingresar').on("click", function(){
  //   console.log('test');
  // });

 


});