window.currentDataItem2 = getNewID();

$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Create new Project</h2><p>Go through the options and submit.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"><form method="post" onsubmit="return wsPageForm_112346_01();"><ul class="fieldlist"><li><label for="u_Tag">Your ID</label><input id="u_Tag" type="text" class="k-textbox" style="width: 100%;" /></li><li><label for="u_Title">Title</label><input id="u_Title" type="text" class="k-textbox" style="width: 100%;" required /></li><li><label for="u_Description">Description</label><textarea id="u_Description" class="k-textbox" style="width: 100%;" required ></textarea></li><li><label for="u_Category">Category</label><input id="u_Category" style="width: 50%" required /></li><li><label for="u_Type">Referencing Style</label><input id="u_Type" style="width: 50%" required /></li><li><label for="u_UOW">Words</label><input id="u_UOW" type="number" min="100" max="200000" class="k-textbox" style="width: 50%;" required /></li><li><label for="u_Price">Price <span id="u_CURR"></span></label><input id="u_Price" type="number" readonly class="k-textbox" style="width: 50%;" value="0" /></li><li><label for="u_End">Delivery Date &amp; Time</label><input id="u_End" style="width: 50%;" required /></li><li id="u_Msg"></li><li><button id="ws-112345-01" type="submit" class="k-button k-primary hidden">Next</button></li></ul></form><style>.fieldlist {margin: 10px 0; padding: 0;} .fieldlist li {list-style: none;} .fieldlist label {display: block; padding-bottom: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444;}</style></div></div></div>');

function wsPageForm_112346_01(){
	_wsProgress(80);
	$.getJSON('https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=create&values=["'+window.currentDataItem2+'", "'+encodeURIComponent($("#u_Title").val())+'", "'+encodeURIComponent($("#u_Description").val())+'", "'+$("#u_Type").val()+'", "'+$("#u_Category").val()+'", "'+encodeURIComponent($("#u_Tag").val())+'", "'+nowTime()+'", "'+$("#u_End").val()+'", "'+$("#u_UOW").val()+'", "'+$("#u_Price").val()+'", "'+window.authUser[0].CURR+'", "AUTO", "AUTO", "Submitted", "", "*_'+window.authUser[0].sl+'_", "'+window.authUser[0].Name+'"]').done(function(result){
		_wsProgress(100);
		if(result){
			_msg('Success: Your have submitted new Project');
			window.currentDataItem7 = result[0][14];
			window.currentDataItem8 = 'projects';
			_navMenuList('projects-create-jobcard');
		}else{
			_msg('Sorry! Unable to process your request');
		}
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100);
	});
	
	return false;
}
	$("#u_CURR").html(" in "+window.authUser[0].CURR);
	
	$("#u_UOW").keyup(function(){
		var wordRate = window.authUser[0].Amount;
		var price = wordRate * $("#u_UOW").val();
		$("#u_Price").val(price);
	});

	$("#u_Category").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{"text":"NonIT","values":"NonIT"},
			{"text":"IT","values":"IT"}
			
		]
	});
	
	$("#u_Type").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{"text":"Harvard referencing by page no","value":"Harvard referencing by page no"},
			{"text":"Harvard referencing without page no","value":"Harvard referencing by page no"},
			{"text":"APA referencing","value":"APA referencing"},
			{"text":"MLA referencing","value":"MLA referencing"},
			{"text":"Footnotes (Harvard reference list)","value":"Footnotes (Harvard reference list)"},
			{"text":"Footnotes (APA reference list)","value":"Footnotes (APA reference list)"},
			{"text":"Chicago referencing","value":"Chicago referencing"},
			{"text":"Oxford referencing","value":"Oxford referencing"},
			{"text":"Vancouver referencing","value":"Vancouver referencing"},
			{"text":"OSCOLA referencing","value":"OSCOLA referencing"},
			{"text":"Others referencing","value":"Others referencing"}
		]
	});
	
	$("#u_End").kendoDateTimePicker({
		start: "date",
		depth: "year",
		format: "yyyy-MM-dd HH:mm",
		change: function(e){
			udate = this.value();
			udate1 = udate.getFullYear()+"-"+_ws_get_by_zero(udate.getMonth()+1)+"-"+_ws_get_by_zero(udate.getDate());
			
			$('#u_Msg').html('Please wait, calculating...');
			_wsProgress(80);
			$.getJSON('https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=grid-uow-sum&rl=Power&date='+udate1).done(function(result){
				_wsProgress(100);
				try{
					if(result > 200000){
						$('#u_Msg').html('Sorry! Please select next day.');
					}else{
						$('#u_Msg').html('Yes! Delivery possible on selected date');
						$('#ws-112345-01').removeClass('hidden');
					}
				}catch(e){
					$('#u_Msg').html('<p>Sorry! Unable to process your request.</p>');
				}
			}).fail(function(result){
				_msg('Error: Connection problem'); _wsProgress(100);
			});
		}
	});

_url('Create Projects', '#Projects/new');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }

function rand(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomString() {
	$randchar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	return $randchar[rand(0,25)];
}

function getNewID(){
	var dy = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString();
	return "NPP"+dy[17]+dy[18]+dy[20]+dy[21]+randomString()+randomString()+rand(1,9);
}

function nowTime(){
	var mn = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
	var dy = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString();
	return dy[12]+dy[13]+dy[14]+dy[15]+'-'+mn[dy[8]+dy[9]+dy[10]]+'-'+dy[5]+dy[6]+', '+dy[17]+dy[18]+dy[19]+dy[20]+dy[21];
}