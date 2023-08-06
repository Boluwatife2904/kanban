<script setup lang="ts"></script>

<template>
	<div class="empty-state flex items-center content-center">
		<div class="empty-state__content flex flex-column text-center">
			<div class="empty-state__icon">
				<IconsEmpty />
			</div>
			<h4 class="empty-state__title primary-text heading-xl">No board added!</h4>
			<p class="empty-state__description primary-text body-l">You have not created any board. When you add a new board, they'll show up here.</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.empty-state {
	padding: 3rem;
	background-color: var(--body-background);
	border-radius: 1rem;
	min-height: 40rem;

	&__content {
		max-width: 28rem;
		margin: 0 auto;
		gap: 1rem;
	}
}
</style>
