const {personal, validatePersonal} = require('../models/user/personal');
const {commercial ,validateCommercial} = require('../models/user/commercial');
const bcrypt = require('bcrypt-nodejs');



// user Login //
exports.userLogin = async (req, res) => {

    let user;
    let type = 'personal';
     user = await personal.findOne({ phoneNumber: req.body.phoneNumber});
    if(!user) {

        user = await commercial.findOne({ phoneNumber: req.body.phoneNumber});
        type= 'commercial'
    }
    if(!user){

      return res.status(400).json({
        status:false,
        messageAr:"خطأ في رقم الهاتف او كلمة المرور",
        messageEn : 'invalid phone number or password'
    });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (!result) return res.status(400).json({
        status:false,
        messageAr:"خطأ في رقم الهاتف او كلمة المرور",
        messageEn : 'invalid phone number or password'
    });



    const token = user.generateAuthToken();

        if (user.isConfirmed == false) {
          return res.status(400).json({
            status:false,
            resStatus:405,
            token:token,
            messageAr:"نرجو تفعيل الحساب",
            messageEn : 'Please confirme your account'
        });
     // in case he didnt confirm

        }

      res.status(200).json({
         status:true,
        token: token,
        userId: user._id,
        userType:type
      });;
    });

  };


  // exports.sendNotification = async (req,res) =>{

  //   const notification_options = {
  //     priority: "high",
  //     timeToLive: 60 * 60 * 24
  //   };

  //   const message = {
  //     notification: {
  //        title: "Hi",
  //        body: "Hello world"
  //            }
  //     };

  //   const  registrationToken = req.body.registrationToken
  //   const message = message
  //   const options =  notification_options

  //     admin.messaging().sendToDevice(registrationToken, message, options)
  //     .then( response => {

  //      res.status(200).send("Notification sent successfully")

  //     })
  //     .catch( error => {
  //         console.log(error);
  //     });
  // }

