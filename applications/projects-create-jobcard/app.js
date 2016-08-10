$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Upload Jobcard</h2><p>Upload your files for jobcard, this is required to start your project.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"><ul class="fieldlist"><li><label for="u_Files">Files</label><a class="k-button k-primary" target="_blank" href="https://drive.google.com/drive/folders/'+window.currentDataItem7+'">Open Folder</a></li><li><button id="ws-112345-01" type="button" class="k-button k-primary">Finish</button></li></ul><style>.fieldlist {margin: 10px 0; padding: 0;} .fieldlist li {list-style: none;} .fieldlist label {display: block; padding-bottom: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444;}</style></div></div></div>');

	$("#ws-112345-01").click(function(){
		window.currentDataItem7 = '';
		_navMenuList(window.currentDataItem8);
	});


