const { Service: ServiceModel } = require("../models/Service");

const UserModel = require("../models/User");

const serviceController =
{
    create: async (req, res) => {
        try
        {
            const service =
            {
                title: req.body.title,
                author: req.body.author,
                author_id: req.body.author_id,
                description: req.body.description,
                price: req.body.price,
                type: req.body.type,
                status: 0,
                rating: 0,
            };
            const user = await UserModel.findOne({ username: req.body.author });

            if (!user) {
                res.status(404).json({ msg: "Author not found." });
                return;
            }

            const response = await ServiceModel.create(service);
            
            const ownServices = user.ownServices;
            ownServices.push(response._id);
            
            const userWithUpdatedServices =
            {
                ownServices: ownServices,
            };
            
            let updatedUser = await UserModel.findByIdAndUpdate(user.id, userWithUpdatedServices, {new:true});

            res.status(201).json({ updatedUser, msg: "Service created successfully" });
        }
        catch (error) {
            console.log("aqui");
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find();
            res.json(services);
        }
        catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);

            if (!service) {
                res.status(404).json({ msg: "Service not found." });
                return;
            }

            res.json(service);
        }
        catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);

            if (!service) {
                res.status(404).json({ msg: "Service not found." });
                return;
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id)

            res.status(200).json({ deletedService, msg: "Service deleted successfully." });
        }
        catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            const service =
            {
                title: req.body.title,
                author: req.body.author,
                author_id: req.body.author_id,
                description: req.body.description,
                price: req.body.price,
                type: req.body.type,
                status: req.body.status,
                actor: req.body.actor,
                rating: req.body.rating,
            };

            const updatedService = await ServiceModel.findByIdAndUpdate(id, service, { new: true });

            if (!updatedService) {
                res.status(404).json({ msg: "Service not found." });
                return;
            }

            res.status(200).json({ updatedService, msg: "Service updated successfully." });
        }
        catch (error) {
            console.log(error);
        }
    }
};

module.exports = serviceController;