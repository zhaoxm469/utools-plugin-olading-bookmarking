// module.exports.pull = function () {
//   const { execSync } = require("child_process");

//   const repoUrl = "https://b79016daf026dd01921ce5d9b9733e95@gitee.com/username/repo.git"; 
//   const branchOrTag = "master"; // 分支或标签名称
//   const targetDir = "db"; // 目标目录名称

//   const command = `git clone -b ${branchOrTag} --depth 1 ${repoUrl} ${targetDir}`;

//   const error = execSync(command);
//   console.log(error)
// };

const { exec } = require("child_process");

const username = "olading"
const password = "123qwe"
const repoUrl = "https://gitee.com/izhaoxm/olading-utools-bookmarking.git"; 
const branchOrTag = "master"; // 分支或标签名称
const targetDir = "db"; // 目标目录名称

const command = `git clone -b ${branchOrTag} --depth 1  --username ${username} --password ${password} ${repoUrl} ${targetDir}`;

// const error = execSync(command);
// console.log(error)

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行命令 ${command} 失败: ${error}`);
    return;
  }
  console.log(`从 ${repoUrl} 拉取 ${branchOrTag} 分支下的代码到 ${targetDir} 目录成功！`);
});
