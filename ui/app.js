function checkAuth(){
	if(!_lget('authUser')){
		window.location='clear/../';
	}else{
		//$(document).on("keydown", _preventDefaults);
		//window.onbeforeunload = function() {return "WARNING: You are about to lose your unsaved data, kindly save and close other tabs before closing this //session.";}		
		_url('', '#me');
		window.authUser = _toJson(_lget("authUser"));
		
		_wsProgress(80);
		$.getJSON('https://script.google.com/macros/s/AKfycbzcvpbdyUVSKYigWQ-bXXAAjJMCvLmDWBGdn9omQwsyaFffqyxL/exec?type=navigation&rl='+window.authUser[0].Role).done(function(result){
			if(result){
				window.authUser[0]["navigation"] = result;				
				_myProfile();
			}else{
				_msg('Error: Connection problem');
			}
			_wsProgress(100);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100);
		});
	}
}
function _myProfile(){
	$("#ws-nav-menu").removeClass("hidden");
	_navMenuActive("profile");
	
	$("#ws-nav-menu div").click(function(){
		_navMenuActive($(this).attr("ws-data"));
	});
	
	return true;
}
function _fromServer(url){
	
}
function _navMenuActive(wd){
	$("#ws-nav-menu div").removeClass("app-icon-active theme-default");
	$("#ws-nav-menu div[ws-data='"+wd+"']").addClass("app-icon-active theme-default");
	
	if(wd == "profile"){
		$("#ws-nav-menu-list").html('<li href="#" class="list-group-item myProfile"><img src="profile/'+window.authUser[0].sl+'.jpg" /><h4 class="list-group-item-heading">'+window.authUser[0].Name+'</h4><h4 class="list-group-item-text">'+window.authUser[0].ID+' ('+window.authUser[0].Role+')</h4><p>'+window.authUser[0].JD+'</p><p>'+window.authUser[0].CURR+'</p></li><li class="list-group-item" ws-data="profile-mine">Profile</li><li class="list-group-item" ws-data="settings">Settings</li><li class="list-group-item" ws-data="signout">Sign Out</li>');
		$("#ws-nav-menu-list li").click(function(){_navMenuList($(this).attr("ws-data"));});
	}
	if(wd == "applications"){
		var applicationsItems = window.authUser[0]["navigation"][0];
		var htmlData = '';
		for(var i = 0; i < applicationsItems.length; i++){
			var dataClust = applicationsItems[i].split(",");
			var htmlData = htmlData + '<li class="list-group-item" ws-data="'+dataClust[0]+'">'+dataClust[1]+'</li>';
		}
		
		$("#ws-nav-menu-list").html(htmlData);
		$("#ws-nav-menu-list li").click(function(){_navMenuList($(this).attr("ws-data"));});
	}
	if(wd == "notification"){
		$("#ws-nav-menu-list").html('<li class="list-group-item"><center>No unread left :)</center></li>');
	}
	if(wd == "settings"){
		$("#ws-nav-menu-list").html('<center><small><p>Offline and Settings are not supported on your system.</p></small></center>');
	}
}
function _navMenuList(p){
	if(p){ _wsProgress(60); $.getScript("applications/"+p+"/app.js").done(function(script, textStatus){_wsProgress(100);}); }
}