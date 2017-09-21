chrome.contextMenus.create({
    type: 'normal',
    title: '查看豆瓣评分',
    contexts: ['selection'],
    id: 'douban_score',
    onclick: search_score
});

function search_score(info, tab){
    var xhr = new XMLHttpRequest();
    //此处涉及到跨域访问的安全问题，所以一定要在manifest的permissions中添加权限
    xhr.open("GET", "https://api.douban.com/v2/movie/search?q="+info.selectionText, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var jsonResponse = JSON.parse(xhr.responseText);//将字符串转换成json格式
            var score = jsonResponse.subjects[0].rating.average;
            //console.log(score);
            alert("该电影的豆瓣分数为 " + score);
        }
    }
    xhr.send();
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    chrome.contextMenus.update('douban_score',{
        title: '查看电影“' + message + '”的豆瓣评分'
    });
});