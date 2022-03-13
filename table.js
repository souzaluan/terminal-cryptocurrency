const blessed = require("blessed");
const fetchData = require("./utils/fetchData");

class Table {
  constructor() {
    this.screen = blessed.screen();

    this.table = blessed.table({
      parent: this.screen,
      top: 0,
      left: "center",
      data: null,
      border: "line",
      align: "center",
      tags: true,
      width: "80%",
      style: {
        border: {
          fg: "#fff",
        },
        header: {
          fg: "#fff",
          bold: true,
        },
        cell: {
          fg: "green",
        },
      },
    });
  }

  async createPopulateTable() {
    const res = await fetchData();

    const data = [["Crypto", "Price"], ...res];

    this.table.setData(data);
    this.screen.render();
  }

  async execute(interval) {
    this.screen.title = `Crypto Data Realtime | ${interval}/${interval}`;

    this.screen.key(["escape", "q", "C-c"], () => {
      return process.exit(0);
    });

    this.screen.append(this.table);

    await this.createPopulateTable();

    setInterval(async () => {
      await this.createPopulateTable();
    }, interval * 1000);
  }
}

module.exports = Table;
