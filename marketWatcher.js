const notifier = require("node-notifier")

async function queryMarket(start = 0) {
    console.debug(`Querying ${start} - ${start+100} (est)`)
    const count = 500
    const dataURL = `https://steamcommunity.com/market/search/render/?query=&start=${start}&count=${count}&search_descriptions=1&sort_column=price&sort_dir=asc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Type%5B%5D=tag_CSGO_Type_Knife&norender=1`
    const openURL = "https://steamcommunity.com/market/search?q=&descriptions=1&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Type%5B%5D=tag_CSGO_Type_Knife&appid=730#p1_price_asc"
    await fetch(dataURL).then(d => d.json()).then(({results}) => {
        results.forEach(({sell_price, sale_price_text, sell_price_text, name, app_icon}) => {
            const mktD = -(Math.floor((parseUSD(sale_price_text) - parseUSD(sell_price_text))*100) / 100);
            const mktP = mktD > 0 ? "+" : "-"
            console.debug(`
            Name: ${name}
            Selling at: ${sell_price_text} ${sell_price/100},
            Sale Price: ${sale_price_text},
            Market Difference: ${mktP}$${Math.abs(mktD)}`
            )
            // console.log(name, sell_price, sale_price_text, mktP+mktD, sell_price_text, sell_price/100)
            if ((sell_price / 100) < 50 || mktD < -50) notifier.notify({title: "CHEAP KNIFE", message: `Sell Price: ${sell_price_text}\nSale Price: ${sale_price_text} \nName: ${name}`, icon: app_icon, wait:true, open: openURL})
            else setTimeout(queryMarket, 5*60*1000) // if you exceed like 3 requests per second you'll get banned for a hour
        })
    }).catch((e)=>{notifier.Growl().notify({title:"Error"}); console.error(e)})
}

function parseUSD(text = ""){
    return Number(text.replaceAll("$", ""))
}

queryMarket();
notifier.notify({title: "Market Watcher", message: "Process started."})