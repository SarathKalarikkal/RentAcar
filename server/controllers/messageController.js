import { Message } from "../models/messageModel.js"

export const createMessage = async(req, res, next)=>{
    try {
        const {name, email, message} = req.body

        if(!name || !email || !message){
            res.status(400).json({success : false, message : "All fields are mandatory"})
        }
        
        const newMessage = await Message.create({
            name, email, message
        })
        newMessage.save()

        res.status(200).json({success : true, message : "Message send to admin successfully", data : newMessage})

    } catch (error) {
        res.status(200).json({success : false, message : "internal server error", error : error})
    }
}
export const getAllMessage = async(req, res, next)=>{
    try {
        const messages = await Message.find()
        res.status(200).json({success : true, message : "Messages recieved successfully", data : messages})
    } catch (error) {
        res.status(200).json({success : false, message : "internal server error", error : error})
    }
}
export const deletAMessage = async(req, res, next) => {
    try {
      const { id } = req.params;
  
      const messageExist = await Message.findByIdAndDelete(id);
  
      if (!messageExist) {
        res.status(404).json({ success: false, message: "Message not found" });
      } else {
        res.status(200).json({ success: true, message: "Message deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };