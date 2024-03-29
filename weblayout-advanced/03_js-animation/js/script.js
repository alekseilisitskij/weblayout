document.addEventListener('DOMContentLoaded', function () {
  let menu = document.querySelector ('.menu');

  // tl - timeline загрузки
  let tl = gsap.timeline ();
  // tlb - timeline появления меню.
  let tlb = gsap.timeline ();

  tl.pause();
  tlb.pause();
  // --------

  tl.from (".hero__btn", {duration: 1, opacity: 0, y: 60, ease: "expo"});
  tl.from (".hero__title", {duration: 1.1, opacity: 0, y: 40, ease: "expo"}, "-=0.9");
  tl.from (".hero__descr", {duration: 2, opacity: 0, ease: "expo"}, "-=0.6");

  tl.from (".photos-wrap img:nth-child(1)", {duration: 1, opacity: 0, scale: 0.8, ease: "expo"}, "-=2");
  tl.from (".photos-wrap img:nth-child(2)", {duration: 1, opacity: 0, scale: 0.8, ease: "expo"}, "-=1.7");
  tl.from (".photos-wrap img:nth-child(3)", {duration: 1, opacity: 0, scale: 0.8, ease: "expo"}, "-=1.4");

  tl.from (".photos__author", {duration: 2, opacity: 0, ease: "expo"}, "-=1");

  tl.play ();
  // --------

  tlb.from (".menu", {duration: 1, opacity: 0, ease: "expo"})
      .from (".nav__list", {duration: 1, opacity: 0, y: 20, ease: "expo"}, "-=0.5")
      .from (".sub-menu, .social", {duration: 1, opacity: 0, y: 20, ease: "expo"}, "-=0.7");

  // Burger
 document.querySelector ('.burger').addEventListener ('click', function (event) {
   menu.classList.add ('menu--open');
    tlb.play ();
  })

  document.querySelector ('.close').addEventListener ('click', function (event) {
    tlb.reverse ();
    menu.classList.remove ('menu--open');
  })
})
