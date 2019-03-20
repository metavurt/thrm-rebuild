document.addEventListener("DOMContentLoaded", function(event) {

  const h = document.querySelector("header");
  const h2 = document.querySelector("h2");
  const headerHeight = h2.offsetHeight;
  const navOverlayButton = document.querySelector('.overlay-toggle');
  const navOverlay = document.querySelector('.overlay-nav');



  function overlayToggle() {
    navOverlayButton.classList.toggle('overlay-toggle-open');
    navOverlay.classList.toggle('overlay-open');
    document.body.classList.toggle('disable-scrolling');
  }


  function headerToggle() {
      
    if (window.scrollY >= headerHeight) {
        if(!h.classList.contains('header-light')) {
          h.classList.add('header-light');
        }
      } else {
      if(h.classList.contains('header-light')) {
        h.classList.remove('header-light');
      }
    }
  }

  window.addEventListener('scroll', headerToggle);
  navOverlayButton.addEventListener('click', overlayToggle);

});
