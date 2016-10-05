# Keystroke Biometric Authentication - Proof of Concept

Proof of concept of keystroke biometric authentication using neural networks in JavaScript.

## Data

Each data point consists of the time in milliseconds between each keypress when a user types the string "avikjain".

### Collection

The code used for data collection can be found in the `data-collection/` directory.

A simple web page with a text input field is served to the user. When the user enters the text "avikjain" and hits enter, an array holding values representing the time between keypresses is sent to the server and stored in a specified JSON file. Each data point is represented as an array of integer values.

Currently training and testing data has been collected for 2 users.

## Analysis

A simple feed-forward neural network was trained to classify whether or not the text was typed by the first user based on the biometric data.

The input layer consists of 7 neurons, each representing the time between 2 successive keypresses.

The output layer consists of a single neuron; a value of 1 represents acceptance while a value of 0 represents rejection.

### Results

The Equal Error Rate of this model was found to be ~0.10; this means that when the threshold for acceptance is set so that the number of false acceptances is equal to the number of false rejections, the network makes a correct prediction 90% of the time.
