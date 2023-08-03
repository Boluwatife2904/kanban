export const useStore = defineStore("store", () => {
	const authClient = useSupabaseAuthClient();

	const logout = () => {
		authClient.auth.signOut().then(() => {
			useEvent("notify", { type: "success", message: "You have been logged out successfully!" });
			navigateTo({ name: "index" }, { replace: true });
		});
	};

	return { logout };
});
