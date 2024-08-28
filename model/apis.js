import mongoose from "mongoose";

const apisSchema = new mongoose.Schema({

    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },

    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }

});


const apis = mongoose.model("apis", apisSchema);

export default apis;