<script setup lang="ts">
interface CheckboxProps {
    id: string;
	label?: string;
    name: string;
}

defineProps<CheckboxProps>();

const modelValue = defineModel<boolean>();
</script>

<template>
	<label :for="id" class="checkbox border-xs w-100 inline-flex items-center">
		<input :id="id" type="checkbox" v-model="modelValue" :checked="modelValue" />
		<div class="box bg-white flex content-center items-center"></div>
		<span class="body-m checkbox__label" :class="{ 'checkbox__label--checked': modelValue }"> {{ label }} </span>
	</label>
</template>

<style lang="scss" scoped>
.checkbox {
	padding: 1.2rem;
	cursor: pointer;
	background-color: var(--light-grey-background);

	&:hover {
		background-color: rgb(99, 95, 199, 0.25);
	}

	input {
		display: none;

		&:checked + .box {
			background: var(--primary-color) !important;
			border-color: transparent;

			&::after {
				transform: scale(1);
			}
		}
	}

	.box {
		width: 1.6rem;
		height: 1.6rem;
		margin-right: 1rem;
		flex-shrink: 0;
		background-color: var(--body-background);
		border: 0.1rem solid rgba(130, 143, 163, 0.248914);
		border-radius: 0.2rem;

		&::after {
			content: "";
			background-image: url("@/assets/images/checkbox.svg");
			background-position: center;
			background-size: contain;
			background-repeat: no-repeat;
			height: 1.2rem;
			width: 1.2rem;
			transform: scale(0);
		}
	}

	&__label {
		color: var(--primary-text);

		&--checked {
			mix-blend-mode: normal;
			opacity: 0.5;
            text-decoration: line-through;
		}
	}
}
</style>
