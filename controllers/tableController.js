const tableModel = require("../database/tables");
const express = require("express");
const router = express.Router();

class AbstractTable {
  constructor(capacity, restaurantId, type) {
    if (new.target === AbstractTable) {
      throw new Error("Cannot instantiate abstract class");
    }

    this.capacity = capacity;
    this.restaurantId = restaurantId;
    this.type = type;
  }

  async createTable() {
    throw new Error("Abstract method 'createTable' must be implemented");
  }
}

class DiningTable extends AbstractTable {
  constructor(capacity, restaurant_id) {
    super(capacity, restaurant_id, "dining");
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

class BarTable extends AbstractTable {
  constructor(capacity, restaurant_id) {
    super(capacity, restaurant_id, "bar");
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

class CoffeeTable extends AbstractTable {
  constructor(capacity, restaurant_id) {
    super(capacity, restaurant_id, "coffee");
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
});

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
});

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
});

module.exports = router;
