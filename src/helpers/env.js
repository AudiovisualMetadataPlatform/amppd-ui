function fetchConfig() {
  fetch("./config.json")
  .then((response) => response.json())
  .then((data) => {
    const config = data
    console.log("config.VUE_APP_AMP_URL = " + config.VUE_APP_AMP_URL)
  })
  return config
}

const config = fetchConfig()

const env = {

  getEnv(name) {
    console.log("name = " + name, "config = " + config[name])	
    return config[name] || process.env[name]
	  // return process.env[name]	
  },

  getDisableAuth() {
	  return process.env.VUE_APP_DISABLE_AUTH
  },

  getAmpUrl() {
	  return this.getEnv('VUE_APP_AMP_URL')
  },

  getAmpUnit() {
	  return this.getEnv('VUE_APP_AMP_UNIT')
  },

  getGalaxyWorkflowUrl() {
	  return this.getEnv('VUE_APP_GALAXY_WORKFLOW_URL')
  }

}

export {config, env}