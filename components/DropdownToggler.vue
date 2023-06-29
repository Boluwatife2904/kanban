<script setup lang="ts"></script>

<template>
	<button type="button" class="dropdown__toggler position-relative">
		<IconsEllipsis />
	</button>
</template>

<style lang="scss" scoped>
.dropdown__toggler {
	&::before {
		content: "";
		position: absolute;
		width: 4rem;
		height: 4rem;
		top: -1.2rem;
		left: -1.6rem;
		cursor: pointer;
	}
}
</style>
