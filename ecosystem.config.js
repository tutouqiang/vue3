module.exports = {
  apps: [
    {
      name: 'wooc',
      port: '8080',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
