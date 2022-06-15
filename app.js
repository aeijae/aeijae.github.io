const metronome = new Metronome();
let tempo = document.getElementById('tempo');
tempo.textContent = metronome.tempo;

const playPauseIcon = document.getElementById('play-pause-icon');
const playButton = document.getElementById('play-button');
const tapTempoButton = document.getElementById('tap-button');

const MaxTapCountsToConsider = 5;

let lastTaps = [];
let incrementSize = 10;

const setVisibleTempo = (newTempo) => {
    tempo.textContent = newTempo;
};

playButton.addEventListener('click', () => {
    metronome.startStop();
    playPauseIcon.className = metronome.isRunning ? 'pause' : 'play';
});

tapTempoButton.addEventListener('click', () => {
    const maxDiff = 5000;

    if (lastTaps.length === MaxTapCountsToConsider) {
        lastTaps.shift();
    }

    const previousTap = lastTaps[lastTaps.length - 1];
    const lastTap = new Date().getTime();

    if (lastTap - previousTap > maxDiff) {
        lastTaps = [lastTap];
        return;
    }

    lastTaps.push(lastTap);

    if (lastTaps.length < 3) {
        return;
    }

    let diffSum = 0;

    for (let i = 0; i < lastTaps.length - 1; i++) {
        diffSum += lastTaps[i + 1] - lastTaps[i];
    }

    const diffAverageMs = diffSum / (lastTaps.length - 1);

    setTempo(Math.round(60 / (diffAverageMs / 1000)));
});

const setTempo = (newTempo) => {
    metronome.tempo = newTempo;
    setVisibleTempo(metronome.tempo);
};

const handleShortcut = ({key}) => {
    if (document.activeElement.localName === 'input') return;

    lastTaps = [];
    switch (parseInt(key)) {
        case 1:
            setTempo(metronome.tempo - incrementSize);
            break;
        case 2:
            setTempo(metronome.tempo - 1);
            break;
        case 3:
            setTempo(metronome.tempo + 1);
            break;
        case 4:
            setTempo(metronome.tempo + incrementSize);
            break;
        default:
    }
}

document.addEventListener("keyup", handleShortcut);

Array.from(document.getElementsByClassName('tempo-change'))
    .forEach(b => b.addEventListener('click', function () {
        lastTaps = [];
        setTempo(metronome.tempo + parseInt(this.dataset.change));
    }));

Array.from(document.getElementsByClassName('tempo-increment'))
    .forEach(b => b.addEventListener('click', function () {
        lastTaps = [];
        setTempo(metronome.tempo + parseInt(this.textContent));
    }));

const getPositiveInteger = (handler) => (evt) => {
    const newValue = evt.target.value;
    const parsed = parseInt(newValue);

    if (isNaN(parsed) || parsed <= 0) return;

    handler(parsed);
};

const changeIncrement = (increment) => {
    incrementSize = increment;

    document.getElementById("drop").textContent = '-' + incrementSize;
    document.getElementById("add").textContent = '+' + incrementSize;
};

const changeBeatsPerBar = (beatsPerBar) => {
    metronome.beatsPerBar = beatsPerBar;
}

const changeSubdivision = (subdivision) => {
    metronome.subdivisionsPerBeat = subdivision;
}

document.getElementById("increment").addEventListener("keyup", getPositiveInteger(changeIncrement));
document.getElementById("subdivision").addEventListener("keyup", getPositiveInteger(changeSubdivision));
document.getElementById("time-signature").addEventListener("keyup", getPositiveInteger(changeBeatsPerBar));
