export default defineNuxtPlugin(async (nuxtApp: any) => {
	const user = useSupabaseUser();
	const shouldFetch = !nuxtApp.ssrContext.url.includes("confirm");
	if (user.value && shouldFetch) {
		console.log("We are fetching user boards");
		const boardStore = useBoardStore(nuxtApp.$pinia);
		await boardStore.fetchBoards();
	}
});
