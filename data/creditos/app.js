angular.module('scotchApp').controller('creditosController', function ($scope) {

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
		var DIARIO = "diario";
		var SEMANAL = "semanal";
		var QUINCENAL = "quincenal";
		var MENSUAL = "mensual";
		var BIMESTRAL = "bimestral";
		var TRIMESTRAL = "trimestral";
		var CUATRIMESTRAL = "cuatrimestral";
		var SEMESTRAL = "semestral";
		var ANUAL = "anual";

		// var fecha = new Date(),
		// dia = fecha.getDate(),
		// mes = fecha.getMonth() + 1,
		// anio = fecha.getFullYear(),
		// tiempo = prompt("Ingrese la cantidad de días a añadir"),
		// addTime = tiempo * 86400; //Tiempo en segundos
		 
		// fecha.setSeconds(addTime); //Añado el tiempo
		 
		// document.body.innerHTML = "Fecha actual: " + dia + "/" + mes + "/" + anio + "<br />";
		// document.body.innerHTML += "Tiempo añadido: " + tiempo + " días<br />";
		// document.body.innerHTML += "Fecha final: " + fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

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
		$('#input_cuotas').ace_spinner({value:1,min:1,max:6,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});

		//validacion formulario usuarios
		$('#form_creditos').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_empleado: {
					required: true			
				},
				input_monto: {
					required: true			
				},
				input_tasa: {
					required: true			
				},
			},
			messages: {
				select_empleado: {
					required: "Por favor, Seleccione un Empleado"
				},
				input_monto: {
					required: "Por favor, Ingrese Monto Crédito"
				},
				input_tasa: {
					required: "Por favor, Ingrese Taza Interés"
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

		// funcion validar solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		llenar_select_empleado();
		$("#monto").keypress(Valida_punto);


		// llenar combo empleado
		function llenar_select_empleado() {
			$.ajax({
				url: 'data/creditos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
				}
			});
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

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// guardar factura
		$('#btn_0').click(function() {
			var respuesta = $('#form_creditos').valid();
			var form = $("#form_creditos").serialize();
			var submit = "btn_guardar";

			if (respuesta == true) {
				//varibles creditos 
				var creditos = [];
		       	$("#tbt_creditos tbody tr").each(function (index) {  
		       		var element = {};
			        $(this).children("td").each(function (index) {                               
			            switch (index) {                                            
			                case 1:
			                	element.fecha = $(this).text();
			                    break; 
			                case 2:
			                    element.interes = $(this).text();
			                    break; 
			                case 3:
			                    element.abono_capital = $(this).text();
			                    break;
			                case 4:
			                    element.valor_cuota = $(this).text();
			                    break;
			                case 5:
			                    element.saldo_capital = $(this).text();
			                    break;    
			            }	            
			        });
			        creditos.push(element);
			    });
			    // fin variables creditos

			    // guardar formularios
				$.ajax({
			        url: "data/creditos/app.php",
			        data: form  +"&campos_creditos="+JSON.stringify(creditos) + "&btn_guardar=" + submit,
			        type: "POST",
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
							bootbox.alert("Gracias! Por su Información Datos Correctamente Guardados!", function() {
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
				// $.ajax({
			 //        url: "data/contratos_selectivos/app.php",
			 //        data: form +"&btn_guardar=" + submit,
			 //        type: "POST",
			 //        success: function (data) {
			 //        	var val = data;
			 //        	if(data == '1') {
			 //        		$.gritter.add({
				// 				title: 'Mensaje',
				// 				text: 'Contrato Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
				// 				time: 1000				
				// 			});
				// 			redireccionar();
				//     	}                                                
			 //        }
			 //    });
			}
		});
		// fin

		// actualizar formulario
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// taza credito
		function getTasa(tasa, tasa_tipo, periodo) {
		    if (tasa_tipo == ANUAL) {
		    	tasa = tasa / 12; 
		    }
		    tasa = tasa / 100.0;
		    if (periodo == DIARIO) { 
		    	tasa = tasa / 30.4167; 
		    }
		    if (periodo == SEMANAL) { 
		    	tasa = tasa / 4.34524; 
		    };
		    if (periodo == QUINCENAL) { 
		    	tasa = tasa / 2; 
		    }
		    if (periodo == MENSUAL) { }
		    if (periodo == BIMESTRAL) { 
		    	tasa = tasa * 2; 
		    }
		    if (periodo == TRIMESTRAL) { 
		    	tasa = tasa * 3; 
		    }
		    if (periodo == CUATRIMESTRAL) { 
		    	tasa = tasa * 4; 
		    }
		    if (periodo == SEMESTRAL) { 
		    	tasa = tasa * 6; 
		    }
		    if (periodo == ANUAL) { 
		    	tasa = tasa * 12; 
		    };
		    return tasa;
		}
		// fin

		// valor cuota fija
		function getValorDeCuotaFija(monto, tasa, cuotas, periodo, tasa_tipo) {
		    tasa = getTasa(tasa, tasa_tipo, periodo);
		    valor = monto *( (tasa * Math.pow(1 + tasa, cuotas)) / (Math.pow(1 + tasa, cuotas) - 1) );
		    return valor.toFixed(2);
		}
		// fin

		// amortizacion
		function getAmortizacion(monto, tasa, cuotas, periodo, tasa_tipo) {
		    var valor_de_cuota = getValorDeCuotaFija(monto, tasa, cuotas, periodo, tasa_tipo);
		    var saldo_al_capital = monto;
		    var items = new Array();

		    for (i = 0; i < cuotas; i++) {
		        interes = saldo_al_capital * getTasa(tasa, tasa_tipo, periodo);
		        abono_al_capital = valor_de_cuota - interes;
		        saldo_al_capital -= abono_al_capital;
		        numero = i + 1;
		        
		        interes = interes.toFixed(2);
		        abono_al_capital = abono_al_capital.toFixed(2);
		        saldo_al_capital = saldo_al_capital.toFixed(2);

		        item = [numero, interes, abono_al_capital, valor_de_cuota, saldo_al_capital];
		        items.push(item);
		    }
		    return items;
		}
		// fin

		// moneda
		function setMoneda(num) {
		    num = num.toString().replace(/\$|\,/g, '');
		    if (isNaN(num)) num = "0";
		    sign = (num == (num = Math.abs(num)));
		    num = Math.floor(num * 100 + 0.50000000001);
		    cents = num % 100;
		    num = Math.floor(num / 100).toString();
		    if (cents < 10) cents = "0" + cents;
		    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		    return (((sign) ? '' : '-') + '$' + num + ((cents == "00") ? '' : '.' + cents));
		}
		// fin

		// sumar dias fecha 
		function sumaFecha (d, fecha) {
			var Fecha = new Date();
			var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
			var sep = sFecha.indexOf('/') != -1 ? '/' : '-'; 
			var aFecha = sFecha.split(sep);
			var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
			fecha = new Date(fecha);
			fecha.setDate(fecha.getDate()+parseInt(d));
			var anno = fecha.getFullYear();
			var mes = fecha.getMonth()+1;
			var dia = fecha.getDate();
			mes = (mes < 10) ? ("0" + mes) : mes;
			dia = (dia < 10) ? ("0" + dia) : dia;
			var fechaFinal = dia + sep + mes + sep + anno;
			return (fechaFinal);
		}
		// fin

		// calcular tabla 
		$('#ver').click(function() {
			var fecha = '';
			var respuesta = $('#form_creditos').valid();
			var fecha_credito = $('#fecha_credito').val();
			var aFecha = fecha_credito.split('-');
			var fecha2 = aFecha[2] + '-' + aFecha[1]+ '-' + aFecha[0];

			if (respuesta == true) {
				var monto = document.getElementById("input_monto").value;
            	var cuotas = document.getElementById("input_cuotas").value;
            	var tasa = document.getElementById("input_tasa").value;

            	var select_periodo = document.getElementById("select_periodo");
	            periodo = select_periodo.options[select_periodo.selectedIndex].value;
	            var select_tasa_tipo = document.getElementById("select_tasa_tipo");
	            tasa_tipo = select_tasa_tipo.options[select_tasa_tipo.selectedIndex].value;
	            var items = getAmortizacion(monto, tasa, cuotas, periodo, tasa_tipo);

            	$("#tbt_creditos tbody").empty();
            	var dias = 0;
            	var semanal = 0;
            	var quincenal = 0;
            	var mensual = 0;
            	var bimestral = 0;
            	var trimestral = 0;
            	var cuatrimestral = 0;
            	var semestral = 0;
            	var anual = 0;

            	for (i = 0; i < items.length; i++) {
	                item = items[i];
	                
	                if (periodo == 'diario') {
	                	fecha = sumaFecha(dias = dias + 1, fecha2);
	                }

	                if (periodo == 'semanal') {
	                	fecha = sumaFecha(semanal = semanal + 7, fecha2);
	                }

	                if (periodo == 'quincenal') {
	                	fecha = sumaFecha(quincenal = quincenal + 15, fecha2);
	                }

	                if (periodo == 'mensual') {
	                	fecha = sumaFecha(mensual = mensual + 30, fecha2);
	                }

	                if (periodo == 'bimestral') {
	                	fecha = sumaFecha(bimestral = bimestral + 60, fecha2);
	                }

	                if (periodo == 'trimestral') {
	                	fecha = sumaFecha(trimestral = trimestral + 90, fecha2);
	                }

	                if (periodo == 'cuatrimestral') {
	                	fecha = sumaFecha(cuatrimestral = cuatrimestral + 120, fecha2);
	                }

	                if (periodo == 'semestral') {
	                	fecha = sumaFecha(semestral = semestral + 180, fecha2);
	                }

	                if (periodo == 'anual') {
	                	fecha = sumaFecha(anual = anual + 360, fecha2);
	                }

	                var html_fila = '<tr>'
							+'<td>' +item[0]+ '</td>'
							+'<td>' +fecha+ '</td>'
							+'<td>' +item[1]+ '</td>'
							+'<td>' +item[2]+ '</td>'
							+'<td>' +item[3]+ '</td>'
							+'<td>' +item[4]+ '</td>'
							+'</tr>';

					$('#tbt_creditos tbody').append(html_fila);
	            }

	            var div1 = document.getElementById("div-valor-cuota");

	            valor = setMoneda(items[0][3]).toFixed(2);
	            div1.innerHTML = valor;
	            var msg = "";
	            if (periodo == "diario") { 
				    msg = "Usted estará pagando " + valor + ", todos los dias durante " + items.length + " dias.";
				}
			   	if (periodo == "semanal") {
			    	msg = "Usted pagará " + valor + ", semanalmente durante " + items.length + " semanas.";
			   	}
			   	if (periodo == "quincenal") {
			    	msg = "Usted pagará " + valor + ", de manera quincenal por un periodo de " + items.length + " quincenas.";
			   	}
			   	if (periodo == "mensual") {
			    	msg = "Usted pagará " + valor + ", mensualmente durante " + items.length + " meses.";
			   	}
			   	if (periodo == "bimestral") {
			    	msg = "Usted pagará " + valor + ", cada 2 meses durante un periodo de " + items.length + " bimestres.";
			   	}
			   	if (periodo == "trimestral") {
			    	msg = "Usted va a pagar " + valor + ", cada 3 meses durante " + items.length + " trimestres.";
			   	}
			   	if (periodo == "cuatrimestral") {
			    	msg = "Usted pagará " + valor + ", cada cuatrimestre (4 meses) por un periodo de " + items.length + " cuatrimestres.";
			   	}
			   	if (periodo == "semestral") {
			    	msg = "Usted pagará " + valor + ", cada 6 meses durante " + items.length + " semestres";
			   	}
			   	if (periodo == "anual") {
			    	msg = "Usted pagará " + valor + ", anualmente por un periodo de " + items.length + " años";
			   	}
			  	var div2 = document.getElementById("div-comentario");
			  	div2.innerHTML = msg;
			}
		});
		// fin

		// abrir en una nueva ventana reporte permisos
		$scope.methodopdf = function(id) { 
			var myWindow = window.open('data/reportes/credito.php?id='+id,'popup','width=900,height=650');
		} 
		// fin
	});
	// fin
	
	/*jqgrid table 2 buscador*/    
	jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
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
		    url: 'data/creditos/xml_creditos.php',         
	        autoencode: false,
			height: 250,
	        colNames: ['ID','IDENTIFICACIÓN','EMPLEADO','FECHA CRÉDITO','TAZA','PERIODO PAGO','MONTO','ACCIÓN'],
	        colModel:[ 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'identificacion',index:'identificacion', frozen:true, align:'left', search:false, hidden: false},
	            {name:'nombres_completos',index:'nombres_completos', frozen:true, align:'left', search:false, hidden: false},
	            {name:'fecha_credito',index:'fecha_credito',frozen : true,align:'left', search:true, width: '110px'},
	            {name:'tasa_interes',index:'tasa_interes',frozen : true, hidden: false, align:'left', search:true,width: '60px'},
	            {name:'periodo_pago',index:'periodo_pago',frozen : true, align:'left', search:true,width: '110px'},
	            {name:'monto_credito',index:'monto_credito',frozen : true, align:'left', search:true,width: '80px'},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '100px'},
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id',
	        sortorder: 'asc',
	        altRows: true,
	        multiselect: false,
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
					var id_credito = ids[i];
					word = "<a onclick=\"angular.element(this).scope().methodopdf('"+id_credito+"')\" title='Visualizar Crédito' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'>  PDF</i></a>"; 
					// anular = "<a onclick=\"angular.element(this).scope().methodsanular('"+id_credito+"')\" title='Anular Factura' ><i class='fa fa fa-times red2' style='cursor:pointer; cursor: hand'> ANULAR</i></a>"; 
					
					jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:word});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);
            	$("#table").jqGrid("clearGridData", true);	

				$('#myModal').modal('hide'); 
		        $('#btn_0').attr('disabled', true);           
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
	    {   //navbar options
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
	// fin
});