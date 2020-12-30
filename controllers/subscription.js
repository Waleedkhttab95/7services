const {subscription} = require('../models/operation/subscription');
const {category} = require('../models/content/category')
const {setDateZero} = require('../controllers/common/commonFunctions')
const { package } = require('../models/content/package');

exports.createNewSubscription = async (req,res) =>{
    let userId = req.user._id;
    let listOfServices = req.body.services;
    let packageId = req.body.package;
    let location = req.body.location;
    let totalAmount = 0 ;
    if(!userId || !listOfServices || !packageId || !location) return res.status(400).json({
        status:false,
        message: 'invalid parameters '
    });

    try{
    // check if location subscribed or not
    let userLocation = await subscription.findOne({'location':location});
    if(userLocation) return res.status(400).json({
        status:false,
        messageEn: 'this location already have subscribe ',
        meesageAr: 'هذا الموقع تم اختياره مسبقا .'
    });


    // calculate total amount of Services
    for(let i =0 ; i < listOfServices ; i++){
        let service = category.findById(listOfServices[i]._id);
        totalAmount += service.price;
    }

    //t to get number of visits of a package
    let packageDetails =  await package.findById(packageId)
    .select("numberOfVisits");


    new subscription({
        user: userId,
        package:packageId,
        services: listOfServices,
        location:location,
        isActive:true,
        numberOfVisits:packageDetails.numberOfVisits,
        createDate:setDateZero(),
        totalAmount: totalAmount

    }).save()
    .then(result =>{
        res.status(201).json({
            status:true,
            meesageAr:"تم الإشتراك بنجاح",
            messageEn:"create Successfully",
            subscribe: result
        })
    })
    } catch(err){
        res.status(201).json({
            status:false,
            errorMessage:err
        })
    }



}

// get user subscriptions
exports.getUserSubscriptions = async (req,res) =>{
    let userId= req.user._id;

    try{
        const subscriptions = await subscription.find({"user":userId})
        .populate('package invoice services')
        .sort({createDate:'-1'})

        res.status(200).json({
            status:true,
            subscriptions:subscriptions
        })
    } catch(err){
        res.status(201).json({
            status:false,
            errorMessage:err
        })
    }


}


// get all Subscriptions for admin
exports.getAllSubscriptions = async (req,res) =>{


    try{
        const subscriptions = await subscription.find()
        .populate('user','-password')
        .populate('package invoice services')
        .sort({createDate:'-1'})

        res.status(200).json({
            status:true,
            subscriptions:subscriptions
        })
    } catch(err){
        res.status(201).json({
            status:false,
            errorMessage:err
        })
    }
}


