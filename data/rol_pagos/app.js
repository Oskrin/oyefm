angular.module('scotchApp').controller('rolpagosController', function ($scope) {

	jQuery(function($) {	
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
		
		$("#select_empleado").select2({
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

		// Inicio llamado funciones procesos de inicio
		llenar_select_empleado();

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

		// imprimir 
		$('#btn_excel').click(function (){
			var myWindow = window.open('data/rol_pagos/phpexcel/rol_pagos_general.php');
		})
		// fin

		// imprimir 
		$('#btn_pdf').click(function (){
			var myWindow = window.open('data/reportes/rol_pagos_general.php?fecha_inicio=' + $('#fecha_inicio').val() + '&fecha_fin=' +$('#fecha_fin').val());
		})
		// fin

		// limpiar tabla
		$('#btn_limpiar').click(function() {
			jQuery("#grid-table").jqGrid('setGridParam',{url:"data/rol_pagos/xml_roles.php",page:1}).trigger("reloadGrid");
		});
		// fin
		
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

	// abrir en una nueva ventana reporte guardar roles
	$scope.methodspdfguardar = function(id) { 
	var win = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+id,'popup','width=900,height=650');
	} 
	// fin

	function gridReload() {
		var id_personal = $('#select_empleado').val();
		var fecha_inicio = $('#fecha_inicio').val();
		var fecha_fin = $('#fecha_fin').val();
		jQuery("#grid-table").jqGrid('setGridParam',{url:"data/rol_pagos/xml_empleados.php?id_personal="+id_personal+"&fecha_inicio="+fecha_inicio+"&fecha_fin="+fecha_fin,page:1}).trigger("reloadGrid");
	}

		// jqgrid
	jQuery(function($) {
		var grid_selector = "#grid-table";
	    var pager_selector = "#grid-pager";

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
	        autoencode: false,
	        datatype: "xml",
			url: 'data/rol_pagos/xml_roles.php',
	        colNames: ['ID','CÓDIGO ROL','IDENTIDICACIÓN','NOMBRES COMPLETOS','DIRECCIÓN','FECHA EMISIÓN','NETO PAGAR','REPORTE'],
			colModel: [
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'codigo',index:'codigo',frozen : true,align:'left',search:true,width: ''},
	            {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true,align:'left',search:true,width: ''},
	            {name:'nombres',index:'nombres',frozen : true,align:'left',search:true,width: '400px'},
	            {name:'direccion',index:'direccion',frozen : true,align:'left',search:false,width: '300px', hidden: false},
	            {name:'fecha_emision',index:'fecha_emision',frozen : true,align:'left',search:false,width: ''},
	            {name:'neto_pagar',index:'neto_pagar',frozen : true,align:'left',search:false},
	            {name:'accion',index:'accion',frozen : true,align:'center',search:false,width: '100px'},
			],
	        rownumbers: true,
	        rowNum:10,
	        rowList:[10,20,30],
	        pager : pager_selector,
	        sortname: 'id',
	        sortorder: 'desc',
	        height: 350,
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
	        // editurl: "data/cargos/app.php",
	        caption: "LISTA NÓMINA"
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
     //            retorno = response.responseText;
     //            if(retorno == '2'){
     //            	$.gritter.add({
					// 	title: 'Mensaje',
					// 	text: 'Registro Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
					// 	time: 1000				
					// });
     //            } else {
     //            	if(retorno == '3') {
     //            		$("#nombre").val("");
	    //             	return [false,"Error.. El cargo ya fue agregado"];
	    //             }
     //            }
     //            return [true,'',retorno];
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
     //            retorno = response.responseText;
     //            if(retorno == '1') {
     //            	$.gritter.add({
					// 	title: 'Mensaje',
					// 	text: 'Registro Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
					// 	time: 1000				
					// });
     //            } else {
     //            	if(retorno == '3') {
     //            		$("#nombre").val("");
	    //             	return [false,"Error.. El cargo ya fue agregado"];
	    //             }
     //            }
     //            return [true,'',retorno];
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
	    })
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
	// fin
});

