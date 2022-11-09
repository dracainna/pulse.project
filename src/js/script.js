$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevronLeft.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevronRight.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                    unslick: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          })
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // function onEntry(entry) {
      //   entry.forEach(change => {
      //     if (change.isIntersecting) {
      //       change.target.classList.add('.reviews-show');
      //     }
      //   });
      // }
      // let options = { threshold: [0.5] };
      // let observer = new IntersectionObserver(onEntry, options);
      // let elements = document.querySelectorAll('.reviews-animation');
      // for (let elm of elements) {
      //   observer.observe(elm);
      // }
      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut();
      });
      // $('.button_mini').on('click', function() {
      //   $('.overlay, #order').fadeIn();
      // });
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn();
        });
      });
      
      // $('#consultation-form').validate();
      // $('#consultation form').validate({
      //   rules: {  
      //     name: "required",
      //     phone: "required",
      //     email: {
      //       required: true,
      //       email: true
      //     }
      //   },
      //   messages: {
      //     name: "Пожалуйста, введите своё имя",
      //     phone: "Пожалуйста, введите свой телефон",
      //     email: {
      //       required: "Пожалуйста, введите свою почту",
      //       email: "Неправильно введена почта",
      //     } 
      //   }
      // });
      // $('#order form').validate();

      function validateForms(form){
        $(form).validate({
          rules: {  
            name: "required",
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: "Пожалуйста, введите своё имя",
            phone: "Пожалуйста, введите свой телефон",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введена почта",
            } 
          }
        }); 
      }

      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      document.addEventListener("DOMContentLoaded", function() { // используем событие загрузки страницы, не включая картинки и прочее
        let iframes = document.querySelectorAll('.iframeAdaptive');
        iframes.forEach(function(i) { // перебираем имеющиеся Iframe с присвоенным нами классом
            let iframeWidth = i.width; // берём из атрибута width ширину
            let iframeHeight = i.height; // берём из атрибута height высоту
            let iframeParent = i.parentNode; // определяем родительский элемент нашего Iframe
            let parentWidth = parseInt(getComputedStyle(iframeParent)['width'])-parseInt(getComputedStyle(iframeParent)['padding-left'])-parseInt(getComputedStyle(iframeParent)['padding-right']); // берём родительский контейнер и высчитываем нужную нам ширину, без учёта padding, margin и border
            let iframeProportion = parentWidth / iframeWidth;
            i.setAttribute('width', parentWidth); // устанавливаем ширину нашим Iframe
            i.setAttribute('height', iframeHeight * iframeProportion); // устанавливаем высоту нашим Iframe
        });
    });

    
    $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    };
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 900) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

new WOW().init();
  });