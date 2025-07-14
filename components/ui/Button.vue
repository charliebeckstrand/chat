<script setup lang="ts"></script>

<template>
	<nui-button class="rounded-full cursor-pointer">
		<template
			v-if="$slots.leading"
			#leading
		>
			<slot name="leading" />
		</template>

		<slot />

		<template
			v-if="$slots.trailing"
			#trailing
		>
			<slot name="trailing" />
		</template>
	</nui-button>
</template>
