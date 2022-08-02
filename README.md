<div align="center">
  <h1>Eleventy 🤝 WordPress</h1>
  <strong>An Eleventy blog boilerplate powered by a WordPress backend.</strong>
  <br />
  <br />
  <a href="actions/workflows/deploy-to-netlify.yml"><img alt="GitHub Actions: Deploy to Netlify workflow" src="actions/workflows/deploy-to-netlify.yml/badge.svg" /></a> <a href="actions/workflows/build-and-test.yml"><img alt="GitHub Actions: Test workflow" src="actions/workflows/build-and-test.yml/badge.svg" /></a> <img alt="License" src="https://img.shields.io/github/license/saschazar21/eleventy-wordpress" />
  <br />
  <br />
  <br />
</div>

## What is it?

This repository contains an [Eleventy](https://11ty.dev) boilerplate, as well as an [AWS Lambda](https://aws.amazon.com/de/lambda/)-compatible [Netlify Function](https://functions.netlify.com) acting as a webhook target, for fetching data from a [WordPress REST API](https://developer.wordpress.org/rest-api/) and automatically commit and push to the Github repository stored in the [package.json](package.json) file.

After updating the repository, preconfigured [Github Actions](https://github.com/features/actions) rebuild and re-deploy the newly built site contents back to Netlify.

This way, access to the WordPress REST API and/or SQL database is not crucially needed for intermediate builds, as their latest content versions are always contained within this repository and even survive data loss within WordPress.

## Getting started

### Prerequisites

- [Node.js v16+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.dev/) or similar (optional)
- [WordPress](https://wordpress.org) - 2 possibilities:
  - locally installed via [XAMPP](https://www.apachefriends.org/download.html), etc...
  - running in a [Docker container](https://hub.docker.com/_/wordpress) (see running via `docker-compose`)

### Quick start

1. Install dependencies

   ```bash
   yarn # or npm install
   ```

1. Populate Eleventy's data sources locally. (Wordpress instance needs to be reachable)

   ```bash
   REST_API=<WordPress REST API endpoint> ts-node scripts/fetch.ts
   ```

1. Run development preview

   ```bash
   yarn dev # or npm run dev
   ```

## External deployment

### Prerequisites

- Account at [Netlify](https://netlify.com)
- Enabled [Github Actions](https://github.com/features/actions) setup, incl. necessary environment variables (see [.env.sample](.env.sample) and [deploy-to-netlify.yml](.github/workflows/deploy-to-netlify.yml) - _Deploy to Netlify_ step), _**OR**_
- directly build at Netlify (untested, set environment variables in [.env.sample](.env.sample) there, disable Github Actions)
- WordPress deployed somewhere with accessible REST API

### Webhook

To trigger a new deployment, the `/wp/hook` endpoint needs to be called using a `POST` request (the request body is ignored by default).

Any WordPress plugin, which is capable of sending a POST request (preferably with Basic authentication) whenever contents have changed should do. Something like this one: [WP Webhooks](https://wp-webhooks.com/).

Or, if periodical updates instead of updates based on content changes are preferred, something like [Netlify's Scheduled Functions](https://docs.netlify.com/netlify-labs/experimental-features/scheduled-functions/) might do the trick.

## License

Licensed under the MIT license.

Copyright ©️ 2022 [Sascha Zarhuber](https://sascha.work)
