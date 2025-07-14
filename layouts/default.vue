<script setup lang="ts">
import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot
} from '@headlessui/vue'

const {
	selectedConversation,
	showMobileConversationsSidebar,
	showModelsSidebar
} = storeToRefs(useConversationStore())

watch(
	selectedConversation,
	(conversation) => {
		if (conversation?.id) {
			showMobileConversationsSidebar.value = false
		}
	},
	{ immediate: true }
)
</script>

<template>
	<div class="flex h-full overflow-hidden">
		<ConversationsSidebar class="lg:flex hidden" />

		<TransitionRoot
			as="template"
			:show="showMobileConversationsSidebar"
		>
			<Dialog
				as="div"
				class="lg:hidden"
				@close="showMobileConversationsSidebar = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 z-30 bg-black/50" />
				</TransitionChild>

				<div class="flex fixed inset-0 z-40">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel>
							<ConversationsSidebar />
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>

		<div
			v-if="selectedConversation?.id"
			class="flex flex-col flex-1"
		>
			<ChatHeader />

			<div class="flex flex-1 px-5 overflow-hidden">
				<ChatMessages />
			</div>

			<div class="p-5 overflow-hidden">
				<ChatTextarea />
			</div>
		</div>
		<div
			v-else
			class="p-5"
		>
			<div class="bg-danger/10 text-danger p-5 rounded-lg">
				<div class="font-bold">No conversation selected</div>
				<div>Add a new conversation to start chatting.</div>
			</div>
		</div>

		<TransitionRoot
			as="template"
			:show="showModelsSidebar"
		>
			<Dialog
				as="div"
				@close="showModelsSidebar = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 z-30 bg-black/50" />
				</TransitionChild>

				<div class="flex fixed inset-0 z-40">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="translate-x-full"
					>
						<DialogPanel class="relative ml-auto">
							<ModelsSidebar />
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>
