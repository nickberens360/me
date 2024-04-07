import loadContent from '../../utils/loadContent.js';
const asideState = {
  // Initialize the aside state
  init: async function() {

    try {
      const dataFileName = this.getModuleName();
      const module = await import(`../../${dataFileName}.js`);
      const contentId = module.default.contentId;
      const contentFileName = module.default.contentFile;

      // Load content from the server
      loadContent.gistId = contentId;
      loadContent.gistFile = contentFileName;
      loadContent.contentElementId = 'part-aside';
      await loadContent.init();
      module.default.initModuleState();
    } catch (error) {
      console.error('Error initializing aside:', error);
    }
  },
  getModuleName: await function() {
    return document.getElementById('part-aside').getAttribute('data-module-name');
  },


};
export default asideState;
