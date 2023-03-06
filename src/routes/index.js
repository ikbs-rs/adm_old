import express from 'express'

import menu from './models/menu.js'
import module from './models/module.js'
import dbparametar from './models/dbparametar.js'

const router = express.Router();

router.use(express.json())


router.use('/', (req, res, next) => {
  const urlParts = req.url.split("/");
// Dohvatam iz URL-a, koju tabelu obradjujen i setuje --- req.objName ****** TABELU
// Ovde je to .../adm/menu/... adm je modul a menu je tabela
  req.objName = urlParts[2];
  next();
});

router.use('/adm/menu', menu)
router.use('/adm/module', module)
router.use('/adm/dbparametar', dbparametar)

router.use("/", (req, res, next) => {
  return res.status(403).send({ error: "Forbidden!!" });
  next();
})

export default router;
