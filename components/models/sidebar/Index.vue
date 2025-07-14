<script setup lang="ts">
import type { Model } from '@/types/model'

const { selectedConversation } = storeToRefs(useConversationStore())
const { models, searchTerm } = storeToRefs(useModelsStore())

const filteredModels = computed(() => {
	if (!searchTerm) {
		return models.value
	}

	return models.value.filter((model) =>
		model.toLowerCase().includes(searchTerm.value)
	)
})

const selectModel = (model: Model) => {
	if (!selectedConversation.value) {
		return
	}

	selectedConversation.value.model = model
}
</script>

<template>
	<div class="flex flex-col w-[300px] bg-primary h-full">
		<ModelsSidebarHeader />

		<div class="flex flex-col px-5 gap-2.5 pb-5 flex-grow overflow-y-auto">
			<template v-if="models.length">
				<nui-card
					v-for="(model, index) in filteredModels"
					:key="index"
					:class="[
						'text-white p-0 bg-transparent cursor-pointer',
						{
							'bg-accent/50':
								selectedConversation?.model === model,
							'hover:bg-accent/25':
								selectedConversation?.model !== model
						}
					]"
					:ui="{ body: 'p-5 sm:p-5', root: 'ring-0' }"
					@click="selectModel(model)"
				>
					<div class="flex items-center gap-5 justify-between">
						<div class="select-none">
							{{ model }}
						</div>
					</div>
				</nui-card>
				<div
					v-if="searchTerm && filteredModels.length === 0"
					class="bg-warning/10 text-white p-5 rounded-lg"
				>
					No models match your search term
				</div>
			</template>
			<div
				v-else
				class="bg-danger/10 text-danger p-5 rounded-lg"
			>
				No models
			</div>
		</div>
	</div>
</template>
