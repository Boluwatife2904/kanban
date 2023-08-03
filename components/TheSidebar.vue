<script setup lang="ts">
const modelValue = defineModel<boolean>();
const { logout } = useStore();
</script>

<template>
	<aside class="sidebar flex flex-column">
		<div class="sidebar__logo cursor-pointer" @click="navigateTo({ name: 'dashboard' })">
			<TheLogo />
		</div>
		<DashboardBoards />
		<div class="sidebar__theme">
			<ThemeToggler />
		</div>
		<div class="sidebar__toggler">
			<button class="boards__item heading-m flex items-center w-100" @click="modelValue = !modelValue">
				<IconsEye />
				Hide Sidebar
			</button>
			<button class="boards__item heading-m flex items-center w-100" @click="logout">
				<IconsSignout />
				Logout
			</button>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
.sidebar {
	height: 100vh;
	background-color: var(--sidebar-background);
	border-right: 0.1rem solid var(--lines-color);

	&__logo {
		padding: 3.2rem 2.6rem;
		margin-bottom: 2.8rem;
	}

	&__theme {
		margin-top: auto;
		padding: 0 2.4rem;
	}

	&__toggler {
		margin-top: 0.8rem;
		padding-right: 2.4rem;
		padding-bottom: 4.7rem;
	}
}
</style>
