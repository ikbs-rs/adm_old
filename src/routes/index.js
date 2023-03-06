import express from 'express'

import abstruct from './models/abstruct.js'
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

router.use('/adm/menu', abstruct)
router.use('/adm/module', abstruct)
router.use('/adm/dbparameter', abstruct)
router.use('/adm/message', abstruct)
router.use('/adm/dbmserr', abstruct)
router.use('/adm/kordomensifra', abstruct)

router.use("/", (req, res, next) => {
  return res.status(403).send({ error: "Forbidden!!" });
  next();
})

export default router;
