/**
 * Creates an verification email and format it to an html readable text
 *
 * @param html - html to update
 * @param data - data to map to the html
 *
 */
function createVerifyLink(html, data) {
    html = html.replace( /%linkVerify%/g, data);
    return html;
}

 function writeEmailFromJsonData(html, data) {
     html = createVerifyLink(html, data); 
     return html;
 }

 var createEmail = function(html, data) {
     var result = writeEmailFromJsonData(html, data);
     return result
 }

 module.exports = createEmail;