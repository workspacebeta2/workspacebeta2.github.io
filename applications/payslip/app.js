$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Payslip</h2><p>Select month to view payslip.</p></div></div><div class="row"><div class="col-md-12"><div class="col-md-12 bottom-20"><input id="ws-ui-113762" placeholder="Select Month" /><p>&nbsp;</p><div id="ws-ui-113762-1" class="bottom-20"></div></div></div></div>');

var userPayslipAccess = "&usersl="+window.authUser[0].sl;
//if(typeof window.authUser[0]["navigation"][3] != 'undefined') if(window.authUser[0]["navigation"][3] != '') userPayslipAccess = "";
if(window.authUser[0].Role == 'Power') userPayslipAccess = "";

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
							url: "https://script.google.com/macros/s/AKfycbwBueWbFsrSI7wP6RblznW7MinLHfWbVBw66bTz6KFpE1FGmiiN/exec?type=grid&rl="+window.authUser[0].Role+userPayslipAccess+"&month="+udate
						}
					},
					schema: { model: { id: "sl", fields: {
					Month: { type: "string" }, 
					UserName: { type: "string" }, 
					Salary: { type: "number" },
					Status: { type: "string" },
					Net: { type: "number" },
					Net: { type: "number" },
					PaymentMode: { type: "string" },
					PayDate: { type: "string" },
					Addition: { type: "number" },
					AdditionReason: { type: "string" },
					Deduction: { type: "number" },
					DeductionReason: { type: "string" },
					Location: { type: "string" },
					Role: { type: "string" },
					ES: { type: "string" },
					CalendarDays: { type: "number" },
					Perday: { type: "number" },
					WorkingDays: { type: "number" },
					CL: { type: "number" },
					CLdate: { type: "string" },
					NPL: { type: "number" },
					NPLdate: { type: "string" },
					NPLamount: { type: "number" },
					LateNPL: { type: "number" },
					LateNPLdate: { type: "string" },
					LateNPLamount: { type: "number" },
					EmergencyLeave: { type: "number" },
					EmergencyLeaveDate: { type: "string" },
					EmergencyLeaveAmount: { type: "number" },
					SundayDeduct: { type: "number" },
					SundayDeductDate: { type: "string" },
					SundayDeductAmount: { type: "number" },
					AttendanceIncentiveAmount: { type: "number" },
					AttendanceIncentiveDetails: { type: "string" },
					JobIncentiveAmount: { type: "number" },
					JobIncentiveDetails: { type: "string" },
					TAsal: { type: "number" },
					TAnet: { type: "number" },
					TAperSal: { type: "number" },
					TAperNet: { type: "number" },
					TW: { type: "number" },
					
					}}},
					aggregate: [{ field: "Net", aggregate: "sum" },{ field: "Salary", aggregate: "sum" }, { field: "UserName", aggregate: "count" }, { field: "Addition", aggregate: "sum" }, { field: "Deduction", aggregate: "sum" }, { field: "Perday", aggregate: "sum" }, { field: "CL", aggregate: "sum" }, { field: "NPL", aggregate: "sum" },{ field: "NPLamount", aggregate: "sum" }, { field: "LateNPL", aggregate: "sum" },{ field: "LateNPLamount", aggregate: "sum" }, { field: "EmergencyLeave", aggregate: "sum" }, { field: "EmergencyLeaveAmount", aggregate: "sum" }, { field: "SundayDeduct", aggregate: "sum" }, { field: "SundayDeductAmount", aggregate: "sum" }, { field: "AttendanceIncentiveAmount", aggregate: "sum" }, { field: "JobIncentiveAmount", aggregate: "sum" }, { field: "TAperSal", aggregate: "sum" }, { field: "TAperNet", aggregate: "sum" }, { field: "TW", aggregate: "sum" }],
					scrollable: {
						virtual: true
					},
					sort: { field: "DateTime", dir: "desc" }
				},
				filterable: true, refresh: true, sortable: true, height: 500, 
				columns: [
					{field:"Month", title: "Month", width: 110},
					{field:"UserName", title: "Name", width: 180, aggregates: ["count"], footerTemplate: "Count : #=count#"},
					{field:"Salary", title: "Salary", width: 130, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"Status", title: "Status", width: 150},
					{command: {text: "View", click: ws_ui_113762_btn1}, title: " ", width: "100px"},
					{field:"Net", title: "Net Payment", width: 130, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"PaymentMode", title: "Payment Mode", width: 210},
					{field:"PayDate", title: "PayDate", width: 210},
					{field:"Addition", title: "Addition", width: 110, aggregates: ["sum"], footerTemplate: "T.Add : #=sum#"},
					{field:"AdditionReason", title: "Addition Reason", width: 250},
					{field:"Deduction", title: "Deduction", width: 110, aggregates: ["sum"], footerTemplate: "T.Ded : #=sum#"},
					{field:"DeductionReason", title: "Deduction Reason", width: 250},
					{field:"Location", title: "Location", width: 110},
					{field:"Role", title: "Role", width: 110},
					{field:"ES", title: "ES", width: 110},
					{field:"CalendarDays", title: "Calendar Days", width: 150},
					{field:"Perday", title: "Perday", width: 110, aggregates: ["sum"], footerTemplate: "P.Total : #=sum#"},
					{field:"WorkingDays", title: "Working Days", width: 150},
					{field:"CL", title: "CL", width: 80, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"CLdate", title: "CL Date", width: 120},
					{field:"NPL", title: "NPL", width: 80, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"NPLdate", title: "NPL Date", width: 120},
					{field:"NPLamount", title: "NPL Amount", width: 120, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"LateNPL", title: "Late NPL", width: 120, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"LateNPLdate", title: "Late NPL Date", width: 150},
					{field:"LateNPLamount", title: "Late NPL Amount", width: 150, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"EmergencyLeave", title: "Emergency Leave", width: 180, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"EmergencyLeaveDate", title: "Emergency Leave Date", width: 210},
					{field:"EmergencyLeaveAmount", title: "Emergency Leave Amount", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"SundayDeduct", title: "Sunday Deduct", width: 180, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"SundayDeductDate", title: "Sunday Deduct Date", width: 180},
					{field:"SundayDeductAmount", title: "Sunday Deduct Amount", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"AttendanceIncentiveAmount", title: "Attendance Incentive Amount", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"AttendanceIncentiveDetails", title: "Attendance Incentive Details", width: 210},
					{field:"JobIncentiveAmount", title: "Job Incentive Amount", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"JobIncentiveDetails", title: "Job Incentive Details", width: 210},
					{field:"TAsal", title: "TA Sal", width: 210},
					{field:"TAnet", title: "TA Net", width: 210},
					{field:"TAperSal", title: "TA Per Sal", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"TAperNet", title: "TA Per Net", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"},
					{field:"TW", title: "TW", width: 210, aggregates: ["sum"], footerTemplate: "Total : #=sum#"}
				] 
			});
		}
	});
	
	function ws_ui_113762_btn1(e){
		e.preventDefault();	
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		
		var currentDataPayslip = [];
		currentDataPayslip.push(dataItem.UserID);
		currentDataPayslip.push(dataItem.UserName);
		currentDataPayslip.push(dataItem.Month);
		currentDataPayslip.push(dataItem.Salary);
		currentDataPayslip.push(dataItem.Addition);
		currentDataPayslip.push(dataItem.Deduction);
		currentDataPayslip.push(dataItem.Net);
		currentDataPayslip = btoa(currentDataPayslip.join("~"));
		window.location = "applications/payslip/view/#"+currentDataPayslip;
	}
	
_url('Payslip', '#Payslip/all');
	
function _ws_get_by_zero(v){ return (v < 10) ? '0' + v : v; }
