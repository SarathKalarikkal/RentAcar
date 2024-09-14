import express from "express"
import userRouter from "./userRouter.js"
import carRouter from "./carRouter.js"
import dealerRouter from "./dealerRouter.js"
import reservationRouter from "./reservationRouter.js"
import reviewRouter from "./reviewRouter.js"
import adminRouter from "./adminRouter.js"
import messageRouter from "./messageRouter.js"
import paymentRouter from "./paymentRouter.js"



const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/car', carRouter)
v1Router.use('/dealer', dealerRouter)
v1Router.use('/reservation', reservationRouter)
v1Router.use('/review', reviewRouter)
v1Router.use('/admin', adminRouter)
v1Router.use('/message', messageRouter)
v1Router.use('/payment', paymentRouter)


// v1Router.use('/payment', reservationRouter)


export default v1Router