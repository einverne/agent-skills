---
name: gh-cli
description: Operate GitHub issues and pull requests with the `gh` CLI from the terminal, including listing, viewing, creating, commenting, editing, closing, reopening, marking ready or draft, merging, and checking PR status. Use when the user wants GitHub issue or PR work done via `gh`, or when a GitHub write operation must be verified with follow-up `gh` reads; also use for lightweight repository inspection with `gh repo view`.
---

# GitHub CLI Skill

Use `gh` for non-interactive GitHub issue and pull request work. Prefer explicit flags over prompts, avoid opening the browser unless requested, and verify every write with a follow-up read.

## Start Safely

- Confirm the CLI and authentication state when needed:

```bash
gh --version
gh auth status
```

- Resolve the target repository before writing. Prefer explicit `--repo owner/repo` unless the current checkout is definitely the correct repo:

```bash
gh repo view owner/repo --json nameWithOwner,url,defaultBranchRef
```

- Prefer explicit issue or PR numbers. Several `gh pr` subcommands default to the PR for the current branch when no argument is given.
- Prefer structured output for reads and verification:

```bash
gh issue view 123 --repo owner/repo --json number,title,state,url
gh pr view 456 --repo owner/repo --json number,title,state,isDraft,url
```

- Avoid `--web` unless the user explicitly asks to open the browser.

## Read Before Writing

Use read commands first when the current state is unclear:

```bash
gh issue list --repo owner/repo --state all --limit 50
gh issue list --repo owner/repo --search "label:bug sort:updated-desc"
gh issue view 123 --repo owner/repo --comments

gh pr list --repo owner/repo --state all --limit 50
gh pr list --repo owner/repo --search "status:success review:required"
gh pr view 456 --repo owner/repo --comments
gh pr checks 456 --repo owner/repo --required
```

Use `--json` together with `--jq` or `--template` when the result must be parsed or compared.

## Write Issues

Create:

```bash
gh issue create --repo owner/repo --title "Bug: ..." --body "..."
gh issue create --repo owner/repo --title "Feature: ..." --body-file issue.md --label "enhancement"
```

Edit or comment:

```bash
gh issue edit 123 --repo owner/repo --title "..." --body "..."
gh issue edit 123 --repo owner/repo --add-label "bug,help wanted" --add-assignee "@me"
gh issue comment 123 --repo owner/repo --body "..."
```

Close or reopen:

```bash
gh issue close 123 --repo owner/repo --reason completed
gh issue close 123 --repo owner/repo --duplicate-of 456
gh issue reopen 123 --repo owner/repo --comment "Reopening after follow-up review"
```

Verify every write:

```bash
gh issue view 123 --repo owner/repo --json number,title,state,stateReason,assignees,labels,url,updatedAt
```

## Write Pull Requests

Before creating a PR, confirm the local branch context:

```bash
git status --short
git rev-parse --abbrev-ref HEAD
```

Create:

```bash
gh pr create --repo owner/repo --base main --head my-branch --title "..." --body "..."
gh pr create --repo owner/repo --draft --base main --head my-branch --title "..." --body-file pr.md
```

Edit, comment, and manage review state:

```bash
gh pr edit 456 --repo owner/repo --title "..." --body "..."
gh pr edit 456 --repo owner/repo --add-reviewer monalisa --add-label "needs-review"
gh pr comment 456 --repo owner/repo --body "..."
gh pr ready 456 --repo owner/repo
gh pr ready 456 --repo owner/repo --undo
```

Close, reopen, merge, and inspect checks:

```bash
gh pr close 456 --repo owner/repo --comment "Closing in favor of #789"
gh pr reopen 456 --repo owner/repo --comment "Reopening after follow-up changes"
gh pr merge 456 --repo owner/repo --squash
gh pr merge 456 --repo owner/repo --auto
gh pr checks 456 --repo owner/repo --required
```

Verify every write:

```bash
gh pr view 456 --repo owner/repo --json number,title,state,isDraft,reviewDecision,mergeStateStatus,mergedAt,url,updatedAt
```

## Respect CLI and Platform Constraints

- Treat `gh pr create --dry-run` as potentially side-effecting. It may still push git changes.
- When the current branch is not pushed, `gh pr create` may prompt to push or fork. Use `--head` to avoid surprise branch selection.
- `gh pr ready --undo` exists, but draft conversion is only available when the GitHub plan supports it.
- Project operations such as `--project`, `--add-project`, or `--remove-project` require the `project` scope:

```bash
gh auth refresh -s project
```

- In repositories with a merge queue, `gh pr merge` may add the PR to the queue or enable auto-merge instead of merging immediately. Do not promise an immediate merge unless the resulting state is verified.
- Use `gh issue`, `gh pr`, and `gh repo` subcommands first. Reach for `gh api` only when high-level commands cannot express the requested change.
- If a command prints a new issue or PR URL, do not stop there. Read the object back and confirm the repository, number, title, and state.
