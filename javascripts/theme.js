console.log("test");

window.onload = function () {

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

}