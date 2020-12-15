const {personal, validatePersonal} = require('../models/user/personal');
const {commercial ,validateCommercial} = require('../models/user/commercial')


// user Login //
exports.userLogin = async (req, res) => {
    let user;
    let type = 'personal';
     user = await personal.findOne({ phoneNumber: req.body.phoneNumber});
    if(!user) {
        user = await commercial.findOne({ phoneNumber: req.body.phoneNumber});
        type= 'commercial'
    }
    else if (!user) return res.status(400).json({
        status:false,
        messageAr:"خطأ في رقم الهاتف او كلمة المرور",
        messageEn : 'invalid phone number or password'
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (!result) return res.status(400).json({
        status:false,
        messageAr:"خطأ في رقم الهاتف او كلمة المرور",
        messageEn : 'invalid phone number or password'
    });




        if (user.isConfirmed == false) {
          return res.status(400).json({
            status:false,
            messageAr:"نرجو تفعيل الحساب",
            messageEn : 'Please confirme your account'
        });
     // in case he didnt confirm

        }

      const token = user.generateAuthToken();
      res.status(200).json({
         status:true,
        token: token,
        userId: user._id,
        userType:type
      });;
    });

  };
