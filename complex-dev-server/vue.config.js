
const path = require('path');
const request = require('request');

module.exports = {
  devServer: {
    port: 6080,
    host: '0.0.0.0',
    proxy: {
      "/api/": {
        target: 'http://localhost:3000',
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    },
    before: app => {
      //In production this is done by nginx.
      app.all('/*', (req, res, next) => {
        // CORS headers
        res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
        res.header(
          'Access-Control-Allow-Methods',
          'GET,PUT,POST,DELETE,OPTIONS'
        );
        // Set custom headers for CORS
        res.header(
          'Access-Control-Allow-Headers',
          'Content-type,Accept,X-Access-Token,X-Key'
        );
        if (req.method === 'OPTIONS') {
          res.status(200).end();
        } else {
          next();
        }
      });

      app.get("/endpoint", (req, res) => {
        return res.send({"test": "test"})
      })

      app.get('/easyrtc/easyrtc/easyrtc.js', (req, res) => {
        request('http://localhost:9080/easyrtc/easyrtc.js')
          .on('error', () => {
            // eslint-disable-next-line no-console
            console.log('EasyRtc server not available');

            //send local file for not getting error on e2e test
            return res.sendFile(
              path.join(__dirname, '/node_modules/easyrtc/api/easyrtc.js')
            );
          })
          .pipe(res);
      });

      //app.use(['/sub-site', '/'], indexServer);
    }
  },
}