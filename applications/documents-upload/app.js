$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>Upload Documents</h2><p>Upload your documents, just click open folder bellow.</p><p>1. Photo ID Proof [i.e Voter ID or Adhar Card or Passport or Driving Licence]</p><p>2. Passport Size Color Photo.</p><p>3. PAN Card.</p><p>4. Blood Group Medical Report. [If You Do Not Have Please Upload a Consect Letter.]</p><p>5. Last Academic Qualification.</p><p>6. Bank Details.</p><p>&nbsp;</p><p id="ws-ui-112346">Loading permission...</p></div></div><div class="row"><div class="col-md-12"></div></div>');

if(window.authUser[0].Documents == ''){
	$("#ws-ui-112346").html('Sorry, Your documents are locked!');
}else{
	if(window.authUser[0].DocLock == 'Locked'){
		$("#ws-ui-112346").html('Sorry, Your documents are locked!');		
	}else{
		$("#ws-ui-112346").html('<a href="https://drive.google.com/drive/folders/'+window.authUser[0].Documents+'" target="_blank" class="k-button k-primary">Open Folder</a>');
	}
}