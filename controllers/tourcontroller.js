const Tour=require('../models/tourModel');



exports.checkBodey=(req,res,next)=>{
    if (!req.body.name || req.body.price){
        return res.status(400).json({
            status:'fail',
            message :"missing name or o=price"
        })
    }
    next();
}

//get alltours
exports.getAllTours=async(req,res)=>{
    try {
        // build a query
        const queryObj={...req.query};
        const excludeFields =['page','sort','limit','fields'];
        excludeFields.forEach(el=> delete queryObj[el]);

        // 1. Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr));
        
        // 2. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // 3. Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // 5. Pagination
        const page = req.query.page || 1;
        const limit = req.query.limit || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        //excute query
        const tours =await query;
        res.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                tours
            }
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        });
    }
};  
//get aspecific tour
exports.getTour =async(req,res)=>{
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        });
    }
};

// create anew tour
exports.createTour =async(req,res)=>{
    try {
        const newtour = await Tour.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                tour:newtour 
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        });
    }
};

// Update atour
exports.updateTour =async(req,res)=>{
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        });
    }
};

// delete a tour
exports.deleteTour =async(req,res)=>{
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'success',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        });
    }
};