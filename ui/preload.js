function checkAuth(){	
	if(!_lget('authUser')){
		_spinner(false, 'ui.panel.userMsg');
		document.getElementById('ui.panel.userMsg').innerHTML = 'Provide your account details';
		document.getElementById('ui.panel.userAuth').classList.remove('hidden');
		
		/*if(window.location.hash != ''){
			document.getElementById('email').value = window.location.hash.split("#")[1];
		}*/
	}else{
		_loadPage('app');
	}
}
function wsAuthUser(){
	_signinPanel(false, '');
	
	$.getJSON("https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=signin&rl=System&email="+$("#email").val()+"&password="+$("#password").val()).done(function(result){
		if(result){
			_lset('authUser', _toText(result));
			_loadPage('app');
		}else{
			_signinPanel(true, 'Try Again!');
		}
	}).fail(function(result){
		_msg('Error: Connection problem');
		_signinPanel(true, 'Try Again!');
	});
	
	return false;
}
function _signinPanel(s, t){
	if(s){_spinner(false, 'ui.panel.userMsg'); document.getElementById('ui.panel.userMsg').innerHTML = t; document.getElementById('ui.panel.userAuth').classList.remove('hidden');}
	else{_spinner(true, 'ui.panel.userMsg'); document.getElementById('ui.panel.userMsg').innerHTML = ''; document.getElementById('ui.panel.userAuth').classList.add('hidden');}
}