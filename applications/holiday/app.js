$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Holiday List</h2><p>All holidays are listed bellow, holidays are considerable as per IST (Indian Standard Time, GMT+05:30)</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"></div></div></div>');

_uiGrid(
	'ws-ui-112345', 
	"https://script.google.com/macros/s/AKfycbyNOjVSBYYzap34Z1qraYjKSGpYxKZrYkD-3ss3Atr4hhjvYl8/exec?type=grid&rl="+window.authUser[0].Role, 
	"https://script.google.com/macros/s/AKfycbyNOjVSBYYzap34Z1qraYjKSGpYxKZrYkD-3ss3Atr4hhjvYl8/exec", 
	550, 20, {
		DateTime: {type: "date"}, 
		Holiday: {type: "string"}
	}, [{ field: "Holiday", aggregate: "count" }], 
	[
		{field:"DateTime", title: "Date", width: 200, template: '#= kendo.toString(DateTime, "D") #'},
		{field:"Holiday", title: "Holiday", width: 200, aggregates: ["count"], footerTemplate: "Count : #=count#"},
	]
);
	
_url('Holiday', '#holiday');
