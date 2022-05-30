const metronome = new Metronome();
let tempo = document.getElementById('tempo');
tempo.textContent = metronome.tempo;

const playPauseIcon = document.getElementById('play-pause-icon');

const playButton = document.getElementById('play-button');

let incrementSize = 10;

const setVisibleTempo = (newTempo) => {
    tempo.textContent = newTempo;
};

playButton.addEventListener('click', function() {
    metronome.startStop();

    if (metronome.isRunning) {
        playPauseIcon.className = 'pause';
    }
    else {
        playPauseIcon.className = 'play';
    }

});

const changeTempo = ({ key }) => {
    switch (parseInt(key)) {
        case 1: metronome.tempo -= incrementSize;
            break;
        case 2: metronome.tempo -= 1;
            break;
        case 3: metronome.tempo += 1;
            break;
        case 4: metronome.tempo += incrementSize;
            break;
        default:
    }

    setVisibleTempo(metronome.tempo);
}

document.addEventListener("keyup", changeTempo);

const tempoChangeButtons = document.getElementsByClassName('tempo-change');

for (let i = 0; i < tempoChangeButtons.length; i++) {
    tempoChangeButtons[i].addEventListener('click', function() {
        metronome.tempo += parseInt(this.dataset.change);
        setVisibleTempo(metronome.tempo);
    });
}

const tempoStepButtons = document.getElementsByClassName('tempo-increment');

for (let i = 0; i < tempoStepButtons.length; i++) {
    tempoStepButtons[i].addEventListener('click', function() {
        metronome.tempo += parseInt(this.textContent);
        setVisibleTempo(metronome.tempo);
    });
}

const changeIncrement = () => {
  const newIncrement = document.getElementById("increment").value;
  const parsed = parseInt(newIncrement);

  if (parsed === NaN || parsed <= 0) return;

  incrementSize = newIncrement;

  document.getElementById("drop").textContent = '-' + incrementSize;
  document.getElementById("add").textContent = '+' + incrementSize;
};

const incrementSizeInput = document.getElementById("increment");

incrementSizeInput.addEventListener("keyup", changeIncrement);