const fromLang=document.querySelector(".fromLang");
const toLang=document.querySelector(".toLang");
const fromText=document.querySelector(".fromText");
const toText=document.querySelector(".toText");
const exchange=document.querySelector(".exchange");
const translate=document.querySelector(".translate");
const volumes=document.querySelectorAll(".volume");

for (let lang in languages){
   let options=`<option value=${lang}>${languages[lang]}</option>`;
   fromLang.insertAdjacentHTML("beforeend",options);
   toLang.insertAdjacentHTML("beforeend",options);

    fromLang.value="tr-TR";
    toLang.value="en-GB";
}

exchange.addEventListener("click",()=>{
    let fromTangue=fromLang.value;
    let toTangue=toLang.value;
    fromLang.value=toTangue;
    toLang.value=fromTangue;

    let fromWords=fromText.value;
    let toWords=toText.value;
    fromText.value=toWords;
    toText.value=fromWords;
});

translate.addEventListener("click",function(){
    let url=`https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${fromLang.value}|${toLang.value}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        //console.log(data.responseData.translatedText);
        toText.value=data.responseData.translatedText;
    });
});

for (let volume of volumes){
    volume.addEventListener("click",(element)=>{
        let speech;
        if (element.target.id=="from"){
            speech=new SpeechSynthesisUtterance(fromText.value);
            speech.lang=fromLang.value;      
        }
        else{
            speech=new SpeechSynthesisUtterance(toText.value);
            speech.lang=toLang.value;
        }
        speechSynthesis.speak(speech);
            
        
    });
}

