window.onload = function () {

    // if on home page and connected redirect to my page
    var allLinks = document.getElementsByTagName('a');
    var loggedIn = false;

    for (var i = 0; i < allLinks.length; i++) {
        console.log(allLinks[i].className);
        if (allLinks[i].className ==='logout') {
            loggedIn = true;
            break;
        }   
    }
    
    // if on home page and connected redirect to my page
    if (window.location.href === "https://redmine.plickplock.com/" && loggedIn) {
        window.location.href = '/my/page/';
    }

    var topMenu = document.getElementById('top-menu');
    var header = document.getElementById('header');
    var title = document.getElementsByTagName('h1')[0];

    // wrap topmenu and header in a div to be able to reverse them
    var parent = topMenu.parentNode;
    var wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'top-wrapper');
    parent.replaceChild(wrapper, topMenu);
    wrapper.appendChild(topMenu);
    wrapper.appendChild(header);

    // Change the title
    title.innerHTML = 'Plock Project Manager';

    // Add logo before title
    var logo = document.createElement('img');
    logo.src = 'https://i.imgur.com/WAOVJvT.png';
    logo.style.height = '50px';
    logo.style.marginRight = '10px';
    title.parentNode.insertBefore(logo, title);

    // wrap title and logo in a div
    var titleWrapper = document.createElement('div');
    titleWrapper.setAttribute('id', 'title-wrapper');
    title.parentNode.replaceChild(titleWrapper, title);
    titleWrapper.appendChild(logo);
    titleWrapper.appendChild(title);
    titleWrapper.style.display = 'flex';
    titleWrapper.style.alignItems = 'center';

    // wrap logo in a 'a' tag to make it clickable
    var logoLink = document.createElement('a');
    if (loggedIn) {
        logoLink.href = '/my/page/';
    } else {
        logoLink.href = '/';
    }
    logoLink.appendChild(logo);
    title.parentNode.insertBefore(logoLink, title);

    // remove quick search for now
    var quickSearch = document.getElementById('quick-search');
    quickSearch.parentNode.removeChild(quickSearch);

    // remove account display for now
    var account = document.getElementById('account');
    account.parentNode.removeChild(account);
    var loggedAs = document.getElementById('loggedas');
    loggedAs.parentNode.removeChild(loggedAs);

    // move top menu inside header
    header.appendChild(topMenu);
    
    // remove some link from top menu
    var links = topMenu.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        if (links[i].className === 'help' || links[i].className === 'home') {
            links[i].parentNode.removeChild(links[i]);
        }
    }

    // wrap each links of top menu in a div
    for (var i = 0; i < links.length; i++) {
        var linkWrapper = document.createElement('div');
        linkWrapper.appendChild(links[i]);
        linkWrapper.className = 'tm-item-wrapper';
        topMenu.appendChild(linkWrapper);
    }

}