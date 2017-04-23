const SuperRouter = require('super-router');
const _ = require('lodash')
const router = require('./router')
const errorMiddleware = require('./middleware/error')
const ContentNegotiation = SuperRouter.Middleware.ContentNegotiation;


const app = new SuperRouter.App();

app.then(ContentNegotiation.request);
app.then(router.match);
app.then(router.execute);
app.catch(errorMiddleware());
app.then(ContentNegotiation.response);

module.exports = app;
