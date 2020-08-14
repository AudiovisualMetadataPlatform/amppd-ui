<template>
   <div class="container col-12">
    <loader :show="workflowSubmission.loading"/>
   <div class="row expand-h">
   <Sidebar/>
   <div class="col-10 bg-light-gray-1">
   <main class="main-margin-min">
      <Logout/>
      <div class="pad-all-3">
      <div class="card">
      <div class="card-body">
      <div class="container-fluid">
         <div class="row">
            <SelectFiles/>
            <SelectWorkflow/>
         </div>
      </div></div></div></div>
   </main>
   </div>
   </div>
   </div>
</template>
<script>
   import { sync } from 'vuex-pathify'
   import Sidebar from '@/components/navigation/Sidebar.vue';
   import SelectFiles from '@/components/workflow/SelectFiles.vue';
   import SelectWorkflow from '@/components/workflow/SelectWorkflow.vue';
   import Loader from '@/components/shared/Loader.vue';
   import Logout from '@/components/shared/Logout.vue'
   
   export default {
     name: 'Workflow',
     components:{
       SelectFiles,
       SelectWorkflow,
       Sidebar,
       Loader,
       Logout
     },
    computed:{
      workflowSubmission: sync('workflowSubmission')
    }
   }
</script>