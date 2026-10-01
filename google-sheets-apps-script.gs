/**
 * Deploy this file as a Google Apps Script Web App from the destination Sheet.
 * Set access to "Anyone", then paste the deployment URL into
 * GOOGLE_SHEETS_WEB_APP_URL in script.js.
 */
function doPost(event) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Applications')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Applications');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted at', 'Student name', 'Parent / guardian mobile', 'Email', 'Preferred stream', 'Current school / town', 'Message']);
    sheet.setFrozenRows(1);
  }

  const data = JSON.parse(event.postData.contents);
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.studentName || '',
    data.phone || '',
    data.email || '',
    data.stream || '',
    data.school || '',
    data.message || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
