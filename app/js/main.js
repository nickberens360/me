import '../../index.js';
import './currentYear.js';
import fetchCats  from './fetchCats.js';
import home from './content/home/home.js';
// import aside from './content/parts/aside.js';
import hero from './content/parts/hero.js';

document.addEventListener('DOMContentLoaded', async function() {

  try {
    await home.init();
  } catch (error) {
    console.error('Error initializing home:', error);
  }

  try {
    await fetchCats.initModuleState();
  } catch (error) {
    console.error('Error initializing fetchCats:', error);
  }

  // try {
  //   await aside.init();
  // } catch (error) {
  //   console.error('Error initializing aside:', error);
  // }

  try {
    await hero.init();
  } catch (error) {
    console.error('Error initializing hero:', error);
  }



});
