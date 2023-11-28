import {createError} from "../utils/error.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req,res,next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try{

        const savedRoom = await newRoom.save()

        try{
            await Hotel.findByIdAndUpdate(hotelId,
                {$push : {rooms: savedRoom._id },
            });
        }catch(err){
            next(err);
        }
         res.status(200).json(savedRoom);
    }catch(err){
        next(err)
    }
};

//update
export const updateRoom = async (req,res,next)=>{
    try{
        const updateRoom = await Hotel.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body},
        {new:true}
        );
        res.status(200).json(updateRoom);
    }catch(err){
       next(err);
    }
} 

export const updateRoomAvailability = async (req,res,next)=>{
    try{
        await Room.updateOne({"roomNumbers._id":req.params.id},{
            $push: {"roomNumbers.$.unavailableDates": req.body.dates},  
                          }
        );
        res.status(200).json("room status has been updated.");
    }catch(err){
       next(err);
    }
}

//delete
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;

    try{
        await Hotel.findByIdAndDelete(req.params.id);
   
        try{
            await Hotel.findByIdAndUpdate(hotelId,
                {$pull : {rooms: req.params.id },
            });
        }catch(err){
            next(err);
        }

        res.status(200).json("Room has been deleted"); 
    }catch(err){
       next(err);
    }
}

//get
export const getRoom = async (req,res,next)=>{
    try{
        const room = await Hotel.findById(req.params.id);
        res.status(200).json(room);
    }catch(err){
       res.status(500).json(err);
    }
}

//getall
export const getRooms = async (req,res,next)=>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(err){
       next(err);
    }
}