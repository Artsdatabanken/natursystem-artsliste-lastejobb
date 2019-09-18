const { log, io } = require("lastejobb");
const path = require("path");
var XLSX = require("js-xlsx");

let inputFiles = io.findFiles("data/natursystem-artsliste-ubehandlet", ".xlsx");
inputFiles = inputFiles.reverse();

for (let inputFile of inputFiles) convertToJson(inputFile);

function convertToJson(fn) {
  log.info("Reading " + fn + "...");
  const sheet = getArtslisteSheet(fn);
  log.info("Behandler artslisten...");
  const rows = XLSX.utils.sheet_to_row_object_array(sheet, { header: 1 });
  const { header, headerRowCount } = readHeader(rows);
  var r = [];
  for (let j = headerRowCount; j < rows.length; j++) {
    const e = {};
    const row = rows[j];
    for (let col = 0; col < header.length; col++)
      e[header[col] || "Col" + col] = row[col];

    r.push(e);
  }
  io.skrivDatafil(path.parse(fn).name, r);
}

function readHeader(rows) {
  let header = [];
  let j = 0;
  for (; j < 20; j++) {
    const row = rows[j];
    for (let k = 0; k < row.length; k++) {
      if (!row[k]) continue;
      if (header[k]) header[k] += "_";
      header[k] = (header[k] || "") + row[k];
    }
    if (row.join(",").indexOf("Autor") >= 0)
      return { header, headerRowCount: j + 1 };
  }
  throw new Error("Fant ikke overskriftsrad.");
}

function getArtslisteSheet(fn) {
  var workbook = XLSX.readFile(fn);
  var sheets = workbook.Sheets;
  if (sheets.Artsdata) return sheets.Artsdata;
  if (sheets.ArtsData) return sheets.ArtsData;
  if (sheets.Artslister) return sheets.Artslister;
  if (sheets.ArtsdataGlatta) return sheets.ArtsdataGlatta;
  throw new Error("Finner ikke ark med artsliste i " + fn);
}
