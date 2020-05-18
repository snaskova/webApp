var viewModel;

$(document).ready(function () {

	viewModel = {
		data: undefined,
		openItemToggle: function (e) {
			e.stopPropagation();

			let itemId = e.currentTarget.closest('.card').id - 1;

			let currentItem = {
				content: viewModel.data[itemId].content,
				taste: viewModel.data[itemId].taste,
				nutritionLevel: viewModel.data[itemId].nutritionLevel,
				sweetness: viewModel.data[itemId].sweetness,
				name: viewModel.data[itemId].title,
				species: viewModel.data[itemId].species
			}

			let output = `<div class="info-title"><h3>${currentItem.name}</h3><span class="species">${currentItem.species}</span></div><div class="quick-info-wrap"><p class="quick-info">Taste <span>${currentItem.taste}</span></p><p class="quick-info">Nutrition Level <span>${currentItem.nutritionLevel}</span></p><p class="quick-info">Sweetness <span>${currentItem.sweetness}</span></p></div><p class="content">${currentItem.content}</p>`;


			document.getElementById('info-container').innerHTML = output;

			$('#popup-overlay').css({ 'display': 'block', 'opacity': '1' });
		},
		pickItemToggle: function (event) {
			$(event.currentTarget).toggleClass('is-selected');
		}
	};


	// CREATE CARD ITEM
	function createItem(item) {
		let result = `<div class="card" id="${item.id}"><span class="checkmark"></span><img src="images/${item.image}" alt="${item.title}"><p class="price">${item.price}</p><div class="title-wrap"><h3 class="title">${item.title}</h3><a href="#/" class="more-info">More info</a></div></div>`;
		return result;
	}


	// GET INFO FROM JSON AND CREATE ITEMS
	function getInfo(json) {
		let result = "";
		json.data.forEach((item, i) => {
			result += createItem(item);
			document.getElementById('content').innerHTML = result;
		})
	}

	//  CLOSE POPUP ON BUTTON CLICK OR OUTSIDE OF POPUP CLICK
	$('body').click('#close', e => {
		if ($(e.target).attr('id') === 'popup-overlay' || $(e.target).attr('id') === 'close') {
			$('#popup-overlay').css({ 'display': 'none', 'opacity': '0' });
		}
	});

	$.getJSON("data.js", function (data) {
		viewModel.data = data;
		getInfo(viewModel)
	});


	$("#content").on('click', '.card', (e) => {
		viewModel.pickItemToggle(e);
	})

	$('#content').on('click', ".more-info", e => {
		viewModel.openItemToggle(e);
	});



	// ---------------------------------------------------------------------



	// A partial example rendering and interaction of the fruit - this should be replaced by your implemenation.

	// var renderView = function (viewModel) {
	// 	var items = [];

	// 	$.each(viewModel.data, function (index, d) {
	// 		items.push("<li id='" + d.id + "' onclick='viewModel.openItemToggle(event)'><h2>" + d.title + "</h2>" + d.content + "<img src=\"images/" + d.image + "\" /><p>Price: " + d.price + "</p><p>Taste Rating: " + d.taste + "</p></li>");
	// 	});


	// 	$("<ul/>", {
	// 		"class": "fruit-list", html: items.join("")
	// 	}).appendTo("#content");
	// };

	// $.getJSON("data.txt", function (data) {
	// 	viewModel.data = data;
	// 	renderView(viewModel);
	// });


});


