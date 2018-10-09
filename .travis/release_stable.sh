#!/usr/bin/env bash

MESSAGE=$(git log --format=%B -n 1 $TRAVIS_COMMIT)
git clone ${REPO}.git
cd public
cp ../${REPO_DIR}/Jenkinsfile ./Jenkinsfile
git init
git config --global user.name $COMMIT_AUTHOR_USERNAME
git config --global user.email $COMMIT_AUTHOR_EMAIL
git remote add travis-build ${REPO}.git
git checkout -b stable
git add .
git commit -m 'Build Stable by Travis'
git push --force --set-upstream travis-build stable:stable