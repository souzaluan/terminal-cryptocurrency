const Table = require("./table");

const path = process.argv;

const requisitionInterval = Number(path[2]);

const table = new Table();

if (requisitionInterval < 15 || !requisitionInterval) {
  table.execute(15);
} else {
  table.execute(requisitionInterval);
}
