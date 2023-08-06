export const useStore = defineStore("store", () => {
	const supabaseClient = useSupabaseClient();

	const logout = () => {
		supabaseClient.auth.signOut().then(() => {
			useEvent("notify", { type: "success", message: "You have been logged out successfully!" });
			navigateTo({ name: "index" }, { replace: true });
		});
	};

	return { logout };
});
