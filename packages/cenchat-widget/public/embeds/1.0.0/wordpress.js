(function () {
  /**
   * @param {string} value
   * @return {string} Encoded URL
   * @function
   */
  function fixedEncodeURIComponent(value) {
    return encodeURIComponent(value).replace(/[.!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
  }

  function getThemeColor() {
    return getComputedStyle(document.body).getPropertyValue('background-color');
  }
  
  function isLightThemeColor(themeColor) {
    const rgb = themeColor.replace(/[^\d,]/g, '').split(',');

    if (rgb.length > 3) {
      return true;
    }
  
    const brightness = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
  
    return brightness > 155;
  }

  /**
   * @return {Element|null} Cenchat button
   */
  function getCenchatButton() {
    return document.querySelector('#cenchat-widget-button');
  }

  /**
   * @return {string} Site ID
   * @function
   */
  function getSiteId() {
    return getCenchatButton().getAttribute('data-site-id');
  }

  /**
   * @return {string} Page ID
   * @function
   */
  function getPageId() {
    return getCenchatButton().getAttribute('data-page-id');
  }

  /**
   * @return {Element} Container element
   * @function
   */
  function getContainerElement() {
    return document.querySelector('.cenchat-widget-container');
  }

  /**
   * @return {Element|null} URL Element
   * @function
   */
  function getCanonicalUrlElement() {
    const canonicalUrlElement = document.querySelector('link[rel="canonical"]');

    if (canonicalUrlElement && canonicalUrlElement.hasAttribute('href')) {
      const urlElement = document.createElement('a');

      urlElement.href = canonicalUrlElement.getAttribute('href');

      return urlElement;
    }

    const ogUrlElement = document.querySelector('meta[property="og:url"]');

    if (ogUrlElement && ogUrlElement.hasAttribute('content')) {
      const urlElement = document.createElement('a');

      urlElement.href = ogUrlElement.getAttribute('content');

      return urlElement;
    }

    return null;
  }

  /**
   * @param {string} url
   * @return {string} Slug
   * @function
   */
  function getSlug(url) {
    return fixedEncodeURIComponent(`${url.pathname}${url.search}`);
  }

  /**
   * @return {Element} Outer wrapper element
   * @function
   */
  function getOuterWrapperElement() {
    return document.querySelector('.cenchat-widget-outer-wrapper');
  }

  /**
   * @return {Element} Inner wrapper element
   * @function
   */
  function getInnerWrapperElement() {
    return document.querySelector('.cenchat-widget-inner-wrapper');
  }

  /**
   * @return {Element} IFrame element
   * @function
   */
  function getIframeElement() {
    return document.querySelector('.cenchat-widget-iframe');
  }

  /**
   * @return {string} IFrame source URL search
   * @function
   */
  function getIframeSrcSearch() {
    const canonicalUrlElement = getCanonicalUrlElement();

    if (canonicalUrlElement) {
      const slug = getSlug(canonicalUrlElement);

      return `?slug=${slug}`;
    }

    const pageUrlElement = document.createElement('a');

    pageUrlElement.href = window.location.href;

    return `?slug=${getSlug(pageUrlElement)}`;
  }

  /**
   * @return {string} IFrame src
   * @function
   */
  function getIframeSrc() {
    const siteId = getSiteId();
    const pageId = getPageId();
    const iframeUrl = `https://widget.cenchat.com/sites/${siteId}/pages/${pageId}`;

    return `${iframeUrl}${getIframeSrcSearch()}`;
  }

  /**
   * @function
   */
  function createIframe() {
    if (!getIframeElement()) {
      const iframeElement = document.createElement('iframe');

      iframeElement.classList.add('cenchat-widget-iframe');

      iframeElement.src = getIframeSrc();

      getInnerWrapperElement().appendChild(iframeElement);
    }
  }

  /**
   * @function
   */
  function setupStyles() {
    const styleElement = document.createElement('style');

    styleElement.type = 'text/css';
    styleElement.innerHTML = `
      .cenchat-widget-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 240000;
        pointer-events: none;
      }
      
      .cenchat-widget-container--visible {
        pointer-events: auto;
      }
      
      .cenchat-widget-outer-wrapper {
        position: fixed;
        bottom: 0;
        z-index: 256000;
        display: none;
        width: 100%;
        height: calc(100% - 56px);
        overflow: hidden;
        border: none;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }
      
      @media (min-width: 960px) {
        .cenchat-widget-outer-wrapper {
          top: auto;
          right: 24px;
          bottom: 104px;
          left: auto;
          width: 320px;
          height: 568px;
          border-radius: 16px;
          transform-origin: right bottom;
        }
      }
      
      .cenchat-widget-outer-wrapper--hiding {
        display: block;
        animation-name: cenchat-widget-outer-wrapper-compress;
        animation-duration: 195ms;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }
      
      .cenchat-widget-outer-wrapper--visible {
        display: block;
        animation-name: cenchat-widget-outer-wrapper-expand;
        animation-duration: 225ms;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }
      
      .cenchat-widget-inner-wrapper {
        -webkit-overflow-scrolling: touch;
        display: flex;
        height: 100%;
        overflow: auto;
      }
      
      .cenchat-widget-iframe {
        width: 100%;
        height: 100%;
        border: none;
      }

      #cenchat-widget-button {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 60000;
        display: inline-block !important;
        width: 56px;
        height: 56px;
        padding: 16px;
        border: none;
        border-radius: 28px;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
        animation-name: cenchat-widget-button-expand;
        animation-duration: 100ms;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        animation-fill-mode: forwards;
      }

      @media (min-width: 960px) {
        #cenchat-widget-button {
          right: 24px;
          bottom: 24px;
        }
      }

      #cenchat-widget-button svg {
        height: 24px;
        margin-left: -25%;
      }
      
      @keyframes cenchat-widget-outer-wrapper-expand {
        0% {
          transform: translateY(120%);
        }
      
        100% {
          transform: translateY(0);
        }
      }
      
      @keyframes cenchat-widget-outer-wrapper-compress {
        0% {
          transform: translateY(0);
        }
      
        100% {
          transform: translateY(120%);
        }
      }
      
      @media (min-width: 960px) {
        @keyframes cenchat-widget-outer-wrapper-expand {
          0% {
            transform: scale(0, 0);
          }
      
          12% {
            transform: scale(0.12, 0);
          }
      
          66% {
            transform: scale(1, 0.71);
          }
      
          100% {
            transform: scale(1, 1);
          }
        }
      
        @keyframes cenchat-widget-outer-wrapper-compress {
          0% {
            transform: scale(1, 1);
          }
      
          21% {
            transform: scale(1, 0.78);
          }
      
          79% {
            transform: scale(0.22, 0);
          }
      
          100% {
            transform: scale(0, 0);
          }
        }

        @keyframes cenchat-widget-button-expand {
          0% {
            transform: scale(0);
          }
        
          100% {
            transform: scale(1);
          }
        }
      }
    `;

    document.querySelector('head').appendChild(styleElement);
  }

  /**
   * @function
   */
  function setupContainer() {
    const containerElement = document.createElement('div');

    containerElement.classList.add('cenchat-widget-container');
    containerElement.addEventListener('click', () => {
      const outerWrapperElement = getOuterWrapperElement();
      const onAnimationEnd = () => {
        outerWrapperElement.classList.add('cenchat-widget-outer-wrapper--hiding');

        getContainerElement().classList.remove('cenchat-widget-container--visible');

        outerWrapperElement.removeEventListener('animationend', onAnimationEnd);

        if (window.matchMedia('(max-width: 959px)').matches) {
          document.documentElement.style.removeProperty('overflow');
        }
      };

      outerWrapperElement.addEventListener('animationend', onAnimationEnd);
      outerWrapperElement.classList.replace('cenchat-widget-outer-wrapper--visible', 'cenchat-widget-outer-wrapper--hiding');
    });

    document.body.appendChild(containerElement);

    const outerWrapperElement = document.createElement('div');

    outerWrapperElement.classList.add('cenchat-widget-outer-wrapper');

    const themeColor = getThemeColor();

    if (isLightThemeColor(themeColor)) {
      outerWrapperElement.style.setProperty('background-color', '#ffffff');
    } else {
      outerWrapperElement.style.setProperty('background-color', '#121212');
    }

    containerElement.appendChild(outerWrapperElement);

    const innerWrapperElement = document.createElement('div');

    innerWrapperElement.classList.add('cenchat-widget-inner-wrapper');

    outerWrapperElement.appendChild(innerWrapperElement);
  }

  /**
   * @function
   */
  function setupButton() {
    const buttonElement = getCenchatButton();

    buttonElement.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 959px)').matches) {
        document.documentElement.style.setProperty('overflow', 'hidden');
      }

      createIframe();
      getContainerElement().classList.add('cenchat-widget-container--visible');
      getOuterWrapperElement().classList.add('cenchat-widget-outer-wrapper--visible');
    });
  }

  if (getCenchatButton() && getSiteId() && getPageId()) {
    setupStyles();
    setupContainer();
    setupButton();
  }
}());
