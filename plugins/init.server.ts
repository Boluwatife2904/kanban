export default defineNuxtPlugin(async (nuxtApp: any) => {
	const user = useSupabaseUser();
	const shouldFetch = nuxtApp.ssrContext.url !== "/provider";
	if (user.value && shouldFetch) {
		const boardStore = useBoardStore(nuxtApp.$pinia);
		await boardStore.fetchBoards();
	}
});
