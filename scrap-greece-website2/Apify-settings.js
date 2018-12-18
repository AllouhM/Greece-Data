//Custom ID:   spiti24
// Start URLs :https://www.spiti24.gr/en/for-sale/property/athens-center
// Pseudo-URLs: 
// HOUSE: https://www.spiti24.gr/en/[.*]
// PAGE: https://www.spiti24.gr/en/for-sale/property/athens-center?page=[\d+]
//Clickable elements .property__images > a , .next.enabled >a

function pageFunction(context) {
    var $ = context.jQuery;
    if (context.request.label === "HOUSE") {
        var house = {};
        var market_date = $(".property__extrainfo")
            .children("li")
            .eq(0)
            .find("span")
            .text()
            .trim();


        var sold = false;
        var location = {
            country: "Greece",
            city: $(".s24gaTrackClick")
                .eq(1)
                .text()
                .trim(),
            address: $(".table")
                .find("td")
                .eq(2)
                .text()
                .trim(),
            coordinates: {
                lat: $(".marker").attr("data-lat"),
                lng: $(".marker").attr("data-lng")
            }
        };


        var indexOfM = $(".property__top__features")
            .find("li")
            .eq(0)
            .text()
            .indexOf("m");
        var indexofB = $(".property__top__features")
            .find("li")
            .eq(1)
            .text()
            .indexOf("B");
        var size = {
            parcel_m2: "",
            gross_m2: $(".property__top__features")
                .find("li")
                .eq(0)
                .text()
                .substring(0, indexOfM - 1),
            net_m2: "",
            rooms: $(".property__top__features")
                .find("li")
                .eq(1)
                .text()
                .substring(0, indexofB - 1)
        };

        var price = {
            value: $(".table")
                .find("td")
                .eq(0)
                .text()
                .replace(/,/g, "")
                .trim(),

            currency: "EUR"
        };

        var description = $(".property__section__content")
            .eq(0)
            .text()
            .trim()
            .replace(/\s\s+/g, "");

        var title = $(".columns")
            .find("h1")
            .text()
            .trim();
        var imagesArr = [];
        $(".property__gallery__thumb")
            .find("a")
            .each(function (index, ele) {
                var imageLink = $(ele).attr("href");
                imagesArr.push(imageLink);
            });
        var images = imagesArr.toString();

        house.market_date = market_date;
        house.sold = sold;
        house.title = title;
        house.location = location;
        house.size = size;
        house.price = price;
        house.description = description;
        house.images = images;

        return house;

    } else {
        context.skipOutput();
    }
}
