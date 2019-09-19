<template>
  <transition name="fade-shrink-in" appear>
    <modal-wrapper @close="close" class="text-gray-900">
      <h2 class="font-bold text-xl mb-4">Add new set</h2>

      <span class="w-full font-bold text-left">Weight</span>
      <div class="flex items-center">
        <Button @click="weight--" :isSquared="true" :isIncrease="false" :contentCentered="true" />

        <input
          class="block shadow-md-y outline-none font-bold text-center text-2xl focus:shadow-outline rounded w-24 h-12 p-2 m-4"
          v-model.number="weight"
          ref="weight"
          type="number"
        />

        <Button @click="weight++" :isSquared="true" :isIncrease="true" :contentCentered="true" />
      </div>

      <span class="w-full font-bold text-left">Reps</span>
      <div class="flex items-center">
        <Button @click="reps--" :isSquared="true" :isIncrease="false" :contentCentered="true" />

        <input
          class="block shadow-md-y outline-none font-bold text-center text-2xl focus:shadow-outline rounded w-24 h-12 p-2 m-4"
          v-model.number="reps"
          type="number"
        />

        <Button @click="reps++" :isSquared="true" :isIncrease="true" :contentCentered="true" />
      </div>

      <div class="w-full text-right">
        <Button @click="close" :isText="true" :isSave="false" />

        <Button @click="save" :isText="true" :isSave="true" />
      </div>
    </modal-wrapper>
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
    open: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      weight: 0,
      reps: 0
    };
  },

  watch: {
    open(newVal) {
      if (newVal) this.$refs.weight.focus();
    }
  },

  methods: {
    close() {
      this.$emit('close');
      this.weight = 0;
      this.reps = 0;
    },

    save() {
      this.$emit('save', this.weight, this.reps);
      this.weight = 0;
      this.reps = 0;
    }
  }
};
</script>
