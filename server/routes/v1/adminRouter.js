import express from 'express'
import { addCar, adminLogin, adminLogout, adminSignup, checkAdmin, deleteCar, deleteReservation, deleteUser, getAllCars, getAllDealers, getAllReservations, getAllUsers, updateCar } from '../../controllers/adminController.js'
import {authAdmin} from "../../middlewares/authAdmin.js"

const router = express.Router()

router.get('/allusers',authAdmin, getAllUsers)
router.delete('/user/:id',authAdmin, deleteUser)
router.get('/dealers',authAdmin, getAllDealers)
router.get('/allcars',authAdmin, getAllCars)
router.post('/car',authAdmin, addCar)
router.put('/car/:id',authAdmin, updateCar)
router.delete('/car/:id',authAdmin, deleteCar)
router.get('/reservations',authAdmin, getAllReservations)
router.delete('/reservation/:id',authAdmin, deleteReservation)

router.post('/signup', adminSignup)
router.post('/login', adminLogin)
router.get('/logout', adminLogout)
router.get('/check-admin', checkAdmin)



export default router