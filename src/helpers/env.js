class Env {

  async fetchConfig() {
    if (this.config == null) {
      console.log("Env.fetchConfig: before fetch")
      this.config = await fetch("./config.json").then((response) => response.json())
      console.log("Env.fetchConfig: fetched config from file: VUE_APP_AMP_URL = " + this.config.VUE_APP_AMP_URL)	    
    }
    else {
      console.log("Env.fetchConfig: already populated config: VUE_APP_AMP_URL = " + this.config.VUE_APP_AMP_URL)	 
    }
    return this.config
  }

  getEnv(key) {
    let config = window.config
    let value = config[key] || process.env[key]
    console.log(`Env.getEnv: config[${key}] = ${config[key]}, return value = ${value}`)
    return value
  }

  // getEnv(key) {
  //   if (this.config == null) {
  //     console.log("Env.getEnv: start")
  //     fetch("./config.json")
  //     .then((response) => response.json())
  //     .then((config) => {
  //       this.config = config
  //       let value = config[key] || process.env[key]
  //       console.log(`Env.getEnv: fetched config from file, config[${key}] = ${config[key]}, return value = ${value}`)	
  //       return value
  //     })
  //   }
  //   else {
  //     let value = this.config[key] || process.env[key]
  //     console.log(`Env.getEnv: already populated config, key = ${key}, return value = ${value}`)
  //     return value
  //   }
  // }

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
