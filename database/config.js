const mongoose = require('mongoose');


const connectionDb = async () => {
    console.log(process.env.MONGODB);
    try {

        

        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

            console.log("Base de datos online");

    } catch (error) {
        console.log("error", error);
        throw new Error('Error en inciar la bd')
    }

}

module.exports = connectionDb