console.log('Moving Car');
// const audio = document.getElementById('tune');
// function playAudio(){
//     audio.loop = true;
//     audio.play()
//         .then(() => {
//             console.log("Play the audio");
//         })
//        .catch((err) =>{
//          console.log("Error occurd",err);
//        });
//     document.removeEventListener('click' ,playAudio);
//     }       
//     document.addEventListener('click',playAudio);
    const car = document.querySelector('.car');
    const sky = document.querySelector('.sky');
    const wheel=document.querySelectorAll('.wheels');
    const track= document.querySelector('.track');
    const trees= document.querySelector('.trees');
    // const startBtn = document.getElementById('startBtn');
    // const pauseBtn = document.getElementById('pauseBtn');
    const audio = document.getElementById('tune');
    
    let animationId , startTime , paused = false;
    let distance=0;
    
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
    
      // Move layers at different speeds (parallax)
      const speed = 0.1; // px per ms
      distance = (elapsed * speed) % window.innerWidth;
      sky.style.transform = `translateX(${-distance * 0.8}px)`;
      trees.style.transform = `translateX(${-distance * 0.8}px)`;
      track.style.transform = `translateX(${-distance * 0.8}px)`;
    
      // Move car container back to fixed position so only background moves
      car.style.transform = `translateX(0)`;
    
      // Rotate wheels
      wheel.forEach(wheels => {
        wheels.style.transform = `rotate(${distance * 15}deg)`;
      });
    
      if (!paused) animationId = requestAnimationFrame(animate);
    }
    
    // Start & Pause controls
    document.getElementById('startBtn').addEventListener('click', () => {
      if (!animationId) {
        startTime = null;
        paused = false;
        audio.play();
        animationId = requestAnimationFrame(animate);
      }
    });
    
    document.getElementById('pauseBtn').addEventListener('click', () => {
      paused = true;
      cancelAnimationFrame(animationId);
      animationId = null;
      audio.pause();
    });
    


