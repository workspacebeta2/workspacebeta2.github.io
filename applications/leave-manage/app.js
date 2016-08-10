$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Manage Leaves</h2><p>Manage leaves by taking actions.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112346" class="bottom-20"></div><div class="bottom-20"><button type="button" class="k-button k-primary" id="ws-ui-btn1">Approve</button> <button type="button" class="k-button" id="ws-ui-btn2">Cancel</button></div></div></div>');

	$("#ws-ui-112346").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbwevVQK9e2_gohXFa0INScAevbZ_wVc-wzaYVERPfWUe5Xd-pMU/exec?type=grid&rl="+window.authUser[0].Role+"&ol=Leave"
				}
			},
			schema: { model: { id: "sl", fields: {
				UserName: { type: "string" }, 
				DateTime: { type: "date" }, 
				For: { type: "date" }, 
				Issue: { type: "string" },
				Location: { type: "string" },
				Status: { type: "string" },
				ActivityUserName: { type: "string" },
				ActivityDateTime: { type: "date" }
			}}},
			aggregate: [{ field: "Status", aggregate: "count" }]
		}, 
		filterable: true, sortable: true, height: 450, selectable: "single",
		columns: [
			{ field: "UserName", title: "Name", width: 210 },
			{ field: "DateTime", title: "Date Time", width: 210, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
			{ field: "For", title: "For", width: 210, template: '#= kendo.toString(For, "dd/MM/yyyy HH:mm") #' },
			{ field: "Issue", title: "Issue", width: 210 },	
			{ field: "Location", title: "Location", width: 130 },
			{ field: "Status", title: "Status", width: 130, aggregates: ["count"], footerTemplate: "Count: #=count#" },
			{ field: "ActivityUserName", title: "Action by", width: 210, },
			{ field: "ActivityDateTime", title: "Action on", width: 210, template: '#= kendo.toString(ActivityDateTime, "dd/MM/yyyy HH:mm") #' }
		] 
	});
	
	$("#ws-ui-btn1").click(function(){
		var grid = $("#ws-ui-112346").data("kendoGrid");
		var dataItem_x = grid.dataItem(grid.select());
		if(dataItem_x){
			if(dataItem_x.Status == 'Request') userAction(dataItem_x.sl, 'Approve'); else _msg("Sorry: Action is already taken");
		}
	});
	
	$("#ws-ui-btn2").click(function(){
		var grid = $("#ws-ui-112346").data("kendoGrid");
		var dataItem_x = grid.dataItem(grid.select());
		if(dataItem_x){
			if(dataItem_x.Status == 'Request') userAction(dataItem_x.sl, 'Cancel'); else _msg("Sorry: Action is already taken");
		}
	});
	
function userAction(sl, status){
	_wsProgress(80);
	$("input.wsUIChkbox113761").addClass("hidden");
	$.getJSON('https://script.google.com/macros/s/AKfycbwevVQK9e2_gohXFa0INScAevbZ_wVc-wzaYVERPfWUe5Xd-pMU/exec?type=update&rl='+window.authUser[0].Role+'&sl='+sl+'&values=["'+status+'", "'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "'+nowTime()+'"]').done(function(result){
		if(result){
			$("#ws-ui-112346").data('kendoGrid').dataSource.read();
		}else{
			_msg('Error: Server problem, no data updated or fetched');
		}
		_wsProgress(100);
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100);
	});
}

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