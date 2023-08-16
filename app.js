const getURL = 'https://text-translator2.p.rapidapi.com/getLanguages';

let translateFrom = document.querySelector('#translateFrom');
let translateTo = document.querySelector('#translateTo');
let translateToFrom = document.querySelector('.selection');

console.log(translateToFrom);



const option = {
    method: 'get',
    headers: {
        'X-RapidAPI-Key': '8eea3e9d8cmsh4d061cb1dcccdbdp16ad30jsncd701947e882',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
}

let source_languaje;
let target_languaje;

    fetch(getURL, option)
    .then(response => response.json())
    .then(objeto => {
        /* Almacenmos los lenguajes en el selection */
        let variable = objeto.data.languages;
        variable.forEach((e,index) => {

            if(e.code == 'es'){

            }
            

            let option = `<option value="${e.code}">${e.name}</option>`;

            translateFrom.insertAdjacentHTML('beforeend',option);
            translateTo.insertAdjacentHTML('beforeend',option);
        });

        translateFrom.addEventListener('click',(e)=>{
            source_languaje =   translateFrom.value; 
        });

        translateTo.addEventListener('click',(e)=>{
            target_languaje =   translateTo.value; 
        });
        
    }
    

    )
    .catch(error => console.log(error));

  

    /* Obtener los valores del text area */

    let translate = document.querySelector('#translate');
    let inputTranslate = document.querySelector('#inputTranslate');


   
    let tranlateTo =  document.querySelector('#outputTranslate');

    inputTranslate.addEventListener('input',(e)=>{

        let textTranslate = inputTranslate.value;


        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", source_languaje);
        encodedParams.append("target_language", target_languaje);
        encodedParams.append("text", textTranslate);
        
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '8eea3e9d8cmsh4d061cb1dcccdbdp16ad30jsncd701947e882',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            body: encodedParams
        };
        
        fetch('https://text-translator2.p.rapidapi.com/translate', options)
            .then(response => response.json())
            .then(response => {
                tranlateTo.textContent = response.data.translatedText;
            })
            .catch(err => console.error(err));


    });

