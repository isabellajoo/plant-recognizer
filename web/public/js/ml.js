//import {PLANT_LIST} from './plantlist.js';

const IMAGE_SIZE = 300;
const TOPK_PREDICTIONS = 11;

/* model execute */
module.exports = async function demo(image){
    /* model loading */
    const model = await tf.loadLayersModel('https://storage.googleapis.com/plant-recognizer/model_70/model_2.json');
    console.log('Successfully loaded model')

    var index = [];
    /* model prediction with set image size */
    if (image.complete && image.naturalHeight !== 0) {
        index = await predict(model, image);
    } else {
        index = predict(model, image);
        /*
        image.onload = () => {
            index = predict(model, image);
        }
         */
    }

    localStorage.setItem("key", JSON.stringify(index));
    //console.log('localStorage: ' + JSON.parse(localStorage.getItem("key")));

    //console.log(index);
    return index;
}

/* model predict and time calculating */
async function predict(model, imgElement) {
    const logits = tf.tidy(() => {
        const img = tf.browser.fromPixels(imgElement).toFloat();

        const offset = tf.scalar(255);
        const normalized = img.div(offset);
        
        const batched = tf.image.resizeBilinear(
            normalized,
            [IMAGE_SIZE, IMAGE_SIZE],
            false
          ).expandDims(0);
        console.log(batched.shape);
        
        return model.predict(batched);
    });

    //showResults(imgElement, classes);
    return await getTopKClasses(logits, TOPK_PREDICTIONS);
}

/* Find Top n classes */
async function getTopKClasses(logits, topK) {
    const values = await logits.data();

    const valuesAndIndices = [];
    for (let i = 0; i < values.length; i++) {
        valuesAndIndices.push({value: values[i], index: i + 1});
    }
    valuesAndIndices.sort((a, b) => {
        return b.value - a.value;
    });

    var sum = 0;
    const topClassesAndProbs = [];
    for (let i = 0; i < topK; i++) {
        if (i === 0 || sum < 1) {
            topClassesAndProbs.push({
                classIndex: valuesAndIndices[i].index,
                probability: valuesAndIndices[i].value
            });
            sum += valuesAndIndices[i].value;

            console.log(sum);
        }
    }

    /*
    for (let i = 0; i < topkIndices.length; i++) {
        topClassesAndProbs.push({
            className: topkIndices[i],
            probability: topkValues[i]
        })
    */

    return topClassesAndProbs;
}

/*
/* insert result to each div
function showResults(imgElement, classes) {
    const predictionContainer = document.createElement('div');
    predictionContainer.className = 'pred-container';

    const imgContainer = document.createElement('div');
    imgContainer.appendChild(imgElement);
    predictionContainer.appendChild(imgContainer);

    const probsContainer = document.createElement('div');
    for (let i = 0; i < classes.length; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        /*
        const classElement = document.createElement('div');
        classElement.className = 'cell';
        classElement.innerText = classes[i].className;
        row.appendChild(classElement);


        const probsElement = document.createElement('div');
        probsElement.className = 'cell';
        probsElement.innerText = classes[i];
        //probsElement.innerText = classes[i].probability.toFixed(3);
        row.appendChild(probsElement);

        probsContainer.appendChild(row);
    }
    predictionContainer.appendChild(probsContainer);

    predictionsElement.insertBefore(predictionContainer, predictionsElement.firstChild);
}
/*
const demoStatusElement = document.getElementById('status');
/* status message print
const status = msg => demoStatusElement.innerText = msg;
*/