<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
});
</script>

<template>
	<div class="single-board">
		<div class="single-board__header flex items-center content-space-between">
			<div class="single-board__header--left">
				<p class="single-board__header__title heading-xl primary-text">
					<template v-if="$route.params.id === '1'">Platform Launch</template>
					<template v-if="$route.params.id === '2'">Marketing Plan</template>
					<template v-if="$route.params.id === '3'">Roadmap</template>
				</p>
			</div>
			<div class="single-board__header--right flex items-center">
				<BaseButton class="single-board__header__button" size="large">
					<span class="hide-on-mobile">+ &nbsp; Add new task</span>
					<span class="hide-on-desktop"><IconsPlus /></span>
				</BaseButton>
				<button><IconsEllipsis /></button>
			</div>
		</div>
		<div class="single-board__body flex flex-column items-center content-center">
			<TheEmptyState />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.single-board {
	&__header {
		background-color: var(--sidebar-background);
		padding: 2rem 3.2rem 2.8rem 2.4rem;
		border-bottom: 0.1rem solid var(--lines-color);
		position: sticky;
		top: 0;
		left: 0;

		&--right {
			gap: 1.6rem;

			@media screen and (min-width: 768px) {
				gap: 2.4rem;
			}
		}

		&__button {
			padding: 1rem 1.8rem;

			@media screen and (min-width: 768px) {
				padding: 1.4rem 2.4rem;
			}
		}
	}

	&__body {
		min-height: calc(100vh - 10rem);
        padding: 2.4rem 0 5rem 2.4rem;
	}
}
</style>
