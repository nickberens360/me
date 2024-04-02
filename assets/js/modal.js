const dialogStates = {
  dialogEl:  document.querySelector("dialog"),
  showButton: document.getElementById("js-show-dialog"),
  closeButton: document.getElementById("js-hide-dialog"),
  attachEventListeners: function() {
    // this.showButton.addEventListener('click', () => {
    //   this.openDialog();
    // });
    this.closeButton.addEventListener('click', () => {
      this.closeDialog();
    });
  },
  setLocalStorage: function() {
    localStorage.setItem('dialogOpened', true);
  },
  checkLocalStorage: function() {
    if (localStorage.getItem('dialogOpened')) {
      return true;
    }
  },
  openDialog: function() {
    this.dialogEl.showModal();
  },
  closeDialog: function() {
    this.dialogEl.close();
  },
  init: function() {
    this.attachEventListeners();
    if (!this.checkLocalStorage()) {
      this.openDialog();
      this.setLocalStorage();
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  dialogStates.init();
});

