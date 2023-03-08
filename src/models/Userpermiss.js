// importujemo pool iz fajla za konekciju sa bazom
import pool from '../db/db.js';

// funkcija koja vraća slog iz tabele userpermiss
// za dati userId i roleId
export const getUserPermission = async (userId, roleId) => {
  try {
    const query = 'SELECT * FROM userpermiss WHERE userid=$1 AND roleid=$2';
    const params = [userId, roleId];
    const { rows } = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    throw new Error(`Greška pri dohvatanju sloga iz baze: ${error.message}`);
  }
};
