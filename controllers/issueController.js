import * as workEntryService from "../services/projectIssueService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createWorkEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const form = await request.formData()
  await workEntryService.createWorkEntry(urlParts[2], form.get("description"));

  return requestUtils.redirectTo(`/projects/${urlParts[2]}`);
};

const finishWorkEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await workEntryService.finishWorkEntry(urlParts[4]);

  return requestUtils.redirectTo(`/projects/${urlParts[2]}`);
};

export { createWorkEntry, finishWorkEntry };