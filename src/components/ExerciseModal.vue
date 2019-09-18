<template>
  <transition name="fade-shrink-in" appear>
    <ModalWrapper @close="$emit('close')" class="text-gray-900">
      <h2 class="font-bold text-xl pb-2">
        <span v-if="isEdit">Edit Exercise</span>
        <span v-else>Add New Exercise</span>
      </h2>

      <input
        class="font-medium outline-none border-b-2 border-gray-300 focus:border-indigo-500 w-full p-3 mt-4 mb-2"
        v-model="title"
        placeholder="Name"
        type="text"
        ref="input"
      />

      <div class="w-full flex justify-end">
        <button @click="$emit('close')" class="text-sm font-semibold pt-3 px-3">CANCEL</button>

        <button @click="$emit('save', title)" class="text-sm font-semibold pt-3 px-3">SAVE</button>
      </div>
    </ModalWrapper>
  </transition>
</template>

<script>
import ModalWrapper from './ModalWrapper';

export default {
  components: {
    ModalWrapper
  },

  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    exerciseTitle: {
      type: String,
      required: false
    },
    open: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      title: this.exerciseTitle
    };
  },

  mounted() {
    this.$refs.input.focus();
  }
};
</script>