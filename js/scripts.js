// Handle browser prefixes
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

// Setup test data
var fills = [
    'rgba(255, 255, 255, 1)',
    'rgba(254, 119, 132, 1)',
    'rgba(60, 128, 219, 1)',
    'rgba(127, 254, 146, 1)'
];

// Declare function vars
var init, drawWaves, getMicrophoneInput, processAudio, processSpeech;

// Declare canvas related vars
var canvas, canvasContext;

// Declare audio related vars
var audioContext, audioProcessor;

// Declate speech related vars
var recognition, finalTranscript, interimTranscript, response, synth, utterResponse;

// Draw the waves
//
// I have no idea what the waves represent in the real Siri,
//  and I can't seem to find an explanation.
//  These waves are created "pseudo randomly" and enlarged
//  based on the volume of your speach.
drawWaves = function() {
    var calculateX, calculateY, draw, generateRandomData;

    generateRandomData = function() {
        return [
            [1, 5, 10, 5, 1],
            [0, 0, Math.floor(Math.random() * 101), 0, Math.floor(Math.random() * 101), 0, Math.floor(Math.random() * 101), 0, Math.floor(Math.random() * 101), 0, 0],
            [0, 0, Math.floor(Math.random() * 101), 0, Math.floor(Math.random() * 101), 0, Math.floor(Math.random() * 101), 0, 0],
            [0, 0, Math.floor(Math.random() * 101), 0, Math.floor(Math.random() * 101), 0, 0]
        ];
    };

    calculateX = function(i, length) {
        return ((canvas.width / length) * (i + 0.5))
    };

    calculateY = function(data, reverse) {
        if (!reverse) {
            return (canvas.height / 2) - ((canvas.height / 2) / (100 / (data * (audioProcessor.volume * 3))));
        } else {
            return (canvas.height / 2) + ((canvas.height / 2) / (100 / (data * (audioProcessor.volume * 3))));
        }
    };

    draw = function(data, reverse) {
        var i = 0;
        for (; i < data.length; i++) {
            var x = calculateX(i, data.length),
                y = calculateY(data[i], reverse);

            if (i < (data.length - 1)) {
                var x2 = (calculateX(i, data.length) + calculateX(i + 1, data.length)) / 2,
                    y2 = (calculateY(data[i], reverse) + calculateY(data[i + 1], reverse)) / 2;

                canvasContext.quadraticCurveTo(x, y, x2, y2);
            }
        }

        canvasContext.lineTo(canvas.width, (canvas.height / 2));

				canvasContext.lineTo(0, (canvas.height / 2));
    };

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    var i = 0;
    var data = generateRandomData();
    for (; i < data.length; i++) {
        canvasContext.fillStyle = fills[i];
        canvasContext.beginPath();

        draw(data[i]);
        draw(data[i], true);

        canvasContext.fill();
    }

    window.setTimeout(drawWaves, 100);
    // window.requestAnimationFrame(drawWaves);
};

// Request access to the micropone
getMicrophoneInput = function() {
    navigator.getUserMedia({
        audio: true
    }, function(stream) {
        processAudio(stream);
        drawWaves();
    }, function(e) {
        console.error('Oops, something went wrong while accessing your microphone: %s', e);
    });
};

// Process the audio we get from the microphone
processAudio = function(stream) {
    var processVolume = function(e) {
        var buffer = e.inputBuffer.getChannelData(0),
            bufferLength = buffer.length,
            total = 0,
            volume = 0,
            i = 0,
            rms;

        for (; i < bufferLength; i++) {
            var currentSample = buffer[i];
                total += currentSample * currentSample;
        }

        rms = Math.sqrt(total / bufferLength);

        this.volume = volume = Math.max(rms, volume);
    };

    audioContext = new window.AudioContext();
    audioSource = audioContext.createMediaStreamSource(stream);
    audioProcessor = audioContext.createScriptProcessor(256);

    audioSource.connect(audioProcessor);
    audioProcessor.connect(audioContext.destination);

    audioProcessor.onaudioprocess = processVolume;
};

// Process the user's voice
processSpeech = function() {
    if (!('webkitSpeechRecognition' in window)) {
        console.error('Oops, it looks like your browser doesn\t support the web-speech-api :(');
    } else {
        var speechStart, speechResult, speechAudioStart, processInput;

        processInput = function(sentence) {
            sentence = sentence.toLowerCase();
            if (sentence.indexOf('my name is') >= 0) {
                response = 'Hi ' + _.capitalize(sentence.substr(sentence.indexOf('is'), sentence.length).split(' ')[1]) + ', nice to meet you!';
            } else if (sentence.indexOf('are you on twitter') >= 0) {
                response = 'Of course I am, you can find me with the handle @sambego.';
            } else if (sentence.indexOf('where are you from') >= 0) {
                response = 'I\'m from the small country of Belgium.';
            } else if ((sentence.indexOf('beatbox') >= 0) || sentence.indexOf('beat box') >= 0) {
                response = 'Here is one I\'ve been practicing bootsandcatsandbootsandcatsandbootsandcatsandbootsandcats, I can do this al day catsandbootsandcatsandbootsandcatsandbootsandcatsandbootsandcatsandbootsandcatsandbootsandcatsandbootsandcatsandboots';
            } else {
                response = 'I\'m not sure what you mean with this.';
            }

            if (response.indexOf('catsandboots')) {
                document.querySelector('.text--siri').innerHTML = response.substring(0, response.indexOf('boots'));
								

var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
