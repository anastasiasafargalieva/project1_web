import { executeQuery } from "../database/database.js";

const createWorkEntry = async (project_id, description="") => {
  await executeQuery(
    "INSERT INTO project_issues  (project_id, description) VALUES ($1, $2);",
    project_id,
    description
  );
};

const findCurrentWorkEntry = async (project_id) => {
  let result = await executeQuery(
    "SELECT * FROM project_issues WHERE project_id = $1;",
    project_id,
  );

  if (result.rows && result.rows.length > 0) {
    return result.rows;
  }

  return []
};

const finishWorkEntry = async (id) => {
  await executeQuery(
    "DELETE from project_issues  WHERE id = $1;",
    id,
  );
};


export {
  createWorkEntry,
  findCurrentWorkEntry,
  finishWorkEntry,
};