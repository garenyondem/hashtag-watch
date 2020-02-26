const { Client } = require("@elastic/elasticsearch");
//TODO: Run with frequent interval using crontab or scheduled lambda function

(async function init() {
    const client = new Client({
        node: `${process.env.ES_HOST}:${process.env.ES_PORT}`
    });

    const response = await client.search({
        from: 100000,
        size: 100,
        query: {
            match_all: {}
        }
    });
    //TODO: remove all indices on search response
    console.log(response.body.hits);
    process.exit();
})();
