angular.module('scotchApp').controller('contratos_personalController', function ($scope) {

	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab === tabNum;
    };
    // fin

	jQuery(function($) {
		/********************************/
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
		var fecha_actual = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()

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

		//validacion formulario usuarios
		$('#form_contratos').validate({
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
				select_tipo_contrato: {
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
				select_tipo_contrato: {
					required: "Por favor, Seleccione tipo contrato"
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
		$("#select_empleado,#select_tipo_contrato").select2({
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
		    var serie = $("#codigo").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// funcion cargar maximo serie
		function cargar_codigo() {
			$.ajax({
				url: 'data/contratos_selectivos/app.php',
				type: 'post',
				data: {cargar_codigo:'cargar_codigo'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var serie_factura = data.serie;
						var res = parseInt(serie_factura.substr(8, 16));
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
				url: 'data/permisos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
				}
			});
		}
		// fin

		// llenar combo tipo contrato
		function select_tipo_contrato() {
			$.ajax({
				url: 'data/contratos_personal/app.php',
				type: 'post',
				data: {llenar_tipo_contrato:'llenar_tipo_contrato'},
				success: function (data) {
					$('#select_tipo_contrato').html(data);
				}
			});
		}
		// fin

		cargar_codigo();
		llenar_select_empleado();
		select_tipo_contrato();
		// fin

		// inicio lineas llenar
		// $('#titulo').append($('<h2>').text('_______________________________________'));
		$('#tipo_contrato').append($('<b>').text('__________________'));
		$('#representante').append($('<b>').text('_________________________________'));
		$('#ci').append($('<b>').text('__________________'));
		$('#empresa').append($('<b>').text('___________________________________________'));
		$('#dura').append($('<b>').text('__________'));
		$('#fecha_inicio').append($('<b>').text('__________________'));
		$('#fecha_final').append($('<b>').text('__________________'));
		$("#impactos").append($("<b>").text('__________________'));
		$("#programa").append($("<b>").text('_________________'));
		$("#boni").append($("<b>").text('0'));
		$("#precio").append($("<b>").text('$ _________'));
		$("#fecha_actual").append($("<b>").text(fecha_actual));
		// fin

		// guardar factura
		$('#btn_0').click(function() {
			var respuesta = $('#form_contratos').valid();
			var form = $("#form_contratos").serialize();
			var submit = "btn_guardar";

			if (respuesta == true) {
				$.ajax({
			        url: "data/contratos_personal/app.php",
			        data: form +"&btn_guardar=" + submit,
			        type: "POST",
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Contrato Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							redireccionar();
				    	}                                                
			        }
			    });
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
			var respuesta = $('#form_contratos').valid();

			if (respuesta == true) {
				$("#titulo h2").remove();
	        	$("#tipo_contrato b").remove();
	        	$("#representante b").remove();
	        	$("#ci b").remove();
	        	$("#empresa b").remove();
	        	$("#dura b").remove();
	        	$("#fecha_ini b").remove();
	        	$("#fecha_final b").remove();
	        	$("#boni b").remove();
	        	$("#impactos b").remove();
	        	$("#programa b").remove();
				$("#precio b").remove();

	        	// tipos de contratos
	        	var contrato = document.getElementById("select_tipo_contrato");
	        	contrato = contrato.options[contrato.selectedIndex].text;

				if(contrato == 'CANJE') {
	        		$("#titulo").append($("<h2>").text('CONTRATO DE CANJE PUBLICITARIO'));
	        		$("#tipo_contrato").append($("<b>").text('CONTRATO DE CANJE PUBLICITARIO'));
	        	} else {
	        		$("#titulo").append($("<h2>").text('CONTRATO DE PUBLICIDAD'));
	        		$("#tipo_contrato").append($("<b>").text('CONTRATO DE PUBLICIDAD'));
	        	}
	        	// fin

	        	// llenar datos clientes
					$.ajax({
						url: 'data/contratos_selectivos/app.php',
						type: 'post',
						data: {llenar_clientes:'llenar_clientes',id: $('#id_cliente').val()},
						dataType: 'json',
						success: function (data) {
							$("#representante").append($("<b>").text(' ' + data.representante + ' '));
							$("#ci").append($("<b>").text(' ' + data.identificacion));
							$("#empresa").append($("<b>").text(' ' + data.empresa));
						}
					});
				// fin
				
				// duracion
				$("#dura").append($("<b>").text($('#duracion').val()));
				// fin

				// descomponer fecha inicio
				var tem = $('#fecha_inicio').val();
				var res1 = tem.substr(8, 10); 
				var res2 = parseInt(tem.substr(6, 7)); 
				var res3 = tem.substr(0, 4); 
				var fecha_inicio = res1 + " de " + meses[res2 - 1] + " del " + res3;
				$("#fecha_ini").append($("<b>").text(fecha_inicio));
				// fin

				// descomponer fecha fin
				var tem2 = $('#fecha_fin').val();
				var res4 = tem2.substr(8, 10); 
				var res5 = parseInt(tem2.substr(6, 7)); 
				var res6 = tem2.substr(0, 4); 
				var fecha_fin = res4 + " de " + meses[res5 - 1] + " del " + res6;
				$("#fecha_final").append($("<b>").text(fecha_fin));
				// fin

				// bonificacion
				$("#boni").append($("<b>").text($('#bonificacion').val()));
				// fin

				// llenar impactos
					$.ajax({
						url: 'data/contratos_selectivos/app.php',
						type: 'post',
						data: {llenar_impactos:'llenar_impactos',id: $('#select_paquete').val()},
						dataType: 'json',
						success: function (data) {
							$("#impactos").append($("<b>").text(' ' + data.descripcion + ' '));
							$("#precio").append($("<b>").text('$ ' + data.precio));							
						}
					});
				// fin

				// programas
				var programa = document.getElementById("select_programa");
  				$("#programa").append($("<b>").text(programa.options[programa.selectedIndex].text));
  				// fin
			}
		});
	});
	// fin

		// Descargar Contartos
		$scope.methodword = function(id) { 
			var myWindow = window.open('data/contratos_personal/template.php?id='+id);
		} 
		// fin		

		/*jqgrid*/    
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {
	        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
	        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
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
	        url: 'data/contratos_personal/xml_contratos.php',        
	        colNames: ['ID','CÓDIGO','EMPLEADO','TIPO CONTRATO','FECHA CONTRATO','ACCIÓN'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'codigo',index:'codigo',frozen : true,align:'left',search:true},
	            {name:'empleado',index:'empleado',frozen : true,align:'left',search:true, width: '300px'},
	            {name:'tipo_contrato',index:'tipo_contrato',frozen : true,align:'left',search:true, width: '150px'},
	            {name:'fecha_contrato',index:'fecha_contrato',frozen : true,align:'left',search:false},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '80px'}
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:200,
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
				for(var i=0;i < ids.length;i++) {
					var id_contrato = ids[i];
					word = "<a onclick=\"angular.element(this).scope().methodword('"+id_contrato+"')\" title='Descargar Contrato' ><i class='fa fa-file-word-o blue' style='cursor:pointer; cursor: hand'>  WORD</i></a>"; 
					
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:word});
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
	        
	        caption: "LISTA CONTRATOS"
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