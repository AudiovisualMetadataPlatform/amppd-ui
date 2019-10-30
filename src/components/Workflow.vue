<template>
  <div class="workflow-content">
    <h1>Workflow Submission</h1>
    <div class="workflow-body">
      <div class="left-pane">
        <WorkflowSelection/>
        <WorkflowFiles/>
      </div>
      <div class="right-pane">
        <div>
          <h2>Workflow Node Parameters</h2>
          <div class="workflow-parameter-nodes">
            <div v-for="(node, index) in parameters" v-bind:key="index" class="node">
                  <div class="node-name">Node: {{node.nodeName}}</div>
                  <div class="parameters" v-for="(parameter, subindex) in node.params" v-bind:key="subindex" >
                    <span class="parameter-name">{{parameter.name}}</span> <input type="text" />
                  </div>
            </div>
          </div>
        </div>
        <div class="workflow-submit">
            <input v-on:click="submit" type="button" value="Submit" class="primary-button">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import WorkflowSelection from '@/components/WorkflowSelection.vue'
import WorkflowFiles from '@/components/WorkflowFiles.vue'
import { get, sync } from 'vuex-pathify'
export default {
  name: 'Workflow',
  components:{
    WorkflowSelection,
    WorkflowFiles
  },
  data(){
    return {
    }
  },
  computed:{
      parameters: sync('parameters')
  },
  props: {
  },
  methods:{
    addParameter(nodeName, name){
      let self = this;
      self.parameters.push({
        nodeName: nodeName,
        params:[{
          name: name,
          type: "text"
        }]
      });
    },
    submit(){
      console.log("Form submitted");
    }
  },
  mounted(){
    let self = this;
    self.addParameter("Silence Remove", "Silence Threshold");
    self.addParameter("Segmentation", "Segments to Remove");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  margin-top: 0;
}
.workflow-content{
  padding-top:20px;
}
.workflow-body{
  padding:25px 10px 10px 10px;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex: 50%;
  flex-wrap: wrap;
}
.workflow-parameter-nodes{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size:13px;
}
.left-pane{
  min-width:450px;
}
.right-pane{
  min-width:450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right-pane h2{
  text-align: left;
}
.workflow-submit{
  display:flex;
  justify-content: flex-end;
  margin: 40px 20px 0;
  align-items: flex-end;
}
.button-row{
  display:flex;
  justify-content: center;
}
.primary-button{
  padding:5px;
  min-width:100px;
}
.node-name{
  text-align: left;
  font-weight: 700;
}
.parameter-name{
  text-align: left;
}
.parameters{
  display:flex;
  padding-left: 30px;
  justify-content: space-between;
  width:400px;
  padding-top:10px;
}
.node{
  padding: 20px 0;
}
</style>
