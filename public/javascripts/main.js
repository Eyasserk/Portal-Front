function readNotification(id){
	$("#notif-"+id).css('background-color','#fff');
	//Update unread number
	var unread = Number($("#num-notif-unread").html());
	if(unread && unread > 0){
		$("#num-notif-unread").html(unread-1);
	}
}