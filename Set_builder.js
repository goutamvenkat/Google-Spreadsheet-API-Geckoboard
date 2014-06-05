/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  var url = "https://docs.google.com/a/synapp.io/spreadsheet/ccc?key=0AtHxIyKE-MUhdERrRGF6VDQzLW1ac2oteTZOZUM3Ync&usp=drive_web#gid=2";
  var sheet1 = SpreadsheetApp.openByUrl(url);
  var sheet8 = (sheet1.getSheets()[1]);
  var sheet = sheet1.getSheets()[0];
  sheet8.clear();
  
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var set = {};
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var nums = [];
  nums = fillArray(nums, 10, 0);
  var count = 0;
  for (var i = 0; i < numRows; i++) {
    for (var j = 1; j < rows.getNumColumns(); j++) {
      if (!set[values[i][j]] && typeof(values[i][j]) === 'string') {
        if (values[i][j].indexOf(' ') == -1) {
          set[values[i][j]] = array[count++];
        }
      }
      else if (typeof(values[i][j]) === 'number'){
        nums[set[values[i][j - 1]]] += values[i][j]; 
      }
    }
  }
  for (var key in set) {
    sheet8.appendRow([key, nums[set[key]]]);
  }

  Logger.log(nums);
  Logger.log(set);
  
};

function fillArray(arr, length, value) {
  var a = arr;
  for (var i = 0; i < length; i++) {
    a[i] = value;
  }
  return a;
}

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Read Data",
    functionName : "readRows"
  }];
  spreadsheet.addMenu("Script Center Menu", entries);
};
