const {order} = require('../models/operation/order')
const {category} = require('../models/content/category')
const { subscription } = require('../models/operation/subscription')
const {setDateZero, setDateZeroWithParam} = require('../controllers/common/commonFunctions')


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
            //search of providers (Matching between Zones Table and order Location to get nearby zone and find who provider in this zone to send request )

        })



    }

    else { // send internal request



    }

}

