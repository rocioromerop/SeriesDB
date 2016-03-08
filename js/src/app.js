$(document).ready(function(){ //Cuando la página se ha cargado por completo
	//Ponemos el foco en el primer input
	$(".auto-focus").focus();	

	$("form").on("submit", function(){ //Cuando se intente enviar el formulario

		// validación del título
		var title = $.trim($("#title").val());
		if(title == ""){
			alert("El título no puede estar vacío");
			return false; 
		}

		// validación de url
		var url=$.trim($("#cover_url").val());

		var pattern=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;

		if(url != "" && pattern.test(url) == false){
			alert("La url de la carátula no es válida");
			return false;
		}

		// validacion categorias

		var selectedCategories = $('input[name="category"]:checked');
		if(selectedCategories.size() == 0){
			alert("Selecciona al menos una categoría");
			return false;
		}

		// petición ajax en jquery: configurarla y lanzarla, es asíncrono.
		$.ajax({ // Se envía oculto
			method: 'post',
			url:"/api/series/", // a qué url hacemos la petición
			data: JSON.stringify({ 
				title: title,
				url: url
			}),
			contentType: 'application/json',
			
			success: function(){ // qué quiero que pase cuando la petición va bien
				reloadSeries();
				alert("Guardado con éxito");
			},
			error: function(){ // qué quiero que paso cuando la petición no va bien
				alert("Se ha producido un error");
			}
		});

		return false; // no permito envío del formulario
	});

	function reloadSeries(){
		$.ajax({
			url: "/api/series/",
			method:'get',
			success: function(data){
				console.log("Series recuperadas", data);
				var html="";
				for (var i in data){
					var id=data[i].id;
					var title = data[i].title;
					var url = data[i].url || "";
					html += "<li>";
					html += title;
					if(url.length>0){
						html += " ("+url+")";
					}
					html += '<button data-serieid="'+ id + '">Eliminar</button>';
					html += "</li>";
				}
				$("#seriesList").html(html); // innerHTML=html
			}
		});
	}

	$("#reloadSeriesButton").on("click", reloadSeries);

	reloadSeries();

	//MANEJADOR DE EVENTOS A COSAS QUE PASARÁN EN EL FUTURO (HABRÁ BUTTON):
	$("#seriesList").on("click", "button", function(){ //Cuando tengas botones dentro, dale este evento: Ejecuta cuando su hijo matchs "button"
		console.log("ELIMINO LA SERIE");
		var self = this;
		var id = $(self).data("serieid"); //cojo el valor de serieid del atributo data-serieid del botón
		
		$.ajax({
			url:"/api/series/" + id,
			method: "delete",
			success: function(){
				$(self).parent().remove();
			}

		});
	});


});