# Contributing to project
As a contributor, here are guidelines we would like you to follow:
- [Branches](#branches)
- [Workflow](#workflow)
- [Commit Message Convention](#commit-message-convention)

## Branches
There are mainly 3 branches in this project:
- `master` - This branch is **only** for production. You must not push or open pull request to this branch by any reason.
- `staging` - This branch is for staging, which is used in front-end development. You should not push or open pull request to this branch.
- `dev` - This branch stores the code in development. This is the branch to open pull request.

For your `origin`, please create new branches when debugging and/or making new features with name as following:
- `feat/<name>` - Creating a new feature. `<name>` is the name of feature.
- `fix/<name>`- Fixing bugs in a feature. `<name>` is the name of the feature that contains bugs.

For other tasks, any name can be used if the tasks do not correspond to any mentioned tasks.

## Workflow
Please follow this workflow when bugs found and/or requesting new features:
1. Create new issue(s) with clear information (templates provided).
2. Write code.
3. Commit to your `origin` repository.
4. Create Pull request to `upstream/dev` (other branches are not allowed, unless approved by reviewers).
5. Wait for code review.

![](workflow.jpg)

## Commit Message Convention
We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are **easy to follow** when looking through the project history.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests
* **script**: Adding scripts or correcting existing scripts.
* **type**: Change that related to types (adding types, remove types).

### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
