angular.module('scotchApp').controller('rolpagosController', function ($scope) {
	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
    // fin

	jQuery(function($) {	
		//$('#tiempo_horas').ace_spinner({value:0,min:0, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		$('#dias_laborados').ace_spinner({value:30,min:0,max:30,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		$('#extras').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#no_laborado').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});		
		$('#meses_anticipo').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#horas').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#dias').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		
		// formato archivo excel
		$('#archivo_excel').fileinput({
	        uploadUrl: '#',
	        uploadAsync: false,
	        minFileCount: 1,
	        maxFileCount: 20,
	        showUpload: true,
	        slugCallback: function(filename) {
	            return filename.replace('(', '_').replace(']', '_');
	        }
	    });
	    // fin

		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// fin

                //para la hora
		$("#tiempo_horas").datetimepicker({ 
			pickDate: false
		});
		// fin

		// estilo seelct2 
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });
		
		$("#select_empleado,#select_empleado1,#select_empleado2,#select_empleado3,#select_empleado4,#select_forma_pago,#select_banco,#select_parte,#select_motivo_cargos").select2({
		  allowClear: true
		});
		// fin

		// para la hora
		$("#hora_salida,#hora_retorno").datetimepicker({
	    	pickDate: false
	    });
	    // fin

		//inicio validacion roles
		$('#form_roles').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				id_empleado: {
					required: true				
				},
				txt_mes: {
					required: true				
				},
				extras: {
					required: true				
				},
				no_laborado: {
					required: true				
				},
				sueldo_basico: {
					required: true				
				},
				horas_extras: {
					required: true				
				},
				comisiones: {
					required: true				
				},
				decimo_tercero: {
					required: true				
				},
				decimo_cuarto: {
					required: true				
				},
				total_ingresos: {
					required: true				
				},
				aporte_iess: {
					required: true				
				},
				pres_quirografarios: {
					required: true				
				},
				pres_anticipos: {
					required: true				
				},
				atrasos: {
					required: true				
				},
				permisos: {
					required: true				
				},
				faltas: {
					required: true				
				},
				total_descuentos: {
					required: true				
				},
				neto_pagar: {
					required: true				
				},
			},
			messages: {
				id_empleado: {
					required: "Por favor, Seleccione un empleado",
				},
				txt_mes: {
					required: "Por favor, Indique una fecha",
				},
				extras: {
					required: "Por favor, Ingrese horas extras",
				},
				no_laborado: {
					required: "Por favor, Ingrese dias no laborados",
				},
				sueldo_basico: {
					required: "Por favor, Ingrese sueldo",
				},
				horas_extras: {
					required: "Por favor, Ingrese horas extras",
				},
				comisiones: {
					required: "Por favor, Ingrese comisiones",
				},
				decimo_tercero: {
					required: "Por favor, Ingrese décimo tercero",
				},
				decimo_cuarto: {
					required: "Por favor, Ingrese décimo cuarto",
				},
				total_ingresos: {
					required: "Por favor, Ingrese total ingresos",
				},
				aporte_iess: {
					required: "Por favor, Ingrese aporte iess",
				},
				pres_quirografarios: {
					required: "Por favor, Ingrese prestamo quirografário",
				},
				pres_anticipos: {
					required: "Por favor, Ingrese valor anticipos",
				},
				atrasos: {
					required: "Por favor, Ingrese valor atrasos",
				},
				permisos: {
					required: "Por favor, Ingrese valor permisos",
				},
				faltas: {
					required: "Por favor, Ingrese valor faltas",
				},
				total_descuentos: {
					required: "Por favor, Ingrese total descuentos",
				},
				neto_pagar: {
					required: "Por favor, Ingrese neto pagar",
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

		//inicio validacion anticipos
		$('#form_anticipos').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				serie_anticipo: {
					required: true				
				},
				select_empleado2: {
					required: true				
				},
				monto_anticipo: {
					required: true				
				},
				fecha_anticipo: {
					required: true				
				},
				meses_anticipo: {
					required: true				
				},
				select_forma_pago: {
					required: true				
				},
			},
			messages: {
				serie_anticipo: {
					required: "Por favor, Indique serie",
				},
				select_empleado2: {
					required: "Por favor, Seleccione un empleado",
				},
				monto_anticipo: {
					required: "Por favor, Ingrese un monto",
				},
				fecha_anticipo: {
					required: "Por favor, Seleccione un a fecha",
				},
				meses_anticipo: {
					required: "Por favor, Ingrese meses a diferir",
				},
				select_forma_pago: {
					required: "Por favor, Seleccione una forma de pago",
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

		//inicio validacion permisos
		$('#form_permisos').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				serie_permiso: {
					required: true				
				},
				ciudad: {
					required: true				
				},
				fecha_permiso: {
					required: true				
				},
				select_empleado3: {
					required: true				
				},
				select_empleado4: {
					required: true				
				},
				hora_salida: {
					required: true				
				},
				asunto: {
					required: true				
				},
				lugar: {
					required: true				
				},
				tiempo_salida: {
					required: true				
				},
				select_parte: {
					required: true				
				},
				select_motivo_cargos: {
					required: true				
				},
			},
			messages: {
				serie_permiso: {
					required: "Por favor, Indique serie",
				},
				ciudad: {
					required: "Por favor, Ingrese un ciudad",
				},
				fecha_permiso: {
					required: "Por favor, Indique fecha permiso",
				},
				select_empleado3: {
					required: "Por favor, Seleccione empleado solicitante",
				},
				select_empleado4: {
					required: "Por favor, Seleccione empleado dirigido",
				},
				hora_salida: {
					required: "Por favor, Indique hora salida",
				},
				asunto: {
					required: "Por favor, Indique el asunto",
				},
				lugar: {
					required: "Por favor, Ingrese el lugar",
				},
				tiempo_salida: {
					required: "Por favor, Ingrese el tiempo salida",
				},
				select_parte: {
					required: "Por favor, Seleccione una opción",
				},
				select_motivo_cargos: {
					required: "Por favor, Seleccione una opción",
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

		// funcion autocompletar la serie ro pagos
		function autocompletar() {
		    var temp = "";
		    var serie = $("#codigo_general").val();
		    for (var i = serie.length; i < 4; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo codigo rol
		function cargar_codigo() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {cargar_codigo_general:'cargar_codigo_general'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var codigo = data.codigo;
						var res = parseInt(codigo.substr(10, 30));
						res = res + 1;

						$("#codigo_general").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo_general").val(validado);
					} else {
						var res = parseInt(0);
						res = res + 1;

						$("#codigo_general").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo_general").val(validado);
					}
				}
			});
		}
		// fin

		// funcion autocompletar la serie anticipos
		function autocompletar_anticipos() {
		    var temp = "";
		    var serie = $("#serie_anticipo").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo anticipos
		function cargar_codigo_anticipos() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {cargar_codigo_anticipo:'cargar_codigo_anticipo'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var res = parseInt(data.serie_anticipo);
						res = res + 1;

						$("#serie_anticipo").val(res);
						var a = autocompletar_anticipos(res);
						var validado = a + "" + res;
						$("#serie_anticipo").val(validado);
					} else {
						var res = parseInt(0);
						res = res + 1;

						$("#serie_anticipo").val(res);
						var a = autocompletar_anticipos(res);
						var validado = a + "" + res;
						$("#serie_anticipo").val(validado);
					}
				}
			});
		}
		// fin

		// funcion autocompletar la serie permisos
		function autocompletar_permisos() {
		    var temp = "";
		    var serie = $("#serie_permiso").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo permisos
		function cargar_codigo_permisos() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {cargar_codigo_permisos:'cargar_codigo_permisos'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var res = parseInt(data.serie_permiso);
						res = res + 1;

						$("#serie_permiso").val(res);
						var a = autocompletar_permisos(res);
						var validado = a + "" + res;
						$("#serie_permiso").val(validado);
					} else {
						var res = parseInt(0);
						res = res + 1;

						$("#serie_permiso").val(res);
						var a = autocompletar_permisos(res);
						var validado = a + "" + res;
						$("#serie_permiso").val(validado);
					}
				}
			});
		}
		// fin

		//selectores anidados empleado
		// $("#select_empleado").change(function () {
	 //        $("#select_empleado option:selected").each(function () {
	 //            id = $(this).val();

	 //            $('#cargo').val('');
	 //            $('#sueldo').val('');
	 //            $('#codigo').val('');
	 //            // cargar sueldo - cargo
	 //            $.ajax({
		// 			url: 'data/rol_pagos/app.php',
		// 			type: 'post',
		// 			data: {llenar_cargos:'llenar_cargos',id: id},
		// 			dataType: 'json',
		// 			success: function (data) {
		// 				var cargo = data.cargo;
		// 				var sueldo = data.sueldo;
		// 				$('#cargo').val(cargo);
		// 				$('#sueldo').val(sueldo);
		// 			}
		// 		});
	 //            // fin

	 //            $.ajax({
		// 			url: 'data/rol_pagos/app.php',
		// 			type: 'post',
		// 			data: {cargar_codigo_secuencia:'cargar_codigo_secuencia',id: id},
		// 			dataType: 'json',
		// 			success: function (data) {
		// 				if(data != null) {
		// 					var hoy = new Date();
		// 					var dd = hoy.getDate();
		// 					var mm = hoy.getMonth() + 1; 
		// 					var anio = hoy.getFullYear();

		// 					if(dd < 10) {
		// 					    dd = '0' + dd;
		// 					} 

		// 					if(mm < 10) {
		// 					    mm = '0' + mm;
		// 					} 

		// 					var codigo = data.codigo;
		// 					var codigo_general = $('#codigo_general').val();
		// 					var cade = codigo.substr(0, 10);
		// 					var res = parseInt(cade.substr(9, 1));
		// 					res = res + 1;						
		// 					var anios = anio.toString().substr(2, 4);
		// 					var ini = codigo.substr(-7, 2);
		// 					var cadena = 'RDP' + mm + anios + ini + res + codigo_general;
		// 					$('#codigo').val(cadena);
		// 				} else {
		// 					$.ajax({
		// 						url: 'data/rol_pagos/app.php',
		// 						type: 'post',
		// 						data: {cargar_codigo_rol:'cargar_codigo_rol',id: id},
		// 						dataType: 'json',
		// 						success: function (data) {
		// 							if(data != null) {
		// 								var hoy = new Date();
		// 								var dd = hoy.getDate();
		// 								var mm = hoy.getMonth() + 1; 
		// 								var anio = hoy.getFullYear();

		// 								if(dd < 10) {
		// 								    dd = '0' + dd;
		// 								} 

		// 								if(mm < 10) {
		// 								    mm = '0' + mm;
		// 								} 

		// 								var codigo = data.codigo;
		// 								var codigo_general = $('#codigo_general').val();
		// 								var res = parseInt(1);
		// 								var anios = anio.toString().substr(2, 4);
		// 								var ini = codigo;
		// 								var cadena = 'RDP' + mm + anios + ini + res + codigo_general;
		// 								$('#codigo').val(cadena);	
		// 							}
		// 						}
		// 					});
		// 				}
		// 			}
		// 		});
		//     });
		// });
		// fin

		// validacion punto
		function Valida_punto() {
		    var key;
		    if (window.event) {
		        key = event.keyCode;
		    } else if (event.which) {
		        key = event.which;
		    }

		    if (key < 48 || key > 57) {
		        if (key === 46 || key === 8) {
		            return true;
		        } else {
		            return false;
		        }
		    }
		    return true;
		}
		// fin

		// funcion validar solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		// campos con validaciones
		//$("#tiempo_horas").keypress(ValidNum);
		$("#dias_laborados").keypress(ValidNum);
		$("#extras").keypress(ValidNum);
		$("#no_laborado").keypress(ValidNum);
		$("#serie_anticipo").keypress(ValidNum);
		$("#meses_anticipo").keypress(ValidNum);
		$("#cheque_numero").keypress(ValidNum);
		$("#serie_permiso").keypress(ValidNum);
		$("#horas").keypress(ValidNum);
		$("#dias").keypress(ValidNum);
		$("#sueldo").keypress(Valida_punto);
		$("#sueldo_basico").keypress(Valida_punto);
		$("#horas_extras").keypress(Valida_punto);
		$("#comisiones").keypress(Valida_punto);
		$("#decimo_tercero").keypress(Valida_punto);
		$("#decimo_cuarto").keypress(Valida_punto);
		$("#total_ingresos").keypress(Valida_punto);
		$("#aporte_iess").keypress(Valida_punto);
		$("#pres_quierografarios").keypress(Valida_punto);
		$("#pres_anticipos").keypress(Valida_punto);
		$("#atrasos").keypress(Valida_punto);
		$("#faltas").keypress(Valida_punto);
		$("#total_descuentos").keypress(Valida_punto);
		$("#neto_pagar").keypress(Valida_punto);
		$("#monto_anticipo").keypress(Valida_punto);
		// fin

		// Inicio llamado funciones procesos de inicio
		document.getElementById("codigo").readOnly = true; 
		document.getElementById("identificacion").readOnly = true; 
		document.getElementById("nombres_completos").readOnly = true; 
		llenar_select_empleado();
		llenar_select_empleado1();
		llenar_select_empleado2();
		llenar_select_empleado3();
		llenar_select_empleado4();
		llenar_select_bancos();
		cargar_codigo();
		cargar_codigo_anticipos();
		cargar_codigo_permisos();
		
		// llenar combo empleado
		function llenar_select_empleado() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado 1
		function llenar_select_empleado1() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado1').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado 2
		function llenar_select_empleado2() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado2').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado 3
		function llenar_select_empleado3() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado3').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado 4
		function llenar_select_empleado4() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado4').html(data);
				}
			});
		}
		// fin

		// lenar combo bancos
		function llenar_select_bancos() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_bancos:'llenar_bancos'},
				success: function (data) {
					$('#select_banco').html(data);
				}
			});
		}
		// 

		// procesos calculos
		$('#btn_calcular').click(function() {
			var respuesta = $('#form_roles').valid();
			if (respuesta == true) {
				calcular_rol();
			}
		});
		// fin

		// procesos calculos
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// imprimir 
		$('#btn_excel').click(function (){
			var myWindow = window.open('data/rol_pagos/phpexcel/rol_pagos_general.php');
		})
		// fin

		// limpiar tabla
		$('#btn_limpiar').click(function() {
			jQuery("#table").jqGrid('setGridParam',{url:"data/rol_pagos/xml_roles.php",page:1}).trigger("reloadGrid");
		});
		// fin

		// ventana emergente importar
		$('#btn_importar').click(function() {
			$('#modal-importar').modal('show');
		});
		// fin

		// cargar excel prodcutos
		$('#btn_excel').click(function() {
			var formObj = document.getElementById("form_excel");
			var formData = new FormData(formObj);
			var inicioMinutos = 0;
			var inicioHoras = 0;
			var transcurridoMinutos = 0;
			var transcurridoHoras = 0;

			$.ajax({
                url: "data/rol_pagos/cargar_excel.php",
                type: "POST",
                data:  formData,
                mimeType:"multipart/form-data",
                dataType: 'json',
                contentType: false,
                cache: false, 
                processData:false,
                success: function(data, textStatus, jqXHR) {
	    		    var suma = 0;
	                for(var i = 0; i<data.length; i+=13) {
	                	if(data[i+11] != '') {
	                		var tiempo = data[i+11];

		                	inicioMinutos = parseInt(tiempo.substr(3,2));
	  						inicioHoras = parseInt(tiempo.substr(0,2));


	  						transcurridoMinutos = transcurridoMinutos + inicioMinutos;
	  						transcurridoHoras = transcurridoHoras + inicioHoras;
		     //            	// suma =suma + data[i+15];

		                	if (transcurridoMinutos < 0) {
							    transcurridoHoras--;
							    transcurridoMinutos = 60 + transcurridoMinutos;
							}
							  
							horas = transcurridoHoras.toString();
							minutos = transcurridoMinutos.toString();
							  
							if (horas.length < 2) {
							    horas = "0"+horas;
							}
							  
							if (horas.length < 2) {
							    horas = "0"+horas;
							}
	                	}                	
	                }
	                // alert(transcurridoMinutos)
	                // alert(horas+":"+minutos);
		        }	        
		    });
		});
		// fin

		// realizar calculos
		function calcular_rol() {
			var sueldo = $('#sueldo').val();
			var horas = $('#tiempo_horas').val();
			var dias = $('#dias_laborados').val();
			var extras = $('#extras').val();
			var no_laborado = $('#no_laborado').val();

			var comisiones = $('#comisiones').val();

			var pres_quierografarios = $('#pres_quirografarios').val();
			var pres_anticipos = $('#pres_anticipos').val();
			var atrasos = $('#atrasos').val();
			var permisos = $('#permisos').val();
			var faltas = $('#faltas').val();

			var sueldo_basico = 0;
			var horas_extras = 0;
			var decimo_tercero = 0;
			var decimo_cuarto = 0;
			var total_ingresos = 0;
			var total_descuentos = 0;
			var neto_pagar = 0;
			var valor_no_laborado = 0;
			var aporte = 0;


                        var inicioMinutos = 0;
			var inicioHoras = 0;
			var transcurridoMinutos = 0;
			var totalminutos = 0;

                        //var tiempo = '02:45';

		        inicioMinutos = parseInt(horas.substr(2,4));
	  		inicioHoras = parseInt(horas.substr(0,2));
							  
			transcurridoMinutos = parseInt(inicioHoras * 60);
			totalminutos = parseInt(transcurridoMinutos + inicioMinutos);

                        console.log(inicioMinutos);console.log(inicioHoras);


			// calculo aporte iess
			if(horas >= 8 ) {
				aporte = ((sueldo * 9.45)/100).toFixed(3);
				$('#aporte_iess').val(aporte);
			} else {
				aporte = (((sueldo * 9.45)/100)/2).toFixed(3);
				$('#aporte_iess').val(aporte);
			}
			// fin

			// redondeos
			sueldo = parseFloat(sueldo).toFixed(3);
			$('#sueldo').val(sueldo);
			// fin

			// calculo sueldo basico
			sueldo_basico = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(dias)).toFixed(3);
			$('#sueldo_basico').val(sueldo_basico);
			// fin 

			// calculo horas extras
			horas_extras = (parseFloat(sueldo/15)/8 * parseFloat(extras)).toFixed(3);
			$('#horas_extras').val(horas_extras);
			// fin 

			// calculo decimo tercero
			decimo_tercero = ((parseFloat(sueldo/365)/8) * parseFloat(dias) * parseFloat(horas)).toFixed(3); 
			$('#decimo_tercero').val(decimo_tercero);
			// fin

			// calculo decimo cuarto
			decimo_cuarto = ((parseFloat(sueldo/365)/8) * parseFloat(dias) * parseFloat(horas)).toFixed(3); 
			$('#decimo_cuarto').val(decimo_cuarto);
			// fin 

			// calculo total ingresos
			total_ingresos = (parseFloat(sueldo_basico) + parseFloat(horas_extras) + parseFloat(comisiones) + parseFloat(decimo_tercero) + parseFloat(decimo_cuarto)).toFixed(3); 
			$('#total_ingresos').val(total_ingresos);
			//

			// calculo valor horas no trabajadas
			valor_no_laborado = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(no_laborado)).toFixed(3);
			$('#faltas').val(valor_no_laborado);
			// fin

			// calculo total descuentos
			total_descuentos = (parseFloat(aporte) + parseFloat(pres_quierografarios) + parseFloat(pres_anticipos) + parseFloat(atrasos) + parseFloat(permisos)).toFixed(3); 
			$('#total_descuentos').val(total_descuentos);
			// fin

			// calculo neto pagar
			neto_pagar = (total_ingresos - total_descuentos).toFixed(3);
			$('#neto_pagar').val(neto_pagar);
			// fin	
		}
		// fin

		// guardar rol pagos
		$('#btn_guardar_rol').click(function() {
			var respuesta = $('#form_roles').valid();

			if (respuesta == true) {
				var form_uno = $("#form_roles").serialize();
				var submit = "btn_guardar";

				$.ajax({
			        url: "data/rol_pagos/app.php",
			        data: form_uno+"&btn_guardar=" + submit,
			        type: "POST",
			        success: function (data) {
			        	var val = data;
			        	if(data != '') {
			        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
							  var myWindow = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
							  location.reload();
							});
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
		});
		// fin

		// guardar anticipos
		$('#btn_guardar_anticipo').click(function() {
			var respuesta = $('#form_anticipos').valid();

			if (respuesta == true) {
				var form_uno = $("#form_anticipos").serialize();
				var submit = "btn_guardar_anticipo";

				$.ajax({
			        url: "data/rol_pagos/app.php",
			        data: form_uno+"&btn_guardar_anticipo=" + submit,
			        type: "POST",
			        success: function (data) {
			        	var val = data;
			        	if(data != '') {
			        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
							  var myWindow = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
							  location.reload();
							});
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
		});
		// fin

		// guardar permisos
		$('#btn_guardar_permiso').click(function() {
			var respuesta = $('#form_permisos').valid();

			if (respuesta == true) {
				var form_uno = $("#form_permisos").serialize();
				var submit = "btn_guardar_permiso";

				$.ajax({
			        url: "data/rol_pagos/app.php",
			        data: form_uno+"&btn_guardar_permiso=" + submit,
			        type: "POST",
			        success: function (data) {
			        	var val = data;
			        	if(data != '') {
			        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
							  var myWindow = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
							  location.reload();
							});
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
		});
		// fin

		$('#btn_calcular_anticipos').click(function() {
			var s;
			var suma = 0;
			s = jQuery("#table3").jqGrid('getGridParam','selarrrow');
			
			for(var i= 0; i<s.length; i++) {
				var ids = s[i];
				var com = jQuery("#table3").jqGrid('getRowData',ids).monto_anticipo;
				suma = (parseFloat(suma) + parseFloat(com)).toFixed(3);
			}
			$('#pres_anticipos').val(suma);
			$("#table3").jqGrid('resetSelection');
			$('#myModal2').modal('hide');
		});

		// filtrar roles
		$('#btn_filtrar').click(function() {
			gridReload();
		});
		// fin
	});
	// fin

	// abrir en una nueva ventana reporte roles de pago
	$scope.methodspdf = function(id) { 
		var myWindow = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+id,'popup','width=900,height=650');
	} 
	// fin

	// abrir en una nueva ventana reporte roles de pago
	$scope.methodanticipos = function(id) { 
		var id_adelantos = id;

		$.ajax({
			url: 'data/rol_pagos/app.php',
			type: 'post',
			data: {llenar_informacion_anticipos:'llenar_informacion_anticipos',id: id_adelantos},
			dataType: 'json',
			success: function (data) {
				$("#serie span").remove();
				$("#fecha span").remove();
				$("#nombres b").remove();
				$("#cedula b").remove();
				$("#cargo_anticipo b").remove();
				$("#total_monto span").remove();
				$("#monto b").remove();
				$("#mes_anticipo b").remove();
				$("#elaborado_por b").remove();
				$("#ci_elaborado p").remove();
				$("#solicitado_por b").remove();
				$("#ci_solicitado p").remove();
				$("#cheque_anticipo b").remove();
				$("#banco_anticipo b").remove();
				$("#cuenta_anticipo b").remove();

				$('#serie').append($('<span>').text('N° ' + data.serie_anticipo));
				$('#fecha').append($('<span>').text(data.fecha_anticipo));
				$('#nombres').append($('<b>').text(data.nombres_completos));
				$('#cedula').append($('<b>').text(data.cedula_identificacion));
				$('#cargo_anticipo').append($('<b>').text(data.nombre));
				$('#total_monto').append($('<span>').text(data.monto_anticipo));
				$('#monto').append($('<b>').text('$'+data.monto_anticipo));
				$('#mes_anticipo').append($('<b>').text(data.meses_anticipo));

				if(data.forma_pago == 'EFECTIVO') {
					document.getElementById("check_efectivo").checked = true;
				} else {
					document.getElementById("check_efectivo").checked = false;
				}

				if(data.forma_pago == 'CHEQUE') {
					document.getElementById("check_cheque").checked = true;
				} else {
					document.getElementById("check_cheque").checked = false;
				}

				if(data.forma_pago == 'TARJETA') {
					document.getElementById("check_tarjeta").checked = true;
				} else {
					document.getElementById("check_tarjeta").checked = false;
				}

				if(data.forma_pago == 'DEPÓSITO') {
					document.getElementById("check_deposito").checked = true;
				} else {
					document.getElementById("check_deposito").checked = false;
				}

				if(data.forma_pago == 'TRANSFERENCIA') {
					document.getElementById("check_tranferencia").checked = true;
				} else {
					document.getElementById("check_tranferencia").checked = false;
				}

				$('#cheque_anticipo').append($('<b>').text(data.cheque_numero));
				$('#cuenta_anticipo').append($('<b>').text(data.cuenta_anticipo));

				$('#elaborado_por').append($('<b>').text(data.nombres_usuario));
				$('#ci_elaborado').append($('<p>').text('C.I.'+data.cedula));

				$('#solicitado_por').append($('<b>').text(data.nombres_completos));
				$('#ci_solicitado').append($('<p>').text('C.I.'+data.cedula_identificacion));

				if(data.id_bancos != 'null') {
					var id_bancos = data.id_bancos;

					$.ajax({
						url: 'data/rol_pagos/app.php',
						type: 'post',
						data: {llenar_informacion_bancos:'llenar_informacion_bancos',id: id_bancos},
						dataType: 'json',
						success: function (data) {
							$('#banco_anticipo').append($('<b>').text(data.banco));
						}
					});		
				}
			}
		});

		$('#modal-anticipos').modal('show');
	} 
	// fin

	$scope.methodpermisos = function(id) {
		var id_permisos = id;

		$.ajax({
			url: 'data/rol_pagos/app.php',
			type: 'post',
			data: {llenar_informacion_permisos:'llenar_informacion_permisos',id: id_permisos},
			dataType: 'json',
			success: function (data) {
				$("#p_serie_permiso span").remove();
				$("#p_permiso span").remove();
				$("#p_dirigido b").remove();
				$("#p_yo b").remove();
				$("#p_horas b").remove();
				$("#p_dias b").remove();
				$("#b_hora_salida b").remove();
				$("#p_retorno b").remove();
				$("#p_tiempo_salida b").remove();
				$("#p_asunto b").remove();
				$("#p_lugar b").remove();
				$("#p_solicitante b").remove();
				$("#p_cedula b").remove();
				$("#p_talento b").remove();
				$("#p_cedula_talento b").remove();

				$('#p_serie_permiso').append($('<span>').text('N° ' + data.serie_permiso));
				$('#p_permiso').append($('<span>').text(data.fecha_permiso));
				$('#p_dirigido').append($('<b>').text(data.nombres_usuario));
				$('#p_yo').append($('<b>').text(data.nombre_solicitante));
				$('#p_horas').append($('<b>').text(data.horas));
				$('#p_dias').append($('<b>').text(data.dias));
				$('#b_hora_salida').append($('<b>').text(data.hora_salida));
				$('#p_retorno').append($('<b>').text(data.hora_retorno));

				if(data.regreso == 'SI') {
					document.getElementById("p_regreso").checked = true;
				} else {
					document.getElementById("p_regreso").checked = false;
				}

				$('#p_tiempo_salida').append($('<b>').text(data.tiempo_salida));
				$('#p_asunto').append($('<b>').text(data.asunto));
				$('#p_lugar').append($('<b>').text(data.lugar));

				if(data.parte_de == 'COMISIÓN OFICIAL') {
					document.getElementById("check_comision_oficial").checked = true;
				} else {
					document.getElementById("check_comision_oficial").checked = false;
				}

				if(data.parte_de == 'ASUNTO PARTICULAR') {
					document.getElementById("check_asunto_particular").checked = true;
				} else {
					document.getElementById("check_asunto_particular").checked = false;
				}

				if(data.cargos_a == 'DESCUENTOS') {
					document.getElementById("check_descuentos").checked = true;
				} else {
					document.getElementById("check_descuentos").checked = false;
				}

				if(data.cargos_a == 'VACACIONES') {
					document.getElementById("check_vacaciones").checked = true;
				} else {
					document.getElementById("check_vacaciones").checked = false;
				}

				if(data.cargos_a == 'NINGUNO') {
					document.getElementById("check_ninguno").checked = true;
				} else {
					document.getElementById("check_ninguno").checked = false;
				}

				$('#p_solicitante').append($('<b>').text(data.nombre_solicitante));
				$('#p_cedula').append($('<b>').text('C.I.' + data.cedula_solicitante));
				$('#p_talento').append($('<b>').text(data.nombres_usuario));
				$('#p_cedula_talento').append($('<b>').text('C.I.'+data.cedula));
			}
		});

		$('#modal-permisos').modal('show');
	} 

	// abrir en una nueva ventana reporte guardar roles
	$scope.methodspdfguardar = function(id) { 
	// var win;
	var win = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+id,'popup','width=900,height=650');
	// win.document.execCommand("SaveAs");
	// win.close();
		// var myWindow = window.location.assign('data/reportes/rol_pagos.php?hoja=A5&id='+id,'popup','width=900,height=650','PDF');
		// myWindow.focus();
		// myWindow.print();

	} 
	// fin

	function gridReload(){
		var id_personal = $('#select_empleado1').val();
		var fecha_inicio = $('#fecha_inicio').val();
		var fecha_fin = $('#fecha_fin').val();
		jQuery("#table").jqGrid('setGridParam',{url:"data/rol_pagos/xml_empleados.php?id_personal="+id_personal+"&fecha_inicio="+fecha_inicio+"&fecha_fin="+fecha_fin,page:1}).trigger("reloadGrid");
	}
	
	/*jqgrid*/    
	jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {	        
	        $(grid_selector).jqGrid( 'setGridWidth', $("#container").width()-30);
	    });
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    });

	    // buscador clientes
	    jQuery(grid_selector).jqGrid({	        
	        datatype: "xml",
	        url: 'data/rol_pagos/xml_roles.php',
	        colNames: ['ID','CÓDIGO ROL','IDENTIDICACIÓN','NOMBRES COMPLETOS','DIRECCIÓN','FECHA EMISIÓN','NETO PAGAR','REPORTE'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'codigo',index:'codigo',frozen : true,align:'left',search:true,width: ''},
	            {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true,align:'left',search:true,width: ''},
	            {name:'nombres',index:'nombres',frozen : true,align:'left',search:true,width: '400px'},
	            {name:'direccion',index:'direccion',frozen : true,align:'left',search:false,width: '300px', hidden: false},
	            {name:'fecha_emision',index:'fecha_emision',frozen : true,align:'left',search:false,width: ''},
	            {name:'neto_pagar',index:'neto_pagar',frozen : true,align:'left',search:false},
	            {name:'accion',index:'accion',frozen : true,align:'center',search:false,width: '100px'},
	        ],          
	        rowNum: 10,       
	        width:null,
	        shrinkToFit: false,
	        height:330,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id',
	        sortorder: 'desc',
	        altRows: true,
	        multiselect: false,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function(){
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        gridComplete: function() {
				var ids = jQuery(grid_selector).jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					var id_rol = ids[i];
					pdf_abrir = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_rol+"')\" title='Abrir PDF'><i class='fa fa-file-pdf-o green' style='cursor:pointer; cursor: hand'></i></a>"; 
					pdf_guardar = "<a onclick=\"angular.element(this).scope().methodspdfguardar('"+id_rol+"')\" title='Guardar PDF'><i class='fa fa-save green' style='cursor:pointer; cursor: hand'></i></a>"; 
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:pdf_abrir +'    '+ pdf_guardar});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);	            
	        },
	        caption: "LISTA ROLES DE PAGO"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
	    {   //navbar options
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: false,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon : 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;      
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form); 
	            form.data('styled', true);
	        },
	        onClick : function(e) {}
	    },
	    {
	        recreateForm: true,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        },

	        //multipleSearch: true
	        overlay: false,
	        sopt: ['eq', 'cn'],
            defaultSearch: 'eq',            	       
	      },
	    {
	        //view record form
	        recreateForm: true,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    })	    
	    function style_edit_form(form) {
	        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

	        //update buttons classes
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	        buttons = form.next().find('.navButton a');
	        buttons.find('.ui-icon').hide();
	        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	    }

	    function style_delete_form(form) {
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	    }
	    
	    function style_search_filters(form) {
	        form.find('.delete-rule').val('X');
	        form.find('.add-rule').addClass('btn btn-xs btn-primary');
	        form.find('.add-group').addClass('btn btn-xs btn-success');
	        form.find('.delete-group').addClass('btn btn-xs btn-danger');
	    }
	    function style_search_form(form) {
	        var dialog = form.closest('.ui-jqdialog');
	        var buttons = dialog.find('.EditTable')
	        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	    }
	    
	    function beforeDeleteCallback(e) {
	        var form = $(e[0]);
	        if(form.data('styled')) return false; 
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_delete_form(form);
	        form.data('styled', true);
	    }
	    
	    function beforeEditCallback(e) {
	        var form = $(e[0]);
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_edit_form(form);
	    }

	    function styleCheckbox(table) {}
	    

	    function updateActionIcons(table) {}
	    
	    function updatePagerIcons(table) {
	        var replacement = 
	            {
	            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	        };
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	            var icon = $(this);
	            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	        })
	    }

	    function enableTooltips(table) {
	        $('.navtable .ui-pg-button').tooltip({container:'body'});
	        $(table).find('.ui-pg-div').tooltip({container:'body'});
	    }

	    $(document).one('ajaxloadstart.page', function(e) {
	        $(grid_selector).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	});
	// fin

	/*jqgrid 2*/    
	jQuery(function($) {
	    var grid_selector2 = "#table2";
	    var pager_selector2 = "#pager2";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {        
	        $(grid_selector2).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
	    });
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector2).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector2).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    });

	    // buscador empresa
	    jQuery(grid_selector2).jqGrid({	        
	        datatype: "xml",
	        url: 'data/rol_pagos/xml_personal.php',        
	        colNames: ['ID','IDENTIFICACIÓN','NOMBRES COMOPLETOS','CÓDIGO FICHA','TEL. FIJO','TEL. CEULAR','DIRECCIÓN','SUELDO','HORAS. LABORAR','IMAGEN'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'nombres_completos',index:'nombres_completos',frozen : true, hidden: false, align:'left',search:true,width: '300px'},
	            {name:'codigo_ficha',index:'codigo_ficha',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'telf_fijo',index:'telf_fijo',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'telf_celular',index:'telf_celular',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'direccion',index:'direccion',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'sueldo',index:'sueldo',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'horas_laborar',index:'horas_laborar',frozen : true, hidden: true, align:'left',search:false,width: ''},
	            {name:'imagen',index:'imagen',frozen : true, hidden: true, align:'left',search:false,width: ''},
	        ], 
	        rownumbers: true,         
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
	        rowList: [10,20,30],
	        pager: pager_selector2,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
	        multiboxonly: true,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function(){
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector2).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector2).jqGrid('getRowData',gsr);
            	var id = ret.id;

            	$('#id_empleado').val(id);
            	$('#identificacion').val(ret.cedula_identificacion);
            	$('#nombres_completos').val(ret.nombres_completos);
            	$('#sueldo').val(ret.sueldo);
            	$('#tiempo_horas').val(ret.horas_laborar);
            	$("#avatar").attr("src","data/fotos_personal/imagenes/"+ret.imagen);

            	$.ajax({
					url: 'data/rol_pagos/app.php',
					type: 'post',
					data: {llenar_cargos:'llenar_cargos',id: id},
					dataType: 'json',
					success: function (data) {
						var cargo = data.cargo;
						$('#cargo').val(cargo);
					}
				});

				$.ajax({
					url: 'data/rol_pagos/app.php',
					type: 'post',
					data: {cargar_codigo_secuencia:'cargar_codigo_secuencia',id: id},
					dataType: 'json',
					success: function (data) {
						if(data != null) {
							var hoy = new Date();
							var dd = hoy.getDate();
							var mm = hoy.getMonth() + 1; 
							var anio = hoy.getFullYear();

							if(dd < 10) {
							    dd = '0' + dd;
							} 

							if(mm < 10) {
							    mm = '0' + mm;
							} 

							var codigo = data.codigo;
							var codigo_general = $('#codigo_general').val();
							var cade = codigo.substr(0, 10);
							var res = parseInt(cade.substr(9, 1));
							res = res + 1;						
							var anios = anio.toString().substr(2, 4);
							var ini = codigo.substr(-7, 2);
							var cadena = 'RDP' + mm + anios + ini + res + codigo_general;
							$('#codigo').val(cadena);
						} else {
							$.ajax({
								url: 'data/rol_pagos/app.php',
								type: 'post',
								data: {cargar_codigo_rol:'cargar_codigo_rol',id: id},
								dataType: 'json',
								success: function (data) {
									if(data != null) {
										var hoy = new Date();
										var dd = hoy.getDate();
										var mm = hoy.getMonth() + 1; 
										var anio = hoy.getFullYear();

										if(dd < 10) {
										    dd = '0' + dd;
										} 

										if(mm < 10) {
										    mm = '0' + mm;
										} 

										var codigo = data.codigo;
										var codigo_general = $('#codigo_general').val();
										var res = parseInt(1);
										var anios = anio.toString().substr(2, 4);
										var ini = codigo;
										var cadena = 'RDP' + mm + anios + ini + res + codigo_general;
										$('#codigo').val(cadena);	
									}
								}
							});
						}
					}
				});

	            $('#myModal').modal('hide'); 
	            $('#no_laborado').val('0');
	            $('#sueldo_basico').val('0.000');
	            $('#extras').val('0');
	            $('#horas_extras').val('0.000');
	            $('#comisiones').val('0.000');
	            $('#decimo_tercero').val('0.000');
	            $('#decimo_cuarto').val('0.000');
	            $('#total_ingresos').val('0.000');
	            $('#aporte_iess').val('0.000');
	            $('#pres_quirografarios').val('0.000');
	            $('#pres_anticipos').val('0.000');
	            $('#atrasos').val('0.000');
	            $('#permisos').val('0.000');
	            $('#faltas').val('0.000');
	            $('#total_descuentos').val('0.000');
	            $('#neto_pagar').val('0.000');	            
	        },
	        
	        caption: "LISTA PERSONAL"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector2).jqGrid('navGrid',pager_selector2,
	    {   
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: true,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon : 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;      
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form); 
	            form.data('styled', true);
	        },
	        onClick : function(e) {}
	    },
	    {
	        recreateForm: true,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        },

	        //multipleSearch: true
	        overlay: false,
	        sopt: ['eq', 'cn'],
            defaultSearch: 'eq',            	       
	      },
	    {
	        //view record form
	        recreateForm: true,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    })	    
	    function style_edit_form(form) {
	        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

	        //update buttons classes
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	        buttons = form.next().find('.navButton a');
	        buttons.find('.ui-icon').hide();
	        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	    }

	    function style_delete_form(form) {
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	    }
	    
	    function style_search_filters(form) {
	        form.find('.delete-rule').val('X');
	        form.find('.add-rule').addClass('btn btn-xs btn-primary');
	        form.find('.add-group').addClass('btn btn-xs btn-success');
	        form.find('.delete-group').addClass('btn btn-xs btn-danger');
	    }
	    function style_search_form(form) {
	        var dialog = form.closest('.ui-jqdialog');
	        var buttons = dialog.find('.EditTable')
	        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	    }
	    
	    function beforeDeleteCallback(e) {
	        var form = $(e[0]);
	        if(form.data('styled')) return false; 
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_delete_form(form);
	        form.data('styled', true);
	    }
	    
	    function beforeEditCallback(e) {
	        var form = $(e[0]);
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_edit_form(form);
	    }

	    function styleCheckbox(table) {}
	    
	    function updateActionIcons(table) {}
	    
	    function updatePagerIcons(table) {
	        var replacement = 
	            {
	            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	        };
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	            var icon = $(this);
	            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	        })
	    }

	    function enableTooltips(table) {
	        $('.navtable .ui-pg-button').tooltip({container:'body'});
	        $(table).find('.ui-pg-div').tooltip({container:'body'});
	    }

	    $(document).one('ajaxloadstart.page', function(e) {
	        $(grid_selector2).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	});
	// fin

	/*jqgrid 3*/    
	jQuery(function($) {
	    var grid_selector3 = "#table3";
	    var pager_selector3 = "#pager3";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {        
	        $(grid_selector3).jqGrid( 'setGridWidth', $("#myModal2 .modal-dialog").width()-30);
	    });
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector3).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector3).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    });

	    // buscador empresa
	    jQuery(grid_selector3).jqGrid({	        
	        datatype: "xml",
	        url: 'data/rol_pagos/xml_anticipos.php',        
	        colNames: ['ID','SERIE ANTICIPOS','MONTO ANTICIPO','FECHA ANTICIPO','MESES','FORMA PAGO','VISUALIZAR'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'serie_anticipo',index:'serie_anticipo',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'monto_anticipo',index:'monto_anticipo',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'fecha_anticipo',index:'fecha_anticipo',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'meses_anticipo',index:'meses_anticipo',frozen : true, hidden: false, align:'left',search:false,width: '80px'},
	            {name:'forma_pago',index:'forma_pago',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'visualizar',index:'visualizar',frozen : true, hidden: false, align:'center',search:false,width: '120px'},
	        ],
	        rownumbers: true,        
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
	        rowList: [10,20,30],
	        pager: pager_selector3,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: true,
	        multiboxonly: true,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function(){
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        gridComplete: function() {
				var ids = jQuery(grid_selector3).jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					var id_anticipos = ids[i];
					visualizar = "<a onclick=\"angular.element(this).scope().methodanticipos('"+id_anticipos+"')\" title='Abrir PDF'><i class='fa fa-eye green' style='cursor:pointer; cursor: hand'></i></a>"; 
					jQuery(grid_selector3).jqGrid('setRowData',ids[i],{visualizar:visualizar});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector3).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector3).jqGrid('getRowData',gsr);
            	var id = ret.id;

	            // $('#myModal2').modal('hide');            
	        },
	        
	        caption: "LISTA ANTICIPOS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector3).jqGrid('navGrid',pager_selector3,
	    {   
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: true,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon : 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;      
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form); 
	            form.data('styled', true);
	        },
	        onClick : function(e) {}
	    },
	    {
	        recreateForm: true,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        },

	        //multipleSearch: true
	        overlay: false,
	        sopt: ['eq', 'cn'],
            defaultSearch: 'eq',            	       
	      },
	    {
	        //view record form
	        recreateForm: true,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    })	    
	    function style_edit_form(form) {
	        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

	        //update buttons classes
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	        buttons = form.next().find('.navButton a');
	        buttons.find('.ui-icon').hide();
	        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	    }

	    function style_delete_form(form) {
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	    }
	    
	    function style_search_filters(form) {
	        form.find('.delete-rule').val('X');
	        form.find('.add-rule').addClass('btn btn-xs btn-primary');
	        form.find('.add-group').addClass('btn btn-xs btn-success');
	        form.find('.delete-group').addClass('btn btn-xs btn-danger');
	    }
	    function style_search_form(form) {
	        var dialog = form.closest('.ui-jqdialog');
	        var buttons = dialog.find('.EditTable')
	        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	    }
	    
	    function beforeDeleteCallback(e) {
	        var form = $(e[0]);
	        if(form.data('styled')) return false; 
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_delete_form(form);
	        form.data('styled', true);
	    }
	    
	    function beforeEditCallback(e) {
	        var form = $(e[0]);
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_edit_form(form);
	    }

	    function styleCheckbox(table) {}
	    
	    function updateActionIcons(table) {}
	    
	    function updatePagerIcons(table) {
	        var replacement = 
	            {
	            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	        };
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	            var icon = $(this);
	            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	        })
	    }

	    function enableTooltips(table) {
	        $('.navtable .ui-pg-button').tooltip({container:'body'});
	        $(table).find('.ui-pg-div').tooltip({container:'body'});
	    }

	    $(document).one('ajaxloadstart.page', function(e) {
	        $(grid_selector3).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	});
	// fin

	/*jqgrid 4*/    
	jQuery(function($) {
	    var grid_selector4 = "#table4";
	    var pager_selector4 = "#pager4";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {        
	        $(grid_selector4).jqGrid( 'setGridWidth', $("#myModal3 .modal-dialog").width()-30);
	    });
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector4).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector4).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    });

	    // buscador empresa
	    jQuery(grid_selector4).jqGrid({	        
	        datatype: "xml",
	        url: 'data/rol_pagos/xml_permisos.php',        
	        colNames: ['ID','SERIE PERMISOS','FECHA PERMISO','HORAS','DÍAS','HORA SALIDA','REGRESO','HORA RETORNO','TIEMPO SALIDA','ASUNTO','PARTE DE','CARGOS A','VISUALIZAR'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'serie_permiso',index:'serie_permiso',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'fecha_permiso',index:'fecha_permiso',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'horas',index:'horas',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'dias',index:'dias',frozen : true, hidden: false, align:'left',search:false,width: '80px'},
	            {name:'hora_salida',index:'hora_salida',frozen : true, hidden: true, align:'left',search:false,width: ''},
	            {name:'regreso',index:'regreso',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'hora_retorno',index:'hora_retorno',frozen : true, hidden: false, align:'center',search:false,width: ''},
	            {name:'tiempo_salida',index:'tiempo_salida',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'asunto',index:'asunto',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'parte_de',index:'parte_de',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'cargos_a',index:'cargos_a',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'visualizar',index:'visualizar',frozen : true, hidden: false, align:'center',search:false,width: '120px'},
	        ],
	        rownumbers: true,        
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
	        rowList: [10,20,30],
	        pager: pager_selector4,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: true,
	        multiboxonly: true,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function(){
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        gridComplete: function() {
				var ids = jQuery(grid_selector4).jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					var id_permisos = ids[i];
					visualizar = "<a onclick=\"angular.element(this).scope().methodpermisos('"+id_permisos+"')\" title='Abrir PDF'><i class='fa fa-eye green' style='cursor:pointer; cursor: hand'></i></a>"; 
					jQuery(grid_selector4).jqGrid('setRowData',ids[i],{visualizar:visualizar});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector4).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector4).jqGrid('getRowData',gsr);
            	var id = ret.id;

	            // $('#myModal2').modal('hide');            
	        },
	        
	        caption: "LISTA PERMISOS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector4).jqGrid('navGrid',pager_selector4,
	    {   
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: true,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon : 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;      
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form); 
	            form.data('styled', true);
	        },
	        onClick : function(e) {}
	    },
	    {
	        recreateForm: true,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        },

	        //multipleSearch: true
	        overlay: false,
	        sopt: ['eq', 'cn'],
            defaultSearch: 'eq',            	       
	      },
	    {
	        //view record form
	        recreateForm: true,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    })	    
	    function style_edit_form(form) {
	        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

	        //update buttons classes
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	        buttons = form.next().find('.navButton a');
	        buttons.find('.ui-icon').hide();
	        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	    }

	    function style_delete_form(form) {
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	    }
	    
	    function style_search_filters(form) {
	        form.find('.delete-rule').val('X');
	        form.find('.add-rule').addClass('btn btn-xs btn-primary');
	        form.find('.add-group').addClass('btn btn-xs btn-success');
	        form.find('.delete-group').addClass('btn btn-xs btn-danger');
	    }
	    function style_search_form(form) {
	        var dialog = form.closest('.ui-jqdialog');
	        var buttons = dialog.find('.EditTable')
	        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	    }
	    
	    function beforeDeleteCallback(e) {
	        var form = $(e[0]);
	        if(form.data('styled')) return false; 
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_delete_form(form);
	        form.data('styled', true);
	    }
	    
	    function beforeEditCallback(e) {
	        var form = $(e[0]);
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_edit_form(form);
	    }

	    function styleCheckbox(table) {}
	    
	    function updateActionIcons(table) {}
	    
	    function updatePagerIcons(table) {
	        var replacement = 
	            {
	            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	        };
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	            var icon = $(this);
	            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	        })
	    }

	    function enableTooltips(table) {
	        $('.navtable .ui-pg-button').tooltip({container:'body'});
	        $(table).find('.ui-pg-div').tooltip({container:'body'});
	    }

	    $(document).one('ajaxloadstart.page', function(e) {
	        $(grid_selector4).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	});
	// fin
});

