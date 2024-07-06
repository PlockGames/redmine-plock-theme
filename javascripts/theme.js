var topMenu = document.getElementByID('top-menu');
var header = document.getElementByID('header');

// wrap topmenu and header in a div to be able to reverse them
var wrapper = document.createElement('div');
wrapper.setAttribute('id', 'top-wrapper');
wrapper.appendChild(topMenu);
wrapper.appendChild(header);
