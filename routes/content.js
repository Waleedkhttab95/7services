const contentController = require('../controllers/contentController');


module.exports = (app, client) => {

app.get('/api/getAllServices', contentController.getServices);
app.post('/api/postNewService',contentController.postService);
app.delete('/api/deleteService',contentController.deleteService);
app.put('/api/updateService',contentController.updateService);


app.post('/api/postNewDepartment',contentController.postCategory);
app.get('/api/getAllDepartments',contentController.getDepartments);
app.get('/api/getDepartmentById',contentController.getDepartmentById);
app.delete('/api/deleteDepartment',contentController.deleteDepartment);
app.put('/api/updateDepartment',contentController.updateDepartment);


app.post('/api/postNewCategory',contentController.postCategory);
app.get('/api/getAllCategories',contentController.getCatergories);
app.get('/api/getCategoryById',contentController.getCategoryById);
app.delete('/api/deleteCategory',contentController.deleteCategory);
app.put('/api/updateCategory',contentController.updateCategory);


app.post('/api/postNewSubCategory',contentController.postSubCategories);
app.get('/api/getAllSubCategories',contentController.getSubCategories);
app.get('/api/getAllSubCategoriesById',contentController.getSubCategoryById);
app.delete('/api/deleteSubCategory',contentController.deleteSubCategory);
app.put('/api/updateSubCategory',contentController.updateSubCategory);


app.post('/api/postNewPart',contentController.postPart);
app.get('/api/getAllParts',contentController.getParts);
app.get('/api/getAllPartsById',contentController.getPartById);
app.delete('/api/deletePart',contentController.deletePart);
app.put('/api/updatePart',contentController.updateParts);


app.post('/api/postNewPackage',contentController.postPackage);
app.get('/api/getAllPackages',contentController.getPackages);
app.delete('/api/deletePackage',contentController.deletePackage);
app.put('/api/updatePackage',contentController.updatePackage);


app.post('/api/postNewPromoCode',contentController.postPromoCode);
app.get('/api/getAllPromoCodes',contentController.getPromoCodes);
app.delete('/api/deletePromoCode',contentController.deletePromoCode);
app.put('/api/updatePromoCode',contentController.updatePromoCode);


app.post('/api/postNewOffer',contentController.postOffer);
app.get('/api/getAllOffers',contentController.getOffers);
app.delete('/api/deleteOffer',contentController.deleteOffer);
app.put('/api/updateOffer',contentController.updateOffer);
}