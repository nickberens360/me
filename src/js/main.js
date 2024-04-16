import createDialogState from '@/js/dialogState.js';
import createConsole  from '@/js/console';
const dialog = createDialogState();


document.addEventListener('DOMContentLoaded', async function() {
  try {
    dialog.init();
  } catch (error) {
    console.error('Error initializing dialog:', error);
  }
  try {
    createConsole();
  } catch (error) {
    console.error('Error initializing dialog:', error);
  }
  setTimeout(() => {
      document.body.classList.add('loaded');
  } , 1500);


});
