// Roda antes da página aparecer: decide se a intro deve ser exibida, sem "piscar" o conteúdo.
(function () {
  try {
    var viu = sessionStorage.getItem('intro-vista') === '1';
    var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ?intro na URL força a intro (para rever ou testar).
    var forcar = /[?&]intro\b/.test(window.location.search);
    if ((forcar || (!viu && !semMovimento)) && document.documentElement.hasAttribute('data-tem-intro')) {
      document.documentElement.setAttribute('data-intro', 'on');
    }
  } catch (e) {}
})();
