$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Fresh Projects</h2><p>All fresh projects available for you. Only archived items are not visable.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"></div><div id="ws-ui-112346"><div id="ws-ui-112346-1" class="bottom-20"></div><div id="ws-ui-112346-2" class="bottom-20"></div></div></div></div>');

var projectsGridAccess = "&usersl="+window.authUser[0].sl;
if(typeof window.authUser[0]["navigation"][3] != 'undefined') if(window.authUser[0]["navigation"][3] != '') projectsGridAccess = "";

if(wsCallService_112300("edit")){
_uiGrid(
	'ws-ui-112345', 
	"https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=grid&rl="+window.authUser[0].Role+projectsGridAccess+"&clients=["+window.authUser[0].Clients+"]", 
	"https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec", 
	550, 20, {
		sl: {type: "number"}, 
		ID: {type: "string"}, 
		UserName: {type: "string"}, 
		Tag: {type: "string"}, 
		Status: {type: "string"}, 
		Title: {type: "string"},  
		Type: {type: "string"}, 
		Category: {type: "string"},		
		UOW: {type: "number"}, 
		Price: {type: "number"}, 
		CURR: {type: "string"}, 
		Start: {type: "date"}, 
		End: {type: "date"}		
	}, [{ field: "ID", aggregate: "count" }, { field: "Price", aggregate: "sum" }, { field: "UOW", aggregate: "sum" }], 
	[
		{field:"sl", title: "Sl No", width: 80},
		{field:"ID", title: "ID", width: 130, aggregates: ["count"], footerTemplate: "Count: #=count#"},
		{field:"UserName", title: "Client", width: 180},
		{field:"Tag", title: "Your ID", width: 150},
		/*{command: {text: "Quick", click: wsUIButton_112301}, title: " ", width: "100px"},*/
		{command: {text: "View", click: wsUIButton_112300}, title: " ", width: "100px"},
		{title: " ", width: 104, template: '<a href="https://drive.google.com/embeddedfolderview?id=#=Jobcard#\\#grid" target="_blank" class="k-button">Jobcard</a>' },
		{command: {text: "Edit", click: wsUIButton_112302}, title: " ", width: "100px"},
		/*{command: ["edit"], title: "&nbsp;", width: "100px"},*/
		{field:"Status", title: "Status", width: 100},
		{field:"Title", title: "Title", width: 310},
		{field:"Type", title: "Ref. Style", width: 210},
		{field:"Category", title: "Category", width: 210},		
		{field:"UOW", title: "Word", width: 100, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
		{field:"Price", title: "Price", width: 110, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
		{field:"CURR", title: "Currency", width: 80},
		{field:"Start", title: "Dropped", width: 180, template: '#= kendo.toString(Start, "dd/MM/yyyy HH:mm") #'},
		{field:"End", title: "Delivery", width: 180, template: '#= kendo.toString(End, "dd/MM/yyyy HH:mm") #'}		
	]
);
}else{
_uiGrid(
	'ws-ui-112345', 
	"https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=grid&rl="+window.authUser[0].Role+projectsGridAccess+"&clients=["+window.authUser[0].Clients+"]",
	"https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec", 
	550, 20, {
		sl: {type: "number"}, 
		ID: {type: "string"}, 
		UserName: {type: "string"}, 
		Tag: {type: "string"}, 
		Status: {type: "string"}, 
		Title: {type: "string"},  
		Type: {type: "string"}, 
		Category: {type: "string"},		
		UOW: {type: "number"}, 
		Price: {type: "number"}, 
		CURR: {type: "string"}, 
		Start: {type: "date"}, 
		End: {type: "date"}		
	}, [{ field: "UOW", aggregate: "sum" }], 
	[
		{field:"sl", title: "Sl No", width: 80},
		{field:"ID", title: "ID", width: 150},
		{field:"UserName", title: "Client", width: 200},
		{field:"Tag", title: "Your ID", width: 100},
		/*{command: {text: "Quick", click: wsUIButton_112301}, title: " ", width: "100px"},*/
		{command: {text: "View", click: wsUIButton_112300}, title: " ", width: "100px"},
		{title: " ", width: 104, template: '<a href="http://new.myassignmenteditor.com/dl/re/?id=#=ID#" target="_blank" class="k-button">Jobcard</a>' },
		{field:"Status", title: "Status", width: 100},
		{field:"Title", title: "Title", width: 310},
		{field:"Type", title: "Ref. Style", width: 210},
		{field:"Category", title: "Category", width: 210},
		{field:"UOW", title: "Word", width: 150, aggregates: ["sum"], footerTemplate: "Total: #=sum#"},
		{field:"Price", title: "Price", width: 80},
		{field:"CURR", title: "Currency", width: 80},
		{field:"Start", title: "Dropped", width: 210, template: '#= kendo.toString(Start, "dd/MM/yyyy HH:mm") #'},
		{field:"End", title: "Delivery", width: 210, template: '#= kendo.toString(End, "dd/MM/yyyy HH:mm") #'}
	]
);
}

var ws_ui_112346 = $("#ws-ui-112346").kendoWindow({
	width: "600px",
	title: "Quick",
	visible: false,
	actions: [ "Close" ],
}).data("kendoWindow").center();

_url('Projects', '#projects/all');

function wsUIButton_112302(e){
	e.preventDefault();	
	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	if(dataItem.Status != 'Invoiced'){
		window.currentDataItemEdit = dataItem;
		window.currentDataItemEditURL = 'https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec';
		window.currentDataItem18 = 'projects';
		_navMenuList('projects-edit');
	}else{
		_msg('Sorry! You can not edit this item');
	}
}

function wsUIButton_112300(e){
	e.preventDefault();	
	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	window.currentDataItem = {Metadata: dataItem.Metadata};
	
	var ws_html_exit_01 = '';
	var ws_html_exit_02 = '';	
	var tabItems = window.authUser[0]["navigation"][1];
	var dataClust = tabItems.toString();	
	
	if(dataClust.indexOf('details') > -1){
		ws_html_exit_01 += '<li class="k-state-active">Details</li>';
		
		var ws_html_exit_02_2 = '';
		if(dataItem.Status == 'Delivered' || dataItem.Status == 'Invoiced'){
			ws_html_exit_02_2 = '<p><a class="k-button k-primary" target="_blank" href="https://drive.google.com/embeddedfolderview?id='+dataItem.Playground+'#grid">Download Files</a></p><p>&nbsp;</p>';
		}
		
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><div class="bottom-20"><h4>'+dataItem.Title+'</h4><p>Description: '+dataItem.Descripition+'</p><p>Words: '+dataItem.UOW+'</p><p>Price: '+dataItem.Price+' '+dataItem.CURR+'</p><p>Start: '+dataItem.Start+'<br />End: '+dataItem.End+'</p></div><div id="ws-ui-113752" class="bottom-20" style="width:auto;display:block"></div><div id="ws-ui-113753" class="bottom-20"></div>'+ws_html_exit_02_2+'<p><input id="ws-ui-113754" type="text" /></p><p><button id="ws-ui-113755" class="btn btn-primary theme-default">Update</button></p></div>';
	}
	if(dataClust.indexOf('comments') > -1){
		ws_html_exit_01 += '<li>Comments</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><div class="input-group bottom-20 full-width"><form method="post" onsubmit="return action_ws_ui_100003_1();"><div class="form-group"><input type="text" class="form-control conv-user-input" placeholder="Type here" id="ws-ui-100003-1" maxlength="600" autocomplete="off"></div><input type="submit" class="hidden"></form><p>&nbsp;</p><center><button type="button" class="btn btn-default btn-sm" id="ws-ui-100001-1"><span class="k-icon k-i-refresh"></span> Refresh</button></center></div><div id="ws-ui-100002-1"><center>Looking for data...</center></div></div>';
	}
	if(dataClust.indexOf('comments-old') > -1){
		ws_html_exit_01 += '<li>Comments old</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><a href="http://portal.myassignmenteditor.com/page-project-details_metadata.php?id='+dataItem.ID+'&type=admin" target="_blank" class="btn btn-primary theme-default">Click to see Old Comments</a></div>';
	}
	if(dataClust.indexOf('query') > -1){
		ws_html_exit_01 += '<li>Query</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><div class="input-group bottom-20 full-width"><form method="post" onsubmit="return action_ws_ui_100003_2();"><div class="form-group"><input type="text" class="form-control conv-user-input" placeholder="Type here" id="ws-ui-100003-2" maxlength="600" autocomplete="off"></div><input type="submit" class="hidden"></form><p>&nbsp;</p><center><button type="button" class="btn btn-default btn-sm" id="ws-ui-100001-2"><span class="k-icon k-i-refresh"></span> Refresh</button></center></div><div id="ws-ui-100002-2"><center>Looking for data...</center></div></div>';
	}
	if(dataClust.indexOf('allocation') > -1){
		ws_html_exit_01 += '<li>Allocation</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><!--<p>Allocation <span id="ws-ui-113760">0</span> of '+dataItem.UOW+' Words</p>--><div id="ws-ui-113761" class="bottom-20"></div><div class="bottom-20"><input id="ws-ui-113762" placeholder="Select Date" style="width: 50%;" /> <button id="ws-ui-113762-1" class="btn btn-primary theme-default hidden">Add</button></div><div id="ws-ui-113763"></div><p>&nbsp;</p><div id="ws-ui-113764"></div></div>';
	}
	if(dataClust.indexOf('files') > -1){
		ws_html_exit_01 += '<li>Files</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><a class="btn btn-primary theme-default'+wsCallService_112300('open-folder')+'" href="https://drive.google.com/drive/folders/'+dataItem.Playground+'" target="_blank">Open Folder</a><p>&nbsp;</p><iframe class="fileManager" src="https://drive.google.com/embeddedfolderview?id='+dataItem.Playground+'#grid" frameborder="0"></iframe></div>';
	}
	if(dataClust.indexOf('upload') > -1){
		ws_html_exit_01 += '<li>Jobcard</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20"><a class="btn btn-primary theme-default'+wsCallService_112300('open-folder')+'" href="https://drive.google.com/drive/folders/'+dataItem.Jobcard+'" target="_blank">Open Folder</a><p>&nbsp;</p><iframe class="fileManager" src="https://drive.google.com/embeddedfolderview?id='+dataItem.Jobcard+'#grid" frameborder="0"></iframe></div>';
	}
	if(dataClust.indexOf('activity') > -1){
		ws_html_exit_01 += '<li>Activity</li>';
		ws_html_exit_02 += '<div class="col-md-12 bottom-20">No activity found</div>';
	}

	
	$("#ws-explore").html('<div class="row"><div class="col-md-12 bottom-20"><h2>'+dataItem.ID+'</h2></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-113750"><ul>'+ws_html_exit_01+'</ul>'+ws_html_exit_02+'</div></div></div>');
	
	/*if(window.authUser[0].Role != 'User'){
		action_ws_ui_100001_1();
	}*/
	
	if($("#ws-ui-100002-1").length > 0){
		action_ws_ui_100001_1();
	}
	
	if($("#ws-ui-100002-2").length > 0){
		action_ws_ui_100001_2();
	}
	
	$("#ws-ui-113750").kendoTabStrip({ animation: { open: { effects: "fadeIn" } } });
	
	$("#ws-ui-113752").kendoProgressBar({
		type: "percent",
		change: function(e) {
			this.progressWrapper.css({
				"background-color": perctohsl(e.value),
				"border-color": perctohsl(e.value)
			});
		}
	});
	
	if(dataItem.Status == 'Submitted') $("#ws-ui-113752").data("kendoProgressBar").value(10);
	if(dataItem.Status == 'Request') $("#ws-ui-113752").data("kendoProgressBar").value(10);
	if(dataItem.Status == 'Checking') $("#ws-ui-113752").data("kendoProgressBar").value(20);
	if(dataItem.Status == 'Hold') $("#ws-ui-113752").data("kendoProgressBar").value(20);
	if(dataItem.Status == 'Checked') $("#ws-ui-113752").data("kendoProgressBar").value(30);
	if(dataItem.Status == 'Allocation') $("#ws-ui-113752").data("kendoProgressBar").value(35);
	if(dataItem.Status == 'Progress') $("#ws-ui-113752").data("kendoProgressBar").value(40);
	if(dataItem.Status == 'Delivered') $("#ws-ui-113752").data("kendoProgressBar").value(100);
	
	if(wsCallService_112300("details-name")){
	$("#ws-ui-113753").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=details&rl="+window.authUser[0].Role+"&metadata="+dataItem.Metadata+"&nocomments=true"
				}
			},
			schema: { model: { id: "sl", fields: {
				DateTime: { type: "date" }, 
				Details: { type: "string" },
				UserName: { type: "string" }
			}}}
		}, 
		filterable: true, sortable: true, height: 180,  
		columns: [
			{ field: "DateTime", title: "Date Time", width: 250, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
			{ field: "Details", title: "Details" },
			{ field: "UserName", title: "Name" }
		] 
	});
	}else{
	$("#ws-ui-113753").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=details&rl="+window.authUser[0].Role+"&metadata="+dataItem.Metadata+"&nocomments=true"
				}
			},
			schema: { model: { id: "sl", fields: {
				DateTime: { type: "date" }, 
				Details: { type: "string" }
			}}}
		}, 
		filterable: true, sortable: true, height: 180,  
		columns: [
			{ field: "DateTime", title: "Date Time", width: 250, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
			{ field: "Details", title: "Details" }
		] 
	});
	}
	
	$("#ws-ui-113754").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: {
			type: "jsonp",
			transport: {
				read: {			
				url: "https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=progress-actions&rl="+window.authUser[0].Role+"&metadata="+dataItem.Metadata,
				}
			}
		},
		select: function(e){
			window.currentDataItem2 = this.dataItem(e.item);
		}
	});
	
	$("#ws-ui-113755").click(function(){
		if(typeof window.currentDataItem2 != 'undefined' && window.currentDataItem2.value != ''){	
			if(window.currentDataItem2.value == 'Request'){
				_wsProgress(80);
				/*$.getJSON('https://script.google.com/macros/s/AKfycbz_CLTkzYCuC1ZtnXkAjAm0kPzvZ-Zm2XLQezQABINdUessxhZn/exec?type=create&values=["'+dataItem.ID+'-AUTO", "'+dataItem.Title+'", "'+dataItem.Descripition+'", "'+dataItem.Type+'", "'+dataItem.Category+'", "'+dataItem.Tag+'", "'+dataItem.Start+'", "'+dataItem.End+'", "'+dataItem.UOW+'", "'+dataItem.Price+'", "'+dataItem.CURR+'", "'+dataItem.Playground+'", "'+dataItem.Metadata+'", "Submitted", "AUTO", "*_'+window.authUser[0].sl+'_", "'+window.authUser[0].Name+'"]').done(function(result){
					_wsProgress(100);
					if(result){
						_msg('Success: Your have submitted new Rework Project');
						window.currentDataItem7 = result[0][14];
						window.currentDataItem8 = 'projects-2';
						_navMenuList('projects-create-jobcard');
					}else{
						$("#ws-ui-100002").html('<p>Sorry! Unable to process your request.</p>');
					}
				}).fail(function(result){
					_msg('Error: Connection problem'); _wsProgress(100);
				});*/_msg("Error-DEV-CMNT-L259: This service not available for you");
			}else{
				_wsProgress(80);
				$.getJSON('https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=progress-push&rl='+window.authUser[0].Role+'&metadata='+dataItem.Metadata+'&sl='+dataItem.sl+'&values=["AUTO", '+window.authUser[0].sl+', "'+window.authUser[0].Role+'", "'+window.authUser[0].Name+'", "'+window.currentDataItem2.value+'", "'+window.currentDataItem2.text+'", "'+dataItem.ID+'", "'+dataItem.Users+'"]').done(function(result){
					if(result){
						window.currentDataItem2 = '';
						$("#ws-ui-113753").data('kendoGrid').dataSource.read();
						$("#ws-ui-113754").data('kendoDropDownList').dataSource.read();
					}else{
						_msg('Error: Server problem, no data updated or fetched');
					}
					_wsProgress(100);
				}).fail(function(result){
					_msg('Error: Connection problem'); _wsProgress(100);
				});
			}
		}else{
			_msg('Sorry: Please select a Status then click Update');
		}
	});
	
	$("#ws-ui-113761").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=grid&rl="+window.authUser[0].Role+"&service="+dataItem.ID+"&ol=Allocation"
				}
			},
			aggregate: [{ field: "UOW", aggregate: "sum" }]
		}, 
		filterable: true, sortable: true, height: 200,  
		columns: [
			{ field: "UserName", title: "Name" },
			{ field: "DateTime", title: "Date Time", width: 210, template: '#: kendo.format("{0:d}", DateTime)#' },
			{ field: "UOW", title: "Words", aggregates: ["sum"], footerTemplate: "Total: #=sum# of "+dataItem.UOW },
			{ title: "Visible", width: 80, template: '<input type="checkbox" #= Visible ? \'checked="checked"\' : "" # class="wsUIChkbox113761" />' }
		] 
	});
	
	$("#ws-ui-113762").kendoDateTimePicker({
		start: "date",
		depth: "year",
		format: "dd/MM/yyyy HH:mm:ss",
		change: function(e){
			udate = this.value();
			udate = udate.getDate()+"/"+_ws_get_by_zero(udate.getMonth()+1)+"/"+udate.getFullYear();
			
			$("#ws-ui-113762-1").removeClass("hidden");
			
			$("#ws-ui-113763").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							url: "https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=skill&rl="+window.authUser[0].Role+"&service="+dataItem.ID+"&ol=Allocation&date="+udate
						}
					},
					schema:{
						model: {
                        fields: {
                            UserName: { type: "string" },
                            Location: { type: "string" },
                            Role: { type: "string" },
                            Description: { type: "string" },
                            UOW: { type: "number" },
                            AcademicBackground: { type: "string" },
                            Coordinator: { type: "string" }
							}
                        }
                    },
					aggregate: [{ field: "UOW", aggregate: "sum" },{ field: "UserName", aggregate: "count" }]
				}, 
				filterable: true, sortable: true, height: 350, selectable: "single", 
				columns: [
					{ field: "UserName", title: "Name", aggregates: ["count"], footerTemplate: "Count: #=count#" },
					{ field: "Location", title: "Location" },
					{ field: "Role", title: "Role" },
					{ field: "Category", title: "Category" },
					{ field: "UOW", title: "Words", aggregates: ["sum"], footerTemplate: "Capacity: #=sum#" },
					{ field: "AcademicBackground", title: "Academic Background" },
					{ field: "Coordinator", title: "Coordinator" }
				] 
			});
			
			$("#ws-ui-113764").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							url: "https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=allocation-report&rl="+window.authUser[0].Role+"&date="+udate
						}
					},
					schema:{
						model: {
                        fields: {
                            UserName: { type: "string" },
                            ID: { type: "string" },
                            Description: { type: "string" },
                            UOW: { type: "number" }
							}
                        }
                    },
					aggregate: [{ field: "UOW", aggregate: "sum" }, { field: "UserName", aggregate: "count" }]
				}, 
				filterable: true, sortable: true, height: 200, selectable: "single", 
				columns: [
					{ field: "UserName", title: "Name", aggregates: ["count"], footerTemplate: "Allocated: #=count#" },
					{ field: "ID", title: "Project" },
					{ field: "Description", title: "Category" },
					{ field: "UOW", title: "Words", aggregates: ["sum"], footerTemplate: "Allocated: #=sum#" }
				] 
			});
			
		}
	});
	
	$("#ws-ui-113762-1").click(function(){
		var grid = $("#ws-ui-113763").data("kendoGrid");
		var dataItem_x = grid.dataItem(grid.select());
		if(dataItem_x){
		_wsProgress(40);
		$.getJSON('https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=grid-push&rl='+window.authUser[0].Role+'&service='+dataItem.ID+'&ol=Allocation&uow='+dataItem.UOW+'&values=['+dataItem_x.UserSl+', "'+dataItem_x.UserName+'", "Allocation", "'+dataItem.ID+'", "'+$("#ws-ui-113762").val()+'", "'+dataItem_x.Category+'", "'+dataItem_x.UOW+'", "'+window.authUser[0].sl+'", "'+window.authUser[0].Name+'", "AUTO"]').done(function(result){
			if(result){
				
				_wsProgress(80);
				$.getJSON('https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=progress-push&rl='+window.authUser[0].Role+'&metadata='+dataItem.Metadata+'&sl='+dataItem.sl+'&values=["AUTO", '+window.authUser[0].sl+', "'+window.authUser[0].Role+'", "'+window.authUser[0].Name+'", "Allocation", "Allocation"]').done(function(result){
					if(result){
						window.currentDataItem2 = '';
						$("#ws-ui-113753").data('kendoGrid').dataSource.read();
						$("#ws-ui-113754").data('kendoDropDownList').dataSource.read();
						$("#ws-ui-113761").data('kendoGrid').dataSource.read();
						$("#ws-ui-113763").data('kendoGrid').dataSource.read();
						$("#ws-ui-113764").data('kendoGrid').dataSource.read();
					}else{
						_msg('Error: Server problem, no data updated or fetched');
					}
					_wsProgress(100);
				}).fail(function(result){
					_msg('Error: Connection problem'); _wsProgress(100);
				});
				
			}else{
				_msg('Error: Server problem, no data updated or fetched');
			}
			_wsProgress(100);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100);
		});
		}else{}
	});
	
	$("#ws-ui-113761 .k-grid-content").on("change", "input.wsUIChkbox113761", function(e){
		var grid = $("#ws-ui-113761").data("kendoGrid"), dataItem = grid.dataItem($(e.target).closest("tr"));
		var type;
		if(this.checked) type = 'team-add'; else type = 'team-remove';
		
		_wsProgress(80);
		$("input.wsUIChkbox113761").addClass("hidden");
		$.getJSON("https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type="+type+"&rl="+window.authUser[0].Role+"&service="+dataItem.ID+"&usersl="+dataItem.UserSl).done(function(result){
			if(result){
				$("#ws-ui-113761").data('kendoGrid').dataSource.read();
			}else{
				_msg('Error: Server problem, no data updated or fetched'); $("input.wsUIChkbox113761").removeClass("hidden");
			}
			_wsProgress(100);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100); $("input.wsUIChkbox113761").removeClass("hidden");
		});
	});
	
	_url(dataItem.ID, '#projects/'+dataItem.ID);
}

function wsUIButton_112301(e){
	e.preventDefault();	
	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	
	ws_ui_112346.title(dataItem.ID);
	
	if(wsCallService_112300("details-name")){
	$("#ws-ui-112346-1").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=details&rl="+window.authUser[0].Role+"&metadata="+dataItem.Metadata+"&nocomments=true"
				}
			},
			schema: { model: { id: "sl", fields: {
				DateTime: { type: "date" }, 
				Details: { type: "string" },
				UserName: { type: "string" }
			}}}
		}, 
		filterable: true, sortable: true, height: 180,  
		columns: [
			{ field: "DateTime", title: "Date Time", width: 250, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
			{ field: "Details", title: "Details" },
			{ field: "UserName", title: "Name" }
		] 
	});
	}else{
	$("#ws-ui-112346-1").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=details&rl="+window.authUser[0].Role+"&metadata="+dataItem.Metadata+"&nocomments=true"
				}
			},
			schema: { model: { id: "sl", fields: {
				DateTime: { type: "date" }, 
				Details: { type: "string" }
			}}}
		}, 
		filterable: true, sortable: true, height: 180,  
		columns: [
			{ field: "DateTime", title: "Date Time", width: 250, template: '#= kendo.toString(DateTime, "dd/MM/yyyy HH:mm") #' },
			{ field: "Details", title: "Details" }
		] 
	});
	}
	
	$("#ws-ui-112346-2").kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				read: {
					url: "https://script.google.com/macros/s/AKfycbzW7IQKU-4LKGg5mfgPfhODWF5dDslSZTxZ66GR9GkD-DdjYC0/exec?type=grid&rl="+window.authUser[0].Role+"&service="+dataItem.ID+"&ol=Allocation"
				}
			},
			aggregate: [{ field: "UOW", aggregate: "sum" }]
		}, 
		filterable: true, sortable: true, height: 200,  
		columns: [
			{ field: "UserName", title: "Name" },
			{ field: "DateTime", title: "Date Time", width: 210, template: '#: kendo.format("{0:d}", DateTime)#' },
			{ field: "UOW", title: "Words", aggregates: ["sum"], footerTemplate: "Total: #=sum# of "+dataItem.UOW }
		] 
	});
	
	ws_ui_112346.open();
}

function action_ws_ui_100001_1(){
	_wsProgress(80);
	$.getJSON("https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=details&rl="+window.authUser[0].Role+"&metadata="+window.currentDataItem.Metadata).done(function(result){
		if(result){
			$("#ws-ui-100002-1").html('');			
			for(var ws_i = result.length - 1; ws_i >= 0; ws_i--){
				if(window.authUser[0].sl == result[ws_i]['UserSl']){
					conv = 'conv conv-me'; conv_theme = 'theme-default';
				}else{
					conv = 'conv'; conv_theme = 'theme-white';
				}
				_commentsPush("ws-ui-100002-1", conv, conv_theme, false, result[ws_i]['UserName'], result[ws_i]['Details'], result[ws_i]['DateTime']);
			}
		}else{
			$("#ws-ui-100002-1").html('<p>Sorry! Nothing to show.</p>');
		}
		_wsProgress(100);
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100); $("#ws-ui-100002-1").html("<center>Check your connection, and then try again!</center>");
	});
}

function action_ws_ui_100001_2(){
	_wsProgress(80);
	$.getJSON("https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=details&rl="+window.authUser[0].Role+"&metadata="+window.currentDataItem.Metadata+"&queryonly=true").done(function(result){
		if(result){
			$("#ws-ui-100002-2").html('');			
			for(var ws_i = result.length - 1; ws_i >= 0; ws_i--){
				if(window.authUser[0].sl == result[ws_i]['UserSl']){
					conv = 'conv conv-me'; conv_theme = 'theme-default';
					var _tempUserName = "Me";
				}else{
					conv = 'conv'; conv_theme = 'theme-white';
					var _tempUserName = "[No Name]";
				}
				
				if(typeof window.authUser[0]["navigation"][4][4] != 'undefined') if(window.authUser[0]["navigation"][4][4] != '') _tempUserName = result[ws_i]['UserName']; 
				_commentsPush("ws-ui-100002-2", conv, conv_theme, false, _tempUserName, result[ws_i]['Details'], result[ws_i]['DateTime']);
			}
		}else{
			$("#ws-ui-100002-2").html('<p>Sorry! Nothing to show.</p>');
		}
		_wsProgress(100);
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100); $("#ws-ui-100002-2").html("<center>Check your connection, and then try again!</center>");
	});
}

function action_ws_ui_100003_1(){
	var um = $("#ws-ui-100003-1");
	if(um.val() != ''){
		_wsProgress(40);
		um.prop('readonly',true);
		$.getJSON('https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=progress-push&rl='+window.authUser[0].Role+'&metadata='+window.currentDataItem.Metadata+'&sl='+window.currentDataItem.sl+'&values=["AUTO", '+window.authUser[0].sl+', "'+window.authUser[0].Role+'", "'+window.authUser[0].Name+'", "Comments", "'+escape(um.val())+'"]').done(function(result){
			if(result){
				conv = 'conv conv-me';
				conv_theme = 'theme-default';
				_commentsPush("ws-ui-100002-1", conv, conv_theme, true, result[0][3], result[0][5], result[0][0]);
			}else{
				_msg('Error: Server problem, no data updated or fetched');
			}
			_wsProgress(100); um.val(""); um.prop('readonly',false);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100); um.prop('readonly',false); $("#ws-ui-100002-1").html("Check your connection, and retry!");
		});
	}
	return false;
}

function action_ws_ui_100003_2(){
	var um = $("#ws-ui-100003-2");
	if(um.val() != ''){
		_wsProgress(40);
		um.prop('readonly',true);
		$.getJSON('https://script.google.com/macros/s/AKfycby061BcpZd50BErrgjkMEtuWqKIBNN_6WFAPnTIzU1ouHU0btM/exec?type=progress-push&rl='+window.authUser[0].Role+'&metadata='+window.currentDataItem.Metadata+'&sl='+window.currentDataItem.sl+'&values=["AUTO", '+window.authUser[0].sl+', "'+window.authUser[0].Role+'", "'+window.authUser[0].Name+'", "Query", "'+escape(um.val())+'"]').done(function(result){
			if(result){
				conv = 'conv conv-me';
				conv_theme = 'theme-default';
				var _tempUserName = "Me";
				if(typeof window.authUser[0]["navigation"][4][4] != 'undefined') if(window.authUser[0]["navigation"][4][4] != '') _tempUserName = result[0][3];
				_commentsPush("ws-ui-100002-2", conv, conv_theme, true, _tempUserName, result[0][5], result[0][0]);
			}else{
				_msg('Error: Server problem, no data updated or fetched');
			}
			_wsProgress(100); um.val(""); um.prop('readonly',false);
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100); um.prop('readonly',false); $("#ws-ui-100002-2").html("Check your connection, and retry!");
		});
	}
	return false;
}

function perctohsl(p) {
	if(p <= 20) return "#FF5722";
	if(p >= 21 && p <= 60) return "#FF9800";
	if(p >= 61 && p <= 80) return "#FFEB3B";
	if(p >= 80) return "#4CAF50";
}

function _ws_url_access(){
	if(window.authUser[0].Role == "System" || window.authUser[0].Role == "Power") return "";
	else return "&usersl="+window.authUser[0].sl;
}

function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }

function wsCallService_112300(t){
	var items = window.authUser[0]["navigation"][4];
	var dataClust = items.toString();
	if(t == 'edit'){
		if(dataClust.indexOf(t) > -1) return true; else return false;
	}
	if(t == 'update'){
		if(dataClust.indexOf(t) > -1) return ''; else return ' hidden';
	}
	if(t == 'details-name'){
		if(dataClust.indexOf(t) > -1) return true; else return false;
	}
	if(t == 'open-folder'){
		if(dataClust.indexOf(t) > -1) return ''; else return ' hidden';
	}
}