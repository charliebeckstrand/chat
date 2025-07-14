<script setup lang="ts">
import { SlickList, SlickItem } from 'vue-slicksort'

const { selectConversation, removeConversation } = useConversationStore()

const { conversations, selectedConversation, searchTerm } = storeToRefs(
	useConversationStore()
)

const filteredConversations = computed(() => {
	if (!searchTerm) {
		return conversations.value
	}

	return conversations.value.filter((conversation) =>
		conversation.title.toLowerCase().includes(searchTerm.value)
	)
})

const isDragging = ref(false)

const onDragStart = () => {
	isDragging.value = true
}

const onDragEnd = () => {
	isDragging.value = false
}
</script>

<template>
	<div class="flex flex-col w-[300px] bg-primary h-full">
		<ConversationsSidebarHeader />

		<div class="flex flex-col px-5 pb-5 flex-grow overflow-y-auto">
			<template v-if="conversations.length">
				<SlickList
					axis="y"
					v-model:list="conversations"
					lockAxis="y"
					:distance="5"
					:class="['flex flex-col', { dragging: isDragging }]"
					@sort-start="onDragStart"
					@sort-end="onDragEnd"
				>
					<SlickItem
						v-for="(conversation, index) in filteredConversations"
						:key="conversation.id || index"
						:index="index"
						class="mb-2.5 z-50"
					>
						<nui-card
							:class="[
								'conversation-card text-white p-0 bg-transparent cursor-pointer',
								{
									'bg-accent/50':
										selectedConversation?.id ===
										conversation.id,
									'hover:bg-accent/25':
										selectedConversation?.id !==
										conversation.id
								}
							]"
							:ui="{ body: 'p-5 sm:p-5', root: 'ring-0' }"
							tabindex="0"
							@click="selectConversation(conversation)"
							@keydown.enter="selectConversation(conversation)"
						>
							<div
								class="flex items-center gap-5 justify-between"
							>
								<div class="flex flex-col gap-1">
									<div class="select-none">
										{{ conversation.title }}
									</div>

									<div>
										<nui-badge
											color="neutral"
											class="select-none"
										>
											{{ conversation.model }}
										</nui-badge>
									</div>
								</div>

								<ui-button
									variant="ghost"
									color="white"
									square
									class="remove-conversation-button"
									@click.stop.prevent="
										removeConversation(conversation.id)
									"
								>
									<ui-icon
										name="ic:twotone-close"
										size="sm"
									/>
								</ui-button>
							</div>
						</nui-card>
					</SlickItem>
				</SlickList>
				<div
					v-if="searchTerm && filteredConversations.length === 0"
					class="bg-warning/10 text-white p-5 rounded-lg"
				>
					No conversations match your search term
				</div>
			</template>
			<div
				v-else
				class="bg-danger/10 text-danger p-5 rounded-lg"
			>
				No conversations
			</div>
		</div>
	</div>
</template>

<style>
.conversation-card {
	.remove-conversation-button {
		visibility: hidden;
	}

	&:hover {
		.remove-conversation-button {
			visibility: visible;
		}
	}
}

.dragging {
	.conversation-card {
		pointer-events: none;
		&:hover {
			.remove-conversation-button {
				visibility: hidden !important;
			}
		}
	}
}
</style>
