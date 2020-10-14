{/* <script> */}
      // [X] have JS display world - brick/coin/pacman
      // [X] expands maze
      // [X] move pacman up and down
      // [X] score increase
      // [X] add cherry with score
      // [X] add ghosty with score
      // [X] add ghosty with game over
      // [X] move to modular functions
      // [X] add key legend
      // [X] move to pacman.js
      //console.dir(document)
      //?? css position: absolute/relative

      //1=brick 0=coin 0=empty
      let world = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];

      let pacman = {
        x: 1,
        y: 1,
        t: 0,
      };

      let cherry = {
        x: 1,
        y: 1,
      };

      let ghosty = {
        x: 1,
        y: 1,
      };

      let legend = `POINTS:
                    Coin: 10  \nCherry: 50 
                    Blue Ghosty: 200 
                    Pink Ghosty: 300 
                    Red Ghosty: Game Over!`;
      let score = 0;
      let gameOver = false;

      let displayWorld = () => {
        let output = "";
        if (gameOver){
            for (let i = 0; i < world.length; i++) {
                output += "\n<div class='row'>\n";
                for (let j = 0; j < world[i].length; j++) {
                    // output += world[i][j];  //test
                    if (world[i][j] === 1) {
                    output += "<div class='brick'></div>";
                    } else {
                    output += "<div class='empty'></div>";
                    }
                }
                output += "\n</div>";
            }
        }
        else {
            for (let i = 0; i < world.length; i++) {
            output += "\n<div class='row'>\n";
            for (let j = 0; j < world[i].length; j++) {
                // output += world[i][j];  //test
                if (world[i][j] === 1) {
                output += "<div class='brick'></div>";
                } else if (world[i][j] === 0) {
                output += "<div class='coin'></div>";
                } else if (world[i][j] === 7) {
                output += "<div class='cherry'></div>";
                } else if (world[i][j] === 2) { //2 - Blue
                output += "<div class='ghostBlue'></div>";
                } else if (world[i][j] === 3) { //3 - Pink
                output += "<div class='ghostPink'></div>";
                } else if (world[i][j] === 5) { //5 - Red
                output += "<div class='ghostRed'></div>";
                } else if (world[i][j] === 4) {
                output += "<div class='empty'></div>";
                }
            }
            output += "\n</div>";
            }
        }   
        // console.log(output);  //test
        document.getElementById("world").innerHTML = output;
      };

      let displayPacman = () => {
        if(gameOver){
            // document.getElementById("pacman").style.visibility = "hidden";  // works but not as good
            pacman.x = 1;
            pacman.y = 1;
            pacman.t = 270;
        }
        document.getElementById("pacman").style.left = pacman.x * 20 + "px";
        document.getElementById("pacman").style.top = pacman.y * 20 + "px";
        document.getElementById("pacman").style.transform = `rotate(${pacman.t}deg)`;
      };
      // just trying out other animation
      // let displayPacman = () => {
      //     document.getElementById('pacman').animate([
      //         {transform: 'rotate(90deg)'},
      //         // {transform: 'rotate(080deg)'},
      //         {transform: 'translateY(250px)'},
      //         // {transform: 'translate3D(50%,50%,0)'}
      //     ],{
      //         duration: 6000,
      //         iterations: 3,
      //         // direction: "alternate-reverse"
      //     });
      // }

      let displayScore = () => {
        document.getElementById("score").innerHTML = `Score: ${score}`;
        if (gameOver){
            document.getElementById("score").innerHTML = `${score} - Game Over! =(`;
        }
      };

      let displayLegend = () => {
        // document.getElementById("legend").innerHTML = legend; //use with css white-space:
        document.getElementById("legend").innerText = legend;
      };

      // learn from mistake - cherry is not a real obj - it is part of the "world"
      // let displayCherry = () => {
      //     document.getElementsByClassName('cherry').style.left = cherry.x*20+'px';
      //     document.getElementsByClassName('cherry').style.top = cherry.y*20+'px';
      //     document.getElementsByClassName('cherry').style.visibility = 'visible';
      // }
      // let hideCherry = () => {
      //     document.getElementsByClassName('cherry').style.visibility = 'hidden';
      // }
      // displayCherry();
      
      let pacmanTravels = (e) => {
        // console.log(e.keyCode);
        // if (e.keyCode === 37 ) {  //left
        //     if(world[pacman.y][pacman.x-0]!==2){
        //         pacman.x -= 20;  }  }
        // console.log(pacman); //test

        //37-left   38-up   39-right   40-down
        if (e.keyCode === 37 && world[pacman.y][pacman.x - 1] !== 1) {          //left37
            pacman.x--;
            pacman.t = 180;
        } else if (e.keyCode === 38 && world[pacman.y - 1][pacman.x] !== 1) {   //up38
            pacman.y--;
            pacman.t = 270;
        } else if (e.keyCode === 39 && world[pacman.y][pacman.x + 1] !== 1) {   //right39
            pacman.x++;
            pacman.t = 0;
        } else if (e.keyCode === 40 && world[pacman.y + 1][pacman.x] !== 1) {   //down40
            pacman.y++;
            pacman.t = 90;
        }
        displayPacman();
      };

      let pacmanScores = () =>{
        if (world[pacman.y][pacman.x] === 0) {          //Coin+10
            world[pacman.y][pacman.x] = 4;
            score += 10;
        } else if (world[pacman.y][pacman.x] === 7) {   //Cherry+50
            world[pacman.y][pacman.x] = 4;
            score += 50;
        } else if (world[pacman.y][pacman.x] === 2 ){   //Blue+200
            world[pacman.y][pacman.x] = 4;
            score += 200;
        } else if (world[pacman.y][pacman.x] === 3 ){   //Pink+300
            world[pacman.y][pacman.x] = 4;
            score += 300;
        } else if (world[pacman.y][pacman.x] === 5){    //Red-0
            score = 0;
            gameOver = true;
        }
        displayWorld();
        displayScore();
        // displayPacman(); //avoid wipe out immediately
        // console.log(pacman.y, pacman.x, world[pacman.y][pacman.x]); //test
      };

      let cherryAppears = (e) =>{        
        // if (score >= 70){  //bad: overrides above action and cherry wont get eaten but stuck
          if (score === 30 || score === 70 || score === 350 || score === 630 || score === 900 || score === 1190) {
            if (e.keyCode === 39 || e.keyCode === 40){    // if (e.keyCode !== 37 && e.keyCode !==38){
                cherry.x = Math.floor(Math.random() * 14);
                cherry.y = Math.floor(Math.random() * 14);
                console.log('cherry:',cherry);
                if (world[cherry.y][cherry.x] !== 1) {
                  world[cherry.y][cherry.x] = 7;
                }
            }
        } 
        // decide to keep cheeries around
        // if ((score === 60 || score === 140 || score === 420 || score === 700 || score === 980 || score === 1260) 
        //         && world[cherry.y][cherry.x] === 7){
        //     world[cherry.y][cherry.x] = 4; 
        // }
        displayWorld();
      }

      let ghostyAppears = (e) => {
        if (score % 100 === 0 && score % 3 !== 0 && score !== 400 && score !== 700 && score !== 1000 && score !== 1300 ) {   //Blue+200
                ghosty.x = Math.floor(Math.random() * 14);
                ghosty.y = Math.floor(Math.random() * 14);
                console.log('gBlue:',score, ghosty);
                if (world[ghosty.y][ghosty.x] !== 1) {
                  world[ghosty.y][ghosty.x] = 2;
                } 
        }
        if (score % 3 === 0 && score % 100 === 0 ) {  //Pink+300
          // if (e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){  //comment out to provide more opportunity
              ghosty.x = Math.floor(Math.random() * 14);
              ghosty.y = Math.floor(Math.random() * 14);
              console.log('gPink:',score, ghosty);
              if (world[ghosty.y][ghosty.x] !== 1) {
                world[ghosty.y][ghosty.x] = 3;
            // } 
          }
        }
        if (score % 55 === 0 ) {  //Red-0
          if (e.keyCode === 39){
            ghosty.x = Math.floor(Math.random() * 14);
            ghosty.y = Math.floor(Math.random() * 14);
            console.log('gRed:',score, ghosty);
            if (world[ghosty.y][ghosty.x] !== 1) {
              world[ghosty.y][ghosty.x] = 5;
            } 
          }
        }
        //ghosties can disappear
        if ((score % 100 === 50)   //50,150,250,350,#50...
                  && world[ghosty.y][ghosty.x] === 2){  
            world[ghosty.y][ghosty.x] = 4; 
        }
        if ((score % 100 === 0 && score % 3 !== 0) 
                  && (world[ghosty.y][ghosty.x] === 3)){  
            world[ghosty.y][ghosty.x] = 4; 
        }
        displayWorld();
      }


      /***************************** Starts *****************************/
      displayWorld();
      displayPacman();
      displayLegend();

      document.onkeydown = (e) => {
        pacmanTravels(e);
        pacmanScores();
        cherryAppears(e);
        ghostyAppears(e);
      };
    // </script>