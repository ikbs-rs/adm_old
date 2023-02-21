import express, { request, response } from "express";
//import userController from "../../controllers/userController.js";

const router = express.Router();

// router.post("/register", userController.register);
// router.post("/login", userController.login);
// router.post("/logout", userController.logout);
// router.get("/", userController.getAll);
// router.get("/:id", userController.getById);
// router.put("/:id", userController.update);
// router.delete("/:id", userController.remove);

router.all("/*", () => {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
});

export default router;
