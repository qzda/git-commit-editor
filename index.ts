import { CommitEditor } from "./core"
import fullPaths from "./fullPaths"

const repoVuejsCore = new CommitEditor(fullPaths["vuejs/core"])
const commitHashList = await repoVuejsCore.getCommitHashHistory(5)
commitHashList.forEach(async (hash) => {
  const { commit } = (await repoVuejsCore.getCommit(hash)) || {}
  console.log(commit)
})

// repoVuejsCore
//   .getCommit("685e3f381c024b9f4023e60fe0545dc60d90d984")
//   .then((res) => {
//     console.log(res?.commit.context)
//   })
