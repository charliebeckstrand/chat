<script setup lang="ts">
const props = defineProps<{
	message: {
		role: 'user' | 'assistant'
		content: string
	}
}>()
</script>

<template>
	<nui-card
		:class="[
			'text-white max-w-[80%]',
			{
				'bg-accent ml-auto selection:!bg-white selection:!text-black':
					message.role === 'user',
				'bg-primary mr-auto': message.role === 'assistant'
			}
		]"
		:ui="{ body: 'p-5 sm:p-5', root: 'ring-0' }"
	>
		{{ message.content }}
	</nui-card>
</template>
