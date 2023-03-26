const UserModel = require("../models/User");

const userController = 
{
    create: async(req, res) =>
    {
        try
        {
            const user =
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profilePicture: req.body.profilePicture,
                services: req.body.services,
                balance: req.body.balance,
            };
            
            const response = await UserModel.create(user);

            res.status(201).json({response, msg: "User created successfully"});
        }
        catch (error)
        {
            console.log(error);    
        }
    },

    getAll: async(req, res) =>
    {
        try
        {
            const users = await UserModel.find();
            res.json(users);
        }
        catch (error)
        {
            console.log(error);
        }
    },

    get: async(req, res) =>
    {
        try
        {
            const username = req.params.username;
            const user = await UserModel.findOne(username)
            
            if (!user)
            {
                res.status(404).json({msg: "User not found."});
                return;
            }

            res.json(user);
        }
        catch (error)
        {
            console.log(error);
        }
    },

    delete: async(req, res) =>
    {
        try
        {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            
            if (!user)
            {
                res.status(404).json({msg: "User not found."});
                return;
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)

            res.status(200).json({deletedUser: "User deleted successfully."});
        }
        catch (error)
        {
            console.log(error);
        }
    },

    update: async(req, res) =>
    {
        try
        {
            const id = req.params.id;

            const user =
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profilePicture: req.body.profilePicture,
                balance: req.body.balance,
            };

            const updatedUser = await UserModel.findByIdAndUpdate(id, user);
            
            if (!updatedUser)
            {
                res.status(404).json({msg: "User not found."});
                return;
            }

            res.status(200).json({user, msg: "User updated successfully."});
        }
        catch (error)
        {
            console.log(error);
        }
    },
};

module.exports = userController;