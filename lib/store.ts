import { create } from "zustand"
import type { Track } from "./types"
type PlayerState = { current?: Track; favorites: Record<string, true>; setCurrent: (t: Track) => void; toggleFavorite: (id: string) => void }
export const usePlayer = create<PlayerState>((set, get) => ({
  current: undefined,
  favorites: {},
  setCurrent: (t) => set({ current: t }),
  toggleFavorite: (id) => set({ favorites: { ...get().favorites, [id]: get().favorites[id] ? (undefined as unknown as true) : true } })
}))
