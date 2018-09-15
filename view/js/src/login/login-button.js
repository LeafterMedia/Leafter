(function($) {	

	$('.LeafBtn').click(function() {
		return openLoginForm();
	});

	$('.message a').click(function(){
	   	return toggleForm();
	});

	function openLoginForm(){
		$(".LeafBtn").addClass("particle");
		setTimeout(function(){ 
			$(".app").addClass("full");
			document.getElementById("DaForm").style.display = "block";
		}, 2000);
	}

	function toggleForm(){
		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	}

})(jQuery);