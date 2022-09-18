function game(){
let chuj = document.querySelector(".startscreen")
chuj.style.display="none"
let laserOn = false
let punkty = 0 
function Cukier( points, img, position){
    obj = document.createElement("div")
    obj.classList.add("sólimage")
    obj.setAttribute('points',`${points}`);
    obj.innerHTML+=`<img class="img" draggable="false" src = '${img}'>`
    document.body.append(obj)
    obj.style.left= position + "%"
    

}

let obrazki = ["./sól.jpg","./sól.jpg","./sól.jpg","./sól.jpg","./sól.jpg", "./sól2.jpg","./sól2.jpg", "./sól3.jpg", "./cukier.jpg","./cukier.jpg"]
let point = [10,10,10,10,10,20,20,50,-25,-25]


    function dupa(){
        let random1 = Math.floor(Math.random()*9)
        let random3 = Math.floor(Math.random()*90)
        Cukier( point[random1], obrazki[random1], random3)    
    }
dupa()
setTimeout(() => {
    dupa()
}, 1000);
setTimeout(() => {
    dupa()
}, 3000);
setTimeout(() => {
    dupa()
}, 4000);
setTimeout(() => {
    dupa()
}, 5000);


function lineDraw(ax1, ay1, bx1, by1, ax, ay, bx, by, visible){

    let allDivs = (document.querySelectorAll(".remove"))
    if(allDivs){
        allDivs.forEach(div => {
            div.remove()
        })
    }
       



    if(ax > bx) {
        bx = ax + bx; 
        ax = bx - ax;
        bx = bx - ax;

        by = ay + by;
        ay = by - ay;
        by = by - ay;
    }
    let distance = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
    let calc = Math.atan((by - ay) / (bx - ax));
    let degree = calc * 180 / Math.PI;

    let line = document.createElement('div');
    line.classList.add("remove")
    line.style.width=distance+"px"
    line.style.top=ay + 'px'
    line.style.left=ax + 'px'
    line.style.transform= `rotate(${degree}deg)`
    document.body.appendChild(line);

    ///////////////////////////////////////////////////////////////////////////////////////

    if(ax1 > bx1) {
        bx1 = ax1 + bx1; 
        ax1 = bx1 - ax1;
        bx1 = bx1 - ax1;
    
        by1 = ay1 + by1;
        ay1 = by1 - ay1;
        by1 = by1 - ay1;
    }
    let distance1 = Math.sqrt(Math.pow(bx1 - ax1, 2) + Math.pow(by1 - ay1, 2));
    let calc1 = Math.atan((by1 - ay1) / (bx1 - ax1));
    let degree1 = calc1 * 180 / Math.PI;
    
    let line1 = document.createElement('div');
    line1.classList.add("remove")
    line1.style.width=distance1+"px"
    line1.style.top=ay1 + 'px'
    line1.style.left=ax1 + 'px'
    line1.style.transform= `rotate(${degree1}deg)`
    document.body.appendChild(line1);

    //////////////////////////////////////////////////////////////////////////////////////
let laserOn =false
    if(visible){
        document.querySelectorAll(".remove").forEach(element => {
            element.style.display="block"
            laserOn = true
        });
    }
    else{
        document.querySelectorAll(".remove").forEach(element => {
            element.style.display="none"
            laserOn = false

        });    
    }


}
let visible = false
let prevPunkty =punkty
var elem = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

var vh = elem.clientHeight;
var vw = elem.clientWidth/2;
var staraheight = document.querySelector(".stara").clientHeight
let zerodwaVH = vh-staraheight+0.047*vh

if(vw/2<300){
    zerodwaVH = vh-400+32
}

function doShit(e){
    lineDraw(vw-10,zerodwaVH, e.clientX, e.clientY, vw+10,zerodwaVH, e.clientX, e.clientY, visible)    
    document.querySelectorAll(".sólimage").forEach(element => {
        let position = element.getBoundingClientRect()
        if(position.left<e.clientX && position.right>e.clientX && position.top<e.clientY && position.bottom>e.clientY && laserOn){
            setTimeout(() => {
                let position = element.getBoundingClientRect()
                if(position.left<e.clientX && position.right>e.clientX && position.top<e.clientY && position.bottom>e.clientY && laserOn){
                    ////////////////////////////////
                    if(prevPunkty==punkty){
                        punkty+=parseInt(parseInt(element.attributes.points.value))
                    }
                    else{
                        punkty+=0
                    }

                    ////////////////////////////////
                    document.getElementById("punkty").innerHTML=`Usmażona sól: ${punkty}kg`
                    element.innerHTML = element.attributes.points.value
                    element.remove()
                    prevPunkty=punkty
                    setTimeout(() => {
                        dupa()
                    }, 1000);
                }
            }, 200);
        }
    });  
}

onmousemove = function(e){(    
    doShit(e)
    )}

onmousedown= function(){
    document.querySelectorAll(".remove").forEach(element => {
        element.style.display="block"
        laserOn = true

    });    
    visible = true
}
onmouseup= function(){
    document.querySelectorAll(".remove").forEach(element => {
        element.style.display="none"
        laserOn = false
    });     
    visible = false
    prevPunkty =punkty

}



/*
document.addEventListener('mousemove', (event) => {
	console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
});
*/
let lifes = 3
for (let index = 0; index < lifes; index++) {
    document.getElementById("lifes").innerHTML+='<div><img class="olej" src="./olej.png"></img></div>'
} 
setInterval(() => {
    document.querySelectorAll(".sólimage").forEach(element => {
        position = element.getBoundingClientRect()
        if(position.top>700){
            element.remove()
            if(element.attributes.points.value!=-25){
                lifes -=1
                document.getElementById("lifes").innerHTML=""

                for (let index = 0; index < lifes; index++) {
                    document.getElementById("lifes").innerHTML+='<div><img class="olej" src="./olej.png"></img></div>'
            } 
            }
            dupa()
            if(lifes<1){
                koniec()
            }
        }
    })
}, 100);



function koniec(){
    if(document.querySelector(".remove")){
        document.querySelector(".remove").style.backgroundColor="transparent"

    }

    document.body.innerHTML=
    `<div class="end"><div class="center"><div class="message" disabled>KONIEC SMAŻENIA, STARY Z WUJKIEM PRZEJMUJĄ KUCHNIĘ</div><button id="but" class="endButton">Usmażona sól: ${punkty}kg</button><button id="but" onClick="onClick=window.location.reload()" class="endButton">JESZCZE RAZ</button></div></div>`
    laserOn=false
    onmousedown= function(){
        document.querySelectorAll(".remove").forEach(element => {
            element.style.display="none"
            laserOn = false
    
        });    
        visible = true
    }
    onmousemove= function(){
        document.querySelectorAll(".remove").forEach(element => {
            element.style.display="none"
            laserOn = false
    
        });    
        visible = true
    }
    setTimeout(() => {
        document.querySelector("#but").addEventListener("click", newgame)
    }, 10);
    function newgame(){
        console.log("new")
    }


}



   
//////////////////////////////////////////////////////////////////////
let clientX;
let clientY;

document.body.addEventListener('touchmove', (e) => {
  // Cache the client X/Y coordinates
  clientX = e.touches[0].clientX;
  clientY = e.touches[0].clientY;

  ///////////////////////////////////////////////////////
  lineDraw(vw-10,zerodwaVH, clientX, clientY, vw+10,zerodwaVH, clientX, clientY, visible)  
  document.querySelectorAll(".sólimage").forEach(element => {
    let position = element.getBoundingClientRect()
    if(position.left<clientX && position.right>clientX && position.top<clientY && position.bottom>clientY && laserOn){
        setTimeout(() => {
            let position = element.getBoundingClientRect()
            if(position.left<clientX && position.right>clientX && position.top<clientY && position.bottom>clientY && laserOn){
                ////////////////////////////////
                if(prevPunkty==punkty){
                    punkty+=parseInt(parseInt(element.attributes.points.value))
                }
                else{
                    punkty+=0
                }

                ////////////////////////////////
                document.getElementById("punkty").innerHTML=`Usmażona sól: ${punkty}kg`
                element.innerHTML = element.attributes.points.value
                element.remove()
                prevPunkty=punkty
                setTimeout(() => {
                    dupa()
                }, 1000);
            }
        }, 200);
    }
});    
    
  //////////////////////////////////////////////////////
}, false);

document.body.addEventListener("touchstart",function(){
    document.querySelectorAll(".remove").forEach(element => {
        element.style.display="block"
        laserOn = true

    });    
    visible = true
}) 

document.body.addEventListener("touchend",function(){
    document.querySelectorAll(".remove").forEach(element => {
        element.style.display="none"
        laserOn = false
    });     
    visible = false
    prevPunkty =punkty
}) 




///////////
return
}


document.querySelector(".startbutton").addEventListener("click", game)

















///////////////////////
//document.queryselector(".startscreen").style.display="none"
///////////////////////