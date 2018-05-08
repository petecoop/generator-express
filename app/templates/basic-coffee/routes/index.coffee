express = require 'express'
router = express.Router()

# GET home page.
router.get '/', (req, res) -><% if(options.viewEngine == 'marko'){ %>
  res.marko require('../views/index'),
    $global: locals: req.app.locals
    title: 'Express'<% } else { %>
  res.render 'index', { title: 'Express' }<% } %>

module.exports = router
