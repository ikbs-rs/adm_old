import {
  getRolePermission,
  getModulePermission,
} from "../../models/Rolepermiss.js";
import { getUserPermission } from "../../models/Userpermiss.js";

// funkcija za proveru dozvola korisnika
export const proveraDozvola = (par1 = "default1", par2 = "default2") => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const objName = req.objName;
      let OK = false;
      let role = null;
      if (par2 === "default2") {
        // provera rolepermiss za objName i par1
        const rolePermission = await getRolePermission(objName, par1);
        if (rolePermission) {
          OK = true;
          role = rolePermission.role;
        } else {
          // provera rolepermiss za objName i par1 = 1
          const modulePermission = await getModulePermission(objName, 1);
          if (modulePermission) {
            OK = true;
            role = modulePermission.role;
          }
        }
      } else {
        // provera rolepermiss za objName = par2 i par1 = 1
        const modulePermission = await getModulePermission(objName, 1, par2);
        if (modulePermission) {
          OK = true;
          role = modulePermission.role;
        }
      }

      if (OK) {
        // provera userpermiss za userId i role
        const userPermission = await getUserPermission(userId, role);
        if (userPermission) {
          next();
        } else {
          return res
            .status(401)
            .json({ message: "Nemate pravo pristupa ovom resursu." });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Nemate pravo pristupa ovom resursu." });
      }
    } catch (error) {
      return res.status(error.response?.status || 500).json({
        message: error.message || "Internal Server Error",
        data: error.response?.data || {},
      });
    }
  };
};

export const checkPermissions = (par1 = "default1", par2 = "default2") => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // korisnički nalog
      const objName = req.objName; // objekat koji se proverav
      // ovde dodajte logiku za proveru prava korisnika
      if (await proveraDozvola(userId, objName, par1, par2)) {
        // na kraju prosledite sledećem middleware-u
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Nemate pravo pristupa ovom resursu." });
      }
    } catch (error) {
      // u slučaju greške, vraćamo objekat sa informacijama o grešci
      return res.status(error.response?.status || 500).json({
        message: error.message || "Internal Server Error",
        data: error.response?.data || {},
      });
    }
  };
};

/*
const proveraDozvola1 = (
    userId,
    objName,
    par1 = "default1",
    par2 = "default2"
  ) => {
    return async (req, res, next) => {
      try {
        const OK = false;
        // ovde dodajte logiku za proveru prava korisnika
        return OK;
      } catch (error) {
        // u slučaju greške, vraćamo objekat sa informacijama o grešci
        return res.status(error.response?.status || 500).json({
          message: error.message || "Internal Server Error",
          data: error.response?.data || {},
        });
      }
    };
  };
*/  