angular.module('scotchApp').controller('calendarioController', function ($scope, $route, $interval, $localStorage, $anchorScroll, $location, $timeout) {

	jQuery(function($) {
		$('#external-events div.external-event').each(function() {
			var eventObject = {
				title: $.trim($(this).text())
			};

			$(this).data('eventObject', eventObject);

			$(this).draggable({
				zIndex: 999,
				revert: true,      
				revertDuration: 0 
			});
		});

		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		// funcion sesion
	    function evento() {
	        $.ajax({
	            type: "POST",
	            url: "data/calendario/app.php",
	            data: {llenar_evento:'llenar_evento'},
	            dataType: 'json',
	            async: false,
	            success: function(data) {
	            	for (var i = 0; i < data.length; i++) {
	            		var aFecha = data[i].fecha_entrevista.split('-');

	            		var calendar = $('#calendar').fullCalendar({
							lang: 'es',

							buttonHtml: {
								prev: '<i class="ace-icon fa fa-chevron-left"></i>',
								next: '<i class="ace-icon fa fa-chevron-right"></i>'
							},
						
							header: {
								left: 'prev,next today',
								center: 'title',
								right: 'month,agendaWeek,agendaDay'
							},
							events: [
								{
									title: 'All Day Event',
									start: '2017-01-01'
								},
								{
									title: 'Long Event',
									start: '2014-01-07',
									end: '2017-01-10'
								},
								{
									id: 999,
									title: 'Repeating Event',
									start: '2017-01-09T16:00:00'
								},
								{
									id: 999,
									title: 'Repeating Event',
									start: '2017-01-16T16:00:00'
								},
								{
									title: 'Meeting',
									start: '2014-01-12T10:30:00',
									end: '2017-01-12T12:30:00'
								},
								{
									title: 'Lunch',
									start: '2017-01-12T12:00:00'
								},
								{
									title: 'Birthday Party',
									start: '2017-01-13T07:00:00'
								},
								{
									title: 'Click for Google',
									url: 'http://google.com/',
									start: '2017-01-28'
								}
							]
							// events: [
							// 	{
							// 		title: data[i].nombre_invitado,
							// 		start: new Date(aFecha[0], aFecha[1]-1, aFecha[2]),
							// 		className: 'label-info'
							// 	},
							// ]
						});
	            	}	
	            }
	        });
	    }
	    // fin

	    evento();

		// var calendar = $('#calendar').fullCalendar({
		// 	lang: 'es',

		// 	buttonHtml: {
		// 		prev: '<i class="ace-icon fa fa-chevron-left"></i>',
		// 		next: '<i class="ace-icon fa fa-chevron-right"></i>'
		// 	},
		
		// 	header: {
		// 		left: 'prev,next today',
		// 		center: 'title',
		// 		right: 'month,agendaWeek,agendaDay'
		// 	},
		// 	events: [
		// 		{
		// 			title: 'Algún evento',
		// 			start: new Date(y, m, d),
		// 			allDay: false,
		// 			className: 'label-info'
		// 		}
		// 	 //  {
		// 		// title: 'Evento de todo el día',
		// 		// start: new Date(y, m, 1),
		// 		// className: 'label-important'
		// 	 //  },
		// 	 //  {
		// 		// title: 'Evento largo',
		// 		// start: moment().subtract(5, 'days').format('YYYY-MM-DD'),
		// 		// end: moment().subtract(1, 'days').format('YYYY-MM-DD'),
		// 		// className: 'label-success'
		// 	 //  },
		// 	 //  {
		// 		// title: 'Algún evento',
		// 		// start: new Date(y, m, d-3, 16, 0),
		// 		// allDay: false,
		// 		// className: 'label-info'
		// 	 //  }
		// 	]
		// 	,
		// 	editable: true,
		// 	droppable: true, 
		// 	drop: function(date, allDay) { 
			
		// 		var originalEventObject = $(this).data('eventObject');
		// 		var $extraEventClass = $(this).attr('data-class');
				
		// 		var copiedEventObject = $.extend({}, originalEventObject);
				
		// 		copiedEventObject.start = date;
		// 		copiedEventObject.allDay = allDay;
		// 		if($extraEventClass) copiedEventObject['className'] = [$extraEventClass];
				
		// 		$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
				
		// 		if ($('#drop-remove').is(':checked')) {
		// 			$(this).remove();
		// 		}	
		// 	},
		// 	selectable: true,
		// 	selectHelper: true,
		// 	select: function(start, end, allDay) {
		// 		bootbox.prompt("Título del nuevo evento:", function(title) {
		// 			if (title !== null) {
		// 				calendar.fullCalendar('renderEvent',
		// 					{
		// 						title: title,
		// 						start: start,
		// 						end: end,
		// 						allDay: allDay,
		// 						className: 'label-info'
		// 					},
		// 					true 
		// 				);
		// 			}
		// 		});
				

		// 		calendar.fullCalendar('unselect');
		// 	},
		// 	eventClick: function(calEvent, jsEvent, view) {
		// 		//display a modal
		// 		var modal = 
		// 		'<div class="modal fade">\
		// 		  <div class="modal-dialog">\
		// 		   <div class="modal-content">\
		// 			 <div class="modal-body">\
		// 			   <button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
		// 			   <form class="no-margin">\
		// 				  <label>Change event name &nbsp;</label>\
		// 				  <input class="middle" autocomplete="off" type="text" value="' + calEvent.title + '" />\
		// 				 <button type="submit" class="btn btn-sm btn-success"><i class="ace-icon fa fa-check"></i> Guardar</button>\
		// 			   </form>\
		// 			 </div>\
		// 			 <div class="modal-footer">\
		// 				<button type="button" class="btn btn-sm btn-danger" data-action="delete"><i class="ace-icon fa fa-trash-o"></i> Eliminar Evento</button>\
		// 				<button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cancelar</button>\
		// 			 </div>\
		// 		  </div>\
		// 		 </div>\
		// 		</div>';
	
		// 		var modal = $(modal).appendTo('body');
		// 		modal.find('form').on('submit', function(ev){
		// 			ev.preventDefault();

		// 			calEvent.title = $(this).find("input[type=text]").val();
		// 			calendar.fullCalendar('updateEvent', calEvent);
		// 			modal.modal("hide");
		// 		});
		// 		modal.find('button[data-action=delete]').on('click', function() {
		// 			calendar.fullCalendar('removeEvents' , function(ev){
		// 				return (ev._id == calEvent._id);
		// 			})
		// 			modal.modal("hide");
		// 		});
				
		// 		modal.modal('show').on('hidden', function(){
		// 			modal.remove();
		// 		});
		// 	}
		// });
	})
});
