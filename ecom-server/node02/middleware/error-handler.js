
exports.errorHandler = (err, req, res, next) =>{

    if(err.name === "FileError"){
        return res.status(401).json({
            success: false,
            message: 'File not authorized'
        });
    }

    if(err.name === "UnauthorizedError"){
        return res.status(401).json({
            success: false,
            message: 'Resource not authorized'
        });
    }

    if(err.name === "ValidationError"){
        return res.status(400).json({
            success: false,
            message: 'Bad request : Invalid request'
        })
    }
     
    res.status(500).json({
        success: false,
        err
    })
    
    next()
}

