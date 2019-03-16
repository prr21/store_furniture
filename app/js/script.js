window.addEventListener('DOMContentLoaded', () => {

    const loadProducts = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createProduct(json.products_kitchen))
    
        callback();
    }

    // Вызов загрузки товаров из json файла
    loadProducts('js/products.json', defaultScript);
})

function createProduct(products){
	let productsDiv = document.querySelector('.products');

    products.forEach(item => {
        let card = document.createElement('div');

        card.classList.add('col-3');
        
        card.innerHTML = `
           		<div class="product-item" data-toggle="modal" data-target="#modal-1">
					<div class="product-img">
						<img src="${item.url}" alt="">
					</div>
					<div class="product-description d-flex justify-content-between align-items-center">
						<div class="product-name">${item.title}</div>
						<div class="product-price">${item.id}$</div>
					</div>
				</div>
			</div>`

        productsDiv.appendChild(card)
    });
}

function defaultScript(){
	var prev = document.getElementsByClassName('prev')[0],
		next = document.getElementsByClassName('next')[0],
		slider = document.getElementsByClassName('slider')[0],
		products = document.querySelector('.products'),
		descriptions = document.querySelectorAll('.product-description'),
		sliderImg = slider.getElementsByClassName('slider-img');

	//Предыдущий слайд
	prev.addEventListener('click', function(e){
		slideOn(-1);
	})
	//Следующий слайд
	next.addEventListener('click', function(e){
		slideOn(1);
	})

	//Смена слайдов
	function slideOn(index){
		for(let i = 0; i < sliderImg.length; i++){
			if (sliderImg[i].classList.contains('show')) {
				sliderImg[i].classList.remove('show');

				let curSlide = i + index;

				if (curSlide <= -1) {
					curSlide = sliderImg.length - 1;
				} else if (curSlide >= sliderImg.length) {
					curSlide = 0;
				}

				sliderImg[curSlide].classList.add('show')
				return true;
			}
		}
	}

	//Автоматическая смена слайдов
	setInterval(function(){
		slideOn(1)
	}, 6000)

	// Сокращение названий
	descriptions.forEach((item) => {
        if (item.textContent.length > 35) {
        	let title = item.querySelector('.product-name')
            title.textContent = title.textContent.slice(0,35) + '...';
        } 
    })

	// Загрузка информации о товаре по клику
	/*products.addEventListener('click', (e) => {
		if (e.target.className == 'product-item') {
			
		}
	})*/
}