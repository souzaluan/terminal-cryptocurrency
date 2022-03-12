const Table = require("./table");

const path = process.argv;

const dataInterval = Number(path[2]) || 15;

const table = new Table();

table.execute(dataInterval);
