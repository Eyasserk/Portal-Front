function readNotification(id){

	$.ajax({
		url: '/my/notifications/'+id,
		type: 'PUT',
		data: "",
		success: function(data) {
			$("#notif-"+id).css('background-color','#fff');
			//Update unread number
			var unread = Number($("#num-notif-unread").html());
			if(unread && unread > 0){
				unread = unread - 1;
				$("#num-notif-unread").html(unread);
				if(unread === 0){
					$("#notif-menu").css('color','');
				}
			}   
		}
	});
}