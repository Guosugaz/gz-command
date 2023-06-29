const { Command } = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const { spawn } = require("child_process");
const { genParams } = require("./index");
const { cwd } = require("node:process");

console.log(`Current directory: ${cwd()}`);
const program = new Command();

program.option("-f --file <string>", "命令文件").action(function () {
  const { file } = this.opts();

  const data = require(path.join(cwd(), file));
  if (data && data.length) {
    const list = data.map((item, index) => {
      return {
        type: "list",
        name: index + "",
        message: item.title,
        choices:
          item.options && item.options.length
            ? item.options.map((i, index) => ({ name: i.name, value: index }))
            : []
      };
    });
    inquirer.prompt(list).then((res) => {
      let params = {};
      let envs = {};
      let commonLines = [];
      data.forEach((item, index) => {
        const ind = res[index + ""];
        const c = item.options[ind];
        if (c.params) Object.assign(params, c.params);
        if (c.envs) Object.assign(envs, c.envs);
        if (c.command) {
          if (typeof c.command === "string") {
            commonLines.push(c.command);
          } else {
            commonLines = commonLines.concat(c.command);
          }
        }
      });

      console.dir({ envs, params });

      commonLines.forEach(async (command) => {
        const arr = command.split(" ");
        await new Promise((resolve, reject) => {
          const task = spawn(arr[0], arr.slice(1), {
            env: { ...process.env, ...envs, ...genParams(params) },
            stdio: "inherit",
            shell: true
          });
          task.on("close", () => resolve(true));
          task.on("error", (e) => console.log(e));
        });
      });
    });
  }
});
program.parse(process.argv);
