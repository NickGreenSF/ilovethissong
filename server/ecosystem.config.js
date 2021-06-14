module.exports = {
  apps: [
    {
      name: 'www',
      script: './dist/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
