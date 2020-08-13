/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top,
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  detectDownloadBtnOS();

});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top',
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
  $('.navbar-toggle:visible').click();
});

function detectDownloadBtnOS() {
  function showOSButton(os, icon) {
    $('#heroDownload').addClass('os-known');
    $('#heroDownload i').addClass('fa-' + icon);
    $('#heroDownload .if-os-' + os).addClass('os-' + os);
    $('#heroDownload .detect').html($('#heroDownload .detect').attr('data-' + os));
    $('#heroDownload').attr('href', $('#heroDownload .detect').attr('data-dl-' + os));
  }

  function changeGpgLink(os) {
    $('.heroGpg').attr('href', $('.heroGpg').attr('data-dl-' + os));
  }

  console.log($.browser.platform);
  switch ($.browser.platform) {
    case 'mac':
      showOSButton('mac', 'apple');
      changeGpgLink('mac');
      break;
    case 'win':
      showOSButton('windows', 'windows');
      changeGpgLink('windows');
      break;
    case 'linux':
      showOSButton('linux', 'linux');
      changeGpgLink('linux');
      break;
    case 'android':
      showOSButton('android', 'android');
      break;
  }
}
