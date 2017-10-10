angular.module('scotchApp').controller('clientesController', function ($scope, $location,loaddatosSRI) {

	jQuery(function($) {	
		// mascaras
		$('#celular').mask('(999) 999-9999');
		$('#telefono').mask('(999) 999-999');
		// fin

		// validación ruc
		$("#ruc_empresa").keyup(function() {
	        $.ajax({
	            type: "POST",
	            url: "data/clientes/app.php",
	            data: {comparar_ruc:'comparar_ruc',ruc: $("#ruc_empresa").val()},
	            dataType: 'json',
	            success: function(data) {
	                var val = data;
	                if (val == 1) {
	                    $("#ruc_empresa").val("");
	                    $("#ruc_empresa").focus();
	                    $.gritter.add({
							title: 'Error... El cliente ya fue registrado',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});	
					}
	            }
	        });
    	});
		// fin

		//validacion formulario usuarios
		$('#form_clientes').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				ruc_empresa: {
					required: true,
					digits: true,
					// minlength: 10				
				},
				nombre_comercial: {
					required: true				
				},
				actividad_economica: {
					required: true				
				},
				razon_social: {
					required: true,
					minlength: 10				
				},
				representante_legal: {
					required: true				
				},
				cedula: {
					required: true				
				},
				celular: {
					required: true				
				},
				direccion: {
					required: true				
				},	
			},
			messages: {
				ruc_empresa: {
					required: "Por favor, Ingrese Ruc Empresa",
					digits: "Por favor, Ingrese solo dígitos",
					// minlength: "Por favor, Especifique mínimo 13 digitos"
				},
				nombre_comercial: { 	
					required: "Por favor, Indique Nombre Comercial",			
				},
				actividad_economica: { 	
					required: "Por favor, Indique Actividad Económica",			
				},
				razon_social: {
					required: "Por favor, Indique la Razón Social",
				},
				representante_legal: {
					required: "Por favor, Indique Representante Legal",
				},
				cedula: {
					required: "Por favor, Indique cédula representante",
				},
				celular: {
					required: "Por favor, Indique número celular",
				},
				direccion: {
					required: "Por favor, Ingrese una dirección",
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

		// validacion solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		// // consultar identificacion
		// $scope.cargadatos = function(estado) {
		// 	if($('#identificacion').val() == '') {
		// 		$.gritter.add({
		// 			title: 'Error... Ingrese una Identificación',
		// 			class_name: 'gritter-error gritter-center',
		// 			time: 1000,
		// 		});
		// 		$('#identificacion').focus();
		// 	} else {
		// 		if($('#select_documento').val() == 'CEDULA') {
		// 			$.ajax({
		//                 type: "POST",
		//                 url: "data/clientes/app.php",          
		//                 data:{consulta_cedula:'consulta_cedula',txt_ruc:$("#identificacion").val()},
		//                 dataType: 'json',
		//                 beforeSend: function() {
		//                 	$.blockUI({ css: { 
		// 			            border: 'none', 
		// 			            padding: '15px', 
		// 			            backgroundColor: '#000', 
		// 			            '-webkit-border-radius': '10px', 
		// 			            '-moz-border-radius': '10px', 
		// 			            opacity: .5, 
		// 			            color: '#fff' 
		// 			        	},
		// 			            message: '<h3>Consultando, Por favor espere un momento    ' + '<i class="fa fa-spinner fa-spin"></i>' + '</h3>'
		// 			    	});
		//                 },
	 //                    success: function(data) {
	 //                    	$.unblockUI();
  //                   		if(data.datosPersona.valid == false) {
		// 	            		$.gritter.add({
		// 							title: 'Lo sentimos, Cédula Erronea',
		// 							class_name: 'gritter-error gritter-center',
		// 							time: 1000,
		// 						});
		// 						$('#identificacion').focus();
		// 						$('#identificacion').val("");	
		// 	            	} else {
		// 	            		if(data.datosPersona.valid == true) {
		// 		            		$('#nombres_completos').val(data.datosPersona.name);
		// 		            		$('#ciudad').val(data.datosPersona.residence);
		// 		            		$('#direccion').val(data.datosPersona.streets);
		// 		            	}	 		
		// 	            	}
		//                 }
		//             });
		// 		} else {
		// 			if($('#select_documento').val() == 'RUC') {
		// 				$.ajax({
		// 	                type: "POST",
		// 	                url: "data/clientes/app.php",          
		// 	                data:{consulta_ruc:'consulta_ruc',txt_ruc:$("#identificacion").val()},
		// 	                dataType: 'json',
		// 	                beforeSend: function() {
		// 	                	$.blockUI({ css: { 
		// 				            border: 'none', 
		// 				            padding: '15px', 
		// 				            backgroundColor: '#000', 
		// 				            '-webkit-border-radius': '10px', 
		// 				            '-moz-border-radius': '10px', 
		// 				            opacity: .5, 
		// 				            color: '#fff' 
		// 				        	},
		// 				            message: '<h3>Consultando, Por favor espere un momento    ' + '<i class="fa fa-spinner fa-spin"></i>' + '</h3>'
		// 				    	});
		// 	                },
		//                     success: function(data) {
		//                     	$.unblockUI();
		//                     	if(data.datosEmpresa.valid == 'false') {
		// 		            		$.gritter.add({
		// 								title: 'Lo sentimos", "Usted no dispone de un RUC registrado en el SRI, o el número ingresado es Incorrecto."',
		// 								class_name: 'gritter-error gritter-center',
		// 								time: 1000,
		// 							});

		// 							$('#identificacion').focus();
		// 							$('#identificacion').val("");
		// 		            	} else {
		// 		            		if(data.datosEmpresa.valid == 'true') {
		// 				            	$('#nombres_completos').val(data.datosEmpresa.razon_social);			            		
		// 				            }
		// 		            	}
		// 	                }
		// 	            });
		// 			}	
		// 		}
	 //    	} 
	 //    }
	 //    // fin

		// verificar ruc
		$scope.cargadatos = function(estado) {
			if($('#ruc_empresa').val() == '') {
				$.gritter.add({
					title: 'Ingrese Ruc Empresa',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#ruc_empresa').focus();
			} else {
				$.ajax({
	                type: "POST",
	                url: "data/clientes/app.php",          
	                data:{consulta_ruc:'consulta_ruc',txt_ruc:$("#ruc_empresa").val()},
	                dataType: 'json',
	                beforeSend: function() {
	                	$.blockUI({ css: { 
				            border: 'none', 
				            padding: '15px', 
				            backgroundColor: '#000', 
				            '-webkit-border-radius': '10px', 
				            '-moz-border-radius': '10px', 
				            opacity: .5, 
				            color: '#fff' 
				        	},
				            message: '<h3>Consultando, Por favor espere un momento    ' + '<i class="fa fa-spinner fa-spin"></i>' + '</h3>'
				    	});
	                },
                    success: function(data) {
                    	$.unblockUI();
                    	if(data.datosEmpresa.valid == 'false') {
		            		$.gritter.add({
								title: 'Lo sentimos", "Usted no dispone de un RUC registrado en el SRI, o el número ingresado es Incorrecto."',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});

							$('#identificacion').focus();
							$('#identificacion').val("");
		            	} else {
		            		if(data.datosEmpresa.valid == 'true') {
		            			$('#nombre_comercial').val(data.datosEmpresa.nombre_comercial);
			            		$('#actividad_economica').val(data.datosEmpresa.actividad_economica);
			            		$('#razon_social').val(data.datosEmpresa.razon_social);
			            		$('#representante_legal').val(data.establecimientos.adicional.representante_legal);
			            		$('#cedula').val(data.establecimientos.adicional.cedula);
				            	// $('#nombres_completos').val(data.datosEmpresa.razon_social);			            		
				            }
		            	}
	                }
	            });
			}	
				 // if (estado) {
				 // 	$.blockUI({ css: { 
			  //           border: 'none', 
			  //           padding: '15px', 
			  //           backgroundColor: '#000', 
			  //           '-webkit-border-radius': '10px', 
			  //           '-moz-border-radius': '10px', 
			  //           opacity: .5, 
			  //           color: '#fff' 
			  //       	},
			  //           message: '<h3>Consultando, Por favor espere un momento    ' + '<i class="fa fa-spinner fa-spin"></i>' + '</h3>'
			  //   	}); 
		   //          loaddatosSRI.get({
		   //              nrodocumento: $("#ruc_empresa").val(),
		   //              tipodocumento: "RUC"
		   //          }).$promise.then(function(data) {
		   //          	$.unblockUI();
		   //          	if(data.datosEmpresa.valid == 'false') {
		   //          		$.gritter.add({
					// 			title: 'Error.... Ruc Erroneo',
					// 			class_name: 'gritter-error gritter-center',
					// 			time: 1000,
					// 		});
					// 		$('#ruc_empresa').focus();
					// 		$('#form_clientes').each(function(){
					// 		  this.reset();
					// 		});
		   //          	} else {
		   //          		$('#nombre_comercial').val(data.datosEmpresa.nombre_comercial);
			  //           	$('#actividad_economica').val(data.datosEmpresa.actividad_economica);
			  //           	$('#razon_social').val(data.datosEmpresa.razon_social);
			  //           	$('#representante_legal').val(data.establecimientos.adicional.representante_legal);
			  //           	$('#cedula').val(data.establecimientos.adicional.cedula);
		   //          	}
		   //          }, function(err) {
		   //              console.log(err.data.error);
		   //          });
		   //      }
	    	// } 
	    }
	    // fin

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
				location.reload(true);
			 //    $('#form_clientes').each(function(){
				//   this.reset();
				// });
			}, 1000);
		}
		// fin

		// buscador registro
		$("#buscador").keyup(function() {
		    var campo = $('#buscador').val();
			jQuery("#table").jqGrid('setGridParam',{url:"data/clientes/xml_clientes.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// listar registro
		$("#btn_listar").click(function() {
			$('#buscador').val('');
		    var campo = $('#buscador').val();
			jQuery("#table").jqGrid('setGridParam',{url:"data/clientes/xml_clientes.php?campo="+campo,page:1}).trigger("reloadGrid");
		});
		// fin

		// procesos cargado inicio
		$("#ruc_empresa").keypress(ValidNum);
		$("#cedula").keypress(ValidNum);
		$('#btn_3').attr('disabled',true);
		$('#ruc_empresa').focus();
		$("#ruc_empresa").attr("maxlength", "13");
		// fin

		// actualizar formulario
		$('#btn_1').click(function() {
			location.reload(true);
		});
		// fin

		// guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_clientes').valid();

			if (respuesta == true) {
				$('#btn_0').attr('disabled', true);
				var submit = "btn_guardar";
				var formulario = $("#form_clientes").serialize();

				$.ajax({
			        url: "data/clientes/app.php",
			        data: formulario + "&btn_guardar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Cliente Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
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
		// // fin

		// modificar formulario
		$('#btn_3').click(function() {
			var respuesta = $('#form_clientes').valid();

			if (respuesta == true) {
				$('#btn_3').attr('disabled', true);
				var submit = "btn_modificar";
				var formulario = $("#form_clientes").serialize();

				$.ajax({
			        url: "data/clientes/app.php",
			        data: formulario + "&btn_modificar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '2') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Cliente Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 2000				
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
		// // fin

		/*jqgrid*/    
		jQuery(function($) {
		    var grid_selector = "#table";
		    var pager_selector = "#pager";
		    var campo = $('#buscador').val();
		    
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function() {
		        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
		        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
		    });
		    //cambiar el tamaño de la barra lateral collapse/expand
		    var parent_column = $(grid_selector).closest('[class*="col-"]');
		    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
		        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
		            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
		            setTimeout(function() {
		                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
		            }, 0);
		        }
		    });

		    // buscador clientes
		    jQuery(grid_selector).jqGrid({	        
		        datatype: "xml",
		        url: "data/clientes/xml_clientes.php?campo="+campo,        
		        colNames: ['ID','RUC','NOMBRE COMERCIAL','ACTIVIDAD ECONÓMICA','RAZÓN SOCIAL','REPRESENTANTE','CÉDULA','MÓVIL','TELÉFONO','DIRECCIÓN','CORREO','SITIO WEB','FACEBOOK','TWITTER','GOOGLE','OBSERVACIONES'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'ruc_empresa',index:'ruc_empresa',frozen : true,align:'left',search:true},
		            {name:'nombre_comercial',index:'nombre_comercial',frozen : true,align:'left',search:true},
		            {name:'actividad_economica',index:'actividad_economica',frozen : true,align:'left',search:false},
		            {name:'razon_social',index:'razon_social',frozen : true,align:'left',search:false, hidden: false},
		            {name:'representante_legal',index:'representante_legal',frozen : true,align:'left',search:false},
		            {name:'cedula',index:'cedula',frozen : true,align:'left',search:false, hidden: false},
		            {name:'celular',index:'celular',frozen : true,align:'left',search:false, hidden: false},
		            {name:'telefono',index:'telefono',frozen : true,align:'left',search:false, hidden: false},
		            {name:'direccion',index:'direccion',frozen : true,align:'left',search:false, hidden: false},
		            {name:'correo',index:'correo',frozen : true,align:'left',search:false, hidden: false},
		            {name:'sitio_web',index:'sitio_web',frozen : true,align:'left',search:false, hidden: false},
		            {name:'facebook',index:'facebook',frozen : true,align:'left',search:false, hidden: false},
		            {name:'twitter',index:'twitter',frozen : true,align:'left',search:false, hidden: false},
		            {name:'google',index:'google',frozen : true,align:'left',search:false, hidden: false},
		            {name:'observaciones',index:'observaciones',frozen : true,align:'left',search:false, hidden: false},
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
		        
		        caption: "LISTA CLIENTES"
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
		        editicon: 'ace-icon fa fa-pencil blue',
		        add: false,
		        addicon: 'ace-icon fa fa-plus-circle purple',
		        del: false,
		        delicon: 'ace-icon fa fa-trash-o red',
		        search: false,
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
});