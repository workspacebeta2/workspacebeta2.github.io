$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Create new Invoice</h2><p>All invoices appear here. Use multiple filter to get detailed and fine results.</p><p>1. Select user for whom the invoice will be. 2. Select project(s). 3. Click Finish button.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><div id="ws-ui-113762-1" class="bottom-20"></div><div id="ws-ui-113762-2" class="bottom-20"></div><div class="bottom-20"><button type="button" class="k-button k-primary hidden" id="ws-ui-113762-3">Finish</button></div></div></div></div>');

	
	$("#ws-ui-113762-1").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=grid&typeonly=User&rl="+window.authUser[0].Role
				}
			},
			/*schema: { model: { id: "sl", fields: {
			UserName: { type: "string" }, 
			ID: { type: "string" }, 
			Status: { type: "string" }, 
			Description: { type: "string" }, 
			DateTime: { type: "date" }, 
			UOW: { type: "number" }
			}}},*/
			aggregate: [{ field: "ID", aggregate: "count" }],
			scrollable: {
				virtual: true
			}
		},
		change: ws_ui_113762_1_select,
		filterable: true, refresh: true, sortable: true, height: 450, selectable: "single", 
		columns: [
			{field:"ID", title: "ID", width: 150, aggregates: ["count"], footerTemplate: "Count: #=count#"},
			{field:"Name", title: "Name", width: 310},
			{field:"Email", title: "Email", width: 310},
			{field:"Role", title: "Role", width: 100},
			{field:"CURR", title: "CURR", width: 100}
		] 
	});
	
	function ws_ui_113762_1_select(){
		var dataItem_x = this.dataItem(this.select());
		if(dataItem_x){
			$("#ws-ui-113762-2").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							url: "https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=invoice&rl="+window.authUser[0].Role+"&usersl="+dataItem_x.sl
						}
					},
					schema: { model: { id: "sl", fields: {
					ID: { type: "string" }, 
					Tag: { type: "string" }, 
					Title: { type: "string" }, 
					Category: { type: "string" }, 
					UOW: { type: "number" }, 
					Price: { type: "number" }, 
					CURR: { type: "string" }
					}}},
					aggregate: [{ field: "UOW", aggregate: "sum" },{ field: "ID", aggregate: "count" }, { field: "Price", aggregate: "sum" }],
					scrollable: {
						virtual: true
					}
				},
				change: ws_ui_113762_2_select,
				filterable: true, refresh: true, sortable: true, height: 450, selectable: "multiple", 
				columns: [
					{field:"ID", title: "ID", width: 130, aggregates: ["count"], footerTemplate: "Count: #=count#"},
					{field:"Tag", title: "Your ID", width: 150},
					{field:"Title", title: "Title", width: 310},
					{field:"Type", title: "Ref. Style", width: 210},
					{field:"Category", title: "Category", width: 210},		
					{field:"UOW", title: "Word", width: 180, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
					{field:"Price", title: "Price", width: 180, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
					{field:"CURR", title: "Currency", width: 80}
				] 
			});
			
			window.currentDataItem_tempData = [dataItem_x.sl, dataItem_x.Name, dataItem_x.CURR];
		}else{
			$("#ws-ui-113762-2").html('');
			$("#ws-ui-113762-2").removeAttr('class');
			$("#ws-ui-113762-2").removeAttr('data-role');
			$("#ws-ui-113762-2").removeAttr('style');
			$("#ws-ui-113762-3").addClass('hidden');
			delete window.currentDataItem_tempData;
		}
	}
	
	function ws_ui_113762_2_select(){
		var dataItem_s = this.select();		
		
		if(dataItem_s.length > 0){
			$("#ws-ui-113762-3").removeClass('hidden');
		}else{
			$("#ws-ui-113762-3").addClass('hidden');
		}
	}
	
	$("#ws-ui-113762-3").click(function(){
		_wsProgress(40);
		var grid = $("#ws-ui-113762-2").data("kendoGrid");
		var dataItems = grid.select();
		var tempProjectSl = '';
		var tempSum = 0;
		var tempProjectItems = '';
		for(var i = 0; i < dataItems.length; i++){
			tempProjectSl += '_' + grid.dataItem(dataItems[i]).sl;
			tempSum += eval(grid.dataItem(dataItems[i]).Price);
			tempProjectItems += '_||_'+grid.dataItem(dataItems[i]).ID+' - '+grid.dataItem(dataItems[i]).Tag+'_|_'+grid.dataItem(dataItems[i]).Title+'_|_'+grid.dataItem(dataItems[i]).Price+'_|_'+window.currentDataItem_tempData[2]+'_|_'+grid.dataItem(dataItems[i]).Price+'_|_'+window.currentDataItem_tempData[2];
		}
		
		var invoiceData = '["'+getNewID()+'", "'+nowTime()+'", "'+window.currentDataItem_tempData[0]+'", "'+window.currentDataItem_tempData[1]+'", "'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "'+tempProjectSl+'", "'+tempSum+'", "'+window.currentDataItem_tempData[2]+'", "0", "0", "'+encodeURIComponent(tempProjectItems)+'"]';

		_wsProgress(80);
		$.getJSON('https://script.google.com/macros/s/AKfycbztdK6M0qjF9-HPCPrbTMvyTyUoKowkXXS1bu9mPVWDBscBSw1T/exec?type=create&values='+invoiceData).done(function(result){
			_wsProgress(100);
			if(result){
				_msg('Success: Your have submitted new Invoice');
				_navMenuList('invoices');
			}else{
				_msg('Sorry! Unable to process your request');
			}
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100);
		});
	});
	
_url('Create Invoice', '#Invoices/new');
	
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
	return "INV"+dy[17]+dy[18]+dy[20]+dy[21]+randomString()+randomString()+rand(1,9);
}

function nowTime(){
	var mn = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
	var dy = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString();
	return dy[12]+dy[13]+dy[14]+dy[15]+'-'+mn[dy[8]+dy[9]+dy[10]]+'-'+dy[5]+dy[6]+', '+dy[17]+dy[18]+dy[19]+dy[20]+dy[21];
}