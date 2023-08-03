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
		<div class="dashboard__header flex items-center">
			<h3 class="heading-l primary-text">Overview</h3>
		</div>
		<div class="dashboard__content">
			<div class="dashboard__greeting flex flex-column">
				<h4 class="primary-text heading-l">Hello {{ user?.email?.split("@")[0] }} 👋🏽,</h4>
				<p class="primary-text body-l">Welcome back to Kanban! <span class="logout cursor-pointer" @click="logout">Logout</span></p>
			</div>
			<div class="dashboard__boards">
				<h4 class="dashboard__boards__heading"></h4>
				<ul class="dashboard__boards__wrapper grid">
					<li v-for="board in boards" :key="board.id" class="border-xs flex flex-column" @click="viewBoard(board.id)">
						<h4 class="primary-text heading-m">{{ board.title }}</h4>
						<span class="body-m medium-grey-text block">View Board &nbsp; ➡️</span>
					</li>
				</ul>
			</div>
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
	}

	&__greeting {
		gap: 1rem;
		margin-bottom: 4rem;
	}

	&__boards {
		&__wrapper {
			gap: 3rem;
			grid-template-columns: repeat(3, 1fr);


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

.logout {
	border-bottom: 1px solid var(--primary-text);
}
</style>
