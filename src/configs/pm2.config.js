module.exports = {
  apps: [
    {
      name: 'express-graphql-starterkit',
      script: 'dist/app.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max_old_space_size=4048'
      },
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '1024M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true
    }
  ]
}
