// init project
var express = require('express');
var app = express();
var sass = require('sass');
var fs = require('fs');
var path = require('path');
var src = __dirname + '/public';
var dest = '/tmp';

// Custom Sass middleware using Dart Sass (sass package)
var sassMiddleware = function(req, res, next) {
  if (req.url.endsWith('.css')) {
    var scssFile = path.join(src, req.url.replace('.css', '.scss'));
    if (fs.existsSync(scssFile)) {
      try {
        var result = sass.compile(scssFile);
        var cssFile = path.join(dest, req.url);
        var dirname = path.dirname(cssFile);
        if (!fs.existsSync(dirname)) {
          fs.mkdirSync(dirname, { recursive: true });
        }
        fs.writeFileSync(cssFile, result.css);
      } catch (err) {
        console.error('Sass compilation error for ' + scssFile + ':', err.message);
      }
    }
  }
  next();
};

app.use(sassMiddleware);

// app.use(postcssMiddleware({
//   plugins: [
//     /* Plugins */
//     autoprefixer({
//       /* Options */
//     })
//   ],
//   src: function(request) {
//     return path.join(dest, request.url);
//   }
// }));


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('/tmp'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/r/:subreddit', function (request, response) {
  response.sendFile(__dirname + '/views/player.html');
});

app.get('/about', function (request, response) {
  response.send('you know what I\'m about dawg');
});


// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});