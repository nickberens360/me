const fetchCats = {
  name: 'fetchCats',
  icon: '',
  title: '',
  btnText: '',
  images: '',
  loading: false,

  renderTemplate: function() {
    const iconClasses = this.loading ? 'cat-fetch__icon loader' : 'cat-fetch__icon';
    return `
    <div id="cat-fetch">
      <div class="cat-fetch__top">
        <div class="${iconClasses}" id="js-cat-fetch-icon">${this.icon}</div>
        <div class="cat-fetch__title-content">
          <h3 class="cat-fetch__title" id="js-cat-fetch-title" style="font-size: 15px">${this.title}</h3>
          <button class="cat-fetch__btn text-uppercase font-bold" id="js-cat-fetch-btn">${this.btnText}</button>
        </div>
      </div>
      <div class="cat-fetch__images" id="js-cat-fetch-images">${this.images}</div>
    </div>`;
  },

  updateDOM: function() {
    const container = document.getElementById('side-drawer');
    container.innerHTML = this.renderTemplate();
  },

  setLoadingState: function() {
    this.icon = '😺';
    this.title = 'Fetching cats...';
    this.btnText = 'Loading...';
    this.images = '';
    this.loading = true;
    this.updateDOM();
  },

  setHasCatsState: function() {
    this.icon = '😻';
    this.title = 'You haz cats!';
    this.btnText = 'Haz more cats!';
    this.loading = false;
    this.updateDOM();
  },

  setNoCatsState: function() {
    this.images = '';
    this.icon = '😿';
    this.title = 'Why you no haz cats?';
    this.btnText = 'Haz cats!';
    this.loading = false;
    this.updateDOM();
  },

  fetchData: async function() {
    this.setLoadingState();
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=20';
    const apiKey = 'live_VBvwBMcfnXuwE9fOdVJJleJHJPKn46JptOvoIUoKBJ7I2WVURFGvBxP1itXaZbeh';
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.images = data.map(cat => `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`).join('');
      this.setHasCatsState();
      localStorage.setItem('catsFetched', true);
      localStorage.setItem('cats', JSON.stringify(data));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },

  setEventListeners: function() {
    const container = document.getElementById('side-drawer');
    container.addEventListener('click', (event) => {
      if (event.target.id === 'js-cat-fetch-btn') {
        this.fetchData();
      } else if (event.target.id === 'js-cat-fetch-icon') {
        console.log('clicked');
        document.querySelector('body').classList.toggle('aside-open');
      }
    });
  },

  initModuleState: function() {
    const catsFetched = localStorage.getItem('catsFetched') === 'true';
    if (catsFetched) {
      const catData = JSON.parse(localStorage.getItem('cats'));
      this.images = catData.map(cat => `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`).join('');
      this.setHasCatsState();
      document.querySelector('body').classList.toggle('aside-open');
    } else {
      this.setNoCatsState();
    }
    this.setEventListeners();
  },
};

export default fetchCats;
