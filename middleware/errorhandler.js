const { constent } = require("../constent");

const errorhandler=(err,req,res,next)=>{
    const status = res.statusCode ? res.statusCode : 500;
    switch (status) {
        case constent.VALDIATION_ERROR:
            res.json({title:"Validation faild",messase:err.message,stackTrace:err.stack})
            break;
        case constent.NOT_FOUND:
            res.json({title:"Not found",messase:err.message,stackTrace:err.stack})
            break;
        case constent.UNAUTHORIZED:
            res.json({title:"Unauthorized",messase:err.message,stackTrace:err.stack})
            break;
        case constent.FORBIDDEN:
            res.json({title:"Forbidden",messase:err.message,stackTrace:err.stack})
            break;
        case constent.SERVER_ERROR:
            res.json({title:"Server error",messase:err.message,stackTrace:err.stack})
            break;
        default:
            console.log("No error found")
            break;
    }

}

module.exports = errorhandler;