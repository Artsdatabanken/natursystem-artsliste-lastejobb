const { git } = require("lastejobb");

// Download artsliste i xlsx format
git.clone(
  "https://github.com/Artsdatabanken/natursystem-artsliste-ubehandlet.git",
  "data/"
);
