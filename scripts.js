window.addEventListener('scroll', function() {
    let offset = window.pageYOffset;
    let parallax = document.querySelectorAll('.parallax');

    parallax.forEach(function(element) {
        let speed = element.getAttribute('data-speed');
        element.style.backgroundPositionY = (offset * speed) + 'px';
    });
});