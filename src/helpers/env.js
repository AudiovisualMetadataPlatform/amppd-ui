export const env = {
  getEnv(name) {
	  return this.$config[name] || process.env[name]	
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