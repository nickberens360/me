// Calculate the base path of the app
const basePath = window.location.origin + window.location.pathname.replace('/index.html', '');

// Define the config object including the base path
const config = {
  paths: {
    base: basePath,
    content: `${basePath}/content`,
    assets: `${basePath}/assets`,
    js: `${basePath}/js`,
  }
};

// Export as global variable
window.$config = config;

// Export as module
export default config;
