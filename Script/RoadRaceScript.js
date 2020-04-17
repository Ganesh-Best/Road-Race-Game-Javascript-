//It is object used to store information related to Game :
//Car object store information like Speed of car ,Postion of car from top,Postion of car from left : 
//X :store Left position of car : 
//Y :store Top position of car:
//Play :It  means Game is active .
//Score:It is used to store Score of player : 

// It is Game Object :
let Game = {
  Car: { Speed: 5, X: 0, Y: 0 },
  Play: false,
  Stop: false,
  Score: 0,
  GameOver: false,
  Keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, Space: { Toggle: true } },
}

//It is isCompatible function it will check  whether screen size compatible with game or not :
const isCompatible = () => {

  //window is global object,innerWidth & innerHeight  check width & height  in which html document render : 
  if (window.innerWidth >= 1280)
    return true;
  else
    return false;


}

//It is reset Game function,it receiving 2 parameter ,first one Game Object,2nd road object(It means div element having id or class value : road) :
let resetGame = (Game, road) => {

  // It initalize score = 0;
  Game.Score = 0;

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
let printMessage = (position, start, score) => {

  // It  changes inner Html 
  position.innerHTML = `<h1> Game over : ${Game.Score}</h1>`;

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

// It is irregular function(It return random number according to argument), 
//taking one argument & set default value :0
let irregular = (k = 0) => {
  return (Math.ceil(Math.random() * 4) + k);
}


// It is down function: 
let Down = (Element) => {

  // This If-condition will check whether press keys are  ArrowKeys or Not:
  //if press keys are arrow keys then it will make  corresponding arrowkey true(activate) inside inside Arrows object[Game.Arrows] :   
  if (Element.key === "ArrowLeft" || Element.key === "ArrowRight" || Element.key === "ArrowUp" || Element.key === "ArrowDown")
    Game.Keys[Element.key] = true;

  // This If condition will check whether press keys is space key or not :
  //if Press keys is space key then it will  select message object & make it appear of screen with  message :        

  if ((Element.key === " " && Game.Keys.Space.Toggle) && Game.Play && !Game.GameOver) {
    //It will select message Object & store reference in messageBox :
    let messageBox = document.querySelector('.message');

    //It will change message Object inner HTML :
    messageBox.innerHTML = `<h1>Press Space for Resume</h1>`;

    //It will remove hide class from Message object :    
    messageBox.classList.remove('hide');

    // It will  deactivate Play : 
    Game.Play = false;

    // It deactivate Toggle : 
    Game.Keys.Space.Toggle = false;

  } else if (Element.key === " " && !Game.Keys.Space.Toggle) {

    // It will select message Object & store in messageBox 
    let messageBox = document.querySelector('.message');

    //It will add hide class to message object :
    messageBox.classList.add('hide');

    //It will activate game :    
    Game.Play = true;

    //It will activate toggle :     
    Game.Keys.Space.Toggle = true;

    //It will call Play function again :     
    Play();

  }



}
//It is Up function :
let Up = (Element) => {


  // This if condition check whether press keys are  ArrowKeys or Not:
  //if press keys are arrow keys then it will make  corresponding arrowkey false(deactivate) inside inside Arrows object[Game.Arrows] :
  if (Element.key === "ArrowLeft" || Element.key === "ArrowRight" || Element.key === "ArrowUp" || Element.key === "ArrowDown")
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

let isCarCollide = (enemyCar, car) => {

  // It will return all coordinate of enemycar object such as top,left,right,bottom,widht,height: 
  let aRect = enemyCar.getBoundingClientRect();


  // It will return all coordinate of car object such as top,left,right,bottom,widht,height:
  let bRect = car.getBoundingClientRect();


  // It will detect collision : ->You have to search collision detection on google  and you will understand  better  :
  if ((((aRect.top + aRect.height) < (bRect.top)) ||
    (aRect.top > (bRect.top + bRect.height)) || ((aRect.left + aRect.width) < bRect.left) ||
    (aRect.left > (bRect.left + bRect.width))))
    return false;
  else
    return true;


}

// It is moveEnemyCar function :It is resposible for movements of enemy Cars :
let moveEnemyCar = (playerCar) => {

  // It will select all cars(div elements having class values cars) & return as Array of objects of car :    
  let enemyCars = document.querySelectorAll('.cars');

  // It will apply forEach function (It acts like loop) to  enemyCars array :
  enemyCars.forEach(function (car, index, enemyCars) {

    // offsetTop return top position of element(Object) & store in TOP : 
    let TOP = car.offsetTop;

    // It check if top > 560 ,then it subtract 630 in TOP 
    if (TOP > (window.innerHeight - 75))
      TOP -= 630;

    //It increases TOP value by Game.car.speed value(5); 
    TOP += Game.Car.Speed;

    //It sets top positon of car :
    car.style.top = `${TOP}px`;

    // It check whether car collide with enemycar or not ::
    //If collide it return true :
    //if blocks will execute when carCollide function return true :  
    if (isCarCollide(car, playerCar)) {

      // It   deactivates the game :
      Game.Play = false;
      Game.GameOver = true;
      //printMessage will call ,having 3 object arguments 
      // 1st is message object:
      //2nd one is start object:
      //3rd one is score object : 
      printMessage(document.querySelector('.message'), document.querySelector('.start'), document.querySelector('.score'));

    }

  }); // closing braces forEach function :



}

// It is randomleft function  return random number between 0 to 320 :
let randomleft = () => {

  return Math.floor(Math.random() * 320);

}

// It is createEnemyCar function : It  generates enemy cars in games ,It receiving road Object(div element having class or id value : road):
let createEnemyCar = (Position) => {

  // It is loop ,it executes all code 4 times : 
  for (let i = 0; i < 3; i++) {

    // It create a div element object in DOM(Document Object Modal) & store to enemyCar variable : 
    let enemyCar = document.createElement('div');

    //It create Image tag & set image link inside Div object(element): 
    enemyCar.innerHTML = `<img src ='Assets/${irregular(4)}.png' >`;
    // It  sets a attribute to enemyCar object :
    enemyCar.setAttribute('class', 'cars');

    //It  sets left position of enemyCar object: 
    enemyCar.style.left = `${randomleft() + 60}px`;

    //It  sets top position of enemyCar object: 
    enemyCar.style.top = `${i * 190}px`;

    //It  sets backgroundColor of enemyCar object: 


    // It add enemyCar object to road object(Div element having class or id value :road):      
    Position.appendChild(enemyCar);

  }
}


let carMove = (car, Arrowkeys) => {

  // this if conditon check if ArrowUp key activate(true) or not 
  // if it is activate then it will decrease Top position of car by car Speed(5):  
  if (Arrowkeys.ArrowUp && Game.Car.Y > 100) {
    Game.Car.Y -= Game.Car.Speed;
  }

  // this if conditon check if ArrowDown key activate(true) or not 
  // if it is activate then it will increase Top position of car by car Speed(5):    
  if (Arrowkeys.ArrowDown && Game.Car.Y < window.innerHeight - 95) {
    Game.Car.Y += Game.Car.Speed;
  }

  // this if conditon check if ArrowLeft key activate(true) or not 
  // if it is activate then it will decrease left position of car by car Speed(5):  

  if (Arrowkeys.ArrowLeft && Game.Car.X > 0) {
    Game.Car.X -= Game.Car.Speed;
  }

  // this if conditon check if ArrowRight key activate(true) or not 
  // if it is activate then it will increase left position of car by car Speed(5):   
  if (Arrowkeys.ArrowRight && Game.Car.X < 400) {
    Game.Car.X += Game.Car.Speed;
  }

  // It is update car top position :
  car.style.top = `${Game.Car.Y}px`;
  //It is update car left position of car :
  car.style.left = `${Game.Car.X}px`;

}


//It is Create car function ,it is taking one argument as position,
//This function   create car  inside road object(element having either id or class value :road) :
let createCar = (position) => {

  // It creates div element object and store to carDiv object :
  let carDiv = document.createElement('div');

  // It creates image tag & set random  image according to irregular function inside carDiv object :   
  carDiv.innerHTML = `<img src ='Assets/${irregular()}.png' >`;

  //It sets class attribute to carDiv object : 
  carDiv.setAttribute('class', 'car');

  //It sets id attribute to carDiv object :
  carDiv.setAttribute('id', 'car');

  //It sets Top position  to carDiv object :
  carDiv.style.top = `${320}px`;

  //It append carDiv object to Position object(road Object) :
  position.appendChild(carDiv);

  //It taking left offset value of car and store to Game object :  
  Game.Car.X = carDiv.offsetLeft;

  //It taking top offset value of car and store to Game object :   
  Game.Car.Y = carDiv.offsetTop;

}



// This is movelines function :IT is responsible to move line:
let moveLines = () => {

  // It select all lines object and store to line array object :
  let lines = document.querySelectorAll('.lines');

  // It iterates lines array using forEach method : 
  lines.forEach(function (line, index, lines) {

    // It stores top position of  line object in TOP variable :
    let TOP = line.offsetTop;

    // It checks innerHeight of browser:
    //If it is greater than innerHeight - 65 :    
    if (TOP > (window.innerHeight - 65)) {

      //Then It substracts 660 value in TOP variable: 
      TOP -= 660;
    }
    // It increate Top variable value by Speed which define inside Game object :    
    TOP += Game.Car.Speed;
    // It sets top positon of line:
    line.style.top = `${TOP}px`;

  });

}

//It is updates Score function:responsible to update score in frontEnd :    
let updateScore = () => {
  //It updates score value to score object :
  document.querySelector('.score').textContent = `Score : ${Game.Score - 1}`;
}


// It is play function : execute when window.requestAnimationFrame function call :
let Play = () => {

  //It execute all if -block code if game.play is activate(true); 
  if (Game.Play) {

    //  calling move car function and passing to argument:
    //1st one is car object,
    //2nd one is Game keys object :
    carMove(document.querySelector('#car'), Game.Keys);
    //Calling movelines function :
    moveLines();
    //calling move enemyCar function & passing one argument: car  object array ;     
    moveEnemyCar(document.querySelector('#car'));
    // it is updating game score : 
    Game.Score++;
    //calling update Score function:  
    updateScore();
    //Calling window.requestAnimationFrame function ,to achieve recursion    
    window.requestAnimationFrame(Play);

  }

}

// It is createLine function & it is receiving position(means where to create lines) :
// It will create lines : 
let createLine = (Position) => {

  //It creates 9 lines div object :  
  for (i = 0; i < 9; i++) {

    // It creates div element object and store to line object :
    let line = document.createElement('div');

    //It sets class with value lines to line object :  
    line.setAttribute('class', 'lines');
    //It sets left position to line object :
    line.style.left = `${220}px`;
    //It sets top position to line object:  
    line.style.top = `${i * 74}px`;
    //It append line object to postion object (road object) :  
    Position.appendChild(line);

  }

}


// It is Start Function :
let START = (Element) => {

  // It activat player : 
  Game.Play = true;
  //It deactivate gameover variable : 
  Game.GameOver = false;
  //It is resetGame function :It is taking to argument :1st one is game object and 2nd one is road object:

  resetGame(Game, document.querySelector('#road'));

  //It select Start object and add hide class on it :
  document.querySelector('#start').classList.add('hide'); // It will hide start message from screen :

  // It select message object and add hide class on it : 
  document.querySelector('#message').classList.add('hide');// It will hide message from screen :

  //Calling createCar function : and passing road object :
  createCar(document.querySelector('#road'));

  //Calling CreateLine function : and passing road object: 
  createLine(document.querySelector('#road'));

  //Calling enemyCar function and passing road Object :  
  createEnemyCar(document.querySelector('#road'));

  // selecting score object and adding removing hide class : 
  document.querySelector('.score').classList.remove('hide');

  // Calling requestAnimationFrame function and passing Play function :
  window.requestAnimationFrame(Play);

}

//  isCompatible function check compatibility if compatible  return true then it execute all code inside if-block :
//,otherwise it return false: & execute else block code : 

if (!isCompatible()) {

  // It will add hide class to to message object :[object(element) having class or id value :message]
  document.querySelector('.message').classList.add('hide');
  //It select  start object & store  in start variable:  
  let start = document.querySelector('.start');
  //It change text of start Object :
  start.innerText = ` Oops ! Your device not compatible :(`;
  //It change top-position of start object :  
  start.style.top = `50%`;

}
else {

  // It is Event Handling on Start Div,when user click to  Start div(message)(Having id = start) then START function will  Run(Executed) :
  document.querySelector('#start').addEventListener('click', START);

  // It is Event Handling on keys,when user press any key, Down function will Run(Execute):
  document.addEventListener('keydown', Down);


  // It is Event Handling on keys,when user release  key after press, Up function will Run(Execute):
  document.addEventListener('keyup', Up);

}