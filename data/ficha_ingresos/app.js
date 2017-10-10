var app = angular.module('scotchApp').controller('fichaingresosController', function ($scope, $location, loaddatosSRI) {

    jQuery(function($) {
			// estilo spinner
			$('#cargas').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
	    	// fin

			$('#horas_laborar').datetimepicker({
                pickDate: false,
                format: 'HH:mm'
            });

	    	$('#btn_agregar').click(function () {
				$('#modal-cursos-realizados').modal('show');
			});

	    	$('#btn_agregar_cuentas').click(function () {
				$('#modal-cuentas-bancarias').modal('show');
			});
				
			$('[data-rel=tooltip]').tooltip();
			var $validation = true;
			$('#fuelux-wizard-container').ace_wizard({
				//step: 2 //optional argument. wizard will jump to step "2" at first
				//buttons: '.wizard-actions:eq(0)'
			})
			.on('actionclicked.fu.wizard' , function(e, info) {
				if(info.step == 1 && $validation) {
					if(!$('#form_personal').valid()) e.preventDefault();
				}
				if(info.step == 2 && $validation) {
					if(!$('#form_bancarios').valid()) e.preventDefault();
				}
				if(info.step == 3 && $validation) {
					if(!$('#form_familia').valid()) e.preventDefault();
				}
			})
			.on('finished.fu.wizard', function(e) {
				var val =  "";
				val = $("#btn_0").attr("data-last")
				if (val == 'Guardar') {
					proceso_guardar();
				} else {
					if (val == 'Modificar') {
						proceso_modificar();
					}
				}

			}).on('stepclick.fu.wizard', function (e) {
		});
		// fin

		// validacion primer wizar
		$('#form_personal').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				cedula: {
					required: true				
				},
				nombres_completos: {
					required: true				
				},
				fecha_nacimiento:{
					required:true
				},
				edad: {
					required: true				
				},
				telf_celular: {
					required: true				
				},
				select_civil: {
					required: true				
				},
				email: {
					required: true				
				},
				rb_instruccion: {
					required: true				
				},
				rb_vivienda: {
					required: true				
				},
				provincia: {
					required: true				
				},
				canton: {
					required: true				
				},
				parroquia: {
					required: true				
				},
				direccion: {
					required: true				
				},
				select_sangre: {
					required: true				
				},
			},
			messages: {
				cedula: { 	
					required: "Por favor, Digíte el Número de Cédula",		
				},
				nombres_completos: {
					required: "Por favor, Ingrese Nombres Completos",
				},
				fecha_nacimiento: {
					required: "Por favor, Elija una Fecha de Nacimiento",
				},
				edad: {
					required: "Por favor, Se necesita la edad",
				},
				telf_celular: {
					required: "Por favor, Digíte telefono Celular",
				},
				select_civil: {
					required: "Por favor, Elija estado civil",
				},
				email: {
					required: "Por favor, Ingrese un E-mail",
					email: "Por favor, Ingrese un E-mail valido"
				},
				rb_instruccion: {
					required: "Por favor, Elija una instrucción",
				},
				rb_vivienda: {
					required: "Por favor, Elija tipo Vivienda",
				},
				provincia: {
					required: "Por favor, Ingrese la Provincia",
				},
				canton: {
					required: "Por favor, Ingrese el Cantón",
				},
				parroquia: {
					required: "Por favor, Ingrese la Parroquia",
				},
				direccion: {
					required: "Por favor, Ingrese la Dirección",
				},
				select_sangre: {
					required: "Por favor, Elija un Tipo de Sangre",
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
		// Fin

		//Inicio validacion cursos realizados
		$('#form_modal_cursos').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				nombre_curso: {
					required: true				
				},
				establecimiento_curso: {
					required: true				
				},
				tiempo_curso: {
					required: true				
				},
			},
			messages: {
				nombre_curso: {
					required: "Por favor, Indique nombre del curso",
				},
				establecimiento_curso: { 	
					required: "Por favor, Indique establecimiento",			
				},
				tiempo_curso: {
					required: "Por favor, Indique tiempo del curso",
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
		// Fin

		// Validacion: Datos Bancarios modal
		$('#form_modal_cuentas').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_cuenta: {
					required: true				
				},
				select_banco: {
					required: true				
				},
				txt_tiempo_curso: {
					required: true				
				},
			},
			messages: {
				select_cuenta: {
					required: "Por favor, Elija una opción",
				},
				select_banco: {
					required: "Por favor, Elija una opción",
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
		// Fin

		// validacion ultimo formulario
		$('#form_familia').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				nombres_familia: {
			      required: true
			    },
			    parentesco: {
			      required: true
			    },
			    telf_familia: {
			      required: true
			    },
			    dir_fami: {
			      required: true
			    },
			    ciudad_fami: {
			      required: true
			    },
			    select_areas: {
			      required: true
			    },
			    select_cargo: {
			      required: true
			    },
			    sueldo: {
			      required: true
			    },
			},
			messages: {
				nombres_familia: {
					required: "Por favor, Ingrese un Nombre de Familiar",
				},
				parentesco: {
					required: "Por favor, Ingrese un Parentesco de Familiar",
				},
				telf_familia: {
					required: "Por favor, Ingrese un Teléfono Familiar",
				},
				dir_fami: {
					required: "Por favor, Ingrese una Dirección Familiar",
				},
				ciudad_fami: {
					required: "Por favor, Ingrese una Ciudad",
				},
				select_areas: {
					required: "Por favor, Seleccione una Área",
				},
				select_cargo: {
					required: "Por favor, Ingrese un cargo",
				},
				sueldo: {
					required: "Por favor, Ingrese uel sueldo",
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
		// Fin
	    	
		// definir formato campos números de teléfono
		$('.telefonos').mask('(999) 999-9999');
		$('.fijo').mask('(999) 999-999');
		// rango de los tiempos de trabajo
		$('input[name=tiempo1], input[name=tiempo2], input[name=tiempo3]').daterangepicker({
			'applyClass' : 'btn-sm btn-success',
			'cancelClass' : 'btn-sm btn-default',
			locale: {
				applyLabel: 'Aplicar',
				cancelLabel: 'Cancelar',
			}
		})
		// fin 

		// validación ruc
		$("#cedula").keyup(function() {
	        $.ajax({
	            type: "POST",
	            url: "data/ficha_ingresos/app.php",
	            data: {comparar_cedula:'comparar_cedula',cedula: $("#cedula").val()},
	            dataType: 'json',
	            success: function(data) {
	                var val = data;
	                if (val == 1) {
	                    $("#cedula").val("");
	                    $("#cedula").focus();
	                    $.gritter.add({
							title: 'Error... El personal ya fue registrado',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});	
					}
	            }
	        });
    	});
		// fin

		// verificar cedula
		$scope.cargadatos = function(estado) {
			if($('#cedula').val() == '') {
				$.gritter.add({
					title: 'Ingrese una Cédula',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#cedula').focus();
			} else {
				 if (estado) {
		        	$.blockUI({ css: { 
			            border: 'none', 
			            padding: '15px', 
			            backgroundColor: '#000', 
			            '-webkit-border-radius': '10px', 
			            '-moz-border-radius': '10px', 
			            opacity: .5, 
			            color: '#fff' 
			        	},
			            message: '<h3>Consultando, Por favor espere un momento    ' + '<i class="fa fa-spinner fa-spin"></i>' + '</h3>'
			    	});
		            loaddatosSRI.get({
		                nrodocumento: $("#cedula").val(),
		                tipodocumento: "CEDULA"
		            }).$promise.then(function(data) {
		            	$.unblockUI();
		            	if(data.valid == 'false') {
		            		$.gritter.add({
								title: 'Error.... Cédula erronea',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$('#cedula').val('');
							$('#nombres_completos').val('');
			            	$('#provincia').val('');
			            	$('#canton').val('');
			            	$('#parroquia').val('');
			            	$("#antecedentes").prop("checked",false);
			            	$('#cedula').focus();
		            	} else {
		            		$('#nombres_completos').val(data.nombres_apellidos);
			            	$('#provincia').val(data.provincia);
			            	$('#canton').val(data.canton);
			            	$('#parroquia').val(data.parroquia);
			            	if(data.antecedentes == "SI") {
						    	$("#antecedentes").prop("checked",true);
						    } else {
						    	$("#antecedentes").prop("checked",false);
						    }
		            	}
		            }, function(err) {
		                console.log(err.data.error);
		            });
		        } 
			}  
	    }
	    // fin
		
		// Se utiliza para que el campo de texto solo acepte letras
		$(".letras").keypress(function (key) {
	        // window.console.log(key.charCode)
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
	    //

		// fecha de nacimiento
		$("#fecha_nacimiento").change(function() {
			var fecha = $(this).val();
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {consulta_edad:'consulta_edad',fecha:fecha},
				success: function (data) {
					$('#edad').val(data);
				}
			});
		});
		// // fin

		// clase select para el diseño 
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

		$("#select_civil,#select_pais,#select_provincia,#select_ciudad,#select_sangre,#select_areas,#select_cargo").select2({
		  placeholder: "Seleccione una opción",
		  allowClear: true
		});
		// fin

		// funcion autocompletar la serie ro pagos
		function autocompletar() {
		    var temp = "";
		    var serie = $("#codigo_ficha").val();
		    for (var i = serie.length; i < 5; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo codigo rol
		function cargar_codigo() {
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {cargar_codigo:'cargar_codigo'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var codigo = data.codigo_ficha;
						var res = parseInt(codigo.substr(1, 10));
						res = res + 1;

						$("#codigo_ficha").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo_ficha").val(validado);
					} else {
						var res = parseInt(0);
						res = res + 1;

						$("#codigo_ficha").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo_ficha").val(validado);
					}
				}
			});
		}
		// fin

		// validacion solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		// Inicio llamado funciones de procesos de inicio
		// $("#cedula").keypress(ValidNum);
		$("#edad").keypress(ValidNum);
		$("#antecedentes").prop("checked",false); 
		cargar_codigo()
		llenar_select_bancos();
		llenar_select_areas();
		llenar_select_cargo();
		llenar_tabla();
		llenar_tabla_fichas();
		init();
		// Fin 

		function init () {
			$(".datepicker").datepicker({ 
				format: "yyyy-mm-dd",
		        autoclose: true
			}).datepicker("setDate","today");
		}

		// lenar combo bancos
		function llenar_select_bancos() {
			$("#select_banco").select2('val', 'All');
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_bancos:'llenar_bancos'},
				success: function (data) {
					$('#select_banco').html(data);
				}
			});
		}
		// 

		// llenar combo de las areas
		function llenar_select_areas() {
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_areas:'llenar_areas'},
				success: function (data) {
					$('#select_areas').html(data);
				}
			});
		}
		// fin

		// llenar combo cargos
		function llenar_select_cargo() {
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_cargo:'llenar_cargo'},
				success: function (data) {
					$('#select_cargo').html(data);
				}
			});
		}
		// fin

		// abrir en una nueva ventana reporte fichas
		$scope.methodspdf = function(id) { 
			var myWindow = window.open("data/reportes/ficha_ingreso.php?hoja=A4&id="+id,'_blank'); 
		} 
		// fin

		// eliminar tr tabla cursos realizados
		$scope.methodseliminar = function() { 
			$("a.dc_btn_accion").click(function() {
				$(this).parents("tr").fadeOut("normal", function() {
		        	$(this).remove(); 
		        }); 
			});
		} 
		// fin

		// eliminar tr tabla cuentas bancarias
		$scope.methodseliminar2 = function() { 
			$("a.dc_btn_accion2").click(function() {
				$(this).parents("tr").fadeOut("normal", function() {
		        	$(this).remove(); 
		        }); 
			});
		}
		// fin 

		// cargar datos desde la tabla a los formularios
		$scope.methodsedit = function(id) { 
			// cargar datos personales
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_personal:'llenar_personal', id:id},
				dataType: 'json',
				success: function (data) {
					var tama = data.length;
					for (var i = 0; i < tama; i = i + 29) {
						$("#id_personal").val(data[i]);
						$("#codigo_ficha").val(data[i + 2]);

						if(data[i + 3] == 'true') {
							document.getElementById("inp_relacion").checked = true;
						} else {
							document.getElementById("inp_relacion").checked = false;
						}

						$("#nombres_completos").val(data[i + 4]);
						$("#cedula").val(data[i + 5]);
						$("#fecha_nacimiento").val(data[i + 6]);
						$("#edad").val(data[i + 7]);
						$("#telf_fijo").val(data[i + 8]);
						$("#telf_celular").val(data[i + 9]);
						$("#select_civil").select2('val', data[i + 10]).trigger("change");
						$("#cargas").val(data[i + 11]);
						$("#email").val(data[i + 12]);

						if(data[i + 13] == 'Primaria') {
							document.getElementById("rb_primaria").checked = true;
						} else {
							document.getElementById("rb_primaria").checked = false;	
						}

						if(data[i + 13] == 'Ciclo Basico') {
							document.getElementById("rb_basico").checked = true;
						} else {
							document.getElementById("rb_basico").checked = false;
						}

						if(data[i + 13] == 'Bachiller') {
							document.getElementById("rb_bachiller").checked = true;
						} else {
							document.getElementById("rb_bachiller").checked = false;
						}

						if(data[i + 13] == 'Universitario') {
							document.getElementById("rb_universitario").checked = true;
						} else {
							document.getElementById("rb_universitario").checked = false;
						}

						$("#especialidad").val(data[i + 14]);

						if(data[i + 15] == 'PROPIA') {
							document.getElementById("rb_propia").checked = true;
						} else {
							document.getElementById("rb_propia").checked = false;
						}

						if(data[i + 15] == 'ARRIENDO') {
							document.getElementById("rb_arriendo").checked = true;
						} else {
							document.getElementById("rb_arriendo").checked = false;
						}

						if(data[i + 15] == 'FAMILIAR') {
							document.getElementById("rb_familiar").checked = true;
						} else {
							document.getElementById("rb_familiar").checked = false;
						}

						if(data[i + 15] == 'OTRO') {
							document.getElementById("rb_otro").checked = true;
						} else {
							document.getElementById("rb_otro").checked = false;
						}

						$("#provincia").val(data[i + 16]);
						$("#canton").val(data[i + 17]);
						$("#parroquia").val(data[i + 18]);
						$("#sector").val(data[i + 19]);
						$("#direccion").val(data[i + 20]);
						$("#select_sangre").select2('val', data[i + 21]).trigger("change");
						$("#alergia").val(data[i + 22]);
						$("#enfermedad").val(data[i + 23]);
						$("#ini_trab").val(data[i + 24]);
						$("#fecha_aplicacion").val(data[i + 25]);
						$("#sueldo").val(data[i + 26]);
						$("#horas_laborar").val(data[i + 27]);

						if(data[i + 28] == 'SI') {
							document.getElementById("antecedentes").checked = true;
						} else {
							document.getElementById("antecedentes").checked = false;
						}
					}	
				}
			});

			// llenar cursos realizados
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_cursos_realizados:'llenar_cursos_realizados', id:id},
				success: function (response) {
					$('#tbt_cursos tbody').html(response);
				}
			});

			// llenar cuentas bancarias
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_cuentas_bancarias:'llenar_cuentas_bancarias', id:id},
				success: function (data) {
					$('#tbt_cuentas tbody').html(data);
				}
			});

			// cargar trabajos anteriores
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_trabajos_anteriores:'llenar_trabajos_anteriores', id:id},
				dataType: 'json',
				success: function (data) {
					var tama = data.length;
					for (var i = 0; i < tama; i = i + 8) {
						$("#empresa").val(data[i]);
						$("#cargo").val(data[i + 1]);
						$("#direccion_trab").val(data[i + 2]);
						$("#telf_fijo_trab").val(data[i + 3]);
						$("#telf_celular_trab").val(data[i + 4]);
						$("#jefe").val(data[i + 5]);
						$("#tiempo_trabajo").val(data[i + 6]);
						$("#ciudad_trab").val(data[i + 7]);
					}	
				}
			});

			// cargar datos familiares
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_datos_familiares:'llenar_datos_familiares', id:id},
				dataType: 'json',
				success: function (data) {
					var tama = data.length;
					for (var i = 0; i < tama; i = i + 6) {
						$("#nombres_familia").val(data[i + 1]);
						$("#parentesco").val(data[i + 2]);
						$("#telf_familia").val(data[i + 3]);
						$("#dir_fami").val(data[i + 4]);
						$("#ciudad_fami").val(data[i + 5]);
					}	
				}
			});
			// fin

			// cargar cargos personales
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_cargos_personales:'llenar_cargos_personales', id:id},
				dataType: 'json',
				success: function (data) {
					var tama = data.length;
					for (var i = 0; i < tama; i = i + 2) {
						$("#select_areas").select2('val', data[i]).trigger("change");
						$("#select_cargo").select2('val', data[i + 1]).trigger("change");
					}	
				}
			});
			// fin

			// cargar abreviatura
			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_abreviatura:'llenar_abreviatura', id:id},
				dataType: 'json',
				success: function (data) {
					var tama = data.length;
					for (var i = 0; i < tama; i = i + 1) {
						$("#abreviatura").val(data[i]);
					}	
				}
			});
			// fin

			$("#btn_0").attr('data-last','Modificar');
		    $('#myModal').modal('hide');
		} 
		// fin 

		// llenar tablas de fichas
		function llenar_tabla_fichas() {
			$('#dynamic-table').dataTable().fnClearTable();

			$.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {cargar_tabla_fichas:'cargar_tabla_fichas'},
				dataType: 'json',
				success: function(response) { 
					var tabla = $('#dynamic-table').DataTable();
					for (var i = 0; i < response.length; i++) {
						var pdf = "<button type='button' class='btn btn-white btn-pink btn-sm'  onclick=\"angular.element(this).scope().methodspdf('"+response[i].id+"')\"><span class='fa fa-file-pdf-o red'> PDF</button>";
						var editar = "<button type='button' class='btn btn-white btn-green btn-sm'  onclick=\"angular.element(this).scope().methodsedit('"+response[i].id+"')\"><span class='fa fa fa-pencil green'> EDITAR</button>";
						var acciones =  editar + ' ' + pdf;

						tabla.row.add([
				            response[i]['cedula_identificacion'],
				            response[i]['nombres_completos'],
				            response[i]['fecha_aplicacion'],
				            acciones
		                ]).draw(false);                            
			        }
				}
			});
		}
		// fin

		// modal fichas de ingreso
		function abrir_buscador() {
			$('#myModal').modal('show');
		}
		// fin

		// estilo tabla dinamica
		function llenar_tabla() {
			$('#dynamic-table').dataTable({
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

		// guardar fichas
		function proceso_guardar() {
			$('#dynamic-table').dataTable().fnClearTable();
			var form_uno=$("#form_personal").serialize();
			var form_dos= $("#form_bancarios").serialize();
			var form_tres= $("#form_familia").serialize();
			var submit = "btn_guardar";

			//varibles cursos realizados
			var cursos = [];
	       	$("#tbt_cursos tbody tr").each(function (index) {  
	       		var element = {};
		        $(this).children("td").each(function (index) {                               
		            switch (index) {                                            
		                case 0:
		                	element.curso = $(this).text();
		                    break; 
		                case 1:
		                    element.estab = $(this).text();
		                    break; 
		                case 2:
		                    element.tiempo = $(this).text();
		                    break;
		            }	            
		        });
		        cursos.push(element);
		    });
		    // fin variables cursos

		    //varibles cuentas
		    var cuentas = [];
		    $("#tbt_cuentas tbody tr").each(function (index) {  
	       		var element = {};
		        $(this).children("td").each(function (index) {                               
		            switch (index) {                                            
		                case 0:
		                	element.tipo_cuen = $(this).text();
		                    break; 
		                case 1:
		                    element.id_cuen = $(this).text();
		                    break; 
		                case 3:
		                    element.numero_cuen = $(this).text();
		                    break;
		            }	            
		        });
		        cuentas.push(element);
		    });
		    // fin variables cuentas

			$.ajax({
		        url: "data/ficha_ingresos/app.php",
		        data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_guardar=" +submit+"&campos1="+JSON.stringify(cursos)+"&campos2="+JSON.stringify(cuentas),
		        type: "POST",
		        success: function (data) {
		        	var val = data;
		        	if(data != '') {
						bootbox.alert("Gracias! Por su Información Datos Correctamente Guardados!", function() {
						  var myWindow = window.open("data/reportes/ficha_ingreso.php?hoja=A4&id="+val,'_blank'); 
						  location.reload();
						});
						llenar_tabla_fichas();
			    	}
		        },
		        error: function (xhr, status, errorThrown) {
			        alert("Hubo un problema!");
			        console.log("Error: " + errorThrown);
			        console.log("Status: " + status);
			        console.dir(xhr);
		        }
		    });
		}
		// fin

		// modificar las fichas
		function proceso_modificar() {
			$('#dynamic-table').dataTable().fnClearTable();
			var form_uno = $("#form_personal").serialize();
			var form_dos = $("#form_bancarios").serialize();
			var form_tres = $("#form_familia").serialize();
			var submit = "btn_modificar";

			//varibles cursos realizados
			var cursos = [];
	       	$("#tbt_cursos tbody tr").each(function (index) {  
	       		var element = {};
		        $(this).children("td").each(function (index) {                               
		            switch (index) {                                            
		                case 0:
		                	element.curso = $(this).text();
		                    break; 
		                case 1:
		                    element.estab = $(this).text();
		                    break; 
		                case 2:
		                    element.tiempo = $(this).text();
		                    break;
		            }	            
		        });
		        cursos.push(element);
		    });
		    // fin variables cursos

		    //varibles cuentas
		    var cuentas = [];
		    $("#tbt_cuentas tbody tr").each(function (index) {  
	       		var element = {};
		        $(this).children("td").each(function (index) {                               
		            switch (index) {                                            
		                case 0:
		                	element.tipo_cuen = $(this).text();
		                    break; 
		                case 1:
		                    element.id_cuen = $(this).text();
		                    break; 
		                case 3:
		                    element.numero_cuen = $(this).text();
		                    break;
		            }	            
		        });
		        cuentas.push(element);
		    });
		    // fin variables cuentas

		    $.ajax({
		        url: "data/ficha_ingresos/app.php",
		        data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_modificar=" +submit+"&campos1="+JSON.stringify(cursos)+"&campos2="+JSON.stringify(cuentas),
		        type: "POST",
		        success: function (data) {
		        	var val = data;
		        	if(data != '') {
		        		bootbox.alert("Gracias! Por su Información Datos Correctamente Modificados!", function() {
						  var myWindow = window.open("data/reportes/ficha_ingreso.php?hoja=A4&id="+val,'_blank'); 
						  location.reload();
						});
						llenar_tabla_fichas();
			    	}                                                
		        },
		        error: function (xhr, status, errorThrown) {
			        alert("Hubo un problema!");
			        console.log("Error: " + errorThrown);
			        console.log("Status: " + status);
			        console.dir(xhr);
		        }
		    });
		}
		// fin

		// abrir buscador fichas de ingreso
		$('#abrir_buscador').click(function() {
			abrir_buscador();
		});
		// fin

		// cargar datos a la tabla de cursos realizados
		$('#btn_cargar').click(function() {
			var respuesta = $('#form_modal_cursos').valid();
			var celdas = document.getElementById("tbt_cursos").rows.length;
			var vector = new Array();
			var cont = 0;
			var repe = 0;

			if (respuesta == true) {
				if(celdas != '5') {
					$("#tbt_cursos tbody tr").each(function (index) {                                                                 
			            $(this).children("td").each(function (index) {                               
			                switch (index) {                                            
			                    case 0:
			                    vector[cont] = $(this).text();   
			                    break;                                                                                                                               
			                }                                         
			            });
			            cont++;
			        });

			        for(var i=0 ; i<vector.length; i++) {
			            if(vector[i] == $('#txt_nombre_curso').val()) {
			                repe++;
			            }
			        }

			        if(repe == '0') {
					var html_fila = '<tr>'
							+'<td>'+$('#nombre_curso').val()+'</td>'
							+'<td>'+$('#establecimiento_curso').val()+'</td>'
							+'<td>'+$('#tiempo_curso').val()+'</td>'
							+'<td>'+"<div class='hidden-sm hidden-xs action-buttons'><a class='red dc_btn_accion tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick=\"angular.element(this).scope().methodseliminar(event)\"></i></a></div>"+'</td>'
						+'</tr>'

					$('#tbt_cursos tbody').append(html_fila);	
					$('#nombre_curso').val('');
					$('#establecimiento_curso').val('');
					$('#tiempo_curso').val('');
					$('#modal-cursos-realizados').modal('hide');
					} else {
						if(repe == '1') {
							$.gritter.add({
								title: 'El curso ya esta ingresado',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$('#txt_nombre_curso').val('');
						}
					}
				} else {
					$.gritter.add({
						title: 'Alcanzo límite de cursos permitidos',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
				}
			}
		});
		// fin

		// cargar datos a la tabla de cuentas
		$('#btn_cargar_cuentas').click(function() {
			var respuesta = $('#form_modal_cuentas').valid();
			var combo = document.getElementById("select_banco");
			var celdas = document.getElementById("tbt_cuentas").rows.length;
			var vector = new Array();
			var cont = 0;
			var repe = 0;

			if (respuesta == true) {
				if(celdas != '3') {
					$("#tbt_cuentas tbody tr").each(function (index) {                                                                 
			            $(this).children("td").each(function (index) {                               
			                switch (index) {                                            
			                    case 0:
			                    vector[cont] = $(this).text();   
			                    break;                                                                                                                               
			                }                                         
			            });
			            cont++;
			        });

			        for(var i=0 ; i<vector.length; i++) {
			            if(vector[i] == $('#select_cuenta').val()) {
			                repe++;
			            }
			        }

			        if(repe == '0') {
					var html_fila = '<tr>'
							+'<td>'+$('#select_cuenta').val()+'</td>'
							+'<td style="display: none;">'+$('#select_banco').val()+'</td>'
							+'<td>'+combo.options[combo.selectedIndex].text+'</td>'
							+'<td>'+$('#numero_cuenta').val()+'</td>'
							+'<td>'+"<div class='hidden-sm hidden-xs action-buttons'><a class='red dc_btn_accion2 tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick=\"angular.element(this).scope().methodseliminar2(event)\"></i></a></div>"+'</td>'
						+'</tr>'

					$('#tbt_cuentas tbody').append(html_fila);	
					$('#numero_cuenta').val('');
					$('#modal-cuentas-bancarias').modal('hide');
					llenar_select_bancos();
					$("#select_cuenta").select2('val', 'All');
					} else {
						if(repe == '1') {
							$.gritter.add({
								title: 'El tipo de cuenta ya esta ingresada',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$("#select_cuenta").select2('val', 'All');
						}
					}
				} else {
					$.gritter.add({
						title: 'Alcanzo límite de cuentas permitidas',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
				}
			}
		});
		// fin

		// id general
		function equipo(id) {
			var data_global;
			$.ajax({
				url: 'data/ficha_programas/app.php',
				type: 'post',
				dataType: 'json',
				data: {consultar_id_cargo:'consultar_id_cargo', id:id},
				async:false,
				success: function (data) {
					data_global = data.nombre
				}
			});
			return data_global;
		}
		// fin

		$('#modal-wizard-container').ace_wizard();
		$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
		
		$(document).one('ajaxloadstart.page', function (e) {
			//in ajax mode, remove remaining elements before leaving page
			$('[class*=select2]').remove();
		});
	})
});	