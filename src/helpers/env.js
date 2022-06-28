export const env = {

  getEnv(key) {
    let config = window.config
    let value = config[key] || process.env[key]
    console.log(`Env.getEnv: config[${key}] = ${config[key]}, return value = ${value}`)
    return value
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
  },
}

