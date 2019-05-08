
export function download(url) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  function iframeLoad() {
    const win = iframe.contentWindow;
    const doc = win.document;
    if (win.location.href === url) {
      if (doc.body.childNodes.length > 0) {
        // response is error
      }
      iframe.parentNode.removeChild(iframe);
    }
  }
  if ('onload' in iframe) {
    iframe.onload = iframeLoad;
  } else if (iframe.attachEvent) {
    iframe.attachEvent('onload', iframeLoad);
  } else {
    iframe.onreadystatechange = function onreadystatechange() {
      if (iframe.readyState === 'complete') {
        iframeLoad;
      }
    };
  }
  iframe.src = '';
  document.body.appendChild(iframe);

  setTimeout(function loadUrl() { 
    iframe.contentWindow.location.href = url;
  }, 50);
}