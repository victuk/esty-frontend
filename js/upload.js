// Hide elements with class "delete_file"
document.querySelectorAll('.delete_file').forEach(function(elem) {
    elem.style.display = 'none';
  });
  
  // Add event listener to element with id "upload_costum"
  document.getElementById('upload_costum').addEventListener('change', function(event) {
    // Create URL for the first file selected
    let tmppath = URL.createObjectURL(event.target.files[0]);
  
    // Fade in the image element and set the source to the created URL
    document.querySelector('.image > img').style.display = 'none';
    document.querySelector('.image > img').setAttribute('src', tmppath);
    document.querySelector('.image > img').style.display = 'block';
    let isource = document.querySelector('#upload_costum').value;
    console.log(isource);
  
    // Show elements with class "delete_file" and hide elements with class "choose_file"
    document.querySelectorAll('.delete_file').forEach(function(elem) {
      elem.style.display = 'block';
    });
    document.querySelectorAll('.choose_file').forEach(function(elem) {
      elem.style.display = 'none';
      document.querySelector(".drag_text").innerHTML = '';
      document.querySelector('.upload_label > i').style.display = 'none';

        let source = document.querySelector('#source');
        source.style.display = 'block';
        source.innerHTML = isource;
        console.log('Helo');

    });
  
    // Add click event listener to elements with class "delete_file"
    document.querySelectorAll('.delete_file').forEach(function(elem) {
      elem.addEventListener('click', function() {
        // Fade in the image element and remove the source attribute
        document.querySelector('.image > img').style.display = 'none';
        document.querySelector('.image > img').removeAttribute('src');
        document.querySelector('.image > img').style.display = 'block';
  
        // Hide elements with class "delete_file"
        document.querySelectorAll('.delete_file').forEach(function(elem) {
          elem.style.display = 'none';
        });
      });
    });
  });
  



const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Uploading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        downloadBtn.innerText = "Upload File";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    }).catch(() => {
        alert("Failed to download file!");
        downloadBtn.innerText = "Upload File";
    });
}