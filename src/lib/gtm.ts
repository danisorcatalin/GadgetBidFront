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
