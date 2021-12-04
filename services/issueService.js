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

const calculateTotalTime = async (project_id) => {
    let result = await executeQuery(
      `SELECT SUM(finished_on - started_on) AS total_time
        FROM project_issues 
        WHERE project_id = $1
          AND finished_on IS NOT NULL`,
      project_id,
    );
  
    if (result.rows && result.rows[0] && result.rows[0].total_time) {
      return result.rows[0].total_time;
    }
  
    return 0;
  };

export {
  createWorkEntry,
  findCurrentWorkEntry,
  finishWorkEntry,
  calculateTotalTime,
};