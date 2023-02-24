$('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
  
        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1000, 'easeOutCubic'); //숫자는 스크롤 되는 시간, ease머시기는 효과
  
        return false;
      }
    }
  });