import express from "express"
import { createCar, deleteCar, getACar, getCarsList, updateCar } from "../../controllers/carController.js"
import { authUser } from "../../middlewares/authUser.js"    
import { authDealer } from "../../middlewares/authDealer.js"
import { upload } from "../../middlewares/uploadMiddleWare.js"






const router = express.Router()

router.post('/create', authDealer,upload.single("image"), createCar);
router.get('/list', getCarsList); 
router.get('/:id', getACar);
router.put('/update/:id', authDealer, updateCar);
router.delete('/delete/:id', authDealer, deleteCar);


export default router