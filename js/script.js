const textarea = document.querySelector('#textarea');
const voicelist = document.querySelector('#selector');
const button = document.querySelector('#button');

let synch = speechSynthesis;
let isSpeaking = true;

function voiceSpeech(){
    for(let voice of synch.getVoices()){
        let option = document.createElement('option');
        option.text = voice.name;
        voicelist.add(option);
    }
}

synch.addEventListener('voiceschanged', voiceSpeech);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synch.getVoices()){
        if(voice.name === voicelist.value){
            utternance.voice = voice;
        }
    }

    speechSynthesis.speak(utternance);
}

button.addEventListener('click', (event)=>{
    event.preventDefault();
    if(textarea.value !== ''){
        if(!synch.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synch.resume();
                isSpeaking = false;
                button.innerHTML = 'Pause Speech';
            }
            else{
                synch.pause()
                isSpeaking = true;
                button.innerHTML = 'Resume Speech'
            }
            setInterval(()=>{
                if(!synch.speaking && !isSpeaking ){
                    isSpeaking = true;
                    button.innerHTML = 'Convert to Speech';
                }
            })
        }
        else{
            button.innerHTML = 'Convert to Speech';
        }
    }
});