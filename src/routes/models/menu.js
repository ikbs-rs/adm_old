import express from "express";
import menuController from "../../controllers/menuController.js";

const router = express.Router();

router.get("/:module", menuController.getMenu);

export default router;

/**  Da ne zaboravi kada hocu da se igram u samom ruteru, a da mi controler ne vraca RES
 * 
 router.get("/", async (req, res) => {
  const urlParts = req.url.split("/");
  const menu = urlParts[2];
  try {
    const items = await menuController.getAll(menu);
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 * 
 */
