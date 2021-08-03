let scrolledToBottom = false;

const loadSortedContent = () => {
  const listings = $("#property-data").children("a");

  const listingsArray = listings.toArray();

  const sortedListings = listingsArray.sort((a, b) => {
    const firstTimestamp = getTime($(a).find(".timeStamp").text());
    const secondTimestamp = getTime($(b).find(".timeStamp").text());

    return firstTimestamp - secondTimestamp;
  });

  $("#property-data").empty("");

  sortedListings.forEach((listing) => {
    $("#property-data").append(listing);
  });
};

const clickLoadMoreButton = () => {
  const loadMoreButton = $("#LoadMoreProperties").find(".btn");
  const loadMoreButtonDisplay = $("#LoadMoreProperties").css("display");

  $(document).scrollTop($(document).height());

  if (
    loadMoreButton.length &&
    loadMoreButtonDisplay === "block" &&
    !scrolledToBottom
  ) {
    setTimeout(() => {
      clickLoadMoreButton();
    }, 500);
  } else {
    scrolledToBottom = true;
    $(document).scrollTop(0);
    loadSortedContent();
  }
};

const getTime = (timeText) => {
  const array = timeText.split(" ");

  const number = Number(array[4]);
  const unit = array[5];

  if (unit === "minute" || unit === "minutes") {
    return number * 60;
  }

  if (unit === "hour" || unit === "hours") {
    return number * 60 * 60;
  }

  if (unit === "day" || unit === "days") {
    return number * 60 * 60 * 24;
  }

  if (unit === "week" || unit === "weeks") {
    return number * 60 * 60 * 24 * 7;
  }

  if (unit === "month" || unit === "months") {
    return number * 60 * 60 * 24 * 7 * 30;
  }
};

$(document).ready(function () {
  // timeout waiting for page to render
  setTimeout(() => {
    clickLoadMoreButton();
  }, 150);
});
