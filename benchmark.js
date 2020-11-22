$(document).ready(function(){
	$('.footer-newsletter-form').submit(function(event){
		event.preventDefault();
		if(typeof newsletterAlertTimeout != "undefined") {
			clearTimeout(newsletterAlertTimeout);
		}
		var email = $.trim($('input[name="footer_newsletter_email"]').val());
		var emailRegEx = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		if(!emailRegEx.test(email)) {
			var alertMarkup = '<div class="alert alert-danger newsletter-alert" role="alert">Please provide a valid email address.</div>';
			$('body').prepend(alertMarkup);
			$('.newsletter-alert').fadeIn(1000).delay(2000).fadeOut(1000);
			newsletterAlertTimeout = setTimeout(function(){$('.newsletter-alert').remove();}, 4000);
		}
		else {
			$.post("mailchimp/mailchimp-request.php", {email_address: email})
				.done(function(responseData) {
					responseData = $.trim(responseData);
					if(responseData == 'success') {
						var alertMarkup = '<div class="alert alert-success newsletter-alert" role="alert">Thank you for signing up!</div>';
						$('body').prepend(alertMarkup);
						$('.newsletter-alert').fadeIn(1000).delay(2000).fadeOut(1000);
						newsletterAlertTimeout = setTimeout(function(){$('.newsletter-alert').remove();}, 4000);
					}
					else {
						var alertMarkup = '<div class="alert alert-danger newsletter-alert" role="alert">We ran into a problem when attempting to sign you up. Please try again shortly.</div>';
						$('body').prepend(alertMarkup);
						$('.newsletter-alert').fadeIn(1000).delay(2000).fadeOut(1000);
						newsletterAlertTimeout = setTimeout(function(){$('.newsletter-alert').remove();}, 4000);
					}
			});
		}
	});
	$('.header-newsletter-link').click(function(event){
		event.preventDefault();
		if($("body.blog").length){
			$('html, body').animate({
				scrollTop: $("a[name='newsletter-signup']").offset().top
			}, 500);
		}
		else{
			$('.newsletter-modal').modal();
		}
	});
	$('.newsletter-modal-close-button').click(function(event){
		event.preventDefault();
		$.modal.close();
	});
	$('.newsletter-modal-sign-up-button').click(function(event){
		event.preventDefault();
		if(typeof newsletterAlertTimeout != "undefined") {
			clearTimeout(newsletterAlertTimeout);
		}
		var email = $.trim($('input[name="newsletter_modal_email_input"]').val());
		var emailRegEx = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		if(!emailRegEx.test(email)) {
			var alertMarkup = '<div class="alert alert-danger newsletter-alert" role="alert">Please provide a valid email address.</div>';
			$('body').prepend(alertMarkup);
			$('.newsletter-alert').fadeIn(1000).delay(2000).fadeOut(1000);
			newsletterAlertTimeout = setTimeout(function(){$('.newsletter-alert').remove();}, 4000);
		}
		else {
			$.post("mailchimp/mailchimp-request.php", {email_address: email})
				.done(function(responseData) {
					responseData = $.trim(responseData);
					if(responseData == 'success') {
						var alertMarkup = '<div class="alert alert-success newsletter-alert" role="alert">Thank you for signing up!</div>';
						$('body').prepend(alertMarkup);
						$('.newsletter-alert').fadeIn(1000).delay(2000).fadeOut(1000);
						newsletterAlertTimeout = setTimeout(function(){$('.newsletter-alert').remove();}, 4000);
						$.modal.close();
					}
					else {
						var alertMarkup = '<div class="alert alert-danger newsletter-alert" role="alert">We ran into a problem when attempting to sign you up. Please try again shortly.</div>';
						$('body').prepend(alertMarkup);
						$('.newsletter-alert').fadeIn(1000).delay(2000).fadeOut(1000);
						newsletterAlertTimeout = setTimeout(function(){$('.newsletter-alert').remove();}, 4000);
					}
			});
		}
	});
	//Category Page Scroll Call To Action
	$('.category-page-scroll-call-to-action img, .category-page-scroll-call-to-action-mobile img').click(function(event){
		event.preventDefault();
		if($('#js-product-list').length > 0) {
			$('html, body').animate({
				scrollTop: $("#js-product-list").offset().top
			}, 500);
		}
	});
});