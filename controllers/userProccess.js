const {personal} = require('../models/user/personal');
const {commercial } = require('../models/user/commercial')
const {wallet} = require('../models/user/wallet');
const {commercialWallet} = require('../models/user/commercialWallet');
const {order} = require('../models/operation/order')
const {invoice} = require('../models/operation/invoice')


exports.getUserDeatails = async (req,res) =>{
    let userId = req.user._id;
    let userType = req.user.type;

    if(!userId || userType) return res.status(403).send("please send valid token .");

    if(userType == "personal") {
        const userResult = await wallet.findOne({'user': userId})
        .populate('user', '-password');

        if(!userResult) {return res.status(400).json({
            status:false,
            messageAr:"المستخدم غير موجود",
            messageEn: "user does not exist !"
        })}

        res.status(200).json({
            status:true,
            userData: userResult.user,
            userWallet: userResult.balance
        })
    } else {
        const userResult = await commercialWallet.findOne({'user': userId})
        .populate('user', '-password');

        if(!userResult) {return res.status(400).json({
            status:false,
            messageAr:"المستخدم غير موجود",
            messageEn: "user does not exist !"
        })}

        res.status(200).json({
            status:true,
            userData: userResult.user,
            userWallet: userResult.balance
        })
    }
}

exports.getUserOrders = async (req,res) =>{
    let userId = req.user._id;

    const orders = await order.find({'user':userId})
    .populate('provider','-password')
    .populate('invoice subscription orderDetails');

    if(!orders){ return res.status(400).json({
        status: false,
        messageAr:"لايوجد طلبات",
        messageEn : "this user does not have any orders"
    })
    }
    res.status(200).json({
        status:true,
        orders: orders
    })
}

exports.getUserInvoices = async (req,res) =>{
    let userId = req.user._id;

    const invoices = await invoice.find({'user':userId})
    .populate('order');

    if(!invoices){ return res.status(400).json({
        status: false,
        messageAr:"لايوجد فواتير",
        messageEn : "this user does not have any invoices"
    })
    }
    res.status(200).json({
        status:true,
        invoices: invoices
    })
}

exports.getUserOrderStatus = async (req,res) =>{
    let userId = req.user._id;
    let orderId =  req.body.orderId;
    if(!orderId)
    {return res.status(400).json({
        status: false,
        messageAr:"الرجاء ادخال رقم الطلب",
        messageEn : "please enter order id ."
    })
    }
    const orderStatus = await order.findOne({'user':userId,'_id': orderId})
    .select('orderStatus')

    if(!orderStatus)
    {return res.status(400).json({
        status: false,
        messageAr:"لايوجد طلبات",
        messageEn : "this user does not have any orders"
    })
    }
    res.status(200).json({
        status:true,
        orderStatus: orderStatus
    })
}


