// importujemo pool iz fajla za konekciju sa bazom
import pool from '../db/db.js';

// funkcija koja vraća slog iz tabele rolepermiss
// za dati objName i par1
export const getRolePermission = async (objName, par1) => {
  try {
    const query = 'SELECT * FROM rolepermiss WHERE objname=$1 AND par1=$2';
    const params = [objName, par1];
    const { rows } = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    throw new Error(`Greška pri dohvatanju sloga iz baze: ${error.message}`);
  }
};

// funkcija koja vraća slog iz tabele rolepermiss
// za dati objName i par2
export const getModulePermission = async (objName, par2) => {
  try {
    const query = 'SELECT * FROM rolepermiss WHERE objname=$1 AND par2=$2 AND par1=$3';
    const params = [objName, par2, 1];
    const { rows } = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    throw new Error(`Greška pri dohvatanju sloga iz baze: ${error.message}`);
  }
};
