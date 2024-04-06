import loadContent from '../../js/utils/loadContent.js';

const homeState = {
    init: async function() {
        try {
            loadContent.gistId = '13b26a426bf2b363506263412279a224';
            loadContent.gistFile = 'Home.md';
            loadContent.contentElementId = 'content-home';
            await loadContent.init();
        } catch (error) {
            console.error('Error initializing home:', error);
            throw error;
        }
    },
}

export default homeState;
