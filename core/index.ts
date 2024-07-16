import type { Commit } from "./type"
import { parseCommit, runCommand } from "./utils"

export class CommitEditor {
  readonly fullPath: string

  constructor(fullPath: string) {
    this.fullPath = fullPath
  }

  /** Run `command` under the `this.fullPath` */
  async run(command: string) {
    return await runCommand(command, this.fullPath)
  }

  async changeCommitByHash(hash: string, newCommit: Commit) {
    const _hash = (await this.getCommit(hash))?.hash
    if (_hash) {
      const sh = `
        if [ "$GIT_COMMIT" = "${_hash}" ]; then
          echo $GIT_COMMIT
          # 在这里执行你的操作，例如更改提交信息等
          # 你可以使用 git show $GIT_COMMIT 来获取更多关于这个提交的信息
        fi
      `
      return {
        change: async () => {
          console.log("change runing")
          const { stdout } = await this.run(
            `git filter-branch --env-filter '${sh}' --tag-name-filter cat -- --branches --tags`,
          )
          console.log(stdout)
        },
        confirm: () => {
          this.run("git push --force --tags origin 'refs/heads/*'")
        },
      }
    } else {
      console.error(`commit ${hash} not found`)
    }
  }

  async getCommit(hash: string = "") {
    const { stdout, stderr } = await this.run(
      `git show --no-patch --no-notes ${hash}`,
    )

    if (stderr) {
      console.error(stderr)
      return
    }

    return parseCommit(stdout)
  }

  async getCommitHashHistory(history: number = 10) {
    const { stdout, stderr } = await this.run(`git log --oneline -n ${history}`)

    if (stderr) {
      console.error(stderr)
      return
    }

    return stdout
      .split("\n")
      .map((i) => i.split(" ")[0])
      .filter((i) => !!i)
  }
}
