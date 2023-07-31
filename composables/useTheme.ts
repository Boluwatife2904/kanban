import useStatefulCookie from "./useStatefulCookie";

export function useTheme() {
	const selectedTheme = useStatefulCookie("theme", "light-mode");

	const setTheme = (theme: string) => {
		if (theme === "dark-mode") {
			document.documentElement.className = theme;
			selectedTheme.value = theme;
		} else {
			document.documentElement.className = theme;
			selectedTheme.value = theme;
		}
	};

	const toggleTheme = () => {
		selectedTheme.value === "dark-mode" ? setTheme("light-mode") : setTheme("dark-mode");
	};

	return {
		selectedTheme,
		toggleTheme,
		setTheme,
	};
}
