angular.module('scotchApp').controller('agendaController', function ($scope, $route, $location,loaddatosSRI) {
	
	$scope.$route = $route;
	jQuery(function($) {
		$('[data-toggle="tooltip"]').tooltip(); 

		// stilo select 2
		$(".select2").css({
			width: '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

		$("#select_programa").select2({
		  allowClear: true 
		}); 
		// fin

		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// fin

		//para la hora
		$(".datetimepicker").datetimepicker({ 
			pickDate: false,
			// format: 'HH:mm'
		});
		// fin

		//validacion formulario usuarios
		$('#form_agenda').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				titulo_agenda: {
					required: true,			
				},
				nombres_invitado: {
					required: true				
				},
				select_programa: {
					required: true,			
				},
				tema: {
					required: true,			
				},		
			},
			messages: {
				titulo_agenda: {
					required: "Por favor, Indique un Título",
				},
				nombres_invitado: { 	
					required: "Por favor, Indique Nombres Invitado",			
				},
				select_programa: {
					required: "Por favor, Seleccione un Programa",
				},
				tema: {
					required: "Por favor, Ingrese un Tema",
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

		// llenar combo programa
		function select_programa() {
			$.ajax({
				url: 'data/agenda/app.php',
				type: 'post',
				data: {llenar_programa:'llenar_programa'},
				success: function (data) {
					$('#select_programa').html(data);
				}
			});
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

		select_programa();

		// buscador registro
		$("#buscador").keyup(function() {
		    var campo = $('#buscador').val();
			jQuery("#table").jqGrid('setGridParam',{url:"data/usuarios/xml_usuarios.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// listar registro
		$("#btn_listar").click(function(){
			$('#buscador').val('');
		    var campo = $('#buscador').val();
			jQuery("#table").jqGrid('setGridParam',{url:"data/usuarios/xml_usuarios.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
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

		// guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_agenda').valid();
			
			if (respuesta == true) {
				$('#btn_0').attr('disabled', true);
				var submit = "btn_guardar";
				var formulario = $("#form_agenda").serialize();

				$.ajax({
			        url: "data/agenda/app.php",
			        data: formulario + "&btn_guardar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Agenda Agregada Correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							redireccionar();
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

		// refrescar formulario
		$('#btn_1').click(function() {
			location.reload(true);
		});
		// fin

		$('#btn_2').click(function() {
			$('#myModal').modal('show');
		});

		// modificar formulario
		$('#btn_3').click(function() {
			var respuesta = $('#form_agenda').valid();

			if (respuesta == true) {
				$('#btn_3').attr('disabled', true);
				var submit = "btn_modificar";
				var formulario = $("#form_agenda").serialize();

				$.ajax({
			        url: "data/usuarios/app.php",
			        data: formulario + "&btn_modificar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '2') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Registro Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							redireccionar();
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

		/*jqgrid*/    
		jQuery(function($) {
		    var grid_selector = "#table";
		    var pager_selector = "#pager";
		    var campo = $('#buscador').val();
		    
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
		        url: "data/agenda/xml_agenda.php?campo="+campo,        
		        colNames: ['ID','TÍTULO','INVITADO','ID_P','PROGRAMA','TEMA','FECHA','INICIO','FINAL','CONFIRMACIÓN','OBSERVACIONES','ESTADO'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'titulo',index:'titulo',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'invitado',index:'invitado',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'id_p',index:'id_p', frozen:true, align:'left', search:false, hidden: true},
		            {name:'programa',index:'programa',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'tema',index:'tema',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'fecha',index:'fecha',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'inicio',index:'inicio',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'final',index:'final',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'confirmacion',index:'confirmacion',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'observaciones',index:'observaciones',frozen : true, hidden: true, align:'left',search:false,width: ''},
		            {name:'estado',index:'estado',frozen : true, hidden: true, align:'left',search:false,width: ''},
		        ],          
		        rowNum: 10,       
		        shrinkToFit: false,
		        rowList: [10,20,30],
		        pager: pager_selector,
		        height: 340,        
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
		            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
	            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);

	            	$('#id_agenda').val(ret.id);
	            	$('#titulo_agenda').val(ret.titulo);
	            	$('#nombres_invitado').val(ret.invitado);
	            	$("#select_programa").select2('val', ret.id_p).trigger("change");
	            	$('#tema').val(ret.tema);
	            	$('#fecha_evento').val(ret.fecha);
	            	$('#hora_inicio').val(ret.inicio);
	            	$('#hora_final').val(ret.final);
	            	$("#select_confirmacion").select2('val', ret.confirmacion).trigger("change");
	            	$('#observaciones').val(ret.observaciones);            	  	            

		            $('#myModal').modal('show'); 
		            $('#btn_0').attr('disabled', false); 	            
		        },
		        
		        // caption: "LISTA USUARIOS"
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
		        $(grid_selector).jqGrid('GridUnload');
		        $('.ui-jqdialog').remove();
		    });
		});
		// fin
	});
});