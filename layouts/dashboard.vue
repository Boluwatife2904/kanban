<script setup lang="ts">
import { useListen } from "@/composables/useEventBus";

const sidebarIsHidden = ref(false);

const route = useRoute();
const showMobileSidebar = ref(false);

watch(
	() => route.fullPath,
	() => {
		showMobileSidebar.value = false;
	}
);

useListen("show-sidebar", () => {
	showMobileSidebar.value = !showMobileSidebar.value;
});
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

		<BaseModal :show="showMobileSidebar" :has-padding="false" @close-modal="showMobileSidebar = false">
			<template #content>
				<div class="sidebar--mobile">
					<DashboardBoards />
					<div class="sidebar--mobile__theme">
						<ThemeToggler />
					</div>
				</div>
			</template>
		</BaseModal>
	</div>
</template>

<style lang="scss" scoped>
.dashboard {
	height: 100vh;
	overflow-y: hidden;

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
		overflow-y: scroll;
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

.sidebar--mobile {
	padding-top: 1.6rem;

	&__theme {
		padding: 1.6rem;
	}
}
</style>
