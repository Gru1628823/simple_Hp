function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
$(".open").click(function () {
    var container = $(this).parents(".topic");
    var answer = container.find(".answer");
    var trigger = container.find(".faq-t");

    answer.slideToggle(200);

    if (trigger.hasClass("faq-o")) {
        trigger.removeClass("faq-o");
    } else {
        trigger.addClass("faq-o");
    }

    if (container.hasClass("expanded")) {
        container.removeClass("expanded");
    } else {
        container.addClass("expanded");
    }
});

// ----------------------------------------------------------

let tickerSpeed = 2;

let flickity = null;
let isPaused = false;
const slideshowEl = document.querySelector('.js-slideshow');


//
//   Functions
//
//////////////////////////////////////////////////////////////////////

const update = () => {
  if (isPaused) return;
  if (flickity.slides) {
    flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
    flickity.selectedIndex = flickity.dragEndRestingSelect();
    flickity.updateSelectedSlide();
    flickity.settle(flickity.x);
  }
  window.requestAnimationFrame(update);
};

const pause = () => {
  isPaused = true;
};

const play = () => {
  if (isPaused) {
    isPaused = false;
    window.requestAnimationFrame(update);
  }
};


//
//   Create Flickity
//
//////////////////////////////////////////////////////////////////////

flickity = new Flickity(slideshowEl, {
  autoPlay: false,
  prevNextButtons: true,
  pageDots: false,
  draggable: true,
  wrapAround: true,
  selectedAttraction: 0.015,
  friction: 0.25
});
flickity.x = 0;


//
//   Add Event Listeners
//
//////////////////////////////////////////////////////////////////////

slideshowEl.addEventListener('mouseenter', pause, false);
slideshowEl.addEventListener('focusin', pause, false);
slideshowEl.addEventListener('mouseleave', play, false);
slideshowEl.addEventListener('focusout', play, false);

flickity.on('dragStart', () => {
  isPaused = true;
});


//
//   Start Ticker
//
//////////////////////////////////////////////////////////////////////

update();