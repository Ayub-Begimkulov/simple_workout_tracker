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

      <div class="w-full text-right">
        <Button @click="$emit('close')" :isText="true" :isSave="false" />

        <Button @click="$emit('save', title)" :isText="true" :isSave="true" />
      </div>
    </ModalWrapper>
  </transition>
</template>

<script>
import ModalWrapper from './ModalWrapper';
import Button from './Button';

export default {
  components: {
    ModalWrapper,
    Button
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