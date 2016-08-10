$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Settings</h2><p>Your account settings</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><form method="post" onsubmit="return wsPageForm_112346_01();"><ul class="fieldlist"><li><label for="u_Password">Old Password</label><input id="u_Password" type="password" class="k-textbox" style="width: 50%;" required /></li><li><label for="u_Password_New">New Password</label><input id="u_Password_New" type="password" class="k-textbox" style="width: 50%;" required /></li><li><button type="submit" class="k-button k-primary">Update</button></li></ul></form><style>.fieldlist {margin: 10px 0; padding: 0;} .fieldlist li {list-style: none;} .fieldlist label {display: block; padding-bottom: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444;}</style></div></div></div>');	
	
	function wsPageForm_112346_01(){
		if($("#u_Password").val() != window.authUser[0].Password){
			_msg('Error: Provided information is wrong');
			return false;
		}
		if($("#u_Password").val() == $("#u_Password_New").val()){
			_msg('Error: Provided information is same as old');
			return false;
		}
		
		_wsProgress(80);
		$.getJSON('https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=settings&cl=4&sl='+window.authUser[0].sl+'&values='+btoa($("#u_Password_New").val())).done(function(result){
			if(result){
				_msg('Your setting(s) is/are updated!');
				$("#ws-explore").html('');
			}else{
				_msg('Error: Server problem, no data updated or fetched');
			}
			_wsProgress(100);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100);
		});
		
		return false;
	}
	
_url('Settings', '#Settings/all');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
