
let createCar = (position) => {
      
     let carDiv  =  document.createElement('div');
     carDiv.setAttribute('class','car');
     carDiv.setAttribute('id','car');
     position.appendChild(carDiv);

}

// It is Start Function :
let START = (Element) =>{

  document.querySelector('#start').classList.add('hide'); // It will hide start message from screen :

  document.querySelector('#message').classList.add('hide');// It will hide message from screen :
    
   createCar(document.querySelector('#road')); 

}

// It is Event Handling,when user click to  Start message(Having id = start) then START function will  Run(Executed) :
document.querySelector('#start').addEventListener('click',START);