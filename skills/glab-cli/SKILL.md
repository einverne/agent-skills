---
name: glab-cli
description: Operate GitLab issues, merge requests, and lightweight repository inspection with the `glab` CLI from the terminal, including listing, viewing, creating, commenting, updating, closing, reopening, marking ready or draft, merging, and verifying results. Use when the user wants GitLab issue or merge request work done via `glab`, or when GitLab write operations should be followed by `glab` or `glab api` readback verification.
---

# GLab CLI Skill

Use `glab` for non-interactive GitLab issue and merge request work. Prefer explicit repository selection, avoid browser flows unless requested, and verify every write with a follow-up read.

## Start Safely

- Confirm the installed CLI version and current authentication state:

```bash
glab --version
glab auth status
glab config get host
```

- Prefer explicit repository selection with `-R group/namespace/repo` for issue and merge request commands.
- Prefer explicit issue or merge request IIDs. Many `glab mr` subcommands fall back to the merge request for the current branch when no IID is given.
- Avoid `--web` unless the user explicitly asks to continue in the browser.
- Treat the official docs as newer than some local installations. Before relying on a flag that may be version-sensitive, confirm it with:

```bash
glab <command> <subcommand> --help
```

## Resolve Context Before Writing

Confirm the target project and branch context first:

```bash
glab repo view group/namespace/repo
git status --short
git rev-parse --abbrev-ref HEAD
```

If you need structured project metadata, prefer `glab api`:

```bash
glab api projects/:fullpath
```

When running outside a repository checkout, placeholders such as `:fullpath` are unavailable. Use a numeric project ID or a URL-encoded project path instead.

## Read Before Writing

Use read commands first when the current state is unclear:

```bash
glab issue list -R group/namespace/repo --all
glab issue view 123 -R group/namespace/repo --comments

glab mr list -R group/namespace/repo --all
glab mr view 456 -R group/namespace/repo --comments
```

Recent `glab` versions expose `--output json` on several read commands. If the installed version does not, fall back to `glab api` for structured verification:

```bash
glab issue view 123 -R group/namespace/repo --output json
glab mr view 456 -R group/namespace/repo --output json

glab api projects/:fullpath/issues/123
glab api projects/:fullpath/merge_requests/456
```

Use `glab api --paginate --output ndjson` when you need machine-friendly bulk reads.

## Write Issues

Create:

```bash
glab issue create -R group/namespace/repo --title "Bug: ..." --description "..." --yes
glab issue create -R group/namespace/repo --title "Feature: ..." --description "..." --label "enhancement"
```

Update or comment:

```bash
glab issue update 123 -R group/namespace/repo --title "..." --description "..."
glab issue update 123 -R group/namespace/repo --label "bug,help wanted"
glab issue note 123 -R group/namespace/repo --message "..."
```

Close or reopen:

```bash
glab issue close 123 -R group/namespace/repo
glab issue reopen 123 -R group/namespace/repo
```

Verify every write:

```bash
glab issue view 123 -R group/namespace/repo --output json
# Fallback when --output json is unavailable:
glab api projects/:fullpath/issues/123
```

## Write Merge Requests

Create:

```bash
glab mr create -R group/namespace/repo --source-branch my-branch --target-branch main --title "..." --description "..." --yes
glab mr create -R group/namespace/repo --draft --source-branch my-branch --target-branch main --title "..." --description "..." --yes
```

Update, comment, and manage review state:

```bash
glab mr update 456 -R group/namespace/repo --title "..." --description "..."
glab mr update 456 -R group/namespace/repo --label "needs-review" --reviewer reviewer1
glab mr update 456 -R group/namespace/repo --ready
glab mr update 456 -R group/namespace/repo --draft
glab mr note 456 -R group/namespace/repo --message "..."
```

Close, reopen, or merge:

```bash
glab mr close 456 -R group/namespace/repo
glab mr reopen 456 -R group/namespace/repo
glab mr merge 456 -R group/namespace/repo --squash --yes
```

Verify every write:

```bash
glab mr view 456 -R group/namespace/repo --output json
# Fallback when --output json is unavailable:
glab api projects/:fullpath/merge_requests/456
```

## Respect CLI and Platform Constraints

- `glab` chooses its target GitLab instance from the current repository context, environment, or config. Use explicit `-R` and, when needed, `--hostname` on `glab api` or `glab auth` to avoid host mix-ups.
- `glab auth login` stores credentials in the global config by default. Environment tokens such as `GITLAB_TOKEN`, `GITLAB_ACCESS_TOKEN`, and `OAUTH_TOKEN` override stored credentials.
- `glab mr create --fill` and `glab mr update --fill` derive title and description from commits. In current docs, `glab mr create --fill` also enables pushing the branch. Do not use it blindly on an unreviewed local branch.
- Current GitLab docs describe `glab mr merge` with `--auto-merge` enabled by default. Do not promise an immediate merge until the merge request state is read back and confirmed.
- High-level read commands are convenient, but `glab api` is the reliable fallback for structured output, pagination, and exact state verification.
- If a command returns a URL or a success message, do not stop there. Read the issue or merge request back and confirm the repository, IID, title, and state.
