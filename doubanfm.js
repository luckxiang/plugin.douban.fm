var blum_list = {"blum":[
            // 心情 / 场景
            {'name': 'work', 'channel_id': 153},
            {'name': 'outdoors', 'channel_id': 151},
            {'name': 'rest', 'channel_id': 152},
            {'name': 'excited', 'channel_id': 154},
            {'name': 'leisurely', 'channel_id': 155},
            {'name': 'Easy', 'channel_id': 77},
            {'name': 'coffee', 'channel_id': 32},
            // 语言 / 年代
            {'name': ' Chinese', 'channel_id': 1},
            {'name': 'Western', 'channel_id': 2},
            {'name': '70', 'channel_id': 3},
            {'name': '80', 'channel_id': 4},
            {'name': '90', 'channel_id': 5},
            {'name': 'Cantonese', 'channel_id': 6},
            {'name': 'Japanese', 'channel_id': 17},
            {'name': 'Korean', 'channel_id': 18},
            {'name': 'French', 'channel_id': 22},
            {'name': 'new', 'channel_id': 61},
            // 风格 / 流派
            {'name': 'Popular', 'channel_id': 194},
            {'name': 'Rock', 'channel_id': 7},
            {'name': 'Ballad', 'channel_id': 8},
            {'name': 'Light', 'channel_id': 9},
            {'name': 'Movies', 'channel_id': 10},
            {'name': 'Sir', 'channel_id': 13},
            {'name': 'Electronics', 'channel_id': 14},
            {'name': 'Rap', 'channel_id': 15},
            {'name': 'R&B', 'channel_id': 16},
            {'name': 'classical', 'channel_id': 27},
            {'name': 'Comic', 'channel_id': 28},
            {'name': 'world', 'channel_id': 187},
            {'name': 'Bruce', 'channel_id': 188},
            {'name': 'Latin', 'channel_id': 189},
            {'name': 'Reggae', 'channel_id': 190}
/*
            {'name': '工作学习', 'channel_id': 153},
            {'name': '户外', 'channel_id': 151},
            {'name': '休息', 'channel_id': 152},
            {'name': '亢奋', 'channel_id': 154},
            {'name': '舒缓', 'channel_id': 155},
            {'name': 'Easy', 'channel_id': 77},
            {'name': '咖啡', 'channel_id': 32},
            // 语言 / 年代
            {'name': '华语', 'channel_id': 1},
            {'name': '欧美', 'channel_id': 2},
            {'name': '七零', 'channel_id': 3},
            {'name': '八零', 'channel_id': 4},
            {'name': '九零', 'channel_id': 5},
            {'name': '粤语', 'channel_id': 6},
            {'name': '日语', 'channel_id': 17},
            {'name': '韩语', 'channel_id': 18},
            {'name': '法语', 'channel_id': 22},
            {'name': '新歌', 'channel_id': 61},
            // 风格 / 流派
            {'name': '流行', 'channel_id': 194},
            {'name': '摇滚', 'channel_id': 7},
            {'name': '民谣', 'channel_id': 8},
            {'name': '轻音乐', 'channel_id': 9},
            {'name': '电影原声', 'channel_id': 10},
            {'name': '爵士', 'channel_id': 13},
            {'name': '电子', 'channel_id': 14},
            {'name': '说唱', 'channel_id': 15},
            {'name': 'R&B', 'channel_id': 16},
            {'name': '古典', 'channel_id': 27},
            {'name': '动漫', 'channel_id': 28},
            {'name': '世界音乐', 'channel_id': 187},
            {'name': '布鲁斯', 'channel_id': 188},
            {'name': '拉丁', 'channel_id': 189},
            {'name': '雷鬼', 'channel_id': 190},
            {'name': '小清新', 'channel_id': 76}
*/
]};

(function(plugin) {
    var BASE_URL = "https://www.douban.fm";
    var logo = plugin.path + "doubanfm.png";
    var PREFIX = "doubanfm:";

    plugin.createService(plugin.getDescriptor().title, plugin.getDescriptor().id + ":start", "music", true, logo);

    plugin.addURI(PREFIX+"url:(.*)", function(page, url) {
        var videoParams = {
        sources: [{
            url: url
        }],
        no_subtitle_scan: true,
        subtitles: []
        }
        page.source = 'audioparams:' + JSON.stringify(videoParams);
    });

    plugin.addURI(PREFIX+"channel_id:(.*)", function(page, id) {
    var song;
    var sid = 32698;
        for(var i = 0; i < 8; i++)
        {
            if(i == 0)
            {
                var response_text = showtime.httpGet(BASE_URL + "/j/v2/playlist?type=n&pt=3.1&channel=" + id +"&pb=320&from=mainsite&r=&kbps=320&app_name=radio_website&client=s:mainsite|y:3.0&version=100");
            }
            else
            {
                response_text = showtime.httpGet(BASE_URL + "/j/v2/playlist?type=s&sid="+ sid +"&pt=3.1&channel=" + id +"&pb=320&from=mainsite&r=&kbps=320&app_name=radio_website&client=s:mainsite|y:3.0&version=100");
            }
            song = JSON.parse(response_text).song[0];
            sid = song.sid;
            //print(song.url);
            page.appendItem(PREFIX + 'url:' + song.url, 'video',{title: song.title, icon: song.picture});
        }
    });

    plugin.addURI(plugin.getDescriptor().id + ':start', function(page) {
        for(var i in blum_list.blum)
        {
            //print(blum_list.blum[i].name);
            page.appendItem(PREFIX + 'channel_id:' + blum_list.blum[i].channel_id, 'directory',{title: blum_list.blum[i].name });
        }
    });

})(this);
