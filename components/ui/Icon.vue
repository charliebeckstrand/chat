<script setup lang="ts">
withDefaults(
	defineProps<{
		name: string
		size?: string
	}>(),
	{
		name: undefined,
		size: 'md'
	}
)

const sizeMap: Record<string, string> = {
	sm: 'size-6',
	md: 'size-7',
	lg: 'size-8'
}
</script>

<template>
	<nui-icon
		:name="name"
		:class="sizeMap[size]"
	/>
</template>
