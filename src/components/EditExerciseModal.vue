<template>
	<transition name="fade-shrink-in" appear>
		<modal-wrapper
			@close="$emit('close')"
			class="text-gray-900"
		>

			<h2 class="font-bold text-xl pb-2">Edit Exercise</h2>

			<input
        class="font-medium outline-none border-b-2 border-gray-300 focus:border-indigo-500 w-full p-3 mt-4 mb-2"
				v-model="name"
        placeholder="Name"
        type="text"
        ref="exerciseName"
        minlength="3"
        maxlength="80"
        required
      >

			<div class="w-full flex justify-end">
				<button @click="$emit('close')" class="text-sm font-semibold pt-3 px-3">
	        CANCEL
	      </button>

				<button @click="$emit('edit', name)" class="text-sm font-semibold pt-3 px-3">
	        SAVE
	      </button>
			</div>

		</modal-wrapper>
	</transition>
</template>

<script>
	import ModalWrapper from './ModalWrapper'

	export default{
		components: {
      ModalWrapper
    },

    props: ['exerciseName', 'open'],

    data() {
    	return {
    		name: this.exerciseName
    	}
    },

    watch: {
    	open(newVal) {
    		if (newVal) this.$refs.exerciseName.focus()
    	}
    }
	}
</script>