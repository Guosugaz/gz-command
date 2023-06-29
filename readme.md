# @sugaz/command

管理项目启动变量的命令

## Install

```
npm i @sugaz/command -D

yarn add @sugaz/command -D
```

## Usage

```
gz-run -f gz-common.js
```

## RunFile Example

#### gz-common.js

```
module.exports = [
  {
    title: "环境",
    options: [
      {
        name: "开发",
        params: {
          config: "dev-config"
        },
        envs: {
          NODE_ENV: "development"
        },
        command: [
          "yarn --version",
          "npm --version",
        ]
      },
      {
        name: "生产",
        params: {
          config: "prod-config"
        },
        envs: {
          NODE_ENV: "production"
        },
        command: "npm --version"
      }
    ]
  }
];

```

## config

The config file, which defines how you select and execute commands.

```
config{
    title:string;
    select: Option
}
```

#### Option

- **name** `string`
- **command** `string|Array<string>` executable command
- **params** `record<string,any>` pass parameters to the executable file
- **envs** `record<string,any>` This value will inject to process.env

#### How to get `params`

Get `params` in executable file as belows

```
const { getParmas } = require("@sugaz/command");

console.log(getParmas());
```
