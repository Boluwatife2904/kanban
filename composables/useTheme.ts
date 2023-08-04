import useStatefulCookie from "./useStatefulCookie";

export function useTheme() {
	const selectedTheme = useStatefulCookie("theme");

	const setTheme = (theme: string) => {
		document.documentElement.className = theme;
		selectedTheme.value = theme;
	};

	const toggleTheme = () => {
		selectedTheme.value === "dark-mode" ? setTheme("light-mode") : setTheme("dark-mode");
	};

	return { selectedTheme, toggleTheme, setTheme };
}
