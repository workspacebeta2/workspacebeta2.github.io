$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Manage Accounts</h2><p>Manage your transaction. While taking action double check your information, you can not delete or change after taking action to any transaction.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112346" class="bottom-20"></div><div class="bottom-20"><button type="button" class="k-button k-primary" id="ws-ui-btn1">Approve</button> <button type="button" class="k-button" id="ws-ui-btn2">Cancel</button></div></div></div>');

	$("#ws-ui-112346").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbwexw_f4ooy1IgljCPQX2D_yLmSulU6F64xtrgo5WMWWDAH8OUI/exec?type=grid&rl="+window.authUser[0].Role
				}
			},
			schema: { model: { id: "sl", fields: {
				sl: { type: "number" }, 
				DateTime: { type: "date" }, 
				Status: { type: "string" }, 
				Item: { type: "string" }, 
				UserName: { type: "string" }, 
				Debit: { type: "number" }, 
				Credit: { type: "number" },
				CURR: { type: "string" }, 
				Transaction: { type: "string" },
				Note: { type: "string" }
			}}},
			aggregate: [{ field: "sl", aggregate: "count" }, { field: "Debit", aggregate: "sum" }, { field: "Credit", aggregate: "sum" }],
			sort: { field: "sl", dir: "desc" }
		}, 
		filterable: true, sortable: true, height: 550, selectable: "single",
		columns: [
			{field:"sl", title: "Sl No", width: 100, aggregates: ["count"], footerTemplate: "Count: #=count#"},
			{ field: "DateTime", title: "Date Time", width: 250, template: '#= kendo.toString(DateTime, "dd/MM/yyyy, HH:mm:ss") #' },
			{ field: "Status", title: "Status", width: 130 },
			{ field: "Item", title: "Item", width: 210 },
			{ field: "UserName", title: "Name", width: 210 },			
			{ field: "Debit", title: "Debit", width: 180, aggregates: ["sum"], footerTemplate: "Total: #=sum#" },
			{ field: "Credit", title: "Credit", width: 180, aggregates: ["sum"], footerTemplate: "Total: #=sum#" },
			{ field: "CURR", title: "Currency", width: 80 },			
			{ field: "Transaction", title: "Issue", width: 210 },			
			{ field: "Note", title: "Payment Note", width: 1024, }
		] 
	});
	
	$("#ws-ui-btn1").click(function(){
		var grid = $("#ws-ui-112346").data("kendoGrid");
		var dataItem_x = grid.dataItem(grid.select());
		if(dataItem_x){
			if(dataItem_x.Status == 'Pending') userAction(dataItem_x.sl, 'Approve'); else _msg("Sorry: Action is already taken");
		}
	});
	
	$("#ws-ui-btn2").click(function(){
		var grid = $("#ws-ui-112346").data("kendoGrid");
		var dataItem_x = grid.dataItem(grid.select());
		if(dataItem_x){
			if(dataItem_x.Status == 'Pending') userAction(dataItem_x.sl, 'Cancel'); else _msg("Sorry: Action is already taken");
		}
	});
	
function userAction(sl, status){
	_wsProgress(80);
	$("input.wsUIChkbox113761").addClass("hidden");
	$.getJSON('https://script.google.com/macros/s/AKfycbwexw_f4ooy1IgljCPQX2D_yLmSulU6F64xtrgo5WMWWDAH8OUI/exec?type=update&rl='+window.authUser[0].Role+'&sl='+sl+'&status='+status).done(function(result){
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