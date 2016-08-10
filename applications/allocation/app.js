$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>View Allocation</h2><p>View your project allocation and unallocated details from here.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"><div class="col-md-12 bottom-20"><input id="ws-ui-113762" placeholder="Select Date" /><p>&nbsp;</p><div id="ws-ui-113762-1" class="bottom-20"></div><div id="ws-ui-113762-2" class="bottom-20"></div></div></div></div></div>');

	$("#ws-ui-113762").kendoDatePicker({
		start: "date",
		depth: "year",
		format: "dd/MM/yyyy",
		change: function(e){
			udate = this.value();
			udate = _ws_get_by_zero(udate.getDate())+"/"+_ws_get_by_zero(udate.getMonth()+1)+"/"+udate.getFullYear();
			
			$("#ws-ui-113762-1").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							url: "https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=allocation-report&rl="+window.authUser[0].Role+"&date="+udate+"&actimode=true"
						}
					},
					schema: { model: { id: "sl", fields: {
						UserName: { type: "string" }, 
						ID: { type: "string" }, 
						Description: { type: "string" }, 
						ActivityDateTime: { type: "datetime" }, 
						ActivityUserName: { type: "string" }, 
						DateTime: { type: "datetime" }, 
						UOW: { type: "number" }
					}}},
					aggregate: [{ field: "ID", aggregate: "count" }, { field: "UOW", aggregate: "sum" }],
					scrollable: {
						virtual: true
					}
				}, 
				filterable: true, refresh: true, sortable: true, height: 450, selectable: "single", 
				columns: [
					{ field: "UserName", title: "Name", width: 200 },
					{ field: "ID", title: "Project", width: 150, aggregates: ["count"], footerTemplate: "Count: #=count#"},
					{ field: "Tag", title: "Your ID", width: 200 },
					{ field: "Description", title: "Category", width: 150 },
					{ field: "ActivityDateTime", title: "Allocated on", width: 210, template: '#= kendo.toString(ActivityDateTime, "dd/MM/yyyy HH:mm") #'},
					{ field: "ActivityUserName", title: "Allocated by", width: 200 },					
					{ field: "DateTime", title: "Deadline", width: 210, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },/*template: '#: kendo.format("{0:d}", DateTime)#' }*/
					{ field: "UOW", title: "Words", width: 180, aggregates: ["sum"], footerTemplate: "Allocated: #=sum#" }
				] 
			});
			
			$("#ws-ui-113762-2").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							url: "https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=skill-report&rl="+window.authUser[0].Role+"&date="+udate+"&actimode=true"
						}
					},
					schema:{
						model: {
                        fields: {
                            UserName: { type: "string" },
                            Description: { type: "string" },
                            UOW: { type: "number" }
							}
                        }
                    },
					aggregate: [{ field: "UserName", aggregate: "count" }, { field: "UOW", aggregate: "sum" }]
				}, 
				filterable: true, sortable: true, height: 450, selectable: "single", 
				columns: [
					{ field: "UserName", title: "Name", aggregates: ["count"], footerTemplate: "Total: #=count#" },
					{ field: "Category", title: "Category"},
					{ field: "UOW", title: "Words", aggregates: ["sum"], footerTemplate: "Capacity: #=sum#" }
				] 
			});
			
		}
	});

	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
