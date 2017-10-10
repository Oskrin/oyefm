angular.module('scotchApp').controller('pagosController', function ($scope, $location, loaddatosSRI, $interval) {

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

	jQuery(function($) {
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

		$("#select_responsable,#select_areas,#select_cliente").select2({
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

		// cargar ultimo codigo
		$('#btn_abrir').click(function() {
			$('#btn_0').attr('disabled', false);
			$("#btn_0").text("");
	    	$("#btn_0").append("<i class='ace-icon fa fa-save'></i> Guardar");
		});
		// fin

		// llenar combo responsable
		function llenar_select_responsable() {
			$.ajax({
				url: 'data/pagos/app.php',
				type: 'post',
				data: {llenar_responsable:'llenar_responsable'},
				success: function (data) {
					$('#select_responsable').html(data);
				}
			});
		}
		// fin

		// llenar combo clientes
		function llenar_select_clientes() {
			$.ajax({
				url: 'data/pagos/app.php',
				type: 'post',
				data: {llenar_cliente:'llenar_cliente'},
				success: function (data) {
					$('#select_cliente').html(data);
				}
			});
		}
		// fin

		// llenar combo areas
		function llenar_select_areas() {
			$.ajax({
				url: 'data/pagos/app.php',
				type: 'post',
				data: {llenar_areas:'llenar_areas'},
				success: function (data) {
					$('#select_areas').html(data);
				}
			});
		}
		// fin

		 /*---agregar a la tabla---*/
	  	$("#valor").on("keypress",function (e) {
	    	if(e.keyCode == 13) {//tecla del alt para el entrer poner 13
	      		var subtotal = 0;
	      		var total_total = 0;

	      		if($('#select_cliente').val() == '') {
	      			$.gritter.add({
						title: 'Seleccione una Destinatario',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});

	      		} else {
	      			if($('#descripcion').val() == '') {
		      			$.gritter.add({
							title: 'Ingrese una Descripción',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
						$('#descripcion').focus();
		      		} else {
		      			if($('#concepto').val() == '') {
			      			$.gritter.add({
								title: 'Ingrese un Concepto',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$('#concepto').focus();
			      		} else {
			      			if($('#cantidad').val() == '') {
				      			$.gritter.add({
									title: 'Ingrese una Cantidad',
									class_name: 'gritter-error gritter-center',
									time: 1000,
								});
								$('#cantidad').focus();
				      		} else {
				      			if($('#select_mes').val() == '') {
					      			$.gritter.add({
										title: 'Seleccione un Periodo',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});
					      		} else {
					      			if($('#valor').val() == '') {
						      			$.gritter.add({
											title: 'Ingrese un Valor',
											class_name: 'gritter-error gritter-center',
											time: 1000,
										});
										$('#valor').focus();
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

			                                var datarow = {
			                                    id: filas.length,
			                                    destinatario: $("#proveedor").val(), 
			                                    descripcion: $("#descripcion").val(), 
			                                    concepto: $("#concepto").val(),
			                                    cantidad: $("#cantidad").val(), 
			                                    periodo: $("#select_mes").val(),  
			                                    valor: parseFloat($("#valor").val()).toFixed(2)
			                                };

			                                jQuery("#table").jqGrid('addRowData', filas.length, datarow);
			                                reset_form();
			                            } else {
			                            	// for (var i = 0; i < filas.length; i++) {
		                              //      		var id = filas[i];

			                             //        if (id['destinatario'] == $("#proveedor").val()) {
			                             //            repe = 1;
			                             //        }
			                             //    }

			                             //    if (repe == 1) {
		                              //           datarow = {
				                            //         id: filas.length,
				                            //         destinatario: $("#proveedor").val(), 
				                            //         descripcion: $("#descripcion").val(), 
				                            //         concepto: $("#concepto").val(),
				                            //         cantidad: $("#cantidad").val(), 
				                            //         periodo: $("#select_mes").val(),  
				                            //         valor: parseFloat($("#valor").val()).toFixed(2)
				                            //     };

				                            //     jQuery("#table").jqGrid('setRowData', filas.length,datarow);
		                              //           reset_form();
			                             //    } else {
			                                	if(filas.length < 15) {
					                                datarow = {
					                                    id: filas.length,
					                                    destinatario: $("#proveedor").val(), 
					                                    descripcion: $("#descripcion").val(), 
					                                    concepto: $("#concepto").val(),
					                                    cantidad: $("#cantidad").val(), 
					                                    periodo: $("#select_mes").val(),  
					                                    valor: parseFloat($("#valor").val()).toFixed(2)
					                                };

					                                jQuery("#table").jqGrid('addRowData', filas.length,datarow);
					                                reset_form();
				                                } else {
					                            	$.gritter.add({
														title: 'Error... Alcanzo el limite Máximo de Items',
														class_name: 'gritter-error gritter-center',
														time: 1000,
													});
				                            	}
			                                }
			                            }

					                    var fil = jQuery("#table").jqGrid("getRowData");
					                    for (var t = 0; t < fil.length; t++) {
					                    	var dd = fil[t];
					                    	subtotal = dd['valor'];
					                    	total_total = parseFloat(total_total) + (parseFloat(subtotal));
					                    	total_total = parseFloat(total_total).toFixed(2);
					                    }

		                   				$("#valor_total").val(formatNumber.new(total_total)); 
						      		}
					      		}
					      	// }
				      	}	
		      		}
	      		}
	    	}
	  	});
		// fin 

		// limpiar formulario
		function reset_form() {
			$("#proveedor").val("");
			$("#descripcion").val("");
			$("#concepto").val("");
			$("#cantidad").val("");
	    	// $("#select_mes").select2('val', 'All');
	    	$("#valor").val('');
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

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
				location.reload(true);
			}, 1000);
		}
		// fin

		// inicio
		$("#cantidad").keypress(ValidNum);
		$("#valor").keypress(Valida_punto);
		$("#total_recibido").keypress(Valida_punto);
		$("#total_gasto").keypress(Valida_punto);
		$("#saldo").keypress(Valida_punto);   
		llenar_select_responsable();
		llenar_select_clientes();
		llenar_select_areas();
		cargar_codigo();
		// fin

		// actualizar formulario
		$('#btn_1').click(function() {
			location.reload(true);
		});
		// fin

		// funcion autocompletar 
		function autocompletar() {
		    var temp = "";
		    var serie = $("#codigo").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion autocompletar2 
		function autocompletar2() {
		    var temp = "";
		    var serie = $("#codigo").val();
		    for (var i = serie.length; i < 6; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo codigo 
		function cargar_codigo() {
			$.ajax({
				url: 'data/pagos/app.php',
				type: 'post',
				data: {cargar_codigo:'cargar_codigo'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var codigo = data.codigo;
						var res = parseInt(codigo);
						res = res + 1;

						$("#codigo").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo").val(validado);
					} else {
						var res = parseInt('0');
						res = res + 1;

						var a = autocompletar2(res);
						var validado = a + "" + res;
						$("#codigo").val(validado);	
					}
				}
			});
		}
		// fin

		// guardar pagos
		$('#btn_0').click(function() {
			var fil = jQuery("#table").jqGrid("getRowData");
			var formulario = $("#form_registro").serialize();
			var submit = "btn_guardar";

			if($('#select_areas').val() == '') {
      			$.gritter.add({
					title: 'Seleccione a quien va Dirigido',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
      		} else {
      			if(fil.length == 0) {
      				$.gritter.add({
						title: 'Ingrese datos a la Solicitud de Pagos',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
      			} else {
      				$('#btn_0').attr('disabled', true);
      				var v1 = new Array();
	                var v2 = new Array();
	                var v3 = new Array();
	                var v4 = new Array();
	                var v5 = new Array();
	                var v6 = new Array();

	                var string_v1 = "";
	                var string_v2 = "";
	                var string_v3 = "";
	                var string_v4 = "";
	                var string_v5 = "";
	                var string_v6 = "";

	                for (var i = 0; i < fil.length; i++) {
	                    var datos = fil[i];
	                    v1[i] = datos['destinatario'];
	                    v2[i] = datos['descripcion'];
	                    v3[i] = datos['concepto'];
	                    v4[i] = datos['cantidad'];
	                    v5[i] = datos['periodo'];
	                    v6[i] = datos['valor'];
	                }
	                
	                for (i = 0; i < fil.length; i++) {
	                    string_v1 = string_v1 + "|" + v1[i];
	                    string_v2 = string_v2 + "|" + v2[i];
	                    string_v3 = string_v3 + "|" + v3[i];
	                    string_v4 = string_v4 + "|" + v4[i];
	                    string_v5 = string_v5 + "|" + v5[i];
	                    string_v6 = string_v6 + "|" + v6[i];
	                }

					$.ajax({
				        url: "data/pagos/app.php",
				        data: formulario + "&btn_guardar=" + submit + "&campo1=" + string_v1 + "&campo2=" + string_v2 + "&campo3=" + string_v3 + "&campo4=" + string_v4 + "&campo5=" + string_v5 + "&campo6=" + string_v6,
				        type: "POST",
				        success: function (data) {
				        	var val = data;
				        	if(data != '') {
				        		bootbox.alert("Gracias! Por su Información Datos Agregados Correctamente!", function() {
								  	var myWindow = window.open('data/reportes/pagos_detalle.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
								  	location.reload();
								});
					    	}                                                
				        }
				    });
      			}
      		}	
		});
		// fin

		// abrir en una nueva ventana reporte pagos
		$scope.methodspdf = function(id) { 
			var myWindow = window.open('data/reportes/pagos_detalle.php?id='+id,'popup','width=900,height=650');
		} 
		// fin
	});

	/*jqgrid table 1 local*/    
	jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    var subtotal = 0;
	    var total_total = 0;
	    
	    $(window).on('resize.jqGrid', function () {
			// $(grid_selector).jqGrid('setGridWidth', $("#grid_container").width(), true);
			$(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);

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
	        colNames: ['','ID','DESTINATARIO','DESCRIPCIÓN','CONCEPTO','CANTIDAD','PERIODO','VALOR'],
	        colModel:[  
	        	{name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions', formatoptions: {keys: false, delbutton: true, editbutton: false}}, 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true}, 
			    {name:'destinatario',index:'destinatario', frozen:true, align:'left', search:false, hidden: false},     
	            {name:'descripcion',index:'descripcion', frozen:true, align:'left', search:false, hidden: false,width: '200px'},
	            {name:'concepto',index:'concepto',frozen : true,align:'left',search:true,width: '200px'},
	            {name:'cantidad',index:'cantidad',frozen : true,align:'left',search:true,width: '200px'},
	            {name:'periodo',index:'periodo',frozen : true,align:'left',search:true,width: '150px'},
	            {name:'valor',index:'valor',frozen : true,align:'left',search:true,width: '100px'},
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

                    var fil = jQuery("#table").jqGrid("getRowData");
                    for (var t = 0; t < fil.length; t++) {
                    	var dd = fil[t];
                    	subtotal = parseFloat(dd['valor']);
                    	subtotal = parseFloat($("#valor_total").val()) - parseFloat(subtotal);
                    }

       				$("#valor_total").val((subtotal).toFixed(2));

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

	// tabla buscador
	jQuery(function($) {
	    var grid_selector2 = "#table2";
	    var pager_selector2 = "#pager2";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {  
	    	$(grid_selector2).jqGrid( 'setGridWidth', $(".widget-main").width());     
	        // $(grid_selector2).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
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

	    // buscador pagos
	    jQuery(grid_selector2).jqGrid({	        
	        datatype: "xml",
	        url: 'data/pagos/xml_pagos.php',       
	        colNames: ['ID','N° OFICIO','FECHA SOLICITUD','PARA','DIRIGIDO','VALOR TOTAL','ACCIÓN'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'oficio',index:'oficio',frozen : true,align:'left',search:true},
	            {name:'fecha_solicitud',index:'fecha_solicitud',frozen : true,align:'left',search:true},
	            {name:'para',index:'para',frozen: true, align:'left',search:false, width:'150'},
	            {name:'dirigido',index:'dirigido',frozen : true,align:'left',search:false, hidden: false, width:'350'},
	            {name:'saldo',index:'saldo',frozen : true,align:'left',search:false, hidden: false},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '80px'}
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
					var id_pago = ids[i];
					edit = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_pago+"')\" title='Reporte Pagos' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 					
					jQuery(grid_selector2).jqGrid('setRowData',ids[i],{accion:edit});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector2).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector2).jqGrid('getRowData',gsr);
            	var id = ret.id;
	        },
	        
	        caption: "LISTA SOLICITUD DE PAGOS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function() {
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
	// fin
});