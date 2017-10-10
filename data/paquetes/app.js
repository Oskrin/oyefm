angular.module('scotchApp').controller('paquetesController', function ($scope) {

	jQuery(function($) {
		$('#form_registro').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_tipo_paquete: {
					required: true			
				},
				codigo: {
					required: true			
				},
				descripcion: {
					required: true			
				},
				precio: {
					required: true			
				},
				descuento: {
					required: true			
				},
				suma_mes: {
					required: true			
				},
				suma_vendedor: {
					required: true			
				},
				suma_ventas: {
					required: true			
				},
				suma_gerencia: {
					required: true			
				},
			},
			messages: {
				select_tipo_paquete: {
					required: "Campo Requerido",
				},
				codigo: {
					required: "Campo Requerido",
				},
				descripcion: {
					required: "Campo Requerido",
				},
				precio: {
					required: "Campo Requerido",
				},
				descuento: {
					required: "Campo Requerido",
				},
				suma_mes: {
					required: "Campo Requerido",
				},
				suma_vendedor: {
					required: "Campo Requerido",
				},
				suma_ventas: {
					required: "Campo Requerido",
				},
				suma_gerencia: {
					required: "Campo Requerido",
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

		// stilo select2
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			// $(this).closest('form').validate().element($(this));
	    });
		// fin

		// limpiar select2
		$("#select_tipo_paquete").select2({
		  allowClear: true
		});
		// fin

		// llenar combo tipo paquete
		function select_tipo_paquete() {
			$.ajax({
				url: 'data/paquetes/app.php',
				type: 'post',
				data: {llenar_tipo_paquete:'llenar_tipo_paquete'},
				success: function (data) {
					$('#select_tipo_paquete').html(data);
				}
			});
		}
		// fin

		// buscador registro
		$("#buscador").keyup(function(){
		    var campo = $('#buscador').val();
			jQuery("#grid-table").jqGrid('setGridParam',{url:"data/paquetes/xml_mensiones.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// listar registro
		$("#btn_listar").click(function(){
			$('#buscador').val('');
		    var campo = $('#buscador').val();
			jQuery("#grid-table").jqGrid('setGridParam',{url:"data/paquetes/xml_mensiones.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// actualizar tabla
		function actualizar() {
			$('#buscador').val('');
		    var campo = $('#buscador').val();
			jQuery("#grid-table").jqGrid('setGridParam',{url:"data/paquetes/xml_mensiones.php?campo="+campo,page:1}).trigger("reloadGrid");	
		}
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

		// llamar funciones inicio
		select_tipo_paquete();
		$("#precio").keypress(ValidPun);
		$("#suma_mes").keypress(ValidPun);
		// fin

		// guardar formulario
		$('#btn_guardar').click(function() {
			var respuesta = $('#form_registro').valid();

			if (respuesta == true) {
				var oper = "add";
				var formulario = $("#form_registro").serialize();

				$.ajax({
			        url: "data/paquetes/app.php",
			        data: formulario + "&oper=" + oper,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Registro Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							$("#nombre").val('');
							$("#observaciones").val('');
							jQuery("#grid-table").trigger("reloadGrid");
							$('#myModal').modal('hide');
				    	} else {
				    		if(data == '3') {
				        		$.gritter.add({
									title: 'Mensaje',
									text: 'Error... El Registro ya esta Agregado  <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
									time: 1000				
								});
								$("#nombre").val('');
					    	}
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
		// // fin 
	});

	jQuery(function($) {
		function Validpunto() {
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

		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}

		function mayusculas(e) {
			this.value = this.value.toUpperCase();
			return true;
		}

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
	        url: "data/paquetes/xml_mensiones.php?campo="+campo,
	        autoencode: false,
	        datatype: "xml",
	        colNames:['','ID','PAQUETE','CÓDIGO','CUÑAS/MENSIONES','PRECIO IMPACTO','TOTAL MES','TOTAL VENDEDOR','TOTAL VENTAS','TOTAL GERENCIA','FECHA CREACIÓN'],
	        colModel:[
	        	{name: 'myac', width:80, fixed:true, sortable:false, resize:false, formatter:'actions',
	        	formatoptions:{
					keys:true,
					editbutton: true,
					onSuccess: function (response) {
						var retorno = response.responseText;

						if(retorno == '2') {
							$.gritter.add({
								title: 'Mensaje',
								text: 'Registro Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							return true;
						} else {
							if(retorno == '3') {
								$.gritter.add({
									title: 'Mensaje',
									text: 'Error... El Registro ya esta Agregado  <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
									time: 1000				
								});
			                }	
						}
		            },
				}},
	            {name:'id',index:'id', width:60, sorttype:"int", editable: true, hidden: true, editoptions: {readonly: 'readonly'}},
	            {name:'id_tipo_paquete',index:'id_tipo_paquete', width:150, hidden:false, editable: true, editrules:{edithidden:true},edittype:"select",
					editoptions: {
						dataUrl:'data/paquetes/select_paquetes.php',
						dataInit: function(elem) {
					        $(elem).width(170);
					    }
					} 
				},
	            {name:'codigo',index:'codigo',width:150, editable:true, editoptions:{size:"20",maxlength:"30"}, editrules: {required: true}},
	            // {name:'descripcion',index:'descripcion',width:150, editable:true, search:false, editoptions:{size:"20"}, editrules: {required: true}, editoptions:{dataInit: function(elem){$(elem).bind("keyup", function(e) {this.value = this.value.toUpperCase(e)})}}}, 
	            {name:'descripcion',index:'descripcion',width:150, editable:true, search:false, editoptions:{size:"20"}, editrules: {required: true}, editoptions:{}}, 
	            {name:'precio', index: 'precio', editable: true, search: false, frozen: true, editrules: {required: true}, align: 'center', editoptions:{dataInit: function(elem){$(elem).bind("keypress", function(e) {return Validpunto(e)})}}}, 
	            {name:'suma_mes', index: 'suma_mes', editable: true, search: false, frozen: true, editrules: {required: true}, align: 'center', editoptions:{dataInit: function(elem){$(elem).bind("keypress", function(e) {return Validpunto(e)})}}}, 
	            {name:'suma_vendedor', index: 'suma_vendedor', editable: true, search: false, frozen: true, editrules: {required: true}, align: 'center', editoptions:{dataInit: function(elem){$(elem).bind("keypress", function(e) {return Validpunto(e)})}}}, 
	            {name:'suma_ventas', index: 'suma_ventas', editable: true, search: false, frozen: true, editrules: {required: true}, align: 'center', editoptions:{dataInit: function(elem){$(elem).bind("keypress", function(e) {return Validpunto(e)})}}}, 
	            {name:'suma_gerencia', index: 'suma_gerencia', editable: true, search: false, frozen: true, editrules: {required: true}, align: 'center', editoptions:{dataInit: function(elem){$(elem).bind("keypress", function(e) {return Validpunto(e)})}}}, 
	            {name:'fecha_creacion',index:'fecha_creacion', width:150, editable: true, search:false, hidden: true, editoptions:{size:"20",maxlength:"30",readonly: 'readonly'}}
	        ],
	        rownumbers: true, 
	        rowNum:10,
	        rowList:[10,20,30],
	        pager : pager_selector,
	        height: 420,
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
	        multiboxonly: false,
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
	        editurl: "data/paquetes/app.php",
	        // caption: "LISTA CUÑAS O MENSIONES"
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
	            .datepicker({format:'yyyy-mm-dd', autoclose:true}); 
	        }, 0);
	    }

	    //navButtons
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
	        view: false,
	        viewicon : 'ace-icon fa fa-search-plus grey'
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
	                	return [false,'Error.. La mensión ya fue agregada'];
	                }
                }
                return [true,'',retorno];
            },
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
                if(retorno == '1'){
                	$.gritter.add({
						title: 'Mensaje',
						text: 'Registro Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
						time: 1000				
					});
                } else {
                	if(retorno == '3') {
                		$("#nombre").val("");
	                	return [false,'Error.. Error.. La mensión ya fue agregada'];
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
	            //alert(1);
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