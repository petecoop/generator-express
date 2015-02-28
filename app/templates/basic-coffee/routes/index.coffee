express = require 'express'
router = express.Router()<% if(options.viewEngine == 'marko'){ %>
marko = require 'marko'<% } %>

# GET home page.
<% if(options.viewEngine == 'marko'){ %>
indexTemplate = marko.load require.resolve '../views/index.marko'<% } %>
router.get '/', (req, res) -><% if(options.viewEngine == 'marko'){ %>
  indexTemplate.render
    $global: locals: req.app.locals
    title: 'Express'
  , res<% } else { %>
  res.render 'index', { title: 'Express' }<% } %>

module.exports = router
