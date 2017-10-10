angular.module('scotchApp').controller('facturasController', function ($scope) {

	// procesos tab
	$scope.tab = 1;
	var finaliza_facturero = 0;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab === tabNum;
    };
    // fin

	jQuery(function($) {
		
		function cargar_datos_facturero() {
			$.ajax({
				url: 'data/facturas/app.php',
				type: 'post',
				data: {cargar_facturero:'cargar_facturero'},
				dataType: 'json',
				success: function (data) {
					// console.log(data);
					// if(data != null) {
					// 	var serie_factura = data.serie;
					// 	var res = parseInt(serie_factura.substr(8, 16));
					// 	res = res + 1;

					// 	$("#serie_factura").val(res);
					// 	var a = autocompletar(res);
					// 	var validado = a + "" + res;
					// 	$("#serie_factura").val(validado);
					// }
				}
			});
		}

		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// fin

		// stilo select2
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });
		// fin

		// busqueda ruc cliente
		var busqueda_ruc = 'ruc';

        $("#ruc").autocomplete({
            source: "data/facturas/app.php?tipo_busqueda=" + busqueda_ruc,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#ruc").val(ui.item.value); 
            $("#cliente").val(ui.item.cliente);
            $("#direccion").val(ui.item.direccion);
            $("#telefono").val(ui.item.telefono);
            $("#correo").val(ui.item.correo);
            return false;
            },
            select: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#ruc").val(ui.item.value); 
            $("#cliente").val(ui.item.cliente);
            $("#direccion").val(ui.item.direccion);
            $("#telefono").val(ui.item.telefono);
            $("#correo").val(ui.item.correo);
            return false;
            }
        });
	    // fin

	    // busqueda cliente nombre
		var busqueda_nombre = 'nombre';

        $("#cliente").autocomplete({
            source: "data/facturas/app.php?tipo_busqueda=" + busqueda_nombre,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#cliente").val(ui.item.value);
            $("#ruc").val(ui.item.ruc);
            $("#direccion").val(ui.item.direccion);
            $("#telefono").val(ui.item.telefono);
            $("#correo").val(ui.item.correo);
            return false;
            },
            select: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#cliente").val(ui.item.value);
            $("#ruc").val(ui.item.ruc);
            $("#direccion").val(ui.item.direccion);
            $("#telefono").val(ui.item.telefono);
            $("#correo").val(ui.item.correo);
            return false;
            }
        });
	    // fin

		// busqueda mensiones codigo
		var busqueda_codigo = 'codigo';

        $("#codigo").autocomplete({
            source: "data/facturas/app.php?tipo_busqueda=" + busqueda_codigo,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_paquetes").val(ui.item.id_paquetes); 
            $("#codigo").val(ui.item.value); 
            $("#descripcion").val(ui.item.descripcion);
            $("#precio").val(ui.item.precio);
            $("#descuento").val(ui.item.descuento);
            return false;
            },
            select: function(event, ui) {
            $("#id_paquetes").val(ui.item.id_paquetes); 
            $("#codigo").val(ui.item.value); 
            $("#descripcion").val(ui.item.descripcion);
            $("#precio").val(ui.item.precio);
            $("#descuento").val(ui.item.descuento);
           
            $("#cantidad").focus();
            return false;
            }
        });
	    // fin

	    // busqueda mensiones descripcion
	    var busqueda_descripcion = 'descripcion';

        $("#descripcion").autocomplete({
            source: "data/facturas/app.php?tipo_busqueda=" + busqueda_descripcion,
            focus: function(event, ui) {
            $("#id_paquetes").val(ui.item.id_paquetes); 
            $("#codigo").val(ui.item.codigo);
            $("#descripcion").val(ui.item.value); 
            $("#precio").val(ui.item.precio);
            $("#descuento").val(ui.item.descuento);
            return false;
            },
            select: function(event, ui) {
            $("#id_paquetes").val(ui.item.id_paquetes);
            $("#codigo").val(ui.item.codigo); 
            $("#descripcion").val(ui.item.value); 
            $("#precio").val(ui.item.precio);
            $("#descuento").val(ui.item.descuento);
           
            $("#cantidad").focus();
            return false;
            }
        });
	    // fin

	    // limpiar ruc
	    $("#ruc").keyup(function(e) {
	    	if($('#ruc').val() == '') {
	    		$('#id_cliente').val('');
		    	$('#cliente').val('');
		    	$('#direccion').val('');
		    	$('#telefono').val('');
		    	$('#correo').val('');	
	    	}
	    	
	    });
	    // fin

	    // limpiar cliente
	    $("#cliente").keyup(function(e) {
	    	if($('#cliente').val() == '') {
	    		$('#id_cliente').val('');
		    	$('#ruc').val('');
		    	$('#direccion').val('');
		    	$('#telefono').val('');
		    	$('#correo').val('');	
	    	}
	    	
	    });
	    // fin

	    // limpiar imputs
	    function limpiar_input() {
	    	$('#id_paquetes').val('');
	    	$('#codigo').val('');
	    	$('#descripcion').val('');
	    	$('#cantidad').val('');
	    	$('#precio').val('');
	    	$('#descuento').val('');
	    	$('#codigo').focus();
	    }
	    // fin

	    // limpiar con codigo
	    $("#codigo").keyup(function(e) {
		    if($('#codigo').val() == '') {
		    	$('#id_paquetes').val('');
		    	$('#descripcion').val('');
		    	$('#cantidad').val('');
		    	$('#precio').val('');
		    	$('#descuento').val('');
		    }
		});
	    // fin

	    // limpiar con descripcion
	    $("#descripcion").keyup(function(e) {
		    if($('#descripcion').val() == '') {
		    	$('#id_paquetes').val('');
		    	$('#codigo').val('');
		    	$('#cantidad').val('');
		    	$('#precio').val('');
		    	$('#descuento').val('');
		    }
		});
	    // fin

	    // autocompletar serie
	    $("#serie_factura").on("keypress",function (e) {
	    	if(e.keyCode == 13) {//tecla del alt para el entrer poner 13
		    	var a = autocompletar($("#serie_factura").val());
				$("#serie_factura").val(a + "" + $("#serie_factura").val());
				$("#codigo").focus();
			}
	    });
	    // fin

	    var formatNumber = {
			separador: ".", // separador para los miles
		 	sepDecimal: '.', // separador para los decimales
		 	formatear:function (num) {
		  	num +='';
		  	var splitStr = num.split('.');
		  	var splitLeft = splitStr[0];
		  	var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
		  	var regx = /(\d+)(\d{3})/;
		  	while (regx.test(splitLeft)) {
		  		splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
		  		}
		  	return this.simbol + splitLeft  +splitRight;
		 	},
		 	new:function(num, simbol) {
		  		this.simbol = simbol ||'';
		  	return this.formatear(num);
		 	}
		}

	    /*---agregar a la tabla---*/
	  	$("#descuento").on("keypress",function (e) {
	    	if(e.keyCode == 13) {//tecla del alt para el entrer poner 13
	      		var subtotal0 = 0;
			    var subtotal12 = 0;
			    var iva12 = 0;
			    var total_total = 0;
			    var descu_total = 0; 

	    //   		if($('#id_paquetes').val() == '') {
	    //   			$.gritter.add({
					// 	title: 'Seleccione una mención',
					// 	class_name: 'gritter-error gritter-center',
					// 	time: 1000,
					// });
					// $('#codigo').focus();
	    //   		} else {
	     //  			if($('#codigo').val() == '') {
		    //   			$.gritter.add({
						// 	title: 'Seleccione una código',
						// 	class_name: 'gritter-error gritter-center',
						// 	time: 1000,
						// });
						// $('#codigo').focus();
		    //   		} else {
		      			if($('#descripcion').val() == '') {
			      			$.gritter.add({
								title: 'Seleccione una descripción',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$('#descripcion').focus();
			      		} else {
			      			if($('#cantidad').val() == '') {
				      			$.gritter.add({
									title: 'Ingrese una cantidad',
									class_name: 'gritter-error gritter-center',
									time: 1000,
								});
								$('#cantidad').focus();
				      		} else {
				      			var filas = jQuery("#table").jqGrid("getRowData");
				      			var descuento = 0;
	                            var total = 0;
	                            var su = 0;
	                            var desc = 0;
	                            var precio = 0;
	                            var multi = 0;
	                            var flotante = 0;
	                            var resultado = 0;
	                            var repe = 0;
	                            var suma = 0;

	                            if (filas.length == 0) {
	                                if ($("#descuento").val() != "") {
	                                    desc = $("#descuento").val();
	                                    precio = (parseFloat($("#precio").val())).toFixed(3);
	                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
	                                    descuento = ((multi * parseFloat(desc)) / 100);
	                                    flotante = parseFloat(descuento);
	                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
	                                    total = (multi - resultado).toFixed(3);
	                                } else {
	                                    desc = 0;
	                                    precio = (parseFloat($("#precio").val())).toFixed(3);
	                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
	                                    descuento = ((multi * parseFloat(desc)) / 100);
	                                    flotante = parseFloat(descuento);
	                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
	                                    total = (parseFloat($("#cantidad").val()) * precio).toFixed(3);
	                                }

	                                var datarow = {
	                                    id: $("#id_paquetes").val(),
	                                    id_pago: '', 
	                                    codigo: $("#codigo").val(), 
	                                    descripcion: $("#descripcion").val(), 
	                                    cantidad: $("#cantidad").val(), 
	                                    precio: precio, 
	                                    descuento: desc, 
	                                    cal_des: resultado,
	                                    valor_total: total
	                                };

	                                jQuery("#table").jqGrid('addRowData', 1, datarow);
	                                limpiar_input();
	                            } else {
	                            	for (var i = 0; i < filas.length; i++) {
                                   		var id = filas[i];

	                                    if (id['id'] == $("#id_paquetes").val()) {
	                                        repe = 1;
	                                        var can = id['cantidad'];
	                                    }
	                                }

	                                if (repe == 1) {
	                                 	if ($("#descuento").val() != "") {
		                                    desc = $("#descuento").val();
		                                    precio = (parseFloat($("#precio").val())).toFixed(3);
		                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
		                                    descuento = ((multi * parseFloat(desc)) / 100);
		                                    flotante = parseFloat(descuento);
		                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
		                                    total = (multi - resultado).toFixed(3);
		                                } else {
		                                    desc = 0;
		                                    precio = (parseFloat($("#precio").val())).toFixed(3);
		                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
		                                    descuento = ((multi * parseFloat(desc)) / 100);
		                                    flotante = parseFloat(descuento);
		                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
		                                    total = (parseFloat($("#cantidad").val()) * precio).toFixed(3);
		                                }
                                    
                                        var datarow = {
		                                    id: $("#id_paquetes").val(),
		                                    id_pago: '', 
		                                    codigo: $("#codigo").val(), 
		                                    descripcion: $("#descripcion").val(), 
		                                    cantidad: $("#cantidad").val(), 
		                                    precio: precio, 
		                                    descuento: desc, 
		                                    cal_des: resultado,
		                                    valor_total: total
		                                };

		                                jQuery("#table").jqGrid('setRowData', 1,datarow);
                                        limpiar_input();
	                                } else {
	                                	if(filas.length < 10) {
			                                if ($("#descuento").val() !== "") {
			                                    desc = $("#descuento").val();
			                                    precio = (parseFloat($("#precio").val())).toFixed(3);
			                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
			                                    descuento = ((multi * parseFloat(desc)) / 100);
			                                    flotante = parseFloat(descuento) ;
			                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
			                                    total = (multi - resultado).toFixed(3);
			                                } else {
			                                    desc = 0;
			                                    precio = (parseFloat($("#precio").val())).toFixed(3);
			                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
			                                    descuento = ((multi * parseFloat(desc)) / 100);
			                                    flotante = parseFloat(descuento);
			                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
			                                    total = (parseFloat($("#cantidad").val()) * precio).toFixed(3);
			                                }

			                                datarow = {
			                                    id: $("#id_paquetes").val(),
			                                    id_pago: '', 
			                                    codigo: $("#codigo").val(), 
			                                    descripcion: $("#descripcion").val(), 
			                                    cantidad: $("#cantidad").val(), 
			                                    precio: precio, 
			                                    descuento: desc, 
			                                    cal_des: resultado,
			                                    valor_total: total
			                                };

			                                jQuery("#table").jqGrid('addRowData', 1,datarow);
			                                limpiar_input();
			                            } else {
			                            	$.gritter.add({
												title: 'Error... Alcanzo el limite máximo de Items',
												class_name: 'gritter-error gritter-center',
												time: 1000,
											});
			                            }
	                                }
	                            }

	                            // calcular
	                            var subtotal = 0;
			                    var sub = 0;
			                    var iva = 0;

			                    var fil = jQuery("#table").jqGrid("getRowData");
			                    for (var t = 0; t < fil.length; t++) {
			                    	var dd = fil[t];
			                    	subtotal = dd['valor_total'];
			                    	sub = subtotal;
                                	iva = (sub * 0.12).toFixed(3); 

                                	subtotal0 = parseFloat(subtotal0) + 0;
                                	subtotal12 = parseFloat(subtotal12) + parseFloat(sub);
                                	iva12 = parseFloat(iva12) + parseFloat(iva);
                                	descu_total = parseFloat(descu_total) + parseFloat(dd['cal_des']);

                                	subtotal0 = parseFloat(subtotal0).toFixed(2);
	                                subtotal12 = parseFloat(subtotal12).toFixed(2);
	                                iva12 = parseFloat(iva12).toFixed(2);
	                                descu_total = parseFloat(descu_total).toFixed(2);
			                    }

			                    total_total = parseFloat(total_total) + (parseFloat(subtotal0) + parseFloat(subtotal12) + parseFloat(iva12));
                   				total_total = parseFloat(total_total).toFixed(2);

                   				$("#subtotal").val(formatNumber.new(subtotal12));
                   				$("#descuento_total").val(descu_total);
                   				$("#iva").val(formatNumber.new(iva12));
                   				$("#total_pagar").val(total_total);  
				      		}
			      		// }
		      		// }
	      		}
	    	}
	  	});
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

		// funcion autocompletar la serie
		function autocompletar() {
		    var temp = "";
		    var serie = $("#serie_factura").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// abrir en una nueva ventana reporte facturas
		$scope.methodspdf = function(id) { 
			var myWindow = window.open('data/reportes/factura_oye.php?hoja=A5&id='+id,'popup','width=900,height=650');
		} 
		// fin

		// funcion cargar maximo serie
		function cargar_serie_secuencia() {
			$.ajax({
				url: 'data/facturas/app.php',
				type: 'post',
				data: {cargar_series:'cargar_series'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var serie_factura = data.serie;
						var res = parseInt(serie_factura.substr(8, 16));
						res = res + 1;

						$("#serie_factura").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#serie_factura").val(validado);
					} else {
						$.ajax({
							url: 'data/facturas/app.php',
							type: 'post',
							data: {cargar_factura_preimpresa:'cargar_factura_preimpresa'},
							dataType: 'json',
							success: function (data) {
								if(data != null) {
								var inicio_fac_preimpresa = data.inicio_fac_preimpresa;
								var item_factura = data.item_factura;

								$("#serie_factura").val(inicio_fac_preimpresa);
								var a = autocompletar(inicio_fac_preimpresa);
								var validado = a + "" + inicio_fac_preimpresa;
								$("#serie_factura").val(validado);
								} else {
									$.gritter.add({
										title: 'Empresa no creada',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});
								}
							}
						});
					}
				}
			});
		}
		// fin	

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// inicio llamado funciones de procesos de inicio
		cargar_datos_facturero(); 
		cargar_serie_secuencia();
		$("#serie_factura").keypress(ValidNum);
		$("#cantidad").keypress(ValidNum);
		$("#descuento").keypress(ValidNum);
		$("#precio").keypress(Valida_punto);
		$("#btn_3").attr("disabled", true);

		// guardar factura
		$('#btn_0').click(function() {
			guardar_factura();
		});
		// fin

		// actualizar formulario
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// anular facturas
		$('#btn_3').click(function() {
			if($('#id_factura').val() == '') {
				$.gritter.add({
					title: 'Seleccione factura Anular',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				bootbox.dialog({
					message: "<span class='bigger-110'>¿Esta Seguro de anular la factura?</span>",
					buttons: 			
					{
						"success" :
						 {
							"label" : "<i class='ace-icon fa fa-check'></i> Aceptar",
							"className" : "btn-sm btn-success",
							"callback": function() {
								var id = $('#id_factura').val();

								$.ajax({
									url: 'data/facturas/app.php',
									type: 'post',
									data: {anular_factura:'anular_factura',id: id},
									dataType: 'json',
									success: function (data) {
										var val = data;
							        	if(data == '1') {
							        		$.gritter.add({
												title: 'Mensaje',
												text: 'Factura Anulada correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
												time: 1000				
											});
											redireccionar();
							        	}         	
									}
								}); 
							}
						},
						"danger" :
						{
							"label" : "<i class='ace-icon fa fa-times'></i> Cancelar",
							"className" : "btn-sm btn-danger",
							"callback": function() {
								$.gritter.add({
									title: 'Mensaje',
									text: 'Acción cancelada <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
									time: 1000				
								});
							}
						}
					}
				});
			}
		});
		// fin

		// reimprimir facturas
		$('#btn_4').click(function() {
			if($('#id_factura').val() == '') {
				$.gritter.add({
					title: 'Seleccione factura a Imprimir',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				var id = $('#id_factura').val();
				var myWindow = window.open('data/reportes/factura_oye.php?hoja=A5&id='+id,'popup','width=900,height=650');
			}
		});
		// fin

		// cargar pagos
		$('#btn_5').click(function(){
			$('#myModal2').modal('show');
			jQuery("#table3").jqGrid('setGridParam',{url:"data/facturas/xml_pagos.php?id_cliente="+$('#id_cliente').val(),page:1}).trigger("reloadGrid");
		});
		// fin

		// proceso guardar factura
		function guardar_factura() {
			// $.ajax({
			// 	url: 'data/facturas/app.php',
			// 	type: 'post',
			// 	data: {cargar_facturero:'cargar_facturero'},
			// 	dataType: 'json',
			// 	success: function (data) {
			// 		finaliza_facturero = data.finaliza_facturero;
			// 	}
			// });
			// finaliza_facturero
			var form_uno = $("#form_facturacion").serialize();
			var submit = "btn_guardar";
			var fil = jQuery("#table").jqGrid("getRowData");

			if($('#id_cliente').val() == '') {
				$.gritter.add({
					title: 'Seleccione un cliente',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
				$('#ruc').focus();
			} else {
				if($('#select_forma').val() == '') {
					$.gritter.add({
						title: 'Seleccione una forma de pago',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});	
				} else {
					if($('#serie_factura').val() == '') {
						$.gritter.add({
							title: 'Ingrese serie de la factura',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
						$('#serie_factura').focus();	
					} else {
						if(fil.length == 0) {
			                var a = autocompletar($("#serie_factura").val());
							$("#serie_factura").val(a + "" + $("#serie_factura").val());
			                $("#codigo").focus();
			                $.gritter.add({
								title: 'Ingrese productos a la Factura',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
			                $('#codigo').focus();	
			            } else {
			     //        	if(finaliza_facturero < $('#serie_factura').val()) {
			     //        		$.gritter.add({
								// 	title: 'Error... Imposible Facturar la serie excede al Facturero Ingresado',
								// 	class_name: 'gritter-error gritter-center',
								// 	time: 1000,
								// });	
			     //        	} else {
								var v1 = new Array();
				                var v2 = new Array();
				                var v3 = new Array();
				                var v4 = new Array();
				                var v5 = new Array();
				                var v6 = new Array();
				                var v7 = new Array();
				                var v8 = new Array();

				                var string_v1 = "";
				                var string_v2 = "";
				                var string_v3 = "";
				                var string_v4 = "";
				                var string_v5 = "";
				                var string_v6 = "";
				                var string_v7 = "";
				                var string_v8 = "";

				                for (var i = 0; i < fil.length; i++) {
				                    var datos = fil[i];
				                    v1[i] = datos['id'];
				                    v2[i] = datos['codigo'];
				                    v3[i] = datos['descripcion'];
				                    v4[i] = datos['cantidad'];
				                    v5[i] = datos['precio'];
				                    v6[i] = datos['descuento'];
				                    v7[i] = datos['valor_total'];
				                    v8[i] = datos['id_pago'];
				                }
				                
				                for (i = 0; i < fil.length; i++) {
				                    string_v1 = string_v1 + "|" + v1[i];
				                    string_v2 = string_v2 + "|" + v2[i];
				                    string_v3 = string_v3 + "|" + v3[i];
				                    string_v4 = string_v4 + "|" + v4[i];
				                    string_v5 = string_v5 + "|" + v5[i];
				                    string_v6 = string_v6 + "|" + v6[i];
				                    string_v7 = string_v7 + "|" + v7[i];
				                    string_v8 = string_v8 + "|" + v8[i];
				                }

								$.ajax({
							        url: "data/facturas/app.php",
							        data: form_uno +"&btn_guardar=" + submit + "&campo1=" + string_v1 + "&campo2=" + string_v2 + "&campo3=" + string_v3 + "&campo4=" + string_v4 + "&campo5=" + string_v5 + "&campo6=" + string_v6 + "&campo7=" + string_v7 + "&campo8=" + string_v8,
							        type: "POST",
							        success: function (data) {
							        	var val = data;
							        	if(data != '') {
							        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
											  var myWindow = window.open('data/reportes/factura_oye.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
											  location.reload();
											});
								    	}                                                
							        }
							    });
							// }
						}    
					}    
				}
			}	
		}
	});
	// fin
	
	/*jqgrid table 1 local*/    
	jQuery(function($) {
		var formatNumber = {
			separador: ".", // separador para los miles
		 	sepDecimal: '.', // separador para los decimales
		 	formatear:function (num) {
		  	num +='';
		  	var splitStr = num.split('.');
		  	var splitLeft = splitStr[0];
		  	var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
		  	var regx = /(\d+)(\d{3})/;
		  	while (regx.test(splitLeft)) {
		  		splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
		  		}
		  	return this.simbol + splitLeft  +splitRight;
		 	},
		 	new:function(num, simbol){
		  		this.simbol = simbol ||'';
		  	return this.formatear(num);
		 	}
		}

	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    var subtotal0 = 0;
	    var subtotal12 = 0;
	    var iva14 = 0;
	    var total_total = 0;
	    var descu_total = 0;
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector).jqGrid('setGridWidth', $("#grid_container").width(), true);
	    }).trigger('resize');  

	    var parent_column = $(grid_selector).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
				setTimeout(function() {
					$(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    })

	    // tabla local facturas
	    jQuery(grid_selector).jqGrid({	        
	        autoencode: false,
	        datatype: "local",
			height: 250,
	        colNames: ['','ID','ID_PAGO','CÓDIGO','DESCRIPCIÓN','CANTIDAD','VALOR UNITARIO','DESCUENTO','CALCULADO','VALOR TOTAL'],
	        colModel:[  
	        	{name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions', formatoptions: {keys: false, delbutton: true, editbutton: false}}, 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true}, 
			    {name:'id_pago',index:'id_pago', frozen:true, align:'left', search:false, hidden: true},     
	            {name:'codigo',index:'codigo', frozen:true, align:'left', search:false, hidden: false},
	            {name:'descripcion',index:'descripcion',frozen : true,align:'left',search:true,width: '300px'},
	            {name:'cantidad',index:'cantidad',frozen : true,align:'left',search:true,width: '150px'},
	            {name:'precio',index:'precio',frozen : true,align:'left',search:true,width: '150px'},
	            {name:'descuento',index:'descuento',frozen : true,align:'left',search:true,width: '100px'},
	            {name:'cal_des', index:'cal_des', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 70},
	            {name:'valor_total',index:'valor_total',frozen : true,align:'left',search:false,width: '150px'}
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
	        viewrecords : true,
	        shrinkToFit: true,
	        delOptions: {
	            modal: true,
	            jqModal: true,
	            onclickSubmit: function(rp_ge, rowid) {
	                var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            		var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);

	                var subtotal = 0;
                    var sub = 0;
                    var iva = 0;

                    var fil = jQuery("#table").jqGrid("getRowData");
                    for (var t = 0; t < fil.length; t++) {
                    	var dd = fil[t];
                    	subtotal = parseFloat(dd['valor_total']);
                    	sub = subtotal;
                    	iva = (sub * 0.14).toFixed(3); 

                    	subtotal0 = parseFloat($("#base_imponible").val()) + 0;
                    	subtotal12 = parseFloat($("#subtotal").val()) - parseFloat(sub);
                    	iva14 = parseFloat($("#iva").val()) - parseFloat(iva);
                    	descu_total = parseFloat(descu_total) - parseFloat(dd['cal_des']);

                    	subtotal0 = parseFloat(subtotal0).toFixed(2);
                        subtotal12 = parseFloat(subtotal12).toFixed(2);
                        iva14 = parseFloat(iva14).toFixed(2);
                        descu_total = parseFloat(descu_total).toFixed(2);
                    }

                    total_total = parseFloat(total_total) + (parseFloat(subtotal0) + parseFloat(subtotal12) + parseFloat(iva14));
       				total_total = parseFloat(total_total).toFixed(2);

       				$("#subtotal").val(formatNumber.new(subtotal12));
       				$("#descuento_total").val(descu_total);
       				$("#iva").val(formatNumber.new(iva14));
       				$("#total_pagar").val(total_total);



	                // var fil = jQuery("#list").jqGrid("getRowData"); 
	                // for (var t = 0; t < fil.length; t++) {
	                //     if(ret.iva == "Si") {
	                //       if(ret.incluye == "No") {
	                //           subtotal = ret.total;
	                //           sub1 = subtotal;
	                //           iva1 = (sub1 * 0.12).toFixed(3);                                          

	                //           subtotal0 = parseFloat($("#total_p").val()) + 0;
	                //           subtotal12 = parseFloat($("#total_p2").val()) - parseFloat(sub1);
	                //           subtotal_total = parseFloat($("#sub").val()) - parseFloat(sub1);
	                //           iva12 = parseFloat($("#iva").val()) - parseFloat(iva1);
	                //           descu_total = parseFloat($("#desc").val()) - parseFloat(ret.cal_des);

	                //           subtotal0 = parseFloat(subtotal0).toFixed(3);
	                //           subtotal12 = parseFloat(subtotal12).toFixed(3);
	                //           subtotal_total = parseFloat(subtotal_total).toFixed(3);
	                //           iva12 = parseFloat(iva12).toFixed(3);
	                //           descu_total = parseFloat(descu_total).toFixed(3);
	                //           suma_total = parseFloat($("#num").val()) - parseFloat(ret.cantidad);
	                //       } else {
	                //         if(ret.incluye == "Si") {
	                //             subtotal = ret.total;
	                //             sub2 = (subtotal / 1.12).toFixed(3);
	                //             iva2 = (sub2 * 0.12).toFixed(3);

	                //             subtotal0 = parseFloat($("#total_p").val()) + 0;
	                //             subtotal12 = parseFloat($("#total_p2").val()) - parseFloat(sub2);
	                //             subtotal_total = parseFloat($("#sub").val()) - parseFloat(sub2);
	                //             iva12 = parseFloat($("#iva").val()) - parseFloat(iva2);
	                //             descu_total = parseFloat($("#desc").val()) - parseFloat(ret.cal_des);

	                //             subtotal0 = parseFloat(subtotal0).toFixed(3);
	                //             subtotal12 = parseFloat(subtotal12).toFixed(3);
	                //             subtotal_total = parseFloat(subtotal_total).toFixed(3);
	                //             iva12 = parseFloat(iva12).toFixed(3);
	                //             descu_total = parseFloat(descu_total).toFixed(3);
	                //             suma_total = parseFloat($("#num").val()) - parseFloat(ret.cantidad);
	                //             }
	                //         }
	                //     } else {
	                //       if (ret.iva == "No") {
	                //           subtotal = ret.total;
	                //           sub = subtotal;

	                //           subtotal0 = parseFloat($("#total_p").val()) - parseFloat(sub);
	                //           subtotal12 = parseFloat($("#total_p2").val()) + 0;
	                //           subtotal_total = parseFloat($("#sub").val()) - parseFloat(sub);
	                //           iva12 = parseFloat($("#iva").val()) + 0;
	                //           descu_total = parseFloat($("#desc").val()) - parseFloat(ret.cal_des);
	                          
	                //           subtotal0 = parseFloat(subtotal0).toFixed(3);
	                //           subtotal12 = parseFloat(subtotal12).toFixed(3);
	                //           subtotal_total = parseFloat(subtotal_total).toFixed(3);
	                //           iva12 = parseFloat(iva12).toFixed(3);
	                //           descu_total = parseFloat(descu_total).toFixed(3);
	                //           suma_total = parseFloat($("#num").val()) - parseFloat(ret.cantidad);
	                //         }
	                //     }
	                // }

	                // total_total = parseFloat(total_total) + (parseFloat(subtotal0) + parseFloat(subtotal12) + parseFloat(iva12));
	                // total_total = parseFloat(total_total).toFixed(3);

	                // var item = fil.length - 1;
	                // $("#total_p").val(subtotal0);
	                // $("#total_p2").val(subtotal12);
	                // $("#sub").val(subtotal_total);
	                // $("#iva").val(iva12);
	                // $("#desc").val(descu_total);
	                // $("#tot").val(total_total);
	                // $("#items").val(item);
	                // $("#num").val(suma_total);

	                var su = jQuery("#table").jqGrid('delRowData', rowid);
	                if (su == true) {
	                rp_ge.processing = true;
	                $(".ui-icon-closethick").trigger('click'); 
	                }
	              return true;
	            },
	            processing: true
	        },
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
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);	            
	        },
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
	        refresh: false,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: false,
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
	        afterShowSearch: function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function() {
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
	        url: 'data/facturas/xml_facturas.php',       
	        colNames: ['ID','IDENTIFICACIÓN','CLIENTE','SERIE','FECHA','TOTAL','ACCIÓN','SUBIR'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'ruc',index:'ruc', frozen:true, align:'left', search:false, hidden: false},
	            {name:'empresa',index:'empresa',frozen : true,align:'left', search:true, width: '240px'},
	            {name:'serie',index:'serie',frozen : true, hidden: false, align:'left', search:true,width: '130px'},
	            {name:'fecha_emision',index:'fecha_emision',frozen : true, align:'left', search:true,width: '100px'},
	            {name:'total_factura',index:'total_factura',frozen : true, align:'left', search:true,width: '70px'},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '60px'},
	            {name:'subir', index:'subir', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '60px'},
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
				var ids = jQuery(grid_selector2).jqGrid('getDataIDs');
				for(var i = 0;i < ids.length;i++) {
					var id_factura = ids[i];
					pdf = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_factura+"')\" title='Reporte Factura' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'></i></a>";
					subir = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_factura+"')\" title='Reporte Factura' ><i class='fa fa-cloud-upload red2' style='cursor:pointer; cursor: hand'></i></a>"; 					 					
					jQuery(grid_selector2).jqGrid('setRowData',ids[i],{accion:pdf,subir:subir});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector2).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector2).jqGrid('getRowData',gsr);
            	var id = ret.id;
	        },
	        
	        caption: "LISTA FACTURAS"
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
	        afterShowSearch: function(e) {
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
	        beforeShowForm: function(e) {
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

	/*jqgrid table 2 buscador*/    
	// jQuery(function($) {
	//     var grid_selector2 = "#table2";
	//     var pager_selector2 = "#pager2";
	    
	//     $(window).on('resize.jqGrid', function () {
	// 		$(grid_selector2).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
	//     }).trigger('resize');  

	//     var parent_column = $(grid_selector2).closest('[class*="col-"]');
	// 	$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	// 		if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	// 			//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
	// 			setTimeout(function() {
	// 				$(grid_selector2).jqGrid( 'setGridWidth', parent_column.width() );
	// 			}, 0);
	// 		}
	//     })

	//     // buscador facturas
	//     jQuery(grid_selector2).jqGrid({	 
	//     	datatype: "xml",
	// 	    url: 'data/facturas/xml_facturas.php',         
	//         // autoencode: false,
	// 		height: 370,
	//         colNames: ['ID','IDENTIFICACIÓN','CLIENTE','DIRECCIÓN','FECHA EMISIÓN','TOTAL FACTURA','ACCIÓN'],
	//         colModel:[ 
	// 		    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	//             {name:'ruc',index:'ruc', frozen:true, align:'left', search:false, hidden: false},
	//             {name:'empresa',index:'empresa',frozen : true,align:'left', search:true, width: '300px'},
	//             {name:'direccion',index:'direccion',frozen : true, hidden: true, align:'left', search:true,width: '300px'},
	//             {name:'fecha_actual',index:'fecha_actual',frozen : true, align:'left', search:true,width: '150px'},
	//             {name:'total_pagar',index:'total_pagar',frozen : true, align:'left', search:true,width: ''},
	//             {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '80px'},
	//         ],          
	//         rowNum: 10,       
	//         width:600,
	//         // shrinkToFit: false,
	//         // height:250,
	//         rowList: [10,20,30],
	//         pager: pager_selector2,        
	//         sortname: 'id',
	//         sortorder: 'asc',
	//         altRows: true,
	//         multiselect: false,
	//         viewrecords : true,
	//         loadComplete : function() {
	//             var table = this;
	//             setTimeout(function() {
	//                 styleCheckbox(table);
	//                 updateActionIcons(table);
	//                 updatePagerIcons(table);
	//                 enableTooltips(table);
	//             }, 0);
	//         },
	//         gridComplete: function() {
	// 			var ids = jQuery(grid_selector2).jqGrid('getDataIDs');
	// 			for(var i = 0;i < ids.length;i++) {
	// 				var id_factura = ids[i];
	// 				edit = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_factura+"')\" title='Reporte Factura' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 					
	// 				jQuery(grid_selector2).jqGrid('setRowData',ids[i],{accion:edit});
	// 			}	
	// 		},
	//         ondblClickRow: function(rowid) {     	            	            
	//             var gsr = jQuery(grid_selector2).jqGrid('getGridParam','selrow');                                              
 //            	var ret = jQuery(grid_selector2).jqGrid('getRowData',gsr);
 //            	$("#table").jqGrid("clearGridData", true);	

 //            	$.ajax({
	// 				url: 'data/facturas/app.php',
	// 				type: 'post',
	// 				data: {llenar_cabezera_factura:'llenar_cabezera_factura',id: ret.id},
	// 				dataType: 'json',
	// 				success: function (data) {
	// 					$('#id_factura').val(data.id_factura);
	// 					$('#id_cliente').val(data.id_clientes);
	// 					$('#ruc').val(data.ruc);
	// 					$('#cliente').val(data.cliente);
	// 					$('#direccion').val(data.direccion);
	// 					$('#telefono').val(data.telefono);
	// 					$('#correo').val(data.correo);
	// 					$('#fecha_emision').val(data.fecha_actual);
	// 					$("#select_forma").select2('val', data.pago).trigger("change");
	// 					$('#serie_factura').val(data.serie.substr(8, 20));
	// 					$('#subtotal').val(data.subtotal);
	// 					$('#descuento_total').val(data.descuento);
	// 					$('#base_imponible').val(data.base_imponible);
	// 					$('#iva').val(data.iva);
	// 					$('#otros').val(data.otros);
	// 					$('#total_pagar').val(data.total_pagar);

	// 					if(data.estado == "2") {
 //                            $("#estado").append($("<h3>").text("Anulada"));
 //                            $("#estado h3").css("color","red");
 //                            $("#btn_3").attr("disabled", true);
 //                        } else {
 //                            $("#estado h3").remove();
 //                            $("#btn_3").attr("disabled", false);
 //                        }
	// 				}
	// 			});

	// 			$.ajax({
	// 				url: 'data/facturas/app.php',
	// 				type: 'post',
	// 				data: {llenar_detalle_factura:'llenar_detalle_factura',id: ret.id},
	// 				dataType: 'json',
	// 				success: function (data) {
	// 					var tama = data.length;
	// 					for (var i = 0; i < tama; i = i + 7) {
	// 						var datarow = {
 //                                id: data[i], 
 //                                codigo: data[i + 1], 
 //                                descripcion: data[i + 2], 
 //                                cantidad: data[i + 3], 
 //                                precio: data[i + 4], 
 //                                descuento: data[i + 5], 
 //                                valor_total: data[i + 6]
 //                                };

 //                            jQuery("#table").jqGrid('addRowData',data[i],datarow);
	// 					}
	// 				}
	// 			});  

	// 			$('#myModal').modal('hide'); 
	// 	        $('#btn_0').attr('disabled', true);           
	//         },
	//          caption: "LISTA FACTURAS"
	//     });

	//     $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	//     function aceSwitch( cellvalue, options, cell ) {
	//         setTimeout(function(){
	//             $(cell) .find('input[type=checkbox]')
	//             .addClass('ace ace-switch ace-switch-5')
	//             .after('<span class="lbl"></span>');
	//         }, 0);
	//     }	    	   

	//     jQuery(grid_selector2).jqGrid('navGrid',pager_selector2,
	//     {   //navbar options
	//         edit: false,
	//         editicon : 'ace-icon fa fa-pencil blue',
	//         add: false,
	//         addicon : 'ace-icon fa fa-plus-circle purple',
	//         del: false,
	//         delicon : 'ace-icon fa fa-trash-o red',
	//         search: true,
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
	//         $(grid_selector2).jqGrid('GridUnload');
	//         $('.ui-jqdialog').remove();
	//     });
	// });
	// fin

	/*jqgrid table 3 buscador*/    
	jQuery(function($) {
	    var grid_selector3 = "#table3";
	    var pager_selector3 = "#pager3";
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector3).jqGrid( 'setGridWidth', $("#myModal2 .modal-dialog").width()-30);
	    }).trigger('resize');  

	    var parent_column = $(grid_selector3).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
				//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
				setTimeout(function() {
					$(grid_selector3).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    })

	    // buscador factura3
	    jQuery(grid_selector3).jqGrid({	 
	    	datatype: "xml",
		    url: 'data/facturas/xml_pagos.php',         
	        autoencode: false,
			height: 250,
	        colNames: ['ID','ID_CUENTAS','FECHA PAGO','CUOTAS','MONTO TOTAL','ESTADO'],
	        colModel:[ 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'id_cuentas_cobrar',index:'id_cuentas_cobrar', frozen:true, align:'left', search:false, hidden: true},
	            {name:'fecha_pagos',index:'fecha_pagos',frozen : true,align:'left', search:true, width: ''},
	            {name:'cuotas',index:'cuotas',frozen : true, hidden: false, align:'left', search:false,width: ''},
	            {name:'saldo',index:'saldo',frozen : true, align:'left', search:false,width: ''},
	            {name:'estado',index:'estado',frozen : true, align:'left', search:false,width: '100px', hidden: true}
	        ],          
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
	            var gsr = jQuery(grid_selector3).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector3).jqGrid('getRowData',gsr);
            	$("#table").jqGrid("clearGridData", true);
            	var subtotal0 = 0;
			    var subtotal12 = 0;
			    var iva14 = 0;
			    var total_total = 0;
			    var descu_total = 0; 

			    var descuento = 0;
                var total = 0;
                var desc = 0;
                var precio = 0;
                var multi = 0;
                var flotante = 0;
                var resultado = 0;
 				   
 				$.ajax({
					url: 'data/facturas/app.php',
					type: 'post',
					data: {llenar_paquetes:'llenar_paquetes',id: ret.id_cuentas_cobrar},
					dataType: 'json',
					success: function (data) {
						var id_impacto = data.id;
						var codigo = data.codigo;
						var descripcion = data.descripcion;
						var desc = data.descuento;

                        precio = (parseFloat(ret.cuotas)).toFixed(3);
                        multi = (parseFloat(1) * parseFloat(precio)).toFixed(3);
                        descuento = ((multi * parseFloat(desc)) / 100);
                        flotante = parseFloat(descuento);
                        resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                        total = (parseFloat(1) * precio).toFixed(3);

						var datarow = {
		                    id: id_impacto,
		                    id_pago: ret.id, 
		                    codigo: codigo, 
		                    descripcion: descripcion, 
		                    cantidad: 1, 
		                    precio: precio, 
		                    descuento: descuento, 
		                    cal_des: resultado,
		                    valor_total: total
	                    };

		                jQuery("#table").jqGrid('addRowData',ret.id,datarow);

		                // calcular
                        var subtotal = 0;
	                    var sub = 0;
	                    var iva = 0;

	                    var fil = jQuery("#table").jqGrid("getRowData");
	                    for (var t = 0; t < fil.length; t++) {
	                    	var dd = fil[t];
	                    	subtotal = dd['valor_total'];
	                    	sub = subtotal;
                        	iva = (sub * 0.14).toFixed(3); 

                        	subtotal0 = parseFloat(subtotal0) + 0;
                        	subtotal12 = parseFloat(subtotal12) + parseFloat(sub);
                        	iva14 = parseFloat(iva14) + parseFloat(iva);
                        	descu_total = parseFloat(descu_total) + parseFloat(dd['cal_des']);

                        	subtotal0 = parseFloat(subtotal0).toFixed(3);
                            subtotal12 = parseFloat(subtotal12).toFixed(3);
                            iva14 = parseFloat(iva14).toFixed(3);
                            descu_total = parseFloat(descu_total).toFixed(3);
	                    }

	                    total_total = parseFloat(total_total) + (parseFloat(subtotal0) + parseFloat(subtotal12) + parseFloat(iva14));
           				total_total = parseFloat(total_total).toFixed(2);

           				$("#subtotal").val(subtotal12);
           				$("#descuento_total").val(descu_total);
           				$("#iva").val(iva14);
           				$("#total_pagar").val(total_total);
					}
				}); 

				$('#myModal2').modal('hide');            
	        },
	         caption: "LISTA PAGOS"
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
	    {   //navbar options
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
});