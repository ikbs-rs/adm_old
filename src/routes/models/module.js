import express from "express";
import abstructController from "../../controllers/abstructController.js";

const router = express.Router();

router.use("/", (req, res, next) => {
  const urlParts = req.url.split("/");
  req.objName2 = urlParts[1];

  router.get("/", abstructController.getAll);
  router.get("/:id", abstructController.getById);
  router.post("/", abstructController.add);
  router.put("/", abstructController.update);
  router.delete("/:id", abstructController.remove);

  req.objItem = urlParts[2];
  router.get(`/get/${req.objItem}/:id`, abstructController.getItem);
  router.put(`/set/${req.objItem}`, abstructController.setItem);
  //   Mora se proslediti sledeci json za seter *********** {"id": 1627113837566496768, "value": 1} *******
  next();
});

export default router;
