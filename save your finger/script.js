// Created by Utkαrsh


alert("Rules\n______\nPlace your finger on the black hole to start .The Blade will come down any time under 3s .Remove you finger in time or you will lose,do not remove too early\n*\n*\nChoose between four levels,\nLet the images load.If the blade does not come down after 5s remove the finger then put it back again");


var box,x,ran,pos=0;
var z,y,speed=25,score=0,finger=20;

//starting the function of blade
function start(){

  box=document.getElementById("touchBox");
  ran=Math.floor(Math.random()*15)+1;
  var seconds=ran*200;
  
  y=setTimeout(ti,seconds);
}

//levels function 

  //easy
    function easy(){      
    document.getElementById("level").innerHTML="Level : Easy";
      speed=25; 
    }
  //medium 
   function medium(){
    document.getElementById("level").innerHTML="Level : Medium";
     speed=16; 
   } 
  //hard
   function hard(){   
   document.getElementById("level").innerHTML="Level : Hard";
     speed=6; 
   }
 //insane   
  function insane(){
       document.getElementById("level").innerHTML="Level : Insane";
     speed=2; 
  }
  
//setting the speed according to level
 function ti(){
   z=setInterval(bladeMotion,speed);
 }

//motion of blade
function bladeMotion(){

 var blade=document.getElementById("blade");
 
    if(pos==80){
      clearInterval(z);
      check();
     }else if(pos<=80){
      pos+=5; 
      blade.style.top=pos+"%";
    }
 }

//checking if you removed your finger too early
function c(){
     if(x==="1" && pos===0){
       alert("Too early . Try again");
       var st=document.getElementById("status");
       st.innerHTML="Too early";
       st.style.left="39%";
       reset();
     }
}

/*setting the value of x to 0 on touch start and 1 on touch end*/

 function x0(){
   document.getElementById("ins")
    .style.visibility="hidden";
   document.getElementById("arrow")
    .style.visibility="hidden";
        x="0";
 }
 function x1(){
   document.getElementById("ins")
    .style.visibility="visible";
   document.getElementById("arrow")
     .style.visibility="visible";
        x="1";
 }

//checking if you win or lose
  function check(){    
     var st=document.getElementById("status");
     var sc=document.getElementById("score");
     
     if(x==="0" && pos==80){
       alert("You lost your finger (*_*)\nUse the other one");

       st.innerHTML="You lose";
       st.style.left="38%";

       score-=1;
       sc.innerHTML="Score : "+score;
       finger-=1;
       var f=document.getElementById("finger");
       f.innerHTML="Finger : "+finger;
       fingerCheck();
       reset();
       x1();

    }
    
    else if(x==="1" && pos==80){
      score+=1;
      sc.innerHTML="Score : "+score;
 
      st.innerHTML="That was close";
      st.style.left="32%";
    
      reset(); 
    }
 
}

//reseting everything
function reset(){
    clearInterval(z);
    clearTimeout(y);
    x="e";
    pos=0;
    var blade=document.getElementById("blade");
    blade.style.top=pos+"%";
}


//checking how many fingers you have left
function fingerCheck(){
   if(finger==15){
       alert("Five finger lost . Use your other hand");
   }
   if(finger==10){
      alert("Try using your toes(^o^)") ;
   }
   if(finger==5){
      alert("Use your other foot (¯―¯٥)");
   }
   if(finger===0){
      alert("You dont have any fingers left\nGame Over (~_~;)");
    var s=document.getElementById("status");
    document.getElementById("touchBox");
    touchBox.style.display="none";
    s.innerHTML="Game Over";
      document.getElementById("ins").style.display="none";
document.getElementById("arrow").style.display="none";
   }
}