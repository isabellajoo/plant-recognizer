//import * as tf from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs-node';

const model = await tf.loadGraphModel('file:///../model_v2/model.json');

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 10;

const demo = async () => {
    status('Loading model...');

    model.predict(tf.zeros([1, IMAGE_SIZE, TOPK_PREDICTIONS, 3])).dispose();

    status('');

    const image = document.getElementById('img-preview');
    if (image.complete && image.naturalHeight !== 0) {
        await predict(image);
    } else {
        image.onload = () => {
            predict(image);
        }
    }
};

async function predict(imgElement) {
    status('Predicting...');

    const startTime1 = performance.now();
    /*
    let startTime2;

    const logits = tf.tidy(() => {
        const img = tf.browser.fromPixels(imgElement).toFloat();

        const offset = tf.scalar(127.5);
        const normalized = img.sub(offset).div(offset);

        const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);

        startTime2 = performance.now();

        return model.predict(batched);
    });
     */


    const totalTime1 = performance.now() - startTime1;
    //const totalTime2 = performance.now() - startTime2;
    status(`Done in ${Math.floor(totalTime1)} ms`);

    showResults(imgElement);
}

function showResults(imgElement) {
    const predictionContainer = document.createElement('div');
    predictionContainer.className = 'pred-container';

    const imgContainer = document.createElement('div');
    imgContainer.appendChild(imgElement);
    predictionContainer.appendChild(imgContainer);

    predictionsElement.insertBefore(predictionContainer, predictionsElement.firstChild);
}

const demoStatusElement = document.getElementById('status');
const status = msg => demoStatusElement.innerText = msg;

const predictionsElement = document.getElementById('predictions');

demo();