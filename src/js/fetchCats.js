const createFetchCatsModule = () => {
  let icon = '';
  let title = '';
  let btnText = '';
  let images = '';
  let loading = false;
  let catsFetched = localStorage.getItem('catsFetched') === 'true';

  const domTemplate = () => {
    const iconClasses = loading ? 'cat-fetch__icon loader' : 'cat-fetch__icon';
    return `
      <div id="cat-fetch">
        <div class="cat-fetch__top">
          <div class="${iconClasses}" id="js-cat-fetch-icon">${icon}</div>
          <div class="cat-fetch__title-content">
            <h3 class="cat-fetch__title" id="js-cat-fetch-title" style="font-size: 15px">${title}</h3>
            <button class="cat-fetch__btn text-uppercase font-bold" id="js-cat-fetch-btn">${btnText}</button>
          </div>
        </div>
        <div class="cat-fetch__images" id="js-cat-fetch-images">${images}</div>
      </div>`;
  };

  const renderTemplate = () => {
    const container = document.getElementById('side-drawer');
    container.innerHTML = domTemplate();
  };

  const hasCatsState = async () => {
    icon = '😻';
    title = 'You haz cats!';
    btnText = 'Haz more cats!';
    loading = false;
    renderTemplate();
  };

  const noCatsState = async () => {
    images = '';
    loading = false;
    icon = '😿';
    title = 'Why you no haz cats?';
    btnText = 'Haz cats!';
    renderTemplate();
  };

  const loadingState = async () => {
    icon = '😺';
    title = 'Fetching cats...';
    btnText = 'Loading...';
    images = '';
    loading = true;
    renderTemplate();
  };

  const fetchData = async () => {
    await loadingState();
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
      await createCatImages(data);
      setTimeout(() => {
        hasCatsState();
      }, 1000);
      localStorage.setItem('catsFetched', true);
      localStorage.setItem('cats', JSON.stringify(data));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const createCatImages = async (data) => {
    images = data.map(cat => `<img style="max-width: 100%" src="${cat.url}" alt="A cute cat" />`).join('');
    renderTemplate();
  };

  const setEventListeners = () => {
    const container = document.getElementById('side-drawer');
    container.addEventListener('click', (event) => {
      if (event.target.id === 'js-cat-fetch-btn') {
        fetchData().then();
      } else if (event.target.id === 'js-cat-fetch-icon') {
        console.log('clicked');
        document.querySelector('body').classList.toggle('aside-open');
      }
    });
  };

  const initModuleState = async () => {
    if (catsFetched) {
      const catData = JSON.parse(localStorage.getItem('cats'));
      await createCatImages(catData);
      await hasCatsState();
      document.querySelector('body').classList.toggle('aside-open');
    } else {
      await noCatsState();
    }
    setEventListeners();
  };

  return {
    initModuleState
  };
};

export default createFetchCatsModule();
