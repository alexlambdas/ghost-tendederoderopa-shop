(function(){

  const domainUrl = 'https://tendederoderopa.shop';

  const navigationMenu = [
    {
      textContent: 'Inicio',
      id: 'idInicio',
      path: '/inicio/',
      value: undefined,
    },
    {
      textContent: 'Plegable',
      id: 'idPlegable',
      path: '/plegable/',
      value: [
        ['Piso','piso'],
        ['Pared','pared'],
        ['Aluminio','alumino'],
        ['Niveles','niveles'],
        ['Metálico','metalico'],
        ['Acero','acero'],
        ['Madera','madera'],
        ['Plastico','plastico'],
        ['Metros','metros'],
        ['Techo','techo'],
        ['Grande','grande'],
        ['Balcón','balcon'],
        ['Alto','alto']
      ]
    },
    {
      textContent: 'Ubicación',
      id: 'idUbicacion',
      path: '/ubicacion/',
      value: [
        ['Apartamento','apartamento'],
        ['Patios','patios'],
        ['Techo','techo'],
        ['Balcón','balcon'],
        ['Terraza','terraza'],
        ['Ventana','ventana'],
        ['Aseo','aseo'],
        ['Jardín','jardin'],
        ['Espacios Grandes','espacios-grandes'],
        ['Espacios Reducidos','espacios-reducidos']
      ]
    },
    {
      textContent: 'Tipos',
      id: 'idTipos',
      path: '/tipos/',
      value: [
        ['Pared','pared'],
        ['Piso','piso'],
        ['Giratorio','giratorio'],
        ['Eléctrico','electrico'],
        ['Pulpo','pulpo'],
        ['Redondo','redondo'],
        ['Cuadrado','cuadrado'],
        ['Cubierto','cubierto'],
        ['Con Poleas','con-poleas'],
        ['Con Cuerdas','con-cuerdas']
      ]
    },
    {
      textContent: 'Material',
      id: 'idMaterial',
      path: '/material/',
      value: [
        ['Aluminio','aluminio'],
        ['Madera','madera'],
        ['Acero','acero'],
        ['Metálico','metalico'],
        ['Plastico','plastico'],
        ['Hierro','hierro']
      ]
    },
    {
      textContent: 'para Prendas',
      id: 'idPrendas',
      path: '/para-prendas/',
      value: [
        ['Camisas','camisas'],
        ['Bebe','bebe'],
        ['Sabanas','sabanas']
      ]
    }
  ];

  function svgExpandMore(width = '', height = '', fill = ''){
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} fill=${fill} viewBox="0 -960 960 960">
        <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
      </svg>
    `;
  }

  function addSvgExpandMoreOnMainMenu($navUlLi = HTMLUListElement, mapTextContentToValue = new Map()){

    const length = $navUlLi.length;
    const accentColor = getComputedStyle(document.body).getPropertyValue('--ghost-accent-color');
    for(let index = 0; index < length; index++){

      const textContent = $navUlLi[index].textContent.toString().trim();
      if(mapTextContentToValue.get(textContent) !== undefined){

        const $span = document.createElement('span');
        $span.setAttribute('id',`idSvgExpandMore${index}`);
        $span.innerHTML = svgExpandMore('20','20',`${accentColor}`);

        const $a = $navUlLi[index].querySelector('a');
        $a.appendChild($span);
      }
    }
  }

  function createOneSubMenu(domainUrl = '', id = '', path = '', value = Array()){

    const $ulSubMenu = document.createElement('ul');
    $ulSubMenu.setAttribute('id',id);
    $ulSubMenu.style.visibility = 'hidden';
    const length = value.length;

    if(value.length >  7) $ulSubMenu.setAttribute('class','subMenuTwoColumns');
    else $ulSubMenu.setAttribute('class','subMenuOneColumn');

    for(let index = 0; index < length; index++){

      const $a = document.createElement('a');
      const $textLink = document.createTextNode(value[index][0]);
      $a.appendChild($textLink);
      $a.href = domainUrl+path+value[index][1];

      const $li = document.createElement('li');
      $li.appendChild($a);

      $ulSubMenu.appendChild($li);
    }

    return $ulSubMenu;
  }

  function createAllSubMenus(domainUrl = '', navigationMenu = Array()){
    return function(fnCreateOneSubMenu){

      const $allUlSubMenus = new Map();
      const length = navigationMenu.length;

      for(let index = 0; index < length; index++){
        const {id,path,value} = navigationMenu[index];
        if(navigationMenu[index].value != undefined){
          $allUlSubMenus.set(id,fnCreateOneSubMenu(domainUrl,id,path,value));
        }
      }

      return $allUlSubMenus;
    }
  }

  function createMapTextContentToId(navigationMenu = Array()){

    const mapTextContentToId = new Map();
    const length = navigationMenu.length;

    for(let index = 0; index < length; index++){
      const textContent = navigationMenu[index].textContent;
      const id = navigationMenu[index].id;
      mapTextContentToId.set(textContent,id);
    }

    return mapTextContentToId;
  }

  function createMapTextContentToValue(navigationMenu = Array()){

    const mapTextContentToValue = new Map();
    const length = navigationMenu.length;

    for(let index = 0; index < length; index++){
      const textContent = navigationMenu[index].textContent;
      const value = navigationMenu[index].value;
      mapTextContentToValue.set(textContent,value);
    }

    return mapTextContentToValue;
  }


  function mouseOverMenu(id = '', mapIdToUlSubMenu = new Map()){
    mapIdToUlSubMenu.forEach($ulSubMenu => $ulSubMenu.style.visibility = 'hidden');
    $ul = document.getElementById(id);
    $div = document.getElementById(`${id}Div`);
    $ul.style.visibility = 'visible';
    $div.style.visibility = 'visible';
  }

  function mouseOutMenu(id = ''){
    $ul = document.getElementById(id);
    $ul.style.visibility = 'hidden';
    $div = document.getElementById(`${id}Div`);
    $div.style.visibility = 'hidden';
  }


  function initNav(
    mapIdToUlSubMenu = new Map(),
    mapTextContentToId = new Map(),
    mapTextContentToValue = new Map(),
    $navUlLi = Array()){

      if(window.screen.width > 767){

        addSvgExpandMoreOnMainMenu($navUlLi,mapTextContentToValue);

        const length = $navUlLi.length;

        for(let index = 0; index < length; index++){

          const textContent = $navUlLi[index].textContent.toString().trim();

          if(mapTextContentToValue.get(textContent) !== undefined){
            const id = mapTextContentToId.get(textContent);
            const $ulSubMenu = mapIdToUlSubMenu.get(id);
            const $div = document.createElement('div');
            $div.setAttribute('id',`${id}Div`);
            $div.setAttribute('class','subMenuSpace');
            $div.style.visibility = 'hidden';
            $navUlLi[index].appendChild($div);
            $navUlLi[index].appendChild($ulSubMenu);
            $navUlLi[index].addEventListener('mouseover',() => mouseOverMenu(id,mapIdToUlSubMenu));
            $navUlLi[index].addEventListener('mouseout',() => mouseOutMenu(id));
          }
        }
      }
  }

  document.addEventListener('DOMContentLoaded', function(){

    const mapIdToUlSubMenu = createAllSubMenus(domainUrl,navigationMenu)(createOneSubMenu);
    const mapTextContentToId = createMapTextContentToId(navigationMenu);
    const mapTextContentToValue = createMapTextContentToValue(navigationMenu);

    const $nav = document.querySelector('.gh-head-menu');
    const $navUl = $nav.querySelector('ul');
    const $navUlLi = $navUl.querySelectorAll('li');

    initNav(mapIdToUlSubMenu,mapTextContentToId,mapTextContentToValue,$navUlLi);
  });

})();