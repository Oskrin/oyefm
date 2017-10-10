angular.module('scotchApp').controller('anticiposController', function ($scope, $location,loaddatosSRI,$timeout, $parse, $localStorage) {
	
	jQuery(function($) {
		$('[data-toggle="tooltip"]').tooltip(); 
		$('#meses_anticipo').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
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

	    // para la hora
		$("#hora_salida,#hora_retorno").datetimepicker({
	    	pickDate: false
	    });
	    // fin

	    $("#select_empleado,#select_parte,#select_motivo_cargos").select2({
		  allowClear: true
		});
		// fin

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
				select_empleado: {
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
				select_empleado: {
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
					required: "Por favor, Seleccione forma de pago",
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

		//selectores anidados para sueldo
		$("#select_empleado").change(function () {
			id = $(this).val();

			$.ajax({
				url: 'data/anticipos/app.php',
				type: 'post',
				data: {llenar_sueldo:'llenar_sueldo',id: id},
				dataType: 'json',
				success: function (data) {
					var sueldo = data.sueldo;

					localStorage.setItem("sueldo", sueldo);
				}
			});
		});
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
				url: 'data/anticipos/app.php',
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

		// funcion validar solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
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

		// llenar combo empleado 3
		function llenar_select_empleado() {
			$.ajax({
				url: 'data/permisos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
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

		// inicio
		$('#btn_3').attr('disabled', true);
		$("#serie_permiso").keypress(ValidNum);
		$("#monto_anticipo").keypress(Valida_punto);
		llenar_select_empleado();
		cargar_codigo_anticipos();
		llenar_select_bancos();
		$("#serie_anticipo").keypress(ValidNum);
		$("#meses_anticipo").keypress(ValidNum);
		$("#cheque_numero").keypress(ValidNum);
		// fin

		// cargar ultimo codigo
		$('#btn_abrir').click(function() {
			$('#btn_0').attr('disabled', false);
			$("#btn_0").text("");
	    	$("#btn_0").append("<i class='ace-icon fa fa-save'></i> Guardar");
		});
		// fin

		// limpiar formulario
		function reset_form() {
			$(".datepicker").datepicker({ 
				format: "yyyy-mm-dd",
		        autoclose: true
			}).datepicker("setDate","today");

			cargar_codigo_anticipos();
			$("#select_empleado").select2('val', 'All');
			$("#meses_anticipo").val(0);
			$("#monto_anticipo").val('0.00');
	    	$("#select_forma_pago").select2('val', 'All');
	    	$("#cheque_numero").val('');
	    	$("#select_banco").select2('val', 'All');
	    	$("#cuenta").val('');	
		}
		// fin

		// guardar anticipos
		$('#btn_0').click(function() {
			// var respuesta = $('#form_anticipos').valid();
			if ($('#select_empleado').val() == '') {
				$.gritter.add({
					title: 'Seleccione un Empleado',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				if ($('#select_forma_pago').val() == '') {
					$.gritter.add({
						title: 'Seleccione forma Pago',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});	
				} else {
					var sueldo = localStorage.getItem("sueldo");
					var monto_anticipo = $('#monto_anticipo').val();
					var porcentaje = parseFloat(sueldo * 0.30).toFixed(2);
					if (monto_anticipo < porcentaje  ) {
						$.gritter.add({
							title: 'Monto máximo de anticipo es ' + porcentaje,
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});	
					} else {
						$('#btn_0').attr('disabled', true);
						var form_uno = $("#form_anticipos").serialize();
						var texto = ($("#btn_0").text()).trim();

						if(texto == "Guardar") {
							var submit = "btn_guardar";
							$.ajax({
						        url: "data/anticipos/app.php",
						        data: form_uno+"&btn_guardar=" + submit,
						        type: "POST",
						        success: function (data) {
						        	var val = data;
						        	if(data != '') {
						        		bootbox.alert("Gracias! Por su Información Datos Agregados Correctamente!", function() {
										  var myWindow = window.open('data/reportes/anticipos.php?id='+val,'popup','width=900,height=650'); 
										});

										reset_form();
										jQuery("#table").jqGrid().trigger("reloadGrid");
										$('#myModal').modal('hide');
							    	}                                                
						        },
						        error: function (xhr, status, errorThrown) {
							        alert("Hubo un problema!");
							        console.log("Error: " + errorThrown);
							        console.log("Status: " + status);
							        console.dir(xhr);
						        }
						    });
						} else {
							if(texto == "Modificar") {
								var submit = "btn_modificar";
								$.ajax({
							        url: "data/anticipos/app.php",
							        data: form_uno+"&btn_modificar=" + submit,
							        type: "POST",
							        success: function (data) {
							        	var val = data;
							        	if(data != '') {
							        		bootbox.alert("Gracias! Por su Información Datos Modificados Correctamente!", function() {
												var myWindow = window.open('data/reportes/anticipos.php?id='+val,'popup','width=900,height=650'); 
											});

											reset_form();
											jQuery("#table").jqGrid().trigger("reloadGrid");
											$('#myModal').modal('hide');
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
						}	
					}
				}	
			}

			// if (respuesta == true) {
			// 	$('#btn_0').attr('disabled', true);
			// 	var form_uno = $("#form_anticipos").serialize();
			// 	var texto = ($("#btn_0").text()).trim();

			// 	if(texto == "Guardar") {
			// 		var submit = "btn_guardar";
			// 		$.ajax({
			// 	        url: "data/anticipos/app.php",
			// 	        data: form_uno+"&btn_guardar=" + submit,
			// 	        type: "POST",
			// 	        success: function (data) {
			// 	        	var val = data;
			// 	        	if(data != '') {
			// 	        		bootbox.alert("Gracias! Por su Información Datos Agregados Correctamente!", function() {
			// 					  var myWindow = window.open('data/reportes/anticipos.php?id='+val,'popup','width=900,height=650'); 
			// 					});

			// 					reset_form();
			// 					jQuery("#table").jqGrid().trigger("reloadGrid");
			// 					$('#myModal').modal('hide');
			// 		    	}                                                
			// 	        },
			// 	        error: function (xhr, status, errorThrown) {
			// 		        alert("Hubo un problema!");
			// 		        console.log("Error: " + errorThrown);
			// 		        console.log("Status: " + status);
			// 		        console.dir(xhr);
			// 	        }
			// 	    });
			// 	} else {
			// 		if(texto == "Modificar") {
			// 			var submit = "btn_modificar";
			// 			$.ajax({
			// 		        url: "data/anticipos/app.php",
			// 		        data: form_uno+"&btn_modificar=" + submit,
			// 		        type: "POST",
			// 		        success: function (data) {
			// 		        	var val = data;
			// 		        	if(data != '') {
			// 		        		bootbox.alert("Gracias! Por su Información Datos Modificados Correctamente!", function() {
			// 							var myWindow = window.open('data/reportes/anticipos.php?id='+val,'popup','width=900,height=650'); 
			// 						});

			// 						reset_form();
			// 						jQuery("#table").jqGrid().trigger("reloadGrid");
			// 						$('#myModal').modal('hide');
			// 			    	}                                                
			// 		        },
			// 		        error: function (xhr, status, errorThrown) {
			// 			        alert("Hubo un problema!");
			// 			        console.log("Error: " + errorThrown);
			// 			        console.log("Status: " + status);
			// 			        console.dir(xhr);
			// 		        }
			// 		    });
			// 		}	
			// 	}
			// }
		});
		// fin

		// abrir en una nueva ventana reporte permisos
		$scope.methodopdf = function(id) { 
			var myWindow = window.open('data/reportes/anticipos.php?id='+id,'popup','width=900,height=650');
		} 
		// fin

		$scope.close = function () {
		    var $exampleModal = $("#myModal2");
		    $exampleModal.modal('hide');
		};

		$scope.methodoshare = function(id) {
			var $exampleModal = $("#myModal2"),
		    $exampleModalClose = $(".modal-header button");

		    $exampleModal.on("shown.bs.modal", function() {
		        document.activeElement.blur();
		        // $exampleModalClose.focus();
		        
		        $('#link').val('http://localhost/oyefm/data/reportes/anticipos.php?id='+id);
		        $('#link').focus();
		        $('#link').select();
		    });
		}		

		/*jqgrid*/    
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {
	        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
	        $(grid_selector).jqGrid( 'setGridWidth', $(".widget-main").width());
	    });
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width());
	            }, 0);
	        }
	    });

	    // buscador clientes
	    jQuery(grid_selector).jqGrid({	        
	        datatype: "xml",
	        url: 'data/anticipos/xml_anticipos.php',        
	        colNames: ['ID','SERIE','SOLICITANTE','MONTO ANTICIPO','FECHA PERMISO','MESES','FORMA PAGO','PDF', 'COMPARTIR'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true, width: ''},
	            {name:'serie',index:'serie',frozen : true,align:'left',search:true, width: '80px'},
	            {name:'solicitante',index:'solicitante',frozen : true,align:'left',search:true, width: '300px'},
	            {name:'monto_anticipo',index:'monto_anticipo',frozen : true,align:'left',search:false, width: '120px'},
	            {name:'fecha_permiso',index:'fecha_permiso',frozen : true,align:'left',search:false, hidden: false, width: '110px'},
	            {name:'meses',index:'meses',frozen : true,align:'left',search:false, hidden: false, width: '50px'},
	            {name:'forma_pago',index:'forma_pago',frozen : true,align:'left',search:false, hidden: false, width: '120px'},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '80px'},
	            {name:'share', index:'share', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '100px'}
	        ],          
	        rownumbers: true,
	        rowNum: 10,       
	        rowList: [10,20,30],
	        pager: pager_selector, 
	        shrinkToFit: false,
	        height: 340,       
	        sortname: 'id',
	        sortorder: 'desc',
	        altRows: true,
	        multiselect: false,
	        multiboxonly: true,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function() {
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        gridComplete: function() {
				var ids = jQuery(grid_selector).jqGrid('getDataIDs');
				for(var i = 0;i < ids.length;i++) {
					var id_anticipos = ids[i];
					edit = "<a onclick=\"angular.element(this).scope().methodopdf('"+id_anticipos+"')\" title='Reporte Anticipos' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> Pdf</i></a>"; 					
					share = "<a onclick=\"angular.element(this).scope().methodoshare('"+id_anticipos+"')\" title='Compartir Anticipos' data-toggle='modal' data-target='#myModal2' ><i class='fa fa-share-alt' style='cursor:pointer; cursor: hand'> Share</i></a>"; 					
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:edit, share:share});
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
					url: 'data/anticipos/app.php',
					type: 'post',
					data: {llenar_anticipos:'llenar_anticipos',id: id},
					dataType: 'json',
					success: function (data) {
						$('#id_anticipo').val(data.id);
						$('#serie_anticipo').val(data.serie_anticipo);
						$("#select_empleado").select2('val', data.id_personal).trigger("change");
						$('#monto_anticipo').val(data.monto_anticipo);
						$('#fecha_anticipo').val(data.fecha_anticipo);
						$('#meses_anticipo').val(data.meses_anticipo);
						$('#dias').val(data.dias);
						$("#select_forma_pago").select2('val', data.forma_pago).trigger("change");
						$('#cheque_numero').val(data.cheque_numero);
						$("#select_banco").select2('val', data.id_bancos).trigger("change");
						$('#cuenta').val(data.cuenta_anticipo);
					}
				});  	            	            
	        },
	        
	        // caption: "LISTA ANTICIPOS"
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
	    {   
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: true,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: false,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
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
	
	// fin
	});
});