const { log, io } = require("lastejobb");
const path = require("path");
var xlsx = require("node-xlsx");

const inputFiles = io.findFiles("data", ".xlsx");
for (let inputFile of inputFiles) convertToJson(inputFile);

function convertToJson(fn) {
  log.info("Reading " + fn + "...");
  const sheet = getArtslisteSheet(fn);
  log.info("Processing sheet " + sheet.name);
  var r = [];
  const rows = sheet["data"];
  const header = rows[1];
  for (var j = 2; j < rows.length; j++) {
    const e = {};
    const row = rows[j];
    for (let col = 0; col < header.length; col++)
      e[header[col] || "Col" + col] = row[col];

    r.push(e);
  }
  log.info("Imported " + r.length + " rows.");
  io.skrivDatafil(path.parse(fn).name, r);
}

function getArtslisteSheet(fn) {
  var sheets = xlsx.parse(fn);
  for (var i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    log.info("Sheet: " + sheet.name);
    if (sheet.name === "Artslister") return sheet;
    if (sheet.name === "ArtsdataGlatta") return sheet;
  }
  throw new Error("Finner ikke ark artsliste i " + fn);
}
