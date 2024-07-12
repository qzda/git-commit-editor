import { CommitEditor } from "./core"

const repoVuejsCore = new CommitEditor("~/dev/other/vuejs/core")
const commitHashList = await repoVuejsCore.getCommitHashHistory(5)
commitHashList.forEach(async (hash) => {
  const { commit } = (await repoVuejsCore.getCommit(hash)) || {}
  console.log(commit?.author)
})
