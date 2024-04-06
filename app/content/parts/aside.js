import loadContent from '../../js/utils/loadContent.js';

const asideState = {

  // Fetch cat data from the API
  fetchData: async function() {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=20';
    const apiKey = 'live_VBvwBMcfnXuwE9fOdVJJleJHJPKn46JptOvoIUoKBJ7I2WVURFGvBxP1itXaZbeh';

    try {
      this.showLoadingState();
      const response = await fetch(apiUrl, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Update UI with cat data
      this.updateUIWithCatData(data);

      // Store fetched data in localStorage
      localStorage.setItem('catsFetched', true);
      localStorage.setItem('cats', JSON.stringify(data));
    } catch (error) {
      console.error('Fetch error:', error);
      this.showErrorState();
    }
  },

  // Update UI with fetched cat data
  updateUIWithCatData: function(catData) {
    document.getElementById('js-cat-fetch-images').style.display = 'block';
    document.getElementById('js-cat-fetch-icon').classList.remove('loader');
    document.getElementById('js-cat-fetch-icon').textContent = '😻';
    document.getElementById('js-cat-fetch-btn').textContent = 'Haz more cats!';
    document.getElementById('js-cat-fetch-title').textContent = 'You haz cats!';
    document.getElementById('js-cat-fetch-images').innerHTML = this.createCatImages(catData);
  },

  // Show loading state
  showLoadingState: function() {
    document.getElementById('js-cat-fetch-images').style.display = 'none';
    document.getElementById('js-cat-fetch-icon').classList.add('loader');
    document.getElementById('js-cat-fetch-icon').textContent = '😺';
    document.getElementById('js-cat-fetch-btn').textContent = 'Loading...';
    // document.getElementById('js-cat-fetch-icon').textContent = 'Fetching cats...';
  },

  // Show error state
  showErrorState: function() {
    document.getElementById('js-cat-fetch-images').style.display = 'none';
    document.getElementById('js-cat-fetch-icon').classList.remove('loader');
    document.getElementById('js-cat-fetch-icon').textContent = '😿';
    document.getElementById('js-cat-fetch-btn').textContent = 'Try again';
    document.getElementById('js-cat-fetch-icon').textContent = 'Error fetching cats';
  },

  // Create HTML for cat images
  createCatImages: function(data) {
    return data.map(cat => `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`).join('');
  },

  // Initialize the cats section
  initCatsAside: function() {
    // Set initial UI state based on whether cats have been fetched
    const catsFetched = localStorage.getItem('catsFetched') === 'true';
    document.getElementById('js-cat-fetch-icon').textContent = catsFetched ? '😻' : '😿';
    document.getElementById('js-cat-fetch-title').textContent = catsFetched ? 'You haz cats!' : 'Why you no haz cats?';
    document.getElementById('js-cat-fetch-btn').textContent = catsFetched ? 'Haz more cats!' : 'Haz cats!';

    // Attach event listener to fetch button
    document.getElementById('js-cat-fetch-btn').addEventListener('click', () => {
      this.fetchData();
    });
    document.getElementById('js-cat-fetch-icon').addEventListener('click', () => {
      document.querySelector('body').classList.toggle('aside-open');
    });


    // If cats have been fetched previously, display them
    if (catsFetched) {
      const catData = JSON.parse(localStorage.getItem('cats'));
      this.updateUIWithCatData(catData);
    }
  },


  // Initialize the aside state
  init: async function() {
    try {
      // Load content from the server
      loadContent.gistId = '9aece3879846b2dcdc35705b03ddfd84';
      loadContent.gistFile = 'Aside.md';
      loadContent.contentElementId = 'part-aside';
      await loadContent.init();

      // Initialize the cats section
      this.initCatsAside();
    } catch (error) {
      console.error('Error initializing aside:', error);
      // Display error message to the user
      this.showErrorState();
    }
  },
};

export default asideState;
