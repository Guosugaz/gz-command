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
