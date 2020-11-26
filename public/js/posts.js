(function () {
  let btnUp = document.querySelector("#posts .hiddenBtn");
  //   console.log(btnUp, ' - btnUp');
  window.addEventListener("scroll", scrollUp);
  btnUp.addEventListener("click", backToTop);

  function scrollUp() {
    let scrollPx = window.scrollY;
    let heightDoc = document.documentElement.clientHeight;

    if (scrollPx < heightDoc) {
      btnUp.classList.remove("btnUp");
      //   console.log(scrollPx, " - scrollPx");
    }
    if (scrollPx > heightDoc) {
      btnUp.classList.add("btnUp");
      //   console.log(heightDoc, " - heightDoc");
    }
  }

  function backToTop() {
    if (window.scrollY > 0) {
      window.scrollBy(0, -50);
      setTimeout(backToTop, 15);
    }
  }

  console.log(btnUp);
})();
