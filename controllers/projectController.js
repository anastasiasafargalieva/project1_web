import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectService from "../services/projectService.js";
import * as workEntryService from "../services/projectIssueService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addProject = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await projectService.create(name);

  return requestUtils.redirectTo("/projects");
};

const viewProject = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const project = await projectService.findById(urlParts[2]);
    const issues =  await workEntryService.findCurrentWorkEntry(urlParts[2]);
    const data = {
      project ,
      issues
    };
  
    return new Response(await renderFile("project.eta", data), responseDetails);
  };

const viewAllProjects = async (request) => {
  const data = {
    projects: await projectService.findAllNonCompletedprojects(),
  };

  return new Response(await renderFile("projects.eta", data), responseDetails);
};

const completeProject = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await projectService.completeById(urlParts[2]);
  
    return await requestUtils.redirectTo("/projects");
  };

export { addProject, viewProject, viewAllProjects, completeProject };