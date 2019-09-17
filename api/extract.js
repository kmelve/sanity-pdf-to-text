const SanityClient = require('@sanity/client')
const crawler = require('crawler-request');

const client = SanityClient({
  projectId: 'ew7tl7w1',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

module.exports = async (req, res) => {
  if (!req.body || !req.body.ids || !req.body.ids.created.length === 0) {
    return res.send(200)
  }
  const {created} = req.body.ids
  const docs = await client.fetch(`*[_type == "sanity.fileAsset" && mimeType == "application/pdf" && _id in $created]{_id, url}`, {created})
  if (!docs.length) {
    return res.send(200)
  }
  console.log(`getting pdf documents `, docs)
  const data = await Promise.all(docs.map(({_id, url}) => crawler(url).then(({text}) => ({_id, text}))))
  const result = await data
    .reduce(
      (trans, doc) =>
        trans
          .patch(doc._id, patch =>
            patch.setIfMissing({ text: '' }).set({ text: doc.text })
          ),
      client.transaction()
    )
    .commit()
    .catch(() => res.send(500))
  console.log('result', result)
  res.send(200)
}
