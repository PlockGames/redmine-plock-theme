( function( window ) {

  'use strict';
  /* set true to enable static sidebar */
  var activeStaticSidebar = false;

  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  var hasClass, addClass, removeClass;

  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }

  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }

  window.classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  function addElements (){
    $( '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>' ).insertBefore( $( "#top-menu" ) );
    var menuLeft = document.getElementById( 'top-menu' ),
    showLeft = document.getElementById( 'menu' ),
    body = document.body,
    search = document.getElementById( 'quick-search' ),
    menuButton = document.getElementById( 'menu' );

    showLeft.onclick = function() {
      classie.toggle( this, 'active' );
      classie.toggle( body, 'menu-push-toright' );
      classie.toggle( menuButton, 'menu-push-toright' );
      if (search != null) {
        classie.toggle( search, 'menu-push-toright' );
      }
      classie.toggle( menuLeft, 'open' );
    };
  }
  if (!activeStaticSidebar) {
    $(document).ready(addElements)
  }
  function addLogo () {
    $( "#loggedas" ).prepend( "<div class='redmine-logo'></div>" );
    // body...
  }
  $(document).ready(addLogo)

  $(window).on('load', function() {
    $( "#quick-search form" ).css('margin-right', $( "#s2id_project_quick_jump_box" ).width() + 60);
    $( 'input[name$="q"]' ).attr( 'placeholder','Enter Search Text' );
    if (activeStaticSidebar) {
      $( "#wrapper3" ).css( "margin-left", "215px" );
      $( "#quick-search" ).css( "left", "200px" );
      $( "#top-menu" ).css( "left", "0" );
      $( "#top-menu" ).css( "width", "215px" );
      $( "#top-menu" ).css( "transition", "none" );
      $( "#quick-search" ).css( "transition", "none" );
    }

  })
  $( document ).on( "click", "#main, #header", function() {
    $( "#top-menu" ).removeClass( "open" );
    $( ".menu-push-toright" ).removeClass( "menu-push-toright" );
  });
  window.onerror = function myErrorFunction(message, url, linenumber) {
    if (location.href.indexOf("/dmsf") != -1 || location.href.indexOf("/master_backlog") != -1){
      $(document).ready(addLogo)
      if (!activeStaticSidebar) {
        $(document).ready(addElements)
      }
    }
  };

  function removeRule() {
      if(typeof window.CSSMediaRule !== "function")
          return false; //Your browser doesn't support media query feature

      var s = document.styleSheets, r,
          i, j, k;

      if(!s) return false; //no style sheets found

      // walk throuth css sheets
      for(i=0; i<s.length; i++) {
          // get all rules
          r = s[i].cssRules;
          if(!r) continue;

          for(j=0; j<r.length; j++) {
              //If there's a rule for media query
              if(r[j] instanceof CSSMediaRule &&
                      r[j].media.mediaText == "screen and (max-width: 899px)") {
                  for(k=0; k<r[j].cssRules.length; k++) {
                      // remove all rules of it
                      r[j].deleteRule(r[j].cssRules[k]);
                  }
                  return true;
              }
          }
      }
  }
  removeRule();


  // PLOCK MODIFICATIONS

  // remove header
  function removeHeader() {
    // Remove the title
    var title = document.getElementsByTagName('h1')[0];
    title.parentNode.removeChild(title);

    // scale down header
    var header = document.getElementById('header');
    var mainMenu = document.getElementById('main-menu');
    header.style.minHeight = '0px';

    if (mainMenu) {
      header.style.paddingTop = '75px';
    } else {
      header.style.paddingTop = '33px';
    }
  }

  // setup right click menu in backlog
  function setupRightClickMenu() {
    // get all tasks
    var tasks = document.getElementsByClassName('post-it');

    // add right click event to each task
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id.includes('pbi_')) {
        var currentTask = tasks[i];
        tasks[i].addEventListener('contextmenu', function(e) {
          e.preventDefault();
          var pbiId = currentTask.id.split('_')[1];
          
          // create the menu
          if (document.getElementById('right-click-menu')) {
            document.getElementById('right-click-menu').parentNode.removeChild(document.getElementById('right-click-menu'));
          }

          var menu = document.createElement('div');
          menu.className = 'right-click-menu';
          menu.id = 'right-click-menu';
          menu.style.position = 'absolute';
          menu.style.top = e.clientY + 'px';
          menu.style.left = e.clientX + 'px';
          document.body.appendChild(menu);

          // create the menu items
          var addToSprintItem = document.createElement('a');
          addToSprintItem.className = 'right-click-menu-item';
          addToSprintItem.innerText = 'Add to Sprint';
          addToSprintItem.href = '/scrum/' + pbiId + '/move_to_last_sprint';
          addToSprintItem.setAttribute('data-method', 'post');
          addToSprintItem.setAttribute('data-remote', 'true');
          addToSprintItem.setAttribute('rel', 'nofollow');
          menu.appendChild(addToSprintItem);

        });
      }
    }

    $(document).bind("click", function(event) {
      var menu = document.getElementById('right-click-menu');
      if (menu) {
        menu.parentNode.removeChild(menu);
      }
    });
  }

  $(document).ready(removeHeader);
  $(document).ready(setupRightClickMenu);

})( window );
