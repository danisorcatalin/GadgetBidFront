interface GTMConfig {
  gtmId: string;
}

const warn = (...args) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.warn(...args);
};

class GTM {
  gtmId = null;

  initialized = false;

  configure(config: GTMConfig) {
    this.gtmId = config.gtmId;
  }

  initialize(config) {
    if (this.initialized) {
      warn('GTM can only be initialized once.');
      return;
    }

    if (!document) {
      warn('GTM can be initialized only on client side.');
      return;
    }

    if (!config.gtmId) {
      warn('GTM requires a GTM ID to be loaded.');
      return;
    }

    this.configure(config);
    const script = document.createElement('script');
    const noscript = document.createElement('noscript');

    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${this.gtmId}');
    `;
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${this.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;

    document.head.insertBefore(script, document.head.childNodes[0]);
    document.body.insertBefore(noscript, document.body.childNodes[0]);
  }

  push(...args) {
    if (!window) {
      warn('GTM push works only on client side.');
      return;
    }

    if (!(window as unknown)['dataLayer']) {
      (window as unknown)['dataLayer'] = [];
    }

    (window as unknown)['dataLayer'].push(...args);
  }
}

const gtm = new GTM();

export default gtm;
