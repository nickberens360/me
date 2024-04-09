import './currentYear.js';
import fetchCats  from './fetchCats.js';
import home from './content/home/home.js';
import hero from './content/parts/hero.js';

document.addEventListener('DOMContentLoaded', async function() {
  let domContentLoaded = [];
  try {
    await home.init();
    domContentLoaded.push('home');
  } catch (error) {
    console.error('Error initializing home:', error);
  }

  try {
    await fetchCats.initModuleState();
    domContentLoaded.push('fetchCats');
  } catch (error) {
    console.error('Error initializing fetchCats:', error);
  }

  try {
    await hero.init();
    domContentLoaded.push('hero');
  } catch (error) {
    console.error('Error initializing hero:', error);
  }

  setTimeout(() => {
    if (domContentLoaded.length === 3) {
      //add class to body to show content
      document.body.classList.add('loaded');
    }
  } , 1000);


});
