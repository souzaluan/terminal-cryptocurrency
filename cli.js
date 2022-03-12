const Table = require("./table");

const path = process.argv;

const requisitionInterval = Number(path[2]) || 15;

const table = new Table();

table.execute(requisitionInterval);
