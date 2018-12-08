// Start URLs: https://en.spitogatos.gr/search/results/residential/sale/r100/m100m
// Pseudo - URLs:
// house: https://en.spitogatos.gr/sale_[.*]
// page: https://en.spitogatos.gr/search/results/residential/sale/r100/m100m/offset_[\d+]
// Clickable elements :.img_holder , .next > a

function pageFunction(context) {
  var $ = context.jQuery;
  if (context.request.label === "house") {
    var house = {};
    var location = {
      country: "Greece",
      city: $(".text.color.cyan.sgTrackEvent")
        .eq(1)
        .text(),
      address: $(".text.black.color.bold")
        .eq(1)
        .text()
        .trim(),
      coordinates: {
        lat: $("#ldMyLat").attr("title"),
        lng: $("#ldMyLng").attr("title")
      }
    };

    var indexOfM = $(".text.black.color.bold")
      .eq(4)
      .text()
      .trim()
      .indexOf("m");
    var size = {
      parcel_m2: "",
      gross_m2: $(".text.black.color.bold")
        .eq(4)
        .text()
        .substring(0, indexOfM - 1),
      net_m2: "",
      rooms: $(".desktop-5-details")
        .eq(5)
        .text()
        .trim()
    };

    var price = {
      value: $(".text.black.inline.color.bold.padding-right")
        .text()
        .replace(/,/g, "")
        .substring(1)
        .trim(),
      currency: "EUR"
    };

    var description = $(".padding-phone-only")
      .eq(1)
      .text()
      .trim()
      .replace(/\s\s+/g, "");

    var title = $(".h3.text.color.black.bold")
      .text()
      .trim();
    var images = [];
    var scrapImageLink = $("#listingImagesList")
      .find("a")
      .each(function(index, ele) {
        var imageLink = $(ele).attr("rel");
        images.push(imageLink);
      });

    house.location = location;
    house.size = size;
    house.price = price;
    house.description = description;
    house.title = title;
    house.images = images;
    if (house.location.coordinates.lat === "") {
      context.skipOutput();
    }
    return house;
  } else {
    context.skipOutput();
  }
}
