const Table = require("./table");

const path = process.argv;

const requisitionInterval = Number(path[2]);

if (requisitionInterval < 15 || !requisitionInterval) {
  new Table(15).execute();
} else {
  new Table(requisitionInterval).execute();
}
