//import {PLANT_LIST} from './plantlist.js';

const predictionsElement = document.getElementById('predictions');
const done = document.getElementById('done');
const imgcropped = document.getElementById('img-cropped');

const IMAGE_SIZE = 300;
const TOPK_PREDICTIONS = 11;

/* model execute */
const demo = async (image) => {
    /* model loading */
    const model = await tf.loadLayersModel('https://storage.googleapis.com/plant-recognizer/model_70/model_2.json');
    console.log('Successfully loaded model')

    var index = [];
    /* model prediction with set image size */
    if (image.complete && image.naturalHeight !== 0) {
        index = await predict(model, image);
    } else {
        image.onload = () => {
            index = predict(model, image);
        }
    }

    return index;
};


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
export async function getTopKClasses(logits, topK) {
    const values = await logits.data();

    const valuesAndIndices = [];
    for (let i = 0; i < values.length; i++) {
        valuesAndIndices.push({value: values[i], index: i + 1});
    }
    valuesAndIndices.sort((a, b) => {
        return b.value - a.value;
    });

    var sum = 0;
    //const topkValues = [];
    const topkIndices = [];
    for (let i = 0; i < topK; i++) {
        if (i === 0 || sum < 0.5) {
            //topkValues[i] = valuesAndIndices[i].value;
            topkIndices[i] = valuesAndIndices[i].index;
            sum += valuesAndIndices[i].value;
            console.log(sum);
        }
    }

    /*
    const topClassesAndProbs = [];
    for (let i = 0; i < topkIndices.length; i++) {
        topClassesAndProbs.push({
            className: PLANT_LIST[topkIndices[i]],
            probability: topkValues[i]
        })
    }
    */

    return topkIndices;
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

/*
function cropImage() {
    var img = document.createElement("img");
    img.src =
    console.log(img.src);

    var canvas = document.createElement("canvas");
    canvas.getContext("2d").drawImage(img, 0, 0);

    var MAX_WIDTH = IMAGE_SIZE;
    var MAX_HEIGHT = IMAGE_SIZE;
    var width = imgpreview.width;
    var height = imgpreview.height;
    console.log('width:'+width+' height:'+height);

    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);
    console.log(canvas);


    var dataURL = img.src;
    var byteString = atob(dataURL.split(',')[1]);
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    imgcropped.src = new Blob([ab], {type: mimeString});
}
*/

done.addEventListener('click', (e) => {
    console.log('done...');

    var newSrc = cropper.getCroppedCanvas({
        maxWidth: 300,
        maxHeight: 300
    }).toDataURL();

    imgcropped.src = newSrc;
    window.localStorage.setItem("imgcropped", newSrc);

    var index = [];
    index = demo(imgcropped);

    exports.topkIndices = index;
})