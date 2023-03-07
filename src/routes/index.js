import express from 'express'

import abstruct from './models/abstruct.js'
import { checkPermissions } from '../middleware/utilityHttp.js'

const router = express.Router();

router.use(express.json())


router.use('/', (req, res, next) => {
  const urlParts = req.url.split("/");
// Dohvatam iz URL-a, koju tabelu obradjujen i setuje --- req.objName ****** TABELU
// Ovde je to .../adm/menu/... adm je modul a menu je tabela
  req.objName = urlParts[2];
  next();
});

router.use('/adm/menu', checkPermissions(), abstruct)
router.use('/adm/module', checkPermissions, abstruct)
router.use('/adm/dbparameter', checkPermissions, abstruct)
router.use('/adm/message', checkPermissions, abstruct)
router.use('/adm/dbmserr', checkPermissions, abstruct)
router.use('/adm/kordomensifra', checkPermissions, abstruct)

router.use("/", (req, res, next) => {
  return res.status(403).send({ error: "Forbidden!!" });
  next();
})

export default router;
