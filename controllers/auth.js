const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.register = async (req, res, next)=> {
    
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            const error = new Error('Erreur de validation, verifiez vos entrées');
            error.custom_status=422;
            error.data=errors.array();
            throw error;
        }
        const { email, password } = req.body;
        const existe = await User.findOne({ email: email });
            if(existe)
            {
                const error = new Error("Email dèjà utilisée, veuillez-vous connecter!");
                error.custom_status=401;
                throw error;
            }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
             email,
             password: hashedPassword,
            });
        const result = await user.save();
        if(result)
        {
            res.status(200).json({status_Code: 200, status_message: 'Utilisateur créé', data: req.body});
        }
        
    } catch (err) {
         next(err);
    }
    next();
};

exports.login = async (req, res, next)=> {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            const error = new Error('Erreur de validation, verifiez vos entrées');
            error.custom_status=422;
            error.data=errors.array();
            throw error;
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user)
        {
            const error = new Error("Utilisateur non inscrit ou email incorrect, veuillez-vous inscrire ou corriger votre email!");
            error.custom_status=401;
            throw error;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const error = new Error("Mot de passe incorrect, veuillez-vous rééssayer!");
            error.custom_status=401;
            throw error;
        }
        const token = jwt.sign({ userId: user._id.toString(), email: user.email }, 'ma_cle_prive', {expiresIn: "3h"});
        res.status(200).json({
            message: "Connexion effectuée avec succès",
            token: token,
            user: user
        });
    } catch (err) {
        next(err);
    }
    next();
};