import BaseService from "./base-service";
import { env } from "../helpers/env";

export default class WorkflowResultService extends BaseService {
  async getWorkflowResults(searchQuery, actionType, targetType) {
	var url = "/workflow-results/query";
	if (actionType && targetType) {
		url = url + "?actionType=" + actionType + "&targetType=" + targetType;
	}	
    var data = await super
      .post_auth(url, searchQuery)
      .then((result) => {
        return result.data;
      });
    return data;
  }

  async getWorkflowFilters() {
    var data = await super.get_auth("/workflow-filters").then((result) => {
      return result.data;
    });
    return data;
  }

  async exportWorkflowResults(searchQuery) {
    var data = await super
      .post_auth("/workflow-results/export", searchQuery)
      .then((result) => {
        return result.data;
      });
    return data;
  }
  async setWorkflowResultFinal(id, isFinal) {
    var data = await super
      .patch_auth("/workflow-results/" + id + "?isFinal=" + isFinal, null)
      .then((result) => {
        return result.data;
      });
    return data;
  }
  async updateWorkflowResult(id, outputLabel) {
    var data = await super
      .patch_auth(
        "/workflow-results/" +
          id +
          "?outputLabel=" +
          outputLabel +
          "&isFinal=true"
      )
      .then((result) => {
        return result.data;
      });
    return data;
  }

  async getSourceLink(primaryfileId) {
    const url = `/primaryfiles/${primaryfileId}/media`;
    var symlink = await super.get_auth(url).then((result) => {
      return result.headers['location'];
    });
    return symlink;
  }
  
  async getSourceUrl(primaryfileId) {
    const url = `/primaryfiles/${primaryfileId}/media`;
    var content = await super.get_auth(url).then((result) => {
      return result.data;
    });
    return content;
  }

  async getOutputUrl(id) {
    const url = `/workflow-results/${id}/output`;
    var content = await super.get_auth(url).then((result) => {
      return result.data;
    });
    return content;
  }

  async deleteWorkflowResult(id) {
    await super.delete_auth(`/workflow-results/${id}`);
  }
}
