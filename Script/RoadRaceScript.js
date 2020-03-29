//It is object used to store information related to Game :
//Car object store information like Speed of car ,Postion of car from top,Postion of car from left : 
//X :store Left position of car : 
//Y :store Top position of car:
 
let  Game  = {      
Car:{Speed:5,X:0,Y:0},
Play:true,
Score:0,
Arrows:{ArrowLeft:false,ArrowRight:false,ArrowUp:false,ArrowDown:false},
}

let resetGame = (Game ,road) => {
  
   Game.Score = 0 ;
   
   Game.Play = true;
   
  road.innerHTML = " ";
console.log("Reset game :");
}
let printMessage = (position,start) => {
 

   position.innerHTML = `<h1> Game over : ${Game.Score}</h1>` ;
   position.style.width = "355px";
   position.style.fontSize = "24px";
   position.classList.remove('hide');


   start.classList.remove('hide');

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

let isCarCollide = (enemyCar,car) => {
  let aRect  = enemyCar.getBoundingClientRect();
  let bRect =  car.getBoundingClientRect();
   
    if( ( ( (aRect.top + aRect.height ) < ( bRect.top ) ) || ( aRect.top > ( bRect.top + bRect.height ) ) || ( ( aRect.left + aRect.width ) < bRect.left ) || ( aRect.left > (bRect.left + bRect.width)) ))
      return false;
    else
      return true;
}

let moveEnemyCar = (playerCar) => {
   
   
     let enemyCars  =  document.querySelectorAll('.cars');

      enemyCars.forEach(function(car,index,enemyCars){
        
       let TOP  =  car.offsetTop ;
        
       if(TOP > 560)
         TOP -= 630 ;
       
       TOP += Game.Car.Speed ;


      car.style.top = `${TOP}px`;
    
      if(isCarCollide(car,playerCar)){
        Game.Play = false;
        printMessage(document.querySelector('.message'),document.querySelector('.start'));
        
      }
      });

   
   
}

let randomleft = () =>{
   
 return  Math.floor(Math.random() * 320 ) ;   

}

let createEnemyCar = (Position) => {
   
    
   for(let i = 0 ; i < 4 ; i++){

       let enemyCar  = document.createElement('div');
       enemyCar.setAttribute('class','cars');
       enemyCar.style.left = `${randomleft() + 80 }px`; 
       enemyCar.style.top  = `${i * 150 }px`;
       enemyCar.style.backgroundColor = "blue" ;
       Position.appendChild(enemyCar);
   
   }
}


let carMove = (car, Arrowkeys) =>{

   // this if conditon check if ArrowUp key activate(true) or not 
   // if it is activate then it will decrease Top position of car by car Speed(5):  
   if(Arrowkeys.ArrowUp && Game.Car.Y > 100){
      Game.Car.Y -=  Game.Car.Speed ;  
   }
  
  // this if conditon check if ArrowDown key activate(true) or not 
  // if it is activate then it will increase Top position of car by car Speed(5):    
    if(Arrowkeys.ArrowDown && Game.Car.Y  < 450){
      Game.Car.Y += Game.Car.Speed ;  
    }

  // this if conditon check if ArrowLeft key activate(true) or not 
   // if it is activate then it will decrease left position of car by car Speed(5):  
     
  if(Arrowkeys.ArrowLeft && Game.Car.X > 0){
     Game.Car.X -= Game.Car.Speed ;  
  }

  // this if conditon check if ArrowRight key activate(true) or not 
   // if it is activate then it will increase left position of car by car Speed(5):   
  if(Arrowkeys.ArrowRight && Game.Car.X < 400){
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

let moveLines = () => {
     
    let lines =  document.querySelectorAll('.lines');

    lines.forEach(function(line,index,lines){
        
    let TOP =  line.offsetTop ;
     
     if(TOP > 600 )
       TOP -= 660 ;
     
     TOP += Game.Car.Speed ;
    
     line.style.top = `${TOP}px` ;

    });

}

let updateScore = () => {
  
    document.querySelector('.score').textContent = `Score : ${Game.Score - 1 }`;
}


let Play = () => {

   if(Game.Play){

       carMove(document.querySelector('#car'),Game.Arrows);
       moveLines();
       moveEnemyCar(document.querySelector('#car'));
       Game.Score++ ;
       updateScore();
       window.requestAnimationFrame(Play);   
       
   }
 
}

let createLine = (Position) => {
   
   for(i = 0 ; i < 9 ; i++){ 
        
    let line = document.createElement('div');
    line.setAttribute('class','lines');
    console.log(Position);
    line.style.left = `${220}px`;
    line.style.top = `${i*74}px`;
    Position.appendChild(line);

   }
     
}

// It is Start Function :
let START = (Element) => {


   resetGame(Game,document.querySelector('#road'));

  document.querySelector('#start').classList.add('hide'); // It will hide start message from screen :

  document.querySelector('#message').classList.add('hide');// It will hide message from screen :
    
  createCar(document.querySelector('#road'));
   
  createLine(document.querySelector('#road'));
  
  createEnemyCar(document.querySelector('#road'));

  document.querySelector('.score').classList.remove('hide');

  window.requestAnimationFrame(Play);
 
}

// It is Event Handling on Start Div,when user click to  Start div(message)(Having id = start) then START function will  Run(Executed) :
document.querySelector('#start').addEventListener('click',START);

// It is Event Handling on keys,when user press any key, Down function will Run(Execute):
document.addEventListener('keydown',Down);


// It is Event Handling on keys,when user release  key after press, Up function will Run(Execute):
document.addEventListener('keyup',Up);

