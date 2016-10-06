if(process.argv.length < 4) {
	console.log('Please specify 2 user names.');
	process.exit();
}
var userName = process.argv[2];
var intruderName = process.argv[3];

var synaptic = require('synaptic');
var userData = require(`../data/${userName}`).data;
var intruderData = require(`../data/${intruderName}`).data;
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

// use equal number of data points for both
if(userData.length > intruderData.length) {
	userData = userData.slice(0, intruderData.length);
} else if(intruderData.length > userData.length) {
	intruderData = intruderData.slice(0, userData.length);
}
userData.forEach(function(dataPoint) {
	trainingData.push({ input: dataPoint, output: [1] });
});

intruderData.forEach(function(dataPoint) {
	trainingData.push({ input: dataPoint, output: [0] });
});

trainer.train(trainingData, {
	rate: .00005,
	shuffle: true,
	log: 1000
});

var userTestData = require(`../data/${userName}Test`).data;
var intruderTestData = require(`../data/${intruderName}Test`).data;
var threshold = 0.5;
var falseRejections = 0;
var falseAcceptances = 0;
userTestData.forEach(function(input) {
	var output = network.activate(input);
	if(output < threshold) {
		falseRejections++;
	}
});
intruderTestData.forEach(function(input) {
	var output = network.activate(input);
	if(output >= threshold) {
		falseAcceptances++;
	}
});

console.log(`
False Acceptance Rate: ${falseAcceptances/intruderTestData.length}
False Rejection Rate: ${falseRejections/userTestData.length}
`)
