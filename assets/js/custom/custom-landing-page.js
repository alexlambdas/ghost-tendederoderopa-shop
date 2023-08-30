(function(){

  function createCustomHeaderSection($header){

    const $h1 = $header.querySelector('h1');
    const $figure = $header.querySelector('figure');

    if($h1 !== null && $figure !== null){
      const $div = document.createElement('div');
      const $divOpacity = document.createElement('div');
      $div.appendChild($divOpacity);
      $div.appendChild($h1);
      $div.appendChild($figure);
      $header.appendChild($div);
    }
  }

  function centerH1Title($header){
    const $h1 = $header.querySelector('.article-title');
    if($h1 !== null){
      const coords = $h1.getBoundingClientRect();
      const bodyWidth = document.body.clientWidth;
      const percentageH1 = (coords.width*100)/bodyWidth;
      const remainingPercentage = 100-percentageH1;
      $h1.style.left = `${parseInt(remainingPercentage/2)}%`;
    }
  }

  function beginDOMContentLoaded(){
    const $main = document.querySelector('#idCustomLandingPage');
    const $article = $main.querySelector('article');
    const $header = $article.querySelector('header');

    createCustomHeaderSection($header);
    centerH1Title($header);
  }

  document.addEventListener('DOMContentLoaded', beginDOMContentLoaded);

})();