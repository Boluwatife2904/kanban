<script setup lang="ts">
interface Props {
	top?: string;
	left?: string;
	bottom?: string;
	right?: string;
	width?: string;
	gap?: string;
	show: boolean;
}

interface Emits {
	(event: "outside-clicked"): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const handleOnClickOutside = (event: MouseEvent) => {
	const classList = (event.target as HTMLElement).classList;
	if (!classList.contains("dropdown__toggler")) {
		const classListArray = Array.from(classList);
		if (classListArray && classListArray.length > 0) {
			const hasDropdownClass = classListArray.some((classItem) => classItem.includes("dropdown"));
			if (!hasDropdownClass) emits("outside-clicked");
		} else {
			emits("outside-clicked");
		}
	}
};

onMounted(() => {
	window.addEventListener("click", handleOnClickOutside);
});

onUnmounted(() => {
	window.removeEventListener("click", handleOnClickOutside);
});
</script>

<template>
	<Transition name="slidein" mode="out-in" appear>
		<div v-if="show" class="dropdown__list flex flex-column position-absolute border-xs" :style="{ top, left, bottom, right, width, gap }">
			<slot></slot>
		</div>
	</Transition>
</template>

<style lang="scss" scoped>
.dropdown__list {
	background: var(--white-background);
	box-shadow: 0rem 1rem 2rem rgba(54, 78, 126, 0.25);
	padding: 1.6rem;
	height: auto;
}
</style>
