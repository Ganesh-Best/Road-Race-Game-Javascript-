// It is object used to store information related to Game :
let  Game  = {      
Car:{Speed:5,X:0,Y:0},
Arrows:{ArrowLeft:false,ArrowRight:false,ArrowUp:false,ArrowDown:false},
}

// It is down function: 
let Down = (Element) =>{
   
     // This if condition check whether press keys are  ArrowKeys or Not:
     //if press keys are arrow keys then it will make  corresponding arrowkey true(activate) inside inside Arrows object[Game.Arrows] :   
    if(Element.key === "ArrowLeft" || Element.key === "ArrowRight" || Element.key === "ArrowUp" || Element.key === "ArrowDown") 
      Game.Arrows[Element.key] = true;
 
}
//It is Up function :
let Up = (Element) => {

     
     // This if condition check whether press keys are  ArrowKeys or Not:
     //if press keys are arrow keys then it will make  corresponding arrowkey false(deactivate) inside inside Arrows object[Game.Arrows] :
     if(Element.key === "ArrowLeft" || Element.key === "ArrowRight" || Element.key === "ArrowUp" || Element.key === "ArrowDown") 
      Game.Arrows[Element.key] = false;
  
}

// It is move function :(Responsible to move car effectively in Game :)

let carMove = (car, Arrowkeys) =>{

   // this if conditon check if ArrowUp key activate(true) or not 
   // if it is activate then it will decrease Top position of car by car Speed(5):  
   if(Arrowkeys.ArrowUp){
      Game.Car.Y -=  Game.Car.Speed ;  
   }
  
  // this if conditon check if ArrowDown key activate(true) or not 
  // if it is activate then it will increase Top position of car by car Speed(5):    
    if(Arrowkeys.ArrowDown){
      Game.Car.Y += Game.Car.Speed ;  
    }

  // this if conditon check if ArrowLeft key activate(true) or not 
   // if it is activate then it will decrease left position of car by car Speed(5):  
     
  if(Arrowkeys.ArrowLeft){
     Game.Car.X -= Game.Car.Speed ;  
  }

  // this if conditon check if ArrowRight key activate(true) or not 
   // if it is activate then it will increase left position of car by car Speed(5):   
  if(Arrowkeys.ArrowRight){
     Game.Car.X += Game.Car.Speed ;  
  }   
  
  // It is update car top position :
  car.style.top  = `${Game.Car.Y}px`;
  //It is update car left position of car :
  car.style.left  = `${Game.Car.X}px`;
  
}

let createCar = (position) => {
      
     let carDiv  =  document.createElement('div');
     carDiv.setAttribute('class','car');
     carDiv.setAttribute('id','car');
     carDiv.style.top = `${320}px`; 
     position.appendChild(carDiv);
      
     Game.Car.X = carDiv.offsetLeft ;
     Game.Car.Y = carDiv.offsetTop ;  
     console.log(Game.Car);
}
let Play = () => {

  carMove(document.querySelector('#car'),Game.Arrows);
  window.requestAnimationFrame(Play);   
}

// It is Start Function :
let START = (Element) =>{

  document.querySelector('#start').classList.add('hide'); // It will hide start message from screen :

  document.querySelector('#message').classList.add('hide');// It will hide message from screen :
    
   createCar(document.querySelector('#road'));
   
  
   window.requestAnimationFrame(Play);
 
}

// It is Event Handling on Start Div,when user click to  Start div(message)(Having id = start) then START function will  Run(Executed) :
document.querySelector('#start').addEventListener('click',START);

// It is Event Handling on keys,when user press any key, Down function will Run(Execute):
document.addEventListener('keydown',Down);


// It is Event Handling on keys,when user release  key after press, Up function will Run(Execute):
document.addEventListener('keyup',Up);