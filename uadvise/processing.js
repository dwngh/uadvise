function start(){
  var subject = document.getElementById("subject").value;
  var domain = document.getElementById("domain").value;
  var score = parseInt(document.getElementById("score").value);
  var pos = document.getElementById("province").value;
  if (!Number.isNaN(score)){
    Processing(ConvertToDomainId(domain), ConvertToProvinceId(pos), score, subject)
  } else console.log('Failed in getting your score');
}


function Processing(domain,pos,score, subject){
  let data = AllDomain[domain][pos];
  let list = new SpecialStack(15, 5);
  let amountOfUnsuccessedSpecialty = 0;
  let index = 0;
  while (amountOfUnsuccessedSpecialty < 5 && index < data.length){
    if (data[index].Subject == subject){
      list.push(data[index]);
      if (!isThisSpecialtySuccess(score, data[index]))
          amountOfUnsuccessedSpecialty++;
    }
    index ++;
  }
  generateOutput(list.data.reverse(), score, amountOfUnsuccessedSpecialty);
}

function generateOutput(list, score, amountOfUnsuccessedSpecialty){
  let add;
  document.getElementById("resultTable").innerHTML = "";
  // thead
  add = "<thead><tr><th scope='col'>Id</th><th scope='col'>Tên Ngành</th><th scope='col'>Điểm</th><th scope='col'>Trường</th></tr></thead>";

  // tbody
  add += "<tbody>";
  let str;
  let color;
  let index = 1;
  list.forEach((item) => {
    let i = index;
    if (score > item.Score[0]) {color = "success";index++;}
    else if (score < item.Score[0]) {color ="danger";i = -1}
    else {color = "warning";index++;}
    str = "<tr class='table-" + color + "'><td>" + i + "</td><td>" +item.Name+ "</td><td>" + item.Score[0] + "</td><td>" + item.UniName+ "</td></tr>";
    add += str;
  });
  add +="</tbody></table>";
  document.getElementById("resultTable").innerHTML = add

}

function isThisSpecialtySuccess(score, item){
  if (score >= item.Score[0]) return true;
  else return false;
}

class SpecialStack {
  constructor(capability, UnsuccessCase) {
    this.data = [];
    this.capability = capability;
    this.UnsuccessCase = UnsuccessCase;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  isFull() {
    return this.data.length === this.capability;
  }

  isFullOfSuccessCase(){
    return this.data.length - this.UnsuccessCase === this.capability;
  }

  push(item) {
    if (this.isFull()) this.data.shift();
    this.data.push(item);
    return true;
  }
  peek() {
    if (this.isEmpty()) return undefined;
    return this.data[this.data.length - 1];
  }
  clear() {
    this.data.length = 0;
  }
}



function ConvertToProvinceId(str){
  switch (str) {
    case "Hà Nội":
      return 0;
    case "Tp Hồ Chí Minh":
      return 1;
    default:

  }
}

function ConvertToDomainId(str){
  switch (str) {
    case "Kế toán - Kiểm toán":
      return 0;
    case "Tài chính - Ngân hàng - Bảo hiểm":
      return 1;
    case "Kinh tế - Quản trị kinh doanh - Thương Mại":
      return 2;
    case "Ngoại thương - Xuất nhập khẩu - Kinh tế quốc tế":
      return 3;
    case "Ngoại giao - Ngoại ngữ":
      return 4;
    case "Báo chí - Marketing - Quảng cáo - PR":
      return 5;
    case "Công nghệ thông tin - Tin học":
      return 6;
    case "Thiết kế đồ họa - Game - Đa phương tiện":
      return 7;
    case "Công an - Quân đội":
      return 8;
    case "Luật - Tòa án":
      return 9;
    case "Mỹ thuật - Âm nhạc-Nghệ thuật":
      return 10;
    default:
      return 0;
  }
}
