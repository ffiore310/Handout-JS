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

    //   //Faz o exercicio de soma
    //   add = exercises.soma.entrada;
    //   //console.log('Valores para soma:', add);
    //   const r_soma = await postResposta('soma',soma(add.a, add.b), token);
    //   console.log('Resultado soma de valores:', r_soma);

    //   //Faz o exercicio de contagem de string
    //   string = exercises["tamanho-string"].entrada.string;
    //   const r_string = await postResposta('tamanho-string',conta_string(string), token);
    //   console.log('Resultado da contagem da string:', r_string);

    //   //Faz o exercicio de nome do usuario
    //   nome = exercises["nome-do-usuario"].entrada.email;
    //   const r_nome = await postResposta('nome-do-usuario',nome_usuario(nome), token);
    //   console.log('Resultado do nome do usuario:', r_nome);

    //   //Jaca Wars
    //   parametros = exercises["jaca-wars"].entrada;
    //   vel = parametros.v;
    //   theta = parametros.theta;
    //   const r_jaca = await postResposta('jaca-wars',distancia(vel,theta), token);
    //   console.log('Resultado jaca-wars:', r_jaca);

    //   //Ano bissexto
    //   ano = exercises["ano-bissexto"].entrada.ano;
    //   const r_bissexto = await postResposta('ano-bissexto',bissexto(ano), token);
    //   console.log('Resultado ano bissexto:', r_bissexto);

    //   //Volume da pizza
    //   parametros = exercises["volume-da-pizza"].entrada;
    //   z = parametros.z;
    //   a = parametros.a;
    //   const r_volume = await postResposta('volume-da-pizza',volume(z,a), token);
    //   console.log('Resultado volume da pizza:', r_volume);

    //   //MRU
    //   parametros = exercises["mru"].entrada;
    //   s0 = parametros.s0;
    //   v = parametros.v;
    //   t = parametros.t;
    //   const r_mru = await postResposta('mru',mru(s0,v,t), token);
    //   console.log('Resultado MRU:', r_mru);

    //   //Inverte string
    //   s = exercises["inverte-string"].entrada.string;
    //   const r_inverte = await postResposta('inverte-string',inverte(s), token);
    //   console.log('Resultado inverte string:', r_inverte);

    //   //Soma valores
    //   d = exercises["soma-valores"].entrada.objeto;
    //   const r_soma_valores = await postResposta('soma-valores',soma_valores(d), token);
    //   console.log('Resultado soma valores:', r_soma_valores);

    //   //n-esimo-primo
    //   n = exercises["n-esimo-primo"].entrada.n;
    //   const r_primo = await postResposta('n-esimo-primo',n_primos(n), token);
    //   console.log('Resultado n-esimo primo:', r_primo);

    //   //Prefixo comum
    //     array_p = exercises["maior-prefixo-comum"].entrada.strings;
    //     const r_prefixo = await postResposta('maior-prefixo-comum',maior_prefixo(array_p), token);
    //     console.log('Resultado maior prefixo comum:', r_prefixo);

    //     //Soma segundos
    //     array_s = exercises['soma-segundo-maior-e-menor-numeros'].entrada.numeros;
    //     const r_soma_segundos = await postResposta('soma-segundo-maior-e-menor-numeros',soma_segundos(array_s), token);
    //     console.log('Resultado soma segundos:', r_soma_segundos);

    //     //Conta palindromos
    //     array_pal = exercises['conta-palindromos'].entrada.palavras;
    //     const r_palindromos = await postResposta('conta-palindromos',conta_palindromos(array_pal), token);
    //     console.log('Resultado conta palindromos:', r_palindromos);

    //     //Soma strings
    //     array_str = exercises['soma-de-strings-de-ints'].entrada.strings;
    //     const r_soma_strings = await postResposta('soma-de-strings-de-ints',soma_strings(array_str), token);
    //     console.log('Resultado soma strings:', r_soma_strings);

        //Soma com requisicoes
        array_req = exercises['soma-com-requisicoes'].entrada.endpoints;
        let resultado = await soma_com_requisicoes(array_req, token);
        const r_soma_req = await postResposta('soma-com-requisicoes',resultado, token);
        console.log('Resultado soma com requisicoes:', r_soma_req);
      }
  }

function soma(a, b) {
    return a + b;
}

function conta_string(s){
    return s.length;
}

function nome_usuario(s){
    return s.split("@")[0];  
}

function distancia(v, theta){
    let rad = theta*Math.PI/180;
    let d = ((v**2)*Math.sin(2*rad))/9.8;
    if (d < 98){
        return -1;
    }
    else if (d > 102){
        return 1;
    }
    else{
        return 0;
    }
}

function bissexto(ano){
    if (ano % 4 == 0 && ano % 100 != 0 || ano % 400 == 0){
        return true;
    }
    else{
        return false;
    }
}

function volume(z, a){
  return Math.round(Math.PI*(z**2)*a)
}

function mru(s0, v, t){
  return s0+v*t;
}

function inverte(s){
    lista = s.split("");
    for (let i = 0; i < lista.length/2; i++){
        let temp = lista[i];
        lista[i] = lista[lista.length-1-i];
        lista[lista.length-1-i] = temp;
    }
    return lista.join("");
}

function soma_valores(d){
  let s = 0;
  valores = Object.values(d);
  for (let i = 0; i < valores.length; i++){
      s += valores[i];
  }
  return s;
}

function primo(n) {
    if (n <= 1) {
        return 0;
    }
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return 0;
        }
    }
    return n;
}

function n_primos(n) {
    let c = 0; 
    let i = 2; 
    while (c < n) {
        if (primo(i)!=0) {
            c++; 
            if (c == n) {
                return i; 
            }
        }
        i++;
    }
}

function prefixoComum(s1, s2) {
    comum = Math.min(s1.length, s2.length);
    for (let i = 0; i < comum; i++) {
        if (s1[i] !== s2[i]) {
            return s1.substring(0, i);
        }
    }
    return s1.substring(0, comum);
}

function maior_prefixo(array){
    let maior = ''
    let i = 0;
    for (i; i < array.length-1; i++){
        for(let j = i+1; j < array.length; j++){
            let prefixo = prefixoComum(array[i], array[j]);
            if (maior == '' || prefixo.length > maior.length){
                maior = prefixo;
            }
        }
    }
    return maior;
}

function soma_segundos(array){
    list = array.slice().sort((a, b) => a - b);
    return list[1]+list[list.length-2];
}

function conta_palindromos(array){
    let palindromos = 0;
    let palavra = '';
    for (let i = 0; i < array.length; i++){
        let l = array[i].split('');
        for (let j = l.length-1; j >= 0; j--){
            palavra += l[j];
        }
        if (palavra == array[i]){
            palindromos++;
        }
        palavra = '';
    }
    return palindromos;
}

function soma_strings(array){
    let numeros = array.map((n) => parseInt(n));
    let soma = numeros.reduce((a, b) => a + b, 0);
    return soma;
}

async function soma_com_requisicoes(array, token){
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    // novo_array = array.map((n) => fetch(n).then((response) => response.json()).then((data) => parseInt(data.valor)));
    novo_array = array.map((n) => axios.get(n,config).then((response) => response.data));
    //console.log(novo_array);
    const resultados = await Promise.all(novo_array);
    let s = 0
    for (let valor of resultados){
        s += valor;
    }
    return s;
}


main();
