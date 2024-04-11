// `<dialog style="width: 500px;">
//   <div class="modal-image">
//     <img
//         src="https://data.textstudio.com/output/sample/animated/5/4/4/6/warning-3-16445.gif"
//         alt="Warning! Warning! Warning!"
//     >
//   </div>
//   <p>This site is meant to be rather ridiculous. It is meant to be a place to explore new ideas and basically just mess around without the
//   pressure of sprints, stakeholders and pixel perfect expectations.</p>
//   <button id="js-hide-dialog" autofocus>Close</button>
// </dialog>`

const dialogStates = {
  dialogEl:  document.querySelector("dialog"),
  showButton: document.getElementById("js-show-dialog"),
  closeButton: document.getElementById("js-hide-dialog"),
  attachEventListeners: function() {
    this.showButton.addEventListener('click', () => {
      this.openDialog();
    });
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

