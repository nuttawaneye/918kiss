//BASIC
//////////////////

//RESPONSIVE SLICK
$('.responsive-slick .slider').slick({
    dots: true,
    responsive: [{
      breakpoint: 500,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }]
  });
  
  //VERTICAL MODE
  $('.vertical-mode .slider').slick({
    dots: true,
    slidesToShow: 3,
    vertical: true,
  });
  
  //CENTER MODE
  $('.center-mode .slider').slick({
    dots: true,
    slidesToShow: 3,
    centerMode: true,
  });
  
  //VARIBALE WIDTH MODE
  $('.variable-width-mode .slider').slick({
    dots: true,
    slidesToShow: 3,
    variableWidth: true,
  });
  
  //LAZYLOAD ON DEMAND MODE
  $('.lazyload-mode .slider').slick({
    dots: true,
    slidesToShow: 3,
    lazyLoad: 'onDemand',
  });
  
  //SLIDE/SCROLL
  //////////////////
  $('.slick-1-2 .slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 2,
  });
  
  $('.slick-1-3 .slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 3,
  });
  
  $('.slick-2-2 .slider').slick({
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 2,
  });
  
  $('.slick-2-3 .slider').slick({
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 3,
  });
  
  $('.slick-2-4 .slider').slick({
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 4,
  });
  
  $('.slick-5-1 .slider').slick({
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
  });
  
  $('.slick-9-1 .slider').slick({
    dots: true,
    slidesToShow: 9,
    slidesToScroll: 1,
  });
  
  $('.slick-9-2 .slider').slick({
    dots: true,
    slidesToShow: 9,
    slidesToScroll: 2,
  });
  
  //SPECIAL
  //////////////////
  
  //CENTER MODE AND AS NAV FOR
  $(".centerMode-asNavFor .slider.thumbs").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.centerMode-asNavFor .slider.text',
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true
  });
  $(".centerMode-asNavFor .slider.text").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.centerMode-asNavFor .slider.thumbs'
  });
  
  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    $(e.target).find('.slider').each(function() {
      $(this).slick('setPosition');
    })
  })