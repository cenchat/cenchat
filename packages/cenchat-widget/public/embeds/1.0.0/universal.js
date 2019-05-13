(function () {
  /**
   * @return {Element|null} Cenchat button
   */
  function getCenchatButton() {
    return document.querySelector('#cenchat-widget-button')
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
   * @param {string} value
   * @return {string} Encoded URL
   * @function
   */
  function fixedEncodeURIComponent(value) {
    return encodeURIComponent(value).replace(/[.!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
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
    let iframeUrl = `https://widget.cenchat.com/sites/${siteId}/pages/${pageId}`;

    return `${iframeUrl}${getIframeSrcSearch()}`;
  }

  /**
   * @return {Element} IFrame
   * @function
   */
  function createIframe() {
    if (!getIframeElement()) {
      const iframeElement = document.createElement('iframe');

      iframeElement.classList.add('cenchat-widget-iframe');

      iframeElement.src = getIframeSrc();

      getContainerElement().appendChild(iframeElement);
    }
  }

  /**
   * @return {Element} IFrame element
   * @function
   */
  function getIframeElement() {
    return document.querySelector('.cenchat-widget-iframe');
  }

  /**
   * @return {Element} Container element
   * @function
   */
  function getContainerElement() {
    return document.querySelector('.cenchat-widget-container');
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
        z-index: 24000;
        pointer-events: none;
      }
      
      .cenchat-widget-container--visible {
        pointer-events: auto;
      }
      
      .cenchat-widget-iframe {
        position: fixed;
        bottom: 0;
        z-index: 25600;
        display: none;
        width: 100%;
        height: calc(100% - 56px);
        overflow: hidden;
        background-color: #fff;
        border: none;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }
      
      @media (min-width: 960px) {
        .cenchat-widget-iframe {
          top: auto;
          right: 24px;
          bottom: 24px;
          left: auto;
          width: 320px;
          height: 568px;
          border-radius: 16px;
          transform-origin: right bottom;
        }
      }
      
      .cenchat-widget-iframe--hiding {
        display: block;
        animation-name: cenchat-widget-iframe-compress;
        animation-duration: 195ms;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }
      
      .cenchat-widget-iframe--visible {
        display: block;
        animation-name: cenchat-widget-iframe-expand;
        animation-duration: 225ms;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }
      
      @keyframes cenchat-widget-iframe-expand {
        0% {
          transform: translateY(120%);
        }
      
        100% {
          transform: translateY(0);
        }
      }
      
      @keyframes cenchat-widget-iframe-compress {
        0% {
          transform: translateY(0);
        }
      
        100% {
          transform: translateY(120%);
        }
      }
      
      @media (min-width: 960px) {
        @keyframes cenchat-widget-iframe-expand {
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
      
        @keyframes cenchat-widget-iframe-compress {
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
      const iframeElement = getIframeElement();
      const onAnimationEnd = () => {
        iframeElement.classList.add('cenchat-widget-iframe--hiding');

        getContainerElement().classList.remove('cenchat-widget-container--visible');

        iframeElement.removeEventListener('animationend', onAnimationEnd);
      };

      iframeElement.addEventListener('animationend', onAnimationEnd);
      iframeElement.classList.replace('cenchat-widget-iframe--visible', 'cenchat-widget-iframe--hiding');
    });

    document.body.appendChild(containerElement);
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
      getIframeElement().classList.add('cenchat-widget-iframe--visible');
    });
  }

  if (getCenchatButton() && getSiteId() && getPageId()) {
    setupStyles();
    setupContainer();
    setupButton();
  }
}());
