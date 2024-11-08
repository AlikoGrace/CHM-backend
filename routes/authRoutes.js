const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');



// Login route
router.post('/login', authController.login);

// Registration route for Main Pastor
router.post('/register-main-pastor', verifyToken, checkRole(['main_pastor']), authController.registerMainPastor);

// Protected route example
// router.get('/protected-route', verifyToken, checkRole(['main_pastor']), (req, res) => {
//     res.status(200).json({ message: 'Access granted to protected route.' });
// });


module.exports = router;
