window.onload = function() {
	var prev = document.getElementsByClassName('prev')[0],
		next = document.getElementsByClassName('next')[0],
		slider = document.getElementsByClassName('slider')[0],
		sliderImg = slider.getElementsByClassName('slider-img');

// Предыдущий слайд
	prev.addEventListener('click', function(e){
		slideOn(-1);
	})
// Следующий слайд
	next.addEventListener('click', function(e){
		slideOn(1);
	})

// Смена слайдов
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

// Автоматическая смена слайдов
	setInterval(function(){
		slideOn(1)
	}, 6000)
}
