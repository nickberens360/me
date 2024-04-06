import loadContent from '../../js/utils/loadContent.js';
import fetchCats  from '../../js/fetchCats.js';

const asideState = {


  // Initialize the aside state
  init: async function() {
    try {
      // Load content from the server
      loadContent.gistId = '9aece3879846b2dcdc35705b03ddfd84';
      loadContent.gistFile = 'Aside.md';
      loadContent.contentElementId = 'part-aside';
      await loadContent.init();
      fetchCats.initFetchCats()

    } catch (error) {
      console.error('Error initializing aside:', error);
      // Display error message to the user
      this.showErrorState();
    }
  },
};

export default asideState;
