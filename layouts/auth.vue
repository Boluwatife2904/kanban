<script setup lang="ts">
const { selectedTheme } = useTheme();
</script>

<template>
	<div class="auth-layout">
		<div class="auth-layout--left flex items-center content-center">
			<div class="auth-layout--left__content">
				<slot />
			</div>
		</div>
		<div class="auth-layout--right">
			<div class="auth-layout--right__content">
				<div class="auth-layout__quote flex flex-column">
					<h3 class="heading-xl primary-text">"When the going gets tough, the tough gets going"</h3>
					<p class="body-l primary-text">- Joseph Kennedy - {{ selectedTheme }}</p>
				</div>
				<div class="auth-layout__images">
                    <img :src="selectedTheme === 'light-mode' ? '/images/demo-light.png' : '/images/demo-dark.png'" alt="Kanban demo" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.auth-layout {
	height: 100vh;
	width: 100%;
	display: grid;

	@media screen and (min-width: 992px) {
		grid-template-columns: 40% 60%;
	}

	&--left {
		padding: 10rem 3.2rem 10rem 2rem;

		@media screen and (min-width: 600px) {
			padding: 10rem 5rem 10rem 7rem;
		}

		&__content {
            width: 100%;
			max-width: 56rem;
            margin: 0 auto;
		}
	}

	&--right {
		background-color: var(--light-grey-background);
		overflow: hidden;
		display: none;

		@media screen and (min-width: 992px) {
            display: block;
		}

		&__content {
			position: relative;
			height: 100%;
		}
	}

	&__images {
		height: 50rem;
		width: 80rem;
		position: absolute;
		// bottom: 0;
		left: 10%;
		top: 32rem;
		// bottom: 100%;
		// right: 0;

		img {
			width: 100%;
			height: 100%;
			max-width: 100%;
			object-fit: cover;
			object-position: top left;
			border-top-left-radius: 1rem;
		}
	}

	&__quote {
		padding: 10rem 4rem 5rem 10%;
		gap: 1rem;

        h3 {
            letter-spacing: 0.075rem;
            font-weight: 500;
        }

        p {
            font-weight: 300;
            letter-spacing: 0.05;
            font-size: 1.4rem;
        }
	}
}
</style>
