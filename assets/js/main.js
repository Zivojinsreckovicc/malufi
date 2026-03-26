(function ($) {
  "use strict";

  $(document).ready(function () {

    $('.toggle-mobileMenu').on('click', function () {
      $('.mobile-menu').addClass('active');
      $('.side-overlay').addClass('show');
      $('body').addClass('scroll-hide-sm');
    });

    $('.close-button, .side-overlay').on('click', function () {
      $('.mobile-menu').removeClass('active');
      $('.side-overlay').removeClass('show');
      $('body').removeClass('scroll-hide-sm');
    });

    var windowWidth = $(window).width();

    $('.has-submenu').on('click', function () {
      var thisItem = $(this);

      if (windowWidth < 992) {
        if (thisItem.hasClass('active')) {
          thisItem.removeClass('active');
        } else {
          $('.has-submenu').removeClass('active');
          $(thisItem).addClass('active');
        }

        var submenu = thisItem.find('.nav-submenu');

        $('.nav-submenu').not(submenu).slideUp(300);
        submenu.slideToggle(300);
      }
    });

    $('.offcanvas-btn').on('click', function () {
      $('.common-offcanvas').addClass('active');
      $('.side-overlay').addClass('show');
      $('body').addClass('scroll-hide');
    });

    $('.close-button, .side-overlay').on('click', function () {
      $('.common-offcanvas').removeClass('active');
      $('.side-overlay').removeClass('show');
      $('body').removeClass('scroll-hide');
    });

    var progressPath = document.querySelector('.progress-wrap path');
    if (progressPath) {
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      $(window).scroll(updateProgress);
      var offset = 50;
      var duration = 550;
      jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
          jQuery('.progress-wrap').addClass('active-progress');
        } else {
          jQuery('.progress-wrap').removeClass('active-progress');
        }
      });
      jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
      });
    }

    if (typeof Swiper !== 'undefined' && document.querySelector('.banner-9-active')) {
      new Swiper('.banner-9-active', {
        speed: 1500,
        loop: false,
        slidesPerView: 1,
        autoplay: false,
        effect: 'fade',
      });
    }

    if (typeof Swiper !== 'undefined' && document.querySelector('.brand-9-active')) {
      new Swiper('.brand-9-active', {
        slidesPerView: 4,
        spaceBetween: 100,
        loop: true,
        speed: 3000,
        autoplay: true,
        centeredSlides: true,
        breakpoints: {
          1200: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 2,
          },
        },
      });
    }

    $(document).on('click', '.col-custom', function () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        $('.col-custom').removeClass('active');
        $(this).addClass('active');
      }
    });

    function mediaSize() {
      if (!window.matchMedia('(min-width: 768px)').matches) {
        $('.col-custom').addClass('active');
      }
    }
    mediaSize();
    window.addEventListener('resize', mediaSize, false);

    if (typeof $.fn.slick !== 'undefined' && $('.testimonial-9-content-active').length) {
      $('.testimonial-9-content-active').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
        rtl: $('html').attr('dir') === 'rtl',
        fade: false,
        asNavFor: '.testimonial-9-item-active',
      });
      $('.testimonial-9-item-active').slick({
        slidesToShow: 3,
        slidesToScroll: false,
        asNavFor: '.testimonial-9-content-active',
        dots: false,
        draggable: false,
        arrows: false,
        vertical: false,
        focusOnSelect: true,
        centerPadding: '0',
        centerMode: true,
        speed: 3500,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    $('.h9-hover-btn').on('mouseenter', function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).find('.h9-hover-btn-circle-dot').css({
        top: y,
        left: x,
      });
    });
    $('.h9-hover-btn').on('mouseout', function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).find('.h9-hover-btn-circle-dot').css({
        top: y,
        left: x,
      });
    });

    $('.h9-search-popup').on('click', function () {
      $('.search_popup').addClass('search-opened');
      $('.search-popup-overlay').addClass('search-popup-overlay-open');
    });
    $('.search_close_btn').on('click', function () {
      $('.search_popup').removeClass('search-opened');
      $('.search-popup-overlay').removeClass('search-popup-overlay-open');
    });
    $('.search-popup-overlay').on('click', function () {
      $('.search_popup').removeClass('search-opened');
      $(this).removeClass('search-popup-overlay-open');
    });

    if (window.counterUp && window.counterUp.default) {
      const counterUp = window.counterUp.default;

      const callback = function (entries) {
        entries.forEach(function (entry) {
          const el = entry.target;
          if (entry.isIntersecting && !el.classList.contains('is-visible')) {
            counterUp(el, {
              duration: 2000,
              delay: 16,
            });
            el.classList.add('is-visible');
          }
        });
      };

      const IO = new IntersectionObserver(callback, { threshold: 1 });

      document.querySelectorAll('.counterNumber').forEach(function (el) {
        IO.observe(el);
      });
      document.querySelectorAll('.counter-three-item__number').forEach(function (el) {
        IO.observe(el);
      });
      document.querySelectorAll('.project-content__number').forEach(function (el) {
        IO.observe(el);
      });
    }

    function dynamicActiveMenuClass(selector) {
      var FileName = window.location.pathname.split('/').reverse()[0];

      if (FileName === '' || FileName === 'index.html') {
        selector.find('li.nav-menu__item.has-submenu').eq(0).addClass('activePage');
      } else {
        selector.find('li').removeClass('activePage');

        selector.find('li').each(function () {
          var anchor = $(this).find('a');
          if ($(anchor).attr('href') == FileName) {
            $(this).addClass('activePage');
          }
        });

        selector.children('li').each(function () {
          if ($(this).find('.activePage').length) {
            $(this).addClass('activePage');
          }
        });
      }
    }

    if ($('ul').length) {
      dynamicActiveMenuClass($('ul'));
    }

    $('.background-img').css('background', function () {
      var bg = 'url(' + $(this).data('background-image') + ')';
      return bg;
    });

    $(document).on('click', function (event) {
      if (!$(event.target).closest('.social-share').length && !$(event.target).closest('.social-share__button').length) {
        $('.social-share-list').removeClass('active');
        $('.social-share__button').removeClass('active');
      }
    });

    $('.social-share__button').on('click', function () {
      $('.social-share__button').not($(this)).removeClass('active');
      $(this).toggleClass('active');
      $('.social-share-list').not($(this).siblings('.social-share-list')).removeClass('active');
      $(this).siblings('.social-share-list').toggleClass('active');
    });

    $('.floating-chat__icon').on('click', function () {
      $('.floating-chat').toggleClass('active');
    });

    $('.floating-chat__close').on('click', function () {
      $('.floating-chat').removeClass('active');
    });
  });

  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 260) {
      $('.header').addClass('fixed-header');
    } else {
      $('.header').removeClass('fixed-header');
    }
  });

})(jQuery);
