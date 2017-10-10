var app = angular.module('scotchApp').controller('ficha_invitadosController', function ($scope) {
    jQuery(function($) {
    $('#archivos').fileinput({
        uploadUrl: '#',
        uploadAsync: false,
        minFileCount: 1,
        maxFileCount: 20,
        showUpload: true,
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });

	$('[data-rel=tooltip]').tooltip();
	var $validation = true;
	$('#fuelux-wizard-container').ace_wizard({
		//step: 2 //optional argument. wizard will jump to step "2" at first
		//buttons: '.wizard-actions:eq(0)'
	})
	.on('actionclicked.fu.wizard' , function(e, info) {
		if(info.step == 1 && $validation) {
			if(!$('#form_proceso1').valid()) e.preventDefault();
		}
		if(info.step == 2 && $validation) {
			if(!$('#form_proceso2').valid()) e.preventDefault();
		}
		if(info.step == 3 && $validation) {
			if(!$('#form_proceso3').valid()) e.preventDefault();
		}
	})
	.on('finished.fu.wizard', function(e) {
		proceso_guardar();
	}).on('stepclick.fu.wizard', function(e) {
		//e.preventDefault();//this will prevent clicking and selecting steps
	});
	// formulario registro de la primera: PreEntrevista
	// $('#form_proceso1').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		inp_aceptado: {
	// 			required: true				
	// 		},
	// 		txt_invitado: {
	// 			required: true				
	// 		},
	// 		txt_contacto: {
	// 			required: true				
	// 		},
	// 		txt_empresa: {
	// 			required: true				
	// 		},
	// 		txt_principal: {
	// 			required: true				
	// 		},
	// 		txt_secundario: {
	// 			required: true				
	// 		},
	// 	},
	// 	messages: {
	// 		inp_aceptado: {
	// 			required: "Por favor, Seleccione una opción",
	// 		},
	// 		txt_invitado: {
	// 			required: "Por favor, Necesita un Nombre de Invitado",
	// 		},
	// 		txt_contacto: {
	// 			required: "Por favor, Necesita un Contacto",
	// 		},
	// 		txt_empresa: {
	// 			required: "Por favor, Necesita un Nombre de Empresa",
	// 		},
	// 		txt_principal: {
	// 			required: "Por favor, Necesita un Tema Principal",
	// 		},
	// 		txt_secundario: {
	// 			required: "Por favor, Necesita un Tema Secundario",
	// 		},
	// 		txt_email: {
	// 			required: "Por favor, Ingrese un E-mail",
	// 			email: "Por favor, Ingrese un E-mail Valido",
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
	// 		$.ajax({
	// 			url: 'data/invitados/app.php',
	// 			type: 'post',
	// 			data: $(form).serialize(),
	// 			dataType:"json",
	// 			success: function (data) {
	// 				if (data['valid'] == "true") {
	// 					$.gritter.add({
	// 						title: 'Proceso Guardado Correctamente',
	// 						text: 'Sus Datos han sido guardados de forma Correcta',
	// 						class_name: 'gritter-success',
	// 						time:2000
	// 					});	
	// 				} else {
	// 					$.gritter.add({
	// 						title: 'Proceso No Guardado',
	// 						text: 'Porvafor Verifique que sus Datos esten llenos',
	// 						class_name: 'gritter-error',
	// 						time:2000
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}
	// });
	// FIN DEL FORMULARIO DE PreEntrevista

	// formulario registro de la segunda: Entrevista
	// $('#form_proceso2').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		txt_pregunta1: {
	// 			required: true				
	// 		},
	// 		txt_director: {
	// 			required: true				
	// 		},
	// 		txt_conduccion: {
	// 			required: true				
	// 		},
	// 		txt_video: {
	// 	      url: true
	// 	    }
	// 	},
	// 	messages: {
	// 		txt_pregunta1: {
	// 			required: "Por favor, Almenos debe tener una pregunta",
	// 		},
	// 		txt_director: { 	
	// 			required: "Por favor, Digíte un Nombre"			
	// 		},
	// 		txt_conduccion: { 	
	// 			required: "Por favor, Digíte un Nombre"			
	// 		},
	// 		txt_video: { 	
	// 			required: "Por favor, Ingrese una url correcta"			
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
	// 		$.ajax({
	// 			url: 'data/invitados/app.php',
	// 			type: 'post',
	// 			data: $(form).serialize(),
	// 			dataType:"json",
	// 			success: function (data) {
	// 				if (data['valid']=="true") {
	// 					$.gritter.add({
	// 						title: 'Proceso Guardado Correctamente',
	// 						text: 'Sus Datos han sido guardados de forma Correcta',
	// 						class_name: 'gritter-success',
	// 						time:2000
	// 					});	
	// 				}else{
	// 					$.gritter.add({
	// 						title: 'Proceso No Guardado',
	// 						text: 'Porvafor Verifique que sus Datos esten llenos',
	// 						class_name: 'gritter-error',
	// 						time:2000
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}
	// });
	// FIN DEL FORMULARIO DE Entrevista

	// formulario registro de la tercera: Post-Entrevista
	// $('#form_proceso3').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		txt_video: {
	// 	      url: true
	// 	    }
	// 	},
	// 	messages: {
	// 		txt_video: {
	// 			required: "Por favor, Ingrese una url correcta",
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
	// 		$.ajax({
	// 			url: 'data/invitados/app.php',
	// 			type: 'post',
	// 			data: $(form).serialize(),
	// 			dataType:"json",
	// 			success: function (data) {
	// 				if (data['valid'] == "true") {
	// 					$.gritter.add({
	// 						title: 'Proceso Guardado Correctamente',
	// 						text: 'Sus Datos han sido guardados de forma Correcta',
	// 						class_name: 'gritter-success',
	// 						time:2000
	// 					});	
	// 				} else {
	// 					$.gritter.add({
	// 						title: 'Proceso No Guardado',
	// 						text: 'Porvafor Verifique que sus Datos esten llenos',
	// 						class_name: 'gritter-error',
	// 						time:2000
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}
	// });
	// FIN DEL FORMULARIO DE Entrevista
	    
	//definir formato campos números de teléfono
	$('#txt_telf, #txt_telf2, #txt_telf3').mask('(999) 999-9999');
	//el boton para seleccionar el programa y poder generar la Ficha Activa
	$('#btn_nuevo_ficha').click(function() {
		$('#modal-nuevo-fichas').modal('show');
	});

	$("#select_programas").css({
	    	'width':'100%',
	    	'text-align':'left',
	    }).select2().on("change", function(e) {
		$.ajax({
			url: 'data/ficha_invitados/app.php',
			type: 'post',
			dataType:'json',
			data: {consultar_datos_programas:'asjkef', id:e.val},
			success: function (data) {
				// console.log(data.codigo);
			}
		});
    });

	// cargar programas
	$("#select_programas").select2({
		placeholder: "Seleccione una opción",
		allowClear: true
	});
	// fin

	// modal fichas de ingreso invitados
	function abrir_buscador() {
		$('#myModal').modal('show');
	}
	// fin

	/////////////proceso de guardar//////
	// $( "#btn_guardar" ).click(function() {
	// 	proceso_guardar();
	// });

	$scope.methodsedit = function(id) { 
	// cargar datos invitados
	$.ajax({
		url: 'data/ficha_invitados/app.php',
		type: 'post',
		data: {llenar_datos_invitados:'llenar_datos_invitados', id:id},
		dataType: 'json',
		success: function (data) {
			var tama = data.length;
			for (var i = 0; i < tama; i = i + 12) {
				$("#txt_invitado").val(data[i]);
				$("#txt_contacto").val(data[i + 1]);
				$("#txt_empresa").val(data[i + 2]);
				$("#txt_telf").val(data[i + 3]);
				$("#txt_telf2").val(data[i + 4]);
				$("#txt_telf3").val(data[i + 5]);
				$("#txt_direccion").val(data[i + 6]);
				$("#txt_email").val(data[i + 7]);
				$("#txt_principal").val(data[i + 8]);
				$("#txt_secundario").val(data[i + 9]);
				$("#txt_nombre1").val(data[i + 10]);
				$("#txt_nombre2").val(data[i + 11]);
			}	
		}
	});
	// fin

	// cargar datos adicionales
	$.ajax({
		url: 'data/ficha_invitados/app.php',
		type: 'post',
		data: {llenar_datos_adicionales:'llenar_datos_adicionales', id:id},
		dataType: 'json',
		success: function (data) {
			var tama = data.length;
			for (var i = 0; i < tama; i = i + 13) {
				$("#txt_pregunta1").val(data[i]);
				$("#txt_pregunta2").val(data[i + 1]);
				$("#txt_pregunta3").val(data[i + 2]);
				$("#txt_pregunta4").val(data[i + 3]);
				$("#txt_pregunta5").val(data[i + 4]);
				$("#txt_pregunta6").val(data[i + 5]);
				$("#txt_hora_llegada").val(data[i + 6]);
				$("#txt_tiempo").val(data[i + 7]);
				$("#txt_nombre_director").val(data[i + 8]);
				$("#txt_nombre_conduccion").val(data[i + 9]);
				if(data[i + 10] == '1') {
					document.getElementById("rb_buena").checked = true
				} else {
					document.getElementById("rb_buena").checked = false
				}
				$("#txta_sugerencia").val(data[i + 11]);
				$("#observaciones").val(data[i + 12]);
			}	
		}
	});
	// fin

	// cargar datos archivos
	$.ajax({
		url: 'data/ficha_invitados/app.php',
		type: 'post',
		data: {cargar_imagenes:'cargar_imagenes', id:id},
		dataType: 'json',
		success: function (data) {
			var tama = data.length;
			for (var i = 0; i < tama; i = i + 1) {
				document.getElementById("archivos").innerHTML = ['<img class="thumb" src="data/ficha_invitados/imagenes/', data[ + 1],'" title=""/>'].join('');
				// $('#archivos').fileinput(data[i])
				
				// $("#txt_invitado").val(data[i]);
				// $("#txt_contacto").val(data[i + 1]);
				// $("#txt_empresa").val(data[i + 2]);
				// $("#txt_telf").val(data[i + 3]);
				// $("#txt_telf2").val(data[i + 4]);
				// $("#txt_telf3").val(data[i + 5]);
				// $("#txt_direccion").val(data[i + 6]);
				// $("#txt_email").val(data[i + 7]);
				// $("#txt_principal").val(data[i + 8]);
				// $("#txt_secundario").val(data[i + 9]);
				// $("#txt_nombre1").val(data[i + 10]);
				// $("#txt_nombre2").val(data[i + 11]);
			}	
		}
	});
	// fin

	$("#btn_0").attr('data-last','Modificar');
	$('#myModal').modal('hide');
	}

	// llenar select ficchas
	llenar_select_programas();
	llenar_select_usuarios();
	llenar_tabla_fichas();
	llenar_tabla();
	cargar_id();
	init();

	//llenar_text();
	function init() {
		$("#select_usuarios, #select_usuarios2, #select_usuarios3, #select_usuarios4, #select_usuarios5").css({
	    	'width':'60%',
	    	'text-align':'left',
	    }).select2({allowClear:true})
			.on('change', function(){
			$(this).closest('form').validate().element($(this));
		});

		//para la fecha del calendario
		$("#txt_fecha, #txt_fecha2, #txt_fecha3").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true,
	        startDate: new Date()
		}).datepicker("setDate","today");

		// //para la hora prevista
		$("#txt_hora_invitado1, #txt_hora_invitado2, #txt_hora_invitado3, #txt_hora_invitado4, #txt_hora_invitado5, #txt_hora_invitado6, #txt_hora, #txt_hora2, #txt_hora3,#txt_hora_llegada ").datetimepicker({ 
	       pickDate: false
	    });
	}

	// id_ficha_invitados
	function cargar_id() {
		$.ajax({
			url: 'data/ficha_invitados/app.php',
			type: 'post',
			data: {id_ficha:'id_ficha'},
			success: function (data) {
				$('#txt_id_proceso1').val(data);
				$('#txt_id_proceso2').val(data);
				$('#txt_id_proceso3').val(data);
			}
		});
	}

	// llenar tablas de fichas
	function llenar_tabla_fichas() {
		$('#dynamic-table').dataTable().fnClearTable();

		$.ajax({
			url: 'data/ficha_invitados/app.php',
			type: 'post',
			data: {cargar_tabla_fichas:'cargar_tabla_fichas'},
			dataType: 'json',
			success: function(response) { 
				var tabla = $('#dynamic-tables').DataTable();
				for (var i = 0; i < response.length; i++) {
					var pdf = "<button type='button' class='btn btn-white btn-pink btn-sm'  onclick=\"angular.element(this).scope().methodspdf('"+response[i].id+"')\"><span class='fa fa-file-pdf-o pink'> PDF</button>";
					var editar = "<button type='button' class='btn btn-white btn-green btn-sm'  onclick=\"angular.element(this).scope().methodsedit('"+response[i].id+"')\"><span class='fa fa fa-pencil green'> EDITAR</button>";
					var acciones =  editar + ' ' + pdf;

					tabla.row.add([
			            response[i]['nom_invitado'],
			            response[i]['contacto'],
			            response[i]['inst_empresa'],
			            response[i]['ficha'],
			            acciones
	                ]).draw(false);                            
		        }
			}
		});
	}
	// fin

	// abrir buscador fichas de ingreso
	$('#abrir_buscador_invitados').click(function() {
		abrir_buscador();
	});
	// fin

	// estilo tabla dinamica
	function llenar_tabla() {
		$('#dynamic-tables').dataTable({
			language: {
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Mostrar _MENU_ registros",
			    "sZeroRecords":    "No se encontraron resultados",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
			    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar: ",
			    "sUrl":            "",
			    "sInfoThousands":  ",",
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    },
			    "oAria": {
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			    }
			}
		});
	}
	// fin

	// llenar programas
	function llenar_select_programas() {
		$.ajax({
			url: 'data/ficha_invitados/app.php',
			type: 'post',
			data: {llenar_programas:'llenar_programas'},
			success: function (data) {
				$('#select_programas').html(data);
			}
		});
	}
	// fin

	// llenar usuarios
	function llenar_select_usuarios() {
		$.ajax({
			url: 'data/ficha_invitados/app.php',
			type: 'post',
			data: {llenar_usuarios:'llenar_usuarios'},
			success: function (data) {
				$('#select_usuarios,#select_usuarios2,#select_usuarios3,#select_usuarios4,#select_usuarios5').html(data);
			}
		});
	}
	// fin	
		
	function proceso_guardar () {
	    var formObj1 = document.getElementById("form_proceso1");
	    var formObj2 = document.getElementById("form_proceso2");
	    var formObj3 = document.getElementById("form_proceso3");
	    var formData1 = new FormData(formObj1);
	    var formData2 = new FormData(formObj2); 
	    var formData3 = new FormData(formObj3);    

	    $.ajax({
	        url: "data/ficha_invitados/app1.php",
	        type: "POST",
	        data:  formData1,
	        mimeType:"multipart/form-data",
	        contentType: false,
	        cache: false,
	        processData:false,
	        success: function(data, textStatus, jqXHR) {
	        }	        
	    });

	    $.ajax({
	        url: "data/ficha_invitados/app2.php",
	        type: "POST",
	        data:  formData2,
	        mimeType:"multipart/form-data",
	        contentType: false,
	        cache: false,
	        processData:false,
	        success: function(data, textStatus, jqXHR) {
	        }	        
	    });

	    $.ajax({
	        url: "data/ficha_invitados/app3.php",
	        type: "POST",
	        data:  formData3,
	        mimeType:"multipart/form-data",
	        contentType: false,
	        cache: false,
	        processData:false,
	        success: function(data, textStatus, jqXHR) {
	        }	        
	    });		
	}

		$('#modal-wizard-container').ace_wizard();
		$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
		
		$(document).one('ajaxloadstart.page', function(e) {
			//in ajax mode, remove remaining elements before leaving page
			$('[class*=select2]').remove();
		});
	})
});	