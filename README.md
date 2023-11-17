# GitHub Digest

GitHub Digest is a command-line tool that fetches the number of commits for each day in a specific date range for a list of repositories.

## Description

This tool is designed to help you keep track of the commit activity in your GitHub repositories. It fetches the number of commits for each day in a specified date range for a list of repositories, and displays the data in a table format. You can choose to view the data grouped by repository or by date.

## Usage

Create an `.env` file based on `.env.example`
Replace the env variables with your info

Run the command in your terminal:


`node index.js --start=YYYY-MM-DD --end=YYYY-MM-DD --repos=repo1,repo2,... --view=repo`
or 
```
cd github-digest
npm link
github-digest from anywhere in your terminal
```

### Example Output for One Repository

```
╔════════════╤═══════════════════╗
║ Date       │ Number of Commits ║
╟────────────┼───────────────────╢
║ 10/11/2023 │ 3                 ║
╟────────────┼───────────────────╢
║ 09/11/2023 │ 35                ║
╟────────────┼───────────────────╢
║ 08/11/2023 │ 9                 ║
╟────────────┼───────────────────╢
║ 07/11/2023 │ 14                ║
╟────────────┼───────────────────╢
║ 06/11/2023 │ 10                ║
╟────────────┼───────────────────╢
║ 03/11/2023 │ 20                ║
╟────────────┼───────────────────╢
║ 02/11/2023 │ 11                ║
╟────────────┼───────────────────╢
║ 30/10/2023 │ 11                ║
╟────────────┼───────────────────╢
║ 27/10/2023 │ 2                 ║
╟────────────┼───────────────────╢
║ 26/10/2023 │ 2                 ║
╟────────────┼───────────────────╢
║ 25/10/2023 │ 16                ║
╟────────────┼───────────────────╢
║ 24/10/2023 │ 7                 ║
╟────────────┼───────────────────╢
║ 23/10/2023 │ 10                ║
╟────────────┼───────────────────╢
║ 20/10/2023 │ 1                 ║
╟────────────┼───────────────────╢
║ 19/10/2023 │ 7                 ║
╚════════════╧═══════════════════╝
```

### Example Output for One Date

Date: 2022-01-01
07/11/2023
```
╔═════════════╤═══════════════════╗
║ Repository  │ Number of Commits ║
╟─────────────┼───────────────────╢
║ repo-1      │ 14                ║
╟─────────────┼───────────────────╢
║ repo 2      │ 2                 ║
╟─────────────┼───────────────────╢
║ repo 3      │ 4                 ║
╟─────────────┼───────────────────╢
║ repo 4      │ 2                 ║
╚═════════════╧═══════════════════╝
```

## Command Options

- `--start, -s`: The start date of the date range. Optional. If not provided, defaults to 30 days ago.
- `--end, -e`: The end date of the date range. Optional. If not provided, defaults to today.
- `--repos, -r`: A comma-separated list of the repositories to fetch commits for. Optional. If not provided, defaults to a predefined list of repositories.
- `--view, -v`: The view mode. Can be 'repo', 'daily', or 'both'. 'repo' displays one table per repository, 'daily' displays one table per date, and 'both' displays both. Optional. If not provided, defaults to 'both'.

To use this tool, navigate to the directory containing the script and run `npm link`. This will create a global link to the script, allowing you to run it using the `github_digest` command instead of `node github_digest.js`.
