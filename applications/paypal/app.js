$("#ws-explore").html('<div class="row"><div class="col-md-12"><h2>PayPal</h2><p>Just click pay button to pay. For any Problem contact us.</p></div></div><div class="row"><div class="col-md-12"><div id="ws-ui-112345"><ul class="fieldlist"><li><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="ukchinmoy@gmail.com"><input type="hidden" name="lc" value="IN"><input type="hidden" name="item_name" value="Invoice Payment"><input type="hidden" name="item_number" id="Paypal_ID"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="currency_code" id="Paypal_CURR"><input type="hidden" name="amount" id="Paypal_Amount"><input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest"><button type="submiy" class="btn btn-primary" name="submit" class="k-button k-primary">Pay now with PayPal</button></form></li></ul><style>.fieldlist {margin: 10px 0; padding: 0;} .fieldlist li {list-style: none;} .fieldlist label {display: block; padding-bottom: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444;}</style></div></div></div>');

	if(typeof window.sessionStorage.getItem("currentDataPaypal") != "undefined"){
	var currentDataPaypal = JSON.parse(window.sessionStorage.getItem("currentDataPaypal"));
		if(currentDataPaypal != null){
			document.getElementById("Paypal_ID").value = currentDataPaypal[0];
			document.getElementById("Paypal_CURR").value = currentDataPaypal[1];
			document.getElementById("Paypal_Amount").value = currentDataPaypal[2];		
		}else{
			_msg('Error! Something is wrong, please close and try again');
		}
	}else{
		_msg('Error! Something is wrong, please close and try again');
	}
