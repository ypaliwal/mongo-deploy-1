(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($state, $http, dbSrv) {
		var homeVm = this;

		// Public functions
		homeVm.populate = populate;
		homeVm.deleteCar = deleteCar;
		homeVm.addCar = addCar;
		homeVm.exData = exData;
		homeVm.updateCar = updateCar;
		homeVm.updateCarAct = updateCarAct;

		// Public variables

		// GET METHOD to get ALL cars
		$http.get("cars")
		.then(function(res) {
			populate(res.data);			
		}, function(err){console.log(err)});
		function populate(arr) {
			homeVm.dataArr = arr;
		}

		function deleteCar(id) {
			$http.delete("cars/" + id)
			.then(function(res) {
				console.log(res);
			}, function(err){console.log(err)});

			$state.reload();
		}

		function updateCar(id) {
			$http.get("cars/" + id)
			.then(function(res){
				homeVm.updateCarData = res.data;
				openModalwData(homeVm.updateCarData);
			})
		}
		function openModalwData(data) {
			console.log(data);

			// open the modal
			// MODAL; Click events
			var modal = document.getElementById('myModal');
			var btn = document.getElementById("myBtn");
			var span = document.getElementsByClassName("close")[0];
			modal.style.display = "block";
			span.onclick = function() {
			    modal.style.display = "none";
			}
			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
			}

			// attach the ng-models to the input forms and the data rec'd
			homeVm.modalId = data._id;
			homeVm.modalMake = data.make;
			homeVm.modalModel = data.model;
			homeVm.modalYear = data.year;
			homeVm.modalDescription = data.description;

			// homeVm.putData = {
			// 	make: homeVm.modalMake,
			// 	model: homeVm.modalModel,
			// 	year: homeVm.modalYear,
			// 	description: homeVm.modalDescription
			// };
			// $http.put("cars/" + homeVm._id, homeVm.putData, config)
			// .then(function (res) {
			// 	console.log(res);
			// }, function (err) {
			// 	console.log(err);
			// });
		}

		function updateCarAct() {
			console.log('UpdateTheCarNow');
			console.log(homeVm.modalId + ' ' + homeVm.modalMake + ' ' + homeVm.modalModel);

			console.log(Date.now());
			var req = {
				method: 'POST',
				url: 'newcar',
				data: {
					make: homeVm.modalMake,
					model: homeVm.modalModel,
					year: homeVm.modalYear,
					description: homeVm.modalDescription
				}
			}

			console.log(Date.now());
			$http(req)
			.then(
				function(res){
					console.log(res)

				},
				function(err){console.log(err)}
			);
			console.log(Date.now());
			
			homeVm.deleteCar(homeVm.modalId);

			$state.reload();





			// var updateReq = {
			// 		method: 'PUT',
			// 		url: ('cars/' + homeVm._id),
			// 		data: {
			// 			make: homeVm.modalMake,
			// 			model: homeVm.modalModel,
			// 			year: homeVm.modalYear,
			// 			description: homeVm.modalDescription
			// 		}
			// 	}

			// $http(updateReq)
			// .then(
			// 	function(res){console.log(res)},
			// 	function(err){console.log(err)});

			// homeVm.putData = {
			// 	make: homeVm.modalMake,
			// 	model: homeVm.modalModel,
			// 	year: homeVm.modalYear,
			// 	description: homeVm.modalDescription
			// };
			// $http.put("cars/" + homeVm._id, homeVm.putData)
			// .then(function (res) {
			// 	console.log(res);
			// }, function (err) {
			// 	console.log(err);
			// });
		}


		function exData() {
			var dataBit = [];

			dataBit
				.push({
					make: 'Mercedes',
					model: 'CL-Class',
					year: '2015',
					description: 'CL63 AMG, Luxury Coupe'
				});

			dataBit
				.push({
					make: 'Mercedes',
					model: 'S-Class',
					year: '2011',
					description: 'S550, Luxury Sedan'
				});

			dataBit
				.push({
					make: 'BMW',
					model: '3-Series',
					year: '2013',
					description: '335i, Sports coupe'
				});

			dataBit
				.push({
					make: 'Porsche',
					model: '911',
					year: '2015',
					description: '911 Turbo, sports coupe'
				});


			for(var i = 0; i < dataBit.length; i++) {
				var req = {
					method: 'POST',
					url: "newcar",
					data: dataBit[i]
				}


				$http(req)
				.then(
					function(res){console.log(res)},
					function(err){console.log(err)});

				setTimeout(function(){ 
					$state.reload();
					 }, 50);
				

			}

		}

		function addCar() {
			var req = {
				method: 'POST',
				url: "newcar",
				data: {
					make: homeVm.addMake,
					model: homeVm.addModel,
					year: homeVm.addYear,
					description: homeVm.addDescription
				}
			}

			$http(req)
			.then(
				function(res){console.log(res)},
				function(err){console.log(err)});

			$state.reload();

		}

	}
	
})();