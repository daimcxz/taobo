
var swiper = new Swiper('#swiper1', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

var swiper = new Swiper('#swiper2', {
    spaceBetween: 30,
    centeredSlides: true,
    // loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });



// var imageList = document.getElementById("image-list");

// $(document).mousemove(function(){
//   $(imageList).find("p").css({"color":"red"})
// })
  	// var arr = [1,2,3,4,5,6,7,8,9,10];
  	// function randSort1(arr){
  	// 	for(var i = 0,len = arr.length;i < len; i++ ){
  	// 		var rand = parseInt(Math.random()*len);
  	// 		var temp = arr[rand];
  	// 		arr[rand] = arr[i];
  	// 		arr[i] = temp;
  	// 	}
  	// 	return arr;
  	// }
    // console.log(randSort1(arr));
    

    // var arr = [1,2,3,4,5,6,7,8,9,10];
  	// arr.sort(function(){
  	// 	return Math.random() - 0.5;
  	// })
  	// console.log(arr);