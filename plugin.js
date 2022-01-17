(function($) {
  $.fn.changeSlide = function(options) {
    var settings = $.extend(
      {
        interval: 0,
        autoplay: false,
        loop: false
      },
      options
    );

    var inter;
    var thisImg = $(this);
    
    $(this).append("<div class='dots'></div>");

    for (var x = 0; x < this.size(); x++) {
      $(this).eq(x).append("<div class='numbersContainer'><span class='number'> 1 / " + $(this).eq(x).find('img').size() +"</span></div>");

      for (var y = 0; y < $(this).eq(x).find('img').size(); y++) {
        $(".dots:eq("+x+")").append("<div class='dot'></dot>");
      } 
    }

    $(this).append("<span class='prev'>&#10094;</span> <span class='next'>&#10095;</span>");

    for (var j = 0; j < $(".dots").size(); j++) {
      $(".dots:eq("+j+")").children().eq(0).addClass('active');
    }

    $('.dot').on('click', function () {
      
      var current = $(this).index();

      $(this).addClass("active");
      $(this).prevAll().removeClass("active");
      $(this).nextAll().removeClass("active");

      $(this).parent().parent().find('.numbersContainer').text( ($(this).index() + 1) + " / " + $(this).parent().parent().find('img').size() );

      $(this).parent().parent().find('img').eq(current).addClass("active");

      $(this).parent().parent().find('img').eq(current).prevAll().removeClass("active");

      $(this).parent().parent().find('img').eq(current).nextAll().removeClass("active");

      clearInterval(inter);
      setInterval(move());

    })

    for (var spanEq = 0; spanEq < this.size(); spanEq++) {

      $(this).find("span.next").eq(spanEq).on('click', function () {

        if ($(this).parent().find('img.active').attr("src") == $(this).parent().find('img').last().attr('src')) {
          $(this).parent().find('img:eq(0)').addClass('active');
          $(this).parent().find('img').last().removeClass('active');
        } else {
          $(this).parent().find('img').eq($(this).parent().find('img.active').index()).removeClass('active').next().addClass('active');
        }

        $(this).parent().find('div.numbersContainer').text($(this).parent().find('img.active').index() + 1+" / "+$(this).parent().find('img').size());

        $(this).parent().find('.dot').eq($(this).parent().find('img.active').index()).addClass("active");
        $(this).parent().find('.dot').eq($(this).parent().find('img.active').index() - 1).removeClass("active");

        clearInterval(inter);
        setInterval(move());
      })

      $(this).find("span.prev").eq(spanEq).on('click',function () {
        if ($(this).parent().find('img.active').attr('src') == "./img/1.jpg"){
          $(this).parent().find('img').eq(0).removeClass('active');
          $(this).parent().find('img').last().addClass('active');
        } else {
          $(this).parent().find('img').eq($(this).parent().find('img.active').index()).removeClass('active').prev().addClass('active');
        }

        $(this).parent().find('div.numbersContainer').text($(this).parent().find('img.active').index() + 1+" / "+$(this).parent().find('img').size());

        $(this).parent().find('.dot').eq($(this).parent().find('img.active').index()).addClass("active");
        $(this).parent().find('.dot').eq($(this).parent().find('img.active').index() + 1).removeClass("active");      

        if ($(this).parent().find('img.active').index() + 1 == $(this).parent().find('img').size()) {
          $(this).parent().find('.dot').eq(0).removeClass("active");
        }

        clearInterval(inter);
        setInterval(move());

      })
    }

    if (settings.autoplay) {
      function move () {
        inter = setInterval(() => {

            for (var spanEq = 0; spanEq < thisImg.size(); spanEq++) {
              if (settings.loop) {
                if (thisImg.eq(spanEq).find('img.active').attr("src") == thisImg.eq(spanEq).find('img').last().attr('src')) {
                  thisImg.eq(spanEq).find('img:eq(0)').addClass('active');
                  thisImg.eq(spanEq).find('img').last().removeClass('active');
                } else {
                  thisImg.eq(spanEq).find('img').eq(thisImg.eq(spanEq).find('img.active').index()).removeClass('active').next().addClass('active');
                }
            } else {
              if (thisImg.eq(spanEq).find('img.active').attr("src") == thisImg.eq(spanEq).find('img').last().attr('src')) {
                clearInterval(inter);
              } else {
                thisImg.eq(spanEq).find('img').eq(thisImg.eq(spanEq).find('img.active').index()).removeClass('active').next().addClass('active');
              }
            }

            thisImg.eq(spanEq).find('.dot').eq(thisImg.eq(spanEq).find('img.active').index()).addClass("active");
            thisImg.eq(spanEq).find('.dot').eq(thisImg.eq(spanEq).find('img.active').index() - 1).removeClass("active");
            thisImg.eq(spanEq).find('div.numbersContainer').text(thisImg.eq(spanEq  ).find('img.active').index() + 1+" / "+thisImg.eq(spanEq).find('img').size());
          } 
        }, settings.interval)
      }
      
      move();
       
    }

  };
})(jQuery);
