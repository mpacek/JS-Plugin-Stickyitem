"use strict";

(function ($) {

$.fn.stickyitemSetup = function (settings) {
  settings = jQuery.extend({
      stickyClass: 'is-sticky',
      startPosition: 0
  }, settings);

  return this.each(function () {

    var $stickyitem = $(this),
        stickyitemPosTop = $stickyitem.offset().top + startPosition,
        windowPosTop,
        isSticked = false;

    var stickItem = function () {
      windowPosTop = $(window).scrollTop();

      if (windowPosTop >= stickyitemPosTop) {
        if (!isSticked) {
          $stickyitem.addClass(settings.stickyClass);
          isSticked = true;
        }
      } else {
        if (isSticked) {
          $stickyitem.removeClass(settings.stickyClass);
          isSticked = false;
        }
      }
    }

    var runStickyitem = function () {
      stickItem();

      // check on scroll
      $(window).on('scroll.stickyitem', function () {
        stickItem();
      });
    }

    var clearStickyitem = function () {
      $stickyitem.removeClass(settings.stickyClass);
      $(window).off('scroll.stickyitem');
    }

    // run on load
    runStickyitem();

    // Uses responsive.js helper plugin
    // 'off' when on mobile
    // 'on' when on desktop
    if ($.fn.responsiveSetup) {
      $(document).responsiveSetup({
        onMobile: { callFunction: clearStickyitem },
        onDesktop: { callFunction: runStickyitem }
      });
    }
  });
}

}(jQuery));
