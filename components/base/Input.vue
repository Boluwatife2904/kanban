<script setup lang="ts">
interface InputProps {
	id?: string;
	label?: string;
	name?: string;
	type?: string;
	placeholder?: string;
}

const { type = "text" } = defineProps<InputProps>();

const modelValue = defineModel<string>();
const isInvalid = ref(false);

const checkInputValidity = () => {
	isInvalid.value = modelValue.value === "";
};
</script>

<template>
	<div class="input w-100 position-relative">
		<label v-if="label" :for="id" class="input__label body-m block">{{ label }}</label>
		<input v-model="modelValue" :type="type" :name="name" :id="id" :placeholder="placeholder" class="input__element body-l block w-100 border-xs primary-text" :class="{ 'input__element--invalid': isInvalid }" @focus="isInvalid = false" @blur="checkInputValidity" />
		<span v-if="isInvalid" class="body-l position-absolute input__error destructive-text">Can't be empty</span>
	</div>
</template>

<style lang="scss" scoped>
.input {
	&__label {
		margin-bottom: 0.8rem;
		color: var(--label-color);
	}

	&__element {
		padding: 0.8rem 1.6rem;
		background: transparent;
		border: 0.1rem solid rgba(130, 143, 163, 0.25);
        height: 4rem;

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
        bottom: 1rem;
    }
}
</style>
