var wsAppTitle = 'WorkSpace';
var wsAppTitleShort = 'WS';
var wsAppId = 'workspace_app0_';
var wsDate = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString()+'+0530 (India Standard Time)';

function _preventDefaults(e){if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) e.preventDefault();};
function _lget(e){return window.sessionStorage.getItem(wsAppId+e);}
function _lset(e, v){return window.sessionStorage.setItem(wsAppId+e, v);}
function _loadPage(p){$.ajax({url: p+".html", context: document}).done(function(data){document.write(data);}).fail(function(data){_msg('Error: Server problem, no data fetched');});}
function _toJson(d){
	try{
        return JSON.parse(d);
    }catch(e){
        _msg('Error: Cannot read data');
		return false;
    }
}
function _toText(d){
	try{
        return JSON.stringify(d);
    }catch(e){
        _msg('Error: Cannot write data');
		return false;
    }
}
function _msg(t){alert(t);console.log(t);}
function _log(t){console.log(t);}
function _spinner(s, e){
	if(s) document.getElementById(e).classList.add('spinner');
	else document.getElementById(e).classList.remove('spinner');
}
function _url(t, u){document.title = wsAppTitle+' '+t; history.pushState({}, t, u);}
function _formatDateTime(t){return t.getDate()+'/'+t.getMonth()+'/'+t.getFullYear()+' '+t.getHours()+':'+t.getMinutes();}

function _uiGrid(eleid, geturl, seturl, h, ps, fs, agr, c){
	$("#"+eleid).kendoGrid({
		dataSource: {
			type: "jsonp",
			transport: {
				/*read: geturl*/
				read: {
					url: geturl
					/*type: "get",
					dataType: "json"*/
				},				
				update: {
					url: seturl
					/*type: "get",
					dataType: "json"*/
				},
				/*parameterMap: function (options, operation){if (operation !== "read" && options.models){return {models: kendo.stringify(options.models)};}}*/
			}, 
			schema: {model: {id: "sl", fields: fs}},
			aggregate: agr,
			pageSize: ps
		}, 
		height: h, 
		scrollable: {
			virtual: true
		}, 
		filterable: true, 
		sortable: true, 
		pageable: true, 
		columns: c, 
		editable: "popup"
	});
}
function _uiGridDetails(basehtml, eleid, geturl){
	$("#ws-explore").html(basehtml);	
}
function _commentsPush(ele, conv, conv_theme, top, title, comment, datetime){
	if(top){
		$("#"+ele).prepend('<div class="'+conv+'"><p class="'+conv_theme+'"><big>'+title+'</big><span>'+unescape(comment)+'</span><small>'+datetime+'</small></p></div>');
	}else{
		$("#"+ele).append('<div class="'+conv+'"><p class="'+conv_theme+'"><big>'+title+'</big><span>'+unescape(comment)+'</span><small>'+datetime+'</small></p></div>');
	}
	
}
function parseURL(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}












