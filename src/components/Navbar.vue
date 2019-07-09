<template>
	<div class="bg-white text-black shadow-md p-3 mb-4">
		<div class="container mx-auto flex justify-between items-center">

			<div class="flex items-center">
				<router-link class="text-white flex mr-4" v-show="this.$route.params.id" to="/">
					<img src="../assets/img/arrow.svg" alt="go back">
				</router-link>

				<h2 class="text-xl font-bold p-1">{{ title }}</h2>
			</div>

			<slot></slot>

		</div>
	</div>
</template>

<script>
	export default {
		props: ['title']
	}
</script>