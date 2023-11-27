const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL).then((result=>{
        if(result){
            console.log("Connexion à la base de donnée");
        }
    })).catch((err)=>{
        console.log("erreur de connexion à la base de donnée");
        console.log("l'erreur : ", err);
        process.exit();
    });
};

module.exports=connectDB;