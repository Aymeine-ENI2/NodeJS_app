module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      instances: 3,
      log_file: "./logs/err.log",
      time: true,
    },
  ],
};

// pm2 start ecosystem.config.js 