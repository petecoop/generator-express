var express = require('express');
var router = express.Router();<% if(options.viewEngine == 'marko'){ %>
var marko = require('marko');<% } %>

/* GET home page. */
<% if(options.viewEngine == 'marko'){ %>
var indexTemplate = marko.load(require.resolve('../views/index.marko'));<% } %>
router.get('/', function(req, res) {<% if(options.viewEngine == 'marko'){ %>
  indexTemplate.render({
    $global: {locals: req.app.locals},
    title: 'Express'
  }, res);<% } else { %>
  res.render('index', { title: 'Express' });<% } %>
});

module.exports = router;
