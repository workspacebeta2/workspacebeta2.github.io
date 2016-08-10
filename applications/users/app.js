$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Users</h2><p>All user listed bellow</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"></div></div></div>');

_uiGrid(
	'ws-ui-112345', 
	"https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=grid&rl="+window.authUser[0].Role, 
	"https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec", 
	550, 20, {
		ID: {type: "string"}, 
		Name: {type: "string"}, 
		Email: {type: "string"},
		Password: {type: "string"},
		Role: {type: "string"}, 
		RFID: {type: "string"}, 
		Phone: {type: "string"}, 
		Address: {type: "string"},
		JD: {type: "string"},
		UOW: {type: "string"},
		Amount: {type: "number"},
		CURR: {type: "string"},
		JOD: {type: "string"},
		RD: {type: "string"},
		PD: {type: "string"},
		ES: {type: "string"},
		IS: {type: "string"},
		Location: {type: "string"},
		RRage: {type: "string"}
	}, [{ field: "Name", aggregate: "count" }, { field: "Role", aggregate: "count" }],
	[
		{field:"ID", title: "ID", width: 120},
		{command: {text: "View", click: wsUIButton_112300}, title: " ", width: "85px"},
		{command: {text: "Attendance", click: wsUIButton_112302}, title: " ", width: "124px"},
		{field:"Name", title: "Name", width: 210 , aggregates: ["count"], footerTemplate: "Count : #=count#"},
		{field:"Email", title: "Email", width: 210},
		{field:"Password", title: "Password", width: 210},
		{field:"Role", title: "Role", width: 100, aggregates: ["count"], footerTemplate: "Count : #=count#"},
		{field:"RFID", title: "RFID", width: 110},
		{field:"Phone", title: "Phone", width: 210},
		{command: {text: "Documents", click: wsUIButton_112301}, title: " ", width: "125px"},
		{title: "Locked", width: 50, template: '<input type="checkbox" #= DocLock ? \'checked="checked"\' : "" # class="wsUICheckbox_112302" />'},
		{field:"Address", title: "Address", width: 210},
		{field:"JD", title: "JD", width: 210},
		{field:"UOW", title: "UOW", width: 110},
		{field:"Amount", title: "Amount", width: 100},
		{field:"CURR", title: "Currency", width: 100},
		{field:"JOD", title: "JOD", width: 100},		
		{field:"RD", title: "RD", width: 150},
		{field:"PD", title: "PD", width: 200},
		{field:"ES", title: "ES", width: 150},
		{field:"IS", title: "IS", width: 150},
		{field:"Location", title: "Location", width: 150},
		{field:"RRage", title: "RRage", width: 150},
		{command: ["edit"], title: "&nbsp;", width: "150px"}
	]
);

_url('Users', '#users/all');

$("#ws-ui-112345 .k-grid-content").on("change", "input.wsUICheckbox_112302", function(e) {
	var grid = $("#ws-ui-112345").data("kendoGrid"),
	dataItem = grid.dataItem($(e.target).closest("tr"));
	var act = "";
	if(this.checked){
		act = "Locked";
	}
	_wsProgress(80);
	$.getJSON('https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=doclock&sl='+dataItem.sl+'&values='+act+'&ID='+dataItem.ID).done(function(result){
		_wsProgress(100);
		if(result){
			_msg('Success! Documents of user is now '+result);
			$("#ws-ui-112345").data('kendoGrid').dataSource.read();
		}else{
			_msg('Sorry! Unable to process your request');
		}
	}).fail(function(result){
		_msg('Error: Connection problem'); _wsProgress(100);
	});
});

function wsUIButton_112302(e){
	e.preventDefault();
	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	
	window.currentUserItem3 = dataItem.sl;
	window.currentUserItem4 = dataItem.Name;
	
	_navMenuList('attendance');
}

function wsUIButton_112301(e){
	e.preventDefault();
	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	
	
	if(dataItem.Documents != ''){
		var ouri = "https://drive.google.com/drive/folders/"+dataItem.Documents;
		window.open(ouri, "_blank");
	}else{
		_wsProgress(80);
		$.getJSON('https://script.google.com/macros/s/AKfycbyIgefZI12R8UQ5VnxEVbQbBYEMcaR7UyEySMHPkuXdU6R0lWIu/exec?type=documents&sl='+dataItem.sl+'&values='+dataItem.ID).done(function(result){
			_wsProgress(100);
			if(result){
				var ouri = "https://drive.google.com/drive/folders/"+result;
				window.open(ouri, "_blank");
				$("#ws-ui-112345").data('kendoGrid').dataSource.read();
			}else{
				_msg('Sorry! Unable to process your request');
			}
		}).fail(function(result){
			_msg('Error: Connection problem'); _wsProgress(100);
		});
	}
}

function wsUIButton_112300(e){
	e.preventDefault();
	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	
	$("#ws-explore").html('<div class="row"><div class="col-md-12 bottom-20"><h2>'+dataItem.Name+'</h2><p>'+dataItem.ID+'</p><p><input id="monthpicker" placeholder="Select Month" /></p></div></div><div class="row"><div class="col-md-12 bottom-20"><div id="ws-ui-113750"><ul><li class="k-state-active">Log</li><li>Leave</li><li>Allocation</li></ul><div class="col-md-12"><div id="ws-ui-113751" style="height:250px;"></div><div id="ws-ui-113752" class="bottom-20"></div></div><div class="col-md-12"><div id="ws-ui-113761"></div></div><div class="col-md-12"><div id="ws-ui-113771" class="bottom-20" style="height:350px;"></div></div></div></div></div>');
	
	$("#ws-ui-113750").kendoTabStrip({ animation: { open: { effects: "fadeIn" } } });	
	window.currentDataItem2 = dataItem.sl;
	
	$("#monthpicker").kendoDatePicker({ start: "year", depth: "year", format: "MM/yyyy", change: function(e){
			udate = this.value();
			udate1 = udate.getFullYear()+"-"+_ws_get_by_zero(udate.getMonth()+1);
			udate2 = _ws_get_by_zero(udate.getMonth()+1)+"/"+udate.getFullYear();
			
			$("#ws-ui-113761").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							//url: "https://script.google.com/macros/s/AKfycby0hDsGGPj9f5NweVbeFI3mu6nOosS1KuaZbAt6FQloFCm1eq4/exec?type=grid&rl="+window.authUser[0].Role+"&ol=Leave&usersl="+window.currentDataItem2+"&month="+udate1
						}
					},
					/*schema: { model: { id: "sl", fields: {
						DateTime: { type: "string" }, 
						For: { type: "date" }, 
						Issue: { type: "string" },
						Status: { type: "string" }
					}}},*/
					aggregate: [{ field: "UOW", aggregate: "sum" }]
				}, 
				filterable: true, sortable: true, height: 450,  
				columns: [
					{ field: "DateTime", title: "Date Time", width: 210, template: '#: kendo.format("{0:d}", DateTime)#' },
					{ field: "For", title: "For", width: 210, template: '#: kendo.format("{0:d}", For)#' },
					{ field: "Issue", title: "Issue", width: 350 },
					{ field: "Status", title: "Status", width: 210 }
				] 
			});
			
			$("#ws-ui-113771").kendoGrid({
				dataSource: {
					type: "jsonp",
					transport: {
						read: {
							//url: "https://script.google.com/macros/s/AKfycbzVkMNMk7TfEm5m_jj0mFD3P0s4Thx4Gbk27jVS9PwxGvzi02uW/exec?type=allocation-report&rl="+window.authUser[0].Role+"&usersl="+window.currentDataItem2+"&month="+udate2+"&actimode=true"
						}
					}, 
					/*schema: { model: { id: "sl", fields: {
						ID: { type: "string" }, 
						Description: { type: "string" }, 
						ActivityDateTime: { type: "date" }, 
						ActivityUserName: { type: "string" }, 
						DateTime: { type: "date" }, 
						UOW: { type: "number" }
					}}},*/
					aggregate: [{ field: "UOW", aggregate: "sum" }],
					scrollable: {
						virtual: true
					}
				}, 
				filterable: true, refresh: true, sortable: true, height: 450, 
				columns: [
					{ field: "ID", title: "Project", width: 150 },
					{ field: "Description", title: "Category", width: 150 },
					{ field: "ActivityDateTime", title: "Allocated on", width: 210, template: '#: kendo.format("{0:d}", ActivityDateTime)#' },
					{ field: "ActivityUserName", title: "Allocated by", width: 200 },					
					{ field: "DateTime", title: "Deadline", width: 210, template: '#: kendo.format("{0:d}", DateTime)#' },
					{ field: "UOW", title: "Words", width: 180, aggregates: ["sum"], footerTemplate: "Allocated: #=sum#" }
				] 
			});
		}
	});
	
	
	/* ********** var wsSDC_113750 = new kendo.data.DataSource({
		data: [
			{ sl: 1, date: "2016-01-18", rfidin: "0925", signin: "1040", last: "1920", rfidout: "2005" },
			{ sl: 2, date: "2016-01-19", rfidin: "0815", signin: "1017", last: "1600", rfidout: "1920" },
			{ sl: 3, date: "2016-01-20", rfidin: "0901", signin: "1015", last: "1952", rfidout: "1950" },
			{ sl: 4, date: "2016-01-21", rfidin: "0950", signin: "1005", last: "2014", rfidout: "2015" }
		],
		schema: { model: { id: "sl", fields: {
					date: { type: "date" }, 
					rfidin: { type: "string" }, 
					signin: { type: "string" }, 
					last: { type: "string" }, 
					rfidout: { type: "string" }
		}}}
	}); ********** */
    
    /*$("#ws-ui-113751").kendoChart({
		dataSource: wsSDC_113750, autoBind: true, seriesDefaults: { type: "line" }, legend : { position: "bottom" }, theme: "bootstrap",  
		valueAxis: { visible: false, majorGridLines: { visible: false } }, categoryAxis: { visible: false, majorGridLines: { visible: false } }, 
		series: [
			{ field: "rfidin", name: "RFID In" },
			{ field: "signin", name: "Sign In" },
			{ field: "last", name: "Last" },
			{ field: "rfidout", name: "RFID Out" }
		], 
		tooltip: { visible: true, template: "#= kendo.toString(new Date(dataItem.date), 'dd.MM.yyyy') # - #= value # " }
	});
	
	$("#ws-ui-113752").kendoGrid({
		dataSource: wsSDC_113750, autoBind: true, filterable: true, sortable: true, height: 200,  
		columns: [
			{ field: "date", title: "Date", width: 210, template: '#: kendo.format("{0:d}", date)#'},
			{ field: "rfidin", title: "RFID In" },
			{ field: "signin", title: "Sign In" },
			{ field: "last", title: "Last" },
			{ field: "rfidout", title: "RFID Out" }
		] 
	});*/
	
	/*$("#ws-ui-113761").kendoScheduler({
        startTime: new Date("2016/1/1 00:00 AM"),
        height: 500,
        views: [
            { type: "day", selected: true },
            "week",
            "month",
            "agenda",
            { type: "timeline", eventHeight: 40}
        ],
        timezone: "Asia/Kolkata",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { from: "TaskID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        ownerId: { from: "OwnerID", defaultValue: 1 },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        },
        resources: [
            {
                field: "ownerId",
                title: "Owner",
                dataSource: [
                    { text: "User", value: 1, color: "#f8a398" }
                ]
            }
        ],
		footer: {
			command: false
		}
    });*/
	
	
	/*$("#ws-ui-113771").kendoStockChart({
		dataSource: {
			transport: {
				read: {
					url: "ui/boeing-stock.json",
					dataType: "json"
				}
			},
			schema: {
				model: {
					fields: {
						Date: {
							type: "date"
						}
					}
				}
			}
		},
		dateField: "Date",
		series: [{
			type: "candlestick",
			openField: "High",
			highField: "Required",
			lowField: "Low",
			closeField: "Minimum"
		}],
		valueAxis: {
			visible: false,
			majorGridLines: {
				visible: false
			}
		},
		categoryAxis: {
			
		},
		theme: "bootstrap",
		tooltip: {
          visible: true,
          template: "<strong>#= kendo.toString(new Date(dataItem.Date), 'dd/MM/yyyy') #</strong><br /><br />High: #= dataItem.High #<br />Required: #= dataItem.Required #<br />Low: #= dataItem.Low #<br />Minimum: #= dataItem.Minimum #"
        },
		navigator: {
			series: {
				type: "area",
				field: "Low"
			},
			select: {
				from: "2009/02/05",
				to: "2011/10/07"
			},
			categoryAxis: {
				visible: false,
				labels: {
					visible: false
				}
			}
		}
	});*/
	
	_url(dataItem.ID, '#users/'+dataItem.ID);
}

function nowTime(){
	var mn = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
	var dy = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString();
	return mn[dy[8]+dy[9]+dy[10]]+'/'+dy[12]+dy[13]+dy[14]+dy[15];
}

function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
