# GitHub Digest

GitHub Digest is a command-line tool that fetches the number of commits for each day in a specific date range for a list of repositories.

## Description

This tool is designed to help you keep track of the commit activity in your GitHub repositories. It fetches the number of commits for each day in a specified date range for a list of repositories, and displays the data in a table format. You can choose to view the data grouped by repository or by date.

## Usage

Run the command in your terminal:


`node index.js --start=YYYY-MM-DD --end=YYYY-MM-DD --repos=repo1,repo2,... --view=repo`
or 
```
cd github-digest
npm link
github-digest from anywhere in your terminal
```

### Example Output for One Repository

\`\`\`
Repository: FakeRepo

Date        Number of Commits
2022-01-01  10
2022-01-02  5
2022-01-03  8
\`\`\`

### Example Output for One Date

\`\`\`
Date: 2022-01-01

Repository  Number of Commits
FakeRepo1   10
FakeRepo2   7
FakeRepo3   5
\`\`\`

## Command Options

- `--start, -s`: The start date of the date range. Optional. If not provided, defaults to 30 days ago.
- `--end, -e`: The end date of the date range. Optional. If not provided, defaults to today.
- `--repos, -r`: A comma-separated list of the repositories to fetch commits for. Optional. If not provided, defaults to a predefined list of repositories.
- `--view, -v`: The view mode. Can be 'repo', 'daily', or 'both'. 'repo' displays one table per repository, 'daily' displays one table per date, and 'both' displays both. Optional. If not provided, defaults to 'both'.

To use this tool, navigate to the directory containing the script and run `npm link`. This will create a global link to the script, allowing you to run it using the `github_digest` command instead of `node github_digest.js`.
