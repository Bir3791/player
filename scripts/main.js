// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\змінні
const menuBtn = document.getElementById('menu'),
    playPauseBtn = document.getElementById('play_stop'),
    prewBtn = document.getElementById('prew'),
    nextBtn = document.getElementById('next'),
    imgMenu = document.getElementById('menu_img'),
    imgPrew = document.getElementById('prew_img'),
    imgNext = document.getElementById('next_img'),
    imgPLayStop = document.getElementById('play_img_pause'),
    display = document.querySelector('.display'),
    volumeBtn = document.querySelector('.volume'),
    playList = document.getElementById('playlist'),
    audio = document.querySelector('.audio'),
    playListCont = document.querySelector('.playlistCont')

let songTitle = document.querySelector('.song_title'),
    line = document.querySelector('.line'),
    progress = document.querySelector('.progress'),
    animation = document.querySelector('.animation_in'),
    animationBig = document.querySelector('.animation_big'),
    timerId

const songs = [{ artist: '4UBAND', song: 'Дышу', cover: 'image_1', idSong: '4UBAND-Дышу' },
    { artist: 'Jump_Leleky', song: 'ВАЩЕ!', cover: 'image_2', idSong: 'Jump_Leleky-ВАЩЕ!_(Бобры)_-_NEW' },
    { artist: 'Jump_Leleky', song: 'Прикосновение', cover: 'image_3', idSong: 'Jump_Leleky-Прикосновение' },
    { artist: 'Jump_Leleky', song: 'Пустыня', cover: 'image_4', idSong: 'Jump_Leleky-Пустыня_(zaufm)' },
    { artist: 'Nathan ', song: 'Evans-Wellerman', cover: 'image_5', idSong: 'Nathan Evans-Wellerman' },
]
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\змінні

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ вивід на дисплей, завантаження пісні
let songItem = 0
 
function LoadingSong(item) {
    songTitle.innerHTML = item.artist +' '+ item.song ;
    audio.src = "audio/"+item.idSong+".mp3";
    animation.src = "imeges/"+item.cover+".jpg";
}
LoadingSong(songs[songItem])
audio.volume = 0.7;
iconVolum()
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\вивід на дисплей, завантаження пісні

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\пауза плей
function play() {
    display.classList.add('.play')
    audio.play();
    clearTimeout(timerId);
}

function pause() {
    display.classList.remove('.play')
    audio.pause();
    timerId = setTimeout(() => {audio.currentTime = 0}, 60000)
}

function stop() {
    audio.currentTime = 0
}

playPauseBtn.addEventListener('click', () => {
    const isPlaying = display.classList.contains('.play');
    if (isPlaying) {
        pause()
    } else {
        play()
    }
});
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\пауза плей

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\прогресс бар
function realProgres(e) {
    const { duration, currentTime } = e.srcElement
    const progressPersent = (currentTime / duration) * 100
    progress.style.width = `${progressPersent}%`
}
audio.addEventListener('timeupdate', realProgres)
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\прогресс бар

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\перемотка
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

line.addEventListener('click', setProgress)
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\перемотка
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\автоплей

audio.addEventListener('ended' , nextSong)

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\автоплей

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\наступна пісня
nextBtn.addEventListener('click', nextSong);

function nextSong() {
    if (songItem < songs.length-1) {
        stop()
        songItem++
        LoadingSong(songs[songItem])
        play()
    } else {
        stop()
        songItem = 0;
        LoadingSong(songs[songItem])
        play()
    }    
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\наступна пісня

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\минула пісня
prewBtn.addEventListener('click', prewSong);

function prewSong() {
    if (songItem > 0) {
        pause()
        songItem--
        LoadingSong(songs[songItem])
        play()
    } else {
        pause()
        songItem = 4;
        LoadingSong(songs[songItem])
        play()
    }    
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\минула пісня

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\підсвітка кнопок
menuBtn.addEventListener('click', function () { btnFunc(imgMenu) });
playPauseBtn.addEventListener('click', function(){btnFunc(imgPLayStop)});
prewBtn.addEventListener('click', function(){btnFunc(imgPrew)});
nextBtn.addEventListener('click', function(){btnFunc(imgNext)});

function btnFunc(x) {
    x.style.zIndex = "2";
    setTimeout(() => x.style.zIndex = "0", 150);  
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\підсвітка кнопок

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\гучність
volumeBtn.addEventListener('dblclick', volumeBtnPlusFunctuon);
volumeBtn.addEventListener('click', volumeBtnMinus);

function volumeBtnMinus() {
    timerId = setTimeout( volumeBtnMinusFunc, 300);
}

function volumeBtnMinusFunc() {
    if (audio.volume > 0.1 ) {
        audio.volume = audio.volume - 0.1;
        iconVolum();
    } else {
        audio.volume = 0
        iconVolum();
    }
}

function volumeBtnPlusFunctuon() {
    clearTimeout(timerId);
    clearTimeout(timerId - 2);
    if (audio.volume < 1) {
        audio.volume = audio.volume + 0.1;
        iconVolum();
    } else {
        audio.volume = 1;
        iconVolum();
    }
}

function iconVolum() {
    if (audio.volume <= 1 && audio.volume > 0.8 ) {
        volumeBtn.src = "imeges/allVolume.png";
        console.log("audio.all");
    } else if (audio.volume <= 0.8 && audio.volume > 0.5) {
        volumeBtn.src = "imeges/mediumVolume.png";
        console.log("audio.medium");
    } else if (audio.volume <= 0.5 && audio.volume > 0.1) {
        volumeBtn.src = "imeges/smallVolume.png";
        console.log("audio.small");
    } else {;
        volumeBtn.src = "imeges/noneVolume.png";
    }
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\гучність

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\плейліст 
menuBtn.addEventListener('click', () => {
    const isShowing = playListCont.classList.contains('.play');
    if (isShowing) {
        OffDisplayPlayList()
    }
    else {
        onDisplayPlayList()
    }
});

function OffDisplayPlayList() {
    
    for (let i = 0; i < songs.length; i++) {
        let short = document.querySelector('.liForText');
        short.remove();
    }
    playListCont.classList.remove('.play')
}

function onDisplayPlayList() {
         for (let i = 0; i < songs.length; i++) {
            liForText = document.createElement('li'); 
            liForText.className = "liForText";
            liForText.innerHTML = `${songs[i].artist + "  " + songs[i].song}`
            playList.appendChild(liForText);
            liForText.addEventListener(`click`, playListPlay);
            liForText.addEventListener('mouseover', onOver);
            liForText.addEventListener('mouseout', onOut);
            }
         playListCont.classList.add('.play')
}

function onOut() {
    let value = event.target;
    value.classList.remove("liForText_mouseOver");
}

function onOver() {
    let value = event.target;
    value.classList.add('liForText_mouseOver');
}

function playListPlay() {
    let value = event.target;
    value.classList.add('liForText_mouseClik');
    setTimeout(() => { value.classList.remove('liForText_mouseClik') }, 100)
    for (let i = 0; i < songs.length; i++){
        if (value.textContent == songs[i].artist + "  " + songs[i].song) {
            playListPlayPlaying([i])
        }
     }
    }

function playListPlayPlaying(index) {
    stop();
    songItem = index
    LoadingSong(songs[songItem]);
    play()
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\плейліст