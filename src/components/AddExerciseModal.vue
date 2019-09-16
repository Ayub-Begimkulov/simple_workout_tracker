<template>
  <transition name="fade-shrink-in" appear>
    <modal-wrapper @close="close" class="text-gray-900">
      <h2 class="font-bold text-xl pb-2">New Exersice</h2>

      <input
        class="font-medium border-b-2 border-gray-300 focus:border-indigo-500 outline-none w-full p-3 my-4"
        v-model="title"
        placeholder="Name"
        type="text"
        ref="input"
      />

      <div class="w-full flex justify-end">
        <button @click="close" class="text-sm font-semibold pt-3 px-3">CANCEL</button>

        <button @click="save" class="text-sm font-semibold pt-3 px-3">SAVE</button>
      </div>
    </modal-wrapper>
  </transition>
</template>

<script>
import ModalWrapper from './ModalWrapper';

export default {
  components: {
    ModalWrapper
  },

  props: ['open'],

  data() {
    return {
      title: ''
    };
  },

  watch: {
    open(newVal) {
      if (newVal) this.$refs.input.focus();
    }
  },

  methods: {
    save() {
      this.$emit('save', this.title);
      this.title = '';
    },

    close() {
      this.$emit('close');
      this.title = '';
    }
  }
};
</script>