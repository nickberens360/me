const createDialogState = () => {
  let dialogEl = null;
  let showButton = null;
  let closeButton = null;

  const attachEventListeners = () => {
    if (!dialogEl || !showButton || !closeButton) {
      console.error('Required elements not found');
      return;
    }

    showButton.addEventListener('click', openDialog);
    closeButton.addEventListener('click', closeDialog);
  };

  const setLocalStorage = () => {
    localStorage.setItem('dialogOpened', true);
  };

  const openDialog = () => {
    dialogEl.showModal();
    setLocalStorage();
  };

  const closeDialog = () => {
    dialogEl.close();
  };

  const init = () => {
    dialogEl = document.querySelector("dialog");
    showButton = document.getElementById("js-show-dialog");
    closeButton = document.getElementById("js-hide-dialog");

    attachEventListeners();
  };

  return {
    init,
  };
};

export default createDialogState;
