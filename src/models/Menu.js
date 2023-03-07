import db from "../db/db.js";
import { unflatten } from "../middleware/utility.js";

//find Menu function
const findMenu = async (module) => {
  const [rows] = await db.query(
    "SELECT * FROM menu WHERE module = ? ORDER BY id ASC",
    [module]
  );
  const menuData = unflatten(rows);
  return menuData;
};

export default {
  findMenu,
};
