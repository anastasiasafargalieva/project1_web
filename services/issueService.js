import { executeQuery } from "../database/database.js";

const create = async (project_id, content) => {
  await executeQuery("INSERT INTO project_issues (project_id, content) VALUES ($1, $2);", project, content);
};

/*const findAllProjects = async () => {
  let result = await executeQuery(
    "SELECT * FROM project_issues;",
  );
  return result.rows;
};

const findById = async (id) => {
  let result = await executeQuery(
      "SELECT * FROM project_issues WHERE id=$1;",
      id,
    );
    return result.rows;
};*/

const findByProject = async (project_id) => {
  let result = await executeQuery(
      "SELECT * FROM project_issues WHERE project_id=$1;",
      project_id,
    );
    return result.rows;
};

const deleteById = async (id) => {
  let result = await executeQuery(
      "DELETE FROM project_issues WHERE id = $1;",
      id,
    ); 
    return result.rows;
};

export { create, findByProject, deleteById };

/*
const remove = async (id) => {
  await executeQuery("DELETE FROM projects WHERE WHERE id = $1;", id);
};*/
