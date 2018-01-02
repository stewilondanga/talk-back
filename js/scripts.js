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



var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
