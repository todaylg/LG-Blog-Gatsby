---
title: Git基础
category: "基础备忘"
cover: bg.jpg
author: todaylg



---

## Git常用指令

用过一段时间的Github客户端，感觉确实是简单粗暴有效，但是缺点也很明显：用到一些高级或者说是复杂一些的功能时就无能为力了，并且使用命令行自己也知晓每一步都在干啥，所以使用命令行还是利大于弊的

#### Git基本命令

- git init/git clone 初始化git仓库

- git status 查看仓库的状态（没事就输下）

- git add xxx 然后git commit -m 'test~'进行提交

- git log 查看所有的commit记录

- git branch查看分支及所在分支情况（默认是主分支master），新建分支为git branch xxx。删除分支为git branch -d xxx，强制删除为git branch -D xxx（分支还没合并就想直接删除就得用这个）. 注意：find . -name ".git" | xargs rm -Rf 可以删除git仓库。

- git checkout xxx。切换到xxx分支。5和6可以一步到位：git checkout -b xxx，新建并切换分支。

- git merge xxx。把xxx分支合并过来（合并到你输入这行命令时你所在的分支，如果是要合并到master分支你首先就要切换到master分支下再输入这行命令）

- git tag V1.xxx。新建一个标签，便于版本切换。（也就相当于版本库的一个快照）.git tag V1.xxx commitId(默认的是把标签打到最新提交的commit上的，也可以像这样指定commitId来打tag)。git show tagname可以查看标签信息。还可以创建带有说明的标签：-a指定标签吗，-m指定说明文字：git tag -a v1.0 -m ‘test~~’。-d还可以删除标签，至于更复杂的就先不提了，用到了再说。

#### Github

- Git/Github先配好SSH，之后：git remote add origin git@server-name:path/repo-name.git 关联一个远程库(后面的一串可以从github获得，origin是默认的名字)

- git pull origin master。将远程代码更新到本地，一般在push之前都先pull，这样不容易冲突。

- git push origin master。将本地代码推送到远程master分支。（第一次git push -u origin master推送master分支的所有内容）

#### 其他操作

- 每次commit都会产生一条log，log记录提交者的姓名和邮箱，这两条信息时可以更改的：git config --global user.name 'xxx'/git config --global user.email'xxx'.

- alias git config --global alias.xx xxxxx 可以进行简写。

- git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative" 之后输入git lg，重新排版的git log

- git config --global core.editor "vim" # 设置Editor使用vim（默认是Vi）

- git config --global color.ui true Git着色（好像默认就是着色的）

- git config --global core.quotepath false # 设置显示中文文件名

- git diff。查看修改的内容（以Unix同样的diff格式显示），直接输入git diff只能显示当前文件和暂存区文件的差别（也就是没有执行git add的文件），当然也还可以有其他的比较用法：git diff <$id1> <$id2>比较两次commit之间的差异、git diff <branch1> <branch2>比较两个分支之间差异、git diff --staged 比较暂存区和版本库之间的差异。

- git checkout -- index.html(这个--怎么有没有都可以啊？？)。checkout除了切换分支还有个作用是撤销（即使是文件删除了也可以撤销回来），对于还没有进行git add的更改，可以使用checkout进行撤销改动，直接把文件还原(若是已经add了的，则用：git reset HEAD index.html)。

- git stash。将当前分支还没有commit的代码先暂存起来，这个时候git status就啥也没了，git stash list可以查看暂存的记录。这时候你就可以在源代码上直接修改并发布啥的而不用删除最开始写在上面的代码了。git stash apply即可还原代码，git stash drop删掉stash记录，就当一切都没有发生过。一部到位的是git stash pop可以代替apply和drop。git stash clear是直接清空。

- merge/rebase，两者都是合并，前者便于分清楚合并来源，后者按顺序重新排序整理改动，但是自然也就很难清晰的知道合并来源了。

- git commit -a --allow-empty-message -m '' 提交的时候输入空的说明。这个哈哈哈哈老爽了（客户端本来默认是必要参数）

#### 版本回退

- git lg显示出所有从开始道现在的所有commit记录，有了commitId在各个版本之间就可以随意串行了。

- git reset --hard。HEAD 回退到上一个版本

- git reflag。记录每一次的命令，可以看到之前版本的commitId，免得回到上一个版本之后回不去了（git log不会只会显示之前的版本信息）

- git reset --hard xxxxx。通过commitId就可以在任意版本之间自由切换了，这里commitId也不用输全，输个几位git自己就找到了。

- 没git add可以git checkout撤销，git add了还可以git reset -- file把暂存区的修改退回工作区，git commit了也还可以git reset --hard xxxxx进行版本回退，但是要是你git push到远程仓库了，那就只能gg了。