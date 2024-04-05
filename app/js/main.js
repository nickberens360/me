import '../../config.js';
import './currentYear.js';

import home from '../content/home/home.js';
import aside from '../content/parts/aside.js';
import hero from '../content/parts/hero.js';

document.addEventListener('DOMContentLoaded', async function() {
  try {
    await home.init();
    console.log('Home initialized successfully');
  } catch (error) {
    console.error('Error initializing home:', error);
  }

  try {
    await aside.init();
    console.log('Aside initialized successfully');
  } catch (error) {
    console.error('Error initializing aside:', error);
  }

  try {
    await hero.init();
    console.log('Aside initialized successfully');
  } catch (error) {
    console.error('Error initializing hero:', error);
  }



});
