import dataModel from "../models/Menu.js";


const getMenu = async (req, res) => {
  try {
    const items = await dataModel.findMenu(req.params.module);
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske c: ", error: err.message });
  }
};


export default {
  getMenu,
};
