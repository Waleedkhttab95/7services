const authController = require('../controllers/auth');

module.exports = (app) => {

    app.post('/api/userLogin',authController.userLogin);

}