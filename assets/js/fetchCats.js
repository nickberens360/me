const state = {
  catEmoji: '',
  catTitle: 'Why you no haz cats?',
  catEmojiEl: document.getElementById('catEmoji'),
  catTitleEl: document.getElementById('catTitle'),
  loadingEl: document.getElementById('loadingMessage'),
  catImagesEl: document.getElementById('catImages'),
  fetchButtonEl: document.getElementById('fetchButton'),

  fetchData: function() {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';
    const apiKey = 'live_VBvwBMcfnXuwE9fOdVJJleJHJPKn46JptOvoIUoKBJ7I2WVURFGvBxP1itXaZbeh';

    this.loadingEl.style.display = 'flex';
    this.catImagesEl.style.display = 'none';
    this.catEmojiEl.classList.add('loader');
    fetch(apiUrl, {
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTimeout(() => {
          this.loadingEl.style.display = 'none';
          this.catImagesEl.style.display = 'block';
          this.catEmojiEl.classList.remove('loader');
          this.catEmojiEl.textContent = '😻';
          this.fetchButtonEl.textContent = 'Fetch more cats!';
          this.catTitleEl.textContent = 'You haz cats!';
        } , 1000);
        this.catImagesEl.innerHTML = this.createCatImages(data);
        localStorage.setItem('catsFetched', true);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // Hide the loading message if an error occurs
        this.loadingEl.style.display = 'none';
      });
  },

  checkCatsFetched: function() {
    const catsFetched = localStorage.getItem('catsFetched');
    return catsFetched === 'true';
  },

  createCatImages: function(data) {
    const catImages = data.map(cat => {
      return `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`;
    });
    return catImages.join('');
  },

  attachEventListeners: function() {
    // const fetchButton = document.getElementById('fetchButton');
    this.fetchButtonEl.addEventListener('click', () => {
      this.fetchData();
    });
  },

  InitState: function() {
    this.fetchButtonEl.textContent = this.checkCatsFetched() ? 'Fetch more cats!' : 'Fetch cats!'
    this.catEmojiEl.textContent = this.checkCatsFetched() ? '😻' : '😿';
    this.catTitleEl.textContent = this.checkCatsFetched() ? 'You haz cats!' : 'Why you no haz cats?';;
    this.attachEventListeners();
    if (this.checkCatsFetched()) {
      this.fetchData();
    }
  },
};

// Attach event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  state.InitState();
});
