
const clavier = document.querySelector('#clavier')
let note = 1;
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
const maping = 
{
  note1 : "",
  note2 : "",
  note3 : "",
  note4 : "",
  note5 : "",
  note6 : "",
  note7 : "",
  note8 : "",
  note9 : "",
  note10 : "",
  note11 : "",
  note12 : "",
  note13 : "",
  note14 : "",
  note15 : "",
  note16 : "",
}
function onMIDISuccess(midiAccess) {
  console.log(midiAccess)
  console.log(midiAccess.inputs)
  console.log("MIDI ready!");
  console.log(maping)

  function onMIDIMessage(event) {
    console.log(maping)
    console.log(event.data)
    for (const property in maping){
      console.log(property)
      console.log(maping[property])
      if(maping[property] === event.data[1]){
        document.querySelector(`.${property}`).classList.add('green')
        setTimeout(()=>{
          document.querySelector(`.${property}`).classList.remove('green')
          },1000)
      }
  
      else if(maping[property] === ""){
        maping[property] = event.data[1]
        return
      }
    }
    

    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    for (const character of event.data) {
      str += `0x${character.toString(16)} `;
    }
    console.log(str);
    }

    midiAccess.inputs.forEach((entry) => {
      entry.onmidimessage = onMIDIMessage;
    });
  }
  
    

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

creerTouche()
const touche = document.querySelectorAll('.touche')
let random = Math.floor(Math.random() * touche.length);



function creerTouche (){
  let ligneHaut = document.createElement('div')
  let ligneBas = document.createElement('div')

  ligneBas.classList.add('ligneBas')
  ligneHaut.classList.add('ligneHaut')

  clavier.appendChild(ligneHaut)
  clavier.appendChild(ligneBas)

  function toucheNoir(nb){

    let global = document.createElement('div')
    ligneHaut.appendChild(global)
    global.classList.add('global')
    for(let i = 0;i<nb;i++){
    let noir = document.createElement('div')
    noir.classList.add('touche')
    noir.classList.add(`note${note}`)
    note++
    global.appendChild(noir)
    noir.classList.add('black')
    }
  }

  function toucheBlanche (nb){
    for(let i = 0;i<nb;i++){
    let blanc = document.createElement('div')
    blanc.classList.add('touche')
    blanc.classList.add(`note${note}`)
    note++
    ligneBas.appendChild(blanc)
    blanc.classList.add('white')
    }
  }
  
  toucheBlanche(15)
  toucheNoir(2)
  toucheNoir(3)
  toucheNoir(2)
  toucheNoir(3)
}

// document.addEventListener('keydown',(e)=>{

//       console.log(e.key)
//       switch(e.key){
//         case maping[1][1]:
         

    
// })
// setInterval(()=>{
//   let random2=random
//   touche[random2].classList.remove('blue')

//   random = Math.floor(Math.random() * touche.length)
//   if(random !== random2){
//   touche[random].classList.toggle('blue')
//   }
//   else{
//     random = Math.floor(Math.random() * touche.length)
//     touche[random].classList.toggle('blue')
//   }

// },1000)

