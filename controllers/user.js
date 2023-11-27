const User = require('../models/User');

exports.getUsers = async (req, res, next)=> {
    
    try {
        const user = await User.find({}, '-password');
        if(!user)
        {
            const error = new Error("Aucun utilisateur trouvé!");
            error.custom_status=401;
            throw error;
        }else
        {
            res.status(200).json({status_Code: 200, status_message: 'Liste des utilisateurs', data: user});
        }
        
    } catch (err) {
         err.custom_status=500;
         next(err);
    }
    next();
};
