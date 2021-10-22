class Env {
  constructor() {
    this.config = null
  }

  getEnv(key) {
    if (this.config == null) {
      fetch("./config.json")
      .then((response) => response.json())
      .then((config) => {
        this.config = config
        let value = config[key] || process.env[key]
        console.log(`Env.getEnv: fetched config from file, config[${key}] = ${config[key]}, return value = ${value}`)	
        return value
      })
    }
    else {
      let value = this.config[key] || process.env[key]
      console.log(`Env.getEnv: already populated config, key = ${key}, return value = ${value}`)
      return value
    }
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

export const env = new Env() 
