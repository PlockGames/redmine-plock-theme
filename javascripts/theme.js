window.onload = function () {

    // if on home page and connected redirect to my page
    var allLinks = document.createElement('a');
    
    if (window.location.href === "https://redmine.plickplock.com/") {
        for (var i = 0; i < allLinks.length; i++) {
            console.log(allLinks[i].className);
            if (allLinks[i].className ==='logout') {
                window.location.href = '/my/page/';
            }   
        }
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
    logoLink.href = '/';
    logoLink.appendChild(logo);
    title.parentNode.insertBefore(logoLink, title);

    // remove quick search
    var quickSearch = document.getElementById('quick-search');
    quickSearch.parentNode.removeChild(quickSearch);

    // move top menu inside header
    header.appendChild(topMenu);
    
    // remove some link from top menu
    var links = topMenu.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        if (links[i].className === 'help' || links[i].className === 'home') {
            links[i].parentNode.removeChild(links[i]);
        }
    }

}