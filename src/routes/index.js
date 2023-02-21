import express from 'express'

import menu from './models/menu.js'
import module from './models/module.js'
import dbparametar from './models/dbparametar.js'

const router = express.Router();

router.use(express.json())

// Dohvatam iz URL-a, koju tabelu obradjujen jer se ona nalazi iza naziva modula
// Ovde je to .../adm/menu/... adm je modul a menu je tabela
router.use('/', (req, res, next) => {
  const urlParts = req.url.split("/");
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
