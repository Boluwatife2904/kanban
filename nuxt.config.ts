// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			title: "Kanban | Home",
			charset: "UTF-8",
			viewport: "width=device-width, initial-scale=1, maximum-scale=1",
			meta: [
				{ hid: "theme-color", name: "theme-color", content: "#635fc7" },
				{ hid: "description", name: "description", content: "Flow your way to productivity: Your tasks, simplified with Kanban!" },
				{ hid: "og:description", name: "og:description", content: "Flow your way to productivity: Your tasks, simplified with Kanban!" },
				{ hid: "twitter:description", name: "twitter:description", content: "Flow your way to productivity: Your tasks, simplified with Kanban!" },
				{ hid: "og:title", name: "og:title", content: "Kanban | Home" },
				{ hid: "twitter:title", name: "twitter:title", content: "Kanban | Home" },
				{ hid: "og:site_name", name: "og:site_name", content: "Kanban" },
				{ hid: "og:url", name: "og:url", content: "https://kanban-lemon-nu.vercel.app" },
				{ hid: "og:type", name: "og:type", content: "website" },
				{ hid: "og:image", name: "og:image", content: "https://res.cloudinary.com/juwon-tech/image/upload/v1690890263/Screenshot_2023-08-01_at_12.42.53_ozhoqb.png" },
				{ hid: "twitter:image", name: "twitter:image", content: "https://res.cloudinary.com/juwon-tech/image/upload/v1690890263/Screenshot_2023-08-01_at_12.42.53_ozhoqb.png" },
			],
		},
	},
	devtools: { enabled: true, timeline: { enabled: true } },
	vite: {
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@import "@/assets/scss/abstract/_mixins.scss";
					`,
				},
			},
		},
	},
	css: ["@/assets/scss/index.scss", "@/assets/scss/fonts.scss"],
	modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
	runtimeConfig: {
		public: {
			frontendBaseUrl: process.env.FRONTEND_BASE_URL,
		},
	},
	pinia: {
		autoImports: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
	},
	imports: {
		dirs: ["stores"],
	},
	supabase: {
		redirect: false
	}
});
