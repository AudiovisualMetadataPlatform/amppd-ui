export default class Env {
  static myconfig() {} 

  getEnv(name) {
    console.log("name = " + name, "config = " + this.config[name])	
    return this.config[name] || process.env[name]
	  // return process.env[name]	
  }

  getDisableAuth() {
	  return process.env.VUE_APP_DISABLE_AUTH
  }

  getAmpUrl() {
	  return this.getEnv('VUE_APP_AMP_URL')
  }

  getAmpUnit() {
	  return this.getEnv('VUE_APP_AMP_UNIT')
  }

  getGalaxyWorkflowUrl() {
	  return this.getEnv('VUE_APP_GALAXY_WORKFLOW_URL')
  }

}