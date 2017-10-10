angular.module('scotchApp').controller('contratos_selectivosController', function ($scope, $interval,GenerarContrato) {

	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab == tabNum;
    };
    // fin

	jQuery(function($) {
		// para horas 
	    function show() {
		    var Digital = new Date();
		    var hours = Digital.getHours();
		    var minutes = Digital.getMinutes();
		    var seconds = Digital.getSeconds();
		    var dn = "AM";    
		    if (hours > 12) {
		        dn = "PM";
		        hours = hours - 12;
		    }
		    if (hours == 0)
		        hours = 12;
		    if (minutes <= 9)
		        minutes = "0" + minutes;
		    if (seconds <= 9)
		        seconds = "0" + seconds;

		    $scope.hora_actual = hours + ":" + minutes + ":" + seconds + " " + dn;
		}

		$interval(function() {
			show();
		}, 1000);
		// fin

		//add tooltip for small view action buttons in dropdown menu
		$('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
		
		//tooltip placement on right or left
		function tooltip_placement(context, source) {
			var $source = $(source);
			var $parent = $source.closest('table')
			var off1 = $parent.offset();
			var w1 = $parent.width();
	
			var off2 = $source.offset();
			//var w2 = $source.width();
			if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
			return 'left';
		}
		// Fin tablas

		var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); 
		var f = new Date(); 
		var fecha_actual = f.getDate() + " de " + meses[f.getMonth()] + " del " + f.getFullYear()
		$('#bonificacion').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#spots').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#mensiones').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		// $('#valor').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});

		function showErrorAlert (reason, detail) {
			var msg='';
			if (reason ==='unsupported-file-type') {
				msg = "Unsupported format " +detail; 
			} else {
				//console.log("error uploading file", reason, detail);
			}
			$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
			 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
		}

		$('#editor2').css({'height':'400px'}).ace_wysiwyg({
			toolbar_place: function(toolbar) {
				return $(this).closest('.widget-box')
				       .find('.widget-header').prepend(toolbar)
					   .find('.wysiwyg-toolbar').addClass('inline');
			},
			toolbar:
			[
				'bold',
				{name:'italic' , title:'Change Title!', icon: 'ace-icon fa fa-leaf'},
				'strikethrough',
				null,
				'insertunorderedlist',
				'insertorderedlist',
				null,
				'justifyleft',
				'justifycenter',
				'justifyright'
			],
			speech_button: false
		});
		// fin

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

		// limpiar select2
		$("#select_tipo_paquete,#select_paquete,#select_tipo_contrato,#select_programa").select2({
		  	allowClear: true
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

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// busqueda ruc cliente
		var busqueda_ruc = 'ruc';

        $("#ruc").autocomplete({
            source: "data/contratos_selectivos/app.php?tipo_busqueda=" + busqueda_ruc,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#ruc").val(ui.item.value); 
            $("#cliente").val(ui.item.cliente);
            return false;
            },
            select: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#ruc").val(ui.item.value); 
            $("#cliente").val(ui.item.cliente);
            return false;
            }
        });
	    // fin

	    // busqueda cliente nombre
		var busqueda_nombre = 'nombre';

        $("#cliente").autocomplete({
            source: "data/contratos_selectivos/app.php?tipo_busqueda=" + busqueda_nombre,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#cliente").val(ui.item.value);
            $("#ruc").val(ui.item.ruc);
            return false;
            },
            select: function(event, ui) {
            $("#id_cliente").val(ui.item.id_cliente); 
            $("#cliente").val(ui.item.value);
            $("#ruc").val(ui.item.ruc);
            return false;
            }
        });
	    // fin

	    // llenar perfil usuario
		function select_perfil_usuario() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {consultar_perfil:'consultar_perfil'},
				dataType: 'json',
				success: function (data) {
					localStorage.setItem("perfil", data.nombre);
					if (data.nombre == 'VENDEDOR') {
						document.getElementById("ventas").disabled = true;
						document.getElementById("gerencia").disabled = true;	
					} else {
						if (data.nombre == 'DEPARTAMENTO VENTAS') {
							document.getElementById("ventas").disabled = false;
							document.getElementById("gerencia").disabled = true;
						} else {
							if (data.nombre == 'GERENCIA') {
								document.getElementById("ventas").disabled = false;
								document.getElementById("gerencia").disabled = false;
							} else {
								if (data.nombre == 'ADMINISTRADOR') {
									document.getElementById("ventas").disabled = false;
									document.getElementById("gerencia").disabled = false;
								}	
							}	
						}	
					}
				}
			});
		}
		// fin

		// llenar combo tipo contrato
		function select_tipo_contrato() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {llenar_tipo_contrato:'llenar_tipo_contrato'},
				success: function (data) {
					$('#select_tipo_contrato').html(data);
				}
			});
		}
		// fin

		// llenar combo tipo paquete
		function select_tipo_paquete() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {llenar_tipo_paquete:'llenar_tipo_paquete'},
				success: function (data) {
					$('#select_tipo_paquete').html(data);
				}
			});
		}
		// fin

		//selectores anidados para tipo_paquete_paquete
		$("#select_tipo_paquete").change(function () {
			$("#select_paquete").select2('val', 'All');
	        $("#select_tipo_paquete option:selected").each(function () {
	            id = $(this).val();

	            $.ajax({
					url: 'data/contratos_selectivos/app.php',
					type: 'post',
					data: {llenar_paquete:'llenar_paquete',id: id},
					success: function (data) {
						$('#select_paquete').html(data);
					}
				});

				document.getElementById("ninguno").checked = true;
				$('#total_contrato').val('0.00');
		   });
		});
		// fin

		// llenar precio paquetes
		$("#select_paquete").change(function () {
			id = $(this).val();

			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {llenar_impactos:'llenar_impactos', id: id},
				dataType: 'json',
				success: function (data) {
					document.getElementById("ninguno").checked = true;
					$scope.precio1 = data.precio1;
					$scope.precio2 = data.precio2;
					$scope.precio3 = data.precio3;
					$scope.precio4 = data.precio4;
					$('#total_contrato').val(data.precio1);					
				}
			});
			// fin
		});

		// valores radio
		$('input:radio[name="descuento"]').change(function() {
			var valor = $(this).val();

			if (valor != '') {
				$('#total_contrato').val(valor);
			} else {
				$('#total_contrato').val('0.00');	
			}
            
		});	
		// fin	

		// llenar combo programa
		function select_programa() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {llenar_programa:'llenar_programa'},
				success: function (data) {
					$('#select_programa').html(data);
				}
			});
		}
		// fin

		// llenar combo vendedor
		function select_vendedor() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {llenar_vendedor:'llenar_vendedor'},
				success: function (data) {
					$('#select_vendedor').html(data);
				}
			});
		}
		// fin

		// llenar combo porcentaje
		function select_porcentaje() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {llenar_porcentaje:'llenar_porcentaje'},
				success: function (data) {
					$('#select_porcentaje').html(data);
				}
			});
		}
		// fin

		// cambiar atributo boton
		$('#btn_abrir').click(function() {
			$('#btn_0').attr('disabled', false);
			$("#btn_0").text("");
	    	$("#btn_0").append("<i class='ace-icon fa fa-save'></i> Guardar");
		});
		// fin

		// guardar contratos/modificar
		$('#btn_0').click(function() {
			var progra = document.getElementById("select_programacion");
			progra = progra.options[progra.selectedIndex].text;

        	if($('#select_tipo_contrato').val() == '') {
				$.gritter.add({
					title: 'Seleccione un Contrato',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				document.getElementById("select_tipo_contrato").focus();	
			} else {
				if($('#id_cliente').val() == '') {
					$.gritter.add({
						title: 'Seleccione un Cliente',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
					$('#ruc').focus();	
				} else {
					if($('#select_tipo_paquete').val() == '') {
						$.gritter.add({
							title: 'Seleccione Tipo de Paquete',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
					} else {
						if($('#select_paquete').val() == '') {
							$.gritter.add({
								title: 'Seleccione un Paquete',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
						} else {
							if($('#duracion').val() == '') {
								$.gritter.add({
									title: 'Ingrese Duración del Contrato',
									class_name: 'gritter-error gritter-center',
									time: 1000,
								});
								$('#duracion').focus();	
							} else {
								if(progra == 'SELECTIVA' && $('#select_programa').val() == '') {
									$.gritter.add({
										title: 'Seleccione un Programa',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});		
								} else {
									if($('#select_vendedor').val() == '') {
										$.gritter.add({
											title: 'Seleccione un Vendedor',
											class_name: 'gritter-error gritter-center',
											time: 1000,
										});
									} else {
										if($('#select_porcentaje').val() == '') {
											$.gritter.add({
												title: 'Seleccione un Porcentaje',
												class_name: 'gritter-error gritter-center',
												time: 1000,
											});
										} else {
											// $('#btn_0').attr('disabled', true);
											var form = $("#form_registro").serialize();
											var texto = ($("#btn_0").text()).trim();

											if(texto == "Guardar") {
												var submit = "btn_guardar";

												$.ajax({
											        url: "data/contratos_selectivos/guardar.php",
											        data: form +"&btn_guardar=" + submit,
											        type: "POST",
											        success: function (data) {
											        	var id = data;
											        	bootbox.alert("Gracias! Por su Información Datos Agregados Correctamente!!", function() {
											        		var myWindow = window.open('data/contratos_selectivos/template.php?id='+id);
														  	location.reload();
														});                                              
											        },
											        error: function (xhr, status, errorThrown) {
												        alert("Hubo un problema!");
												        console.log("Error: " + errorThrown);
												        console.log("Status: " + status);
												        console.dir(xhr);
											        }

											    });
										    } else {
										    	var submit = "btn_modificar";

										    	$.ajax({
											        url: "data/contratos_selectivos/app.php",
											        data: form +"&btn_modificar=" + submit,
											        type: "POST",
											        success: function (data) {
											        	var id = data;
											        	bootbox.alert("Gracias! Por su Información Datos Modificados Correctamente!!", function() {
											        		// var myWindow = window.open('data/contratos_selectivos/template.php?id='+id);
														  	location.reload();
														});                                              
											        },
											        error: function (xhr, status, errorThrown) {
												        alert("Hubo un problema!");
												        console.log("Error: " + errorThrown);
												        console.log("Status: " + status);
												        console.dir(xhr);
											        }
											    });
											}
										}
								    }	
								}
				  			}
			  			}
		  			}
		  		}
	  		}
		});
		// fin

		// actualizar formulario
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// vizualizar contrato
		$('#btn_vizualizar').click(function() {
			var progra = document.getElementById("select_programacion");
			progra = progra.options[progra.selectedIndex].text;

        	if($('#select_tipo_contrato').val() == '') {
				$.gritter.add({
					title: 'Seleccione un Contrato',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				if($('#id_cliente').val() == '') {
					$.gritter.add({
						title: 'Seleccione un Cliente',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
					$('#ruc').focus();	
				} else {
					if($('#select_tipo_paquete').val() == '') {
						$.gritter.add({
							title: 'Seleccione Tipo de Paquete',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
					} else {
						if($('#select_paquete').val() == '') {
							$.gritter.add({
								title: 'Seleccione un Paquete',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
						} else {
							if($('#duracion').val() == '') {
								$.gritter.add({
									title: 'Ingrese Duración del Contrato',
									class_name: 'gritter-error gritter-center',
									time: 1000,
								});
								$('#duracion').focus();	
							} else {
								if(progra == 'SELECTIVA' && $('#select_programa').val() == '') {
									$.gritter.add({
										title: 'Seleccione un Programa',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});		
								} else {
						        	// contratos
						        	var contrato = document.getElementById("select_tipo_contrato");
						        	contrato = contrato.options[contrato.selectedIndex].text;

						        	$scope.titulo = contrato; 
						        	// fin

						        	// llenar datos clientes
									$.ajax({
										url: 'data/contratos_selectivos/app.php',
										type: 'post',
										data: {llenar_clientes:'llenar_clientes',id: $('#id_cliente').val()},
										dataType: 'json',
										success: function (data) {
											$scope.representante = ' ' + data.representante + ' ';
											$scope.ci = ' ' + data.identificacion;
											$scope.empresa = ' ' + data.empresa;
										}
									});
									// fin

									// tipo contrato
									$scope.tipo_contrato = contrato;
									// fin 
									
									// duracion
									$scope.dura = $('#duracion').val();
									// fin

									// descomponer fecha inicio
									var tem = $('#fecha_inicio').val();
									var res1 = tem.substr(8, 10); 
									var res2 = parseInt(tem.substr(6, 7)); 
									var res3 = tem.substr(0, 4); 
									var fecha_inicio = res1 + " de " + meses[res2 - 1] + " del " + res3;
									$scope.fecha_ini = fecha_inicio;
									// fin

									// descomponer fecha fin
									var tem2 = $('#fecha_fin').val();
									var res4 = tem2.substr(8, 10); 
									var res5 = parseInt(tem2.substr(6, 7)); 
									var res6 = tem2.substr(0, 4); 
									var fecha_fin = res4 + " de " + meses[res5 - 1] + " del " + res6;
									$scope.fecha_final = fecha_fin;
									// fin

									// programacion
									$scope.programacion = progra;
									// fin

									// bonificacion
									$scope.boni = $('#bonificacion').val();
									// fin

									// llenar impactos
									$.ajax({
										url: 'data/contratos_selectivos/app.php',
										type: 'post',
										data: {llenar_impactos:'llenar_impactos',id: $('#select_paquete').val()},
										dataType: 'json',
										success: function (data) {
											$scope.impactos = ' ' + data.descripcion + ' ';
											$scope.precio = '$ ' + data.precio;						
										}
									});
									// fin

									if (progra == 'SELECTIVA') {
										// programas
										var programa = document.getElementById("select_programa");
										$scope.programa = programa.options[programa.selectedIndex].text;
						  				// fin
									} else {
										if (progra == 'ROTATIVA') {
											// programas
											$scope.programa = 'ROTATIVO';
											// fin
										}	
									}
					  			}
				  			}
			  			}
		  			}
		  		}
	  		}
		});

		// validacion punto
		function ValidPun() {
		    var key;
		    if (window.event) {
		        key = event.keyCode;
		    } else if (event.which) {
		        key = event.which;
		    }

		    if (key < 48 || key > 57) {
		        if (key == 46 || key == 8) {
		            return true;
		        } else {
		            return false;
		        }
		    }
		    return true;
		}
		// fin

		// inicio
		// document.getElementById("ventas").disabled = true;
		// document.getElementById("gerencia").disabled = true;
		$("#valor").keypress(ValidPun);
		$("#total_contrato").keypress(ValidPun);
	    select_perfil_usuario();
		select_tipo_contrato();
		select_tipo_paquete();
		select_programa();
		select_vendedor();
		select_porcentaje();
		// fin

		// inicio lineas llenar
		$scope.titulo = '_______________________________________';
		$scope.representante = '_________________________________';
		$scope.ci = '__________________';
		$scope.empresa = '___________________________________________';
		$scope.tipo_contrato = '__________________';
		$scope.dura = '__________';
		$scope.fecha_ini = '__________________';
		$scope.fecha_final = '__________________';
		$scope.programacion = '__________________';
		$scope.impactos = '__________________';
		$scope.programa = '_________________';
		$scope.boni = '0';
		$scope.precio = '_________';
		$scope.fecha_actual = fecha_actual;
		// fin 
	});
	// fin

	// abrir en una nueva ventana contratos
	$scope.methodword = function(id) { 
		var myWindow = window.open('data/contratos_selectivos/template.php?id='+id);
	} 
	// fin

	// abrir en una nueva ventana contratos
	$scope.methodopdf = function(id) {
		$.ajax({
			url: 'data/contratos_selectivos/app.php',
			type: 'post',
			data: {llenar_programacion:'llenar_programacion',id: id},
			dataType: 'json',
			success: function (data) {
				$.ajax({
					url: 'data/contratos_selectivos/app.php',
					type: 'post',
					data: {llenar_pdf:'llenar_pdf',id: id, programacion: data.programacion},
					dataType: 'json',
					success: function (data) {
						GenerarContrato.get({
			                titulo: data.nombre_tipo,
			                programacion: data.programacion,
			                codigo: data.codigo_contrato,
			                representante: data.representante_legal,
			                ci: data.cedula_representante,
			                celular: data.celular,
			                empresa: data.nombre_comercial,
			                ruc_empresa: data.ruc_empresa,
			                dura: data.duracion,
			                fecha_ini: data.fecha_inicio,
			                fecha_final: data.fecha_final,
			                programa: data.nombre_programa,
			                spots: data.spots,
			                mensiones: data.mensiones,
			                impactos: data.descripcion,
			                boni: data.bonificacion,
			                precio: data.suma_mes,
			                letras: data.letras,
			                detalle: data.detalle,
			                fecha_contrato: data.fecha_contrato,
			                nombre_vendedor: data.nombre_vendedor,
			                ci_vendedor: data.ci_vendedor,
			                telf_vendedor: data.telf_vendedor
			            }).$promise.then(function(data) {
			            	// console.log(data.url);
			            	var myWindow = window.open(data.url,'popup','width=900,height=650');	
			            }, function(err) {
			                
			            }); 
					}
				});
			}
		});
		// fin 
	} 
	// fin

	// activar productos
	$scope.methodoestado = function(id) {
		$('#myModalfechas').modal('show');

		console.log('test');
		// bootbox.confirm({
		// 	message: "Está Seguro de Desactivar este Contrato?",
		// 	buttons: {
		// 	  confirm: {
		// 		 label: "<i class='ace-icon fa fa-check'></i>Confirmar",
		// 		 className: "btn-sm btn-success",
		// 	  },
		// 	  cancel: {
		// 		 label: "<i class='ace-icon fa fa-times'></i>Cancelar",
		// 		 className: "btn-sm btn-danger",
		// 	  }
		// 	},
		// 	callback: function(result) {
		// 		if(result) {
		// 			$.ajax({
		// 				url: 'data/contratos/app.php',
		// 				type: 'post',
		// 				data: {activar_contratos:'activar_contratos',id:id},
		// 				dataType: 'json',
		// 				async: true,
		// 				success: function (data) {
		// 					var val = data;
		// 					if(val == 1) {
		// 						// llenar_tabla();	
		// 					}
		// 				}
		// 			});	
		// 		}
		// 	}
		// });
	} 
	// fin
	
	/*jqgrid table 2 buscador*/    
	jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector).jqGrid( 'setGridWidth', $(".widget-main").width());
	    }).trigger('resize');  

	    var parent_column = $(grid_selector).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
				//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
				setTimeout(function() {
					$(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    })

	    // buscador facturas
	    jQuery(grid_selector).jqGrid({	 
	    	datatype: "xml",
		    url: 'data/contratos_selectivos/xml_contratos.php',         
	        autoencode: false,
	        colNames: ['ID','TIPO CONTRATO ','CÓDIGO','RUC','CLIENTE','FINALIZA','PROGRAMACIÓN','ESTADO','DESCARGAR', 'PDF','SUSPENDER'],
	        colModel:[ 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'tipo_contrato',index:'tipo_contrato', frozen:true, align:'left', search:false, hidden: false, width: '300px'},
	            {name:'codigo',index:'codigo',frozen : true,align:'left', search:true, width: '100px'},
	            {name:'ruc',index:'ruc',frozen : true, hidden: false, align:'left', search:true,width: '150px'},
	            {name:'cliente',index:'cliente',frozen : true, hidden: false, align:'left', search:true,width: '350px'},
	            {name:'finaliza',index:'finaliza',frozen : true, align:'left', search:true,width: '90px'},
	            {name:'programacion',index:'programacion',frozen : true, align:'left', search:true,width: '90px'},
	            {name:'estado',index:'estado',frozen : true, align:'left', search:true, hidden:true, width: '80px'},
	            {name:'descargar', index:'descargar', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '100px'},
	            {name:'pdf', index:'pdf', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: '100px'},
	            {name:'estado', index:'estado', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '100px'},
	        ],
	        rownumbers: true,          
	        rowNum: 10,       
	        width: 600,
	        shrinkToFit: false,
	        height: 330,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id',
	        sortorder: 'desc',
	        altRows: true,
	        multiselect: false,
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
	        gridComplete: function() {
				var ids = jQuery(grid_selector).jqGrid('getDataIDs');
				for(var i=0; i<ids.length; i++) {
					var id_contrato = ids[i];
					word = "<a onclick=\"angular.element(this).scope().methodword('"+id_contrato+"')\" title='Descargar Contrato' ><i class='fa fa-file-word-o blue' style='cursor:pointer; cursor: hand'>  WORD</i></a>"; 
					pdf = "<a onclick=\"angular.element(this).scope().methodopdf('"+id_contrato+"')\" title='Reporte Contrato' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 					
					estado = "<a onclick=\"angular.element(this).scope().methodoestado('"+id_contrato+"')\" title='Cambiar Estado' ><i class='fa fa-inbox red2' style='cursor:pointer; cursor: hand'> CAMBIAR</i></a>"; 					
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{descargar:word, estado:estado});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);
            	var id = ret.id;

				$('#myModal').modal('show');
				$('#btn_0').attr('disabled', false);
				$("#btn_0").text("");
	    		$("#btn_0").append("<i class='ace-icon fa fa-edit'></i> Modificar");

            	$.ajax({
					url: 'data/contratos_selectivos/app.php',
					type: 'post',
					data: {llenar_contratos:'llenar_contratos',id: id},
					dataType: 'json',
					success: function (data) {
						$('#id_contrato').val(data.id);
						$("#select_tipo_contrato").select2('val', data.id_tipo_contrato).trigger("change");
						$("#select_programacion").select2('val', data.programacion).trigger("change");
						$('#id_cliente').val(data.id_empresa);
						$('#ruc').val(data.ruc_empresa);
						$('#cliente').val(data.nombre_comercial);
						$("#select_tipo_paquete").select2('val', data.id_tipo_paquete).trigger("change");

						$("#select_paquete").select2('val', data.id_paquete).trigger("change");

						$('#fecha_inicio').val(data.fecha_inicio);
						$('#fecha_fin').val(data.fecha_final);
						$('#duracion').val(data.duracion);
						$("#select_programa").select2('val', data.id_programa).trigger("change");
						$('#bonificacion').val(data.bonificacion);
						$('#spots').val(data.spots);
						$('#mensiones').val(data.mensiones);
						$('#valor').val(data.valor);
						$('#detalles').val(data.detalle);
					}
				});          
	        },
	         // caption: "LISTA CONTRATOS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function() {
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
	    {   //navbar options
	        edit: false,
	        editicon: 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon: 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon: 'ace-icon fa fa-trash-o red',
	        search: true,
	        searchicon: 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon: 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon: 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm: function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm: function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        recreateForm: true,
	        beforeShowForm: function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;      
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form); 
	            form.data('styled', true);
	        },
	        onClick: function(e) {}
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
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
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
});