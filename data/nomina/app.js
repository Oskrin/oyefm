angular.module('scotchApp').controller('nominaController', function ($scope) {
	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab === tabNum;
    };
    // fin

	jQuery(function($) {	
		$('#dias_laborados').ace_spinner({value:30,min:0,max:30,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		$('#extras').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#no_laborado').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});		
		$('#horas').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#dias').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#cantidad').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		
		$("#acumulable").prop("checked",false);
		$("#facturable").prop("checked",false);
		
		$('[data-rel=tooltip]').tooltip();
		var $validation = true;
		$('#fuelux-wizard-container').ace_wizard({
			//step: 2 //optional argument. wizard will jump to step "2" at first
			//buttons: '.wizard-actions:eq(0)'
		})
		.on('actionclicked.fu.wizard' , function(e, info) {
			if(info.step == 1 && $validation) {
				if(!$('#form_personal').valid()) e.preventDefault();
				gridReload_anticipos();
			}
			if(info.step == 2 && $validation) {
				if(!$('#form_anticipos').valid()) e.preventDefault();
				gridReload_permisos();	
			}
			if(info.step == 3 && $validation) {
				if(!$('#form_permisos').valid()) e.preventDefault();
			}
			if(info.step == 4 && $validation) {
				if(!$('#form_multas').valid()) e.preventDefault();
				calcular_anticipos();
				calcular_permisos();
				calcular_rol();
			}
			if(info.step == 5 && $validation) {
				if(!$('#form_datos').valid()) e.preventDefault();

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

		// buscador registro
		$("#buscador").keyup(function() {
		    var campo = $('#buscador').val();
			jQuery("#table2").jqGrid('setGridParam',{url:"data/nomina/xml_personal.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// listar registro
		$("#btn_listar").click(function(){
			$('#buscador').val('');
		    var campo = $('#buscador').val();
			jQuery("#table2").jqGrid('setGridParam',{url:"data/nomina/xml_personal.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

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
			pickDate: false,
			format: 'HH:mm'
		});
		// fin

		// estilo select2 
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });
		
		$("#select_mes,#select_tipo_multa,#select_tipo_servicio").select2({
		  allowClear: true
		});
		// fin

		//inicio validacion roles
		$('#form_personal').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				id_empleado: {
					required: true				
				},
				select_mes: {
					required: true				
				},
				asignar_comisiones: {
					required: true				
				},
				multas_atrasos: {
					required: true				
				},
				prestamos: {
					required: true				
				},
			},
			messages: {
				id_empleado: {
					required: "Por favor, Seleccione un empleado",
				},
				select_mes: {
					required: "Por favor, Seleccione un mes",
				},
				asignar_comisiones: {
					required: "Por favor, Campo Requerido",
				},
				multas_atrasos: {
					required: "Por favor, Campo Requerido",
				},
				prestamos: {
					required: "Por favor, Campo Requerido",
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

		// funcion autocompletar
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
				url: 'data/nomina/app.php',
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

		$("#dias_laborados").keypress(ValidNum);
		$("#extras").keypress(ValidNum);
		$("#no_laborado").keypress(ValidNum);
		$("#cantidad").keypress(ValidNum);

		$("#horas").keypress(ValidNum);
		$("#dias").keypress(ValidNum);
		$("#asignar_comisiones").keypress(Valida_punto);
		$("#multas_atrasos").keypress(Valida_punto);
		$("#prestamos").keypress(Valida_punto);
		$("#sueldo").keypress(Valida_punto);
		$("#sueldo_basico").keypress(Valida_punto);
		$("#horas_extras").keypress(Valida_punto);
		$("#comisiones").keypress(Valida_punto);
		$("#decimo_tercero").keypress(Valida_punto);
		$("#decimo_cuarto").keypress(Valida_punto);
		$("#total_ingresos").keypress(Valida_punto);
		$("#aporte_iess").keypress(Valida_punto);
		$("#pres_quirografarios").keypress(Valida_punto);
		$("#pres").keypress(Valida_punto);
		$("#anti").keypress(Valida_punto);
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
		cargar_codigo(); 
		llenar_select_empleado();
		llenar_select_multa();
		llenar_select_servicio();

		// llenar combo tipo servicio
		function llenar_select_servicio() {
			$.ajax({
				url: 'data/nomina/app.php',
				type: 'post',
				data: {llenar_servicio:'llenar_servicio'},
				success: function (data) {
					$('#select_tipo_servicio').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado
		function llenar_select_empleado() {
			$.ajax({
				url: 'data/nomina/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
				}
			});
		}
		// fin

		// llenar combo tipo multa
		function llenar_select_multa() {
			$.ajax({
				url: 'data/nomina/app.php',
				type: 'post',
				data: {llenar_multa:'llenar_multa'},
				success: function (data) {
					$('#select_tipo_multa').html(data);
				}
			});
		}
		// fin

		// eliminar tr tabla multas
		$scope.methodseliminar = function() { 
			var valor_multa = 0;
			var total_multa = 0;

			$("a.dc_btn_accion").click(function() {
				$(this).parents("tr").fadeOut("normal", function() {
					$(this).children("td").each(function (index) {
		                switch (index) {
			                case 4:  
			                    valor_multa = $(this).text();
			                    total_multa = (parseFloat($("#multas").val()) - parseFloat(valor_multa)).toFixed(2);                   
			                break;
		             	}
	          		});

	          		$('#multas').val(total_multa);
		        	$(this).remove(); 
		        }); 
			});
		} 
		// fin

		// agrgar multas
		function agregar_multas() {
			var celdas = document.getElementById("tbt_multas").rows.length;
			var vector = new Array();
			var cont = 0;
			var repe = 0;
			var id = $("#select_tipo_multa").val();
			var total_multa = 0;
			var total_total = 0;
			var valor_multa = 0;
			
			if($('#select_tipo_multa').val() == '') {
				$.gritter.add({
					title: 'Seleccione Tipo Multa',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				if($('#cantidad').val() == '') {
					$.gritter.add({
						title: 'Ingrese una cantida',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});	
				} else {
					$.ajax({
						url: 'data/nomina/app.php',
						type: 'post',
						data: {consultar_multas:'consultar_multas', id:id},
						dataType: 'json',
						success: function (data) {
							$("#tbt_multas tbody tr").each(function (index) {                                                                 
					            $(this).children("td").each(function (index) {                               
					                switch (index) {                                            
					                    case 0:
					                    vector[cont] = $(this).text();   
					                    break;                                                                                                                               
					                }                                         
					            });
					            cont++;
					        });

					        for(var i = 0 ; i < vector.length; i++) {
					            if(vector[i] == id) {
					                repe++;
					            }
					        }

					        if(repe == '0') {
							    valor_multa = parseFloat($('#cantidad').val() *  data.monto_multa).toFixed(2);

								var html_fila = '<tr>'
										+'<td style="display: none;">'+data.id+'</td>'
										+'<td>'+ data.descripcion +'</td>'
										+'<td>'+ $('#descripcion').val()+ '</td>'
										+'<td>'+ $('#cantidad').val() +'</td>'
										+'<td>'+ valor_multa +'</td>'
										+'<td>'+"<div class='hidden-sm hidden-xs action-buttons'><a class='red dc_btn_accion tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick=\"angular.element(this).scope().methodseliminar(event)\"></i></a></div>"+'</td>'
									+'</tr>';

								$('#tbt_multas tbody').append(html_fila);
								$("#select_tipo_multa").select2('val', 'All');	
								$('#cantidad').val(0);
								$('#descripcion').val('');
								
								total_multa = (parseFloat($("#multas").val()) + parseFloat(valor_multa)).toFixed(2);
								$('#multas').val(total_multa);
							} else {
								if(repe == '1') {
									$.gritter.add({
										title: 'La multa ya esta Ingresada',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});
									$('#select_tipo_multa').select2('val', 'All');
								}
							}		
						}
					});	
				}	
			}		
		} 
		// fin

		// cargar datos a la tabla de multas
		$('#btn_agregar_multas').click(function() {
			agregar_multas();		
		});
		// fin

		// procesos calculos
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// guardar fichas
		function proceso_guardar() {
			var form_uno =$("#form_personal").serialize();
			var form_dos = $("#form_anticipos").serialize();
			var form_tres = $("#form_permisos").serialize();
			var form_cuatro = $("#form_multas").serialize();
			var form_cinco = $("#form_datos").serialize();
			var submit = "btn_guardar";

			var fila_anticipos = jQuery("#table3").jqGrid("getRowData");
			var fila_permisos = jQuery("#table4").jqGrid("getRowData");

			var v1 = new Array();
			var v2 = new Array();

			var string_v1 = "";
			var string_v2 = "";

			//varibles tabla anticipos
			for (var i = 0; i < fila_anticipos.length; i++) {
	            var datos_anticipos = fila_anticipos[i];
	            v1[i] = datos_anticipos['id'];
	        }

	        for (i = 0; i < fila_anticipos.length; i++) {
	            string_v1 = string_v1 + "|" + v1[i];
	        }
	        // fin

	        //varibles tabla permisos
			for (var j = 0; j < fila_permisos.length; j++) {
	            var datos_permisos = fila_permisos[j];
	            v2[j] = datos_permisos['id'];
	        }

	        for (j = 0; j < fila_permisos.length; j++) {
	            string_v2 = string_v2 + "|" + v2[j];
	        }
	        // fin

			//varibles multas 
			var multas = [];
	       	$("#tbt_multas tbody tr").each(function (index) {  
	       		var element = {};
		        $(this).children("td").each(function (index) {                               
		            switch (index) {                                            
		                case 0:
		                	element.id = $(this).text();
		                    break; 
		                case 2:
		                    element.descripcion = $(this).text();
		                    break; 
		                case 3:
		                    element.cantidad = $(this).text();
		                    break;
		                case 4:
		                    element.total_multa = $(this).text();
		                    break;    
		            }	            
		        });
		        multas.push(element);
		    });
		    // fin variables multas

			// guardar formularios
			$.ajax({
		        url: "data/nomina/app.php",
		        data: form_uno + "&" + form_dos + "&" + form_tres + "&" + form_cuatro + "&" + form_cinco + "&tabla1=" + string_v1 + "&tabla2=" + string_v2 +"&campos_multas="+JSON.stringify(multas) + "&btn_guardar=" + submit,
		        type: "POST",
		        success: function (data) {
		        	var val = data;
		        	if(data == '1') {
						bootbox.alert("Gracias! Por su Información Datos Correctamente Guardados!", function() {
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
		    // fin guardado
		}
		// fin

		// imprimir 
		$('#btn_excel').click(function (){
			var myWindow = window.open('data/nomina/phpexcel/nomina_general.php');
		})
		// fin

		// imprimir 
		$('#btn_pdf').click(function (){
			var myWindow = window.open('data/reportes/nomina_general.php?fecha_inicio=' + $('#fecha_inicio').val() + '&fecha_fin=' +$('#fecha_fin').val());
		})
		// fin

		// limpiar tabla
		$('#btn_limpiar').click(function() {
			jQuery("#table").jqGrid('setGridParam',{url:"data/nomina/xml_roles.php",page:1}).trigger("reloadGrid");
		});
		// fin

		// ventana emergente importar
		$('#btn_importar').click(function() {
			$('#modal-importar').modal('show');
		});
		// fin

		// cargar horarios de entrada
		$('#btn_excel').click(function() {
			var formObj = document.getElementById("form_excel");
			var formData = new FormData(formObj);
			var inicioMinutos = 0;
			var inicioHoras = 0;
			var transcurridoMinutos = 0;
			var transcurridoHoras = 0;

			$.ajax({
	            url: "data/nomina/cargar_excel.php",
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
			var facturable = $('#select_facturable').val();

			var sueldo = $('#sueldo').val();
			var horas = $('#tiempo_horas').val();
			var dias = $('#dias_laborados').val();
			var extras = $('#extras').val();
			var no_laborado = $('#no_laborado').val();

			var comisiones = parseFloat($('#asignar_comisiones').val()).toFixed(2);

			var pres_quirografarios = $('#pres_quirografarios').val()
			var quirografarios = parseFloat($('#quirografarios').val()).toFixed(2);
			var pres = $('#prestamos').val();
			var anti = $('#anti').val();
			var monto_servicio = parseFloat($('#monto_servicio').val()).toFixed(2);
			var atrasos = parseFloat($('#multas_atrasos').val()).toFixed(2);
			var permisos = $('#permisos').val();
			var faltas = $('#faltas').val();
			var multas = $('#multas').val();

			var sueldo_basico = 0;
			var horas_extras = 0;
			var sueldo_extras = 0;
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

		    inicioHoras = parseInt(horas.substr(0,2));
		    inicioMinutos = parseInt(horas.substr(3,5));
	  						  
			transcurridoMinutos = parseInt(inicioHoras * 60);
			totalminutos = parseInt(transcurridoMinutos + inicioMinutos);

			// redondeos
			sueldo = parseFloat(sueldo).toFixed(2);
			$('#sueldo').val(sueldo);
			// fin

			// calculo sueldo basico
			sueldo_basico = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(dias)).toFixed(2);
			$('#sueldo_basico').val(sueldo_basico);
			// fin

			// calculo sueldo extras
			sueldo_extras = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(30)).toFixed(2);
			// fin

			console.log(sueldo_basico);
			console.log(sueldo_extras);

			if(facturable == 'NO') {
				// calculo aporte iess
				aporte = ((sueldo_basico * 9.45)/100).toFixed(2);
				$('#aporte_iess').val(aporte);
				// fin

				// // calculo aporte iess
				// if (horas == '08:00') {
				// 	aporte = ((sueldo * 9.45)/100).toFixed(2); 
				// 	$('#aporte_iess').val(aporte);	
				// } else {
				// 	aporte = ((sueldo / 2 * 9.45)/100).toFixed(2); 
				// 	$('#aporte_iess').val(aporte);	
				// }	
				// // fin

				//calculo comisiones
				$('#comisiones').val(comisiones);
				// fin

				// calculo horas extras
				horas_extras = (parseFloat(sueldo/15)/8 * parseFloat(extras)).toFixed(2);
				$('#horas_extras').val(horas_extras);
				// fin 

				// calculo decimo tercero
				decimo_tercero = ((parseFloat(366/365)/8) * parseFloat(dias) * parseFloat(horas)).toFixed(2); 
				$('#decimo_tercero').val(decimo_tercero);
				// fin

				// calculo decimo cuarto
				decimo_cuarto = ((parseFloat(sueldo/365)/8) * parseFloat(dias) * parseFloat(horas)).toFixed(2); 
				$('#decimo_cuarto').val(decimo_cuarto);
				// fin 

				// calculo monto servicios
				$('#servicios').val(monto_servicio);
				// fin

				// calculo total ingresos
				total_ingresos = (parseFloat(sueldo_basico) + parseFloat(horas_extras) + parseFloat(comisiones) + parseFloat(decimo_tercero) + parseFloat(decimo_cuarto) + parseFloat(monto_servicio)).toFixed(2); 
				$('#total_ingresos').val(total_ingresos);
				// fin

				// calculo valor horas no trabajadas
				valor_no_laborado = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(no_laborado)).toFixed(2);
				$('#faltas').val(valor_no_laborado);
				// fin

				$('#pres_quirografarios').val(quirografarios);

				// prestamos quirografarios
				$('#pres').val(pres);
				// fin

				// calcular atrasos
				$('#atrasos').val(atrasos);
				// fin

				// calculo total descuentos
				total_descuentos = (parseFloat(aporte) + parseFloat(quirografarios) + parseFloat(pres) + parseFloat(anti) + parseFloat(atrasos) + parseFloat(permisos) + parseFloat(multas)).toFixed(2); 
				$('#total_descuentos').val(total_descuentos);
				// fin

				// calculo neto pagar
				neto_pagar = (total_ingresos - total_descuentos).toFixed(2);
				$('#neto_pagar').val(neto_pagar);
				// fin
			} else {
				if(facturable == 'SI') {
					// calculo aporte iess
					$('#aporte_iess').val('0.00');
					// fin

					//calculo comisiones
					$('#comisiones').val(comisiones);
					// fin

					// calculo horas extras
					horas_extras = (parseFloat(sueldo/15)/8 * parseFloat(extras)).toFixed(2);
					$('#horas_extras').val(horas_extras);
					// fin 

					// calculo decimo tercero
					decimo_tercero = '0.00'; 
					$('#decimo_tercero').val(decimo_tercero);
					// fin

					// calculo decimo cuarto
					decimo_cuarto = '0.00'; 
					$('#decimo_cuarto').val(decimo_cuarto);
					// fin 

					// calculo monto servicios
					$('#servicios').val(monto_servicio);
					// fin

					// calculo total ingresos
					total_ingresos = (parseFloat(sueldo_basico) + parseFloat(horas_extras) + parseFloat(comisiones) + parseFloat(decimo_tercero) + parseFloat(decimo_cuarto) + parseFloat(monto_servicio)).toFixed(2); 
					$('#total_ingresos').val(total_ingresos);
					// fin

					// calculo valor horas no trabajadas
					valor_no_laborado = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(no_laborado)).toFixed(2);
					$('#faltas').val(valor_no_laborado);
					// fin

					$('#pres_quirografarios').val(quirografarios);

					// prestamos quirografarios
					$('#pres').val(pres);
					// fin

					// calcular atrasos
					$('#atrasos').val(atrasos);
					// fin

					// calculo total descuentos
					total_descuentos = (parseFloat(aporte) + parseFloat(quirografarios) + parseFloat(pres) + parseFloat(anti) + parseFloat(atrasos) + parseFloat(permisos) + parseFloat(multas)).toFixed(2); 
					$('#total_descuentos').val(total_descuentos);
					// fin

					// calculo neto pagar
					neto_pagar = (total_ingresos - total_descuentos).toFixed(2);
					$('#neto_pagar').val(neto_pagar);

				}	
			}	
		}
		// fin

		// funcion calcular anticipos
		function calcular_anticipos() {
			var valor_anticipo = '0.000';
			var v1 = new Array();

			var fila_anticipos = jQuery("#table3").jqGrid("getRowData");

			for (var i = 0; i < fila_anticipos.length; i++) {
				var datos_anticipos = fila_anticipos[i];
				v1[i] = datos_anticipos['monto_anticipo'];

				valor_anticipo = (parseFloat(valor_anticipo) + parseFloat(v1[i])).toFixed(2);
			}

			// tot_pre_ant = (parseFloat(valor_anticipo) +parseFloat(prestamos)).toFixed(3);
			$('#anti').val(valor_anticipo);
			
			// if (fila_anticipos.length == 0) {
			// 	$('#anti').val('0.000');
			// } else {
			// 	   $('#anti').val(valor_anticipo);	
			// }		
		}
		// fin

		// funcion calcular permisos
		function calcular_permisos() {
			var valor_multa = '0.000';
			var sueldo = $('#sueldo').val();
			var horas = $('#tiempo_horas').val();
			var inicioMinutos = 0;
			var inicioHoras = 0;
			var transcurridoMinutos = 0;
			var totalminutos = 0;
			var ho = new Array();
			var di = new Array();
			var cargos = new Array();

			var fila_permisos = jQuery("#table4").jqGrid("getRowData");
			
			for(var i = 0; i < fila_permisos.length; i++) {
				var datos_permisos = fila_permisos[i];

				ho[i] = datos_permisos['horas'];
				di[i] = datos_permisos['dias'];
				cargos[i] = datos_permisos['cargos_a'];

				if (cargos[i] == 'DESCUENTOS') {
					if (ho[i] != '00:00') {
						inicioHoras = parseInt(ho[i].substr(0,2));
					    inicioMinutos = parseInt(ho[i].substr(3,5));
				  						  
						transcurridoMinutos = parseInt(inicioHoras * 60);
						totalminutos = parseInt(transcurridoMinutos + inicioMinutos);

						var calculo_multa = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos)).toFixed(3);
						valor_multa = (parseFloat(valor_multa) + parseFloat(calculo_multa)).toFixed(2);	
					} else {
						if (di[i] != '0') {
							inicioHoras = parseInt(horas.substr(0,2));
						    inicioMinutos = parseInt(horas.substr(3,5));
					  						  
							transcurridoMinutos = parseInt(inicioHoras * 60);
							totalminutos = parseInt(transcurridoMinutos + inicioMinutos);

							var calculo_multa = ((parseFloat(sueldo/30)/8/60) * parseFloat(totalminutos) * parseFloat(di[i])).toFixed(3);
							valor_multa = (parseFloat(valor_multa) + parseFloat(calculo_multa)).toFixed(2);
						}	
					}	
				}	
			}

			$('#permisos').val(valor_multa);	

			// if (fila_permisos.length == 0) {
			// 	$('#permisos').val('0.000');
			// } else {
			// 	   $('#permisos').val(valor_multa);	
			// }			
		}
		// fin
	});
	// fin

	// abrir en una nueva ventana reporte nomina general
	$scope.methodspdf = function(id) { 
		var myWindow = window.open('data/reportes/nomina.php?hoja=A5&id='+id,'popup','width=900,height=650');
	} 
	// fin

	// abrir modal reporte roles anticipos
	$scope.methodanticipos = function(id) { 
		var id_adelantos = id;

		$.ajax({
			url: 'data/nomina/app.php',
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
						url: 'data/nomina/app.php',
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

	// abrir modal reporte permisos
	$scope.methodpermisos = function(id) {
		var id_permisos = id;

		$.ajax({
			url: 'data/nomina/app.php',
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
	// fin 

	// recargar grid consulta nomina
	function gridReload() {
		var id_personal = $('#select_empleado').val();
		var fecha_inicio = $('#fecha_inicio').val();
		var fecha_fin = $('#fecha_fin').val();
		jQuery("#table").jqGrid('setGridParam',{url:"data/nomina/xml_empleados.php?id_personal="+id_personal+"&fecha_inicio="+fecha_inicio+"&fecha_fin="+fecha_fin,page:1}).trigger("reloadGrid");
	}
	// fin

	// recargar grid anticipos
	function gridReload_anticipos() {
		var id_personal = $('#id_empleado').val();
		jQuery("#table3").jqGrid('setGridParam',{url:"data/nomina/xml_anticipos.php?id_personal="+id_personal,page:1}).trigger("reloadGrid");
	}
	// fin

	// recargar gris permisos
	function gridReload_permisos() {
		var id_personal = $('#id_empleado').val();
		jQuery("#table4").jqGrid('setGridParam',{url:"data/nomina/xml_permisos.php?id_personal="+id_personal,page:1}).trigger("reloadGrid");
	}
	// fin

	// /*jqgrid*/    
	// jQuery(function($) {
	//     var grid_selector = "#table";
	//     var pager_selector = "#pager";
	    
	//     //cambiar el tamaño para ajustarse al tamaño de la página
	//     $(window).on('resize.jqGrid', function () {	        
	//         $(grid_selector).jqGrid( 'setGridWidth', $("#myModal2 .modal-dialog").width()-30);
	//     });
	//     //cambiar el tamaño de la barra lateral collapse/expand
	//     var parent_column = $(grid_selector).closest('[class*="col-"]');
	//     $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	//         if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	//             //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	//             setTimeout(function() {
	//                 $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
	//             }, 0);
	//         }
	//     });

	//     // buscador clientes
	//     jQuery(grid_selector).jqGrid({	        
	//         datatype: "xml",
	//         url: 'data/nomina/xml_nomina.php',
	//         colNames: ['ID','CÓDIGO NÓMINA','IDENTIDICACIÓN','NOMBRES COMPLETOS','DIRECCIÓN','FECHA NÓMINA','NETO PAGAR'],
	//         colModel:[      
	//             {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	//             {name:'codigo',index:'codigo',frozen : true,align:'left',search:true,width: ''},
	//             {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true,align:'left',search:true,width: ''},
	//             {name:'nombres',index:'nombres',frozen : true,align:'left',search:true,width: '400px'},
	//             {name:'direccion',index:'direccion',frozen : true,align:'left',search:false,width: '300px', hidden: false},
	//             {name:'fecha_emision',index:'fecha_emision',frozen : true,align:'left',search:false,width: ''},
	//             {name:'neto_pagar',index:'neto_pagar',frozen : true,align:'left',search:false},
	//         ],          
	//         rowNum: 10,       
	//         width:null,
	//         shrinkToFit: false,
	//         height:350,
	//         rowList: [10,20,30],
	//         pager: pager_selector,        
	//         sortname: 'id',
	//         sortorder: 'asc',
	//         altRows: true,
	//         multiselect: false,
	//         viewrecords : true,
	//         loadComplete : function() {
	//             var table = this;
	//             setTimeout(function(){
	//                 styleCheckbox(table);
	//                 updateActionIcons(table);
	//                 updatePagerIcons(table);
	//                 enableTooltips(table);
	//             }, 0);
	//         },
	//         gridComplete: function() {
	// 			var ids = jQuery(grid_selector).jqGrid('getDataIDs');
	// 			for(var i=0;i < ids.length;i++){
	// 				var id_rol = ids[i];
	// 				pdf_abrir = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_rol+"')\" title='Abrir PDF'><i class='fa fa-file-pdf-o green' style='cursor:pointer; cursor: hand'></i></a>"; 
	// 				pdf_guardar = "<a onclick=\"angular.element(this).scope().methodspdfguardar('"+id_rol+"')\" title='Guardar PDF'><i class='fa fa-save green' style='cursor:pointer; cursor: hand'></i></a>"; 
	// 				jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:pdf_abrir +'    '+ pdf_guardar});
	// 			}	
	// 		},
	//         ondblClickRow: function(rowid) {     	            	            
	//             var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
 //            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);	            
	//         },
	//         caption: "LISTA NÓMINA"
	//     });

	//     $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	//     function aceSwitch( cellvalue, options, cell ) {
	//         setTimeout(function(){
	//             $(cell) .find('input[type=checkbox]')
	//             .addClass('ace ace-switch ace-switch-5')
	//             .after('<span class="lbl"></span>');
	//         }, 0);
	//     }	    	   

	//     jQuery(grid_selector).jqGrid('navGrid',pager_selector,
	//     {   //navbar options
	//         edit: false,
	//         editicon : 'ace-icon fa fa-pencil blue',
	//         add: false,
	//         addicon : 'ace-icon fa fa-plus-circle purple',
	//         del: false,
	//         delicon : 'ace-icon fa fa-trash-o red',
	//         search: false,
	//         searchicon : 'ace-icon fa fa-search orange',
	//         refresh: true,
	//         refreshicon : 'ace-icon fa fa-refresh green',
	//         view: true,
	//         viewicon : 'ace-icon fa fa-search-plus grey'
	//     },
	//     {	        
	//         recreateForm: true,
	//         beforeShowForm : function(e) {
	//             var form = $(e[0]);
	//             form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	//             style_edit_form(form);
	//         }
	//     },
	//     {
	//         closeAfterAdd: true,
	//         recreateForm: true,
	//         viewPagerButtons: false,
	//         beforeShowForm : function(e) {
	//             var form = $(e[0]);
	//             form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	//             .wrapInner('<div class="widget-header" />')
	//             style_edit_form(form);
	//         }
	//     },
	//     {
	//         recreateForm: true,
	//         beforeShowForm : function(e) {
	//             var form = $(e[0]);
	//             if(form.data('styled')) return false;      
	//             form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	//             style_delete_form(form); 
	//             form.data('styled', true);
	//         },
	//         onClick : function(e) {}
	//     },
	//     {
	//         recreateForm: true,
	//         afterShowSearch: function(e){
	//             var form = $(e[0]);
	//             form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	//             style_search_form(form);
	//         },
	//         afterRedraw: function(){
	//             style_search_filters($(this));
	//         },

	//         //multipleSearch: true
	//         overlay: false,
	//         sopt: ['eq', 'cn'],
 //            defaultSearch: 'eq',            	       
	//       },
	//     {
	//         //view record form
	//         recreateForm: true,
	//         beforeShowForm: function(e){
	//             var form = $(e[0]);
	//             form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	//         }
	//     })	    
	//     function style_edit_form(form) {
	//         form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	//         form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

	//         //update buttons classes
	//         var buttons = form.next().find('.EditButton .fm-button');
	//         buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	//         buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	//         buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	//         buttons = form.next().find('.navButton a');
	//         buttons.find('.ui-icon').hide();
	//         buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	//         buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	//     }

	//     function style_delete_form(form) {
	//         var buttons = form.next().find('.EditButton .fm-button');
	//         buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	//         buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	//         buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	//     }
	    
	//     function style_search_filters(form) {
	//         form.find('.delete-rule').val('X');
	//         form.find('.add-rule').addClass('btn btn-xs btn-primary');
	//         form.find('.add-group').addClass('btn btn-xs btn-success');
	//         form.find('.delete-group').addClass('btn btn-xs btn-danger');
	//     }
	//     function style_search_form(form) {
	//         var dialog = form.closest('.ui-jqdialog');
	//         var buttons = dialog.find('.EditTable')
	//         buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	//         buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	//         buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	//     }
	    
	//     function beforeDeleteCallback(e) {
	//         var form = $(e[0]);
	//         if(form.data('styled')) return false; 
	//         form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	//         style_delete_form(form);
	//         form.data('styled', true);
	//     }
	    
	//     function beforeEditCallback(e) {
	//         var form = $(e[0]);
	//         form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	//         style_edit_form(form);
	//     }

	//     function styleCheckbox(table) {}
	    

	//     function updateActionIcons(table) {}
	    
	//     function updatePagerIcons(table) {
	//         var replacement = 
	//             {
	//             'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	//             'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	//             'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	//             'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	//         };
	//         $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	//             var icon = $(this);
	//             var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	//             if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	//         })
	//     }

	//     function enableTooltips(table) {
	//         $('.navtable .ui-pg-button').tooltip({container:'body'});
	//         $(table).find('.ui-pg-div').tooltip({container:'body'});
	//     }

	//     $(document).one('ajaxloadstart.page', function(e) {
	//         $(grid_selector).jqGrid('GridUnload');
	//         $('.ui-jqdialog').remove();
	//     });
	// });
	// // fin	

	/*jqgrid 2*/    
	jQuery(function($) {
	    var grid_selector2 = "#table2";
	    var pager_selector2 = "#pager2";
	    var campo = $('#buscador').val();
	    
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
	        url: "data/nomina/xml_personal.php?campo="+campo,        
	        colNames: ['ID','IDENTIFICACIÓN','NOMBRES COMOPLETOS','CÓDIGO FICHA','TEL. FIJO','TEL. CEULAR','DIRECCIÓN','SUELDO','HORAS. LABORAR','IMAGEN'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'nombres_completos',index:'nombres_completos',frozen : true, hidden: false, align:'left',search:true,width: '300px'},
	            {name:'codigo_ficha',index:'codigo_ficha',frozen : true, hidden: true, align:'left',search:false,width: ''},
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
	        height:350,
	        rowList: [10,20,30],
	        pager: pager_selector2,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
	        multiboxonly: true,
	        viewrecords: true,
	        loadComplete: function() {
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
					url: 'data/nomina/app.php',
					type: 'post',
					data: {llenar_cargos:'llenar_cargos',id: id},
					dataType: 'json',
					success: function (data) {
						var cargo = data.cargo;
						$('#cargo').val(cargo);
					}
				});

				$.ajax({
					url: 'data/nomina/app.php',
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
							var cadena = 'N' + mm + anios + ini + res + codigo_general;
							$('#codigo').val(cadena);
						} else {
							$.ajax({
								url: 'data/nomina/app.php',
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
										var cadena = 'N' + mm + anios + ini + res + codigo_general;
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
	            $('#anti').val('0.000');
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
	        $(grid_selector3).jqGrid( 'setGridWidth', $("#fuelux-wizard-container").width()-150);
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
	        url: 'data/nomina/xml_anticipos.php',        
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
	        $(grid_selector4).jqGrid( 'setGridWidth', $("#fuelux-wizard-container").width()-150);
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
	        url: 'data/nomina/xml_permisos.php',        
	        colNames: ['ID','SERIE PERMISOS','FECHA PERMISO','HORAS','DÍAS','HORA SALIDA','REGRESO','HORA RETORNO','TIEMPO SALIDA','ASUNTO','PARTE DE','CARGOS A','VISUALIZAR'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'serie_permiso',index:'serie_permiso',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'fecha_permiso',index:'fecha_permiso',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'horas',index:'horas',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'dias',index:'dias',frozen : true, hidden: false, align:'left',search:false,width: '80px'},
	            {name:'hora_salida',index:'hora_salida',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'regreso',index:'regreso',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'hora_retorno',index:'hora_retorno',frozen : true, hidden: false, align:'center',search:false,width: ''},
	            {name:'tiempo_salida',index:'tiempo_salida',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'asunto',index:'asunto',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'parte_de',index:'parte_de',frozen : true, hidden: true, align:'center',search:false,width: ''},
	            {name:'cargos_a',index:'cargos_a',frozen : true, hidden: false, align:'center',search:false,width: ''},
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

