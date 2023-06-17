<script setup lang="ts">
definePageMeta({
	layout: "auth",
});

const options = [
	{ value: "todo", content: "Todo" },
	{ value: "progress", content: "Progress" },
	{ value: "done", content: "Done" },
];
const selectedItem = ref("");
const selectedText = ref("");
const isSelected = ref(false);
const showModal = ref(false);
</script>

<template>
	<div class="flex flex-column wrapper">
		<ThemeToggler />
		<div class="text grid">
			<div class="text__header flex flex-column">
				<h3 class="heading-xl">Heading (XL)</h3>
				<h4 class="heading-l">Heading (L)</h4>
				<h5 class="heading-m">Heading (M)</h5>
				<h6 class="headin-s">Heading (S)</h6>
			</div>
			<div class="text__body flex flex-column">
				<p class="body-l">Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.</p>
				<p class="body-m">Body (M) - - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.</p>
			</div>
		</div>
		<div class="grid-wrapper grid">
			<BaseButton variant="primary" size="large"> Button Primary (L) </BaseButton>
			<BaseButton variant="secondary" size="large"> Button Secondary (L) </BaseButton>
			<BaseButton variant="destructive" size="large" @click="showModal = true"> Button Destructive (L) </BaseButton>
			<BaseButton variant="primary" size="small"> Button Primary (S) </BaseButton>
			<BaseButton variant="secondary" size="small"> Button Secondary (S) </BaseButton>
			<BaseButton variant="destructive" size="small"> Button Destructive (S) </BaseButton>
		</div>
		<div class="grid-wrapper grid">
			<div class="form-check">
				<span class="body-m block item-header">Subtask Checkbox</span>
				<BaseCheckbox v-model="isSelected" label="Complete this project" />
			</div>
			<BaseInput v-model="selectedText" id="field" name="field" label="Text Field (active)" placeholder="Enter task name" />
			<BaseDropdown v-model="selectedItem" label="Dropdown (idle)" :options="options" />
		</div>
	</div>
	<LazyBaseModal v-model="showModal">
		<template #header>
			<span class="heading-l destructive-text">Delete this task?</span>
		</template>
		<template #content>
			<p class="body-l medium-grey-text">Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
			<div class="delete-actions grid">
				<BaseButton variant="destructive" size="large"> Delete </BaseButton>
				<BaseButton variant="secondary" size="large" @click="showModal = false"> Cancel </BaseButton>
			</div>
		</template>
	</LazyBaseModal>
</template>

<style lang="scss" scoped>
.wrapper {
	gap: 5rem;
	padding: 3.2rem;
}

.grid-wrapper {
	gap: 3rem;
	align-items: start;

	@media screen and (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: 992px) {
		grid-template-columns: repeat(3, 1fr);
	}
}

.item-header {
	margin-bottom: 0.8rem;
	color: var(--label-color);
}

.text {
	color: var(--primary-text);

	@media screen and (min-width: 600px) {
		grid-template-columns: 40% 60%;
	}

	> div {
		gap: 2rem;
	}
}

.delete-actions {
	gap: 1.6rem;
	margin-top: 2.4rem;

	@media screen and (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
