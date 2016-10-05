var synaptic = require('synaptic');
var avikData = require('./avik').data;
var sahasData = require('./sahas').data;
var Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer;

var inputLayer = new Layer(7);
var hiddenLayer = new Layer(32);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var network = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});
var trainer = new Trainer(network);
var trainingData = [];

avikData.forEach(function(dataPoint) {
	trainingData.push({ input: dataPoint, output: [1] });
});

sahasData.forEach(function(dataPoint) {
	trainingData.push({ input: dataPoint, output: [0] });
});

trainer.train(trainingData, {
	rate: .00005,
	shuffle: true,
	log: 1000
});

var avikTestData = require('./avikTest').data;
var sahasTestData = require('./sahasTest').data;
var cutoff = 0.95;
var falseRejections = 0;
var falseAcceptances = 0;
avikTestData.forEach(function(input) {
	var output = network.activate(input);
	if(output < cutoff) {
		falseRejections++;
	}
});
sahasTestData.forEach(function(input) {
	var output = network.activate(input);
	if(output >= cutoff) {
		falseAcceptances++;
	}
});

console.log(`
False Acceptance Rate: ${falseAcceptances/sahasTestData.length}
False Rejection Rate: ${falseRejections/avikTestData.length}
`)