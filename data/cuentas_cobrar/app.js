angular.module('scotchApp').controller('cuentas_cobrarController', function ($scope, $interval, GenerarContrato) {

	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab == tabNum;
    };
    // fin

    $(function() {
	    Test = {
	        UpdatePreview: function(obj) {
	            if(!window.FileReader) {
	            // don't know how to proceed to assign src to image tag
	            } else {
	                var reader = new FileReader();
	                var target = null;
	                reader.onload = function(e) {
	                    target =  e.target || e.srcElement;
	                    $("#foto").prop("src", target.result);
	                };
	                reader.readAsDataURL(obj.files[0]);
	            }
	        }
	    };
	});

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
			if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
			return 'left';
		}
		// Fin tablas

		var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); 
		var f = new Date(); 
		var fecha_actual = f.getDate() + " de " + meses[f.getMonth()] + " del " + f.getFullYear();
		$('#bonificacion').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#spots').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#mensiones').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		// $('#valor').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});

		function showErrorAlert(reason, detail) {
			var msg = '';
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
		    }).select2().on("change", function(e) {
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

		// abrir en una nueva ventana reporte permisos
		$scope.methodopdf = function(id) { 
			var myWindow = window.open('data/reportes/comprobante_ingreso.php?hoja=A5&id='+id,'popup','width=900,height=650');
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

	 //    // llenar perfil usuario
		// function select_perfil_usuario() {
		// 	$.ajax({
		// 		url: 'data/contratos_selectivos/app.php',
		// 		type: 'post',
		// 		data: {consultar_perfil:'consultar_perfil'},
		// 		dataType: 'json',
		// 		success: function (data) {
		// 			localStorage.setItem("perfil", data.nombre);
		// 			if (data.nombre == 'VENDEDOR') {
		// 				document.getElementById("ventas").disabled = true;
		// 				document.getElementById("gerencia").disabled = true;	
		// 			} else {
		// 				if (data.nombre == 'DEPARTAMENTO VENTAS') {
		// 					document.getElementById("ventas").disabled = false;
		// 					document.getElementById("gerencia").disabled = true;
		// 				} else {
		// 					if (data.nombre == 'GERENCIA') {
		// 						document.getElementById("ventas").disabled = false;
		// 						document.getElementById("gerencia").disabled = false;
		// 					} else {
		// 						if (data.nombre == 'ADMINISTRADOR') {
		// 							document.getElementById("ventas").disabled = false;
		// 							document.getElementById("gerencia").disabled = false;
		// 						}	
		// 					}	
		// 				}	
		// 			}
		// 		}
		// 	});
		// }
		// // fin

		// llenar combo porcentaje
		function select_pago() {
			$.ajax({
				url: 'data/cuentas_cobrar/app.php',
				type: 'post',
				data: {llenar_tipo_pago:'llenar_tipo_pago'},
				success: function (data) {
					$('#select_pago').html(data);
				}
			});
		}
		// fin

		// // cambiar atributo boton
		// $('#btn_abrir').click(function() {
		// 	$('#btn_0').attr('disabled', false);
		// 	$("#btn_0").text("");
	 //    	$("#btn_0").append("<i class='ace-icon fa fa-save'></i> Guardar");
		// });
		// // fin

		// guardar contratos/modificar
		$('#btn_0').click(function() {
        	if($('#codigo').val() == '') {
				$.gritter.add({
					title: 'Ingrese un Código',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#codigo').focus();
			} else {
				if($('#ciudad').val() == '') {
					$.gritter.add({
						title: 'Ingrese una Ciudad',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
					$('#ciudad').focus();	
				} else {
					if($('#visitador').val() == '') {
						$.gritter.add({
							title: 'Ingrese Recibo De',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
						$('#visitador').focus();
					} else {
						if($('#cliente').val() == '') {
							$.gritter.add({
								title: 'Seleccione un Cliente',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$('#cliente').focus();
						} else {
							if($('#monto').val() == '') {
								$.gritter.add({
									title: 'Ingrese un Monto',
									class_name: 'gritter-error gritter-center',
									time: 1000,
								});
								$('#monto').focus();	
							} else {
								// if($('#select_pago').val() == '') {
								// 	$.gritter.add({
								// 		title: 'Seleccione una Forma Pago',
								// 		class_name: 'gritter-error gritter-center',
								// 		time: 1000,
								// 	});
								// } else {
									// $('#btn_0').attr('disabled', true);
									var formObj = document.getElementById("form_registro");
									var formData = new FormData(formObj);
									// var form = $("#form_registro").serialize();
									var texto = ($("#btn_0").text()).trim();

									if(texto == "Guardar") {
										var submit = "btn_guardar";

										$.ajax({
									        url: "data/cuentas_cobrar/guardar.php",
									        // data: form +"&btn_guardar=" + submit,
									        data: formData,
									        mimeType:"multipart/form-data",
									        contentType: false,
									        cache: false,
									        processData:false,
									        type: "POST",
									        success: function (data) {
									   //      	var id = data;
									   //      	bootbox.alert("Gracias! Por su Información Datos Agregados Correctamente!!", function() {
												//   	location.reload();
												// });                                              
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
									// }
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
		select_pago();
		// fin
	});
	// fin


	// activar productos
	$scope.methodocomprobante = function(id) {
		$('#myModal2').modal('show');
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
		    // url: 'data/contratos_selectivos/xml_contratos.php',         
	        autoencode: false,
	        colNames: ['ID','N° PAGO','F. INICIO FACTURA','F. FIN FACTURA','FACTURA','F. INICIO COBRO','F. FIN COBRO','VALOR PAGO','FECHA ABONO','COMPROBANTE','ESTADO','PDF'],
	        colModel:[ 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'num_pago',index:'num_pago', frozen:true, align:'left', search:false, hidden: false, width: ''},
	            {name:'f_inicio_factura',index:'f_inicio_factura',frozen : true,align:'left', search:true, width: ''},
	            {name:'f_fin_factura',index:'f_fin_factura',frozen : true, hidden: false, align:'left', search:true,width: ''},
	            {name:'factura',index:'factura',frozen : true, align:'left', search:true,width: ''},
	            {name:'f_inicio_cobro',index:'f_inicio_cobro',frozen : true, hidden: false, align:'left', search:true,width: ''},
	            {name:'f_fin_cobro',index:'f_fin_cobro',frozen : true, align:'left', search:true,width: ''},
	            {name:'valor_pago',index:'valor_pago',frozen : true, align:'left', search:true,width: ''},
	            {name:'fecha_abono',index:'fecha_abono',frozen : true, align:'left', search:true,width: ''},
	            {name:'comprobante',index:'comprobante',frozen : true, align:'left', search:true, hidden:false, width: ''},
	            {name:'pdf', index:'pdf', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '80px'},
	            {name:'estado', index:'estado', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '100px'},
	        ],
	        rownumbers: true,          
	        rowNum: 10,       
	        // width:600,
	        shrinkToFit: false,
	        height: 330,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
	        viewrecords: true,
	        loadComplete: function() {
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
				for(var i = 0;i < ids.length; i++) {
					var id_contrato = ids[i];
					comprobante = "<a onclick=\"angular.element(this).scope().methodocomprobante('"+id_contrato+"')\" title='Ingresar Comprobante' ><i class='fa fa-inbox red2' style='cursor:pointer; cursor: hand'> INGRESAR</i></a>"; 					
					pdf = "<a onclick=\"angular.element(this).scope().methodopdf('"+id_contrato+"')\" title='Ingresar Comprobante' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{comprobante:comprobante, pdf:pdf});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);
            	var id = ret.id;
	        },
	        	caption: "LISTA COBROS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch(cellvalue, options, cell) {
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
	        viewicon : 'ace-icon fa fa-search-plus grey'
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
	        var replacement = {
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

	/*jqgrid table 2 buscador*/    
	jQuery(function($) {
	    var grid_selector2 = "#table2";
	    var pager_selector2 = "#pager2";
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector2).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
	    }).trigger('resize');  

	    var parent_column = $(grid_selector2).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if(event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
				//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
				setTimeout(function() {
					$(grid_selector2).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    })

	    // buscador facturas
	    jQuery(grid_selector2).jqGrid({	 
	    	datatype: "xml",
		    url: 'data/contratos_selectivos/xml_contratos.php',         
	        autoencode: false,
	        colNames: ['ID','TIPO CONTRATO ','CÓDIGO','RUC','CLIENTE','FINALIZA','PROGRAMACIÓN','ESTADO'],
	        colModel:[ 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'tipo_contrato',index:'tipo_contrato', frozen:true, align:'left', search:false, hidden: false, width: '200px'},
	            {name:'codigo',index:'codigo',frozen : true,align:'left', search:true, width: '120px'},
	            {name:'ruc',index:'ruc',frozen : true, hidden: false, align:'left', search:true,width: '130px'},
	            {name:'cliente',index:'cliente',frozen : true, hidden: false, align:'left', search:true,width: '300px'},
	            {name:'finaliza',index:'finaliza',frozen : true, align:'left', search:true,width: '90px'},
	            {name:'programacion',index:'programacion',frozen : true, align:'left', search:true,width: '90px', hidden: true},
	            {name:'estado',index:'estado',frozen : true, align:'left', search:true, hidden:true, width: '80px'}
	        ],
	        rownumbers: true,          
	        rowNum: 10,       
	        // width:600,
	        shrinkToFit: false,
	        height:350,
	        rowList: [10,20,30],
	        pager: pager_selector2,        
	        sortname: 'id',
	        sortorder: 'desc',
	        altRows: true,
	        multiselect: false,
	        viewrecords: true,
	        loadComplete: function() {
	            var table = this;
	            setTimeout(function() {
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        gridComplete: function() {
				var ids = jQuery(grid_selector2).jqGrid('getDataIDs');
				for(var i = 0; i < ids.length; i++) {
					var id_contrato = ids[i];
					word = "<a onclick=\"angular.element(this).scope().methodword('"+id_contrato+"')\" title='Descargar Contrato' ><i class='fa fa-file-word-o blue' style='cursor:pointer; cursor: hand'>  WORD</i></a>"; 
					pdf = "<a onclick=\"angular.element(this).scope().methodopdf('"+id_contrato+"')\" title='Reporte Contrato' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 					
					estado = "<a onclick=\"angular.element(this).scope().methodoestado('"+id_contrato+"')\" title='Cambiar Estado' ><i class='fa fa-inbox red2' style='cursor:pointer; cursor: hand'> CAMBIAR</i></a>"; 					
					jQuery(grid_selector2).jqGrid('setRowData',ids[i],{descargar:word, estado:estado});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector2).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector2).jqGrid('getRowData',gsr);
            	var id = ret.id;

				$('#myModal').modal('hide');

				jQuery("#table").jqGrid('setGridParam',{url:"data/cuentas_cobrar/xml_detalle_pagos.php?id="+id,page:1}).trigger("reloadGrid");    
	        },
	         // caption: "LISTA CONTRATOS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch(cellvalue, options, cell) {
	        setTimeout(function() {
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector2).jqGrid('navGrid',pager_selector2,
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