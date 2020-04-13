let sercretKey = "$2b$10$Glc9YAVZIRrYWFrmmsG.TOrOe9HxmZ.edLkcEwLZ0/0.Pf6bmoNKy";
let version = "3";
let req = new XMLHttpRequest();

console.log("Fetching data...");
req.open("GET", "https://api.jsonbin.io/b/5e93e1a4e41a7f4da62c2ec5/" + version , true);
req.setRequestHeader("secret-key", sercretKey);
req.send();

var AllDomain;

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log("Done");
    AllDomain = JSON.parse(req.responseText);
  }
};
