git init

dir > deleteme.txt
git add .
git commit -m "Initial dummy commit"

git remote add -f node-gallery-app https://github.com/ciano1000/node-gallery-app.git

git merge node-gallery-app/master --allow-unrelated-histories

git rm .\deleteme.txt
git commit -m "Clean up initial file"

mkdir node-gallery-app
dir -exclude node-gallery-app | %{git mv $_.Name node-gallery-app}

git commit -m "Move node files into subdir"

git remote add -f angular-gallery-app https://github.com/ciano1000/angular-gallery-app.git
git merge angular-gallery-app/master --allow-unrelated-histories
mkdir angular-gallery-app
dir -exclude node-gallery-app,angular-gallery-app | %{git mv $_.Name angular-gallery-app}
git commit -m "Move angular files into subdir"
Read-Host -Prompt "Press Enter to exit"

git init

dir > deleteme.txt
git add .
git commit -m "Initial dummy commit"

git remote add -f node-gallery-app https://github.com/ciano1000/node-gallery-app.git

git merge node-gallery-app/master

git rm .\deleteme.txt
git commit -m "Clean up initial file"

mkdir node-gallery-app
dir -exclude node-gallery-app | %{git mv $_.Name node-gallery-app}

git commit -m "Move node files into subdir"

git remote add -f angular-gallery-app https://github.com/ciano1000/angular-gallery-app.git
git merge angular-gallery-app/master
mkdir angular-gallery-app
dir -exclude node-gallery-app,angular-gallery-app | %{git mv $_.Name angular-gallery-app}
git commit -m "Move angular files into subdir"
Read-Host -Prompt "Press Enter to exit"