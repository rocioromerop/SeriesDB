//Servicios

var APIClient = {
	baseURL: '/api/songs/',
	xhr: null, //stores the current XHR object		
	//métodos que abstraen de de dónde tome yo los datos

	currentPage: 1,
	totalSongs: 0,

	getSongs: function(successCallback, errorCallback){
		var self = this;
		$.ajax({
			url: this.baseURL,
			success: function(data){
				self.totalSongs=data.total;
				self.currentPage=data.page;
				var validData = []; //podría parsear los datos que me llegan
				for (var i in data){
					validData.push({
						id: data.id,
						title: data.songTitle,
						author: data.artist

					})
				}
				//ya tengo todo parseado, ahora..
				successCallback(validData);
			},
			error: //pasarle al cliente el error que me devuelve el servidor, traducir 404 en algo que entienda el cliente que es el que llama a la función getSongs
		})

	},

	getSong: function(songId, successCallback, errorCallback){},

	updateSong: function(songId, successCallback, errorCallback){},

	deleteSong: function(songId, successCallback, errorCallback){},

	searchSong: function(songId, successCallback, errorCallback){},

	createSong: function(song, successCallback, errorCallback){},
	
	
};