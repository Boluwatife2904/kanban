<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const user = useSupabaseUser();
const { boards } = storeToRefs(useBoardStore());
const { logout } = useStore();

const viewBoard = (boardId: string) => {
	navigateTo({ name: "dashboard-board-id", params: { id: boardId } });
};
</script>

<template>
	<div class="dashboard">
		<div class="dashboard__header flex items-center justify-content-between">
			<h3 class="heading-l primary-text">Overview</h3>
			<button class="flex items-center" @click="logout">
				<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" data-name="Layer 1" viewBox="0 0 24 24" id="exit" fill="currentColor">
					<path d="M21,0H10A3.009,3.009,0,0,0,7,3V9h9a3,3,0,0,1,0,6H7v6a3.009,3.009,0,0,0,3,3H21a3.009,3.009,0,0,0,3-3V3A3.009,3.009,0,0,0,21,0Z" fill="currentColor"></path>
					<path d="M3.41,13H16a1,1,0,0,0,0-2H3.41l1.3-1.29A1,1,0,0,0,3.29,8.29l-3,3a1.037,1.037,0,0,0,0,1.42l3,3a1.03,1.03,0,0,0,1.42,0,1.008,1.008,0,0,0,0-1.42Z" fill="currentColor"></path>
				</svg>
				Logout
			</button>
		</div>
		<div class="dashboard__content">
			<div class="dashboard__greeting flex flex-column">
				<h4 class="primary-text heading-l">Hello {{ user?.email?.split("@")[0] }} 👋🏽,</h4>
				<p class="primary-text body-l">Welcome back to Kanban! <span class="underline cursor-pointer" @click="useEvent('add-board')">Create New Board</span></p>
			</div>
			<div v-if="boards.length > 0" class="dashboard__boards">
				<ul class="dashboard__boards__wrapper grid">
					<li v-for="board in boards" :key="board.id" class="border-xs flex flex-column" @click="viewBoard(board.id)">
						<h4 class="primary-text heading-m">{{ board.title }}</h4>
						<span class="body-m medium-grey-text block">View Board &nbsp; ➡️</span>
					</li>
				</ul>
			</div>
			<LazyEmptyState v-else type="board" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dashboard {
	&__content {
		padding: 3.2rem;

		@media screen and (min-width: 768px) {
			padding: 3.2rem;
		}
	}

	&__header {
		background-color: var(--sidebar-background);
		padding: 2rem 3.2rem 2.8rem 2.4rem;
		border-bottom: 0.1rem solid var(--lines-color);
		position: sticky;
		top: 0;
		left: 0;
		gap: 2rem;
		justify-content: space-between;

		button {
			color: var(--primary-text);
			line-height: 0;
			gap: 0.8rem;
			font-weight: 500;
		}
	}

	&__greeting {
		gap: 1rem;
		margin-bottom: 4rem;
	}

	&__boards {
		&__wrapper {
			gap: 3rem;

			@media screen and (min-width: 600px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media screen and (min-width: 992px) {
				grid-template-columns: repeat(3, 1fr);
			}

			li {
				background-color: var(--sidebar-background);
				padding: 2rem 3.2rem;
				cursor: pointer;
				gap: 1rem;
				min-height: 9.2rem;

				span {
					margin-top: auto;
				}
			}
		}
	}
}

.underline {
	border-bottom: 1px solid var(--primary-text);
}
</style>
