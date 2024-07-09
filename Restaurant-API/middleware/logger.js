const logger = (req, res, next) => {
   
  
    if (Object.keys(req.body).length) {
      console.log("Request body: ", req.body);
    }
  
   
    next();
  };
  
  export default logger;