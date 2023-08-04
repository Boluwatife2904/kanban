import useStatefulCookie from "~/composables/useStatefulCookie";

export default defineNuxtPlugin(() => {
	const theme = useStatefulCookie("theme");
	const { setTheme } = useTheme();
	const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (theme.value) {
		setTheme(theme.value as string);
	} else {
		setTheme(hasDarkPreference ? "dark-mode" : "light-mode");
	}
});
