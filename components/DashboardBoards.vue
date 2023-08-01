<script setup lang="ts">
import { useEvent } from "@/composables/useEventBus";
import { useBoardStore } from "@/stores/board";

const { boards } = storeToRefs(useBoardStore());
</script>

<template>
	<div class="boards">
		<p class="boards__title body-m medium-grey-text">ALL BOARDS ({{ boards.length }})</p>
		<ul class="boards__list">
			<li v-for="board in boards" :key="board.id">
				<NuxtLink :to="{ name: 'dashboard-board-id', params: { id: board.id } }" class="boards__item heading-m flex items-center" :class="{ 'boards__item--active': board.id === $route.params.id }">
					<IconsBoard />
					{{ board.title }}
				</NuxtLink>
			</li>
		</ul>
		<button class="boards__item boards__item--add heading-m flex items-center" @click="useEvent('add-board')">
			<IconsBoard />
			<span> +Create New Board </span>
		</button>
	</div>
</template>

<style lang="scss" scoped>
.boards {
	&__title {
		padding-left: 3.2rem;
		margin-bottom: 1.9rem;
	}

	&__list {
		padding-right: 2.4rem;
		height: 100%;
		max-height: 21rem;
		overflow-y: scroll;
	}
}
</style>
