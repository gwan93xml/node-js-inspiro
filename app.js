const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    }
    ,
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now()+file.originalname);
    }
})

const upload = multer({ storage: storage }).single('file');
app.post('/', (req, res) => {
    console.log(req.body);
    upload(req, res, function (err) {
        if (err) {
            return res.json({
                success : false,
                message : "Error uploading file"
            });
        }
    });
    return res.json({
        success : true,
        message : 'OK',
    });
})
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})