/* eslint-disable */
const childProcessExec = require('child_process').exec;
const util = require('util');

const BRANCH_CONTRACT = /^([A-Z]{1,7}-[0-9]{1,6}-)|(release-\d{2}-\d{2}-\d{4})/;
const TIMEOUT_THRESHOLD = 3000;

const exec = util.promisify(childProcessExec);

async function getCurrentBranch() {
  const branchesOutput = await exec('git branch');
  if (branchesOutput.stderr) {
    throw new Error(branchesOutput.stderr);
  }
  const branches = branchesOutput.stdout;
  return branches
    .split('\n')
    .find(b => b.trim().charAt(0) === '*')
    .trim()
    .substring(2);
}

function handleGitBranchCommandError(e) {
  console.log(
    'something bad happened when trying to read the repository branches using the "git branch" command'
  );
  console.log(
    "this is script is intended to be run as a git hook inside a git repository. Are you sure you're calling it properly?"
  );
  console.log('the error provided by the "git branch" invocation was the following:');
  console.log(e.getMessage());
  console.log('----');
  console.log('Your commit will be rejected. This script will terminate.');
  process.exit(1);
}

function handleBadBranchName() {
  console.log(`Branch name is wrong, in this project must adhere to this contract:${BRANCH_CONTRACT}`);
  console.log(
    'they must start either with the Jira card (for example: OPC-720) followed by a "-" char and then a descriptive name'
  );
  console.log(
    'Your commit will be rejected. You should rename your branch to a valid name, for instance, you could run a command like the following to rename your branch:'
  );
  console.log('git branch -m OPC-720-some-feature');
  process.exit(1);
}

async function checkBranchName() {
  let branchName = '';
  try {
    branchName = await getCurrentBranch();
  } catch (e) {
    handleGitBranchCommandError(e);
  }

  if (!BRANCH_CONTRACT.test(branchName)) {
    handleBadBranchName();
  }

  process.exit(0);
}

function hookCleanup() {
  setTimeout(() => {
    console.log(
      'This is a timeout message from your commit-msg git hook. If you see this, something bad happened in your pre-commit hook, and it absolutely did not work as expected.'
    );
    console.log(
      ' Your commit will be rejected. Please read any previous error message related to your commit message, and/or check the commit-msg git hook script.'
    );
    console.log(
      ' You can find more info in this link: https://git-scm.com/book/uz/v2/Customizing-Git-An-Example-Git-Enforced-Policy'
    );
    process.exit(1);
  }, TIMEOUT_THRESHOLD);
}

checkBranchName();
hookCleanup();
/* eslint-enable */
