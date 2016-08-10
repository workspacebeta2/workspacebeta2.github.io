$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Invoices</h2><p>View all invoices, piad or non paid with due amount.</p><p>Note: Latest invoices will appear first.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><div id="ws-ui-113762-1" class="bottom-20"></div></div></div></div>');

var projectsInvoiceAccess = "&usersl="+window.authUser[0].sl;
if(typeof window.authUser[0]["navigation"][3] != 'undefined') if(window.authUser[0]["navigation"][3] != '') projectsInvoiceAccess = "";

	$("#ws-ui-113762-1").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbztdK6M0qjF9-HPCPrbTMvyTyUoKowkXXS1bu9mPVWDBscBSw1T/exec?type=grid&rl="+window.authUser[0].Role+projectsInvoiceAccess
				}
			},
			schema: { model: { id: "sl", fields: {
			ID: { type: "string" }, 
			DateTime: { type: "datetime" }, 
			UserName: { type: "string" }, 
			Amount: { type: "number" }, 
			CURR: { type: "string" },
			Paid: { type: "number" }, 
			Due: { type: "number" }
			}}},
			aggregate: [{ field: "ID", aggregate: "count" }, { field: "Amount", aggregate: "sum" }, { field: "Paid", aggregate: "sum" }, { field: "Due", aggregate: "sum" }],
			scrollable: {
				virtual: true
			},
			sort: { field: "DateTime", dir: "desc" }
		},
		filterable: true, refresh: true, sortable: true, height: 450, selectable: "single", 
		columns: [
			{field:"ID", title: "ID", width: 130, aggregates: ["count"], footerTemplate: "Count: #=count#"},
			{command: {text: "View", click: ws_ui_113762_btn1}, title: " ", width: "100px"},
			{command: {text: "Pay", click: ws_ui_113762_btn2}, title: " ", width: "95px"},
			{field:"DateTime", title: "Date", width: 210, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #'},
			{field:"UserName", title: "Client", width: 200},
			{field:"Amount", title: "Amount", width: 150, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
			{field:"CURR", title: "CURR", width: 80},
			{field:"Paid", title: "Paid", width: 150, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
			{field:"Due", title: "Due", width: 150, aggregates: ["sum"], footerTemplate: "Total: #=sum#"}
		] 
	});
	
	function ws_ui_113762_btn1(e){
		e.preventDefault();	
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		
		var InvoiceItems = '';
		var di = '';
		try{
			di = decodeURIComponent(dataItem.Items);
		}catch(e){
			di = dataItem.Items;
		}
		di = di.split('_||_');
		for(var i = 1; i < di.length; i++){
			var ds = di[i].split('_|_');
			InvoiceItems += '<tr><td class="service">'+ds[0]+'</td><td class="desc">'+ds[1]+'</td><td class="unit">'+ds[2]+' '+ds[3]+'</td><td class="qty">1</td><td class="total">'+ds[4]+' '+ds[5]+'</td></tr>';
		}		
		
		var currentDataInvoice = [];
		currentDataInvoice.push(dataItem.ID);
		currentDataInvoice.push(dataItem.UserName);
		currentDataInvoice.push(dataItem.DateTime);
		currentDataInvoice.push(dataItem.Amount);
		currentDataInvoice.push(dataItem.CURR);
		currentDataInvoice.push(dataItem.Paid);
		window.sessionStorage.setItem("currentDataInvoice",JSON.stringify(currentDataInvoice));
		window.sessionStorage.setItem("currentDataInvoiceItems",InvoiceItems);
		window.location = "applications/invoices/view/";
	}
	
	function ws_ui_113762_btn2(e){
		e.preventDefault();	
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		var InvoicePayOptions = '';
		
		if(eval(dataItem.Amount - dataItem.Paid) > 0){	
			window.currentDataItem2 = dataItem;
			$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>'+dataItem.ID+'</h2><p>Enter the amount you want to pay for this invoice. Click Next for Payment methods.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><form method="post" onsubmit="return wsPageForm_112346_01();"><ul class="fieldlist"><li><label for="u_Amount">Amount to Pay (in '+dataItem.CURR+')</label><input id="u_Amount" type="number" min="1" max="'+eval(dataItem.Amount - dataItem.Paid)+'" step="any" value="'+eval(dataItem.Amount - dataItem.Paid)+'" class="k-textbox" style="width: 50%;" required /></li><li><label for="u_BankName">Bank Name</label><input id="u_BankName" type="text" class="k-textbox" style="width: 100%;" required /></li><li><label for="u_BankTransactionID">Bank Transaction ID</label><input id="u_BankTransactionID" type="text" class="k-textbox" style="width: 100%;" required /></li><li><label for="u_BankTransactionDate">Bank Transaction Date</label><input id="u_BankTransactionDate" style="width: 50%;" required /></li><li><label for="u_BankTDSAmount">Bank TDS Amount  (in '+dataItem.CURR+')</label><input id="u_BankTDSAmount" type="number" min="0" step="any" value="0" class="k-textbox" style="width: 50%;" required /></li><li><label for="u_Note">Note</label><textarea id="u_Note" class="k-textbox" style="width: 100%;" required ></textarea></li><li><button type="submit" class="k-button k-primary">Pay with other method</button></li><li><label>OR</label></li><li><button type="button" id="ws-112346-01" class="k-button k-primary">PayPal</button></li></ul></form><style>.fieldlist {margin: 10px 0; padding: 0;} .fieldlist li {list-style: none;} .fieldlist label {display: block; padding-bottom: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444;}</style></div></div></div>');
			
			$("#u_BankTransactionDate").kendoDatePicker({
				start: "date",
				depth: "year",
				format: "dd/MM/yyyy"
			});
		}else{
			$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>'+dataItem.ID+'</h2><p>Full amount has been Paid for this Invoice.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"></div></div></div>');
		}
		
		$("#ws-112346-01").click(function(){
			_wsProgress(80);
			$.getJSON('https://script.google.com/macros/s/AKfycbwexw_f4ooy1IgljCPQX2D_yLmSulU6F64xtrgo5WMWWDAH8OUI/exec?type=create&cpam='+dataItem.Paid+'&sl='+dataItem.sl+'&values=["AUTO", "'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "'+dataItem.ID+'", "'+dataItem.CURR+'", "0", "'+$('#u_Amount').val()+'", "Pending", "Project Invoice", "PayPal"]').done(function(result){
				if(result){
					var currentDataPaypal = [];
					currentDataPaypal.push(dataItem.ID);
					currentDataPaypal.push(dataItem.CURR);
					currentDataPaypal.push(eval(dataItem.Amount - dataItem.Paid));
					window.sessionStorage.setItem("currentDataPaypal",JSON.stringify(currentDataPaypal));
					
					_navMenuList('paypal');
				}else{
					_msg('Error: Server problem, no data updated or fetched');
				}
				_wsProgress(100);
			}).fail(function(result){
				_msg('Error: Connection problem'); _wsProgress(100);
			});
		});
		
		_url(dataItem.ID, '#Invoices/'+dataItem.ID);
	}
	
	function wsPageForm_112346_01(){
		_wsProgress(80);
		$.getJSON('https://script.google.com/macros/s/AKfycbwexw_f4ooy1IgljCPQX2D_yLmSulU6F64xtrgo5WMWWDAH8OUI/exec?type=create&cpam='+window.currentDataItem2.Paid+'&sl='+window.currentDataItem2.sl+'&values=["AUTO", "'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "'+window.currentDataItem2.ID+'", "'+window.currentDataItem2.CURR+'", "0", "'+$('#u_Amount').val()+'", "Pending", "Project Invoice", "Other ('+$('#u_BankName').val()+', '+$('#u_BankTransactionID').val()+', '+$('#u_BankTransactionDate').val()+', '+$('#u_BankTDSAmount').val()+', '+$('#u_Note').val()+')"]').done(function(result){
			if(result){
				_msg('Amount has been registered as Paid. Our executive will contact you soon!');
				_navMenuList('invoices');
			}else{
				_msg('Error: Server problem, no data updated or fetched');
			}
			_wsProgress(100);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100);
		});
		
		return false;
	}
	
_url('Invoices', '#Invoices/all');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
