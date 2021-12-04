import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as workEntryController from "./controllers/issueController.js";
import * as requestUtils from "./utils/requestUtils.js";
import * as projectController from "./controllers/projectController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);
  
    if (url.pathname === "/" && request.method === "GET") {
      return requestUtils.redirectTo("/projects");
    } else if (url.pathname === "/projects" && request.method === "POST") {
      return await projectController.addProject(request);
    } else if (url.pathname === "/projects" && request.method === "GET") {
      return await projectController.viewProjects(request);
    } else if (url.pathname.match("projects/[0-9]+") && request.method === "GET") {
      return await projectController.viewProject(request);
    } else if (url.pathname.match("projects/[0-9]+/issues/[0-9]+") && request.method === "POST") {
      return await workEntryController.finishWorkEntry(request);
    } else if (url.pathname.match("projects/[0-9]+/issues") && request.method === "POST") {
      return await workEntryController.createWorkEntry(request);
    } else if (url.pathname.match("projects/[0-9]+") && request.method === "POST") {
      return await projectController.completeProject(request);
    } else {
      return new Response("Not found", { status: 404 });
    }
  };

  let port = 7777;
  if (Deno.args.length > 0) {
    const lastArgument = Deno.args[Deno.args.length - 1];
    port = Number(lastArgument);
  }
  
  listenAndServe(`:${port}`, handleRequest);