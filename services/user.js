const { UserModel } = require("../models");
const { regexString } = require("./common");

module.exports = {
    getUserByEmail: async(email) => {
        return await UserModel.findOne({email: regexString(email)});
    },
    createUser: async(data) =>{
        return await UserModel.create(data);
    },
    usersList: async(userId) => {
        return await UserModel.find({_id: {$nin: userId}}).select('_id username');
    }
}