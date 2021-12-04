import { executeQuery } from "../database/database.js";

const create = async (name) => {
    await executeQuery("INSERT INTO projects (name) VALUES ($1);", name);
  };
  
  const findAll = async () => {
    let result = await executeQuery(
      "SELECT * FROM projects;",
    );
    return result.rows;
  };
  
  const findById = async (id) => {
      let result = await executeQuery(
          "SELECT * FROM projects WHERE id=$1;",
          id,
        );
        return result.rows;
  }
  
  const deleteById = async (id) => {
      let result = await executeQuery(
          "DELETE FROM projects WHERE id = $1;",
          id,
        ); 
        return result.rows;
  }
  
  export { create, findAll, findById, deleteById };