
/***************************************
 * 
 *  1. COUNTDOWN
 *  2. SCROLLING
 *  3. DIALOG MODAL
 *  4. CONTACT FORM
 *  5. BACK TO TOP BUTTON
 *  6. BOOTSTRAP TOOLTIP
 *  7. MAIL SUBSCRIBTION  
 *  8. LOADING ANIMATION
 * 
 ***************************************/
$(function() {
    "use strict";

    // 1. COUNTDOWN
    $('.countdown').downCount({
        date: '12/22/2017 23:59:59', // Change this time
        offset: +1
    }, function() {
        alert('WOOT WOOT, done!'); // Finish Message

    });

    // 2. SCROLLING
    $('.scrolling').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    // 3. DIALOG MODAL
    function dialog() {
        // Declare variables
        var dialogBox = $('.dialog'), // kalsÄ±n
            dialogTrigger = $('.btn-s'), // kalsÄ±n
            dialogClose = $('.dialogCloseBtn'), // kalsÄ±n
            dialogAction = $('.dialog__action'), // kalsÄ±n
            dialogGeneral = $('.dx'),
            /* BAR */
            dialogBack = $('#homePage');
        // Open the dialog
        dialogTrigger.on('click', function(e) {
            dialogBox.toggleClass('dialog--active'),
                dialogBack.toggleClass('dialogBack');
            e.stopPropagation();
        });
        // Close the dialog - click close button
        dialogClose.on('click', function(e) {
            dialogBox.removeClass('dialog--active');
            dialogBack.removeClass('dialogBack');
        });

        // Close the dialog - press escape key // key#27
        $(document).keyup(function(e) {
            if (e.keyCode === 27) {
                dialogBox.removeClass('dialog--active');
                dialogBack.removeClass('dialogBack');
            }
        });

        // Close the dialog - click outside
        $(document).on('click', function(e) {
            if ($(e.target).is(dialogBox) === false &&
                $(e.target).is(dialogAction) === false &&
                $(e.target).is(dialogGeneral) === false) {
                dialogBox.removeClass("dialog--active", 12000, "easeInBack");
                dialogBack.removeClass('dialogBack');
            }
        });
    }
    // Run function
    $(dialog);



    // 4. CONTACT FORM
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },

            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-exclamation-triangle'></i>Please specify your name.",
            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>We need your email address to contact you.",
                email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact-me.php",
                success: function() {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('.successForm').fadeIn();
                    });
                },
                error: function() {
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $('.errorForm').fadeIn();
                    });
                    $('#name, #message, #mail').addClass("errorInput");
                }
            });
        }
    });


    // 5. BACK TO TOP BUTTON
    $(document).ready(function() {
        // hide #back-top first
        $("#back-top").hide();
        // fade in #back-top
        $(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 500) {
                    $('#back-top').fadeIn();
                } else {
                    $('#back-top').fadeOut();

                }
            });
            // scroll body to 0px on click
            $('a#back-top').on('click', function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        });
    });


    // 6.BOOTSTRAP TOOLTIP
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });


    // 7. MAIL SUBSCRIBTION 
    var $form = $('#mc-form');

    $('#mc-subscribe').on('click', function(e) {
        if (e)
            e.preventDefault();
        register($form);
    });

    function register($form) {
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function(err) {
                $('#mc-notification').html('<span class="alert wow bounceInUp">Could not connect to server. Please try again later.</span>');
            },
            success: function(data) {
                if (data.result != "success") {
                    var message = data.msg.substring(4);
                    $('#mc-notification').html('<span class="alert wow bounceInUp"><i class="fa fa-exclamation-triangle"></i>' + message + '</span>');
                    $('#mailInput').addClass("errorInput");

                    if ($('#mailInput').hasClass("clearInput")) {
                        $('#mailInput').removeClass("clearInput");
                    }
                } else {
                    var message = data.msg.substring(4);
                    $('#mc-notification').html('<span class="success wow bounceInUp"><i class="fa fa-envelope"></i>' + 'Awesome! We sent you a confirmation email.' + '</span>').fadeIn("slow");
                    $('#mailInput').addClass("clearInput");

                    if ($('#mailInput').hasClass("errorInput")) {
                        $('#mailInput').removeClass("errorInput");
                    }
                }
            }
        });
    }


    // 8. LOADING ANIMATION
    var path = document.querySelector('#wave');
    var animation = document.querySelector('#moveTheWave');
    var m = 0.512286623256592433;

    function buildWave(w, h) {
        var a = h / 4;
        var y = h / 2;
        var pathData = ['M', w * 0, y + a / 2, 'c', a * m, 0, -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a].join(' ');
        path.setAttribute('d', pathData);
    }
    buildWave(90, 60);
    $(window).load(function() {
        $(".loading-page").fadeOut;
        $(".loading-page").delay(100).fadeOut("slow");
    });




    $(document).ready(function() {
        $('#spiderAnimation').on("click", function(event) {
            $("#particles").addClass("none");
            $("#canvas").removeClass("none");
        });
        $('#linesAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleLines();
        });
        $('#starsAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleStars();
        });
        $('#nasaAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleNasa();
        });
        $('#snowAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleSnow();
        });
        $('#polygonsAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particlePolygons();
        });
    });




    /* STYLE SELECTOR */
    $(document).ready(function() {
        $('.selector-toggle > a').on("click", function() {
            $('#styleSelector').toggleClass('open')
        });

        $('#theme-color > a.header-bg').on("click", function() {
            $('body').attr("theme-color", $(this).attr("theme-color"));
        });

        $('#overlayType > a.lpanel-bg').on("click", function() {
            $('.overlay-bg').attr("bg-type", $(this).attr("bg-type"));
        });
    });


    $(document).ready(function() {
        $('#spiderAnimation').on("click", function(event) {
            $("#particles").addClass("none");
            $("#canvas").removeClass("none");
        });
        $('#linesAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleLines();
        });
        $('#starsAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleStars();
        });
        $('#nasaAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleNasa();
        });
        $('#snowAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particleSnow();
        });
        $('#polygonsAnimation').on("click", function(event) {
            $("#canvas").addClass("none");
            $("#particles").removeClass("none");
            particlePolygons();
        });
    });
});