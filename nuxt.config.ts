// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
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
	modules: ["@nuxtjs/supabase"],
});
