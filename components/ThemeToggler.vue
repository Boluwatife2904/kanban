<script setup lang="ts">
const isDarkMode = ref(false);

watch(isDarkMode, (newValue) => {
	if (newValue) {
		document.documentElement.classList.add("dark-theme");
	} else {
		document.documentElement.classList.remove("dark-theme");
	}
});
</script>

<template>
	<div class="theme-toggler flex items-center content-center border-s">
		<span><IconsTheme variant="light" /></span>
		<button class="theme-toggler__button border-l" @click="isDarkMode = !isDarkMode">
			<span class="theme-toggler__button__inner block border-rounded" :class="{ 'theme-toggler__button__inner--active': isDarkMode }"></span>
		</button>
		<span><IconsTheme variant="dark" /></span>
	</div>
</template>

<style lang="scss" scoped>
.theme-toggler {
	max-width: 25.1rem;
	background-color: var(--light-grey-background);
	gap: 2.4rem;
	padding: 1.4rem;

	span {
		line-height: 0;
	}

	&__button {
		width: 4rem;
		height: 2rem;
		background-color: var(--primary-color);
		padding: 0.3rem;

		&__inner {
			height: 1.4rem;
			width: 1.4rem;
			background-color: #fff;

			&--active {
				transform: translateX(2rem);
			}
		}
	}
}
</style>
