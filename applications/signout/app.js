$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Signing Out...</h2><p>It will take few moments.</p></div>');

_wsProgress(80);
$.getJSON('https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=signout&values=["'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "'+window.authUser[0].Role+'", "'+window.authUser[0].Location+'"]').done(function(result){
	if(result){		
		window.location.hash = window.authUser[0].Email;
		delete window.authUser;
		window.sessionStorage.clear("workspace_app0_authUser");
		/*window.location.reload();*/
		window.location = 'http://goo.gl/EKMi4x';
	}else{
		_msg('Sorry! Unable to process your request.'); _wsProgress(100);
	}
}).fail(function(result){
	_msg('Error: Connection problem'); _wsProgress(100);
});
