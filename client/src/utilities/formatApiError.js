function showAlertFromErrorHtml(html) {
    // Create a DOM parser
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(html, 'text/html');
    // Extract the <pre> tag content
    const preElement = doc.querySelector('pre');
    const errorMessage = preElement ? preElement.textContent.split('\n')[0] : 'An error occurred';
  
    // Display the alert with the extracted message
    console.log("Nav"+errorMessage);
    
    const formatedError = errorMessage.substring(0,errorMessage.indexOf('at file'));
    alert(formatedError);
    return formatedError;

  }

export { showAlertFromErrorHtml };