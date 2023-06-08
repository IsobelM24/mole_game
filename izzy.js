/* 1. describe 10 moles
        a. status hungry,fed,sad,leaving or gone
        b. next_update (Date.now () + 1000)
        c. is_king (True or false)
        d. node (document.getElementbyID())

    2. make moles appear and disapear
        a. request animation frame 
        b. for each frame:
            for each mole:
                check if mole next update time is passed:
                    change mood
                else do nothing 

    3. update mood 
        a. check mole mood 
            if sad or fed change to leaving 
            else if leaving change to gone 
            else if gone change to hungry
            else if hungry change to sad 
            
    4. feed moles 
        a. when user clicks 
            if clicked on a mole and mole.mood is hungry, mole.mood = fed
            change score + 10 
            if score = 100 or more display win screen
            
    5. 

*/

let score = 0;
const wormContainer = document.querySelector(".worm-container");

const moles = [ {
    king_mole: false,
    next_update: Date.now() + 1000,
    hole: document.getElementById('hole-0'),
    mood: "sad", 
},

{ king_mole: false,
next_update: Date.now() + 1000,
hole: document.getElementById('hole-1'),
mood: "sad", 
},

{ king_mole: false,
    next_update: Date.now() + 1000,
    hole: document.getElementById('hole-2'),
    mood: "sad", 
},

{ king_mole: false,
    next_update: Date.now() + 1000,
    hole: document.getElementById('hole-3'),
    mood: "sad", 
},

{ king_mole: false,
    next_update: Date.now() + 1000,
    hole: document.getElementById('hole-4'),
    mood: "sad", 
    },

{ king_mole: false,
        next_update: Date.now() + 1000,
        hole: document.getElementById('hole-5'),
        mood: "sad", 
    },

{ king_mole: false,
        next_update: Date.now() + 1000,
        hole: document.getElementById('hole-6'),
        mood: "sad", 
    },

{ king_mole: false,
    next_update: Date.now() + 1000,
    hole: document.getElementById('hole-7'),
    mood: "sad", 
    },

{ king_mole: false,
        next_update: Date.now() + 1000,
        hole: document.getElementById('hole-8'),
        mood: "sad", 
    },

{ king_mole: false,
    next_update: Date.now() + 1000,
    hole: document.getElementById('hole-9'),
    mood: "sad", 
    }

];

function changeMood(mole) {
    if (mole.mood == "sad" || mole.mood == "fed") {
    mole.mood = "leaving";
    if (mole.king_mole === true) {
        mole.hole.children[0].src = "static/mole-game/king-mole-leaving.png"
    }

    else {
        mole.hole.children[0].src = "static/mole-game/mole-leaving.png"; 
        }
    mole.next_update = Date.now() + Math.floor(Math.random() * 2000 + 500);
    
    }

    else if (mole.mood == "leaving") {
    mole.mood = "gone";
    mole.hole.children[0].classList.add("gone");
    mole.next_update = Date.now() + Math.floor(Math.random() * 2000 + 500);
    }
    else if (mole.mood == "gone"){
    mole.mood = "hungry";
    if (mole.king_mole === true) {
        mole.hole.children[0].src = "static/mole-game/king-mole-hungry.png"
    }

    else {
        mole.hole.children[0].src = "static/mole-game/mole-hungry.png"
        }

    mole.next_update = Date.now() + Math.floor(Math.random() * 5000 + 500);
    mole.hole.children[0].classList.remove('gone');
    }   

    else if (mole.mood == "hungry") {
    mole.mood = "sad";
    if (mole.king_mole === true) {
            mole.hole.children[0].src = "static/mole-game/king-mole-sad.png"
        }

    else {
        mole.king_mole = Math.random() > 0.8
        mole.hole.children[0].src = "static/mole-game/mole-sad.png"
        }

    mole.next_update = Date.now() + Math.floor(Math.random() * 3000 + 500);
    }
}

function feed(mole) {
    if (mole.mood === 'hungry') {
        mole.mood = 'fed'; 

        if (mole.king_mole === true) {
            score += 20;
        }

        else {
            score += 10;
        }
    }

    else if (mole.mood === 'sad' || mole.mood === 'leaving') {
        score -= 10;
    }

    if (score <= 0) {
        reset()
    }

    wormContainer.style.width = `${score}%`;

    if (score >= 100 ){
        win()
    }
}

for (let i = 0; i < moles.length; i++) {
    moles[i].hole.addEventListener('click', function(event) {
        feed(moles[i])
    })

}

function win() {
    console.log('win')
    document.querySelector(".bg").classList.add("hide")
    document.querySelector(".win").classList.remove("hide")
}

function reset() {
    document.querySelector(".bg").classList.remove("hide")
    document.querySelector(".win").classList.add("hide")
    score = 0;
    wormContainer.style.width = `${score}%`;
}

document.querySelector(".win").addEventListener("click", function(event) {
    reset();
})

function nextFrame () {
  for (let i = 0; i < moles.length; i ++) {
    if (moles[i].next_update <= Date.now() ) {
        changeMood(moles[i]);
    }
  }
requestAnimationFrame(nextFrame)
}

requestAnimationFrame(nextFrame);

