window.currentDataItem2 = getNewID();

$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Issue a Leave</h2><p>Go through the options and submit.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"><form method="post" onsubmit="return wsPageForm_112346_01();"><ul class="fieldlist"><li><label for="u_For">Issue for</label><input id="u_For" style="width: 50%;" required /></li><li><label for="u_Description">Description</label><textarea id="u_Description" class="k-textbox" style="width: 100%;" required ></textarea></li><li><button type="submit" class="k-button k-primary">Submit</button></li></ul></form><style>.fieldlist {margin: 10px 0; padding: 0;} .fieldlist li {list-style: none;} .fieldlist label {display: block; padding-bottom: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444;}</style></div><div id="ws-ui-112346" class="bottom-20"></div></div></div>');

function wsPageForm_112346_01(){
	_wsProgress(80);
	$.getJSON('https://script.google.com/macros/s/AKfycbwevVQK9e2_gohXFa0INScAevbZ_wVc-wzaYVERPfWUe5Xd-pMU/exec?type=create&ol=Leave&values=["'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "'+nowTime()+'", "'+$("#u_For").val()+'", "Leave", "'+escape($("#u_Description").val())+'", "'+window.authUser[0].Location+'", "Request", "", "", ""]').done(function(result){
		_wsProgress(100);
		if(result){
			_msg('Success: Your have submitted new Leave Issue'); $("#ws-ui-112346").data('kendoGrid').dataSource.read();
		}else{
			_msg('Sorry! Unable to process your request.');
		}
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100);
	});
	
	return false;
}
	
	$("#u_For").kendoDateTimePicker({
		start: "date",
		depth: "year",
		format: "yyyy-MM-dd, HH:mm"
	});
	
	$("#ws-ui-112346").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbwevVQK9e2_gohXFa0INScAevbZ_wVc-wzaYVERPfWUe5Xd-pMU/exec?type=grid&rl="+window.authUser[0].Role+"&ol=Leave&usersl="+window.authUser[0].sl
				}
			},
			schema: { model: { id: "sl", fields: {
				UserName: { type: "string" }, 
				DateTime: { type: "date" }, 
				For: { type: "date" }, 
				Issue: { type: "string" },
				Location: { type: "string" },
				Status: { type: "string" }
				
			}}},
			aggregate: [{ field: "Status", aggregate: "count" }]
		}, 
		filterable: true, sortable: true, height: 250,  
		columns: [
			{ field: "UserName", title: "Name", width: 180 },
			{ field: "DateTime", title: "Date Time", width: 180, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
			{ field: "For", title: "For", width: 180, template: '#= kendo.toString(For, "dd/MM/yyyy HH:mm") #' },
			{ field: "Issue", title: "Issue", width: 180 },
			{ field: "Location", title: "Location", width: 130 },
			{ field: "Status", title: "Status", width: 130, aggregates: ["count"], footerTemplate: "Count: #=count#" }
		] 
	});

function rand(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomString() {
	$randchar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	return $randchar[rand(0,25)];
}

function getNewID(){
	var dy = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString();
	return "NLI"+dy[17]+dy[18]+dy[20]+dy[21]+randomString()+randomString()+rand(1,9);
}

function nowTime(){
	var mn = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
	var dy = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString();
	return dy[12]+dy[13]+dy[14]+dy[15]+'-'+mn[dy[8]+dy[9]+dy[10]]+'-'+dy[5]+dy[6]+', '+dy[17]+dy[18]+dy[19]+dy[20]+dy[21];
}