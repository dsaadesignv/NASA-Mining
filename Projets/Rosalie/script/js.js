
$(document).ready(function(){ //quand le chargement de la photo/api tout ça est fait, c'est ready
	var camera;
	var date;

	var loaded = false; //tant que rien n'est fait de particulier, la variable loaded BOOLEENE est fausse

    // AU CLIC SUR VALIDATE ON PASSE A L'ETAPE 3 ET ON APPELLE LA DATE
	$('#validate').on("click",function(){		
		$("#etape2").removeClass("visible").addClass("invisible");
		$("#etape3").removeClass("invisible").addClass("visible");
		date = document.getElementById("date").value;  //il prend en compte la valeur date, et on en prend la valeur (vu qu'on demande un chiffre)
		getImage(date); //on fait la fonction avec la valeur date
		document.getElementById("date").value = "";
	});

	//AU CLIC SUR ENTRER ON PASSE A L'ETAPE 2 ET ON APPELLE LA CAMERA
	$('#enter').on("click",function(){
		camera = $('input[name=camera]:checked').val();
		console.log(camera);
		$("#etape1").addClass("invisible");
		$("#etape2").removeClass("invisible").addClass("visible");
	});
     
	// FERMER LE POPUP DES PHOTO DE CURIOSITY
	$("#close-popup-img").on("click",function(){
		$(".imagecurio")
			.addClass("invisible")
			.removeClass("visible");
		$("#popup-img")
			.addClass("invisible")
			.removeClass("visible");
	});

	//APPELER L'API
	function getImage(date){ //la fonction getImage invoque l'API selon la variable DATE, et intègre à l'intérieur la fonction(data)
		$.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol="+date+"&camera="+camera+"&api_key=N98tqh7UvnKUFb1HGo2qrT5oFK1LaO5yXf7zEage")
			.done(function(data){
				console.log( "data.photos.length:", data.photos.length );
				if( data.photos.length == 0){ // MESSAGE D'ERREUR SI IL Y A PAS D'IMAGE
					$("#pas-image").removeClass("invisible").addClass("visible");
				}
				else{
					$.each( data.photos, function( i, photo ) { 
						// if( 470 + i * 600 < window.innerWidth ){
		            		$( "<img>" )
			            		.attr( "src", "boutons/bouton.png")
			            		.addClass( "bouton")
			            		.css({"top":480+"px","left":470+(i*600)+"px"})
			            		.attr("data-url",photo.img_src)
			            		.appendTo("body");
		            		// ajout d'un élément image avec attribut src
							loaded = true; //une fois que la fonction get Image est executée, la variable prend la valeur true
							$('.bouton').on("click",function(){
							   	var url = $(this).data("url");
						    	$(".imagecurio")
						    		.addClass("visible")
						    		.removeClass("invisible")
						    		.attr("src",url);
						    		console.log(url);

						    	$("#popup-img")
		                            .addClass('visible')
		                            .removeClass('invisible'); 
						    });
						// }
					});
				}
			})
			.error(function(error){ //affiche 'error' dans la console lorsque le site rencontre une erreur
				$("#pas-image").removeClass("invisible").addClass("visible"); //MESSAGE SI IL Y A UNE ERREUR
			});
	}

		console.log("ready");//une fois que c'est ready, la console l'affiche 
		
		//POUR QUE LE FOND SOIT A LA BONNE DIMENSION
		$('body').css({'height':window.innerHeight+'px','max-height':window.innerHeight+'px'});
		$('#backgroundImg').css({'height':window.innerHeight+'px'});
		// $('body').css({'width': $('#backgroundImg').width'px'});

		//getImage(800); 

});

