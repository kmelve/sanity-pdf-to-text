# Extract text from pdf uploads to Sanity.io

This is a proof of concept example of how to use lambdas on [Zeit’s Now](https://zeit.co/now) to annotate asset documents for pdf uploads to Sanity.io with the embedded text (if there is any).

## Getting started

First change `projectId` and `dataset` in `now.json` to yours. Then run the following in the command line:

```text
$ npm i -g now && npm i
# install dependencies

$ now secrets add SANITY_TOKEN <your token with write rights>
# add token to be able to patch asset documents

$ now
# deploy on now
```

When you have the URL for your deployment on Now, you can add it to a webhook for your Sanity.io project. Note that you want to point to the path `/api/extract` on your Now deployment.

```text
$ sanity hook create
? Hook name: <Your descriptive name>
? Select dataset hook should apply to (Use arrow keys)
> <a specific of all datasets>
? Hook URL: <your domain on now>/api/extract
```

## Feedback? Need help?

You're welcome to join [the community Slack](https://slack.sanity.io), or [ping me on twitter](https://twitter.com/kmelve), if you want to discuss this proof of concept.
