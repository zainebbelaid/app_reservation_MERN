import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//create
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body) ;
    try{
           const savedHotel = await newHotel.save();
           res.status(200).json(savedHotel);
    }catch(err){     
       next(err);
    }
}

//update
export const updateHotel = async (req,res,next)=>{
    try{
        const updatehotel = await Hotel.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body},
        {new:true}
        );
        res.status(200).json(updatehotel);
    }catch(err){
       next(err);
    }
}

//delete
export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted"); 
    }catch(err){
       next(err);
    }
}

//get
export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
       res.status(500).json(err);
    }
}

//getall
export const getHotels = async (req,res,next)=>{
    const{min,max, ...others } = req.query;
    try{
        const hotels = await Hotel.find({
            ...others,cheapesPrice: { $gt: min | 1, $lt: max || 999},
            }).limit(req.query.limit);
        res.status(200).json(hotels);
    }catch(err){
       next(err);
    }   
}

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }catch(err){
       next(err);
    }   
}

export const countByType = async (req,res,next)=>{

    try{

        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const appartementCount = await Hotel.countDocuments({type:"appartement"});
        const riadCount =await Hotel.countDocuments({type:"riad"});
        const cabinCount =await Hotel.countDocuments({type:"cabin"});
        const villaCount =await Hotel.countDocuments({type:"villa"}); 

       
        res.status(200).json([
        {type:"hotel",count:hotelCount},
        {type:"appartement",count:appartementCount},
        {type:"riad",count:riadCount},
        {type:"cabin",count:cabinCount},
        {type:"villa",count:villaCount},

        ]);

    } catch(err){
       next(err);
    }   
}


export const getHotelRooms = async(req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room);
        }));

        res.status(200).json(list)

    }catch(err){
        next(err)
    }
}