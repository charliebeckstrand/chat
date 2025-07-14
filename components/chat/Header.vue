<script setup lang="ts">
const {
	selectedConversation,
	showMobileConversationsSidebar,
	showModelsSidebar
} = storeToRefs(useConversationStore())

const { searchTerm } = storeToRefs(useChatStore())
const searching = ref(false)

const startSearch = () => {
	searching.value = !searching.value
}

const cancelSearch = () => {
	searching.value = false
	searchTerm.value = ''
}
</script>

<template>
	<div
		class="flex items-center p-5 gap-5 w-full justify-between min-h-[96.5px]"
	>
		<div class="flex items-center gap-5">
			<div class="lg:hidden flex">
				<ui-button
					variant="ghost"
					square
					@click="showMobileConversationsSidebar = true"
				>
					<ui-icon name="ic:baseline-menu" />
				</ui-button>
			</div>
			<div
				:class="[
					'flex-col gap-1',
					{
						'lg:flex hidden': searching,
						flex: !searching
					}
				]"
			>
				<div class="font-bold text-[18px]">
					{{ selectedConversation?.title }}
				</div>
				<div>
					<nui-badge
						class="text-white cursor-pointer select-none"
						@click="showModelsSidebar = true"
					>
						{{ selectedConversation?.model }}
					</nui-badge>
				</div>
			</div>
		</div>
		<div :class="{ 'lg:flex-none flex-1': searching }">
			<ui-button
				v-if="!searching"
				variant="ghost"
				square
				@click="startSearch"
			>
				<ui-icon name="ic:round-search" />
			</ui-button>
			<div
				v-else
				class="flex items-center gap-1"
			>
				<nui-input
					v-model="searchTerm"
					size="xl"
					variant="none"
					placeholder="Search messages"
					class="w-full"
					autofocus
					:ui="{
						base: 'text-black focus-visible:ring-0'
					}"
					@blur="cancelSearch"
				/>
				<ui-button
					variant="ghost"
					color="danger"
					square
					@click.stop.prevent="cancelSearch"
				>
					<ui-icon name="ic:twotone-close" />
				</ui-button>
			</div>
		</div>
	</div>
</template>
