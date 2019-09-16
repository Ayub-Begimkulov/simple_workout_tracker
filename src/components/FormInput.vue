<template>
  <input
    @input="(e) => $emit('input', content)"
    class="border block shadow-md-y w-full p-3 rounded mb-4"
    :class="[err ? 'border-red-500 focus:outline-none' : 'border-transparent' ]"
    :type="type"
    :placeholder="placeholder"
    :minlength="minlength"
    v-model="content"
    required
  />
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    minlength: {
      type: Number,
      required: false,
      default: 1
    },
    err: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      content: this.value
    };
  }
};
</script>