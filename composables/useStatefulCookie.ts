import { useCookie, useState, watch } from "#imports";

const expires = new Date();
expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);

export default function useStatefulCookie(name: string, defaultValue: string) {
	const cookie = useCookie(name, { expires, default: () => defaultValue });
	const state = useState(name, () => cookie.value);

	watch(
		state,
		() => {
			cookie.value = state.value;
		},
		{ deep: true }
	);

	return state;
}
