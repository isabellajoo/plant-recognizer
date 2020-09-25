

window.onload = function() {
    var dropArea = document.getElementById('drop-area');

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ;['dragleave', 'drop'].forEach(eventName => {
       dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        //handleFiles(files)
    }

    /*
    let uploadProgress = []
    let progressBar = document.getElementById('progress-bar')

    function initializeProgress(numFiles) {
        progressBar.value = 0;
        uploadProgress = [];

        for(var i = numFiles; i > 0; i--) {
            uploadProgress.push(0);
        }
    }


    function updateProgress(fileNumber, percent) {
        uploadProgress[fileNumber] = percent;
        var total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
        console.debug('update', fileNumber, percent, total);
        progressBar.value = total;
    }

    function handleFiles(files) {
        files = [...files];
        initializeProgress(files, length);
        //files.forEach(uploadFile);
        files.forEach(previewFile);
    }

    function previewFile(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            var img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img);
        }
    }

    /*
    function uploadFile(file, i) {
        var url = '';
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.upload.addEventListener('progress', function(e) {
            updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
        })

        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                updateProgress(i, 100);
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                console.log('Error');
            }
        })

        formData.append('upload_preset', 'ujpu6gyk');
        formData.append('file', file);
        xhr.send(formData);
    }
    */

}