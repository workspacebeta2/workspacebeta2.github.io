$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Presence</h2><p>Presence of people in office. It will reflect on attandance.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><input id="ws-ui-113762" placeholder="Select Month" /><p>&nbsp;</p><div id="ws-ui-113762-1" class="bottom-20"></div></div></div></div>');

//var userPayslipAccess = "&usersl="+window.authUser[0].sl;
//if(typeof window.authUser[0]["navigation"][3] != 'undefined') if(window.authUser[0]["navigation"][3] != '') userPayslipAccess = "";
//if(window.authUser[0].Role == 'Power') userPayslipAccess = "";

	$("#ws-ui-113762").kendoDatePicker({
		start: "year",
		depth: "year",
		format: "MM/yyyy",
		change: function(e){
			window.wsd = this.value();
			udate = this.value();
			udate = udate.getFullYear()+"-"+_ws_get_by_zero(udate.getMonth()+1);

			$("#ws-ui-113762-1").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							url: "https://script.google.com/macros/s/AKfycbx9rM8xiaI3Z0uTm1wm57GSVhpdmJKA_U8Odr_v4UkGmdF6lCM/exec?type=month&rl="+window.authUser[0].Role+"&month="+udate
						}
					},
					schema: { model: { id: "sl", fields: {
					UserName: { type: "string" }, 
					Role: { type: "string" }, 
					Location: { type: "string" }, 
					DateTime: { type: "datetime" },
					Type: { type: "string" },
					Comment: { type: "string" }
					}}},
					aggregate: [{ field: "UserName", aggregate: "count" }],
					scrollable: {
						virtual: true
					},
					sort: { field: "DateTime", dir: "desc" }
				},
				filterable: true, refresh: true, sortable: true, height: 450, 
				columns: [
					{field:"UserName", title: "Name", width: 210, aggregates: ["count"], footerTemplate: "Count: #=count#"},
					{field:"Role", title: "Role", width: 180},
					{field:"Location", title: "Location", width: 180},
					{field:"DateTime", title: "Date Time", width: 210, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #'},
					{field:"Type", title: "Type", width: 180},
					{field:"Comment", title: "Comment", width: 250}
				] 
			});
	
		}
	});
	
_url('Presence', '#Presence/all');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
