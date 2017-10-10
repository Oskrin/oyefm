angular.module('scotchApp').controller('multasController', function ($scope, $location,loaddatosSRI) {

	jQuery(function($) {
		$('#dias').ace_spinner({value:0,min:0,max:31,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});		
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

	    $('#horas').datetimepicker({
            pickDate: false,
            format: 'HH:mm'
        });

	    $("#select_empleado,#select_tipo_multa").select2({
		  allowClear: true
		});
		// fin

	    //inicio validacion permisos
		$('#form_multas').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				serie_multa: {
					required: true				
				},
				select_empleado: {
					required: true				
				},
				select_tipo_multa: {
					required: true				
				},
			},
			messages: {
				serie_multa: {
					required: "Por favor, Indique serie",
				},
				select_empleado: {
					required: "Por favor, Seleccione Solicitante",
				},
				select_tipo_multa: {
					required: "Por favor, Seleccione Tipo Multa",
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

		// funcion autocompletar la serie permisos
		function autocompletar_permisos() {
		    var temp = "";
		    var serie = $("#serie_multa").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// funcion cargar maximo permisos
		function cargar_codigo_multas() {
			$.ajax({
				url: 'data/multas/app.php',
				type: 'post',
				data: {cargar_codigo_multas:'cargar_codigo_multas'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var res = parseInt(data.serie_multa);
						res = res + 1;

						$("#serie_multa").val(res);
						var a = autocompletar_permisos(res);
						var validado = a + "" + res;
						$("#serie_multa").val(validado);
					} else {
						var res = parseInt(0);
						res = res + 1;

						$("#serie_multa").val(res);
						var a = autocompletar_permisos(res);
						var validado = a + "" + res;
						$("#serie_multa").val(validado);
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

		// llenar combo empleado 
		function llenar_select_empleado() {
			$.ajax({
				url: 'data/multas/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado 
		function llenar_select_tipo_multas() {
			$.ajax({
				url: 'data/multas/app.php',
				type: 'post',
				data: {llenar_tipo_multas:'llenar_tipo_multas'},
				success: function (data) {
					$('#select_tipo_multa').html(data);
				}
			});
		}
		// fin

		$("#serie_multa").keypress(ValidNum);
		$("#dias").keypress(ValidNum);
		llenar_select_empleado();
		cargar_codigo_multas();
		llenar_select_tipo_multas();

		// guardar permisos
		$('#btn_0').click(function() {
			var respuesta = $('#form_multas').valid();

			if (respuesta == true) {
				$('#btn_0').attr('disabled', true);
				var form_uno = $("#form_multas").serialize();
				var submit = "btn_guardar_multa";

				$.ajax({
			        url: "data/multas/app.php",
			        data: form_uno+"&btn_guardar_multa=" + submit,
			        type: "POST",
			        success: function (data) {
			        	var val = data;
			        	if(data != '') {
			        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
							  var myWindow = window.open('data/reportes/multas.php?id='+val,'popup','width=900,height=650'); 
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
			}
		});
		// fin

		// abrir en una nueva ventana reporte permisos
		$scope.methodspdf = function(id) { 
			var myWindow = window.open('data/reportes/multas.php?id='+id,'popup','width=900,height=650');
		} 
		// fin		

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
	                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    });

	    // buscador clientes
	    jQuery(grid_selector).jqGrid({	        
	        datatype: "xml",
	        url: 'data/multas/xml_multas.php',        
	        colNames: ['ID','SERIE','SOLICITANTE','FECHA MULTA','TIPO MULTA','ACCIÓN'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'serie_multa',index:'serie_multa',frozen : true,align:'left',search:true},
	            {name:'solicitante',index:'solicitante',frozen : true,align:'left',search:true, width: '320px'},
	            {name:'fecha_multa',index:'fecha_multa',frozen : true,align:'left',search:false},
	            {name:'tipo_multa',index:'tipo_multa',frozen : true,align:'left',search:false, hidden: false},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '80px'}
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:340,
	        rowList: [10,20,30],
	        pager: pager_selector,        
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
				var ids = jQuery(grid_selector).jqGrid('getDataIDs');
				for(var i = 0;i < ids.length;i++) {
					var id_permisos = ids[i];
					edit = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_permisos+"')\" title='Reporte Permisos' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 					
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:edit});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);

            	$('#id_cliente').val(ret.id);
            	$('#ruc_empresa').val(ret.ruc_empresa);
            	$('#nombre_comercial').val(ret.nombre_comercial);
            	$('#actividad_economica').val(ret.actividad_economica);
            	$('#razon_social').val(ret.razon_social);
            	$('#representante_legal').val(ret.representante_legal);
            	$('#cedula').val(ret.cedula);
            	$('#celular').val(ret.celular);
            	$('#telefono').val(ret.telefono);
            	$('#direccion').val(ret.direccion);
            	$('#correo').val(ret.correo);
            	$('#sitio_web').val(ret.sitio_web);
            	$('#facebook').val(ret.facebook);
            	$('#facebook').val(ret.facebook);
            	$('#twitter').val(ret.twitter);
            	$('#google').val(ret.google);
            	$('#observaciones').val(ret.observaciones);   	            

	            $('#myModal').modal('hide'); 
	            $('#btn_3').attr('disabled',false);
	            $('#btn_0').attr('disabled', true)  	            
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

	    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
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
	        $(grid_selector).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	
	// fin
	});
});