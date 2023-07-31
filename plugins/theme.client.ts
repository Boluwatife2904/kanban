import useStatefulCookie from "~/composables/useStatefulCookie";

export default defineNuxtPlugin(() => {
	const theme = useStatefulCookie("theme") ?? "light-mode";
	console.log("theme >>>>", theme);
	const { setTheme } = useTheme();
	const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
	console.log("has dark preference >>>>", hasDarkPreference);
	console.log("typeof theme >>>>>", typeof theme);
	if (typeof theme !== "undefined") {
		setTheme(theme.value as string);
	} else {
		setTheme(hasDarkPreference ? "dark-mode" : "light-mode");
	}
});
