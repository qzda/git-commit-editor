import { CommitEditor } from "../core/index.ts"
import fullPaths from "./fullPaths.ts"

const repoVuejsCore = new CommitEditor(fullPaths["vuejs/core"])

const commit = await repoVuejsCore.getCommit(
  "89e2d258dc3abaf82b1f855425c67ba751e0920b",
)
console.log(commit)
if (commit) {
  repoVuejsCore
    .changeCommitByHash("89e2d258dc3abaf82b1f855425c67ba751e0920b", commit)
    .then((res) => {
      res?.change()
    })
}
