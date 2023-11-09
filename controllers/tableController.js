const tableModel = require("../database/tables");
const express = require("express");
const router = express.Router();

class Table {
  constructor(capacity, restaurantId, type) {
    this.capacity = capacity;
    this.restaurantId = restaurantId;
    this.type = type;
  }

  async createTable() {
    try {
      const newTable = await tableModel.CreateTable(
        this.capacity,
        this.restaurantId,
        this.type
      );
      return { message: "Table created successfully", table: newTable };
    } catch (error) {
      return { message: error.message };
    }
  }
}

class DiningTable extends Table {
    constructor(capacity, restaurant_id) {
        super(capacity, restaurant_id, "dining");
    }
}

class BarTable extends Table {
    constructor(capacity, restaurant_id) {
        super(capacity, restaurant_id, "bar");
    }
}

class CoffeeTable extends Table {
    constructor(capacity, restaurant_id) {
        super(capacity, restaurant_id, "coffee");
    }
}

router.post("/create/dining", async (req, res) => {
    try {
        const { capacity, restaurant_id } = req.body;
    
        if (!capacity || !restaurant_id) {
        return res
            .status(422)
            .json({ message: "Please fill all the required details" });
        }
    
        const newTable = new DiningTable(capacity, restaurant_id);
        const response = await newTable.createTable();
        if (response.message) {
        return res.status(201).json(response);
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    })
router.post("/create/bar", async (req, res) => {
    try {
        const { capacity, restaurant_id } = req.body;
    
        if (!capacity || !restaurant_id) {
        return res
            .status(422)
            .json({ message: "Please fill all the required details" });
        }
    
        const newTable = new BarTable(capacity, restaurant_id);
        const response = await newTable.createTable();
        if (response.message) {
        return res.status(201).json(response);
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    })
router.post("/create/cafe", async (req, res) => {
    try {
        const { capacity, restaurant_id } = req.body;
    
        if (!capacity || !restaurant_id) {
        return res
            .status(422)
            .json({ message: "Please fill all the required details" });
        }
    
        const newTable = new CoffeeTable(capacity, restaurant_id);
        const response = await newTable.createTable();
        if (response.message) {
        return res.status(201).json(response);
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    })

module.exports = router;