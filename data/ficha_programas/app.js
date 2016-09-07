// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('ficha_programasController', function ($scope) {
    jQuery(function($) {

		$('[data-rel=tooltip]').tooltip();
		var $validation = true;
		$('#fuelux-wizard-container').ace_wizard({
			//step: 2 //optional argument. wizard will jump to step "2" at first
			//buttons: '.wizard-actions:eq(0)'
		})
		.on('actionclicked.fu.wizard' , function (e, info) {
			if(info.step == 1 && $validation) {
				if(!$('#form_etapa1').valid()) e.preventDefault();
			}
			if(info.step == 2 && $validation) {
				if(!$('#form_etapa2').valid()) e.preventDefault();
			}
			if(info.step == 3 && $validation) {
				if(!$('#form_etapa3').valid()) e.preventDefault();
			}
		})
		.on('finished.fu.wizard', function (e) {
			proceso_guardar();
			bootbox.dialog({
				message: "Gracias! Por su Información Datos Correctamente Guardados!", 
				buttons: {
					"success" : {
						"label" : "OK",
						"className" : "btn-sm btn-primary"
					}
				}
			});
		}).on('stepclick.fu.wizard', function (e) {
			//e.preventDefault();//this will prevent clicking and selecting steps
	});

	// formulario registro de la primera: Datos Personales
	$('#form_etapa1').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_diseño: {
				required: true				
			},
			txt_telf_fijo: {
				required: true				
			},
			txt_cedula: {
				required: true,
				digits: true, 
				maxlength: 10				
			},
			txt_telf_celular: {
				required: true				
			},
			txt_email: {
				required: true				
			},
			txt_direccion: {
				required: true				
			},
			txt_nom_pro1: {
				required: true
			},
			txt_tipo_pro: {
				required: true
			},
			txt_publico: {
				required: true
			},
			txt_tematica: {
				required: true
			},
			txt_tiempo_dise: {
				required: true
			},
		},
		messages: {
			txt_diseño: {
				required: "Por favor, Digíte un Diseño de Proyecto",
			},
			txt_telf_fijo: { 	
				required: "Por favor, Digíte un teléfono Fijo",			
			},
			txt_cedula: { 	
				required: "Por favor, Digíte el Número de Cédula",
				digits: "Sólo son permitido dígitos, Gracias",
				maxlength: "Por Favor, Ingrese los 10 dígitos del número de cédula"			
			},
			txt_telf_celular: {
				required: "Por favor, Digíte un telefono Celular",
			},
			txt_email: {
				required: "Por favor, Ingrese un E-mail",
				email: "Por favor, Ingrese un E-mail valido"
			},
			txt_direccion: {
				required: "Por favor, Digíte una Dirección Domiciliaria",
			},
			txt_nom_pro1: {
				required: "Por favor, Digíte almenos un nombre de programa",
			},
			txt_tipo_pro: {
				required: "Por favor, Digíte un Tipo de Programa",
			},
			txt_publico: {
				required: "Por favor, Digíte un Público Objetivo",
			},
			txt_tematica: {
				required: "Por favor, Digíte una Temática",
			},
			txt_tiempo_dise: {
				required: "Por favor, Digíte un Tiempo correspondiente",
			},
		},
		//para prender y apagar los errores
		highlight: function(e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			$.ajax({
				url: 'data/ficha_programas/app.php',
				type: 'post',
				data: $(form).serialize(),
				dataType:"json",
				success: function (data) {
					if (data['valid']=="true") {
						$.gritter.add({
							title: 'Proceso Guardado Correctamente',
							text: 'Sus Datos han sido guardados de forma Correcta',
							class_name: 'gritter-success',
							time:2000
						});	
					} else {
						$.gritter.add({
							title: 'Proceso No Guardado',
							text: 'Porvafor Verifique que sus Datos esten llenos',
							class_name: 'gritter-error',
							time:2000
						});
					}
				}
			});
		}
	});

	// FIN DEL FORMULARIO DE DATOS PERSONALES
	// formulario registro de la segunda: Datos Bancarios
	$('#form_etapa2').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			$.ajax({
				url: 'data/ficha_programas/app.php',
				type: 'post',
				data: $(form).serialize(),
				dataType:"json",
				success: function (data) {
					if (data['valid']=="true") {
						$.gritter.add({
							title: 'Proceso Guardado Correctamente',
							text: 'Sus Datos han sido guardados de forma Correcta',
							class_name: 'gritter-success',
							time:2000
						});	
					} else {
						$.gritter.add({
							title: 'Proceso No Guardado',
							text: 'Porvafor Verifique que sus Datos esten llenos',
							class_name: 'gritter-error',
							time:2000
						});
					}
				}
			});
		}
	});

	// FIN DEL FORMULARIO DE ETAPA2
	$('#form_etapa3').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			$.ajax({
				url: 'data/ficha_programas/app.php',
				type: 'post',
				data: $(form).serialize(),
				dataType:"json",
				success: function (data) {
					if (data['valid']=="true") {
						$.gritter.add({
							title: 'Proceso Guardado Correctamente',
							text: 'Sus Datos han sido guardados de forma Correcta',
							class_name: 'gritter-success',
							time:2000
						});	
					} else {
						$.gritter.add({
							title: 'Proceso No Guardado',
							text: 'Porvafor Verifique que sus Datos esten llenos',
							class_name: 'gritter-error',
							time:2000
						});
					}
				}
			});
		}
	});
	// FIN DEL FORMULARIO ETAPA 3

	// INICIO DE VALIDACION FORNULARIO MODAL EQUIPOS
	$('#form_modal_equipo').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_nombre_conf: {
				required: true				
			},
			txt_telf_conf: {
				required: true				
			},
			txt_email_conf: {
				required: true				
			},
			select_cargo_conf: {
				required: true				
			},
		},
		messages: {
			txt_nombre_conf: {
				required: "Por favor, Digíte un Nombre",
			},
			txt_telf_conf: { 	
				required: "Por favor, Digíte un teléfono",			
			},
			txt_email_conf: {
				required: "Por favor, Ingrese un E-mail",
				email: "Por favor, Ingrese un E-mail valido"
			},
			select_cargo_conf: {
				required: "Por favor, Elija un cargo",
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN DE VALIDACION FORMULARIO MODAL EQUIPOS

	// INICIO DE VALIDACION FORMULARIO MODAL GENERO MUSICAL
	$('#form_modal_genero').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			select_genero_musical: {
				required: true				
			},
			txt_porcentaje_modal: {
				required: true,
				min: 1,
				max: 100				
			},
		},
		messages: {
			select_genero_musical: {
				required: "Por favor, Elija un Género Musical",
			},
			txt_porcentaje_modal: { 	
				required: "Por favor, Digíte un Porcentaje Valido",	
				min: "Por favor, Digite un número valido que esta entre 1 y 100",
				max: "Por favor, Digite un número valido que esta entre 1 y 100",		
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE VALIDACION FORMULARIO MODAL TIPO DE PROGRAMACION
	$('#form_modal_programacion').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			select_tipo_programacion: {
				required: true				
			},
			txt_porcentaje_modal_pro: {
				required: true,
				min: 1,
				max: 100				
			},
		},
		messages: {
			select_tipo_programacion: {
				required: "Por favor, Elija un Tipo de Programación",
			},
			txt_porcentaje_modal_pro: { 	
				required: "Por favor, Digíte un Porcentaje Valido",	
				min: "Por favor, Digite un número valido que esta entre 1 y 100",
				max: "Por favor, Digite un número valido que esta entre 1 y 100",		
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN 

	// INICIO DE VALIDACION FORMULARIO MODAL HORA1
	$('#form_modal_1hora').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			inicio_hora_uno: {
				required: true				
			},
			fin_hora_uno: {
				required: true				
			},
			txt_actividad: {
				required: true
			},
			select_responsable_hora1: {
				required: true
			},
		},
		messages: {
			inicio_hora_uno: { 	
				required: "Por favor, Ingrese un inicio de hora",	
			},
			fin_hora_uno: { 	
				required: "Por favor, Ingrese un fin de hora",	
			},
			txt_actividad: { 	
				required: "Por favor, Ingrese la actividad",	
			},
			select_responsable_hora1: {
				required: "Por favor, Elija un Responsable",
			},
			
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE VALIDACION FORMULARIO MODAL HORA2
	$('#form_modal_2hora').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			inicio_hora_dos: {
				required: true				
			},
			fin_hora_dos: {
				required: true				
			},
			txt_actividad2: {
				required: true
			},
			select_responsable_hora2: {
				required: true
			},
		},
		messages: {
			inicio_hora_dos: { 	
				required: "Por favor, Ingrese un inicio de hora",	
			},
			fin_hora_dos: { 	
				required: "Por favor, Ingrese un fin de hora",	
			},
			txt_actividad2: { 	
				required: "Por favor, Ingrese la actividad",	
			},
			select_responsable_hora2: {
				required: "Por favor, Elija un Responsable",
			},
			
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN 

	// INICIO DE VALIDACION FORMULARIO MODAL HORA3
	$('#form_modal_3hora').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			inicio_hora_tres: {
				required: true				
			},
			fin_hora_tres: {
				required: true				
			},
			txt_actividad3: {
				required: true
			},
			select_responsable_hora3: {
				required: true
			},
		},
		messages: {
			inicio_hora_tres: { 	
				required: "Por favor, Ingrese un inicio de hora",	
			},
			fin_hora_tres: { 	
				required: "Por favor, Ingrese un fin de hora",	
			},
			txt_actividad3: { 	
				required: "Por favor, Ingrese la actividad",	
			},
			select_responsable_hora3: {
				required: "Por favor, Elija un Responsable",
			},
			
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE VALIDACION FORMULARIO MODAL HORA4
	$('#form_modal_4hora').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			inicio_hora_cuatro: {
				required: true				
			},
			fin_hora_cuatro: {
				required: true				
			},
			txt_actividad4: {
				required: true
			},
			select_responsable_hora4: {
				required: true
			},
		},
		messages: {
			inicio_hora_cuatro: { 	
				required: "Por favor, Ingrese un inicio de hora",	
			},
			fin_hora_cuatro: { 	
				required: "Por favor, Ingrese un fin de hora",	
			},
			txt_actividad4: { 	
				required: "Por favor, Ingrese la actividad",	
			},
			select_responsable_hora4: {
				required: "Por favor, Elija un Responsable",
			},
			
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE VALIDACION SEGMENTOS
	$('#form_modal_segmentos').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_proceso: {
				required: true
			},
		},
		messages: {
			txt_proceso: { 	
				required: "Por favor, Ingrese la actividad",	
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE VALIDACION FORMULARIO MODAL CLIENTES Y POSIBLES CLIENTES
	$('#form_modal_clientes').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_clientes: {
				required: true				
			},
			txt_porcentaje_modal_clientes: {
				required: true,
				min: 1,
				max: 100				
			},
		},
		messages: {
			txt_clientes: {
				required: "Por favor, Digíte un Cliente",
			},
			txt_porcentaje_modal_clientes: { 	
				required: "Por favor, Digíte un Porcentaje Valido",	
				min: "Por favor, Digite un número valido que esta entre 1 y 100",
				max: "Por favor, Digite un número valido que esta entre 1 y 100",		
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE VALIDACION FORMULARIO MODAL CLIENTES Y POSIBLES CLIENTES
	$('#form_modal_posibles_clientes').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_posibles_clientes: {
				required: true				
			},
			txt_porcentaje_modal_poclientes: {
				required: true,
				min: 1,
				max: 100				
			},
		},
		messages: {
			txt_posibles_clientes: {
				required: "Por favor, Digíte un Posible Cliente",
			},
			txt_porcentaje_modal_poclientes: { 	
				required: "Por favor, Digíte un Porcentaje Valido",	
				min: "Por favor, Digite un número valido que esta entre 1 y 100",
				max: "Por favor, Digite un número valido que esta entre 1 y 100",		
			},
		},
		// para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			
		}
	});
	// FIN

	// INICIO DE LLENADO DE LAS TABLAS
	// INICIO DE VALIDACION FORMULARIO MODAL EQUIPOS LLENAR TABLA
	$('#btn_agregarprogramas').click(function() {
		var respuesta = $('#form_modal_equipo').valid();
		var cont = 1;
		if (respuesta == true) {
		var info_id_equipo = $('#select_cargo_conf').val();
		var infor_nombre_cargo=equipo(info_id_equipo)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#txt_nombre_conf').val()+'</td>'
						+'<td>'+$('#txt_telf_conf').val()+'</td>'
						+'<td>'+$('#txt_email_conf').val()+'</td>'
						+'<td>'+infor_nombre_cargo+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_equipo tbody').append(html_fila);			
			$('#form_modal_equipo').each (function() {
              this.reset();
            });
            llenar_select_equipo();
		}
	});

	function equipo(id) {
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_cargo:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombre
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL GENERO MUSICAL LLENAR TABLA
	$('#btn_agregargenero').click(function() {
		var respuesta = $('#form_modal_genero').valid();
		var cont = 1;
		if (respuesta == true) {
			var info_id_genero= $('#select_genero_musical').val();
			var infor_nombre=x(info_id_genero)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#select_genero_musical').val()+'</td>'
						+'<td>'+infor_nombre+'</td>'
						+'<td>'+$('#txt_porcentaje_modal').text()+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_genero tbody').append(html_fila);			
			$('#form_modal_genero').each (function() {
              this.reset();
            });
            llenar_select_genero();
		}
	});

	function x(id) {
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombre
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL TIPO DE PROGRAMACION LLENAR TABLA
	$('#btn_agregarprogramacion').click(function() {
		var respuesta = $('#form_modal_programacion').valid();
		var cont = 1;
		if (respuesta == true) {
			var info_id_programacion= $('#select_tipo_programacion').val();
			var infor_nombre_progra=id_programacion(info_id_programacion)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+infor_nombre_progra+'</td>'
						+'<td>'+$('#txt_porcentaje_modal_pro').val()+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_programacion tbody').append(html_fila);			
			$('#form_modal_programacion').each (function() { 
              this.reset();
            });
            llenar_select_programacion();
		}
	});

	function id_programacion(id) {
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_programacion:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombre
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL SINCRONIZADO PRIMERA HORA LLENAR TABLA
	$('#btn_agregarprimerahora').click(function() {
		var respuesta = $('#form_modal_1hora').valid();
		var cont = 1;
		if (respuesta == true) {
			var info_id_1hora= $('#select_responsable_hora1').val();
			var infor_nombre_hora1=id_hora1(info_id_1hora)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#inicio_hora_uno').val()+'</td>'
						+'<td>'+$('#fin_hora_uno').val()+'</td>'
						+'<td>'+$('#txt_actividad').val()+'</td>'
						+'<td>'+infor_nombre_hora1+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_hora1 tbody').append(html_fila);			
			$('#form_modal_1hora').each (function() {
              this.reset();
            });
            llenar_select_responsables();
		}
	});

	function id_hora1(id){
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_responsables:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombres
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL SINCRONIZADO SEGUNDA HORA LLENAR TABLA
	$('#btn_agregarsegundahora').click(function() {
		var respuesta = $('#form_modal_2hora').valid();
		var cont = 1;
		if (respuesta == true) {
			var info_id_2hora= $('#select_responsable_hora2').val();
			var infor_nombre_hora2=id_hora2(info_id_2hora)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#inicio_hora_dos').val()+'</td>'
						+'<td>'+$('#fin_hora_dos').val()+'</td>'
						+'<td>'+$('#txt_actividad2').val()+'</td>'
						+'<td>'+infor_nombre_hora2+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_hora2 tbody').append(html_fila);			
			$('#form_modal_2hora').each (function() {
              this.reset();
            });
            llenar_select_responsables();
		}
	});

	function id_hora2(id) {
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_responsables:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombres
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL SINCRONIZADO TERCERA HORA LLENAR TABLA
	$('#btn_agregartercerahora').click(function() {
		var respuesta = $('#form_modal_3hora').valid();
		var cont = 1;
		if (respuesta == true) {
			var info_id_3hora= $('#select_responsable_hora3').val();
			var infor_nombre_hora3=id_hora3(info_id_3hora)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#inicio_hora_tres').val()+'</td>'
						+'<td>'+$('#fin_hora_tres').val()+'</td>'
						+'<td>'+$('#txt_actividad3').val()+'</td>'
						+'<td>'+infor_nombre_hora3+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_hora3 tbody').append(html_fila);			
			$('#form_modal_3hora').each (function() {
              this.reset();
            });
            llenar_select_responsables();
		}
	});

	function id_hora3(id) {
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_responsables:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombres
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL SINCRONIZADO CUARTA HORA LLENAR TABLA
	$('#btn_agregarcuartahora').click(function() {
		var respuesta = $('#form_modal_4hora').valid();
		var cont = 1;
		if (respuesta == true) {
			var info_id_4hora= $('#select_responsable_hora4').val();
			var infor_nombre_hora4=id_hora4(info_id_4hora)
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#inicio_hora_cuatro').val()+'</td>'
						+'<td>'+$('#fin_hora_cuatro').val()+'</td>'
						+'<td>'+$('#txt_actividad4').val()+'</td>'
						+'<td>'+infor_nombre_hora4+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_hora4 tbody').append(html_fila);			
			$('#form_modal_4hora').each (function() {
              this.reset();
            });
            llenar_select_responsables();
		}
	});

	function id_hora4(id){
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_responsables:'', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombres
			}
		});
		return data_global;
	}

	// INICIO DE VALIDACION FORMULARIO MODAL SEGMENTOS LLENAR TABLA
	$('#btn_agregarsegmentos').click(function() {
		var respuesta = $('#form_modal_segmentos').valid();
		var cont = 1;
		if (respuesta == true) {
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#txt_proceso').val()+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_segmentos tbody').append(html_fila);			
			$('#form_modal_segmentos').each (function() {
              this.reset();
            });
		}
	});

	// INICIO DE VALIDACION FORMULARIO MODAL CLIENTES LLENAR TABLA
	$('#btn_agregarclientes').click(function() {
		var respuesta = $('#form_modal_clientes').valid();
		var cont = 1;
		if (respuesta == true) {
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#txt_clientes').val()+'</td>'
						+'<td>'+$('#txt_porcentaje_modal_clientes').val()+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_clientes tbody').append(html_fila);			
			$('#form_modal_clientes').each (function() {
              this.reset();
            });
		}
	});

	// INICIO DE VALIDACION FORMULARIO MODAL POSIBLES CLIENTES LLENAR TABLA
	$('#btn_agregarpoclientes').click(function() {
		var respuesta = $('#form_modal_posibles_clientes').valid();
		var cont = 1;
		if (respuesta == true) {
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#txt_posibles_clientes').val()+'</td>'
						+'<td>'+$('#txt_porcentaje_modal_poclientes').val()+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_posibles tbody').append(html_fila);			
			$('#form_modal_posibles_clientes').each (function() {
              this.reset();
            });
		}
	});

	//////////////////PROCESO DE LA TABLA EQUIPO QUE LO CONFORMAN///////////////
	$('#btn_agregar').click(function() {
		$('#modal-equipo-conforma').modal('show');
	});
	$('#btn_agregar_genero').click(function() {
		$('#modal-genero-musical').modal('show');
	});
	$('#btn_agregar_programacion').click(function() {
		$('#modal-tipo-programacion').modal('show');
	});
	$('#btn_agregar_hora1').click(function() {
		$('#modal-primera-hora').modal('show');
	});
	$('#btn_agregar_hora2').click(function() {
		$('#modal-segunda-hora').modal('show');
	});
	$('#btn_agregar_hora3').click(function() {
		$('#modal-tercera-hora').modal('show');
	});
	$('#btn_agregar_hora4').click(function() {
		$('#modal-cuarta-hora').modal('show');
	});
	$('#btn_agregar_segmentos').click(function() {
		$('#modal-segmentos').modal('show');
	});
	$('#btn_agregar_clientes').click(function() {
		$('#modal-clientes').modal('show');
	});
	$('#btn_agregar_posibles').click(function() {
		$('#modal-posibles-clientes').modal('show');
	});

	///////////////FIN DE PROCESO DE LA TABLA////////////////////////////
	//definir formato campos números de teléfono
	$('.telefonos, #txt_telf_conf').mask('(999) 999-9999');
	// rango de los tiempos de trabajo
	$('input[name=tiempo1], input[name=tiempo2], input[name=tiempo3]').daterangepicker({
		'applyClass' : 'btn-sm btn-success',
		'cancelClass' : 'btn-sm btn-default',
		locale: {
			applyLabel: 'Aplicar',
			cancelLabel: 'Cancelar',
		}
	})
	//////////////
    $("#btnRecorrer").click(function () {
        $("#tabla_equipo tbody tr").each(function (index) {
            var campo1, campo2, campo3, campo4, campo5;
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 0:
                        campo1 = $(this).text();
                        break;
                    case 1:
                       campo2 = $(this).text();
                        break;
                    case 2:
                        campo3 = $(this).text();
                        break;
                    case 3:
                        campo4 = $(this).text();
                        break;
                    case 4:
                        campo5 = $(this).text();
                        break;
               }
            $(this).css("background-color", "#ECF8E0");
            });
       // console.log(campo1 + ' - ' + campo2 + ' - ' + campo3 + ' - ' + campo4 + ' - ' + campo5);
        });
    });

	//Se utiliza para que el campo de texto solo acepte letras
	$(".letras").keypress(function (key) {
        //window.console.log(key.charCode)
        if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
            && (key.charCode < 65 || key.charCode > 90) //letras minusculas
            && (key.charCode != 45) //retroceso
            && (key.charCode != 241) //ñ
            && (key.charCode != 209) //Ñ
            && (key.charCode != 32) //espacio
            && (key.charCode != 225) //á
            && (key.charCode != 233) //é
            && (key.charCode != 237) //í
            && (key.charCode != 243) //ó
            && (key.charCode != 250) //ú
            && (key.charCode != 193) //Á
            && (key.charCode != 201) //É
            && (key.charCode != 205) //Í
            && (key.charCode != 211) //Ó
            && (key.charCode != 218) //Ú
            )
            return false;
    });	
    //Se utiliza para que el campo de texto solo acepte numeros
    $('.numeros').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
      });
    //////////Validación de la Cédula///////////////////////////////////
    validarDocumento  = function () {          
	    numero = document.getElementById('txt_cedula').value;
	    /* alert(numero); */
	    var suma = 0;      
	    var residuo = 0;      
	    var nat = false;      
	    var numeroProvincias = 22;                  
	    var modulo = 11;

	    if (numero.length < 10 ) {              
	        $.gritter.add({
				title: 'Incorrecto',
				text: 'El número ingreado no esta completo o en invalido',
				class_name: 'gritter-error',
				time:2000
			});
	    }
	    /* Los primeros dos digitos corresponden al codigo de la provincia */
	    provincia = numero.substr(0,2);      
	    if (provincia < 1 || provincia > numeroProvincias) {           
	        alert('El código de la provincia (dos primeros dígitos) es inválido');
	     	return false;       
	    }

	    /* Aqui almacenamos los digitos de la cedula en variables. */
	    d1  = numero.substr(0,1);         
	    d2  = numero.substr(1,1);         
	    d3  = numero.substr(2,1);         
	    d4  = numero.substr(3,1);         
	    d5  = numero.substr(4,1);         
	    d6  = numero.substr(5,1);         
	    d7  = numero.substr(6,1);         
	    d8  = numero.substr(7,1);         
	    d9  = numero.substr(8,1);         
	    d10 = numero.substr(9,1);                    
	    /* El tercer digito es: */                           
	    /* 9 para sociedades privadas y extranjeros   */         
	    /* 6 para sociedades publicas */         
	    /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
	    if (d3 == 7 || d3 == 8) {           
	        alert('El tercer dígito ingresado es inválido');                     
	        return false;
	    }             
	    /* Solo para personas naturales (modulo 10) */         
	    if (d3 < 6) {           
	        nat = true;            
	        p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
	        p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
	        p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
	        p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
	        p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
	        p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
	        p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
	        p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
	        p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
	        modulo = 10;
	    } 

	    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
	    residuo = suma % modulo;  

	    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
	    digitoVerificador = residuo==0 ? 0: modulo - residuo;                
	    if(nat == true)	{         
	        if (digitoVerificador != d10){                          
	            $.gritter.add({
					title: 'Incorrecto',
					text: 'Porvafor Verifique que su número de cédula sea correcta',
					class_name: 'gritter-error',
					time:2000
				});
	        }         
	    }      
	    return true;   
   	}            
	/////////////proceso de guardar//////
	$( "#btn_guardar" ).click(function () {
		proceso_guardar();
	});

	///clase select para el diseño///////////\
	$(".select2").css({
	    	'width':'100%',
	    	'text-align':'left',
	    }).select2().on("change", function (e) {
		$(this).closest('form').validate().element($(this));
    })
	///////////////////////INICIO llamado funciones de procesos de inicio/////////////////////////////////
	llenar_select_equipo();
	llenar_select_genero();
	llenar_select_programacion();
	llenar_select_responsables();
	init();
	///////////////////////FIN llamado funciones de procesos de inicio/////////////////////////////////

	function init () {
	//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// //para la hora detalles programa
		$("#inicio_hora,#fin_hora").datetimepicker({
	    	pickDate: false
	    });
	    ////para la hora detalles programa
		$("#inicio_hora_uno,#fin_hora_uno").datetimepicker({
	    	pickDate: false
	    });
	}

	function llenar_select_equipo () {
		$("#select_cargo_conf").select2('val', 'All');
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			data: {llenar_equipo:'equip'},
			success: function (data) {
				$('#select_cargo_conf').html(data);
			}
		});
	}

	function llenar_select_genero () {
		$("#select_genero_musical,#select_genero_musical_form").select2('val', 'All');
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			data: {llenar_genero:'equip'},
			success: function (data) {
				$('#select_genero_musical,#select_genero_musical_form').html(data);
			}
		});
	}

	function llenar_select_programacion () {
		$("#select_tipo_programacion").select2('val', 'All');
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			data: {llenar_programacion:'equip'},
			success: function (data) {
				$('#select_tipo_programacion').html(data);
			}
		});
	}

	function llenar_select_responsables() {
		$("#select_responsable_hora1,#select_responsable_hora2,#select_responsable_hora3,#select_responsable_hora4").select2('val', 'All');
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			data: {llenar_responsables:'equip'},
			success: function (data) {
				$('#select_responsable_hora1,#select_responsable_hora2,#select_responsable_hora3,#select_responsable_hora4').html(data);
			}
		});
	}

	function proceso_guardar () {
		var form_uno =$("#form_etapa1").serialize();
		var form_dos = $("#form_etapa2").serialize();
		var form_tres = $("#form_etapa3").serialize();
		var submit = "btn_guardar";

		$.ajax({
	        url: "data/ficha_programas/app.php",
	        data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_guardar=" +submit,
	        type: "POST",
	        success: function (result) {
	        },
	        error: function (xhr, status, errorThrown) {
	          alert("Hubo un problema!");
	          console.log("Error: " + errorThrown);
	          console.log("Status: " + status);
	          console.dir(xhr);
	        }
	    });
	}

	$('#modal-wizard-container').ace_wizard();
	$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
	
		$(document).one('ajaxloadstart.page', function(e) {
			//in ajax mode, remove remaining elements before leaving page
			$('[class*=select2]').remove();
		});
	});
});	