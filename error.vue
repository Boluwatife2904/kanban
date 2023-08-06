<script setup lang="ts">
const props = defineProps({
	error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
	<div class="error-page flex items-center content-center">
		<div class="error-page__content flex flex-column items-center">
			<div class="error-page__number-wrap flex items-center">
				<h1 class="error-page__number">4</h1>
				<div class="error-page__zero flex items-center content-center">
					<span class="error-page__zero__inner flex items-center content-center">
						<span class="error-page__zero__innermost block"></span>
					</span>
				</div>
				<h1 class="error-page__number">4</h1>
			</div>
			<h1 class="error-page__title"><span class="primary-text">SORRY, THERE'S</span><br /> <span class="primary-color-text">NOTHING HERE</span></h1>
			<BaseButton radius="small" @click="handleError">GO HOME</BaseButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.error-page {
	height: 100vh;
	background-color: var(--body-background);

	&__content {
		padding: 4rem;
		gap: 3rem;
		text-align: center;
	}

	&__number {
		font-size: 10rem;
		line-height: 10rem;
		color: var(--primary-text);

		@media screen and (min-width: 600px) {
			font-size: 20rem;
			line-height: 18rem;
		}
	}

	&__zero {
		height: 8rem;
		width: 6rem;
		border: 1rem solid var(--primary-color);
		border-radius: calc(50% + 4rem);

		@media screen and (min-width: 600px) {
			height: 16rem;
			width: 12rem;
			border: 1.6rem solid var(--primary-color);
		}

		&__inner {
			height: 2rem;
			width: 3rem;
			background-color: var(--primary-color);
			border-radius: 50%;

			@media screen and (min-width: 600px) {
				width: 7rem;
				height: 4rem;
			}

			&most {
				height: 1rem;
				width: 1rem;
				background-color: #001122;
				border-radius: 50%;
				position: relative;
				overflow: hidden;

				@media screen and (min-width: 600px) {
					height: 1.4rem;
					width: 1.4rem;
				}

				&::after {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					height: 0.4rem;
					width: 0.4rem;
					background-color: #fff;
					border-radius: 50%;

					@media screen and (min-width: 600px) {
						height: 0.6rem;
						width: 0.6rem;
					}
				}
			}
		}
	}

	&__title {
		max-width: 34rem;
		font-size: 2rem;
		line-height: 3.2rem;
		font-weight: 500;

		@media screen and (min-width: 600px) {
			font-size: 4rem;
			line-height: 4rem;
		}
	}
}
</style>
