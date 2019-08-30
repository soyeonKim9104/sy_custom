/*for 문*/
/*var listData = [
    {
        title: "말레이시아 코타키나발루",
        description: "코타키나발루에서 꼭 가봐야 할 명소를 소개합니다",
        url: "img/malaysia.jpg",
        alt:"매롱"
    },
    {
        title: "프랑스 파리",
        description: "프랑스 파리여행, 놓치면 아쉬울 필수 명소 6",
        url: "img/paris.jpg",

    },
    {
        title: "베트남 다낭",
        description: "베트남 다낭 여행이 핫한 이유!",
        url: "img/danang.jpg",
    },
    {
        title: "러시아 모스크바",
        description: "러시아 모스크바 여행, 꼭 가야할 매력적인 여행코스 5",
        url: "img/moscow.jpg",
    },
    {
        title: "대한민국 독도",
        description: "독도, 대한민국 천연기념물 336호",
        url: "img/dokdo.jpg",
    },
    {
        title: "스페인 마드리드",
        description: "스페인 마드리드 자유여행: 스페인 수도 마드리드에 가다",
        url: "img/madrid.jpg",
    },
    {
        title: "체코 프라하",
        description: "동유럽 여행 입문 코스, 체코 프라하를 제대로 즐기는 방법",
        url: "img/praha.jpg",
    }
];*/
/*function renderingList() {
    var listTest = [];

    //fon문 = for(초기화;조건식;증감식)
    for(var i = 0; i < listData.length; i++) {
        listTest.push(`<li><div class="contents"><div class="thumb"><img src="${listData[i].url}" alt="${listData[i].alt}"></div><div class="info"><h2>${listData[i].title}</h2><p>${listData[i].description}</p></div></div></li>`);
    }

    //for in 문 = for(변수 in 객체)
   for(var i in listData) {
        listTest.push(`<li><div class="contents"><div class="thumb"><img src="${listData[i].url}" alt="${listData[i].alt}"></div><div class="info"><h2>${listData[i].title}</h2><p>${listData[i].description}</p></div></div></li>`);
    }

    document.querySelector('.list').innerHTML = listTest.join('');
}
renderingList();*/

/*switch 문
var msg;
var today = new Date();
var weekNum = today.getDay(); // 숫자로 요일을 가져옴 0:일,1:월 ...
var week = new Array('일','월','화','수','목','금','토');
switch (weekNum) {
    case 0:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'짜파구리 먹는날!');
        break;
    case 1:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'헬요일 시작이구요');
        break;
    case 2:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'아 이제 겨우...=_=');
        break;
    case 3:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'지긋지긋하다 이너엄~');
        break;
    case 4:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'조금만더 조금만더~!!');
        break;
    case 5:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'꺄아아아아아아아');
        break;
    case 6:
        document.write('오늘은'+week[today.getDay()]+'요일'+'<br/>'+'zzzzzzzzzzzzz 벌써 두시네');
        break;
}*/

