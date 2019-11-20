var express = require('express');
var router = express.Router();
var elasticsearch = require('@elastic/elasticsearch')
/* GET home page. */
var client = new elasticsearch.Client({
  node: {
    url: new URL('http://localhost:9200')
  }
});
async function LogSearch( command ) {
  // 1. command = None : 아직 classfiy되자 못한 로그들 추출
  // 2. command = Alert : 위험한 녀석들 추출해냄
  const { body } = await client.search({
   index: 'logstash-index-2019.11',
   // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
   body: {
     query: { match: { 'fields.risk':command } }
   }
 })
 console.log(body.hits.hits);
}

// 고객 아이디 하나당 고유한 id가 새겨진 host.id를 패밍해서 로그인 db를 만들고 그에 따라서 출력해주면 될듯.

router.get('/', function(req, res, next) {
  LogSearch("Alert").catch(console.log);
  res.render('index', { title: 'Express' });
});

module.exports = router;
