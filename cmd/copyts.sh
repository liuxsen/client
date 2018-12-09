cd submodule/server
echo '拉取代码中...'
git pull
cd ../../
cp -f submodule/server/app/interface/* ./src/interface/

echo '更新完成。'