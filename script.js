// incoming data

let data = {
    "playlist_name":"My Playlist",
    "author":"author_Name",
    "playlist":{
        "1": {"songName":"I Love you like Mouse love rice",
        "artistname":"artist",
        "fileName":"song_1.mp3"
        },
    "2": {"songName":"Super Idol",
        "artistname":"artist",
        "fileName":"song_2.mp3"
        },
    "3": {"songName":"Ichiban no takaramono",
        "artistname":"artist",
        "fileName":"song_3.mp3"
        }
    }
}


let queue = Object.values(data.playlist)
console.log(queue)
let curr_Index = 0

// Query Selectors
let pauseButton = document.getElementById("pause") || null
let playButton = document.getElementById("play") || null

let skipNext = document.getElementById("skipNext") || null
let skipPrev = document.getElementById("skipPrev") || null

let song = document.getElementById("song_Id") || null
let curr_Song = document.getElementById("curr_Song") || null
let song_name = document.getElementById("song_name") || null
let artistName = document.getElementById("artist_name") || null

let progressBar = document.querySelector(".progressBar") || null
let currentTime = document.querySelector(".currTime") || null
let totalTime = document.querySelector(".totalTime") || null
let topHalf = document.querySelector(".top_half") || null
let playlist = document.querySelector(".playlist") || null

song_name.textContent = queue[curr_Index].songName
artistName.textContent = queue[curr_Index].artistname


// Event Listeners
pauseButton.addEventListener("click", handlePause)
playButton.addEventListener("click", handlePlay)

skipNext.addEventListener("click", handleNext)
skipPrev.addEventListener("click", handlePrev)

song.addEventListener("canplaythrough", songDurReq)
song.addEventListener("ended", handleNext)

progressBar.addEventListener("click", handleSeek)

// event handlers
function handlePause(e) {
    e.preventDefault()
    console.log("pause")
    if (playButton !== null) {
        console.log("play exist")
        pauseButton.setAttribute("style","display:none;")
        playButton.removeAttribute("style")

        song.volume = 0;
        song.pause();
        progressBar.style.setProperty("--progressBarPlay", "paused")
        // progressBar.style.setProperty("--progressBartime", `${song.duration}s`)

    }
}


function handlePlay(e) {
    e.preventDefault()
    console.log("play")
    if (pauseButton !== null) {
        console.log("pause exist")
        playButton.setAttribute("style","display:none;")
        pauseButton.removeAttribute("style")

        song.volume = 0.5;
        song.play();
        // console.log("need to reset animations: ", song.duration)
        progressBar.style.setProperty("--progressBarPlay", "running")
        // progressBar.style.setProperty("--progressBartime", `${song.duration}s`)
    }
}

function handleNext(e) {
    e.preventDefault()
    console.log("skip next")
    progressBar.style.setProperty("--progressDelay", "0s")
    curr_Index+=1
    curr_Index = curr_Index % (queue.length)
    song_name.textContent = queue[curr_Index].songName
    song.setAttribute("src", queue[curr_Index].fileName)
    console.log(curr_Index, queue[curr_Index].fileName)
    handlePlay(e)
}

function handlePrev(e) {
    e.preventDefault()
    console.log("skip Prev")
    progressBar.style.setProperty("--progressDelay", "0s")
    curr_Index-=1
    curr_Index = ((curr_Index%queue.length) + queue.length) % queue.length
    curr_Index = curr_Index % (queue.length)
    song_name.textContent = queue[curr_Index].songName
    song.setAttribute("src", queue[curr_Index].fileName)
    console.log(curr_Index, queue[curr_Index].fileName)
    handlePlay(e)
}

function handleSeek(e){
    let p = e.offsetX / progressBar.offsetWidth

    let seekTime = song.duration * p
    seekTime = Math.round(seekTime)

    song.currentTime = seekTime
    progressBar.style.setProperty("--progressDelay", `-${seekTime}s`)
}

function songDurReq(){
    console.log("song duration:", song.duration)
    console.log("current time:", song.currentTime)
    progressBar.style.setProperty("--progress-Bar", "none")
    setTimeout(() => {
        progressBar.style.setProperty("--progress-Bar", "")
    },100) 
    progressBar.style.setProperty("--progressBartime", `${song.duration}s`)
    totalTime.textContent = convertSeconds(Math.round(song.duration))
    setInterval 
    currentTime.textContent = convertSeconds(Math.round(song.currentTime))
}






//creates timer
(function createTimer(){
    setInterval(() => {
        currentTime.textContent = convertSeconds(Math.round(song.currentTime))
    },500)
})()

//timing conversion
function convertSeconds(songDuration, data =  {'result':''}) {
    let left;
    let right;

    left = Math.floor(songDuration / 60);
    right = songDuration % 60;

    (right < 9) ? data.result += `:0${right}` : data.result +=  `:${right}`
    if (left >= 60) {
        convertSeconds(left, data);
    } else {
        data.result += `:${left}`
        data.result = data.result.slice(1,data.result.length)
    }
    data.result = data.result.split(':').reverse().join(':')
    return(data.result)

}


let something = convertSeconds(3721)
console.log(something)