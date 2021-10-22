class Env {
  constructor() {
    this.config = null
  }

  async fetchConfig() {
    if (this.config == null) {
      fetch("./config.json")
      .then((response) => response.json())
      .then((config) => {
        this.config = config
        console.log("Fetched config: VUE_APP_AMP_URL = " + this.config.VUE_APP_AMP_URL)
        return this.config
      })
    }
    else return this.config
  }

  getEnv(name) {
    if (this.config == null) {
      fetch("./config.json")
      .then((response) => response.json())
      .then((config) => {
        this.config = config
        console.log("Env.getEnv: fetched config from file: name = " + name + ", config = " + config[name])	
        return config[name] || process.env[name]
      })
    }
    else {
      console.log("Env.getEnv: already populated config: name = " + name + ", config = " + this.config[name])
      return this.config[name] || process.env[name]
    }

    // await this.fetchConfig().then(result=>{
    //   console.log("name = " + name, "config = " + this.config[name])	
    //   return this.config[name] || process.env[name]
    // })
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

export const env = new Env() 
