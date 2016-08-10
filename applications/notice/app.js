$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Notice</h2><p>Please note following details, date and time are considerable as per IST (Indian Standard Time, GMT+05:30)</p></div></div><div class="row"><div class="col-md-12"><p>&nbsp;</p><div id="ws-ui-112345">Looking for data...</div></div></div>');

	_wsProgress(80);
	$.getJSON('https://script.google.com/macros/s/AKfycbyCwGkty_DBupZ2gVmDJiQ1tPo5aRpgFvJyBdYvfXskMy_iCTQ/exec?type=grid&rl='+window.authUser[0].Role).done(function(result){
		_wsProgress(100);
		if(result){
			$("#ws-ui-112345").html(result);
		}else{
			$("#ws-ui-112345").html('<p>Sorry! Nothing available for you.</p>');
		}
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100);
	});
	
_url('Notice', '#notice');
