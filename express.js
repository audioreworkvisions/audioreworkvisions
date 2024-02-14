const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Stellt sicher, dass dieses Verzeichnis existiert
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).send('Keine Dateien wurden hochgeladen.');
  }
  res.send('Datei wurde hochgeladen.');
});

app.listen(3000, function () {
  console.log('Server hört auf Port 3000!');
});
