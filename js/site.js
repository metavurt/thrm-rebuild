document.addEventListener("DOMContentLoaded", function(event) {

  const h = document.querySelector("header");
  const h2 = document.querySelector("h2");
  const headerHeight = h2.offsetHeight;
  const navOverlayButton = document.querySelector('.overlay-toggle');
  const navOverlay = document.querySelector('.overlay-nav');
  const mixerFilter = document.querySelector('#mixer-filter');

  const shippingBillingToggle = document.querySelector('#shipping-billing-same');

  let gasOptions;
  let flowOptions;
  let mixerElements;


  function overlayToggle() {
    navOverlayButton.classList.toggle('overlay-toggle-open');
    navOverlay.classList.toggle('overlay-open');
    document.body.classList.toggle('disable-scrolling');
  }

  function billingToggle() {
    let allBillingInputs = document.querySelectorAll("input[name^='billing-']");
    if(shippingBillingToggle.checked) {
      for(let i=0; i<allBillingInputs.length; i++) {
        allBillingInputs[i].parentNode.style.display = 'none';
      }
    } else {
      for(let i=0; i<allBillingInputs.length; i++) {
        allBillingInputs[i].parentNode.style.display = 'block';
      }
    }
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

  function mixerTool(e) {
    // what's the name and numeric values of the click target?
    // options: gases, flow, undefined (reset)

    let gasOptionsCount = gasOptions.length;
    let flowOptionsCount = flowOptions.length;

    if(e.target.value === undefined) {
      resetOptions();
      resetElements();

    } else {

      if(allOptionsUnchecked()) {
        // user has unchecked all boxes, reset all elements
        resetElements();

      } else {

        // re-filter based on selected options
        let allOptions = Array.from(gasOptions).concat(Array.from(flowOptions));
        let allApplied = [];


        for(let i=0; i< allOptions.length; i++) {
          if(allOptions[i].checked) {
            allApplied.push([allOptions[i].name, allOptions[i].value]);
          }
        }

        filterElements(allApplied);
        
      }
    }

    function resetOptions() {
      for (let i = 0; i < gasOptions.length; i++) {
        gasOptions[i].checked = false;
      }
      
      for (let i = 0; i < flowOptions.length; i++) {
        flowOptions[i].checked = false;
      }

    }

    function resetElements() {
      for (let i = 0; i < mixerElements.length; i++) {
        if(mixerElements[i].classList.contains('element-hidden')) {
          mixerElements[i].classList.remove('element-hidden');
        }
      }      
    }

    function allOptionsUnchecked() {
      // checks to see if all options are unchecked or not
      // returns boolean
      let allUnchecked = true;

      let allFilters = Array.from(gasOptions).concat(Array.from(flowOptions));

      for (let i = 0; i < allFilters.length; i++) {
        if(allFilters[i].checked == true) {
          allUnchecked = false;
          return allUnchecked;
        }
      }
      return allUnchecked;
    }

    function filterElements(options) {

      let currentOptions = options;

      for(let i=0; i<mixerElements.length; i++) {

        // current element
        let currentElement = mixerElements[i];
        
        if(!currentElement.classList.contains('element-hidden')) {
          currentElement.classList.add('element-hidden');
        }

        // loop thru options to find matches
        for(let x=0; x<currentOptions.length;x++) {

          let currentName = currentOptions[x][0];
          let currentValue = currentOptions[x][1];

          if( currentElement.dataset[currentName] == currentValue) {
            // if element is not already hidden, hide it
            if(currentElement.classList.contains('element-hidden')) {
              currentElement.classList.remove('element-hidden');
            }
          }
          // element default is VISIBLE
          // if currentelement.dataset.[x].value = currentOptions[x][i], is a match, LEAVE VISIBLE
          // else a false flag, so element should be hidden
          
        }
      }

    }

  }

  window.addEventListener('scroll', headerToggle);
  navOverlayButton.addEventListener('click', overlayToggle);

  if(shippingBillingToggle) {
    shippingBillingToggle.addEventListener('click', billingToggle);
  }

  if(mixerFilter) {
    gasOptions = mixerFilter.querySelectorAll('input[name="gas"]');
    flowOptions = mixerFilter.querySelectorAll('input[name="flow"]');
    mixerElements = document.querySelectorAll('.product-listing');
    mixerFilter.addEventListener('click', mixerTool, this);
  }

});

