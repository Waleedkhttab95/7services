const {order} = require('../models/operation/order')
const {category} = require('../models/content/category')
const { subscription } = require('../models/operation/subscription')
const {setDateZero, setDateZeroWithParam} = require('../controllers/common/commonFunctions')
const {invoice} = require('../models/operation/invoice')
const { validatePart, part } = require('../models/content/part')

// to get all Orders for Admin
exports.getAllOrders = async (req,res) =>{
    try{
        const result = await order.find()
        .populate('user', '-password')
        .populate('provider','-password')
        .populate('invoice subscription orderDetails.service orderDetails.department orderDetails.category orderDetails.subCategory orderDetails.parts')

        res.status(200).json({
            status: true,
            result: result
        })
    } catch(err){
        res.status(400).json({
            status: false,
            errMsg: err
        })
    }

}

// create new request :)

exports.createNewRequest = async (req,res) =>{
    let userId = req.user._id;
    let orderDetails = {
        service : req.body.listOfServices,
        department: req.body.listOfDepartments,
        category: req.body.listOfCategories,
        subCategory: req.body.subOfCategories,
        part: req.body.listOfParts
    }
    // check if this user have any subscrptions , if have to send internal request , and if havn't send external request
    const userSubscriptions = await subscription.find({'user':userId, 'isActive':true});

    if(!userSubscriptions){ // send external request
        const Order = new order({
            user:req.user._id,
            orderType:"external",
            orderDetails:orderDetails,
            location:req.body.location,
            orderStatus:'waiting',
            timeOfOrder:req.body.timeOfOrder,
            orderDate : setDateZeroWithParam(req.body.orderDate),
            createDate: setDateZero()
        }).save()
        .then(result =>{
            // create invoice ..
            createInvoice(result,res);
            //search of providers (Matching between Zones Table and order Location to get nearby zone and find who provider in this zone to send request )

        })



    }

    else { // send internal request



    }

}

// get order status
exports.getOrderStatus = async (req,res) =>{
    let orderId = req.body.orderId;

    if(!orderId) return res.status(400).json({
        status: false,
        messageAr: 'الرجاء ادخال رقم الطلب',
        messageEn: 'please enter order id'
    })
    let orderStatus = await order.findById(orderId).select('orderStatus -_id');

    if(!orderStatus) return res.status(400).json({
        status: false,
        messageAr: 'لا يملك هذا المستخدم ايا طلبات',
        messageEn: 'this user dont have any reqests'
    })


    res.status(200).json({
        status: true,
        orderStatus: orderStatus
    })
}


// get all user orders
exports.getUserOrders = async (req,res) =>{
    let userId = req.user._id;

    try{
        let orders = await order.find({"user":userId})
        .populate('provider', '-password')
        .populate("invoice subscription orderDetails")
        if(!orders) return res.status(400).json({
            status: false,
            messageAr: 'لا يملك هذا المستخدم ايا طلبات',
            messageEn: 'this user dont have any reqests'
        })


        res.status(200).json({
            status: true,
            orders: orders
        })
    } catch(err){
        res.status(400).send(err)
    }

}

// get all provider orders
exports.getProviderOrders = async (req,res) =>{
    let userId = req.user._id;

    try{
        let orders = await order.find({"provider":userId})
        .select('-user -invoice ')
        .populate("invoice subscription orderDetails")
        if(!orders) return res.status(400).json({
            status: false,
            messageAr: 'لا يملك هذا المستخدم ايا طلبات',
            messageEn: 'this user dont have any reqests'
        })


        res.status(200).json({
            status: true,
            orders: orders
        })
    } catch(err){
        res.status(400).send(err)
    }

}






// post rate of order
exports.rateOfOrder = async(req,res) =>{
    let orderId = req.body.orderId;
    let rateNumber = req.body.rateNumber;
    let comment = req.body.comment;
    if(!orderId || !rateNumber || !comment) return res.status(400).send("please enter request body")
    let rateObj={
        rateNumber: rateNumber,
        comment: comment
    }
    let orderResult = await order.findById(orderId);
    orderResult.RateOfService = rateObj;
    orderResult.save();

    res.status(200).json({
        status: true,
        messageAr:'تم ارسال التقييم بنجاح',
        messageEn: 'send rate is successfully'
    })
}

// change order status
exports.changeOrderStatus = async (req,res) =>{
    let orderId = req.body.orderId;
    let newStatus = req.body.status;

    if(!orderId || !newStatus) return res.status(402).send('please enter parametrs');

     order.findByIdAndUpdate(orderId,{
        $set:{
            orderStatus: newStatus
        }
    }).then((result,error) =>{
        if (error) res.status(401).json({status:false, errorMessage: error});
        res.status(201).json({
            status: true ,
            messageAr:"تم تحديث الحالة",
            messageEn :"status change successfuly ",
            result: result
        })
    })
}


// add extra services ../
exports.addExtraServices = async (req,res) =>{
    let orderId = req.body.orderId;
    let orderDetails = {
        service : req.body.listOfServices,
        department: req.body.listOfDepartments,
        category: req.body.listOfCategories,
        subCategory: req.body.subOfCategories,
        part: req.body.listOfParts
    }

    // create new invoice

   const updateOrder= await order.findById(orderId);
   updateOrder.orderDetails.push(orderDetails);
   updateOrder.save()
   // send notification to provider


}

// create invoice

function createInvoice(orderData, res) {
let categoryList = orderData.listOfCategories;
let partsList = orderData.listOfParts;
let totalAmount =0;
let tax = 0.15;

try{

    for(var i =0 ; i < categoryList.length ; i++){
        let service = await category.findById(categoryList[i]._id);
        totalAmount += service.price;
        if(partsList != null || partsList.length != 0){
            let Part =await part.findById(partsList[i].price);
            totalAmount += Part.price;
        }
    }


         function calculateTax() {
            let calculatedTax = 0;
            if(totalAmount != 0){
                calculatedTax =totalAmount * tax;
                return calculatedTax;
            }
            return calculatedTax;
        }



    new invoice({
        user: req.user._id,
        order: orderData._id,
        totalAmount: totalAmount,
        totalAmountWithTax: calculateTax(),
        isPaid:true,
        createDate:setDateZero()
    }).save();
} catch(err) {
    res.status(400).send(err)
}
}