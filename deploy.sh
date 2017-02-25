#!/bin/bash

# get git pass
. $HOME/conf/.alias_functions

git add .
git commit --amend -m "deploy_`date +"%Y%m%d"`"
git push origin master --force
