<script setup lang="ts">
interface ButtonProps {
	variant?: string;
	size?: string;
	radius?: string;
	isLoading?: boolean;
}

const { variant = "primary", size = "large", radius = "default", isLoading = false } = defineProps<ButtonProps>();

const buttonClasses = computed(() => {
	return ["variant", "size", "radius"].map((item) => {
		if (item === "variant") return `button--${variant}`;
		else if (item === "size") return `button--${size}`;
		else if (item === "radius") return `button--radius-${radius}`;
	});
});
</script>

<template>
	<button class="button" :class="buttonClasses" :disabled="isLoading">
		<span v-if="isLoading" class="loader"></span>
		<slot v-else />
	</button>
</template>

<style lang="scss" scoped>
.button {
	&--primary {
		background-color: var(--primary-color);
		color: #fff;

		&:hover {
			background-color: var(--primary-color-hover);
		}
	}

	&--secondary {
		background-color: var(--secondary-color);
		color: var(--primary-color);

		&:hover {
			background-color: var(--secondary-color-hover);
		}
	}

	&--destructive {
		background-color: var(--destructive-color);
		color: #fff;

		&:hover {
			background-color: var(--destructive-color-hover);
		}
	}

	&--large {
		border-radius: 2.4rem;
		padding: 1.5rem 2.4rem;
		@include typeface(700, 1.5rem, 1.9rem);
	}

	&--small {
		border-radius: 2rem;
		padding: 0.8rem;
		@include typeface(700, 1.3rem, 2.3rem);
	}

	&--radius-small {
		border-radius: 0.4rem;
	}

	&:disabled {
		opacity: 0.5 !important;
	}
}
.loader {
	width: 1.6rem;
	height: 1.6rem;
	border: 0.1rem solid #fff;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}

@keyframes rotation {
	to {
		transform: rotate(360deg);
	}
}
</style>
