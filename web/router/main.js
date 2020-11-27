//import loadML from "./load.js";

/*
connection.query('SELECT * FROM plants_newlist WHERE idx=' + arr[0], (error, rows) => {
    if (error) throw error;
    console.log('Plant list\n', rows);

    return rows;
});
 */

module.exports = function(app, fs)
{
    app.get('/', function(req, res){
        res.render('home', {
        });
    });

    app.get('/load', function(req, res){
        res.render('load', {
        });
        //loadML();
    });

    app.get('/result', function(req, res){
        res.render('result', {
            slide_len: 7,
            result_len: 10,
            progress: 50
        });
    });
}
