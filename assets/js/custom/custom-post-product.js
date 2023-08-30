(function(){

  function deleteProductCardElement($section){

    const $divProductCard = $section.querySelector('.kg-product-card');
    if($divProductCard !== null) $section.removeChild($divProductCard);
    return $divProductCard;
  }

  function addProductCardElementToNewSection($section, $div){
    $section.appendChild($div);
  }

  function deleteTHead($section){
    const $table = $section.querySelector('table');
    if($table !== null){
      const $thead = $table.querySelector('thead');
      $table.removeChild($thead);
    }
  }

  function addColorToSvgExapandMoreInToggle($section){
    const l$divToggleCard = $section.querySelectorAll('.kg-toggle-card');
    const length = l$divToggleCard.length;
    if(length > 0){
      for(let index = 0; index < length; index++){
        const $button = l$divToggleCard[index].querySelector('button');
        const $svg = $button.querySelector('svg');
        $svg.setAttribute('class','svgExpandMoreAccentColor');
      }
    }
  }

  function beginDOMContentLoaded(){

    const coords = document.body.getBoundingClientRect();

    const $sectionPostContent = document.querySelector('#idPostContent');
    deleteTHead($sectionPostContent);
    addColorToSvgExapandMoreInToggle($sectionPostContent);

    if(coords.width >= 992){
      
      const $sectionCustomPostProduct = document.querySelector('#idCustomPostProduct');
      const $divProductCard = deleteProductCardElement($sectionPostContent);
      if($divProductCard !== null){
        addProductCardElementToNewSection($sectionCustomPostProduct, $divProductCard);
      }
    }
  }

  function beginResize(){

    setTimeout(() => {

      const coords = document.body.getBoundingClientRect();

      if(coords.width >= 992){
        const $sectionPostContent = document.querySelector('#idPostContent');
        const $sectionCustomPostProduct = document.querySelector('#idCustomPostProduct');
        const $divProductCard = deleteProductCardElement($sectionPostContent);
  
        if($divProductCard !== null){
          addProductCardElementToNewSection($sectionCustomPostProduct, $divProductCard);
        }
      }
    },15);
  }

  document.addEventListener('DOMContentLoaded', beginDOMContentLoaded);
  //document.addEventListener('resize', beginResize);
  //document.removeEventListener('resize',beginResize);

})();