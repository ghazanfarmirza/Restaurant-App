const express = require('express');
const router = express.Router();

router.get('./:login',(req,res,next)=>{
    const id= req.params.login;
    if(id == 'afnan@gmail.com'){
        res.status(200).json({
            message:'Login successful'
        });

    }else{
        res.status(200).json({
            message: 'Failed'
        });
    }
});
router.Post('./:login',(req,res,next)=>{
    const id= req.params.login;
    if(id == 'afnan@gmail.com'){
        res.status(200).json({
            message:'Login successful'
        });

    }else{
        res.status(200).json({
            message: 'Failed'
        });
    }
});