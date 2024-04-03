import './currentYear.js';
import './fetchCats.js';
import './modal.js';

async function getServerSideProps () {
  const response = await fetch('https://api.github.com/users/nickberens360/repos');
  const json = await response.json();
  return json;
}

getServerSideProps().then(data => {
  console.log(data);
} );