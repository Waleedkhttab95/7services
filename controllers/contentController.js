const { service, validate } = require('../models/content/Service');
const { category, validateCategory } = require('../models/content/category');
const { department, validateDepartment } = require('../models/content/department');
const { validateSubCategory, subCategory } = require('../models/content/subCategory')
const { validatePart, part } = require('../models/content/part')
const { package, validatePackage } = require('../models/content/package');
const { offer, validateOffer } = require('../models/content/offer')
const { validatePromoCode, promoCode } = require('../models/content/promoCode')
const { validateZone, zone } = require('../models/content/zone');
const {client} = require('../index.js');
// services section
exports.postService = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    try {
       new service({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            image: pathOfImage(req.file),
            createDate: Date.now()
        }).save()
            .then(result => {
               console.log(result)
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)

    }
    res.status(200).send("Stored !")
};

exports.getServices = async (req,res) => {
    const type ="services";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                services: data
            });
        }
        else {
            const services = await service.find();
            var serviceAsString = JSON.stringify(services);
            client.setex(type, 3200, serviceAsString)
            console.log(serviceAsString)
            res.status(201).json({
                services: serviceAsString
            });
        }


    })


}

exports.deleteService = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await service.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}

exports.updateService = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    service.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            image: pathOfImage(req.file),
            status: req.body.status,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

// Category section

exports.postCategory = async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new category({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            image: pathOfImage(req.file),
            // status: req.body.status,
            price: req.body.price,
            department: req.body.department,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getCatergories = async (req, res) => {
    const type ="category";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                categories: data
            });
        }
        else {
            const categories = await category.find();
            var dataAsString = JSON.stringify(categories);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                categories: dataAsString
            });
        }


    })


}

exports.getCategoryById = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    const categories = await category.find({'department':id});
    res.status(201).json({
        status: true,
        message: "Success !",
        categories: categories
    });
}

exports.updateCategory = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    category.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            image: pathOfImage(req.file),
            status: req.body.status,
            price: req.body.price,
            department: req.body.department,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deleteCategory = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await category.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}
// department section
exports.postDepartment = async (req, res) => {
    const { error } = validateDepartment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new department({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            image: pathOfImage(req.file),
            // status: req.body.status,
            type: req.body.type,
            service: req.body.service,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getDepartments = async (req, res) => {
    const type = 'department';

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                departments: data
            });
        }
        else {
            const departments = await department.find();
            var dataAsString = JSON.stringify(departments);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                departments: dataAsString
            });
        }


    })


}

exports.getDepartmentById = async (req, res) =>{
            const id = req.query.id;
            let userType = req.user.type;
            if (!id) return res.status(400).json({
                status: false,
                message: "requierd Id"
            });

            const departments = await department.find({'service':id, "type":userType ,"type":'All'});
            res.status(201).json({
                status: true,
                message: "Success !",
                departments: departments
            });
  }

exports.updateDepartment = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    department.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            image: pathOfImage(req.file),
            status: req.body.status,
            type: req.body.type,
            service: req.body.service,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deleteDepartment = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await department.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}
// sub categories
exports.postSubCategories = async (req, res) => {
    const { error } = validateSubCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new subCategory({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            duration: req.body.duration,
            // status: req.body.status,
            category: req.body.category,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getSubCategories = async (req, res) => {
    const type ="subCategories";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                subCategories: data
            });
        }
        else {
            const subCategories = await subCategory.find();
            var dataAsString = JSON.stringify(subCategories);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                subCategories: dataAsString
            });
        }


    })


}

exports.getSubCategoryById = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    const subcategories = await subCategory.find({'category':id});
    res.status(201).json({
        status: true,
        message: "Success !",
        subcategories: subcategories
    });
}

exports.updateSubCategory = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    subCategory.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            duration: req.body.duration,
            status: req.body.status,
            category: req.body.category,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deleteSubCategory = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await subCategory.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}
// Part
exports.postPart = async (req, res) => {
    const { error } = validatePart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new part({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            madeIn: req.body.madeIn,
            SpecificationAr: req.body.SpecificationAr,
            SpecificationEn: req.body.SpecificationEn,
            size: req.body.size,
            image: pathOfImage(req.file),
            // status: req.body.status,
            price: req.body.price,
            category: req.body.category,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getParts = async (req, res) => {
    const type = "parts";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                Parts: data
            });
        }
        else {
            const Parts = await part.find();
            var dataAsString = JSON.stringify(Parts);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                Parts: dataAsString
            });
        }


    })


}

exports.getPartById = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    const part = await part.find({'category':id});
    res.status(201).json({
        status: true,
        message: "Success !",
        part: part
    });
}


exports.updateParts = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    part.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            madeIn: req.body.madeIn,
            SpecificationAr: req.body.SpecificationAr,
            SpecificationEn: req.body.SpecificationEn,
            size: req.body.size,
            image: pathOfImage(req.file),
            status: req.body.status,
            price: req.body.price,
            category: req.body.category,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deletePart = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await part.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}

//package
exports.postPackage = async (req, res) => {
    const { error } = validatePackage(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new package({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            type: req.body.type,
            duration: req.body.duration,
            basePrice: req.body.basePrice,
            features: req.body.features,
            extraOption: req.body.extraOption,
            image: pathOfImage(req.file),
            // status: req.body.status,
            discount: req.body.discount,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getPackages = async (req, res) => {
    const type = "package";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                packages: data
            });
        }
        else {
            const packages = await package.find();
            var dataAsString = JSON.stringify(packages);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                packages: dataAsString
            });
        }


    })

}

exports.updatePackage = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    package.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            type: req.body.type,
            duration: req.body.duration,
            basePrice: req.body.basePrice,
            features: req.body.features,
            extraOption: req.body.extraOption,
            image: pathOfImage(req.file),
            status: req.body.status,
            discount: req.body.discount,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deletePackage = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await package.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}
// Offer
exports.postOffer = async (req, res) => {
    const { error } = validateOffer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new offer({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            category: req.body.category,
            image: pathOfImage(req.file),
            // status: req.body.status,
            startDate: setZeroDate(req.body.startDate),
            endDate: setZeroDate(req.body.endDate),
            discount: req.body.discount,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getOffers = async (req, res) => {
    const type = "offer";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                offer: data
            });
        }
        else {
            const offer = await offer.find();
            var dataAsString = JSON.stringify(offer);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                offer: dataAsString
            });
        }


    })

}

exports.updateOffer = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    offer.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            category: req.body.category,
            image: pathOfImage(req.file),
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            discount: req.body.discount,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deleteOffer = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await offer.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}
// promo Code
exports.postPromoCode = async (req, res) => {
    const { error } = validatePromoCode(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new promoCode({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            // status: req.body.status,
            startDate: setZeroDate(req.body.startDate),
            endDate: setZeroDate(req.body.endDate),
            discount: req.body.discount,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getPromoCodes = async (req, res) => {
    const type = 'promoCode';

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                promoCodes: data
            });
        }
        else {
            const promoCodes = await promoCode.find();
            var dataAsString = JSON.stringify(promoCodes);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                promoCodes: dataAsString
            });
        }


    })

}

exports.updatePromoCode = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    promoCode.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            discount: req.body.discount,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deletePromoCode = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await promoCode.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}
// zone
exports.postZone = async (req, res) => {
    const { error } = validateZone(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        new zone({
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            Neighborhood: req.body.Neighborhood,
            location: req.body.location,
            // status: req.body.status,
            createDate: Date.now()
        }).save()
            .then(result => {
                res.status(200).send("Stored !")
            })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}


exports.getZones = async (req, res) => {
    const type = "zone";

    client.get(type, async (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status(201).json({
                zones: data
            });
        }
        else {
            const zones = await zone.find();
            var dataAsString = JSON.stringify(zones);
            client.setex(type, 3200, dataAsString)
            res.status(201).json({
                zones: dataAsString
            });
        }


    })

}

exports.updateZone = async (req, res) => {
    let Id = req.query.id;
    if (!Id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    zone.findByIdAndUpdate(
        Id,
        {
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            Neighborhood: req.body.Neighborhood,
            location: req.body.location,
            status: req.body.status,
            updateDate: Date.now()
        },
        { new: true },
        function (err, response) {
            // Handle any possible database errors
            if (err) {
                console.log("we hit an error" + err);
                return res.status(400).json({
                    status: false,
                    message: 'Database Update Failure'
                });
            }
            res.state(200).json({
                status: true,
                message: 'Database Update Failure',
                response: response
            })
        }
    );
}

exports.deleteZone = async (req, res) =>{
    const id = req.query.id;
    if (!id) return res.status(400).json({
        status: false,
        message: "requierd Id"
    });

    try{
        await zone.findByIdAndUpdate(id,{ status: "blocked" });
        res.status(201).send('deleted !');
    } catch(error) {
        console.log(error);
        return res.status(401).send(error)
    }

}

function pathOfImage(file){
    const url = req.protocol + '://' + req.get("host");
    var imagePath = '';
    if(!file){
       imagePath = "null"
    }
    else{
        imagePath= url + "/images/" + file.filename;
    }

    return imagePath;
}

function setZeroDate(date) {
    today = new Date(date);
    today.setHours(0, 0, 0, 0);
    return today;
}