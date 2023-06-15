const socket = io()
let click = false
let moving_mouse = false
let x_position = 0
let y_postion = 0
let previous_position = {}
let color = ""

const canvas=document.getElementById("canvas")
const users= document.getElementById("users")
const context = canvas.getContext("2d")
const width = window.innerWidth
const height = window.innerHeight

canvas.width= width
canvas.height= height

canvas.addEventListener("mousedown",()=>{
    click = true
})
canvas.addEventListener("mouseup", ()=>{
    click = false
})

canvas.addEventListener("mousemove", (event)=>{
 x_position = event.clientX
 y_postion= event.clientY
 moving_mouse = true
})

function create_drawing(){
    if(click== true && moving_mouse == true && previous_position !=null){
        let drawing = {
            x_position:x_position,
            y_postion:y_postion,
            color:color,
            previous_position:previous_position
        }
        socket.emit("drawing", drawing)
    }
    previous_position ={
        x_position:x_position,
        y_postion:y_postion
    }
    setTimeout(create_drawing,3)
}
function change_color(c){
    color=c
    context.strokeStyle = color
    context.stroke()
}

function delete_all(){
    socket.emit("delete")
}

   socket.on("show_drawing",(drawing) =>{
    if(drawing != null){
        context.beginPath()
        context.lineWitdh = 3
        context.strokeStyle = drawing.color
        context.moveTo(drawing.x_position, drawing.y_postion)
        context.lineTo(drawing.previous_position.x_position,drawing.previous_position.y_postion)
        context.stroke()
    }else{
        context.clearRect(0,0, canvas.width, canvas.height)

    }

  })
    
  socket.on("users", (number)=>{
 users.innerHTML = `numero de usuarios conectados: ${number}`
  })

create_drawing()