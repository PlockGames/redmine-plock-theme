console.log("test");

window.onload = function () {

    var topMenu = document.getElementById('top-menu');
    var header = document.getElementById('header');

    // wrap topmenu and header in a div to be able to reverse them
    var parent = topMenu.parentNode;
    var wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'top-wrapper');
    parent.replaceChild(wrapper, topMenu);
    wrapper.appendChild(topMenu);
    wrapper.appendChild(header);

    // Change the title
    document.getElementsByTagName('h1')[0].innerHTML = 'Plock Project Manager';
}