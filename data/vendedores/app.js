angular.module('scotchApp').controller('vendedoresController', function ($scope) {

	jQuery(function($) {
		var oTable1 = $('#dynamic-table')
		.dataTable({					
			bAutoWidth: false,
			"aoColumns": [
			  { "bSortable": false },null, null,null, null
			],
			"aaSorting": [],			
			language: {
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Mostrar _MENU_ registros",
			    "sZeroRecords":    "No se encontraron resultados",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
			    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar: ",
			    "sUrl":            "",
			    "sInfoThousands":  ",",					    
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    },
			    "oAria": {
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			    }
			},
			"columnDefs": [
	            {
	                "targets": [ 0 ],
	                "visible": true,	
	                "bVisible":true,			                
	            },			            
	            {
	                "targets": [ 1 ],
	                "visible": true,			                
	            },			            
	            {
	                "targets": [ 2 ],
	                "visible": true,			                
	            },			            
	            {
	                "targets": [ 3 ],
	                "visible": true,
	                "bVisible":true,
	                		                
	            },			            
			            		                    
	        ],
	    });

		//TableTools settings
		TableTools.classes.container = "btn-group btn-overlap";
		TableTools.classes.print = {
			"body": "DTTT_Print",
			"info": "tableTools-alert gritter-item-wrapper gritter-info gritter-center white",
			"message": "tableTools-print-navbar"
		}
	
		//initiate TableTools extension
		var tableTools_obj = new $.fn.dataTable.TableTools( oTable1, {					 
			"sSwfPath": "dist/js/dataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf", //in Ace demo dist will be replaced by correct assets path					
			"sRowSelector": "td:not(:last-child)",
			"sRowSelect": "multi",					
			"fnRowSelected": function(row) {
				//check checkbox when row is selected
				try { $(row).find('input[type=checkbox]').get(0).checked = true }
				catch(e) {}
			},
			"fnRowDeselected": function(row) {
				//uncheck checkbox
				try { $(row).find('input[type=checkbox]').get(0).checked = false }
				catch(e) {}
			},					
			"sSelectedClass": "success",
	        "aButtons": [
				{
					"sExtends": "copy",
					"sToolTip": "Copiar al portapapeles",
					"sButtonClass": "btn btn-white btn-primary btn-bold",
					"sButtonText": "<i class='fa fa-copy bigger-110 pink'></i>",
					"fnComplete": function() {
						this.fnInfo( '<h3 class="no-margin-top smaller">Copiado Tabla</h3>\
							<p>Copiado '+(oTable1.fnSettings().fnRecordsTotal())+' Fila(s) en el Portapapeles.</p>',
							1000
						);
					}
				},
				
				{
					"sExtends": "pdf",
					"sToolTip": "Exportar a PDF",
					"sButtonClass": "btn btn-white btn-primary  btn-bold",
					"sButtonText": "<i class='fa fa-file-pdf-o bigger-110 red'></i>"
				},
				
				{
					"sExtends": "print",
					"sToolTip": "Vista de Impresión",
					"sButtonClass": "btn btn-white btn-primary  btn-bold",
					"sButtonText": "<i class='fa fa-print bigger-110 grey'></i>",
					
					"sMessage": "<div class='navbar navbar-default'><div class='navbar-header pull-left'></div></div>",
					
					"sInfo": "<h3 class='no-margin-top'>Vista Impresión</h3>\
							  <p>Por favor, utilice la función de impresión de su navegador para \
								imprimir esta tabla.\
							  <br />Presione <b>ESCAPE</b> cuando haya terminado.</p>",
				}
	        ]
	    } );
		//we put a container before our table and append TableTools element to it
	    $(tableTools_obj.fnContainer()).appendTo($('.tableTools-container'));
		setTimeout(function() {
			$(tableTools_obj.fnContainer()).find('a.DTTT_button').each(function() {
				var div = $(this).find('> div');
				if(div.length > 0) div.tooltip({container: 'body'});
				else $(this).tooltip({container: 'body'});
			});
		}, 200);
		
		//ColVis extension
		var colvis = new $.fn.dataTable.ColVis( oTable1, {
			"buttonText": "<i class='fa fa-search'></i>",
			"aiExclude": [0, 3, 6],
			"bShowAll": true,
			//"bRestore": true,
			"sAlign": "right",
			"fnLabel": function(i, title, th) {
				return $(th).text();//remove icons, etc
			}
		}); 
		
		//style it
		$(colvis.button()).addClass('btn-group').find('button').addClass('btn btn-white btn-info btn-bold')
		
		//and append it to our table tools btn-group, also add tooltip
		$(colvis.button())
		.prependTo('.tableTools-container .btn-group')
		.attr('title', 'Mostrar / ocultar las columnas').tooltip({container: 'body'});
		
		//and make the list, buttons and checkboxed Ace-like
		$(colvis.dom.collection)
		.addClass('dropdown-menu dropdown-light dropdown-caret dropdown-caret-right')
		.find('li').wrapInner('<a href="javascript:void(0)" />') //'A' tag is required for better styling
		.find('input[type=checkbox]').addClass('ace').next().addClass('lbl padding-8');
		
		/////////////////////////////////
		//table checkboxes
		$('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);
		
		//select/deselect all rows according to table header checkbox
		$('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){					
			var th_checked = this.checked;//checkbox inside "TH" table header
			
			$(this).closest('table').find('tbody > tr').each(function(){
				var row = this;
				if(th_checked) tableTools_obj.fnSelect(row);
				else tableTools_obj.fnDeselect(row);
			});
		});
		
		//select/deselect a row when the checkbox is checked/unchecked
		$('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
			var row = $(this).closest('tr').get(0);					
			if(!this.checked) tableTools_obj.fnSelect(row);
			else tableTools_obj.fnDeselect($(this).closest('tr').get(0));
		});
		
			$(document).on('click', '#dynamic-table .dropdown-toggle', function(e) {						
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
		});
		
		//And for the first simple table, which doesn't have TableTools or dataTables
		//select/deselect all rows according to table header checkbox
		var active_class = 'active';
		$('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){					
			var th_checked = this.checked;//checkbox inside "TH" table header
			
			$(this).closest('table').find('tbody > tr').each(function(){
				var row = this;
				if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
				else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
			});
		});
		
		//select/deselect a row when the checkbox is checked/unchecked
		$('#simple-table').on('click', 'td input[type=checkbox]' , function(){
			var $row = $(this).closest('tr');
			if(this.checked) $row.addClass(active_class);
			else $row.removeClass(active_class);
		});
	
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

		$.fn.editable.defaults.mode = 'inline';
		$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
	    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
	                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		try {
			try {
				document.createElement('IMG').appendChild(document.createElement('B'));
			} catch(e) {
				Image.prototype.appendChild = function(el){}
			}
	
			var last_gritter
			$('#avatar').editable({
				type: 'image',
				name: 'avatar',
				value: null,
				image: {
					btn_choose: 'Cambiar Logo',
					droppable: true,
					maxSize: 990000,
	
					name: 'avatar',
					on_error : function(error_type) {
						if(last_gritter) $.gritter.remove(last_gritter);
						if(error_type == 1) {//file format error
							last_gritter = $.gritter.add({
								title: 'El archivo no es una imagen!',
							text: 'Por favor, elija un jpg | jpeg | imagen png!',
							class_name: 'gritter-error gritter-center'
							});
						} else if(error_type == 2) {//file size rror
							last_gritter = $.gritter.add({
								title: 'Archivo muy grande!',
							text: 'Tamaño de la imagen no debe superar los 100Kb!',
							class_name: 'gritter-error gritter-center'
							});
						} else {}
					},
					on_success : function() {
						$.gritter.removeAll();
					}
				},
			    url: function(params) {
					var deferred = new $.Deferred
	
					var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
					if(!value || value.length == 0) {
						deferred.resolve();
						return deferred.promise();
					}
	
					setTimeout(function() {
						if("FileReader" in window) {
							var thumb = $('#avatar').next().find('img').data('thumb');
							if(thumb) $('#avatar').get(0).src = thumb;
						}
						
						deferred.resolve({'status':'OK'});
						if(last_gritter) $.gritter.remove(last_gritter);
						last_gritter = $.gritter.add({
							title: 'Imagen Cargada!',
							// text: 'Uploading to server can be easily implemented. A working example is included with the template.',
							class_name: 'gritter-info gritter-center'
						});
						
					 }, parseInt(Math.random() * 800 + 800))
	
					return deferred.promise();
				},
				
				success: function(response, newValue) {
				}
			})
		}catch(e) {}

		// validacion numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		//validacion formulario usuarios
		$('#form_vendedores').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				codigo: {
					required: true			
				},
				identififcacion: {
					required: true			
				},
				select_tipo_vendedor: {
					required: true			
				},
				personal: {
					required: true				
				},
			},
			messages: {
				codigo: {
					required: "Por favor, Código requerido"
				},
				identififcacion: {
					required: "Por favor, Indique una Identificación"
				},
				select_tipo_vendedor: {
					required: "Por favor, Seleccione Tipo Vendedor"
				},
				personal: { 	
					required: "Por favor, Indique Nombre Vendedor"		
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

		// busqueda identificacion personal
		var busqueda_ruc = 'identificacion';

        $("#identificacion").autocomplete({
            source: "data/vendedores/app.php?tipo_busqueda=" + busqueda_ruc,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_personal").val(ui.item.id_personal); 
            $("#identificacion").val(ui.item.value); 
            $("#personal").val(ui.item.personal);
            return false;
            },
            select: function(event, ui) {
            $("#id_personal").val(ui.item.id_personal); 
            $("#identificacion").val(ui.item.value); 
            $("#personal").val(ui.item.personal);
            return false;
            }
        });
	    // fin

	    // busqueda personal nombre
		var busqueda_nombre = 'nombre';

        $("#personal").autocomplete({
            source: "data/vendedores/app.php?tipo_busqueda=" + busqueda_nombre,
            minLength: 1,
            focus: function(event, ui) {
            $("#id_personal").val(ui.item.id_personal); 
            $("#personal").val(ui.item.value);
            $("#identificacion").val(ui.item.identificacion);
            return false;
            },
            select: function(event, ui) {
            $("#id_personal").val(ui.item.id_personal); 
            $("#personal").val(ui.item.value);
            $("#identificacion").val(ui.item.identificacion);
            return false;
            }
        });
	    // fin

	    // abrir en una nueva ventana cargar imagenes
		$scope.methodofirma = function(id) { 
			$.ajax({
				url: 'data/vendedores/app.php',
				type: 'post',
				data: {llenar_foto:'llenar_foto',id:id},
				dataType: 'json',
				async: true,
				success: function (data) {
					$("#avatar").attr("src","data/vendedores/imagenes/"+data.imagen);
				}
			});

			$('#myModal2').modal('show');
			$('#id_vendedor').val(id);
		} 
		// fin

	    // llenar tablas de fichas
		function llenar_tabla() {
			$('#dynamic-table').dataTable().fnClearTable();

			$.ajax({
				url: 'data/vendedores/app.php',
				type: 'post',
				data: {cargar_tabla:'cargar_tabla'},
				dataType: 'json',
				success: function(response) { 
					var tabla = $('#dynamic-table').DataTable();
					for (var i = 0; i < response.length; i++) {
						var editar = "<button type='button' class='btn btn-white btn-primary btn-bold btn-sm' onclick=\"angular.element(this).scope().methodoeditar('"+response[i].id+"')\" data-toggle='tooltip' title = 'Editar Vendedores'><span class='glyphicon glyphicon-pencil blue'> EDITAR</button>";
						var firma = "<button type='button' class='btn btn-white btn-primary btn-bold btn-sm' onclick=\"angular.element(this).scope().methodofirma('"+response[i].id+"')\" data-toggle='tooltip' title = 'Cargar Firma'><span class='glyphicon glyphicon-picture blue'> FIRMA</button>";
						console.log(response[i].id);

						tabla.row.add([
				            response[i]['cedula_identificacion'],
				            response[i]['nombres_completos'],
				            response[i]['nombre'],
				            editar,
				            firma
		                ]).draw(false);                            
			        }
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

		$("#select_tipo_vendedor").select2({
		  placeholder: "Seleccione una opción",
		  allowClear: true
		});
		// fin

		// incicio
		llenar_tabla();
		select_tipo_vendedor();
		// fin

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_vendedores').valid();

			if (respuesta == true) {
				var submit = "btn_gardar";
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
								text: 'Vendedor Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 2000				
							});
				    	} 
				    	redireccionar();             
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

		// guardar imagen
		$('#btn_guardar_imagen').click(function() {
			var submit = "btn_gardar_imagen";
			var formulario = $("#form_imagen").serialize();

			$.ajax({
		        url: "data/vendedores/app.php",
		        data: formulario + "&btn_gardar_imagen=" + submit+ "&img="+$("#avatar")[0].src,
		        type: "POST",
		        async: true,
		        success: function (data) {
		        	var val = data;
		        	if(data == '1') {
		        		$.gritter.add({
							title: 'Mensaje',
							text: 'Fotografía Agregada correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
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
		});
		// fin

		// Actualizar formulario
		$('#btn_3').click(function() {
			location.reload(true);
		});
		// fin
	});
});