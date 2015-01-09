$(document).on( 'ready', function() {
	var formdata = false;

	//To move the image with mouse
	$(".image").draggable();

	function readURL(input) {

	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('.image').attr('src', e.target.result);
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#picture").change(function(){
	    readURL(this);
	});
	
	$("#uploader").change(function() {
		new image;
	});

	$("#target").submit(function(e){
		//Prevent automatic behaviour (redirection)
		e.preventDefault();

		$(".invisible").fadeOut();
		$(".invisible").html("");
		$(".invisible").html("<img src=\"images/loader.gif\" alt=\"Loading...\">");
		$(".invisible").fadeIn();

		//Get position and the source of the image
		var pos_image = $(".image").position();
		var src_image = $(".image").attr("src");

		//On calcule le décalage avec le cadre
		var new_left = pos_image.left - 104;
		var new_top = pos_image.top - 90;

		$("#left").val(new_left);
		$("#top").val(new_top);

		var formdata = new FormData(this);
		
		console.log(pos_image.top + " " + pos_image.left);
		console.log(new_top + " " + new_left);

		$.ajax({
			url: "upload.php",
			type: "POST",
			cache: false,
            contentType: false,
            processData: false,
			data: formdata,
			success: function(result) {
				$(".invisible img").fadeOut().remove();
				$(".invisible").html("<h2>Your new cropped image : </h2><img src=\"" + result + "\" alt=\"New cropped image\" id=\"result\" /><div id=\"url\"><a href=\"" + result + "\" download>Download Image</a></div>");
				console.log(result);
				$(".invisible").fadeIn();
			}
		});
	});
});