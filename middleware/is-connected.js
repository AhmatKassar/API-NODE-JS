const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const checkAuthorizationHeader = req.get("Authorization");
    if(!checkAuthorizationHeader){
        const error = new Error("Vous n'êtes pas connecté, veuillez-vous identifier!");
        error.status_Code=401;
        throw error;
    }
    const token = checkAuthorizationHeader;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.CLE_PRIVE);
      } catch (error) {
        error.message ="Echec de la connexion, token invalide!";
        error.status_Code=401;
        throw error;
      }
    if(!decodedToken){
        const error = new Error("Echec de la connexion!");
        error.status_Code=401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};