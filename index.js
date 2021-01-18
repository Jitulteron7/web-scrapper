// used just like axios and fetch
//
const request=require("request-promise");
const ch=require("cheerio");
const json2xls=require("json2xls")
const j2c=require("json2csv").Parser;
const fs=require("fs");
// enter like of the movie from imdb
const movies=["https://www.imdb.com/title/tt2388771/?ref_=fn_al_tt_1","https://www.imdb.com/title/tt2737304/?ref_=tt_sims_tti"];

(async ()=>{
    let data=[];
    for (let movie of movies){
        const response=await request({
                        
            uri:movie,
            headers:{
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9"
            },
            // in which the file are presented to the client side
            gzip:true
        })
        let $=ch.load(response)
    let title=$('div[class="title_wrapper"]>h1').text().trim();
    let rating=$('div[class="ratingValue"]>strong>span').text();
    let summary=$('div[class="article"]>div[class="inline canwrap"]>p').text();
    let genere=$('div[class="see-more inline canwrap"]').eq(1).children('a').text().trim().trim();
    let cast=$('div[class="credit_summary_item"]').eq(2).children('a').text().trim();
    let director=$('div[class="credit_summary_item"]').eq(0).children('a').text().trim();
    let writer=$('div[class="credit_summary_item"]').eq(1).children('a').text().trim();
    data.push({
        title,
        rating,
        summary,
        genere,
        cast,
        writer,
        director

    })
    }
    
    const json2csv=new j2c();
    var xls = json2xls(data);
    console.log(`${data[0].summary}`);
    // const csv=json2csv.parse(data);
    // fs.writeFileSync("./data.csv",csv,"utf-8");
    fs.writeFileSync("./data.xlsx",xls,"binary");
})();