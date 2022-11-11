/*********************************************** */

//Scroll chapters move

(function () {
  var slidersContainer = document.querySelector(".sliders-container");

  // Initializing the numbers slider
  var msNumbers = new MomentumSlider({
    el: slidersContainer,
    cssClass: "ms--numbers",
    range: [1, 4],
    rangeContent: function (i) {
      return "0" + i;
    },
    style: {
      transform: [{ scale: [0.4, 1] }],
      opacity: [0, 1],
    },
    interactive: false,
  });

  // Initializing the titles slider
  var titles = [
    "King of the Ring Fight",
    "Sound of Streets",
    "Urban Fashion",
    "Windy Sunset",
  ];
  var msTitles = new MomentumSlider({
    el: slidersContainer,
    cssClass: "ms--titles",
    range: [0, 3],
    rangeContent: function (i) {
      return "<h3>" + titles[i] + "</h3>";
    },
    vertical: true,
    reverse: true,
    style: {
      opacity: [0, 1],
    },
    interactive: false,
  });

  // Initializing the links slider
  var msLinks = new MomentumSlider({
    el: slidersContainer,
    cssClass: "ms--links",
    range: [0, 3],
    rangeContent: function () {
      return '<a class="ms-slide__link">View Case</a>';
    },
    vertical: true,
    interactive: false,
  });

  // Get pagination items
  var pagination = document.querySelector(".pagination");
  var paginationItems = [].slice.call(pagination.children);

  // Initializing the images slider
  var msImages = new MomentumSlider({
    // Element to append the slider
    el: slidersContainer,
    // CSS class to reference the slider
    cssClass: "ms--images",
    // Generate the 4 slides required
    range: [0, 3],
    rangeContent: function () {
      return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
    },
    // Syncronize the other sliders
    sync: [msNumbers, msTitles, msLinks],
    // Styles to interpolate as we move the slider
    style: {
      ".ms-slide__image": {
        transform: [{ scale: [1.5, 1] }],
      },
    },
    // Update pagination if slider change
    change: function (newIndex, oldIndex) {
      if (typeof oldIndex !== "undefined") {
        paginationItems[oldIndex].classList.remove("pagination__item--active");
      }
      paginationItems[newIndex].classList.add("pagination__item--active");
    },
  });

  // Select corresponding slider item when a pagination button is clicked
  pagination.addEventListener("click", function (e) {
    if (e.target.matches(".pagination__button")) {
      var index = paginationItems.indexOf(e.target.parentNode);
      msImages.select(index);
    }
  });
})();

/*

/*
Acá inicia los scripts del scroll
*///Owl Carousel
// vars
"use strict";
var testim = document.getElementById("norm"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }
  });
};

