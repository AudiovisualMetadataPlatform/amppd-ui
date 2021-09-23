<template>
<div>
    <AmpHeader/>
    <Logout/>
    <div class="workflow-content">
      <div>
        <div class="header-row">
          <h2>Workflow Editor</h2>
          <div class="action-buttons">
            <input type="button" class="primary-button" v-on:click="onDone " value="Done"/>
          </div>
        </div>
        <iframe v-if="iframeUrl" class="" :src="iframeUrl" id="workflow-editor" width="1500" height="800" style="border:none;"></iframe>
      </div>
    </div>
    <!-- <modal v-if="showValidation" @close="modalDismiss">
      <h3 slot="header">{{validationHeader}}</h3>
      <div slot="body">
        {{validationErrors}}
      </div>
    </modal> -->
  </div>
</template>

<script>
import AmpHeader from '@/components/shared/Header.vue'
import Logout from '@/components/shared/Logout.vue'
import Modal from '@/components/shared/Modal.vue'

export default {
  name: 'WorkflowEditor',
  components:{
    AmpHeader,
    Logout,
    Modal,
  },
  data(){
    return {
      id: "",
      iframeUrl: "",
      responseHeader: "",
      responseBody: "",
      modalDismiss: null,
      showValidation: false,
    }
  },
  computed:{
  },
  methods:{
    getIframeUrl(id) {
      return process.env.VUE_APP_GALAXY_WORKFLOW_URL + id
    },
    async onDone() {
      // validate workflow saved in Galaxy for AMP workflow submission
      console.log("Validating workflow after saved to Galaxy: " + this.id);
    },
  },
  mounted(){
    this.id = this.$route.query.id
    this.iframeUrl = this.getIframeUrl(id)
    console.log("workflowId = " + this.id + ", iframeUrl = " + this.iframeUrl);
  },
}
</script>

<style scoped>
h2, h3{
  margin-left: 10px;
  margin-top: 2px;
  max-height: 50px;
}
.workflow-content{
  padding-top:0px;
  display: flex;
  flex-direction: column;
}
.header-row{
  display:flex;
  justify-content: space-between;
  max-height: 50px;
}
.action-buttons{
  display: flex;
}
.primary-button{
    float: right;
    background-color: #E9972D;
    color: #2C5B7F;
    font: bolder;
    padding: 5px 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
    font-size: 12px;
}
</style>