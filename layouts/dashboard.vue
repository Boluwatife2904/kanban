<script setup lang="ts">
const sidebarIsHidden = ref(false);
</script>

<template>
	<div class="dashboard grid" :class="{ 'dashboard--full': sidebarIsHidden }">
		<div class="dashboard__sidebar" :class="{ 'dashboard__sidebar--hidden': sidebarIsHidden }">
			<TheSidebar v-model="sidebarIsHidden"></TheSidebar>
		</div>
		<div class="dashboard__content">
			<slot />
		</div>

		<button v-if="sidebarIsHidden" class="sidebar__toggler--mobile position-fixed" @click="sidebarIsHidden = !sidebarIsHidden">
			<IconsEye />
		</button>
	</div>
</template>

<style lang="scss" scoped>
.dashboard {
	@media screen and (min-width: 768px) {
		grid-template-columns: 26.1rem auto;
	}

	&--full {
		grid-template-columns: 100%;
	}

	&__sidebar {
		height: 100vh;
		display: none;

		@media screen and (min-width: 768px) {
			display: block;
		}

		&--hidden {
			@media screen and (min-width: 768px) {
				display: none;
			}
		}
	}

	&__content {
		width: 100%;
		min-height: 100vh;
		background-color: var(--light-grey-background);
	}
}

.sidebar__toggler--mobile {
	background-color: var(--primary-color);
	bottom: 3.2rem;
	padding: 1.8rem 2.4rem 1.8rem 1.8rem;
	color: #fff;
	border-top-right-radius: 10rem;
	border-bottom-right-radius: 10rem;
	display: none;

	@media screen and (min-width: 768px) {
		display: block;
	}

    &:hover {
        background-color: var(--primary-color-hover);
    }
}
</style>
