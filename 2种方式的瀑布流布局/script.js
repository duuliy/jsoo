var data = {
  "img": [
    { "src": '0.jpg' },
    { "src": '1.jpg' },
    { "src": '2.jpg' },
    { "src": '3.jpg' },
    { "src": '4.jpg' },
    { "src": '5.jpg' },
    { "src": '6.jpg' },
    { "src": '7.jpg' },
    { "src": '8.jpg' },
    { "src": '9.jpg' },
    { "src": '10.jpg' },
    { "src": '11.jpg' },
    { "src": '12.jpg' },
    { "src": '13.jpg' },
    { "src": '14.jpg' },
    { "src": '15.jpg' },
    { "src": '16.jpg' },
    { "src": '17.jpg' },
    { "src": '18.jpg' },
  ]
};


window.onload = function () {
  render();

  waterfall('main', 'box');

  window.onscroll = function () {
    if (checkScrollSlide()) {
      // 将数据块渲染到页面尾部
      render();
      waterfall('main', 'box');
    }
  }
}

window.onresize = function () {
  waterfall('main', 'box');
}

function waterfall(parent, box) {
  // 将main下的所有class为box的元素取出来
  var oParent = document.getElementById(parent);
  var oBoxes = getByClass(oParent, box);
  // 计算整个页面显示的列数（页面宽／box的宽）
  var oBoxW = oBoxes[0].offsetWidth;
  var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
  // 设置main的宽
  oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin: 0 auto';

  //核心逻辑,计算绝对定位补充图片
  var hArr = [];
  for (var i = 0; i < oBoxes.length; i++) {
    if (i < cols) { //第一行平铺不计算，把第一行dom高度加入数组，因为列cols是固定的
      hArr.push(oBoxes[i].offsetHeight)
    } else {
      var minH = Math.min.apply(null, hArr); //得到1列中最小高度
      var index = getMinHIndex(hArr, minH);
      oBoxes[i].style.position = 'absolute';
      oBoxes[i].style.top = minH + 'px';   //绝对定位后给上一列最小高度的定位
      // oBoxes[i].style.left = oBoxW * index + 'px';  //每列宽度固定*列数
      oBoxes[i].style.left = oBoxes[index].offsetLeft + 'px';
      hArr[index] += oBoxes[i].offsetHeight;  //划重点！！！，同一列累加本dom的高度
    }
  }

}

function getByClass(parent, clsName) {
  var boxArr = [];
  oElements = parent.getElementsByTagName('*');
  for (var i = 0; i < oElements.length; i++) {
    if (oElements[i].className == clsName) {
      boxArr.push(oElements[i]);
    }
  }
  return boxArr;
}

function getMinHIndex(arr, val) {
  for (var i in arr) {
    if (arr[i] == val) {
      return i;
    }
  }
}

// 检测是否具备加载数据块的条件
function checkScrollSlide() {
  var oParent = document.getElementById('main');
  var oBoxes = getByClass(oParent, 'box');
  var lastBoxH = oBoxes[oBoxes.length - 1].offsetTop + Math.floor(oBoxes[oBoxes.length - 1].offsetHeight / 2);
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.body.clientHeight || document.documentElement.clientHeight;
  return (lastBoxH < scrollTop + height) ? true : false;
}

//把瀑布的状态保留，在这里继续加高度算更优解!!!
function render() {
  var oMain = document.getElementById('main');
  for (var i = 0; i < data.img.length; i++) {
    var oBox = document.createElement('div');
    oBox.className = 'box';
    oMain.appendChild(oBox);
    var oPic = document.createElement('div');
    oPic.className = 'pic';
    oBox.appendChild(oPic);
    var oImg = document.createElement('img');
    oImg.src = 'images/' + data.img[i].src;
    oPic.appendChild(oImg);
  }
}
