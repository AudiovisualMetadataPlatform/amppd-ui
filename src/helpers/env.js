export const env = {

  getEnv(key) {
    let config = window.config
    // When page reloads config is set to "undefined", therefore check its value before reading key value pairs
    let value = config 
      ? config[key] || process.env[key] // Read value from process.env when value is "null" in config
      : process.env[key]
    return value
  },

  getDisableAuth() {
	  return process.env.VUE_APP_DISABLE_AUTH
  },

  getAmpUrl() {
	  return this.getEnv('VUE_APP_AMP_URL')
  },

  getGalaxyWorkflowUrl() {
	  return this.getEnv('VUE_APP_GALAXY_WORKFLOW_URL')
  },
}

