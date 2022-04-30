console.log('my script is loaded')


function myFunction() {
    var copyText = document.getElementById("myAnchor").title;
    document.addEventListener('copy', function(event) {
      event.clipboardData.setData('text/plain', copyText);
      event.preventDefault();
      document.removeEventListener('copy', handler, true);
    }, true);
    document.execCommand('copy');
    alert("Copied: " + copyText);
  }