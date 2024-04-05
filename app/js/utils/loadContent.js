const loadContent = {
  gistId: '',
  gistFile: '',
  contentElementId: '',
  content: '',
  getServerSideProps: async function() {
    const response = await fetch(`https://api.github.com/gists/${this.gistId}`);
    console.log(response)
    return await response.json();
  },
  renderContent: function() {
    document.getElementById(this.contentElementId).innerHTML = this.content;
  },
  init: async function() {
    try {
      const data = await this.getServerSideProps();
      this.content = data.files[this.gistFile].content;
      this.renderContent();
    } catch (error) {
      console.error('Error initializing API:', error);
      throw error;
    }
  },
};

export default loadContent;
