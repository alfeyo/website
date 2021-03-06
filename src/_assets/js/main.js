//= require vendor/jquery-3.3.1
//= require popper
//= require bootstrap
//= require archive.js
//= require tabs.js

// TODO(chalin): find a way to selectively generate (as individual files) and then include archive.js and/or tabs.js

$(function () {
  // // Sidenav
  // $('#sidenav i').on('click', function (e) {
  //   e.stopPropagation();
  //   $(this).parent('li').toggleClass('active');
  // });

  adjustToc();
  initFixedColumns();

  // New (dash) tabs
  setupTabs($('#editor-setup'), 'io.flutter.tool-id');
  // Old tabs
  setupToolsTabs($('#tab-set-install'), 'tab-install-', 'io.flutter.tool-id');
  setupToolsTabs($('#tab-set-os'), 'tab-os-', null, getOS());
})

// TODO(chalin): Copied (& tweaked) from site-www, consider moving into site-shared
function adjustToc() {
  // Adjustments to the jekyll-toc TOC.

  var tocId = '#site-toc--side';
  var tocWrapper = $(tocId);
  $(tocWrapper).find('.site-toc--button__page-top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  })

  // TODO: consider doing most of the HTML TOC manipulation statically (maybe requiring a jekyll-toc adaptor plugin)
  // Bootstrap 4's ScrollSpy works only for .nav or .list-group,
  // with items and link classes set too. Add the classes.
  var toc = $(tocWrapper).find('ul.section-nav');
  $(toc).addClass('nav');

  var ul = $(toc).find('ul');
  $(ul).addClass('nav');
  var li = $(toc).find('.toc-entry');
  $(li).addClass('nav-item');
  $(li).find('a').addClass('nav-link');

  $('body').scrollspy({ offset: 100, target: tocId });
}

function initFixedColumns() {
  var fixedColumnsSelector = '[data-fixed-column]';
  var footerSelector = 'footer.site-footer';
  var headerHeight = 66;

  function adjustFixedColumns() {
    var footerOffset = $(footerSelector).offset().top;
    var footerPosition = footerOffset - $(window).scrollTop();
    var footerVisibleOffset = $(window).height() - footerPosition;
    if (footerVisibleOffset > 0) {
      var fixedColumnsMaxHeight = $(window).height() - headerHeight - footerVisibleOffset;
      $(fixedColumnsSelector).css('max-height', fixedColumnsMaxHeight);
    } else {
      $(fixedColumnsSelector).css('max-height', '');
    }
  }

  // listen for scroll and execute once
  $(window).scroll(adjustFixedColumns);
  adjustFixedColumns();
}

function getOS() {
  var ua = navigator.userAgent;
  if (ua.indexOf("Win") !== -1)
    return "windows";
  if (ua.indexOf("Mac") !== -1)
    return "macos";
  if (ua.indexOf("Linux") !== -1 || ua.indexOf("X11") !== -1)
    return "linux";
}
