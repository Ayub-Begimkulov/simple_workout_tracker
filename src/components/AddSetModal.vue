<template>
  <transition name="fade-shrink-in" appear>
    <modal-wrapper
      @close="close"
      class="text-gray-900"
    >
      <h2 class="font-bold text-xl mb-4">Add new set</h2>

      <span class="w-full font-bold text-left">Weight</span>
      <div class="flex items-center">
				<button
          @click="weight--"
          class="bg-gray-500 flex justify-center items-center shadow rounded w-12 h-12"
        >
          <img src="../assets/img/minus.svg" alt="add button">
        </button>

				<input
					class="block shadow-mdTopBottom outline-none font-bold text-center text-2xl focus:shadow-outline rounded w-24 h-12 p-2 m-4"
					v-model="weight"
          ref="weight"
					type="number"
				>

				<button
          @click="weight++"
          class="bg-blue-600 flex justify-center items-center shadow rounded w-12 h-12"
        >
          <img src="../assets/img/plus.svg" alt="add button">
        </button>
			</div>

      <span class="w-full font-bold text-left">Reps</span>
			<div class="flex items-center">
				<button
          @click="reps--"
          class="bg-gray-500 flex justify-center items-center shadow rounded w-12 h-12"
        >
          <img src="../assets/img/minus.svg" alt="add button">
        </button>

				<input
					class="block shadow-mdTopBottom outline-none font-bold text-center text-2xl focus:shadow-outline rounded w-24 h-12 p-2 m-4"
					v-model="reps"
					type="number"
				>

				<button
          @click="reps++"
          class="bg-blue-600 flex justify-center items-center shadow rounded w-12 h-12"
        >
          <img src="../assets/img/plus.svg" alt="add button">
        </button>
			</div>

      <div class="w-full text-right">
      	<button
      	  @click="close"
      	  class="text-sm font-semibold mt-4 px-3 py-2"
      	>
      	  CLOSE
      	</button>

      	<button
      	  @click="save"
      	  class="text-sm font-semibold mt-4 px-3 py-2"
      	>
      	  SAVE
      	</button>
      </div>
    </modal-wrapper>

  </transition>
</template>

<script>
  import ModalWrapper from './ModalWrapper'

  export default {
    components: {
      ModalWrapper
    },

    props: ['open'],

    data() {
      return {
        weight: 0,
        reps: 0
      };
    },

    watch: {
      open(newVal) {
        if (newVal) this.$refs.weight.focus()
      }
    },

    methods: {
      close() {
        this.$emit('close')
        this.weight = 0
        this.reps = 0
      },

      save() {
        this.$emit('save', this.weight, this.reps)
        this.weight = 0
        this.reps = 0
      }
    }
  };
</script>
