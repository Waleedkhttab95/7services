const {personal, validatePersonal} = require('../models/user/personal');
const {commercial ,validateCommercial} = require('../models/user/commercial')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const sendSms = require('../controllers/common/sendSms');

// user personal registretion
exports.personalSignUp = async (req,res) =>{
    let otp;
    const { error } = validatePersonal(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await personal.findOne({ phoneNumber: req.body.phoneNumber});

    if (user) return res.status(400).json({
        status:false,
        messageAr:"هذا المستخدم مسجل مسبقا !",
        messageEn : 'this user already exist !'
    });

    try {
        user = new personal({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            houseType: req.body.houseType,
            houseNumber: req.body.houseNumber,
            AcceptTerms: req.body.AcceptTerms,
            type:'personal'
        });
        const salt = await bcrypt.genSalt(10, (error, hash) => {
            if (error) res.status(400)

          });

          const hashPassword = await bcrypt.hash(user.password, salt, null, (error, hash) => {
            if (error) return res.status(400)
                // create otp
                 otp =12345// createOtp();
                 // create location obj
                 locationObj = {
                    latitude: req.body.latitude,
                    longitude:req.body.longitude
                 }
                today = new Date();
                today.setHours(0, 0, 0, 0);
                user.createDate = today;
                user.password = hash;
               user.location = locationObj;
                user.location.id= new mongoose.Types.ObjectId(),
                user.otp = otp;
                user.save();
          });



        // send OTP Sms
     //   sendSms.sendSms(req.body.phoneNumber, otp);
        // create user token :)
        const token = user.generateAuthToken();

        res.status(201).json({
            status: true ,
            messageAr: 'تم تسجيل المستخدم بنجاح ',
            messageEn: 'Successful ',
            token: token
          });
    } catch(err){
        console.log(err)
        res.status(201).json({
            status: false ,
            messageAr: err,
            messageEn:err
          });
    }

}

// user commercial registretion
exports.commercialSignUp = async (req,res) =>{
    let otp;
    const { error } = validateCommercial(req.body);
    if (error) return res.status(400).json({
        status:false,
        message:error.details[0].message}
        );


    let user = await commercial.findOne({ phoneNumber: req.body.phoneNumber});

    if (user) return res.status(400).json({
        status:false,
        messageAr:"هذا المستخدم مسجل مسبقا !",
        messageEn : 'this user already exist !'
    });

    try {
        user = new commercial({
            companyName: req.body.companyName,
            email: req.body.email.toLowerCase(),
            password:req.body.password,
            phoneNumber: req.body.phoneNumber,
            CR: req.body.CR,
            officeNumber: req.body.officeNumber,
            AcceptTerms: req.body.AcceptTerms,
            type:'commercial'
        });
        const salt = await bcrypt.genSalt(10, (error, hash) => {
            if (error) res.status(400)

          });

          const hashPassword = await bcrypt.hash(user.password, salt, null, (error, hash) => {
            if (error) return res.status(400)
            // create otp
         otp = 12345 //createOtp();
        today = new Date();
        today.setHours(0, 0, 0, 0);
        user.createDate = today;
        user.password = hash;
        user.location.latitude= req.body.latitude,
        user.location.longitude= req.body.longitude,
        user.location.id= new mongoose.Types.ObjectId(),

        user.otp = otp;
        user.save();

          });


        // send OTP Sms
        //sendSms.sendSms(req.body.phoneNumber, otp);
        // create user token :)
        const token = user.generateAuthToken();

        res.status(201).json({
            status: true ,
            messageAr: 'تم تسجيل المستخدم بنجاح ',
            messageEn: 'Successful ',
            token: token
          });
    } catch(err){
        console.log(err)
        res.status(201).json({
            status: false ,
            messageAr: err,
            messageEn:err
          });
    }

}

// confirm user account By OTP
exports.verifyUserOTP = async (req,res) =>{
    var userOtp = req.body.otp;
    var type = req.user.type;
    if(!userOtp) return res.status(400).json({
        status:false,
        message:"please enter otp code .."
    }
        );

    // get user otp frpm DB
    if(type == "personal"){
        const user = await personal.findById(req.user._id).select("otp");

        //check user otp == otp from request
        if(user.otp == userOtp){
            user.isConfirmed = true;
            user.save();
            return res.status(201).json({
                status: true,
                messageAr: "تم التأكيد " ,
                messageEn: 'Successful'
            })
        }
        else{
            return res.status(402).json({
                status: false,
                messageAr: "رقم التأكد خاطئ " ,
                messageEn: 'verification number is invalid'
            })
        }
    }
    else if(type == "commercial"){
        const user = await commercial.findById(req.user._id).select("otp");

        //check user otp == otp from request
        if(user.otp == userOtp){
            user.isConfirmed = true;
            user.save();
            return res.status(201).json({
                status: true,
                messageAr: "تم التأكيد " ,
                messageEn: 'Successful'
            })
        }
        else{
            return res.status(402).json({
                status: false,
                messageAr: "رقم التأكد خاطئ " ,
                messageEn: 'verification number is invalid'
            })
        }
    }
    else
    return res.status(400).json({
        status: false,
        messageAr: "الرجاء ادخال نوع المستخدم " ,
        messageEn: 'please enter invalid user type'
    })

}

// confirm user account By OTP
exports.verifyUserOTPWithResetPassword = async (req,res) =>{
    var userOtp = req.body.otp;
    var type = req.body.type;
    let phoneNumber = req.body.phoneNumber;
    if(!userOtp) return res.status(400).json({
        status:false,
        message:"please enter otp code .."
    }
        );

    // get user otp frpm DB
    if(type == "personal"){
        const user = await personal.findOne({"phoneNumber":phoneNumber}).select("otp");

        //check user otp == otp from request
        if(user.otp == userOtp){
            user.isConfirmed = true;
            user.save();
            return res.status(201).json({
                status: true,
                messageAr: "تم التأكيد " ,
                messageEn: 'Successful'
            })
        }
        else{
            return res.status(402).json({
                status: false,
                messageAr: "رقم التأكد خاطئ " ,
                messageEn: 'verification number is invalid'
            })
        }
    }
    else if(type == "commercial"){
        const user = await commercial.findOne({"phoneNumber":phoneNumber}).select("otp");

        //check user otp == otp from request
        if(user.otp == userOtp){
            user.isConfirmed = true;
            user.save();
            return res.status(201).json({
                status: true,
                messageAr: "تم التأكيد " ,
                messageEn: 'Successful'
            })
        }
        else{
            return res.status(402).json({
                status: false,
                messageAr: "رقم التأكد خاطئ " ,
                messageEn: 'verification number is invalid'
            })
        }
    }
    else
    return res.status(400).json({
        status: false,
        messageAr: "الرجاء ادخال نوع المستخدم " ,
        messageEn: 'please enter invalid user type'
    })

}


// reset password
exports.resetPassword = async (req,res)=>{
    let userPhoneNumber = req.body.phoneNumber;
    let user;
    let userType = 'personal';
    if(!userPhoneNumber) return res.status(400).json({
        status:false,
        messageAr:"الرجاء ادخال رقم الهاتف",
        messageEn : 'please enter phone number !'
    });

     user = await personal.findOne({'phoneNumber': userPhoneNumber});
    if(!user) {
    user = await commercial.findOne({'phoneNumber': userPhoneNumber});
    if(!user) {
        return res.status(400).json({
            status:false,
            messageAr:"المستخدم غير موجود",
            messageEn : 'user not exist !'
        });
    }
        userType = 'commercial'
    }
    
    let otp = 1234//createOtp()
    // set new otp
    user.otp = otp;
    user.save();
    // send sms otp
   // sendSms.sendSms(user.phoneNumber,otp)
    // finish
    res.status(201).json({
        status: true,
        messageAr:"تم إرسال رمز التأكيد",
        messageEn : 'OTP send successfully !',
        userType: userType
    })

}

  // change user Password \\
  exports.changeUserPassword =  async (req, res) => {
      let newPassword = req.body.newPassword;
      let confirmNewPaassword =req.body.confirmNewPaassword;
    let phoneNumber = req.body.phoneNumber;
    let userType = req.body.userType;
      if(!newPassword || !confirmNewPaassword) return res.status(400).json({
        status:false,
        messageAr:"الرجاء إدخال كلمة المرور الجديدة ",
        messageEn : 'please enter new password !'
    });

    if(newPassword == confirmNewPaassword){
        if(userType == 'personal'){
            const user = await personal.findOne({'phoneNumber':phoneNumber});

            if (user != null) {
              try {
                const salt = await bcrypt.genSalt(10, (error, hash) => {
                  if (error) res.status(400)
                });
                await bcrypt.hash(newPassword, salt, null, async (error, hash) => {
                  if (error) res.status(400)
                  user.password = hash;
                  user.save();
                  return res.status(204).json({
                    status:true,
                    messageAr:"تم تغيير كلمة المرور ",
                    messageEn : 'Password changed !'
                });
                });
                // res.status(200).send('The password has been changed');

              } catch (e) {
                res.send('error' + e);
              }
            }
        }
            else if(userType == 'commercial'){
                const user = await commercial.findOne({'phoneNumber':phoneNumber});
                if (user != null) {
                  try {
                    const salt = await bcrypt.genSalt(10, (error, hash) => {
                      if (error) res.status(400)
                    });
                    await bcrypt.hash(newPassword, salt, null, async (error, hash) => {
                      if (error) res.status(400)
                      user.password = hash;
                      user.save();
                      return res.status(204).json({
                        status:true,
                        messageAr:"تم تغيير كلمة المرور ",
                        messageEn : 'Password changed !'
                    });
                    });
                    // res.status(200).send('The password has been changed');

                  } catch (e) {
                    res.send('error' + e);
                  }
                }
            }


    }
    else {
        return res.status(400).json({
            status:false,
            messageAr:"كلمة المرور و التأكيد غير متوافقة",
            messageEn : 'please enter the same password and confirm password !'
        });
    }

  };

  // resend otp

  exports.resendOtp = async (req,res) =>{
      let userId = req.user._id;
      let userType = req.user.type;


      if(userType == "personal") {
          const user = await personal.findById(userId);
          let otp = createOtp()
          // set new otp
          user.otp = otp;
          user.save();
          // send sms otp
          sendSms.sendSms(user.phoneNumber,otp)
          return res.status(201).json({
            status: true,
            messageAr:"تم إرسال رمز التأكيد",
            messageEn : 'OTP send successfully !',
            userType: userType
        })
      }
      else {
        const user = await commercial.findById(userId);
        let otp = createOtp()
        // set new otp
        user.otp = otp;
        user.save();
        // send sms otp
        sendSms.sendSms(user.phoneNumber,otp)
        return res.status(201).json({
            status: true,
            messageAr:"تم إرسال رمز التأكيد",
            messageEn : 'OTP send successfully !',
            userType: userType
        })
      }
  }


function createOtp() {
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
return otp
}