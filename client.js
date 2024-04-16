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

async function postResposta(endpoint,resposta, token) {
    const url = `https://tecweb-js.insper-comp.com.br/exercicio/${endpoint}`;
    const body = { resposta: resposta };
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
  
    const response = await axios.post(url, body, config);
    return response.data; 
}

async function main() {
    const token = await getToken('fernandoof');
    console.log('Token obtido:', token);
    if (token) {
      //Puxa lista de exercicios
      const exercises = await getExercises(token);
      console.log('Lista de exercícios:', exercises);

      //Faz o exercicio de soma
      add = exercises.soma.entrada;
      //console.log('Valores para soma:', add);
      const r_soma = await postResposta('soma',soma(add.a, add.b), token);
      console.log('Resultado soma de valores:', r_soma);

      //Faz o exercicio de contagem de string
      string = exercises["tamanho-string"].entrada.string;
      const r_string = await postResposta('tamanho-string',conta_string(string), token);
      console.log('Resultado da contagem da string:', r_string);
      }
  }

function soma(a, b) {
    return a + b;
}

function conta_string(s){
    return s.length;
}

main();
