// const assert = require("assert");
const API = "https://api.punkapi.com/v2/";
let data = [];


window.onload = function () {
    getBeers(API, 1);
   };
function getBeers(fetch, id) {
  return fetch(API + id)
    .then((response) => response.json())
    .then((data) => (data = data.results));
}
const consoleUsers = () => {
  console.log(data);
};

describe("getBeers", () => {
  it("calls fetch with the correct url", () => {
    const fakeFetch = (url) => {
      assert(url === "https://api.punkapi.com/v2/1");
      return new Promise(function (resolve) {});
    };
    getBeers(fakeFetch, 1);
  });
  it("parses the response of fetch correctly", (done) => {
    const fakeFetch = (url) => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ name: "Budweiser" }],
          }),
      });
    };
    getBeers(fakeFetch, 10).then((result) => {
      assert(result.name === "Budweiser");
      done();
    });
  });
});
