const catApiKey = import.meta.env.VITE_CATS_ACCESS_TOKEN;
const createFetchCatsModule = () => {
  let icon = '';
  let title = '';
  let btnText = '';
  let images = '';
  let loading = false;
  let catsFetched = localStorage.getItem('catsFetched') === 'true';
          /*<div class="${iconClasses}" id="js-cat-fetch-icon">${icon}</div>*/

  const domTemplate = () => {
    const iconClasses = loading ? 'cat-fetch__icon loader' : 'cat-fetch__icon';
    return `
      <div id="cat-fetch">
        <div class="cat-fetch__top">
          <h3 class="cat-fetch__title" id="js-cat-fetch-title"><span class="${iconClasses}" id="js-cat-fetch-icon">${icon}</span> ${title}</h3>
          <div class="cat-fetch__title-content">
            <button class="cat-fetch__btn text-uppercase font-bold" id="js-cat-fetch-btn">${btnText}</button>
          </div>
        </div>
        <div class="cat-fetch__images masonry masonry--h" id="js-cat-fetch-images">${images}</div>
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
    title = 'No haz cats?';
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
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=6';
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'x-api-key': catApiKey
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
    images = data.map(cat => `<div class="cat-item masonry-brick masonry-brick--h"><img class="masonry-img" src="${cat.url}" alt="A cute cat" /></div>`).join('');
    renderTemplate();
  };

  const setEventListeners = () => {
    // const container = document.getElementById('side-drawer');
    document.addEventListener('click', (event) => {
      if (event.target.id === 'js-cat-fetch-btn') {
        fetchData().then();
      }
      if (event.target.id === 'cat-side-trigger') {
        console.log('clicked');
        document.querySelector('body').classList.toggle('aside-open');
      }
    });
  };

  const init = async () => {
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
    init,
  };
};

export default createFetchCatsModule();
