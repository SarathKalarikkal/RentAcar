import express from "express"
import { createMessage, deletAMessage, getAllMessage } from "../../controllers/messageController.js";
import { authUser } from "../../middlewares/authUser.js";




const router = express.Router()

router.post('/create', authUser, createMessage);
router.get('/list', getAllMessage);
router.delete('/delete/:id', deletAMessage);


export default router