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
	<div class="dropdown position-relative">
		<div class="dropdown__label body-m">{{ label }}</div>
		<div class="dropdown__header position-relative cursor-pointer border-xs" :class="{ 'dropdown__header--active': isOpen }" @click="toggleDropdown">
			<span class="body-l">{{ contentOfSelectedItem }}</span>
			<span class="dropdown__arrow position-absolute"><IconsArrow variant="down" /></span>
		</div>
		<Transition name="slidein" mode="out-in" :appear="true">
			<ul v-if="isOpen" class="dropdown__body flex flex-column border-m">
				<li v-for="option in options" :key="option.value" class="dropdown__item body-l cursor-pointer" @click="selectItem(option.value)">{{ option.content }}</li>
			</ul>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.dropdown {
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

	&__body {
		background: var(--white-background);
		box-shadow: 0rem 1rem 2rem rgba(54, 78, 126, 0.25);
		padding: 1.6rem;
	}

	&__body {
		gap: 0.8rem;
		margin-top: 0.7rem;
	}

	&__item {
		color: var(--medium-grey-text);
	}

	&__arrow {
		right: 1.6rem;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
