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
      this.catImages = data;

      // Update UI with cat data
      this.updateUIWithCatData(this.catImages);

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
    document.getElementById('catImages').style.display = 'block';
    document.getElementById('catEmoji').classList.remove('loader');
    document.getElementById('catEmoji').textContent = '😻';
    document.getElementById('fetchButton').textContent = 'Haz more cats!';
    document.getElementById('catTitle').textContent = 'You haz cats!';
    document.getElementById('catImages').innerHTML = this.createCatImages(catData);
  },

  // Show loading state
  showLoadingState: function() {
    document.getElementById('catImages').style.display = 'none';
    document.getElementById('catEmoji').classList.add('loader');
    document.getElementById('catEmoji').textContent = '😺';
    document.getElementById('fetchButton').textContent = 'Loading...';
    document.getElementById('catTitle').textContent = 'Fetching cats...';
  },

  // Show error state
  showErrorState: function() {
    document.getElementById('catImages').style.display = 'none';
    document.getElementById('catEmoji').classList.remove('loader');
    document.getElementById('catEmoji').textContent = '😿';
    document.getElementById('fetchButton').textContent = 'Try again';
    document.getElementById('catTitle').textContent = 'Error fetching cats';
  },

  // Create HTML for cat images
  createCatImages: function(data) {
    return data.map(cat => `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`).join('');
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

  // Initialize the cats section
  initCatsAside: function() {
    // Set initial UI state based on whether cats have been fetched
    const catsFetched = localStorage.getItem('catsFetched') === 'true';
    document.getElementById('catEmoji').textContent = catsFetched ? '😻' : '😿';
    document.getElementById('catTitle').textContent = catsFetched ? 'You haz cats!' : 'Why you no haz cats?';
    document.getElementById('fetchButton').textContent = catsFetched ? 'Haz more cats!' : 'Haz cats!';

    // Attach event listener to fetch button
    document.getElementById('fetchButton').addEventListener('click', () => {
      this.fetchData();
    });
    document.getElementById('catEmoji').addEventListener('click', () => {
      document.querySelector('body').classList.toggle('aside-open');
    });


    // If cats have been fetched previously, display them
    if (catsFetched) {
      const catData = JSON.parse(localStorage.getItem('cats'));
      this.updateUIWithCatData(catData);
    }
  }
};

export default asideState;
