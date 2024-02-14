document.getElementById('file-upload-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var formData = new FormData(this);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert('Datei erfolgreich hochgeladen');
    } else {
      alert('Fehler beim Hochladen der Datei');
    }
  };
  xhr.send(formData);
});
