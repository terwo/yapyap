// import * as tf from '@tensorflow/tfjs';
// import path from 'path';
// import { fileURLToPath, pathToFileURL } from 'url';

// // Get the directory name of the current module
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // Function to convert a relative path to a file URL
// const relativeToURL = (relativePath) => {
//     const absolutePath = path.join(__dirname, relativePath);
//     return pathToFileURL(absolutePath).href;
// };

// // Use this function to create file URLs
// const wordIndexURL = relativeToURL('../word_index.json'); // Adjust the relative path
// const labelMapURL = relativeToURL('../label_map.json');   // Adjust the relative path


// // // Asynchronously import JSON files with an import assertion
// // const importJSON = async (fileURL) => {
// //     const module = await import(fileURL, { assert: { type: 'json' } });
// //     return module.default;
// // };

// // Load the JSON data
// let wordIndex;
// let labelMap;

// const loadJSONData = async () => {
//     wordIndex = await importJSON(wordIndexURL);
//     labelMap = await importJSON(labelMapURL);
// };

// // Ensure to call this function to load JSON data before using them
// await loadJSONData();

// // Function to tokenize text
// const tokenize = (text) => {
//     const words = text.toLowerCase().split(' ');
//     return words.map(word => wordIndex[word] || wordIndex['<OOV>']);
// };

// // Function to pad sequences
// const padSequence = (sequence, maxLength) => {
//     const padded = sequence.slice(0, maxLength);
//     while (padded.length < maxLength) {
//         padded.push(0);
//     }
//     return padded;
// };

// // Function to load the model
// let model;
// const loadModel = async () => {
//     if (!model) {
//         model = await tf.loadLayersModel('../echo_model_js/model.json'); // Adjust the path as needed
//     }
//     return model;
// };


// // Function to predict the emotion of a given text
// export const predictEmotion = async (text) => {
//     const loadedModel = await loadModel();
//     const tokenized = tokenize(text);
//     const padded = padSequence(tokenized, 50); // Adjust '50' to your model's input size
//     const prediction = loadedModel.predict(tf.tensor2d([padded]));
//     const predictedIndex = prediction.argMax(1).dataSync()[0];
//     print (labelMap[predictedIndex]);
//     return labelMap[predictedIndex];
// };


// // # Step 1: Convert Tokenizer and Label Encoder to a JavaScript - Readable Format
// // import joblib
// // import json

// // # Load your tokenizer and label encoder
// // tokenizer = joblib.load('../echo_tokenizer.joblib')
// // label_encoder = joblib.load('../echo_encoder.joblib')

// // # Convert tokenizer's word index to JSON
// // word_index = tokenizer.word_index
// // with open('word_index.json', 'w') as file:
// // json.dump(word_index, file)

// // # Convert label encoder's classes to JSON
// // label_map = { index: label for index, label in enumerate(label_encoder.classes_) }
// // with open('label_map.json', 'w') as file:
// // json.dump(label_map, file)

// // # Step 2: Implement Text Preprocessing in JavaScript
// // import wordIndex from '../word_index.json';
// // import labelMap from '../label_map.json';

// // const tokenize = (text) => {
// //     const words = text.toLowerCase().split(' ');
// //     return words.map(word => wordIndex[word] || wordIndex['<OOV>']);
// // };

// // const padSequence = (sequence, maxLength) => {
// //     const padded = sequence.slice(0, maxLength);
// //     while (padded.length < maxLength) {
// //         padded.push(0);
// //     }
// //     return padded;
// // };
 
// // // Step 3: Predict Function

// // import * as tf from '@tensorflow/tfjs';

// // let model

// // const loadModel = async () => {
// //     const model = await tf.loadLayersModel('../echo_model_js/model.json');
// //     return model;
// // };

// // const predictEmotion = async (text) => {
// //     const model = await loadModel();
// //     const tokenized = tokenize(text);
// //     const padded = padSequence(tokenized, 50); // Adjust '50' to your model's input size
// //     const prediction = model.predict(tf.tensor2d([padded]));
// //     const predictedIndex = prediction.argMax(1).dataSync()[0];
// //     return labelMap[predictedIndex];
// // };
