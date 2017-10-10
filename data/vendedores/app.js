angular.module('scotchApp').controller('vendedoresController', function ($scope) {

	jQuery(function($) {
		$('#form_vendedores').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				codigo: {
					required: true			
				},
				select_empleado: {
					required: true			
				},
				select_tipo_vendedor: {
					required: true			
				},
			},
			messages: {
				codigo: {
					required: "Por favor, Código requerido"
				},
				select_empleado: {
					required: "Por favor, Seleccione un Empleado"
				},
				select_tipo_vendedor: {
					required: "Por favor, Seleccione Tipo Vendedor"
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

		// buscador registro
		$("#buscador").keyup(function() {
		    var campo = $('#buscador').val();
			jQuery("#table2").jqGrid('setGridParam',{url:"data/nomina/xml_personal.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// listar registro
		$("#btn_listar").click(function() {
			$('#buscador').val('');
		    var campo = $('#buscador').val();
			jQuery("#table2").jqGrid('setGridParam',{url:"data/nomina/xml_personal.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// funcion autocompletar la serie ro pagos
		function autocompletar() {
		    var temp = "";
		    var serie = $("#codigo").val();
		    for (var i = serie.length; i < 5; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo codigo rol
		function cargar_codigo() {
			$.ajax({
				url: 'data/vendedores/app.php',
				type: 'post',
				data: {cargar_codigo:'cargar_codigo'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var codigo = data.codigo_ficha;
						var res = parseInt(codigo.substr(1, 10));
						res = res + 1;

						$("#codigo").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo").val(validado);
					} else {
						var res = parseInt(0);
						res = res + 1;

						$("#codigo").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo").val(validado);
					}
				}
			});
		}
		// fin

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

	    // llenar combo tipo vendedor
		function select_tipo_vendedor() {
			$.ajax({
				url: 'data/vendedores/app.php',
				type: 'post',
				data: {llenar_tipo_vendedor:'llenar_tipo_vendedor'},
				success: function (data) {
					$('#select_tipo_vendedor').html(data);
				}
			});
		}
		// fin

		// clase select para el diseño 
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

		$("#select_tipo_vendedor,#select_empleado").select2({
		  placeholder: "Seleccione una opción",
		  allowClear: true
		});
		// fin

		// incicio
		llenar_select_empleado();
		select_tipo_vendedor();
		cargar_codigo();
		// fin

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// cargar ultimo codigo
		$('#btn_importar').click(function() {
			var $exampleModal = $("#myModal");

		    $exampleModal.on("shown.bs.modal", function() {
		        document.activeElement.blur();
		        cargar_codigo();
		    });
		});
		// fin

		// limpiar formulario
		function reset_form() {
			$("#select_empleado").select2('val', 'All');
	    	$("#select_tipo_vendedor").select2('val', 'All');
	    	$("#observaciones").val('');	
		}
		// fin

		// guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_vendedores').valid();

			if (respuesta == true) {
				var submit = "btn_guardar";
				var formulario = $("#form_vendedores").serialize();

				$.ajax({
			        url: "data/vendedores/app.php",
			        data: formulario + "&btn_guardar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Registro Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 2000				
							});
				    	}
				    	reset_form();
				    	// $("#form_vendedores")[0].reset(); 
				    	jQuery("#grid-table").jqGrid().trigger("reloadGrid");
				    	$('#myModal').modal('hide');          
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

		// // modificar formulario
		// $('#btn_2').click(function() {
		// 	if($('#id_empresa').val() == '') {
		// 		$.gritter.add({
		// 			title: 'Error... Seleccione un cliente',
		// 			class_name: 'gritter-error gritter-center',
		// 			time: 1000,
		// 		});
		// 		$('#myModal').modal('show'); 
		// 	} else {
		// 		var submit = "btn_modificar";
		// 		var formulario = $("#form_clientes").serialize();
		// 		$.ajax({
		// 	        url: "data/clientes/app.php",
		// 	        data: formulario + "&btn_modificar=" + submit+ "&img="+$("#avatar")[0].src,
		// 	        type: "POST",
		// 	        async: true,
		// 	        success: function (data) {
		// 	        	var val = data;
		// 	        	if(data == '2') {
		// 	        		$.gritter.add({
		// 						title: 'Mensaje',
		// 						text: 'Cliente Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
		// 						time: 2000				
		// 					});
		// 					redireccionar();
		// 		    	}              
		// 	        },
		// 	        error: function (xhr, status, errorThrown) {
		// 		        alert("Hubo un problema!");
		// 		        console.log("Error: " + errorThrown);
		// 		        console.log("Status: " + status);
		// 		        console.dir(xhr);
		// 	        }
		// 	    });
		// 	} 
		// });
		// // fin

		// Actualizar formulario
		$('#btn_3').click(function() {
			location.reload(true);
		});
		// fin
	});

	jQuery(function($) {
		var grid_selector = "#grid-table";
	    var pager_selector = "#grid-pager";
	    var campo = $('#buscador').val();

	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {
	        $(grid_selector).jqGrid('setGridWidth', $(".widget-main").width());
	    });
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
	            }, 0);
	        }
	    });

	    jQuery(grid_selector).jqGrid({
	        autoencode: true,
	        datatype: "xml",
			url: "data/vendedores/xml_vendedores.php?campo="+campo,
	        colNames: ['ID','CÓDIGO VENDEDOR','IDENTIDICACIÓN','NOMBRES COMPLETOS','TELÉFONO','DIRECCIÓN','TIPO VENDEDOR'],
	        colModel:[     
	        	{name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'codigo',index:'codigo',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true, hidden: false, align:'left',search:true,width: ''},
	            {name:'nombres',index:'nombres',frozen : true, hidden: false, align:'left',search:false,width: '300px'},
	            {name:'telefono',index:'telefono',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'direccion',index:'direccion',frozen : true, hidden: false, align:'left',search:false,width: ''},
	            {name:'tipo_vendedor',index:'tipo_vendedor',frozen : true, hidden: false, align:'left',search:false,width: ''},
	        ],
	        rownumbers: true,
	        rowNum:10,
	        rowList:[10,20,30],
	        pager : pager_selector,
	        height: 340,
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
	        multiboxonly: false,
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
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);
            	alert(ret.id);	            
	        },
	        // editurl: "data/cargos/app.php",
	        // caption: "LISTA VENDEDORES"
	    });
	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }
	    //enable datepicker
	    function pickDate( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=text]')
	            .datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
	        }, 0);
	    }
	    //navButtons
	    jQuery(grid_selector).jqGrid('navGrid',pager_selector, {   //navbar options
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
	        view: false,
	        viewicon : 'ace-icon fa fa-search-plus grey',
	    },
	    {
	    	closeAfterEdit: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        overlay:false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        },
	        afterSubmit: function(response)  {
                retorno = response.responseText;
                if(retorno == '2'){
                	$.gritter.add({
						title: 'Mensaje',
						text: 'Registro Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
						time: 1000				
					});
                } else {
                	if(retorno == '3') {
                		$("#nombre").val("");
	                	return [false,"Error.. El cargo ya fue agregado"];
	                }
                }
                return [true,'',retorno];
            },
            aftersavefunc: function (response) {
            }
	    },
	    {
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        overlay:false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        },
	        afterSubmit: function(response)  {
                retorno = response.responseText;
                if(retorno == '1') {
                	$.gritter.add({
						title: 'Mensaje',
						text: 'Registro Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
						time: 1000				
					});
                } else {
                	if(retorno == '3') {
                		$("#nombre").val("");
	                	return [false,"Error.. El cargo ya fue agregado"];
	                }
                }
                return [true,'',retorno];
            },
	    },
	    {
	        //delete record form
	        recreateForm: true,
	        overlay:false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form);
	            form.data('styled', true);
	        },
	        onClick : function(e) {
	      		console.log('test');
	        }
	    },
	    {
	        recreateForm: true,
	        overlay:false,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        },
	        multipleSearch: false,
	        overlay: false,
	        sopt: ['eq', 'cn'],
	        defaultSearch: 'eq', 
	      },
	    {
	        recreateForm: true,
	        overlay:false,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    }
	)
	    function style_edit_form(form) {
	        //enable datepicker on "sdate" field and switches for "stock" field
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

	    function styleCheckbox(table) { }
	    
	    function updateActionIcons(table) { }
	    
	    //replace icons with FontAwesome icons like above
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
});