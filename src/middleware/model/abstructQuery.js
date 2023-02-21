
/**
 !!!!! VAZNO!!!!! Za sada ne parametrizujem navodnike u odnosu na RDBMS valjda svi postuju ANSI standard za dvostruke 
 **/
 const getInsertQuery = (objName, objData) => {
  const insertFields = [];
  const insertValues = [];

  for (const [key, value] of Object.entries(objData)) {
    if (value !== null && value !== '' && value !== undefined) {
      insertFields.push(key);
      insertValues.push(typeof value === 'string' ? `"${value}"` : value);
    }
  }

  const fieldsStr = insertFields.join(', ');
  const valuesStr = insertValues.join(', ');

  const insertQuery = `INSERT INTO ${objName} (${fieldsStr}) VALUES (${valuesStr})`;
  
  return insertQuery;
};


const getUpdateQuery = (objName, objData) => {
    let updateQuery = `UPDATE ${objName} SET `
    for (const key in objData) {
      if (objData[key] !== null) {
        const value = typeof objData[key] === 'string' ? `"${objData[key]}"` : objData[key];
        updateQuery += `${key}=${value},`
      } else {
        updateQuery += `${key}=NULL,`
      }
    }
    updateQuery = updateQuery.slice(0, -1) + ` WHERE id = ${objData.id}`
    return updateQuery
  }
  
export default {
  getInsertQuery,
  getUpdateQuery
}
