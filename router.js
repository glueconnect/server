const SuperRouter = require('super-router');
const router = new SuperRouter.Router();


router.addRoute({
  path    : '/',
  methods : 'get',
  handler : ({request, response}) => {
   
    response.setBody({message: 'hi there'});
  }
});

router.addRoute({
  path    : '/test',
  methods : 'get',
  handler : ({request, response}) => {
    
    throw new Error('some random error');
  }
});

module.exports = router;