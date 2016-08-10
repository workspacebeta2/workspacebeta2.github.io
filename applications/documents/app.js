$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Documents</h2><p>Your documents will appear here.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><div id="ws-ui-113762-1" class="bottom-20"></div></div></div></div>');

var userPayslipAccess = "&usersl="+window.authUser[0].sl;
//if(typeof window.authUser[0]["navigation"][3] != 'undefined') if(window.authUser[0]["navigation"][3] != '') userPayslipAccess = "";
if(window.authUser[0].Role == 'Power') userPayslipAccess = "";

	$("#ws-ui-113762-1").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbz2Dxul5MoQaOYlZMLh79GzP-lCal62sw7c7D6XphJanyQ3oaI/exec?type=grid&rl="+window.authUser[0].Role+userPayslipAccess
				}
			},
			schema: { model: { id: "sl", fields: {
			Type: { type: "string" }, 
			UserName: { type: "string" }, 
			DocDate: { type: "date" }
			}}},
			aggregate: [{ field: "UserName", aggregate: "count" }],
			scrollable: {
				virtual: true
			},
			sort: { field: "DocDate", dir: "desc" }
		},
		filterable: true, refresh: true, sortable: true, height: 450, 
		columns: [
			{field:"Type", title: "Document", width: 180},
			{field:"UserName", title: "Name", width: 180, aggregates: ["count"], footerTemplate: "Count : #=count#"},
			{command: {text: "View", click: ws_ui_113762_btn1}, title: " ", width: "100px"},
			{field:"DocDate", title: "Date", width: 210, template: '#= kendo.toString(DocDate, "dd/MM/yyyy") #'}
		] 
	});
	
	function ws_ui_113762_btn1(e){
		e.preventDefault();	
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		
		var currentDataDoc = [];
		currentDataDoc.push(dataItem.UserID);
		currentDataDoc.push(dataItem.DocDate);
		currentDataDoc.push(dataItem.Refno);
		currentDataDoc.push(dataItem.UserName);
		currentDataDoc.push(dataItem.UserAddress);
		currentDataDoc.push(dataItem.JD);
		currentDataDoc.push(dataItem.Grade);
		currentDataDoc.push(dataItem.DOJ);
		currentDataDoc.push(dataItem.Amount);
		currentDataDoc.push(dataItem.CURR);
		currentDataDoc.push(dataItem.Reporting);
		currentDataDoc.push(dataItem.Resigned);
		currentDataDoc.push(dataItem.DOR);
		currentDataDoc.push(dataItem.PJD);
		currentDataDoc.push(dataItem.PA);
		currentDataDoc.push(dataItem.DatePromo);
		currentDataDoc.push(dataItem.AmountIncrement);
		window.sessionStorage.setItem("currentDataDoc",JSON.stringify(currentDataDoc));
		window.location = "applications/documents/"+dataItem.URL+"/";
	}
	
_url('Documents', '#documents/all');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
