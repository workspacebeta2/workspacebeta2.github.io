$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Attendance</h2><p>Select month to view the attendance of <strong><span id="ws-ui-113762-0">...</span></strong>.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><input id="ws-ui-113762" placeholder="Select Month" /><p>&nbsp;</p><div id="ws-ui-113762-1" class="bottom-20"></div></div></div></div>');

if(typeof window.currentUserItem3 == 'undefined'){
	window.currentUserItem3 = window.authUser[0].sl;
	window.currentUserItem4 = window.authUser[0].Name;
}else{
	if(window.currentUserItem3 == ''){
		window.currentUserItem3 = window.authUser[0].sl;
		window.currentUserItem4 = window.authUser[0].Name;
	}
}

	$("#ws-ui-113762-0").html(window.currentUserItem4);

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
							url: "https://script.google.com/macros/s/AKfycbx9rM8xiaI3Z0uTm1wm57GSVhpdmJKA_U8Odr_v4UkGmdF6lCM/exec?type=month&rl="+window.authUser[0].Role+"&usersl="+window.currentUserItem3+"&month="+udate
						}
					},
					schema: { model: { id: "sl", fields: {
					Role: { type: "string" }, 
					Location: { type: "string" }, 
					DateTime: { type: "datetime" },
					Type: { type: "string" },
					Comment: { type: "string" }
					}}},
					aggregate: [{ field: "Role", aggregate: "count" }],
					scrollable: {
						virtual: true
					},
					sort: { field: "DateTime", dir: "desc" }
				},
				filterable: true, refresh: true, sortable: true, height: 450, 
				columns: [
					{field:"Role", title: "Role", width: 180, aggregates: ["count"], footerTemplate: "Count: #=count#"},
					{field:"Location", title: "Location", width: 180},
					{field:"DateTime", title: "Date Time", width: 210, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #'},
					{field:"Type", title: "Type", width: 180},
					{field:"Comment", title: "Comment", width: 250}
				] 
			});
	
		}
	});
	
_url('Attendance', '#Attendance');

function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
