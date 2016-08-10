$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Projects Status</h2><p>Project status including all chnages are listed. Select date to view data.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"><div class="col-md-12 bottom-20"><input id="ws-ui-113762" placeholder="Select Month" /><p>&nbsp;</p><div id="ws-ui-113762-1" class="bottom-20"></div><div id="ws-ui-113762-2" class="bottom-20"></div></div></div></div></div>');

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
							url: "https://script.google.com/macros/s/AKfycbxua7Nl71oEt67wQ_foMmGlnynbIhmRtNCJjXIBEq66DZTx-4o/exec?type=grid&rl="+window.authUser[0].Role+"&month="+udate
						}
					},
					schema: { model: { id: "sl", fields: {
						DateTime: { type: "date" }, 
						ID: { type: "string" }, 
						Status: { type: "string" }, 
						Details: { type: "string" }, 
						UserName: { type: "string" }
					}}},
					aggregate: [{ field: "ID", aggregate: "count" }],
					scrollable: {
						virtual: true
					}
				}, 
				filterable: true, refresh: true, sortable: true, height: 450, selectable: "single", 
				columns: [
					{ field: "DateTime", title: "Date Time", width: 250, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
					{ field: "ID", title: "ID", width: 150, aggregates: ["count"], footerTemplate: "Count: #=count#" },
					{ field: "Status", title: "Status", width: 100 },
					{ field: "Details", title: "Details", width: 200 },
					{ field: "UserName", title: "Name", width: 200 }
				] 
			});
			
		}
	});

	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
