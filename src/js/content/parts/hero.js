import loadContent from '../../utils/loadContent.js';

const heroState = {
    init: async function() {
        try {
            loadContent.gistId = '9aece3879846b2dcdc35705b03ddfd84';
            loadContent.gistFile = 'Hero.md';
            loadContent.contentElementId = 'part-hero';
            await loadContent.init();
            const heroContent = document.getElementById('part-hero').innerHTML;
            document.getElementById('part-hero').innerHTML = heroContent + heroContent + heroContent;
        } catch (error) {
            console.error('Error initializing hero:', error);
            throw error;
        }
    },
}

export default heroState;
