let buffer = "";
console.log(str.length);
for (let i = 0; i < str.length; i++){
  if (str[i].charCodeAt(0) > 31)
  if (str[i] == '\'') buffer += '\"';
  else buffer += str[i];
}

var AllDomain;
try{
  AllDomain = JSON.parse(buffer);
} catch (e){
  console.log(e);
}
