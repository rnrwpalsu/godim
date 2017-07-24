const request = require('request'); // 서버에 요청하는 모듈
const cheerio = require('cheerio'); // html 문서 원하는 부분 뽑는 모듈
const iconv = require('iconv-lite'); // 인코딩 모듈
const mongoose = require('mongoose');
const process = require('process');
mongoose.connect('mongodb://localhost/test',{useMongoClient: true});
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CleanAirInfoSchema = new Schema({
    'id': ObjectId,
    'area': String,
    'pm10': String,
    'pm25': String,
    'status': String,
    'grade': String,
    'factor': String,
    'date': String
});
var CleanAirInfoModel = mongoose.model('cleaninfo', CleanAirInfoSchema);

var options = {
    'uri': 'http://cleanair.seoul.go.kr/air_city.htm?method=measure',
    encoding: 'binary'
};

request(options, (err, res, body) => {
    if(err) return console.log('[ Err ]\n',err);
var strContents = iconv.decode(body, 'utf-8'); // 2nd arg=> meta의 charset과 맞춰준다.
// console.log(strContents); // uri의 내용을 모두 긁어온다.
var $ = cheerio.load(strContents); //jquery처럼 접근 가능
$('.tbl2 tbody tr').each(function() {
    //크롤링은 태그, id 등으로 접근직접 접근해서 데이터를 가져와야 한다.
    var strArea = $(this).find('td').eq(0).text().trim(); //this=tr
    // var strVal10 = $(this).find('td').eq(1).html.trim();
    var strPm10 = $(this).find('td').eq(1).text().trim();
    var strPm25 = $(this).find('td').eq(2).text().trim();
    var strStatus = $(this).find('td').eq(7).text().trim();
    var strGrade = $(this).find('td').eq(8).text().trim();
    var strFactor = $(this).find('td').eq(9).text().trim();
    console.log(strArea+', '+strPm10+', '+strPm25+', '+strGrade+', '+strStatus+', '+strFactor);

    var cleanAirInfo = new CleanAirInfoModel({
        'area': strArea,
        'pm10': strPm10,
        'pm25': strPm25,
        'status': strStatus,
        'grade': strGrade,
        'factor': strFactor,
        'date': getToday()
    });

    cleanAirInfo.save(function(err) {
        if(err) console.log(err);
    });
});
//  process.exit();
});

function getToday() {
    var date = new Date();
    return date.getFullYear()+'.'+(date.getMonth()+1)+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}// getToday