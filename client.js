const axios = require("axios");
/*
axios
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));
*/


async function getToken(username) {
    const url = 'https://tecweb-js.insper-comp.com.br/token';
    const body = { username: username };
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const response = await axios.post(url, body, config);
    return response.data.accessToken;
}

async function getExercises(token) {
  const url = 'https://tecweb-js.insper-comp.com.br/exercicio';
  const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  };

  const response = await axios.get(url, config);
  return response.data; 
  
}

async function main() {
    const token = await getToken('fernandoof');
    console.log('Token obtido:', token);
    if (token) {
      const exercises = await getExercises(token);
      console.log('Lista de exercícios:', exercises);
  }
}

main();
