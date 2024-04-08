const ght = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const loadContent = {
  gistId: '',
  gistFile: '',
  contentElementId: '',
  content: '',
  accessToken: ght,
  // accessToken: import.meta.env.VITE_GITHUB_ACCESS_TOKEN,
  getServerSideProps: async function() {
    const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
      headers: {
        Authorization: `token ${this.accessToken}`
      }
    });
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
      return data.files[this.gistFile].content;
    } catch (error) {
      console.error('Error initializing API:', error);
      throw error;
    }
  },
};

export default loadContent;
