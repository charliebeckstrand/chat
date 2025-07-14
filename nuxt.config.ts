// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
	modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],
	ui: {
		prefix: 'nui',
		theme: {
			colors: [
				'primary',
				'secondary',
				'accent',
				'success',
				'warning',
				'danger',
				'info',
				'white',
				'black'
			]
		}
	}
})
