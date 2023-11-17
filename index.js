#!/usr/bin/env node

/*
Fetching all repositories for an organization and then getting the commits for each repository can be quite resource-intensive and time-consuming, especially for large organizations with many repositories. Each request to the GitHub API takes time and consumes a portion of your rate limit. If you're making a large number of requests in a short period of time, you could hit the rate limit and have to wait for it to reset before you can make more requests.

Additionally, the GitHub API does not provide a straightforward way to determine if a user is a contributor to a repository. The Events API only includes events from the past 90 days, so if a user hasn't pushed code to a repository in that time, they wouldn't be included in the results. The Contributors API can tell you who has contributed to a repository, but it doesn't tell you when those contributions were made, so you can't use it to get recent commits.

By specifying a list of repositories, you can focus on the repositories that you're most interested in and avoid unnecessary API requests. This can make your script run faster and reduce the risk of hitting the rate limit. It also allows you to work around the limitations of the GitHub API by manually specifying which repositories to include.Fetching all repositories for an organization and then getting the commits for each repository can be quite resource-intensive and time-consuming, especially for large organizations with many repositories. Each request to the GitHub API takes time and consumes a portion of your rate limit. If you're making a large number of requests in a short period of time, you could hit the rate limit and have to wait for it to reset before you can make more requests.

Additionally, the GitHub API does not provide a straightforward way to determine if a user is a contributor to a repository. The Events API only includes events from the past 90 days, so if a user hasn't pushed code to a repository in that time, they wouldn't be included in the results. The Contributors API can tell you who has contributed to a repository, but it doesn't tell you when those contributions were made, so you can't use it to get recent commits.

By specifying a list of repositories, you can focus on the repositories that you're most interested in and avoid unnecessary API requests. This can make your script run faster and reduce the risk of hitting the rate limit. It also allows you to work around the limitations of the GitHub API by manually specifying which repositories to include.
*/
import 'dotenv/config'

import axios from 'axios';
import { table } from 'table';
import moment from 'moment';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';


const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchCommitsForUser(username, repoName, startDate, endDate) {
    let page = 1;
    let commits = {};
    console.log(`Fetching commits for repository ${repoName}...`);
    while (true) {

      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits?page=${page}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
  
      if (response.data.length === 0) {
        break;
      }
  
      for (let commit of response.data) {
        const commitDate = new Date(commit.commit.author.date);
        if (commitDate >= startDate && commitDate <= endDate) {
          const dateStr = commitDate.toLocaleDateString();
          if (!commits[dateStr]) {
            commits[dateStr] = 0;
          }
          commits[dateStr]++;
        }
      }
  
      page++;
    }
  
    return Object.entries(commits).map(([date, count]) => [date, count]);
  }
  
async function main() {
  const orgName = process.env.ORGANIZATION;

  const argv = yargs(hideBin(process.argv))
    .option('start', {
      alias: 's',
      type: 'string',
      description: 'Start date'
    })
    .option('end', {
      alias: 'e',
      type: 'string',
      description: 'End date'
    })
    .option('repos', {
      alias: 'r',
      type: 'string',
      description: 'Comma separated list of repositories'
    })
    .option('view', {
      alias: 'v',
      type: 'string',
      description: 'View mode (repo, daily, or both)',
      default: 'both'
    })
    .argv;

  const repos = argv.repos ? argv.repos.split(',') : process.env.REPO_NAMES.split(',');
  const startDate = argv.start ? new Date(argv.start) : moment().subtract(30, 'days').toDate();
  const endDate = argv.end ? new Date(argv.end) : new Date();
  const view = argv.view ? argv.view : 'both';

  let commitsByDate = {};
  let commitsByRepo = {};

  for (let repo of repos) {
    const commits = await fetchCommitsForUser(orgName, repo, startDate, endDate);

    commitsByRepo[repo] = commits;

    for (let [date, numCommits] of commits) {
      if (!commitsByDate[date]) {
        commitsByDate[date] = {};
      }
      commitsByDate[date][repo] = numCommits;
    }
  }
  if (view === 'repo' || view === 'both') {
    for (let repo in commitsByRepo) {
      let data = [['Date', 'Number of Commits']];
      data.push(...commitsByRepo[repo]);

      console.log(`\n${repo}`);
      console.log(table(data));
    }
  }

  if (view === 'daily' || view === 'both') {
    for (let date in commitsByDate) {
      let data = [['Repository', 'Number of Commits']];
      for (let repo in commitsByDate[date]) {
        data.push([repo, commitsByDate[date][repo]]);
      }

      console.log(`\n${date}`);
      console.log(table(data));
    }
  }
}

main().catch(console.error);