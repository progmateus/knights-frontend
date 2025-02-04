<template>
  <div class="relative">
    <label v-if="label" :for="id" class="text-white text-sm mb-2 block">{{ label }}</label>

    <select :id="id" v-bind="$attrs" v-model="inputValue" :placeholder="placeholder" :class="[
      'w-full px-4 py-3 border rounded-md bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:zinc-600 transition',
      error ? 'border-red-500' : 'border-zinc-600',
      {
        'focus:zinc-500': !error,
        'focus:ring-red-500': error,
      }
    ]">
      <template v-for="option in options">
        <option :value="option.value" class="py-1">{{ option.label }}</option>
      </template>
    </select>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: [],
  },
});

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});

const updateValue = () => {
  emit('update:modelValue', inputValue.value);
};
</script>

<style scoped></style>
