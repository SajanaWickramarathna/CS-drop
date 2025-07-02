const express = require('express');
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const CategoryController = require('../Controllers/category'); 

router.get('/', CategoryController.getCategories);  
router.get('/category', CategoryController.getCategoryById); 

router.post('/addcategory', upload.single("category_image"), CategoryController.addCategory); 
router.put('/updatecategory', upload.single("category_image"), CategoryController.updateCategory);
router.put('/updateprocount', CategoryController.updateCategoryProductCount);
router.delete('/deletecategory', CategoryController.deleteCategory); 


module.exports = router;