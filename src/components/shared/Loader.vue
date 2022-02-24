<template>
	<div class="load-wrapper" v-show="show" v-on:click.prevent="">
		<div class="load-overlay">
			<i class="fas fa-cog fa-spin"></i>
			<div>{{ message }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loader',
		props: {
			show: {
				
			},
			message: {
				default: "Please Wait..."
			}
		}
	}
</script>

<style scoped>
	.load-wrapper {
		position: fixed;
		top: 0; right: 0; bottom: 0; left: 0;
		z-index: 10000;
	}
	.load-overlay {
		background: rgba(0,0,0,0.4) !important;
		border-radius: 9px;
		color: #FFF;
		width: 150px !important;
		padding: 20px 0 !important;
		position: fixed !important;
		top: 50%;
		left: 43%;
		margin: -100px 40px;
		text-align: center;
		border: none !important;
		box-shadow: none !important;
    }
    .load-overlay i.fas {
			font-size: 80px;
    }
    .load-overlay
		> div {
			font-size: 17px;
        }
    .load-overlay{
		@media screen and (max-width: 690px) {
			margin: -100px -75px;
		}
    }
</style>