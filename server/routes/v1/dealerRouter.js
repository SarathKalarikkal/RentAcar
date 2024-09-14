import express from "express"
import { createDealer, dealerLogin, dealerProfile, checkDealer, dealerUpdate, dealerLogout, getAllDealers, getDealerInventory, getDealerNotifications, deleteDealerNotification} from "../../controllers/dealerController.js"
import { authDealer } from "../../middlewares/authDealer.js"



const router = express.Router()

router.post('/create', createDealer);
router.post('/login', dealerLogin);
router.get('/logout', dealerLogout);
router.get('/list', getAllDealers);
router.get('/profile/:id', authDealer, dealerProfile);
router.get('/check-dealer', authDealer, checkDealer);
router.put('/update/:id', authDealer, dealerUpdate);

router.get('/inventory',authDealer, getDealerInventory);
router.get('/notifications',authDealer, getDealerNotifications);
router.delete('/notification/:id', authDealer, deleteDealerNotification);

export default router