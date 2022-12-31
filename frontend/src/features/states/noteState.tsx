export type Note = {
  _id: string
  title: string
  category: string
  content: string
  updatedAt: string
  createdAt: string
  user: string
}

export interface NoteState {
  loading: null | boolean
  error: string | null | boolean
  success: boolean | null
  notes: Array<Note>
}

export const state: NoteState = {
  loading: false,
  error: null,
  success: null,
  notes: Array<Note>(),
}
