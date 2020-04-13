let sercretKey = "$2b$10$Glc9YAVZIRrYWFrmmsG.TOrOe9HxmZ.edLkcEwLZ0/0.Pf6bmoNKy";
let version = "5";
let req = new XMLHttpRequest();

console.log("Fetching data... ");
req.open("GET", "https://api.jsonbin.io/b/5e93e1a4e41a7f4da62c2ec5/" + version , true);
req.setRequestHeader("secret-key", sercretKey);
req.send();

var AllDomain;

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    AllDomain = JSON.parse(req.responseText);
    version = "1"
    let req1 = new XMLHttpRequest();
    let temp;
    console.log("Fetching data... (2/3)");
    req1.open("GET", "https://api.jsonbin.io/b/5e948434e41a7f4da62c778e/" + version , true);
    req1.setRequestHeader("secret-key", sercretKey);
    req1.send();

    req1.onreadystatechange = () => {
      if (req1.readyState == XMLHttpRequest.DONE) {
        temp = JSON.parse(req1.responseText);
        AllDomain = AllDomain.concat(temp);
        let req3 = new XMLHttpRequest();

        console.log("Fetching data... (3/3)");
        req3.open("GET", "https://api.jsonbin.io/b/5e9485539148886ed2f9a7d9/" + version , true);
        req3.setRequestHeader("secret-key", sercretKey);
        req3.send();

        req3.onreadystatechange = () => {
          if (req3.readyState == XMLHttpRequest.DONE) {
            temp = JSON.parse(req3.responseText);
            AllDomain = AllDomain.concat(temp);
          }
        };
      }
    };
  }
};
