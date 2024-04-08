const asideState = {
  // Initialize the aside state
  init: async function() {
    try {
      const dataFileName = await this.getModuleName();
      const module = await import(`../../${dataFileName}.js`);

      console.log('module', module);
      console.log('dataFileName', dataFileName);

      document.getElementById('part-aside').innerHTML = await module.default.initModuleState();
    } catch (error) {
      console.error('Error initializing aside:', error);
    }
  },
  getModuleName: async function() {
    return document.getElementById('part-aside').getAttribute('data-module-name');
  },
};

export default asideState;
