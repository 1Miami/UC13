const express = require("express")
const app = express()
const path = require('path');
const port = 3000

/*app.get('/', (req, res) =>{
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/

app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };
 
    const fileName = 'teste.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});
 
app.listen(port, function (err) {
    if (err) console.error(err);
    console.log("Server listening on PORT", port);
});