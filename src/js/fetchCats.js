const fetchCats = {
  name: 'fetchCats',
  icon: '',
  title: '',
  btnText: '',
  images: '',
  loading: false,

  domTemplate: function() {
    const iconClasses = this.loading ? 'cat-fetch__icon loader' : 'cat-fetch__icon';
    return `
    <div id="cat-fetch">
      <div class=cat-fetch__top>
        <div class="${iconClasses}" id="js-cat-fetch-icon">${this.icon}</div>
        <div class="cat-fetch__title-content">
          <h3 class="cat-fetch__title" id="js-cat-fetch-title" style="font-size: 15px">${this.title}</h3>
          <button class="cat-fetch__btn text-uppercase font-bold" id="js-cat-fetch-btn">${this.btnText}</button>
        </div>
      </div>
      <div class="cat-fetch__images" id="js-cat-fetch-images">${this.images}</div>
    </div>`;
  },

  renderTemplate: function() {
    const container = document.getElementById('side-drawer');
    const newTemplate = this.domTemplate();

    // Create a new document fragment
    const fragment = document.createDocumentFragment();

    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = newTemplate;

    // Append each child node to the fragment
    Array.from(tempContainer.childNodes).forEach(child => {
      fragment.appendChild(child);
    });

    // Replace the entire container content with the fragment
    container.innerHTML = '';
    container.appendChild(fragment);
  },

  hasCatsState: async function() {
    this.icon = '😻';
    this.title = 'You haz cats!';
    this.btnText = 'Haz more cats!';
    this.loading = false;
    this.renderTemplate();
  },

  noCatsState: async function() {
    this.images = '';
    this.loading = false;
    this.icon = '😿';
    this.title = 'Why you no haz cats?';
    this.btnText = 'Haz cats!';
    this.renderTemplate();
  },

  loadingState: async function() {
    this.icon = '😺';
    this.title = 'Fetching cats...';
    this.btnText = 'Loading...';
    this.images = '';
    this.loading = true;
    this.renderTemplate();
  },

  fetchData: async function() {
    await this.loadingState();
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
      await this.createCatImages(data);
      setTimeout(() => {
        this.hasCatsState();
      } , 1000);
      localStorage.setItem('catsFetched', true);
      localStorage.setItem('cats', JSON.stringify(data));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },

  createCatImages: async function(data) {
    this.images = data.map(cat => `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`).join('');
    this.renderTemplate();
  },

  catsFetched: localStorage.getItem('catsFetched') === 'true',

  setEventListeners: function() {
    const container = document.getElementById('side-drawer');
    container.addEventListener('click', (event) => {
      if (event.target.id === 'js-cat-fetch-btn') {
        this.fetchData().then();
      } else if (event.target.id === 'js-cat-fetch-icon') {
        console.log('clicked');
        document.querySelector('body').classList.toggle('aside-open');
      }
    });
  },

  initModuleState: async function() {
    const catsFetched = this.catsFetched;
    if (catsFetched) {
      const catData = JSON.parse(localStorage.getItem('cats'));
      await this.createCatImages(catData);
      await this.hasCatsState();
      document.querySelector('body').classList.toggle('aside-open');
    } else {
      await this.noCatsState();
    }
    this.setEventListeners();
  },
};

export default fetchCats;
