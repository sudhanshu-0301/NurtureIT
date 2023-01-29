var btnUpload = $("#upload_file"),
		btnOuter = $(".button_outer");
	btnUpload.on("change", function(e){
		var ext = btnUpload.val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			$(".error_msg").text("Not an Image...");
		} else {
			$(".error_msg").text("");
			btnOuter.addClass("file_uploading");
			setTimeout(function(){
				btnOuter.addClass("file_uploaded");
			},3000);
			var uploadedFile = URL.createObjectURL(e.target.files[0]);
			setTimeout(function(){
				$("#uploaded_view").append('<img src="'+uploadedFile+'" />').addClass("show");
			},3500);
		}
	});
	$(".file_remove").on("click", function(e){
		$("#uploaded_view").removeClass("show");
		$("#uploaded_view").find("img").remove();
		btnOuter.removeClass("file_uploading");
		btnOuter.removeClass("file_uploaded");
	});

	//predict button
	$(function() {
		$('a[href*=#]').on('click', function(e) {
		  e.preventDefault();
		  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
		});
	  });

	  /* ===== Logic for creating fake Select Boxes ===== */
$('.sel').each(function() {
	$(this).children('select').css('display', 'none');
	
	var $current = $(this);
	
	$(this).find('option').each(function(i) {
	  if (i == 0) {
		$current.prepend($('<div>', {
		  class: $current.attr('class').replace(/sel/g, 'sel__box')
		}));
		
		var placeholder = $(this).text();
		$current.prepend($('<span>', {
		  class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
		  text: placeholder,
		  'data-placeholder': placeholder
		}));
		
		return;
	  }
	  
	  $current.children('div').append($('<span>', {
		class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
		text: $(this).text()
	  }));
	});
  });
  
  // Toggling the `.active` state on the `.sel`.
  $('.sel').click(function() {
	$(this).toggleClass('active');
  });
  
  // Toggling the `.selected` state on the options.
  $('.sel__box__options').click(function() {
	var txt = $(this).text();
	var index = $(this).index();
	
	$(this).siblings('.sel__box__options').removeClass('selected');
	$(this).addClass('selected');
	
	var $currentSel = $(this).closest('.sel');
	$currentSel.children('.sel__placeholder').text(txt);
	$currentSel.children('select').prop('selectedIndex', index + 1);
  });
  


//read more
  function myFunction() {
	var dots = document.getElementById("dots");
	var moreText = document.getElementById("more");
	var btnText = document.getElementById("myBtn");
  
	if (dots.style.display === "none") {
	  dots.style.display = "inline";
	  btnText.innerHTML = "Read more";
	  moreText.style.display = "none";
	} else {
	  dots.style.display = "none";
	  btnText.innerHTML = "Read less";
	  moreText.style.display = "inline";
	}
  }