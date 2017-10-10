angular.module('scotchApp').controller('orden_trabajoController', function ($scope, $location, loaddatosSRI, $interval) {

	jQuery(function($) {
		$('#cantidad').ace_spinner({value:0,min:0,max:30,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		
		$("#eficiencia").rating({
			// rating: 3
		});

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

		$("#select_responsable,#select_tipo,#select_destino,#select_cliente").select2({
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


		$("#cantidad").keypress(ValidNum);
		$("#presupuesto").keypress(Valida_punto);
		llenar_select_responsable();
		llenar_select_clientes();
		document.getElementById("fecha_inicio").readOnly = true;

		// llenar combo empleado
		function llenar_select_responsable() {
			$.ajax({
				url: 'data/orden_trabajo/app.php',
				type: 'post',
				data: {llenar_responsable:'llenar_responsable'},
				success: function (data) {
					$('#select_responsable').html(data);
				}
			});
		}
		// fin

		// llenar combo empleado
		function llenar_select_clientes() {
			$.ajax({
				url: 'data/orden_trabajo/app.php',
				type: 'post',
				data: {llenar_cliente:'llenar_cliente'},
				success: function (data) {
					$('#select_cliente').html(data);
				}
			});
		}
		// fin
					
		var substringMatcher = function(strs) {
			return function findMatches(q, cb) {
				var matches, substringRegex;
			 
				matches = [];
			 
				substrRegex = new RegExp(q, 'i');

				$.each(strs, function(i, str) {
					if (substrRegex.test(str)) {
						matches.push({ value: str });
					}
				});
				cb(matches);
			}
		 }
	
		$('input.typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
			name: 'states',
			displayKey: 'value',
			source: substringMatcher(ace.vars['US_STATES'])
		});


        $('#fecha_inicio').datetimepicker({
            defaultDate: new Date()
        });

        $('#fecha_entrega').datetimepicker({
            defaultDate: new Date()
        });

		// $('#fecha_entrega').datetimepicker().next().on(ace.click_event, function() {
		// 	$(this).prev().focus();
		// });

		//validacion formulario usuarios
		$('#form_orden').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_responsable: {
					required: true				
				},
				tiempo_ejecucion: {
					required: true				
				},
				fecha_inicio: {
					required: true				
				},
				fecha_entrega: {
					required: true,
					minlength: 10				
				},
				select_tipo: {
					required: true				
				},
				select_destino: {
					required: true				
				}
			},
			messages: {
				select_responsable: {
					required: "Por favor, Seleccione un Responsable"
				},
				tiempo_ejecucion: { 	
					required: "Por favor, Indique Tiempo Ejecucion",			
				},
				fecha_inicio: { 	
					required: "Por favor, Indique Fecha Inicio",			
				},
				fecha_entrega: {
					required: "Por favor, Indique Fecha Entrega",
				},
				select_tipo: {
					required: "Por favor, Indique Tipo Trabajo",
				},
				select_destino: {
					required: "Por favor, Indique un Destino",
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

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
				location.reload(true);
			}, 1000);
		}
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

		// funcion cargar maximo codigo trabajo
		function cargar_codigo() {
			$.ajax({
				url: 'data/orden_trabajo/app.php',
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
						var a = autocompletar($("#codigo").val());
						$("#codigo").val(a + "1");
						$("#codigo").focus();	
					}
				}
			});
		}
		// fin

		cargar_codigo();	

		// autocompletar codigo
	    $("#codigo").on("keypress",function (e) {
	    	if(e.keyCode == 13) {
		    	var a = autocompletar($("#codigo").val());
				$("#codigo").val(a + "" + $("#codigo").val());
				$("#codigo").focus();
			}
	    });
	    // fin

		// // guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_orden').valid();

			if (respuesta == true) {
				$('#btn_0').attr('disabled', true);
				var submit = "btn_guardar";
				var formulario = $("#form_orden").serialize();

				$.ajax({
			        url: "data/orden_trabajo/app.php",
			        data: formulario + "&btn_guardar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data != '') {
			        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
							  	var myWindow = window.open('data/reportes/orden_trabajo.php?id='+val,'popup','width=900,height=650');
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
		// // fin

		// modificar formulario
		$('#btn_3').click(function() {
			var respuesta = $('#form_orden').valid();

			if (respuesta == true) {
				$('#btn_3').attr('disabled', true);
				var submit = "btn_modificar";
				var formulario = $("#form_orden").serialize();

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
		// fin

		// cambiar estado
		$('#btn_4').click(function() {
			if($('#id_orden').val() == '') {
				swal({
		            title: "Seleccione una Orden Trabajo",
		            type: "warning",
		        });
			} else {

				$('#btn_0').attr('disabled', true);
				var submit = "btn_cambiar";
				var formulario = $("#form_orden").serialize();

				$.ajax({
			        url: "data/orden_trabajo/app.php",
			        data: formulario + "&btn_cambiar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '2') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Orden Trabajo entregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
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
		// fin

		// calcular tiempo restante
		function countdown() {
			if ($('#fecha_inicio').val() == '') {
				$.gritter.add({
					title: 'Ingrese Fecha de Inicio',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#fecha_inicio').focus();
			} else {
				if ($('#fecha_entrega').val() == '') {
					$.gritter.add({
						title: 'Ingrese Fecha de Entrega',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
					$('#fecha_entrega').focus();	
				} else {
					var fecha_inicio = $('#fecha_inicio').val();
					var fecha_entrega = $('#fecha_entrega').val();

					var f1 = fecha_inicio.substr(0, 10);
		            var f2 = fecha_entrega.substr(0, 10);

		           	var hora_inicio = fecha_inicio.substr(10, 6);
					var hora_entrega = fecha_entrega.substr(10, 6);

		            var horainicio = (hora_inicio).split(":");
		            var horafinal = (hora_entrega).split(":");

		            var aFecha1 = f1.split('/'); 
		            var aFecha2 = f2.split('/');

		            // var fecha1 = new Date(aFecha1[2],aFecha1[0]-1,aFecha1[1], horainicio[0], horainicio[1], '00');
		            var fecha1 = new Date();
		            var fecha2 = new Date(aFecha2[2],aFecha2[0]-1,aFecha2[1], horafinal[0], horafinal[1], '00');

		            if (fecha2 > fecha1) {
	                    var diferencia = (fecha2.getTime()-fecha1.getTime()) / 1000;
	                    dias = Math.floor(diferencia/86400);
	                    diferencia = diferencia-(86400*dias);
	                    horas = Math.floor(diferencia/3600);
	                    diferencia=diferencia-(3600*horas);
	                    minutos=Math.floor(diferencia/60);
	                    diferencia=diferencia-(60*minutos);
	                    segundos=Math.floor(diferencia);

	                    $('#tiempo_ejecucion').val(dias + ' D.' +'  '+ horas + ' H.' +'  '+ minutos +'  m.' +'  '+ segundos +' s.'  );
	            	} else {
                    	$('#tiempo_ejecucion').val('Días: '+ 0 + '  Horas: ' + 0 + '  Minutos: ' + 0 + '  Segundos: ' + 0);
            		}
				}	
			} 
		}
		// fin

		// reimprimir facturas
		$('#calcular').click(function() {	
			countdown();
		});
		// fin

		// abrir en una nueva ventana reporte ordenes trabajo
		$scope.methodspdf = function(id) { 
			var myWindow = window.open('data/reportes/orden_trabajo.php?id='+id,'popup','width=900,height=650');
		} 
		// fin

		// estrellas otorgadas
		function estrellas(num) {
			var acu = '';
			for (var i = 0; i < num; i++) {
				acu=acu+'<i class="pe-7s-star text-warning"></i>';
			}
			return acu;
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
	        url: 'data/orden_trabajo/xml_ordenes.php',        
	        colNames: ['ID','RESPONSABLE','FECHA INICIO','FECHA ENTREGA','TIPO','ESTADO','ACCIÓN'],
	        colModel:[      
	            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
	            {name:'responsable',index:'responsable',frozen : true,align:'left',search:true},
	            {name:'fecha_inicio',index:'fecha_inicio',frozen : true,align:'left',search:true},
	            {name:'fecha_entrega',index:'fecha_entrega',frozen : true,align:'left',search:false},
	            {name:'tipo',index:'tipo',frozen : true,align:'left',search:false, hidden: false},
	            {name:'estado',index:'estado',frozen : true,align:'left',search:false, hidden: false},
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
				for(var i = 0;i < ids.length;i++) {
					var id_ordenes = ids[i];
					edit = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_ordenes+"')\" title='Reporte Ordenes Trabajo' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 					
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:edit});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);
            	$.ajax({
					url: 'data/orden_trabajo/app.php',
					type: 'post',
					data: {llenar_orden:'llenar_orden', id:ret.id},
					dataType: 'json',
					success: function (data) {
						function tiempo_restante() {
							var fecha_entrega = data.fecha_entrega;

				            var f2 = fecha_entrega.substr(0, 10);
							var hora_entrega = fecha_entrega.substr(10, 6);
				            var horafinal = (hora_entrega).split(":");
				            var aFecha2 = f2.split('/');

				            var fecha1 = new Date();
				            var fecha2 = new Date(aFecha2[2],aFecha2[0]-1,aFecha2[1], horafinal[0], horafinal[1], '00');

				            if (fecha2 > fecha1) {
			                    var diferencia = (fecha2.getTime()-fecha1.getTime()) / 1000;
			                    dias = Math.floor(diferencia / 86400);
			                    diferencia = diferencia - (86400 * dias);
			                    horas = Math.floor(diferencia / 3600);
			                    diferencia = diferencia - (3600 * horas);
			                    minutos = Math.floor(diferencia / 60);
			                    diferencia = diferencia - (60 * minutos);
			                    segundos = Math.floor(diferencia);

			                    // $scope.diferencia = data.count;
			                    $scope.diferencia = segundos;
			                    // document.getElementById("diferencia").innerHTML = '' + dias + ' : ' + horas + ' : ' + minutos + ' : ' + segundos + '';
			                    if (dias>0 || horas>0 || minutos>0 || segundos>0) {
			                    	
			                    	$interval(function() {
			                    		tiempo_restante();
			                    	}, 1000);
			                    }
			            	} else {
			            		// document.getElementById("diferencia").innerHTML = 'Quedan ' + 0 + ' D&iacute;as, ' + 0 + ' Horas, ' + 0 + ' Minutos, ' + 0 + ' Segundos';
		            		}	
						}

						
						$("#id_orden").val(data.id);
						$("#codigo").val(data.codigo);
						$("#select_responsable").select2('val', data.id_responsable).trigger("change");
						$("#fecha_inicio").val(data.fecha_inicio);
						$("#fecha_entrega").val(data.fecha_entrega);
						tiempo_restante();
						// var fecha_entrega = data.fecha_entrega;

			   //          var f2 = fecha_entrega.substr(0, 10);
						// var hora_entrega = fecha_entrega.substr(10, 6);
			   //          var horafinal = (hora_entrega).split(":");
			   //          var aFecha2 = f2.split('/');

			   //          var fecha1 = new Date();
			   //          var fecha2 = new Date(aFecha2[2],aFecha2[0]-1,aFecha2[1], horafinal[0], horafinal[1], '00');

			   //          if (fecha2 > fecha1) {
		    //                 var diferencia = (fecha2.getTime()-fecha1.getTime()) / 1000;
		    //                 dias = Math.floor(diferencia/86400);
		    //                 diferencia = diferencia-(86400*dias);
		    //                 horas = Math.floor(diferencia/3600);
		    //                 diferencia = diferencia-(3600*horas);
		    //                 minutos = Math.floor(diferencia/60);
		    //                 diferencia = diferencia-(60*minutos);
		    //                 segundos = Math.floor(diferencia);

		    //                 document.getElementById("diferencia").innerHTML = 'Quedan ' + dias + ' D&iacute;as, ' + horas + ' Horas, ' + minutos + ' Minutos, ' + segundos + ' Segundos';
		    //                 if (dias>0 || horas>0 || minutos>0 || segundos>0) {
		    //                 	// $interval(function() {
		    //                 	// 	tiempo_restante();
		    //                 	// }, 1000);
		    //                 }
		    //         	} else {
		    //         		document.getElementById("diferencia").innerHTML = 'Quedan ' + 0 + ' D&iacute;as, ' + 0 + ' Horas, ' + 0 + ' Minutos, ' + 0 + ' Segundos';
	     //        		}

						$("#tiempo_ejecucion").val(data.tiempo_ejecucion);
						$("#select_tipo").select2('val', data.tipo_trabajo).trigger("change");
						$("#descripcion").val(data.descripcion);
						$("#select_destino").select2('val', data.destino).trigger("change");
						$("#select_cliente").select2('val', data.id_cliente).trigger("change");

						$("#cantidad").val(data.cantidad);
						$("#presupuesto").val(data.presupuesto);
						$("#observaciones").val(data.observaciones);
						// $("#rateYo").rateYo({
						//     rating: 3
						// });
						// $("#eficiencia").val(data[i + 14]);

						if(data.estado == '2') {
							$('#btn_4').attr('disabled', true);	
						} else {
							$('#btn_4').attr('disabled', false);
						}
					}	
			}); 
			$('#myModal').modal('hide');

	        $('#btn_3').attr('disabled',false);
	        $('#btn_0').attr('disabled', true)  	            
	        },
	        
	        caption: "LISTA ORDENES TRABAJO"
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
	});
});