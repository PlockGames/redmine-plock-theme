var topMenu = document.getElementByID('top-menu');
var header = document.getElementByID('header');

// wrap topmenu and header in a div to be able to reverse them
var parent = topMenu.parentNode;
var wrapper = document.createElement('div');
wrapper.setAttribute('id', 'top-wrapper');
parent.replaceChild(wrapper, topMenu);
wrapper.appendChild(topMenu);
wrapper.appendChild(header);
