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

		// petición ajax en jquery
		$.ajax({
			url:"/api/series/",
			data: JSON.stringify({
				title: title,
				url: url
			}),
			dataType: 'json',
			contentType: 'application/json',
			method: 'post',
			success: function(){
				alert("Guardado con éxito");
			},
			error: function(){
				alert("Se ha producido un error");
			}
		});

		return false; // no permito envío del formulario
	});
});