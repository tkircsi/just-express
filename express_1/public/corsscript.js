function getCity() {
  get('http://localhost:3999')
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
}

async function get(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
