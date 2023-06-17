<script setup lang="ts">
interface ModalProps {}

defineProps<ModalProps>();

const modelValue = defineModel<boolean>();
const showModalContent = ref(false);

onMounted(() => {
	watchEffect(() => {
		if (modelValue.value) {
			showModalContent.value = true;
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	});
});

const closeModal = () => {
	showModalContent.value = false;
	setTimeout(() => {
		modelValue.value = false;
	}, 50);
};
</script>

<template>
	<Teleport to="body">
		<Transition name="fade" mode="out-in" :appear="true">
			<div v-if="modelValue" class="modal position-fixed w-100 flex items-center content-center" @click.self="closeModal">
				<div class="modal__wrapper flex flex-column w-100 items-center content-center">
					<Transition name="slidein" mode="out-in" :appear="true">
						<div v-if="showModalContent" class="modal__body flex flex-column w-100 border-s">
							<div class="modal__header">
								<slot name="header" />
							</div>
							<div class="modal__content">
								<slot name="content" />
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style lang="scss" scoped>
.modal {
	top: 0;
	left: 0;
	background: rgb(0, 0, 0, 0.5);
	height: 100vh;
	padding: 0 1.6rem;
	z-index: 10;
	overflow-y: auto;

	&__wrapper {
		margin: auto;
		padding: 3rem 0;
		max-width: 48rem;
	}

	&__body {
		margin: 0;
		padding: 3.2rem;
		background-color: var(--white-background);
	}

    &__header {
        margin-bottom: 2.4rem;
    }
}
</style>
