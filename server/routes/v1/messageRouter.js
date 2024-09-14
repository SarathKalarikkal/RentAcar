import express from "express"
import { createMessage, deletAMessage, getAllMessage } from "../../controllers/messageController.js";




const router = express.Router()

router.post('/create', createMessage);
router.get('/list', getAllMessage);
router.delete('/delete/:id', deletAMessage);


export default router