const restaurant = require("../database/restaurant");

const createRestaurant = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
    
        if (!name || !address || !phone) {
        return res
            .status(422)
            .json({ message: "Please fill all the required details" });
        }
    
        const newRestaurant = await restaurant.CreateRestaurant(
        name,
        address,
        phone
        );
        if (newRestaurant) {
        return res
            .status(201)
            .json({ message: "Restaurant created successfully", restaurant: newRestaurant });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    };

    const getAllRestaurant = async (req, res) => {
        try {
          const allRestaurant = await restaurant.GetAllRestaurant();
          if (allRestaurant) {
            return res.status(201).json({ restaurant: allRestaurant });
          }
        } catch (error) {
          console.error("Error:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      };

module.exports = {createRestaurant, getAllRestaurant};