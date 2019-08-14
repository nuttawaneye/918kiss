$(window).on('load',function(){
    $('.loader-main').addClass('loader-inactive');
});

$(document).ready(function(){      
    'use strict'	
            
	function init_template(){
                        
        //Back Button Scroll Stop
        if ('scrollRestoration' in history) {history.scrollRestoration = 'manual';}
                        
		//Disable Page Jump on Empty Links.
		$('a').on('click', function(){var attrs = $(this).attr('href'); if(attrs === '#'){return false;}});
                
        //Color Switcher
        $('[data-toggle-theme]').on('click',function(){
            $('[data-toggle-theme]').addClass('no-click');
            $('body').toggleClass('theme-dark theme-light');
            setTimeout(function(){
                $('.header, .menu, body, #page, .page-content').css('transition',"");
                $('[data-toggle-theme]').removeClass('no-click');
            },200)
            return false;
        });   
        
        $('[data-toggle-theme-switch]').on('click',function(){
            $('[data-toggle-theme]').trigger('click');
        })
        
        //Detect Dark Theme
        if($('body').hasClass('theme-light')){
            $('body').find('.toggle-switch[data-toggle-theme]').addClass('toggle-off').removeClass('toggle-on');
        }  
        if($('body').hasClass('theme-dark')){
            $('body').find('.toggle-switch[data-toggle-theme]').addClass('toggle-on').removeClass('toggle-off');
        }

        
        //Menu Required Variables
        var menu = $('.menu'),
            menuFixed = $('.nav-fixed'),
            menuFooter = $('#footer-menu'),
            menuHider = $('.menu-hider'),
            menuClose = $('.close-menu'),
            header = $('.header'),
            pageAll = $('#page'),
            pageContent = $('.page-content'),
            headerAndContent = $('.header, .page-content, #footer-menu'),
            menuDeployer = $('a[data-menu]');

        //Menu System
        menu.each(function(){
            var menuHeight = $(this).data('menu-height');
            var menuWidth = $(this).data('menu-width');
            var menuLoad = $(this).data('menu-load');
            var menuActive = $(this).data('menu-active');
            if(menuLoad !== undefined){$(this).load(menuLoad);} 
            if($(this).hasClass('menu-box-right')){$(this).css("width",menuWidth);}    
            if($(this).hasClass('menu-box-left')){$(this).css("width",menuWidth);}      
            if($(this).hasClass('menu-box-bottom')){$(this).css("height",menuHeight);}  
            if($(this).hasClass('menu-box-top')){$(this).css("height",menuHeight);}           
            if($(this).hasClass('menu-box-modal')){$(this).css({"height":menuHeight, "width":menuWidth});}
        });    
        
        //Adding Background for Gradient
        if(!$('.page-bg').length){$('#page').append('<div class="page-bg"><div>');}
        
        
        //Enable this function to preload pages that are in the footer menu
        //Don't do this if your pages are very, very large.
        
//        if($('#footer-menu').length){
//            $('#footer-menu a').each(function(){
//                var footerURL = $(this).attr('href');
//                fetch(footerURL);
//            });
//            $('#footer-menu a').not('[data-menu]').on('click',function(){
//                $('#footer-menu a').removeClass('active-nav');
//                $(this).addClass('active-nav');
//            });
//        }
        
        //Search Menu Functions
        function search_menu(){
            $('[data-search]').on('keyup', function() {
                var searchVal = $(this).val();
                if (searchVal != '') {
                    $('.search-header a').removeClass('disabled');
                    $('.search-trending').addClass('disabled');
                    $('.search-results').removeClass('disabled-search-list');
                    $('[data-filter-item]').addClass('disabled-search-item');
                    $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search-item');
                } else {
                    $('.search-header a').removeClass('disabled');
                    $('.search-trending').removeClass('disabled');
                    $('.search-results').addClass('disabled-search-list');
                    $('[data-filter-item]').removeClass('disabled-search-item');
                }
                
                var search_results_error = $('.search-no-results');
                var search_results_active = $('.search-results').find('.search-result-list.disabled-search-item');
                if (search_results_active.length) {search_results_error.removeClass('disabled');}else{search_results_error.addClass('disabled');}
            });
            return false;
        }
        search_menu();
        //Menu Search Values//
        $('.search-trending a').on('click',function(){
            var e = jQuery.Event("keydown");
            e.which = 32
            $('.search-trending').addClass('disabled');
            var search_value = $(this).text().toLowerCase();
            $('.search-header a').removeClass('disabled');
            $('.search-header input').val(search_value);
            $('.search-results').removeClass('disabled-search-list');
            $('[data-filter-item]').addClass('disabled-search-item');
            $('[data-filter-item][data-filter-name*="' + search_value.toLowerCase() + '"]').removeClass('disabled-search-item');
            $('.menu-search-trending').addClass('disabled-search-item');
            return false;
        });

        $('.search-header a').on('click',function(){
            $('.search-trending').removeClass('disabled');
            $('.menu-search-trending').removeClass('disabled-search-item');
            $('.search-results').addClass('disabled-search-list');
            $('.search-header input').val('');
            $(this).addClass('disabled');
            return false;
        });

          
        menuDeployer.on('click',function(){     
            menu.removeClass('menu-active');
            menuHider.addClass('menu-active');
            
            var menuData = $(this).data('menu');
            var menuID = $('#'+menuData);
            var menuEffect = $('#'+menuData).data('menu-effect');
            var menuWidth = menuID.data('menu-width');
            var menuHeight = menuID.data('menu-height');

            if(menuID.hasClass('menu-header-clear')){menuHider.addClass('menu-active-clear');}  
            function menuActivate(){menuID = 'menu-active' ? menuID.addClass('menu-active') : menuID.removeClass('menu-active');}               
            if(menuID.hasClass('menu-box-bottom')){$('#footer-menu').addClass('footer-menu-hidden');}
            if(menuEffect === "menu-parallax"){
                if(menuID.hasClass('menu-box-bottom')){headerAndContent.css("transform", "translateY("+(menuHeight/5)*(-1)+"px)");}    
                if(menuID.hasClass('menu-box-top')){headerAndContent.css("transform", "translateY("+(menuHeight/5)+"px)");}       
                if(menuID.hasClass('menu-box-left')){headerAndContent.css("transform", "translateX("+(menuWidth/5)+"px)");}       
                if(menuID.hasClass('menu-box-right')){headerAndContent.css("transform", "translateX("+(menuWidth/5)*(-1)+"px)");}
            }    
            if(menuEffect === "menu-push"){
                if(menuID.hasClass('menu-box-bottom')){headerAndContent.css("transform", "translateY("+(menuHeight)*(-1)+"px)");}    
                if(menuID.hasClass('menu-box-top')){headerAndContent.css("transform", "translateY("+(menuHeight)+"px)");}       
                if(menuID.hasClass('menu-box-left')){headerAndContent.css("transform", "translateX("+(menuWidth)+"px)");}       
                if(menuID.hasClass('menu-box-right')){headerAndContent.css("transform", "translateX("+(menuWidth)*(-1)+"px)");}
            }       
            if(menuEffect === "menu-reveal"){
                if(menuID.hasClass('menu-box-left')){ headerAndContent.css("transform", "translateX("+(menuWidth)+"px)"); menuHider.css({"transform": "translateX("+(menuWidth)+"px)", "opacity": "0"});}       
                if(menuID.hasClass('menu-box-right')){ headerAndContent.css("transform", "translateX("+(menuWidth)*(-1)+"px)"); menuHider.css({"transform": "translateX("+(menuWidth)*(-1)+"px)", "opacity": "0"});}       
            }
            menuActivate();
            
        });
        
        //Showing Menu After Page Load
        setTimeout(function(){
           pageAll.css('opacity','1'); 
           menu.css('opacity','1'); 
           menu.css('display','block'); 
           menuHider.css('display','block'); 
        },150);
        
        $('[data-submenu]').on('click',function(){
            var submenuData = $(this).data('submenu');
            var submenuID = $('#'+submenuData);
            var submenuHeight = submenuID.height();
            var submenuItems = submenuID.children().length;
                    
            if(submenuHeight == "0"){
                submenuID.css('height', ((submenuItems*43)+45)+'px');
                $(this).find('.fa-plus').addClass('rotate-45');
                $(this).addClass('active-subnav');
            } else {
                submenuID.css('height', '0px');
                $(this).find('.fa-plus').removeClass('rotate-45');
                $(this).removeClass('active-subnav');
            }
        })
                
        function createCookie(e, t, n) {if (n) {var o = new Date;o.setTime(o.getTime() + 48 * n * 60 * 60 * 1e3);var r = "; expires=" + o.toGMTString()} else var r = "";document.cookie = e + "=" + t + r + "; path=/"}
        function readCookie(e) {for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {for (var r = n[o];" " == r.charAt(0);) r = r.substring(1, r.length);if (0 == r.indexOf(t)) return r.substring(t.length, r.length)}return null}
        function eraseCookie(e) {createCookie(e, "", -1)}
        if (!readCookie('enabled_cookie_themeforest_11')) {
            setTimeout(function() {
                $('[data-cookie-activate]').addClass('menu-active');
            }, 1500);
        }
        if (readCookie('enabled_cookie_themeforest_11')) {
            $('[data-cookie-activate]').removeClass('menu-active');
        }
        $('.hide-cookie').click(function() {
           $('[data-cookie-activate]').removeClass('menu-active');
            createCookie('enabled_cookie_themeforest_11', true, 1)
        });

        
        var autoActivateMenu = $('[data-auto-activate]');
        if (autoActivateMenu.length){
            autoActivateMenu.addClass('menu-active');
            menuHider.addClass('menu-active');
        }
        
        //Allows clicking even if menu is loaded externally.
        menuHider.on('click', function(){
            menu.removeClass('menu-active');
            menuHider.removeClass('menu-active menu-active-clear');
            headerAndContent.css('transform','translate(0,0)');
            menuHider.css('transform','translate(0,0)');
            $('#footer-menu').removeClass('footer-menu-hidden');
            return false;
        });
        menuClose.on('click', function(){
            menu.removeClass('menu-active');
            menuHider.removeClass('menu-active menu-active-clear');
            headerAndContent.css('transform','translate(0,0)');
            menuHider.css('transform','translate(0,0)');
            $('#footer-menu').removeClass('footer-menu-hidden');
            return false;
        });
                        
        //FastClick
        $(function() {FastClick.attach(document.body);});

        //Preload Image
        var preloadImages = $('.preload-image');
        $(function() {preloadImages.lazyload({threshold : 500});});

		//Copyright Year 
        var copyrightYear = $('.copyright-year ,#copyright-year');
        var dteNow = new Date(); var intYear = dteNow.getFullYear();
        copyrightYear.html(intYear);
		
        //Back to top Badge
        var backToTop = $('.back-to-top, [data-back-to-top], .back-to-top-badge, .back-to-top-icon'),
            backToTopBadge = $('.back-to-top-badge, .back-to-top-icon');

        backToTop.on( "click", function(e){
            e.preventDefault();
            $('html, body, .page-content').animate({
                scrollTop: 0
            }, 350);
			return false;
        });
        function show_back_to_top_badge(){backToTopBadge.addClass('back-to-top-visible');}
        function hide_back_to_top_badge(){backToTopBadge.removeClass('back-to-top-visible');}
        
        //Close Ad
        var closeAdButton = $('.ad-close');
        closeAdButton.on('click',function(){
            $(this).parent().addClass('hide-ad');
        })
        
        //Scroll Ads
        var scrollAd = $('.scroll-ad');
        function show_scroll_ad(){scrollAd.addClass('scroll-ad-visible');}
        function hide_scroll_ad(){scrollAd.removeClass('scroll-ad-visible');}
						
        //Show Back To Home When Scrolling on Android Devices
        
        $(window).on('scroll', function () {
            var total_scroll_height = document.body.scrollHeight
            var inside_header = ($(this).scrollTop() <= 150);
            var passed_header = ($(this).scrollTop() >= 0); //250
            var passed_header2 = ($(this).scrollTop() >= 150); //250
            var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300 )));

            if (inside_header === true) {
                hide_back_to_top_badge();
                hide_scroll_ad();
                $('.header-auto-show').removeClass('header-active');

            }
            else if(passed_header === true){
                show_back_to_top_badge();
                show_scroll_ad();
                $('.header-auto-show').addClass('header-active');
            } 
            if (footer_reached == true){
                hide_back_to_top_badge();
                hide_scroll_ad();
            }
        });
            
        //Text Resizer
       $(".text-size-increase").click(function() {$(".text-size-changer *").css("font-size","+=1");}); 
       $(".text-size-decrease").click(function() {$(".text-size-changer *").css("font-size","-=1");});
       $(".text-size-default").click(function() {$(".text-size-changer *").css("font-size", "");});

        
		//Owl Carousel Sliders
		setTimeout(function(){
			$('.single-slider').owlCarousel({loop:true, margin:0, nav:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:4000});		
			$('.cover-slider').owlCarousel({loop:true, margin:0, nav:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:4000});		
			$('.double-slider').owlCarousel({loop:true, margin:20, nav:false, lazyLoad:true, items:2, autoplay: true, autoplayTimeout:4000});		
			$('.next-slide, .next-slide-arrow, .next-slide-text, .cover-next').on('click',function(){$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});		
			$('.prev-slide, .prev-slide-arrow, .prev-slide-text, .cover-prev').on('click',function(){$(this).parent().find('.owl-carousel').trigger('prev.owl.carousel');});		
		},0);
				
		//Galleries
		baguetteBox.run('.gallery', {});		
		baguetteBox.run('.profile-gallery', {});		
        if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
        $('.gallery-filter-controls li').on('click',function(){
            $('.gallery-filter-controls li').removeClass('gallery-filter-active color-highlight');	
            $(this).addClass('gallery-filter-active color-highlight');	
        })

        //Caption Images
        function fullPage(){
            var contentFullHeight = $('.content-full-height');
            var verticalFullHeight = $('.content-full-height .vertical-center');
            var windowFullHeight = $(window).height();
            if($('.header').hasClass('disabled')){
                var headerHeight = 0;
            } else {
                var headerHeight = $('.header').height() + 12;
            }
            var footerMenuHeight = $('#footer-menu').height();
            if(!header.length){headerHeight = 0;}
            if(header.length){
                contentFullHeight.css({
                    'height':windowFullHeight
                });
                verticalFullHeight.css({
                    'padding-top':headerHeight
                })
            }
            if(!header.length){
                contentFullHeight.css('height', windowFullHeight)
            }
            $('.caption').each(function(){
                var notchSize = 0;
                if($('body').hasClass('has-notch')){
                    var notchSize = $('.notch-hider').height();
                }
                var windowHeight = $(window).height();
                var captionHeight = $(this).data('height');
                if(captionHeight === "cover"){
                    $(this).css('height', windowHeight - notchSize - headerHeight)
                    $('.map-full').css('height', windowHeight - headerHeight - footerMenuHeight );
                    if(!header.length){
                        pageContent.css('padding-bottom','0px');
                        $(this).find('.caption-center, .caption-bottom, .caption-top').css('margin-top','0px');
                    }     
                    if(header.length){
                        $(this).find('.caption-center, .caption-bottom, .caption-top').css('margin-top', header.height())
                    }
                }         
                if(captionHeight === "cover-header"){
                    $(this).css('height', windowHeight - headerHeight - footerMenuHeight );
                    $('.map-full').css('height', windowHeight - headerHeight - footerMenuHeight );
                    //$(this).css('height', windowHeight)
                    if(!header.length){
                        pageContent.css('padding-bottom','0px');
                        $(this).find('.caption-center, .caption-bottom, .caption-top').css('margin-top','0px');
                    }     
                    if(header.length){
                        $(this).find('.caption-center, .caption-bottom, .caption-top').css('margin-top', header.height())
                    }

                }
               $(this).css('height',captionHeight)
            })
        }
        $(window).resize(function(){
            fullPage();
        });
        fullPage();
        
        //Caption Hovers
        $('.caption-scale').unbind().bind('mouseenter mouseleave touchstart touchend',function(){
            $(this).find('img').toggleClass('caption-scale-image');
        });  
        $('.caption-grayscale').unbind().bind('mouseenter mouseleave touchstart touchend',function(){
            $(this).find('img').toggleClass('caption-grayscale-image');
        });         
        $('.caption-rotate').unbind().bind('mouseenter mouseleave touchstart touchend',function(){
            $(this).find('img').toggleClass('caption-rotate-image');
        });       
        $('.caption-blur').unbind().bind('mouseenter mouseleave touchstart touchend',function(){
            $(this).find('img').toggleClass('caption-blur-image');
        });      
        $('.caption-hide').unbind().bind('mouseenter mouseleave touchstart touchend',function(){
            $(this).find('.caption-center, .caption-bottom, .caption-top, .caption-overlay').toggleClass('caption-hide-image');
        });
        
        //Generate Hover Effect for Buttons
        var button = $('.button');
        var darkColor = '-dark';
        var lightColor = '-light';
        
        button.on('mouseenter touchstart',function(){this.className = this.className.replace(darkColor, lightColor);});
        button.on('mouseleave touchend',function(){this.className = this.className.replace(lightColor, darkColor);});

        
        //Add To Home
        var simulateAndroid = $('.simulate-android');
        var simulateiPhones = $('.simulate-iphones');
        var addToHome = $('.add-to-home');
        var addToHomeIOS = 'add-to-home-ios';
        var addToHomeAndroid = 'add-to-home-android';
        var addToHomeVisible = 'add-to-home-visible';
        
        addToHome.on('click',function(){
            setTimeout(function(){addToHome.removeClass(addToHomeIOS).removeClass(addToHomeAndroid);},250);
            addToHome.removeClass(addToHomeVisible)
        });
        simulateAndroid.on('click',function(){
            addToHome.addClass(addToHomeVisible).addClass(addToHomeAndroid).removeClass(addToHomeIOS);
        });
        simulateiPhones.on('click',function(){
            addToHome.addClass(addToHomeVisible).addClass(addToHomeIOS).removeClass(addToHomeAndroid);
        });
        
        //Set page to RTL
        var pageIsRTL = "false";
        if(pageIsRTL === "true"){
            $('body').addClass('rtl');
        }
        
        //Device Has Notch? 
        var deviceHasNotch = "false";
        var deviceNotchSize = "44" //44 pixel is the default notch size
        if(deviceHasNotch === "true"){
            $('body').addClass('has-notch');
            $('body').append('<div class="notch-hider"></div>');
            $('.notch-hider').css('height', deviceNotchSize +'px');
            $('.header, body, #page, .menu-box-modal, .menu-box-left, .menu-box-right, .menu-box-top').css('margin-top', deviceNotchSize +'px');
        }
		
        //Detect Mobile OS//
        var isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
            any: function() {return (isMobile.Android() || isMobile.iOS() || isMobile.Windows());}
        };
        if (!isMobile.any()) {
            $('body').addClass('is-not-ios');
            $('.show-ios, .show-android').addClass('disabled');
            $('.show-no-device').removeClass('disabled');
        }
        if (isMobile.Android()) {
            $('body').addClass('is-not-ios');
            $('head').append('<meta name="theme-color" content="#FFFFFF"> />');
            $('.show-android').removeClass('disabled');
            $('.show-ios, .show-no-device, .simulate-android, .simulate-iphones').addClass('disabled');
            setTimeout(function(){addToHome.addClass(addToHomeVisible).addClass(addToHomeAndroid)},1000);
        }
        if (isMobile.iOS()) {
            $('body').addClass('is-ios');
            $('.show-ios').removeClass('disabled');
            $('.show-android, .show-no-device, .simulate-android, .simulate-iphones').addClass('disabled');
            setTimeout(function(){addToHome.addClass(addToHomeVisible).addClass(addToHomeIOS)},1000);
        }
        
                
        //Adding added-to-homescreen class to be targeted when used as PWA.
        function ath(){
            (function(a, b, c) {
                if (c in b && b[c]) {
                    var d, e = a.location,
                        f = /^(a|html)$/i;
                    a.addEventListener("click", function(a) {
                        d = a.target;
                        while (!f.test(d.nodeName)) d = d.parentNode;
                        "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
                    }, !1);
                    $('.add-to-home').addClass('disabled');
                    $('body').addClass('is-on-homescreen');
                }
            })(document, window.navigator, "standalone")
        }
        ath();
        $('head').append('<link rel="apple-touch-icon" sizes="180x180" href="images/ath.png">');
                
        $('#reading-progress-text').each(function(i) {
            var readingWords = $(this).text().split(' ').length;
            var readingMinutes = Math.floor(readingWords / 250);
            var readingSeconds = readingWords % 60
            $('.reading-progress-words').append(readingWords);
            $('.reading-progress-time').append(readingMinutes + ':' + readingSeconds);
        });      
                
        //Input Styles//
        var emailValidator = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var phoneValidator = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
        var nameValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
        var passwordValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
        var urlValidator = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        var textareaValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
        var validIcon = "<i class='fa fa-check color-green1-dark'></i>";
        var invalidIcon = "<i class='fa fa-exclamation-triangle color-red2-light'></i>";
        
        $('.input-required input, .input-required select, .input-required textarea').on('focusin keyup',function(){
            var spanValue = $(this).parent().find('span').text();
            if($(this).val() != spanValue && $(this).val() != ""){
                $(this).parent().find('span').addClass('input-style-1-active').removeClass('input-style-1-inactive');
            }    
            if($(this).val() === ""){
                $(this).parent().find('span').removeClass('input-style-1-inactive input-style-1-active');
            }
        });      
        $('.input-required input, .input-required select, .input-required textarea').on('focusout',function(){
            var spanValue = $(this).parent().find('span').text();
            if($(this).val() === ""){
                $(this).parent().find('span').removeClass('input-style-1-inactive input-style-1-active');
            }
            $(this).parent().find('span').addClass('input-style-1-inactive')
        });
        $('.input-required select').on('focusout',function(){
            var getValue = $(this)[0].value;
            if(getValue === "default"){
                $(this).parent().find('em').html(invalidIcon)
                $(this).parent().find('span').removeClass('input-style-1-inactive input-style-1-active');
            } 
            if(getValue != "default"){
                $(this).parent().find('em').html(validIcon)
            }                
        });
        $('.input-required input[type="email"]').on('focusout',function(){if (emailValidator.test($(this).val())){$(this).parent().find('em').html(validIcon);}else{if($(this).val() === ""){$(this).parent().find('em').html("(required)");}else{$(this).parent().find('em').html(invalidIcon);}}});       
        $('.input-required input[type="tel"]').on('focusout',function(){if (phoneValidator.test($(this).val())){$(this).parent().find('em').html(validIcon);}else{if($(this).val() === ""){$(this).parent().find('em').html("(required)");}else{$(this).parent().find('em').html(invalidIcon);}}});
        $('.input-required input[type="password"]').on('focusout',function(){if (passwordValidator.test($(this).val())){$(this).parent().find('em').html(validIcon);}else{if($(this).val() === ""){$(this).parent().find('em').html("(required)");}else{$(this).parent().find('em').html(invalidIcon);}}});          
        $('.input-required input[type="url"]').on('focusout',function(){if (urlValidator.test($(this).val())){$(this).parent().find('em').html(validIcon);}else{if($(this).val() === ""){$(this).parent().find('em').html("(required)");}else{$(this).parent().find('em').html(invalidIcon);}}});  
        $('.input-required input[type="name"]').on('focusout',function(){if (nameValidator.test($(this).val())){$(this).parent().find('em').html(validIcon);}else{if($(this).val() === ""){$(this).parent().find('em').html("(required)");}else{$(this).parent().find('em').html(invalidIcon);}}});      
        $('.input-required textarea').on('focusout',function(){if (textareaValidator.test($(this).val())){$(this).parent().find('em').html(validIcon);}else{if($(this).val() === ""){$(this).parent().find('em').html("(required)");}else{$(this).parent().find('em').html(invalidIcon);}}});  
        
        //Set Today Date to Date Inputs
        Date.prototype.toDateInputValue = (function() {
            var local = new Date(this);
            local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            return local.toJSON().slice(0,10);
        });
        $('input[type="date"]').val(new Date().toDateInputValue());
        
        //Set Today Date to Date Inputs
        Date.prototype.toDateInputValue = (function() {
            var local = new Date(this);
            local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            return local.toJSON().slice(0,10);
        });
        $('input[type="date"]').val(new Date().toDateInputValue());
                
        //Share Links
		var share_link = window.location.href;
        var share_title = document.title;
		$('.shareToFacebook').prop("href", "https://www.facebook.com/sharer/sharer.php?u="+share_link)
		$('.shareToGooglePlus').prop("href", "https://plus.google.com/share?url="+share_link)
		$('.shareToLinkedIn').prop("href", "https://www.linkedin.com/shareArticle?mini=true&url="+share_link+"&title="+share_title+"&summary=&source=")
		$('.shareToTwitter').prop("href", "https://twitter.com/home?status="+share_link)
		$('.shareToPinterest').prop("href", "https://pinterest.com/pin/create/button/?url=" + share_link)
		$('.shareToWhatsApp').prop("href", "whatsapp://send?text=" + share_link)
		$('.shareToMail').prop("href", "mailto:?body=" + share_link)
        
        //Snackbars//
        var snackbars = $('.snackbars');
        function activate_snackbars(){
            var snackbarAuto = $('a[data-snack-id]');
            var snackbarManual = $('a[data-snack-manual-id]');
            
            snackbarManual.on('click',function(){
                var snackbarManualData = $(this).data('snack-manual-id');
                $('#'+snackbarManualData).addClass('snackbar-active');
                $(this).css('pointer-events','none')
                setTimeout(function(){
                    $('body').find('#'+snackbarManualData).removeClass('snackbar-active');
                    snackbarManual.css('pointer-events','all')
                },3000)
                return false;
            });
            snackbarAuto.each(function(){
                var snackbarID = $('#'+$(this).data('snack-id'));
                var snackbarData = $(this).data('snack-id');
                var snackbarColor = $(this).data('snack-color');
                var snackbarText = $(this).data('snack-text');
                var snackbarIcon = $(this).data('snack-icon');
                $('.snackbars').append('<a href="#" class="'+snackbarColor+'" id="'+snackbarData+'"><i class="'+snackbarIcon+'"></i> '+snackbarText+'</a>');
            })       
            snackbarAuto.on('click',function(){
                $(this).css('pointer-events','none')
                var snackBarAutoData = $(this).data('snack-id');
                $('#'+snackBarAutoData).addClass('snackbar-active');
                setTimeout(function(){
                    $('body').find('#'+snackBarAutoData).removeClass('snackbar-active');
                    snackbarAuto.css('pointer-events','all')
                },3000)
                return false;
            })

        }
        if(snackbars.length){activate_snackbars()}

        //Tabs//
        var tab = $('.tab-controls');
        function activate_tabs(){
            var tabTrigger = $('.tab-controls a');
            tab.each(function(){
                var tabItems = $(this).parent().find('.tab-controls').data('tab-items');
                var tabWidth = $(this).width();
                var tabActive = $(this).find('a[data-tab-active]');
                var tabID = $('#'+tabActive.data('tab'));
                var tabBg = $(this).data('tab-active');
                $(this).find('a[data-tab]').css("width", (100/tabItems)+'%');
                tabActive.addClass(tabBg);
                tabActive.addClass('color-white');
                tabID.slideDown(0);
            });
            tabTrigger.on('click',function(){
                var tabData = $(this).data('tab');
                var tabID = $('#'+tabData);
                var tabContent = $(this).parent().parent().find('.tab-content');
                var tabOrder = $(this).data('tab-order');
                var tabBg = $(this).parent().parent().find('.tab-controls').data('tab-active');
                $(this).parent().find(tabTrigger).removeClass(tabBg).removeClass('color-white');
                $(this).addClass(tabBg).addClass('color-white');
                $(this).parent().find('a').removeClass('no-click');
                $(this).addClass('no-click');
                tabContent.slideUp(250);
                tabID.slideDown(250);
            });
        }
        if(tab.length){activate_tabs()}

        //Toasts Function//
        var toast = $('[data-toast-id]');
        function activate_toasts(){     
            var toastDataAuto  = $('a[data-toast-id]');
            var toastDataManual = $('a[data-toast-manual-id]');
            
            toastDataManual.unbind().bind('click',function(){
                toastDataAuto.removeClass('toast-active');
                $('.toast').removeClass('toast-active');
                var toastManualData = $('#'+$(this).data('toast-manual-id'));
                toastManualData.addClass('toast-active');
                $(this).css('pointer-events','none')
                setTimeout(function(){
                    $(toastManualData).removeClass('toast-active');
                    toastDataManual.css('pointer-events','all')
                },3500)
                return false;
            });
            
            toastDataAuto.each(function(){
                var toastData = $(this).data('toast-id');
                var toastID = $('#'+$(this).data('toast-id'));
                var toastText = $(this).data('toast-text');
                var toastBG = $(this).data('toast-bg');
                var toastPos = $(this).data('toast-position');
                if(!toastID.length){
                    $('.toasts').append('<div class="toast toast-'+toastPos+'" id="'+toastData+'"><p class="color-white">'+toastText+'</p><div class="toast-bg opacity-90 '+toastBG+'"></div></div>')
                }
            });            
            toastDataAuto.on('click',function(){
                toastDataManual.removeClass('toast-active');
                var toastData = $('#'+$(this).data('toast-id'));
                $(this).css('pointer-events','none');
                $('.toast').removeClass('toast-active');
                toastData.addClass('toast-active');
                setTimeout(function(){
                    toastData.removeClass('toast-active');
                    toastDataAuto.css('pointer-events','all');
                },2250)
                return false;
            });
        }
        if(toast.length){activate_toasts();}

        //Toggles Switch Styled//
        var toggleSwitch = $('.toggle-switch'); 
        function activate_mobile_toggles(){
            toggleSwitch.each(function(){
                var toggleOn = $(this).data('bg-on');
                var toggleOff = $(this).data('bg-off');
                var toggleColor = $(this).data('ball-bg');
                var toggleHeight = $(this).data('toggle-height');
                var toggleWidth = $(this).data('toggle-width');
                var toggleFont = $(this).data('icons-size');
                var toggleContent = $('#' + $(this).data('toggle-content'));
                var toggleCheckbox = $('#' + $(this).data('toggle-checkbox'));
                var toggleTitle = $(this).find('span');
                toggleTitle.css({"line-height":(toggleHeight-3)+"px"})
                if($(this).hasClass('toggle-off')){
                    $(this).find('u').addClass(toggleOff).removeClass(toggleOn)
                    if($(this).hasClass('toggle-ios')){
                        $(this).find('u').css({"width":toggleWidth, "height":toggleHeight}) 
                        $(this).find('i').css({"width":toggleHeight, "line-height":toggleHeight+'px', "font-size":toggleFont+'px'})
                        $(this).find('strong').css({"width":toggleHeight, "height":toggleHeight, "right":toggleWidth - toggleHeight}) 
                    }       
                    if($(this).hasClass('toggle-android')){
                        $(this).find('u').css({"width":toggleWidth, "height":toggleHeight/1.5})   
                        $(this).find('i').css({"width":toggleHeight, "line-height":(toggleHeight+2)/1.5+'px', "font-size":toggleFont+'px'})
                        $(this).find('strong').removeClass(toggleColor).css({width:toggleHeight, "height":toggleHeight, "right":toggleWidth - toggleHeight, "top":(toggleHeight/2)*(-0.37)})
                    }
                    $(this).find('.fa-t1').css({"right":toggleWidth-toggleHeight})    
                    toggleContent.stop().slideUp(0);
                    toggleCheckbox.prop("checked",false);
                } else { 
                    $(this).find('u').removeClass(toggleOff).addClass(toggleOn)
                    if($(this).hasClass('toggle-ios')){
                        $(this).find('u').css({"width":toggleWidth, "height":toggleHeight})   
                        $(this).find('i').css({"width":toggleHeight, "line-height":toggleHeight+'px', "font-size":toggleFont+'px'})
                        $(this).find('strong').css({"width":toggleHeight, "height":toggleHeight, "right":toggleWidth - toggleHeight, "transform":"translateX("+ (toggleWidth - toggleHeight) +"px)"})          
                    }
                    if($(this).hasClass('toggle-android')){
                        $(this).find('u').css({"width":toggleWidth, "height":toggleHeight/1.5})  
                        $(this).find('i').css({"width":toggleHeight, "line-height":(toggleHeight+2)/1.5+'px', "font-size":toggleFont+'px'})
                        $(this).find('strong').addClass(toggleColor).css({"width":toggleHeight, "height":toggleHeight, "right":toggleWidth - toggleHeight, "transform":"translateX("+ (toggleWidth - toggleHeight) +"px)", "top":(toggleHeight/2)*(-0.37)})          
                    }
                    $(this).find('.fa-t1').css({"right":toggleWidth-toggleHeight})    
                    toggleContent.stop().slideDown(0);
                    toggleCheckbox.prop("checked",true);
                }
                setTimeout(function(){toggleSwitch.addClass('toggle-animated')},250);
            });     
            toggleSwitch.on('click',function(){
                if($(this).hasClass('toggle-off')){
                    $(this).removeClass('toggle-off');
                    $(this).find('strong').css({"transform":"translateX("+ ($(this).data('toggle-width') - $(this).data('toggle-height')) +"px)"});
                    $(this).find('strong').addClass($(this).data('ball-bg') + " no-toggle-border");
                    $(this).find('u').addClass($(this).data('bg-on')).removeClass($(this).data('bg-off'));
                    $('#' + $(this).data('toggle-content')).stop().slideDown(250);
                    $('#' + $(this).data('toggle-checkbox')).prop('checked',true);
                }else{  
                    $(this).addClass('toggle-off');
                    $(this).find('strong').css({"transform":"translateX(-2px)"});
                    $(this).find('strong').removeClass($(this).data('ball-bg') + " no-toggle-border");
                    $(this).find('u').removeClass($(this).data('bg-on')).addClass($(this).data('bg-off'));
                    $('#' + $(this).data('toggle-content')).stop().slideUp(250);
                    $('#' + $(this).data('toggle-checkbox')).prop('checked',false);
                }
                return false;
            });  
        };
        if(toggleSwitch.length){activate_mobile_toggles();}

        //Toggles Classic Styled//
        var toggleIcon = $('.toggle-icon');
        function activate_icon_toggles(){
            toggleIcon.each(function(){
                var toggleIcon = $(this).find('i');
                var toggleIconOn = $(this).data('toggle-icon-on');
                var toggleIconOff = $(this).data('toggle-icon-off');
                var toggleContent = $('#'+ $(this).data('toggle-content'));
                var toggleEffect = $(this).data('toggle-effect');
                var toggleFont = $(this).data('icons-size');
                if(!$(this).hasClass('toggle-off')){
                    toggleIcon.addClass(toggleIconOff +' '+toggleEffect).css({"font-size":toggleFont});
                    toggleContent.stop().show(0);
                } else {
                    toggleIcon.addClass(toggleIconOn).css({"font-size":toggleFont});
                    toggleContent.stop().hide(0);
                }
                setTimeout(function(){toggleIcon.addClass('toggle-animated')},250);
            })

            toggleIcon.unbind().bind('click',function(){
                if(!$(this).hasClass('toggle-off')){
                    $(this).addClass('toggle-off');
                    $(this).find('i').removeClass($(this).data('toggle-effect') +' '+$(this).data('toggle-icon-off')).addClass($(this).data('toggle-icon-on'));
                } else {
                    $(this).removeClass('toggle-off');
                    $(this).find('i').addClass($(this).data('toggle-effect') +' '+$(this).data('toggle-icon-off')).removeClass($(this).data('toggle-icon-on'));
                }
                $('#'+$(this).data('toggle-content')).stop().slideToggle(250);
                return false;
            });
        }
        if(toggleIcon.length){activate_icon_toggles()}
        
        //Accordions
        var accordion = $('[data-accordion]');
        function activate_accordions(){
            accordion.on("click", function() {
                var accordion_number = $(this).data('accordion');
                $(this).parent().find('.accordion-content').slideUp(200);
                $('[data-accordion] i').removeClass('rotate-45 rotate-180');
                if ($('#' + accordion_number).is(":visible")) {
                    $('#' + accordion_number).slideUp(200);
                    $(this).find('.fa-plus').removeClass('rotate-45');
                    $(this).find('.fa-angle-down, .fa-arrow-down, .fa-caret-down').removeClass('rotate-180');
                } else {
                    $('#' + accordion_number).slideDown(200);
                    $(this).find('.fa-plus').addClass('rotate-45');
                    $(this).find('.fa-angle-down, .fa-arrow-down, .fa-caret-down').addClass('rotate-180');
                }
            });
        }
        if(accordion.length){activate_accordions();}
        
        //Dropdown
        var dropdown = $('[data-dropdown]');
        function activate_dropdowns(){
            dropdown.on('click',function(){
                var dropdownData = $(this).data('dropdown');
                var dropdownID = $('#' + dropdownData);
                $(this).find('.dropdown-icon.fa-plus').toggleClass('rotate-45');
                $(this).find('.dropdown-icon.fa-angle-down').toggleClass('rotate-180');
                
                dropdownID.slideToggle(300);
            });
        }
        if(dropdown.length){activate_dropdowns();}
        
        //Notification
        var notification = $('[data-notification]');
        function activate_notifications(){
            var notificationTrigger = $('[data-notification]');
            var notificationStyle = $('.notification-style');
            var notificationDate = new Date();
            var notificationTime = notificationDate.getHours() + ":" + notificationDate.getMinutes();
            notificationTrigger.on('click',function(){
                notificationStyle.removeClass('notification-active');
                var notificationData = $(this).data('notification');
                var notificationID = $('#'+notificationData);
                notificationID.find('strong').html(notificationTime);
                notificationID.toggleClass('notification-active');
            })
            notificationStyle.on('click',function(){
                $(this).removeClass('notification-active')
            })
        }
        if(notification.length){activate_notifications();}
        
		//Progress Bar
        var progressBar = $('.progress-bar');
        if(progressBar.length > 0){
			$('.progress-bar-wrapper').each(function(){
				var progress_height = $(this).data('progress-height');
				var progress_border = $(this).data('progress-border');
				var progress_round = $(this).attr('data-progress-round');
				var progress_color = $(this).data('progress-bar-color');
				var progress_bg = $(this).data('progress-bar-background');
				var progress_complete = $(this).data('progress-complete');
				var progress_text_visible = $(this).attr('data-progress-text-visible');
				var progress_text_color = $(this).attr('data-progress-text-color');
				var progress_text_size = $(this).attr('data-progress-text-size');
				var progress_text_position = $(this).attr('data-progress-text-position');
				var progress_text_before= $(this).attr('data-progress-text-before');
				var progress_text_after= $(this).attr('data-progress-text-after');
					
				if (progress_round ==='true'){			
					$(this).find('.progress-bar').css({'border-radius':progress_height})
					$(this).css({'border-radius':progress_height})				  
				}
				if( progress_text_visible === 'true'){
					$(this).append('<em>'+ progress_text_before + progress_complete +'%' + progress_text_after + '</em>')
					$(this).find('em').css({
						"color":progress_text_color,
						"text-align":progress_text_position,
						"font-size":progress_text_size + 'px',
						"height": progress_height +'px',
						"line-height":progress_height + progress_border +'px'
					});
				} 
				$(this).css({
					"height": progress_height + progress_border,
					"background-color": progress_bg,
				})
				$(this).find('.progress-bar').css({
					"width":progress_complete + '%',
					"height": progress_height - progress_border,
					"background-color": progress_color,
					"border-left-color":progress_bg,
					"border-right-color":progress_bg,
					"border-left-width":progress_border,
					"border-right-width":progress_border,
					"margin-top":progress_border,
				})
			});
		}

		//Countdown
		function countdown(dateEnd) {
		  var timer, years, days, hours, minutes, seconds;
		  dateEnd = new Date(dateEnd);
		  dateEnd = dateEnd.getTime();
		  if ( isNaN(dateEnd) ) {return;}
		  timer = setInterval(calculate, 1);
		  function calculate() {
			var dateStart = new Date();
			var dateStart = new Date(dateStart.getUTCFullYear(), dateStart.getUTCMonth(), dateStart.getUTCDate(), dateStart.getUTCHours(), dateStart.getUTCMinutes(), dateStart.getUTCSeconds());
			var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
			if ( timeRemaining >= 0 ) {
			  years    = parseInt(timeRemaining / 31536000);
			  timeRemaining   = (timeRemaining % 31536000);		
			  days    = parseInt(timeRemaining / 86400);
			  timeRemaining   = (timeRemaining % 86400);
			  hours   = parseInt(timeRemaining / 3600);
			  timeRemaining   = (timeRemaining % 3600);
			  minutes = parseInt(timeRemaining / 60);
			  timeRemaining   = (timeRemaining % 60);
			  seconds = parseInt(timeRemaining);

				if($('.countdown').length){
				  $(".countdown #years")[0].innerHTML    = parseInt(years, 10);
				  $(".countdown #days")[0].innerHTML    = parseInt(days, 10);
				  $(".countdown #hours")[0].innerHTML   = ("0" + hours).slice(-2);
				  $(".countdown #minutes")[0].innerHTML = ("0" + minutes).slice(-2);
				  $(".countdown #seconds")[0].innerHTML = ("0" + seconds).slice(-2);
				}
			} else { return; }}
		  function display(days, hours, minutes, seconds) {}
		}
		countdown('01/19/2030 03:14:07 AM');	

        
        //Alerts
        var alert = $('.alert .fa-times');
            function activate_alerts(){
            alert.on('click',function(){
                $(this).parent().slideUp(250);
            })
        }
        if(alert.length){activate_alerts();}
        
        //Instant Articles
        var closeInstant = $('.close-article');
        var triggerInstant = $('[data-instant-id]')
        var articleInstant = $('.instant-article');
        triggerInstant.on('click',function(){
            var articleID = $('#'+$(this).data('instant-id'));
            articleID.addClass('instant-article-active');
        });
        closeInstant.on('click',function(){
            articleInstant.removeClass('instant-article-active');
        })
        
		//Contact Form
        var formSubmitted = "false";
        jQuery(document).ready(function(e) {
            function t(t, n) {
                formSubmitted = "true";
                var r = e("#" + t).serialize();
                e.post(e("#" + t).attr("action"), r, function(n) {
                    e("#" + t).hide();
                    e("#formSuccessMessageWrap").fadeIn(500)
                })
            }

            function n(n, r) {
                e(".formValidationError").hide();
                e(".fieldHasError").removeClass("fieldHasError");
                e("#" + n + " .requiredField").each(function(i) {
                    if (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy")) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        e("#" + e(this).attr("id") + "Error").fadeIn(300);
                        return false
                    }
                    if (e(this).hasClass("requiredEmailField")) {
                        var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        var o = "#" + e(this).attr("id");
                        if (!s.test(e(o).val())) {
                            e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
                        }
                    }
                    if (formSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
                        t(n, r)
                    }
                })
            }
            e("#formSuccessMessageWrap").hide(0);
            e(".formValidationError").fadeOut(0);
            e('input[type="text"], input[type="password"], textarea').focus(function() {
                if (e(this).val() == e(this).attr("data-dummy")) {
                    e(this).val("")
                }
            });
            e("input, textarea").blur(function() {
                if (e(this).val() == "") {
                    e(this).val(e(this).attr("data-dummy"))
                }
            });
            e(".contactSubmitButton").on('click',function() {
                n(e(this).attr("data-formId"));
                return false
            })
        });
        
		//Toggle Box
		$('[data-toggle-box]').on('click',function(){
			var toggle_box = $(this).data('toggle-box');
			if($('#'+toggle_box).is(":visible")){
				$('#'+toggle_box).slideUp(250);
			}else{
				$("[id^='box']").slideUp(250);
				$('#'+toggle_box).slideDown(250);
			}
		});
        
		//Show Map
		$('.show-map, .hide-map').on('click',function(){
			$('.map-full .caption').toggleClass('deactivate-map');
			$('.map-but-1, .map-but-2').toggleClass('deactivate-map');
			$('.map-full .hide-map').toggleClass('activate-map');
		});
        
        //Generating Dynamic Styles to decrease CSS size and execute faster loading times.
        var colorsArray = [
            ["none","","",""], 
            ["plum","#6772A4","#6772A4","#3D3949"], 
            ["violet","#673c58","#673c58","#492D3D"], 
            ["magenta3","#413a65","#413a65","#2b2741"], 
            ["red3","#c62f50","#6F1025","#6F1025"], 
            ["green3","#6eb148","#2d7335","#2d7335"], 
            ["sky","#188FB6","#0F5F79","#0F5F79"], 
            ["pumpkin","#E96A57","#C15140","#C15140"], 
            ["dark3","#535468","#535468","#343341"], 
            ["yellow3","#CCA64F","#996A22","#996A22"], 
            ["red1","#D8334A","#BF263C","#9d0f23"], 
            ["red2","#ED5565","#DA4453","#a71222"], 
            ["orange","#FC6E51","#E9573F","#ce3319"], 
            ["yellow1","#FFCE54","#F6BB42","#e6a00f"], 
            ["yellow2","#E8CE4D","#E0C341","#dbb50c"],
            ["green1","#A0D468","#8CC152","#5ba30b"], 
            ["green2","#2ECC71","#2ABA66","#0da24b"], 
            ["mint","#48CFAD","#37BC9B","#0fa781"], 
            ["teal","#A0CECB","#7DB1B1","#158383"], 
            ["aqua","#4FC1E9","#3BAFDA","#0a8ab9"], 
            ["blue1","#4FC1E9","#3BAFDA","#0b769d"],
            ["blue2","#5D9CEC","#4A89DC","#1a64c6"], 
            ["magenta1","#AC92EC","#967ADC","#704dc9"], 
            ["magenta2","#8067B7","#6A50A7","#4e3190"], 
            ["pink1","#EC87C0","#D770AD","#c73c8e"], 
            ["pink2","#fa6a8e","#fb3365","#d30e3f"], 
            ["brown1","#BAA286","#AA8E69","#896b43"], 
            ["brown2","#8E8271","#7B7163","#584934"],
            ["gray1","#F5F7FA","#E6E9ED","#c2c5c9"],
            ["gray2","#CCD1D9","#AAB2BD","#88919d"],
            ["dark1","#656D78","#434A54","#242b34"],
            ["dark2","#3C3B3D","#323133","#1c191f"]
        ];
        var socialArray = [
            ["facebook","#3b5998"], 
            ["linkedin","#0077B5"],
            ["twitter","#4099ff"],
            ["google","#d34836"],
            ["whatsapp","#34AF23"],
            ["pinterest","#C92228"],
            ["sms","#27ae60"],
            ["mail","#3498db"],
            ["dribbble","#EA4C89"],
            ["tumblr","#2C3D52"],
            ["reddit","#336699"],
            ["youtube","#D12827"],
            ["phone","#27ae60"],
            ["skype","#12A5F4"],
            ["instagram","#e1306c"]
        ];
        var opacityArray = ["00", "10","15","20","25","30","35","40","45","50","55","60","65","70","75","80","85","90","95"];
        var marginArray = ["0","1","5","10","15","20","25","30","35","40","45","50","60","70","80","90","100"];
        var fontArray = ["8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"];
        var fontWArray = ["100","200","300","400","500","600","700","800","900"];
        var rotateArray = ["0","15","30","45","60","75","90","105","120","135","150","165","180"];
        var scaleArray=[["10","1.1,1.1"],["20","1.2,1.2"],["30","1.3,1.3"],["40","1.4,1.4"],["50","1.5,1.5"],["60","1.6,1.6"],["70","1.7,1.7"],["80","1.8,1.8"],["90","1.9.1.9"],["100","2,2"]];        
        var generatedStyles = $('.generated-styles');
        var generatedHighlight = $('.generated-highlight');
        
        function highlight_colors(){
            var bodyColor = $('body').data('highlight');
            var bodyBackground = $('body').data('background');
            var data = colorsArray.map(colorsArray => colorsArray[0]);
            if (data.indexOf(bodyColor) > -1) {
                var highlightLocated = data.indexOf(bodyColor)
                var backgroundLocated = data.indexOf(bodyBackground)
                var highlightColorCode = colorsArray[highlightLocated][2]
                var backgroundColorCode = colorsArray[backgroundLocated][3] + ', ' + colorsArray[backgroundLocated][1]
                var highlightColor = '.color-highlight{color:'+highlightColorCode+'!important}'
                var highlightBg = '.bg-highlight{background-color:'+highlightColorCode+'!important}'
                var highlightNav = '.active-nav *{color:'+highlightColorCode+'!important}'
                var highlightNavFixed = '.nav-fixed .active-nav *{color:'+highlightColorCode+'!important}'
                var highlightBorder = '.border-highlight{border-color:'+highlightColorCode+'!important}'
                var highlightHeaderTabs = '.header-tab-active{border-color:'+highlightColorCode+'!important}'
                var bodyBG = '.page-bg{background: linear-gradient(0deg, '+backgroundColorCode+')!important;} .bg-page{background: linear-gradient(0deg, '+backgroundColorCode+')!important }'
                if(!generatedHighlight.length){
                    $('body').append('<style class="generated-highlight"></style>')
                    $('body').append('<style class="generated-background"></style>')
                    $('.generated-highlight').append(highlightColor, highlightBg, highlightNav, highlightNavFixed, highlightBorder, highlightHeaderTabs);
                    $('.generated-background').append(bodyBG);
                }
            }
        }      
        highlight_colors();
        
        $('[data-change-highlight]').on('click',function(changeColor){
            var highlightNew = $(this).data('change-highlight');
            $('body').attr('data-highlight',highlightNew);
            $('.generated-highlight').remove();
            var data = colorsArray.map(colorsArray => colorsArray[0]);
                if (data.indexOf(highlightNew) > -1) {
                    var highlightLocated = data.indexOf(highlightNew)
                if($(this).data('color-light') !== undefined){
                    var highlightColorCode = colorsArray[highlightLocated][1]
                } else {
                    var highlightColorCode = colorsArray[highlightLocated][2]
                }
                var highlightColor = '.color-highlight{color:'+highlightColorCode+'!important}'
                var highlightBg = '.bg-highlight{background-color:'+highlightColorCode+'!important}'
                var highlightNav = '.active-nav *{color:'+highlightColorCode+'!important}'
                var highlightBorder = '.border-highlight{border-color:'+highlightColorCode+'!important}'
                $('body').append('<style class="generated-highlight"></style>')
                $('.generated-highlight').append(highlightColor, highlightBg, highlightNav, highlightBorder);
            }
        });     
        
        $('[data-change-background]').on('click',function(changeColor){
            var backgroundNew = $(this).data('change-background');
            $('.generated-background').remove();
            var data = colorsArray.map(colorsArray => colorsArray[0]);
            var backgroundLocated = data.indexOf(backgroundNew)
            var backgroundColorCode = colorsArray[backgroundLocated][3] + ', ' + colorsArray[backgroundLocated][1]
            var bodyBG = '.page-bg{background: linear-gradient(0deg, '+backgroundColorCode+')!important;} .bg-page{background: linear-gradient(0deg, '+backgroundColorCode+')!important}'
            $('body').append('<style class="generated-background"></style>')
            $('.generated-background').append(bodyBG);
        });
                
        if (!generatedStyles.length){
            $('body').append('<style class="generated-styles"></style>');    
            $('.generated-styles').append('/*Generated using JS for lower CSS file Size, Easier Editing & Faster Loading*/');
            colorsArray.forEach(function (colorValue) {$('.generated-styles').append('.bg-'+colorValue[0]+'-light{ background-color: '+colorValue[1]+'!important; color:#FFFFFF!important;} .bg-'+colorValue[0]+'-light i, .bg-'+colorValue[0]+'-dark i{color:#FFFFFF;} .bg-'+colorValue[0]+'-dark{  background-color: '+colorValue[2]+'!important; color:#FFFFFF!important;} .border-'+colorValue[0]+'-light{ border-color:'+colorValue[1]+'!important;} .border-'+colorValue[0]+'-dark{  border-color:'+colorValue[2]+'!important;} .color-'+colorValue[0]+'-light{ color: '+colorValue[1]+'!important;} .color-'+colorValue[0]+'-dark{  color: '+colorValue[2]+'!important;}');});	
            colorsArray.forEach(function (gradientValue) {$('.generated-styles').append('.bg-gradient-'+gradientValue[0]+'{background-image: linear-gradient(to bottom, '+gradientValue[1]+' 0, '+gradientValue[2]+' 100%)}')});	
            socialArray.forEach(function (socialColorValue) {$('.generated-styles').append('.bg-'+socialColorValue[0]+'{background-color:'+socialColorValue[1]+'!important; color:#FFFFFF;} .color-'+socialColorValue[0]+'{color:'+socialColorValue[1]+'!important;}')});
            opacityArray.forEach(function(opacityValues){$('.generated-styles').append('.opacity-'+opacityValues+'{opacity:'+opacityValues/100+'}')});
            marginArray.forEach(function(marginValues){$('.generated-styles').append('.top-'+marginValues+'{margin-top:'+marginValues+'px!important} .bottom-'+marginValues+'{margin-bottom:'+marginValues+'px!important} .left-'+marginValues+'{margin-left:'+marginValues+'px!important} .right-'+marginValues+'{margin-right:'+marginValues+'px!important}');})
            fontArray.forEach(function (fontValues) {$('.generated-styles').append('.font-'+fontValues+'{font-size:'+fontValues+'px!important;}');})
            fontWArray.forEach(function (fontWeightValues){$('.generated-styles').append('.font-'+fontWeightValues+'{font-weight:'+fontWeightValues+'!important}')});
            scaleArray.forEach(function(scaleVal ){$('.generated-styles').append('.scale-'+scaleVal[0]+'{transform:scale('+scaleVal[1]+')}');});   
            rotateArray.forEach(function( rotateVal ){$('.generated-styles').append('.rotate-'+[rotateVal]+'{transform:rotate('+[rotateVal]+'deg)!important}' );});
            colorsArray.forEach(function (gradientBodyValue) {$('.generated-styles').append('.body-'+gradientBodyValue[0]+'{background-image: linear-gradient(to bottom, '+gradientBodyValue[1]+' 0, '+gradientBodyValue[3]+' 100%)}')});	
        }
        
                    
        //Back Button in Header
        var backButton = $('.back-button, [data-back-button]');
        backButton.on('click', function() {
            window.history.go(-1);
            //return false;
        });
        
        //Search
        var search = $('[data-search]');
        function activate_search(){
		search.on('keyup', function() {
			var searchVal = $(this).val();
			var filterItems = $(this).parent().parent().find('[data-filter-item]');
			if ( searchVal != '' ) {
				$(this).parent().parent().find('.search-results').removeClass('disabled-search-list');
				$(this).parent().parent().find('[data-filter-item]').addClass('disabled-search');
				$(this).parent().parent().find('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search');
			} else {
				$(this).parent().parent().find('.search-results').addClass('disabled-search-list');
				$(this).parent().parent().find('[data-filter-item]').removeClass('disabled-search');
			}
		});
        }
        if(search.length){activate_search();}

        //Charts
		if($('.chart').length > 0){
			var loadJS = function(url, implementationCode, location){
				var scriptTag = document.createElement('script');
				scriptTag.src = url;
				scriptTag.onload = implementationCode;
				scriptTag.onreadystatechange = implementationCode;
				location.appendChild(scriptTag);
			};
			var call_charts_to_page = function(){
				new Chart(document.getElementById("pie-chart"), {
					type: 'pie',
                    data: {
					  labels: ["Facebook", "Twitter", "WhatsApp"],
					  datasets: [{
						backgroundColor: ["#4A89DC", "#4FC1E9", "#A0D468"],
						borderColor:"rgba(255,255,255,0.5)",
						data: [7000,3000,2000]
					  }]
					},
					options: {
                        responsive: true, maintainAspectRatio:false,
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}
					}
				});		

				new Chart(document.getElementById("doughnut-chart"), {
					type: 'doughnut',
					data: {
					  labels: ["Apple", "Samsung", "Google"],
					  datasets: [{
						backgroundColor: ["#CCD1D9", "#5D9CEC","#FC6E51"],
						borderColor:"rgba(255,255,255,0.5)",
						data: [5500,4000,3000]
					  }]
					},
					options: {
                        responsive: true, maintainAspectRatio:false,
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}, layout:{ padding: {bottom: 30}}
					}
				});		

				new Chart(document.getElementById("polar-chart"), {
					type: 'polarArea',
					data: {
					  labels: ["Windows", "Mac", "Linux"],
					  datasets: [{
						backgroundColor: ["#CCD1D9", "#5D9CEC","#FC6E51"],
						borderColor:"rgba(255,255,255,0.5)",
						data: [7000,10000,5000]
					  }]
					},
					options: {
                        responsive: true, maintainAspectRatio:false,
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}, layout:{ padding: {bottom: 30}}
					}
				});			

				new Chart(document.getElementById("vertical-chart"), {
					type: 'bar',
					data: {
					  labels: ["2010", "2015", "2020", "2025"],
					  datasets: [
						{
						  label: "iOS",
						  backgroundColor: "#A0D468",
						  data: [900,1000,1200,1400]
						}, {
						  label: "Android",
						  backgroundColor: "#4A89DC",
						  data: [890,950,1100,1300]
						}
					  ]
					},
					options: {
                        responsive: true, maintainAspectRatio:false,
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						title: {display: false}
					}
				});	

				new Chart(document.getElementById("horizontal-chart"), {
					type: 'horizontalBar',
					data: {
					  labels: ["2010", "2013", "2016", "2020"],
					  datasets: [
						{
						  label: "Mobile",
						  backgroundColor: "#BF263C",
						  data: [330,400,580,590]
						}, {
						  label: "Responsive",
						  backgroundColor: "#EC87C0",
						  data: [390,450,550,570]
						}
					  ]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						title: {display: false}
					}
				});	

				new Chart(document.getElementById("line-chart"), {
				  type: 'line',
				  data: {
					labels: [2000,2005,2010,2015,2010],
					datasets: [{ 
						data: [500,400,300,200,300],
						label: "Desktop Web",
						borderColor: "#D8334A"
					  }, { 
						data: [0,100,300,400,500],
						label: "Mobile Web",
						borderColor: "#4A89DC"
					  }
					]
				  },
				  options: {
                    responsive: true, maintainAspectRatio:false,
					legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
					title: {display: false}
				  }
				});
			}
			loadJS('scripts/charts.js', call_charts_to_page, document.body);
		}        
        
        //Demo Functions
        var simulateOffline = $('.simulate-offline');
        var simulateOfflinePage = $('.simulate-offline-page');
        var simulateOnline = $('.simulate-online');
        var onlineMessage = $('.online-message');
        var offlineMessage = $('.offline-message');
        var detectedOnline = 'online-message-active'
        var detectedOffline = 'offline-message-active'

        simulateOffline.on('click',function(){
            offlineMessage.addClass(detectedOffline);
            onlineMessage.removeClass(detectedOnline);
            setTimeout(function(){
               offlineMessage.removeClass(detectedOffline);
            },2000)
        });  
        simulateOfflinePage.on('click',function(){
            $('#menu-offline').addClass('menu-active');
            $('.menu-hider').addClass('menu-active no-click');
        });      
        simulateOnline.on('click',function(){
            onlineMessage.addClass(detectedOnline);
            offlineMessage.removeClass(detectedOffline);
            setTimeout(function(){
               onlineMessage.removeClass(detectedOnline);
            },2000)
        });
        
        if(!$('.offline-message').length){
            $('#page').append('<p class="offline-message bg-red2-dark color-white center-text uppercase ultrabold">No internet connection detected</p>');
            $('#page').append('<p class="online-message bg-green1-dark color-white center-text uppercase ultrabold">You are back online. Welcome!</p>');
        }     
        var status = document.getElementById("status");
        var log = document.getElementById("log");
        var onlineMessage = $('.online-message');
        var offlineMessage = $('.offline-message');
        var offlineMenu = $('#menu-offline');
        var offlineMenuHider = $('.menu-hider');
        var detectedMenu = 'menu-active'
        var detectedMenuHider = 'menu-active no-click'
        var detectedOnline = 'online-message-active'
        var detectedOffline = 'offline-message-active'
        function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";
            onlineMessage.addClass(detectedOnline);
            offlineMessage.removeClass(detectedOffline);
            offlineMenu.removeClass(detectedMenu);
            offlineMenuHider.removeClass(detectedMenuHider);
            setTimeout(function(){
               onlineMessage.removeClass(detectedOnline);
                offlineMenuHider.removeClass(detectedMenuHider);
            },2000)
        }
        function updateOfflineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";
            offlineMessage.addClass(detectedOffline);
            offlineMenu.addClass(detectedMenu);
            offlineMenuHider.addClass(detectedMenuHider);
            onlineMessage.removeClass(detectedOnline);
            setTimeout(function(){
               offlineMessage.removeClass(detectedOffline);
                offlineMenuHider.removeClass(detectedMenuHider);
            },2000)
        }
        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOfflineStatus);
    }
    //Activating all the plugins
	setTimeout(init_template, 0);
           
    //To Remove AJAX Remove This Code 
    $(function(){
		'use strict';
		var options = {
			prefetch: true,
			prefetchOn: 'mouseover',
			cacheLength: 100,
			scroll: true, 
			blacklist: '.default-link',
			forms: 'contactForm',
			onStart: {
				duration:210, // Duration of our animation
				render: function ($container) {
				$container.addClass('is-exiting');// Add your CSS animation reversing class
                    $('.menu, .menu-hider').removeClass('menu-active');
					$('.loader-main').removeClass('loader-inactive');
					return false;
				}
			},
			onReady: {
				duration: 50,
				render: function ($container, $newContent) {
					$container.removeClass('is-exiting');// Remove your CSS animation reversing class
					$container.html($newContent);// Inject the new content
                    setTimeout(init_template, 0)//Timeout required to properly initiate all JS Functions. 
					$('.loader-main').removeClass('loader-inactive');		
				}
			},
			onAfter: function($container, $newContent) {
				setTimeout(function(){
				    $('.loader-main').addClass('loader-inactive');	
				},145);
			}
      	};
      var smoothState = $('#page').smoothState(options).data('smoothState');
    });
    //Remove untill here to remove AJAX.
    
}); 