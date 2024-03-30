function fetchData() {
  const apiUrl = 'https://cataas.com/api/cats?tags=cute';
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      document.getElementById('catImages').innerHTML = createCatImages(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// create html for cat images
function createCatImages(data) {
  const catImages = data.map(cat => {
    return `<img style="max-width: 100%" src="https://cataas.com/cat/${cat._id}" alt="A cute cat" />`;
  });
  return catImages.join('');
}

const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', fetchData);