$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Analysis A</h2><p>Here you can see the revenue percentages as per project price repect to the selected month.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><input id="ws-ui-113762" placeholder="Select Month" /><p>&nbsp;</p><div id="ws-ui-113762-1" class="bottom-20"></div></div></div></div>');

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
							url: "https://script.google.com/macros/s/AKfycbyBeaAyqxk2iphU72PsWmmHein8fwd17s5a0EKPhXiYVNYpM88/exec?type=analysis-a&rl="+window.authUser[0].Role+"&month="+udate
						}
					},
					schema: { model: { id: "sl", fields: {
					ID: { type: "string" }, 
					UserName: { type: "string" }, 
					CURR: { type: "string" }, 
					TotalProjects: { type: "number" }, 
					TotalPrice: { type: "number" },
					UsersProjects: { type: "number" }, 
					UsersPrice: { type: "number" },
					UsersProjectsPer: { type: "percentages" }, 
					UsersPricePer: { type: "percentages" }
					}}},					
					scrollable: {
						virtual: true
					},
					sort: { field: "DateTime", dir: "desc" }
				},
				filterable: true, refresh: true, sortable: true, height: 450, 
				columns: [
					{field:"ID", title: "ID", width: 120},
					{field:"UserName", title: "Name", width: 210},
					{field:"CURR", title: "Currency", width: 100},
					{field:"TotalProjects", title: "Total Projects", width: 150},
					{field:"TotalPrice", title: "Total Price", width: 150, format: "{0:N2}"},
					{field:"UsersProjects", title: "Users Projects", width: 150},
					{field:"UsersPrice", title: "Users Price", width: 150, format: "{0:N2}"},
					{field:"UsersProjectsPer", title: "Users Projects Per", width: 120, format: "{0:p2}"},
					{field:"UsersPricePer", title: "Users Price Per", width: 120, format: "{0:p2}"}
				] 
			});
	
		}
	});
	
_url('Presence', '#Presence/all');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
