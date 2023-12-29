##
# Author dbxiao
# Copyright 2023-present libsx.com
#

#!/bin/sh

name='libsx'
branch='master'
usermail=''
version=$name@$version

# Print docker conf info
printInfo() {
    echo -e '\e[33m ##################################### \e[0m'
    echo -e '\e[32m 请确认构建信息：\e[0m'
    echo -e '\e[32m name:\e[0m' $name
    echo -e '\e[32m version:\e[0m' $version
    echo -e '\e[32m usermail:\e[0m' $usermail
    echo -e '\e[33m ##################################### \e[0m'
}

# files build to dist
b2dist() {
    rm -fr dist/
    sh install.sh
    pnpm run docs:build
    mkdir -p dist/view/libsx/
    cp -frp ./dist/res/libsx/index.html ./dist/view/libsx/
}

# file push to deploy directory
b2deploy() {
    printInfo
    deployBranch=$name@$version
    b2dist
    cd ./dist
    git init
    git remote add origin $deployRemote
    git config user.email $usermail
    git config user.name $usermail
    
    git checkout -b $deployBranch
    git remote -v & git branch
    git add .
    git status
    git commit -m $name@$version
    git push -f origin $deployBranch
    cd ../
}

b2webroot() {
    printInfo
    b2dist
    cp -frp ./dist/res/* ../xstack/webroot/res
    cp -frp ./dist/view/* ../xstack/webroot/view
}

b2pkg() {
	pnpm run build
}

## $1 = action
## $2 = project name
## $3 = branch name
## $4 = usermail
parameterFormate() {
    name=$2
    branch=$3
    usermail=$4
    version=$(echo $branch | sed 's/\//./g')
}

parameterFormate $1 $2 $3 $4

if [ $1 = '--b2dist' ];then
    b2dist
elif [ $1 = '--b2deploy' ];then
    b2deploy
elif [ $1 = '--b2webroot' ];then
    b2webroot
elif [ $1 = '--b2pkg' ];then
    b2pkg
else
    printInfo
fi
