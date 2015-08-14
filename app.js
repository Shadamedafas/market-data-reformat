var data = require("./markets.json");
var fs = require("fs");

var newData = {};

var offeringsArray = [
  "Organic",
  "Bakedgoods",
  "Cheese",
  "Crafts",
  "Flowers",
  "Eggs",
  "Seafood",
  "Herbs",
  "Vegetables",
  "Honey",
  "Jams",
  "Maple",
  "Meat",
  "Nursery",
  "Nuts",
  "Plants",
  "Poultry",
  "Prepared",
  "Soap",
  "Trees",
  "Wine",
  "Coffee",
  "Beans",
  "Fruits",
  "Grains",
  "Juices",
  "Mushrooms",
  "PetFood",
  "Tofu",
  "WildHarvested"
]

for (market in data) {
  var marketData = data[market];

  newData[marketData.FMID] = {
    "name" : marketData.MarketName || null,
    "url" : marketData.Website || null,
    "social" : {
        "facebook" : marketData.Facebook || null,
        "twitter" : marketData.Twitter || null,
        "youtube" : marketData.Youtube || null,
        "other" : marketData.OtherMedia || null
    },
    "location" : {
        "address" : {
            "street" : marketData.street || null,
            "city" : marketData.city || null,
            "county" : marketData.County || null,
            "state" : marketData.State || null,
            "zip" : marketData.zip || null
        },
        "coord" : {
            "x": Number(marketData.x) || null,
            "y": Number(marketData.y) || null
        },
        "description": marketData.Location || null
    },
    "availability" : {
      "season1" : {
          "time" : marketData.Season1Time || null,
          "data" : marketData.Season1Date || null
      },
      "season2" : {
          "time" : marketData.Season2Time || null,
          "data" : marketData.Season2Date || null
      },
      "season3" : {
          "time" : marketData.Season3Time || null,
          "data" : marketData.Season3Date || null
      },
      "season4" : {
          "time" : marketData.Season4Time || null,
          "data" : marketData.Season4Date || null
      },
    },
    "payment" : {
      "credit": marketData.Credit === "Y" ? true : false,
      "wic": marketData.WIC === "Y" ? true : false,
      "wic_cash": marketData.WICcash === "Y" ? true : false,
      "sfmnp": marketData.SFMNP === "Y" ? true : false,
      "snap": marketData.SNAP === "Y" ? true : false
    }
  };

  newData[marketData.FMID].offerings = [];

  for (index in offeringsArray) {
    if (marketData[offeringsArray[index]] === "Y") {
      newData[marketData.FMID].offerings.push(offeringsArray[index]);
    }
  }

  newData[marketData.FMID]["updated"] = marketData.updateTime;
}
fs.writeFile("output.json", JSON.stringify(newData, null, 2), function () {
  console.log("Done");
});
