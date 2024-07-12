import type { Commit } from "../type"

export function parseCommit(commitText: string): Commit {
  const lines = commitText.split("\n").filter((v) => !!v.trim())
  return {
    hash: lines[0].slice(7),
    author: lines[1].slice(8),
    date: lines[2].slice(8),
    context: lines
      .slice(3)
      .map((v) => v.trim())
      .join("\n"),
  }
}
