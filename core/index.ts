import type { Commit } from "./type"
import { runCommand } from "./utils"
import { parseCommit } from "./src/commit"

export class CommitEditor {
  readonly fullPath: string

  constructor(fullPath: string) {
    this.fullPath = fullPath
  }

  private runCommandRetain = async (command: string) => {
    return await runCommand(`${command}`, this.fullPath)
  }

  changeCommit = async (hash: string, newCommit: Commit) => {
    // todo
  }

  async getCommit(hash: string = "") {
    const { stdout, stderr } = await this.runCommandRetain(
      `git show --no-patch --no-notes ${hash}`,
    )

    if (stderr) {
      console.error(stderr)
      return
    }

    return {
      text: stdout,
      commit: parseCommit(stdout),
    }
  }

  async getCommitHashHistory(history: number = 10) {
    const { stdout } = await this.runCommandRetain(
      `git log --oneline -n ${history}`,
    )

    return stdout
      .split("\n")
      .map((i) => i.split(" ")[0])
      .filter((i) => !!i)
  }
}
