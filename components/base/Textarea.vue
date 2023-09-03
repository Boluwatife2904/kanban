<script setup lang="ts">
interface TextareaProps {
	id?: string;
	label?: string;
	name?: string;
	placeholder?: string;
}

defineProps<TextareaProps>();

const modelValue = defineModel<string>();
const isInvalid = ref(false);
</script>

<template>
	<div class="textarea position-relative">
		<label v-if="label" :for="id" class="textarea__label body-m block">{{ label }}</label>
		<textarea v-model="modelValue" :name="name" :id="id" :placeholder="placeholder" class="textarea__element body-l block w-100 border-xs primary-text" :class="{ 'textarea__element--invalid': isInvalid }" @focus="isInvalid = false" />
	</div>
</template>

<style lang="scss" scoped>
.textarea {
	&__label {
		margin-bottom: 0.8rem;
		color: var(--label-color);
	}

	&__element {
		padding: 0.8rem 1.6rem;
		background: transparent;
		border: 0.1rem solid rgba(130, 143, 163, 0.25);
        resize: none;
        height: 11.2rem;

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: var(--primary-text);
			mix-blend-mode: normal;
			opacity: 0.25;
		}

		&--invalid {
			border-color: var(--destructive-color);
		}
	}

	&__error {
		right: 1.6rem;
		top: 3.2rem;
	}
}
</style>
