import BaseService from "./base-service";
import { env } from "../helpers/env";

export default class WorkflowResultService extends BaseService {
  async getWorkflowResults(searchQuery, actionType, targetType) {
	var url = "/workflowResults/query";
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
      .post_auth("/workflowResults/export", searchQuery)
      .then((result) => {
        return result.data;
      });
    return data;
  }

  async setWorkflowResultFinal(id, isFinal) {
    var data = await super
      .patch_auth("/workflowResults/" + id + "?isFinal=" + isFinal, null)
      .then((result) => {
        return result.data;
      });
    return data;
  }
  
  async updateWorkflowResult(id, outputLabel) {
    var data = await super
      .patch_auth(
        "/workflowResults/" +
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
  
  // get symlink for primaryfile media
  async getMediaSymlink(primaryfileId) {
    const url = `/primaryfiles/${primaryfileId}/media`;
    var symlink = await super.get_auth(url).then((result) => {
      return result.data;
    });
    return symlink;
  }

  // get symlink for workflow result output
  async getOutputSymlink(id) {
    const url = `/workflowResults/${id}/output`;
    var symlink = await super.get_auth(url).then((result) => {
      return result.data;
    });
    return symlink;
  }

  // onclick event handler for media/output links:
  // get content of media or output based on forOutput boolean
  // note that this method is shared across multiple components.
  async getSymlinkContent(result, forOutput, event) {
    // get the link element being clicked
    let link = event.target;

    // only process the event when the link href hasm't been populated
    if (!link.href) {
      // get symlink URL via API call
      let symlink = ""
      if (forOutput) {
        symlink = await this.getOutputSymlink(result.id);
        console.log("workflowResultId = " + result.id + ", symlink = " + symlink)
      }
      else {
        symlink = await this.getMediaSymlink(result.primaryfileId);
        console.log("primaryfileId = " + result.primaryfileId + ", symlink = " + symlink)
      }
      
      // TODO handle error resposne

      // initialize the link URL and trigger a click to request the content
      link.href = symlink;
      link.click();
    }
    // otherwise do nothing and just let browser handle the link click
  }

  async deleteWorkflowResult(id) {
    await super.delete_auth(`/workflowResults/${id}`);
  }
}
