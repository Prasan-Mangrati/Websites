document.addEventListener("DOMContentLoaded",()=>{
    song = new Audio("http://127.0.0.1:3000/Songs/Eklai%20Bhayeni%20%7C%20Sujan%20Chapagain.mp3");
    
    
    document.getElementById("play").addEventListener("click",()=>{
        song.play()
    })
    
    document.getElementById("pause").addEventListener("click",()=>{
        song.pause()
    })
    pause = false
    document.addEventListener("keydown",(key)=>{
          console.log(key)
          if(key.code="Space"){
            if(!pause)
            {
                song.play()
                pause=true
            }
            else{
                song.pause()
                pause=false
            }
          }
          
    })
})