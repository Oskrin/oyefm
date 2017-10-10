angular.module('scotchApp').controller('mainController', function ($scope, $route, $interval, $localStorage, $anchorScroll, $location, $timeout) {
	$scope.$route = $route;

    $( "#open-event" ).tooltip({
        show: null,
        position: {
            my: "left top",
            at: "left bottom"
        },
        open: function( event, ui ) {
            ui.tooltip.animate({ top: ui.tooltip.position().top + 10 }, "fast" );
        }
    });


    // window.onbeforeunload = confirmExit;

	// function confirmExit() {
	//     $.ajax({
	// 	    url: "login/exit.php",
	// 	      success: function() {
	//       	}  
	//     });
 //  	}

    // $("#addClass").click(function () {
    //     $('#sidebar_secondary').addClass('popup-box-on');
    // });

    // funcion sesion
    function session() {
        $.ajax({
            type: "POST",
            url: "data/home/app.php",
            data: {session:'session'},
            dataType: 'json',
            async: false,
            success: function(data) {
                $localStorage.session = data;
                $scope.id_sesion = data.id_sesion;
                $scope.imagen_logo = data.imagen;
            }
        });
    }
    // fin

    session();
  
    $("#removeClass").click(function () {
        $('#sidebar_secondary').removeClass('popup-box-on');
    });

    // funcion enter
    $scope.myFunction = function(keyEvent) {
      if (keyEvent.which === 13)
        save_chat();
    }
    // fin

    // // guardar chat
    // function save_chat() {
    //     if ($('#submit_message').val() == '') {
    //         $('#submit_message').focus();   
    //     } else {
    //         // $scope.datos = {fecha_creacion: '2012', id:'4044040404004', id_usuario: $scope.id_sesion, imagen: $scope.imagen_logo, texto: $('#submit_message').val(), tipo_mensaje: "SEND", visto: "FALSE"}; 
    //         $.ajax({
    //             type: "POST",
    //             url: "data/home/app.php",
    //             data: {guardar_chat:'guardar_chat', id: $localStorage.datos_mensajes.id_chat, mensaje: $('#submit_message').val()},
    //             dataType: 'json',
    //             async: false,
    //             success: function(data) {
    //                 $socket.emit('chat:jointo', {id_chat:$localStorage.datos_mensajes.id_chat, id_sesion:$scope.id_sesion});
    //                 $scope.datos = {fecha_creacion: data.fecha_creacion, id:data.id, id_usuario: $scope.id_sesion, imagen: $scope.imagen_logo, texto: data.mensaje, tipo_mensaje: "SEND", visto: "FALSE"}; 
    //                 $scope.mensajes.push($scope.datos);
    //                 $socket.emit('chat:sendMensaje', $scope.datos);
                    
    //                 $('#submit_message').val('');
    //                 $scope.scroll_buttom_chat();
    //             }
    //         });    
    //     }
    // }
    // // fin

    // // funcion guardar chat 
    // $scope.add = function (event) {
    //     save_chat(); 
    // }
    // // fin

    // // socket
    // $socket.on('chat:updatelista', function (data) {
    //     if (data.id_usuario != $scope.id_sesion) {
    //         data.tipo_mensaje = 'RECIBIDO'; 
    //     }
    //     $scope.mensajes.push(data);
    //     $scope.scroll_buttom_chat();
    //     return false;
    // });
    // // fin

    // // scroll final
    // $scope.scroll_buttom_chat = function() {
    //     $timeout(function() {
    //       var scroller = document.getElementById("chat");
    //       scroller.scrollTop = scroller.scrollHeight;
    //     }, 0, false);
    // }
    // // fin

    // // evento abrir chat
    // $scope.open_chat = function (data, event) {
    //     $scope.scroll_buttom_chat();
    //     $scope.datos_chat = data;
    //     $scope.mensajes = [];
    //     $('#submit_message').val('');
    //     $('#sidebar_secondary').addClass('popup-box-on');

    //     $localStorage.datos_mensajes = $scope.datos_chat;

    //     $.ajax({
    //         type: "POST",
    //         url: "data/home/app.php",
    //         data: {consultar_chat:'consultar_chat', id: data.id},
    //         async: false,
    //         success: function(data) {
    //             $localStorage.datos_mensajes.id_chat = data;

    //             $.ajax({
    //                 type: "POST",
    //                 url: "data/home/app.php",
    //                 data: {consultar_mensajes:'consultar_mensajes', id: data},
    //                 dataType: 'json',
    //                 async: false,
    //                 success: function(data) {
    //                     $scope.mensajes = data;
                        
    //                     for (var i = 0; i < $scope.mensajes.length; i++) {
    //                         if($scope.mensajes[i].id_usuario != $scope.id_sesion) {
    //                             $scope.mensajes[i].tipo_mensaje = 'RECIBIDO';
    //                         }
    //                     }  
    //                 }
    //             });               
    //         }
    //     });
    // }
    // // fin

    $('#sidebar2').insertBefore('.page-content');         
   
    $(document).on('settings.ace.two_menu', function(e, event_name, event_val) {
     if(event_name == 'sidebar_fixed') {
        if( $('#sidebar').hasClass('sidebar-fixed') ) {
            $('#sidebar2').addClass('sidebar-fixed');
            $('#navbar').addClass('h-navbar');
        }
         else {
            $('#sidebar2').removeClass('sidebar-fixed')
            $('#navbar').removeClass('h-navbar');
        }
    }

   }).triggerHandler('settings.ace.two_menu', ['sidebar_fixed' ,$('#sidebar').hasClass('sidebar-fixed')]);

	// $interval(callAtInterval, 3000);
	// $scope.count = "0";
    callAtInterval();

	// funcion llamar conectados
    function callAtInterval() {
	    $.ajax({
            type: "POST",
            url: "data/home/app.php",
            data: {count_conectados:'count_conectados'},
            dataType: 'json',
            async: false,
            success: function(data) {
            	$scope.count = data.count;
            }
        });

        $.ajax({
            type: "POST",
            url: "data/home/app.php",
            data: {usuario_conectados:'usuario_conectados'},
            dataType: 'json',
            async: false,
            success: function(data) {
            	$scope.datos = data;
            }
        });

        // $.ajax({
        //     type: "POST",
        //     url: "data/home/app.php",
        //     data: {consultar_id_chat:'consultar_id_chat'},
        //     dataType: 'json',
        //     async: false,
        //     success: function(data) {
        //         // console.log(data);
        //         $socket.emit('chat:join', data);
        //     }
        // });
	}
    // fin
});
