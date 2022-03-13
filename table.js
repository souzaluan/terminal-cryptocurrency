const blessed = require("blessed");
const fetchData = require("./utils/fetchData");

class Table {
  constructor(interval) {
    this.interval = interval;

    this.screen = blessed.screen();

    this.table = blessed.table(this.createTable());
    this.intervalBox = blessed.box(this.createShowIntervalBox());
  }

  createTable() {
    return {
      parent: this.screen,
      top: 3,
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
    };
  }

  createShowIntervalBox() {
    return {
      parent: this.screen,
      top: "0",
      left: "center",
      width: "80%",
      height: 3,
      tags: true,
      valign: "middle",
      content: `{center}Interval defined: ${this.interval}s{/center}`,
      border: {
        type: "line",
      },
      style: {
        fg: "#fff",
        border: {
          fg: "#ffffff",
        },
      },
    };
  }

  async populateTable() {
    const res = await fetchData();

    const data = [["Crypto", "Price"], ...res];

    this.table.setData(data);
    this.screen.render();
  }

  async execute() {
    this.screen.title = `Crypto Data Realtime | ${this.interval}/${this.interval}`;

    this.screen.key(["escape", "q", "C-c"], () => {
      return process.exit(0);
    });

    this.screen.append(this.table);

    await this.populateTable();

    setInterval(async () => {
      await this.populateTable();
    }, this.interval * 1000);
  }
}

module.exports = Table;
