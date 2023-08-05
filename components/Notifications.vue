<script setup lang="ts">
const notifications = ref<{ _id: number; type: string; message: string }[]>([]);

const addNewNotification = (type: string, message: string) => {
	notifications.value.unshift({ _id: Math.floor(Math.random() * notifications.value.length), type, message });
	setTimeout(() => {
		notifications.value.splice(notifications.value.length - 1, 1);
	}, 5000);
};

useListen("notify", (notification: { type: string; message: string }) => {
	addNewNotification(notification.type, notification.message);
});
</script>

<template>
	<ul class="notifications">
		<TransitionGroup name="slideDown">
			<li v-for="notification in notifications" :key="notification._id" class="notifications__item flex" :class="[`notifications__item--${notification.type}`]">
				<span class="flex-shrink-0">
					<IconsNotification :variant="notification.type" />
				</span>
				{{ notification.message }}
			</li>
		</TransitionGroup>
	</ul>
</template>

<style lang="scss" scoped>
.notifications {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: flex-end;
	flex-direction: column;
	list-style: none;
	gap: 1rem;
	padding: 4rem 2rem;
	z-index: 15;
	pointer-events: none;

	&__item {
		width: 95%;
		max-width: 48rem;
		padding: 1.4rem 2rem;
		border-radius: 0.4rem;
		display: flex;
		gap: 1.2rem;
		box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.05);
		font-weight: 500;

		@media screen and (min-width: 600px) {
			padding: 1.4rem 3rem;
		}

		&--success {
			background-color: #edf7ed;
			color: #1e4620;
		}

		&--error {
			background-color: rgb(253, 240, 239);
			color: rgba(94, 44, 39);
		}

		span {
			height: 2.4rem;
			width: 2.4rem;
		}
	}
}
</style>
