 

window.onload = function(){

    a.addEventListener('click',ShowStatus);


function ShowStatus(){
       
       
       circle.style.animationDuration = "0.9s"
   }
   
   
   b.addEventListener('click',ShowStatus2);


function ShowStatus2(){
       
       
       circle.style.animationDuration = "0.5s"
   }
   
   
   c.addEventListener('click',ShowStatus3);


function ShowStatus3(){
       
       
       circle.style.animationDuration = "0.2s"
   }
   
   
   d.addEventListener('click',ShowStatus4);


function ShowStatus4(){
       
       
       circle.style.animationDuration = "0.1s"
   }
   
   on.addEventListener('click',ShowStatus5);


function ShowStatus5(){
       
       
       circle.style.animationDuration = "0.5s"
   }
   
   off.addEventListener('click',ShowStatus6);


function ShowStatus6(){
       
       
       circle.style.animationDuration = "9999s"
   }
   
   
   on.addEventListener('click',ShowStatus7);


function ShowStatus7(){
       
       
       on.style.visibility = "hidden"
        off.style.visibility = "visible"
       a.style.visibility = "visible"
       b.style.visibility = "visible"
       c.style.visibility = "visible"
       d.style.visibility = "visible"
   
   }
   
   off.addEventListener('click',ShowStatus8);
   
function ShowStatus8(){
   
   off.style.visibility = "hidden"
   on.style.visibility = "visible"
    a.style.visibility = "hidden"
    b.style.visibility = "hidden"
    c.style.visibility = "hidden"
    d.style.visibility = "hidden"
   
}
   
}
