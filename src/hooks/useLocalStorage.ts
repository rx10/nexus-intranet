import { useCallback, useEffect, useState } from 'react'

type Setter<T> = T | ((prev: T) => T)

/**
 * Persistent state mirrored to localStorage. SSR-safe and tolerant of
 * malformed/old payloads (returns the supplied initial value on parse failure).
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw == null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // quota / serialization failure — silently ignore for demo
    }
  }, [key, value])

  const update = useCallback(
    (next: Setter<T>) =>
      setValue((prev) =>
        typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      ),
    []
  )

  return [value, update] as const
}
