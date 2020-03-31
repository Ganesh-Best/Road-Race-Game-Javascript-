//It is object used to store information related to Game :
//Car object store information like Speed of car ,Postion of car from top,Postion of car from left : 
//X :store Left position of car : 
//Y :store Top position of car:
//Play :It  means Game is active .
//Score:It is used to store Score of player : 

// It is Game Object :
let  Game  = {      
Car:{Speed:5,X:0,Y:0},
Play:true,
Stop:false,
Score:0,
Keys:{ArrowLeft:false,ArrowRight:false,ArrowUp:false,ArrowDown:false,Space:{Toggle:true}},
}

//It is reset Game function,it receiving 2 parameter ,first one Game Object,2nd road object(It means div element having id or class value : road) :
let resetGame = (Game ,road) => {

  // It initalize score = 0;
   Game.Score = 0 ;
   
   //It make game active again : 
   Game.Play = true;
   
  // It reset road object (It means div element having class or id  road) to empty :    
  road.innerHTML = " ";

}


// It is printMessage function :
//It receiving 3 parameter:
//1st one mesage object(It means a Div element having class or id value : message ),
//2nd one is Start Object(It means a Div element having class or id value : start ) 
//3rd one is Score Object (It means a Div element having class or id value : score ) 
let printMessage = (position,start,score) => {
 
  // It  changes inner Html 
   position.innerHTML = `<h1> Game over : ${Game.Score}</h1>` ;
  
  //It changes width:
   position.style.width = "405px";

  //It changes font size :
   position.style.fontSize = "24px";

  //It remove class name hide: 
   position.classList.remove('hide');

  //It remove class name hide:  
   start.classList.remove('hide');

  //It add class hide : 
   score.classList.add('hide');

}


// It is down function: 
let Down = (Element) =>{
   
     // This If-condition will check whether press keys are  ArrowKeys or Not:
     //if press keys are arrow keys then it will make  corresponding arrowkey true(activate) inside inside Arrows object[Game.Arrows] :   
    if(Element.key === "ArrowLeft" || Element.key === "ArrowRight" || Element.key === "ArrowUp" || Element.key === "ArrowDown") 
      Game.Keys[Element.key] = true;
   
// This If condition will check whether press keys is space key or not :
//if Press keys is space key then it will  select message object & make it appear of screen with  message :        
  
if(Element.key === " " && Game.Keys.Space.Toggle){
        //It will select message Object & store reference in messageBox :
     let messageBox = document.querySelector('.message');
       
       //It will change message Object inner HTML :
         messageBox.innerHTML = `<h1>Press Space for Resume</h1>` ;
      
       //It will remove hide class from Message object :    
         messageBox.classList.remove('hide');

       // It will  deactivate Play : 
         Game.Play = false ;

       // It deactivate Toggle : 
         Game.Keys.Space.Toggle = false ; 

}else if( Element.key === " " && !Game.Keys.Space.Toggle ){
         
      // It will select message Object & store in messageBox 
     let messageBox = document.querySelector('.message');

     //It will add hide class to message object :
         messageBox.classList.add('hide');
     
    //It will activate game :    
         Game.Play = true ;

    //It will activate toggle :     
         Game.Keys.Space.Toggle = true ;
    
    //It will call Play function again :     
         Play();

}



}
//It is Up function :
let Up = (Element) => {

     
     // This if condition check whether press keys are  ArrowKeys or Not:
     //if press keys are arrow keys then it will make  corresponding arrowkey false(deactivate) inside inside Arrows object[Game.Arrows] :
     if(Element.key === "ArrowLeft" || Element.key === "ArrowRight" || Element.key === "ArrowUp" || Element.key === "ArrowDown") 
      Game.Keys[Element.key] = false;

       
     // This If conditon will check whether press keys is space key or not :
     //if Press keys is space key then it will make space key false inside Arrows object[Game.Keys] :      
      
}     

// It is move function :(Responsible to move car effectively in Game :)


//It is car Collide function ,receiving 2 parameter:
//1st one is enemy Car ,
//2nd one is user Car:
//It will check whether two element collide or not,
//If two element collides it return true ,otherwise return false :

let isCarCollide = (enemyCar,car) => {

  // It will return all coordinate of enemycar object such as top,left,right,bottom,widht,height: 
  let aRect  = enemyCar.getBoundingClientRect();

  
  // It will return all coordinate of car object such as top,left,right,bottom,widht,height:
  let bRect =  car.getBoundingClientRect();
   

  // It will detect collision : ->You have to search collision in and you will understand it :
    if( ( ( (aRect.top + aRect.height ) < ( bRect.top ) ) || ( aRect.top > ( bRect.top + bRect.height ) ) || ( ( aRect.left + aRect.width ) < bRect.left ) || ( aRect.left > (bRect.left + bRect.width)) ))
      return false;
    else
      return true;
}

// It is moveEnemyCar function :It is resposible for movements of enemy Cars :
let moveEnemyCar = (playerCar) => {
   
    // It will select all cars(div elements having class values cars) & return as Array of objects of car :    
     let enemyCars  =  document.querySelectorAll('.cars');

    // It will apply forEach function (It acts like loop) to  enemyCars array :
      enemyCars.forEach(function(car,index,enemyCars){
        
       // offsetTop return top position of element(Object) & store in TOP : 
       let TOP  =  car.offsetTop ;
       
       // It check if top > 560 ,then it subtract 630 in TOP 
       if(TOP > 560)
         TOP -= 630 ;
       
      //It increases TOP value by Game.car.speed value(5); 
       TOP += Game.Car.Speed ;

     //It sets top positon of car :
      car.style.top = `${TOP}px`;
    
    // It check whether car collide with enemycar or not ::
    //If collide it return true :
    //if blocks will execute when carCollide function return true :  
      if(isCarCollide(car,playerCar)){
      
        // It   deactivates the game :
        Game.Play = false;

       //printMessage will call ,having 3 object arguments 
       // 1st is message object:
       //2nd one is start object:
       //3rd one is score object : 
        printMessage(document.querySelector('.message'),document.querySelector('.start'),document.querySelector('.score'));
        
      }

      }); // closing braces forEach function :

   
   
}

// It is randomleft function  return random number between 0 to 320 :
let randomleft = () =>{
   
 return  Math.floor(Math.random() * 320 ) ;   

}

// It is createEnemyCar function : It  generates enemy cars in games ,It receiving road Object(div element having class or id value : road):
let createEnemyCar = (Position) => {
   
   // It is loop ,it executes all code 4 times : 
   for(let i = 0 ; i < 4 ; i++){
      
        // It create a div element object in DOM(Document Object Modal) & store to enemyCar variable : 
             let enemyCar  = document.createElement('div');
    
        // It  sets a attribute to enemyCar object :
             enemyCar.setAttribute('class','cars');
    
        //It  sets left position of enemyCar object: 
             enemyCar.style.left = `${randomleft() + 80 }px`;
        
        //It  sets top position of enemyCar object: 
             enemyCar.style.top  = `${i * 150 }px`;

        //It  sets backgroundColor of enemyCar object: 
             enemyCar.style.backgroundColor = "blue" ;
        
        // It add enemyCar object to road object(Div element having class or id value :road):      
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

let faster = (Game) => {
  
}

let Play = () => {

   if(Game.Play){
        
        
       carMove(document.querySelector('#car'),Game.Keys);
       spaceStop(Game.Keys);
       moveLines();
       moveEnemyCar(document.querySelector('#car'));
       Game.Score++ ;
       updateScore();
       faster(Game); 
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

let spaceStop = (Element) => {
   
  
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
 
  document.addEventListener('keydown',spaceStop) ;
  window.requestAnimationFrame(Play);
 
}

// It is Event Handling on Start Div,when user click to  Start div(message)(Having id = start) then START function will  Run(Executed) :
document.querySelector('#start').addEventListener('click',START);

// It is Event Handling on keys,when user press any key, Down function will Run(Execute):
document.addEventListener('keydown',Down);


// It is Event Handling on keys,when user release  key after press, Up function will Run(Execute):
document.addEventListener('keyup',Up);

