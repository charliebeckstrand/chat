import type { Message } from '@/types/message'
import type { Model } from '@/types/model'

export type Conversation = {
	id: string
	title: string
	model: Model
	createdAt: Date
	messages: Array<Message>
}
