const regController = require('../controllers/registretion')
const auth = require('../middleware/auth');


module.exports = (app) => {

    app.post('/api/personalSignUp',regController.personalSignUp);
    app.post('/api/commercialSignUp',regController.commercialSignUp);

    app.post('/api/verfiyOTP',auth,regController.verifyUserOTP);
    app.post('/api/sendResetPassword',regController.resetPassword);
    app.post('/api/setNewPAssword',regController.changeUserPassword)
    app.post('/api/resendOtp',auth,regController.resendOtp)
    app.post('/api/verfiyOtpWithResetPassword',regController.verifyUserOTPWithResetPassword)
}