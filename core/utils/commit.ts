import type { Commit } from "../type"

export function parseCommit(commitText: string): Commit {
  const lines = commitText.split("\n").filter((v) => !!v.trim())
  const contextLines = lines.slice(3)
  const blanKCount = contextLines[0].match(/^\s*/)?.[0].length || 0

  return {
    hash: lines[0].slice(7),
    author: lines[1].slice(8),
    date: lines[2].slice(8),
    message: lines
      .slice(3)
      .map((v) => v.slice(blanKCount))
      .join("\n"),
  }
}

const emailRegex = /<([^>]+)>/

export function parseAuthor(author: string) {
  const email = emailRegex.exec(author)?.[1] || ""
  const name = author.replace(email, "").replace("<>", "").trim()

  return {
    name,
    email: email,
  }
}
