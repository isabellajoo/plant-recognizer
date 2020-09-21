module.exports = {
    HTML:function(title, image) {
        return `
        <!doctype html>
        <html>
        <head>
            <title>Plant Recognizer</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div>
                <img src="${image}" alt="error" width="300" height="250">
            </div>
            <h1>${title}</h1>
        </body>
        </html>
        `
    }
}