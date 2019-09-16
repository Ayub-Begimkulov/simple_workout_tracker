<template>
  <div class="flex justify-center items-center w-screen h-screen absolute">
    <div @click="$emit('close')" class="absolute w-screen h-screen z-40 bg-black opacity-75"></div>

    <div class="bg-white flex flex-col items-center justify-center rounded w-4/5 max-w-xs p-6 z-50">
      <slot></slot>
    </div>
  </div>
</template>