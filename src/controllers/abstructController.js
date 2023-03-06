import { uniqueId } from "../middleware/utility.js";
import abstractModel from "../models/Abstruct.js";
import abstructQuery from "../middleware/model/abstructQuery.js"


const getAll = async (req, res) => {
  try {
    const items = await abstractModel.find(req.objName);
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske c:", error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const item = await abstractModel.findById( req.objName, req.params.id);
    res.status(200).json({ item }); 
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const add = async (req, res) => {
  try {
    const objData = req.body
    objData.id = await uniqueId()
    const sqlQuery = await abstructQuery.getInsertQuery(req.objName, objData)
    const items = await abstractModel.add(sqlQuery);
    res.status(201).json({ message: "Stavka je kreirana", objData });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske ca:", error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const objData = req.body
    const sqlQuery = await abstructQuery.getUpdateQuery(req.objName, objData)    
    const item = await abstractModel.update(sqlQuery);
    res.status(200).json({ message: "Stavka mrnija uspesno izmenjena", item });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske c: ", error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await abstractModel.remove(req.objName, req.params.id);
    res.status(200).json({ message: "Stavka menija uspesno obrisana", item });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske c: ", error: err.message });
  }
};

/******************************** */
const getItem = async (req, res) => {
  try {
    const item = await abstractModel.findItem(req.objName, req.objItem, req.params.id);
    res.status(200).json({ item });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const setItem = async (req, res) => {
 try {
    const item = await abstractModel.setItem(req.objName, req.objItem, req.body);
    res.status(200).json({ message: "Item uspesno setovan", item });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske c: ", error: err.message });
  }
};

export default {
  add,
  getAll,
  getById,
  update,
  remove,
  getItem,
  setItem,
};
