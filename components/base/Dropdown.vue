<script setup lang="ts">
interface Option {
	value: string;
	content: string;
}

interface Props {
	label?: string;
	options?: Option[];
}

const isOpen = ref(false);
const test = defineModel<string>();

const props = defineProps<Props>();

const selectItem = (item: string) => {
	test.value = item;
	toggleDropdown();
};

const contentOfSelectedItem = computed(() => {
	if (test.value) return props.options?.find((item) => item.value === test.value)?.content;
	return "Select an item";
});

const toggleDropdown = () => (isOpen.value = !isOpen.value);
</script>

<template>
	<div class="base-dropdown position-relative">
		<div class="base-dropdown__label body-m">{{ label }}</div>
		<div class="base-dropdown__header position-relative cursor-pointer border-xs" :class="{ 'base-dropdown__header--active': isOpen }" @click="toggleDropdown">
			<span class="body-l base-dropdown__text">{{ contentOfSelectedItem }}</span>
			<span class="base-dropdown__arrow position-absolute"><IconsArrow variant="down" /></span>
		</div>
		<DropdownList :show="isOpen" width="100%" top="calc(100% + 1rem)" gap="0.8rem" @outside-clicked="isOpen = false">
			<DropdownListItem v-for="option in options" :key="option.value" @click.stop="selectItem(option.value)"> {{ option.content }}</DropdownListItem>
		</DropdownList>
	</div>
</template>

<style lang="scss" scoped>
.base-dropdown {
	&__header {
		border: 0.1rem solid rgba(130, 143, 163, 0.25);
		padding: 0.8rem 1.6rem;
		color: var(--primary-text);

		&:hover,
		&--active {
			border-color: var(--primary-color);
		}
	}

	&__label {
		color: var(--label-color);
		margin-bottom: 0.8rem;
	}


	&__arrow {
		right: 1.6rem;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
