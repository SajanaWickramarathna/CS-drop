const express = require('express');
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require('../middleware/authMiddleware');
const managerController = require('../Controllers/inventory_manager'); // Make sure the path is correct

// Define your routes
router.get('/inventoryManager', managerController.getInventoryManager); 
router.get('/inventoryManager',managerController.getInventoryManagerById);
router.post('/signup', upload.single("profile_image"), managerController.addInventoryManager);
router.put('/updatemanager', upload.single("profile_image"), managerController.updateInventoryManager);
router.put('/updatepassword', managerController.updatePassword);

// Export the router instance
module.exports = router;
