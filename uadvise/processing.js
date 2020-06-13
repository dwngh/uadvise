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
  console.log(domain);
  let data = AllDomain[domain - 1][pos];
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
  document.getElementById("warning").innerHTML = "<p style = 'text-align:center;color:red; font-size:14'>Tất cả những kết quả dưới đây đều chỉ mang tính tham khảo, xin vui lòng tìm hiểu kỹ hơn trước khi chọn nguyện vọng thực sự. Và nếu có sai sót thì hãy qua phần feedback để đóng góp cho dự án</p>";
  add = "<thead class = ''><tr><th scope='col'>Id</th><th scope='col'>Tên Ngành</th><th scope='col'>Điểm</th><th scope='col'>Trường</th></tr></thead>";

  // tbody
  add += "<tbody>";
  let str;
  let color;
  let index = -amountOfUnsuccessedSpecialty + 1;
  list.forEach((item) => {
    let i = index;
    index++
    // change for not suitable to use
    if (score > item.Score[0]) {color = "success";}
    else if (score < item.Score[0]) {color ="danger";}
    else {color = "warning";index++;}
    str = "<tr class='table-" + color + "'><td>" + i + "</td><td>" +item.Name+ "</td><td>" + item.Score[0] + "</td><td>" + item.UniName+ "</td></tr>";
    add += str;
  });
  add +="</tbody></table>";
  document.getElementById("resultTable").innerHTML = add
  document.getElementById("return").innerHTML = "<a href = '#finding' style = 'text-align:center;color:red; font-size:14'>Thử lại</a>"
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
    case 'Kế toán - Kiểm toán':return 1;
    case 'Tài chính - Ngân hàng- Bảo hiểm':return 2;
    case 'Kinh tế - Quản trị kinh doanh - Thương Mại':return 3;
    case 'Ngoại thương - Xuất nhập khẩu - KTế quốc tế':return 4;
    case 'Ngoại giao - Ngoại ngữ':return 5;
    case 'Báo chí - Marketing - Quảng cáo - PR':return 6;
    case 'Công nghệ thông tin - Tin học':return 7;
    case 'Thiết kế đồ họa - Game - Đa phương tiện':return 8;
    case 'Công an - Quân đội':return 9;
    case 'Luật - Tòa án':return 10;
    case 'Xây dựng - Kiến trúc-Giao thông':return 11;
    case 'Mỹ thuật - Âm nhạc-Nghệ thuật':return 12;
    case 'Thể dục - Thể thao':return 13;
    case 'Du lịch-Khách sạn':return 14;
    case 'Văn hóa - Chính trị - Khoa học Xã hội':return 15;
    case 'Nhân sự - Hành chính':return 16;
    case 'Tâm lý':return 17;
    case 'Sư phạm - Giáo dục':return 18;
    case 'Mỏ - Địa chất':return 19;
    case 'Tài nguyên- Môi trường':return 20;
    case 'Thủy sản-Lâm Nghiệp-Nông nghiệp':return 21;
    case 'Hàng hải-Thủy lợi-Thời tiết':return 22;
    case 'Y - Dược':return 23;
    case 'Bác sĩ thú y':return 24;
    case 'Ô tô - Cơ khí -Chế tạo':return 25;
    case 'Điện lạnh- Điện tử - Điện - Tự động hóa':return 26;
    case 'Công nghệ In - Giấy':return 27;
    case 'Công nghệ chế biến thực phẩm':return 28;
    case 'Công nghệ sinh - Hóa':return 29;
    case 'Thời trang- May mặc':return 30;
    case 'Công nghệ vật liệu':return 31;
    case 'Hàng không - Vũ trụ- Hạt nhân':return 32;
    case 'Toán học và thống kê':return 33;
    default:
      return 0;
  }
}
