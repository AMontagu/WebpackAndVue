module.exports = {
  lintOnSave: false,
  // publicPath: '/sub-site/',
  pages: {
    app: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      excludeChunks: ["app2"]
    },
    app2: {
      entry: "src2/main.js",
      template: "public/index2.html",
      filename: "index2.html",
      excludeChunks: ["app"]
    }
  },

  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();
  },

  devServer: {
    port: 6080,
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

      helpers.getHeaseApi();

      app.use(
        '/storage',
        serveStatic(helpers.storageDir, {
          maxAge: 0
        })
      );

      app.get('/easyrtc/easyrtc/easyrtc.js', (req, res) => {
        request('http://localhost:8080/easyrtc/easyrtc.js')
          .on('error', () => {
            // eslint-disable-next-line no-console
            console.log('EasyRtc server not available');

            //send local file for not getting error on e2e test
            return res.sendFile(
              path.join(helpers.baseDir, '/node_modules/easyrtc/api/easyrtc.js')
            );
          })
          .pipe(res);
      });

      app.use(['/sub-site', '/'], indexServer);
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
};
