<template>  
	<div class="modal-backdrop">
		<div class="modal">
    <div class="modal-header">
				<slot name="header">
				
        </slot>
    </div>
			<section class="modal-body">
				<slot name="body">
				
        </slot>
      </section>
      <div class="modal-footer">
        <slot name="footer">
          <button type="button"  @click="close()">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>


<script scoped>
export default {
    name: 'modal',
    data() {
      return {
        };
    },
    computed:{
    },
    methods: {
      close() {
        this.searchWord = '';
        this.$emit('close');
      }
    }
};
</script>

<style>

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;     
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 500px;
    
    display:flex;
    flex-direction: column;
    justify-content: space-between;
  
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

    /* Full-width inputs */
  input[type=text] {
    padding: 10px 10px;
    margin: 10px;
    border: 0px solid #ccc;
    width: 75%
  }
  .modal-footer{
    display:flex;
    justify-content: flex-end;
  }
  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bolder;
    padding: 10px 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
  }
  .left-align-row {
    text-align: left;
    padding: 0px 10px;
    margin: 10px;
  }
</style>