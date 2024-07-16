#!/bin/sh

git filter-branch --env-filter '

# 之前的邮箱 OLD_EMAIL
# 修改后的用户名 NEW_NAME
# 修改后的邮箱 NEW_EMAIL

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi

if [ "$GIT_COMMIT" = "abc123" ]; then
    # 在这里执行你的操作，例如更改提交信息等
    # 你可以使用 git show $GIT_COMMIT 来获取更多关于这个提交的信息
fi

' --tag-name-filter cat -- --branches --tags

git push --force --tags origin 'refs/heads/*'
