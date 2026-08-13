window.cloudGroupExpenses = [];
let currentJpyToTwdRate = 0.21;

const defaultPackingList = [
    { id: 1, text: "Passport 護照正本 + 影本", checked: false },
    { id: 2, text: "SIM 日本 eSIM / 網卡 / Wi-Fi 機", checked: false },
    { id: 3, text: "Card 信用卡 + 少量日幣現金", checked: false },
    { id: 4, text: "Power 行動電源 + 充電線", checked: false },
    { id: 5, text: "Plug 日本雙孔插頭轉接頭", checked: false },
    { id: 6, text: "Medicine 個人常備藥品 / 胃藥 / 止痛藥", checked: false },
    { id: 7, text: "Clothes 替換衣物 + 舒適走路鞋", checked: false },
    { id: 8, text: "Tickets 迪士尼海洋門票", checked: false }
];

let packingItems = JSON.parse(localStorage.getItem("my_tokyo_packing_list")) || defaultPackingList;

const spotGuides = {
    kinshicho: {
        title: "🏨 錦糸町：下町生活感與隱藏版美食",
        img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/05/a0005776/img/zh-tw/a0005776_parts_68c9eae462026.jpg?20260107151700&q=80&rw=620&rw=443",
        eat: [
            "<strong>真鯛拉麵 麵魚:</strong> 濃郁鮮美的烤鯛魚骨高湯，配上煙燻叉燒，錦糸町代表性拉麵！",
            "<strong>鳥貴族 錦糸町店:</strong> 全品項均一價的平價串燒，必點「貴族燒（醬燒/鹽味雞肉串）」與金麥啤酒！",
            "<strong>山田家 人形燒:</strong> 錦糸町百年古早味，造型可愛、紅豆餡香甜濃郁的現做人形燒。"
        ],
        buy: [
            "<strong>ARCAKIT 錦糸町:</strong> 車站旁整棟購物中心，有巨型 DAISO 旗艦店與商品超齊全的 Uniqlo。",
            "<strong>錦糸町 PARCO:</strong> B1 美食街聚集在地人氣名店，高層樓還有無印良品與動漫選品店。"
        ],
        go: [
            "<strong>錦糸公園:</strong> 櫻花季賞櫻名所，平時也是遠眺晴空塔全景的在地私房角度！",
            "<strong>墨田江戶切子館:</strong> 欣賞東京傳統精細玻璃雕刻工藝，感受濃濃下町職人精神。"
        ]
    },
    shibuya: {
        title: "💚 澀谷：潮流發源地與科技寶可夢",
        img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
        eat: [
            "<strong>挽肉と米 (澀谷店):</strong> 每日現磨炭火現烤漢堡排，搭配羽釜鍋現煮白飯，沾上生蛋黃堪稱絕配！",
            "<strong>極味屋 (Kiwamiya):</strong> PARCO B1，提供優質和牛漢堡排，自己在鐵板上煎掌控熟度！",
            "<strong>CHAHO 抹茶專賣店:</strong> PARCO 內濃郁抹香霜淇淋，逛街累了的最佳甜點選擇。"
        ],
        buy: [
            "<strong>Pokémon Center SHIBUYA (PARCO 6F):</strong> 主打未來科技感，必買「黑超炫酷塗鴉風格皮卡丘」與澀谷限定皮卡丘周邊！",
            "<strong>Nintendo TOKYO (PARCO 6F):</strong> 日本首家任天堂直營店，限定版瑪利歐、薩爾達傳說與動森官方周邊！",
            "<strong>JUMP SHOP / Capcom Store:</strong> 航海王、鬼滅之刃、怪物獵人等熱門動漫公仔一網打盡。"
        ],
        go: [
            "<strong>等身大超夢培育艙 (寶可夢中心入口):</strong> 1:1 震撼逼真的超夢沉睡膠囊，必拍打卡熱點！",
            "<strong>澀谷十字路口 (Scramble Crossing):</strong> 全球最繁忙人行道，體會震撼的潮流人潮與霓虹夜景。",
            "<strong>Shibuya Sky (澀谷 Sky):</strong> 47 樓露天展望台，360 度無死角俯瞰東京震撼夜景與遠眺富士山。"
        ]
    },
    ikebukuro: {
        title: "⚡ 池袋：動漫天國與噴火龍旗艦店",
        img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
        eat: [
            "<strong>Pikachu Sweets by Pokémon Center:</strong> 寶可夢官方主題甜點店，必吃皮卡丘造型泡芙與季節限定特調飲品！",
            "<strong>麵創房無敵家:</strong> 池袋超高人氣豚骨拉麵，厚切炙燒叉燒搭配濃郁高湯！",
            "<strong>Sunshine City 太陽城美食街:</strong> 匯集各式日式洋食、主題 Café 與經典連鎖餐廳。"
        ],
        buy: [
            "<strong>Pokémon Center MEGA TOKYO:</strong> 全東京規模最大！必買「披著 Mega 噴火龍披風的皮卡丘」娃娃！",
            "<strong>Pokémon GO Lab:</strong> 全球首家 PGO 實體概念店，限定卡牌遊戲周邊與補給站打卡！",
            "<strong>Animate 池袋總店:</strong> 狂享 10 層樓的世界最大動漫專賣店，各類同人誌、模型與限定周邊寶庫。"
        ],
        go: [
            "<strong>噴火龍與皮卡丘巨型雕像:</strong> 店內入口超霸氣的噴火龍雕像，寶可夢粉絲朝聖第一站！",
            "<strong>Sunshine City 陽光城水族館:</strong> 位於高樓層的戶外天空水族館，看企鵝在頭頂上的玻璃泳池翱翔！"
        ]
    },
    skytree: {
        title: "🗼 押上與淺草：新舊交融與經典伴手禮",
        img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
        eat: [
            "<strong>治一郎 (Jiichiro 東京車站/晴空塔店):</strong> 必吃超濃郁綿密日式布丁，以及層層濕潤可口的招牌年輪蛋糕！",
            "<strong>淺草葵丸進 / 大黑家天丼:</strong> 淺草老字號豪華天丼，酥脆炸蝦沾上百年秘製鹹甜醬汁！",
            "<strong>淺草炸肉餅 (Asakusa Menchi):</strong> 咬下爆汁的黑毛和牛炸肉餅，淺草仲見世通必吃小吃！"
        ],
        buy: [
            "<strong>Pokémon Center TOKYO SKYTREE TOWN:</strong> 晴空塔限定「騎著烈空坐的皮卡丘」玩偶與紀念吊飾！",
            "<strong>橡子共和國 (Solamachi 店):</strong> 吉卜力工作室官方授權店，龍貓與無臉男超可愛雜貨！",
            "<strong>東京芭娜娜 (Tokyo Banana) 晴空塔限定版:</strong> 印有豹紋或豹貓圖案的限定口味芭娜娜蛋糕。"
        ],
        go: [
            "<strong>淺草寺雷門與仲見世通:</strong> 穿過巨型紅提燈雷門，漫步古色古香的古街商店街。",
            "<strong>晴空塔展望台 (Tembo Deck):</strong> 登上 350/450 公尺高空，將整座東京都市天際線與東京灣盡收眼底。",
            "<strong>台場海濱公園 (夜景煙火):</strong> 傍晚前往台場，觀賞彩虹大橋、自由女神像與璀璨的東京灣夜間煙火秀！"
        ]
    }
};

const fullItinerary = [
    {
        day: 1,
        title: "Day 1：抵達東京與錦糸町夜宵串燒",
        desc: "📍 主要區域：成田機場 ➔ 錦糸町飯店<br>點擊景點卡片可以查看攻略，按右側按鈕導航",
        items: [
            { time: "19:25", title: "🛬 抵達東京成田機場", desc: "辦理入境手續、提取行李與領取網卡/交通卡", type: "transit", tag: "🛬 機場", map: "https://www.google.com/maps/search/?api=1&query=Narita+Airport", img: "https://d1grca2t3zpuug.cloudfront.net/2025/09/2025naritaairport2-640x427-1758845721.webp" },
            { time: "19:30 – 21:00", title: "🚊 搭乘電車前往錦糸町", desc: "京成線 / JR 總武快速線約90分鐘", type: "transit", tag: "🚇 電車", map: "https://maps.app.goo.gl/kqkJRoWAyMvqi6E66", img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/05/a0005776/img/zh-tw/a0005776_parts_68c9eae462026.jpg?20260107151700&q=80&rw=620&rw=443", guideKey: "kinshicho" },
            { time: "21:30", title: "🏨 錦糸町飯店 Check-in", desc: "放置行李，辦理入住手續", type: "transit", tag: "🏨 住宿", map: "https://maps.app.goo.gl/FNJt1Qgp63BxqM2u8", img:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWltYZ2KFAbBZjfzOF9paWmNE9gNMS1T-MOcxwP4jL1nGpDtPYEFHRYHzf2DXTpsj5c64qxiKaEHWJ1P7_J10ZcwMoM_FGE-dwOVM4-ikilFpE5O2r7qYnGQhLQHhe8OxboiepfJDQ=s1360-w1360-h1020-rw", guideKey: "kinshicho" },
            { time: "22:00 – 23:30", title: "🍢錦糸町–鳥貴族 宵夜串燒 ", desc: "🚶 步行約3分鐘 / 平價均一價人氣串燒居酒屋", type: "food", tag: "🍜 美食", map: "https://www.google.com/maps/search/?api=1&query=Torikizoku+Kinshicho", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0X_yhGYTPSe-6Hy01XlAC1d5VEzl8iIYhLwIrKHM2qzVJ1kTuqH9jX8X&s=10", guideKey: "kinshicho" }
        ]
    },
    {
        day: 2,
        title: "Day 2：東京海洋迪士尼全日冒險",
        desc: "📍 主要區域：舞濱、東京迪士尼海洋<br>點擊景點卡片可以查看攻略，按右側按鈕導航",
        items: [
            { time: "06:30", title: "🏨 從錦糸町出發", desc: "🚶 步行至 JR 錦糸町站", type: "transit", tag: "🚶 步行", map: "https://maps.app.goo.gl/kqkJRoWAyMvqi6E66", img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/05/a0005776/img/zh-tw/a0005776_parts_68c9eae462026.jpg?20260107151700&q=80&rw=620&rw=443", guideKey: "kinshicho" },
            { time: "06:40 – 07:20", title: "🚊 錦糸町 ➔ 舞濱站", desc: "🚇 JR 總武線轉武藏野線/京葉線約40分鐘", type: "transit", tag: "🚇 電車", map: "https://www.google.com/maps/search/?api=1&query=Maihama+Station", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJv6yrmkAho3RHDJhAJLQoP-i3TkAC1HpTm9AI0Cw-6tEnCtHl494gTEGt&s=10" },
            { time: "07:30 – 08:00", title: "🚝 迪士尼度假區單軌電車", desc: "搭乘迪士尼單軌電車前往迪士尼海洋站", type: "transit", tag: "🚝 單軌", map: "https://www.google.com/maps/search/?api=1&query=Tokyo+DisneySea+Station", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80" },
            { time: "08:00 – 20:30", title: "🌋 東京迪士尼海洋 (Tokyo DisneySea)", desc: "夢幻泉鄉、翱翔夢幻奇航與極致夜間秀", type: "anime", tag: "🏰 樂園", map: "https://www.google.com/maps/search/?api=1&query=Tokyo+DisneySea", img: "https://gotravellingworld.com/wp-content/uploads/2025/06/1749475842-2.png" },
            { time: "21:00 – 21:40", title: "🚊 返回錦糸町", desc: "🚇 JR 京葉線轉總武線約40分鐘", type: "transit", tag: "🚇 電車", map: "https://maps.app.goo.gl/FNJt1Qgp63BxqM2u8", img: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWltYZ2KFAbBZjfzOF9paWmNE9gNMS1T-MOcxwP4jL1nGpDtPYEFHRYHzf2DXTpsj5c64qxiKaEHWJ1P7_J10ZcwMoM_FGE-dwOVM4-ikilFpE5O2r7qYnGQhLQHhe8OxboiepfJDQ=w408-h541-k-no", guideKey: "kinshicho" }
        ]
    },
    {
        day: 3,
        title: "Day 3：東京鐵塔 ➔ 澀谷寶可夢與美味漢堡排 ➔ 池袋寶可夢 ➔ 阿美橫丁",
        desc: "📍 主要區域：赤羽橋、澀谷、池袋、上野<br>點擊景點卡片可以查看攻略，按右側按鈕導航",
        items: [
            { time: "08:00", title: "🏨 從錦糸町出發", desc: "🚶 步行至地鐵站", type: "transit", tag: "🚶 步行約6分鐘", map: "https://maps.app.goo.gl/zr3XCnQcRPxeuKcS6", img: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnXmNGPDq4ra47KsINeaPCuT0-zKqyzl_FGB2TcXXgIuy_j9PEgC830obNSeftKUEnxp16rx8W2gA3hsAz69epQfciSRvq5bMVQxHZgM_Qs-QVWlITwewFUIVWHSWOH75vMdI1XNE9QZqwV=w408-h306-k-no", guideKey: "kinshicho" },
            { time: "08:10 – 08:50", title: "🚊 赤羽橋站", desc: "🚇 地鐵半藏門線轉大江戶線約30分鐘", type: "transit", tag: "🚇 電車", map: "https://www.google.com/maps/search/?api=1&query=Akabanebashi+Station", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" },
            { time: "09:10 – 10:30", title: "📍 港區–東京鐵塔 (Tokyo Tower)", desc: "🚶 赤羽橋站出口步行12分鐘 / 拍照打卡與觀景台", type: "anime", tag: "📸 景點", map: "https://www.google.com/maps/search/?api=1&query=Tokyo+Tower", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" },
            { time: "10:30 – 11:00", title: "🚊 赤羽橋 ➔ 澀谷", desc: "🚇 地鐵日比谷線轉湖南新宿線約30分鐘", type: "transit", tag: "🚇 電車", map: "https://maps.app.goo.gl/X8DasNe2w7ydYKaP9", img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80", guideKey: "shibuya" },
            { time: "11:00 – 12:00", title: "📍 澀谷–PARCO 6F 寶可夢中心", desc: "Pokémon Center SHIBUYA 🚶 步行約5分鐘", type: "shop", tag: "⚡ 聖地", map: "https://maps.app.goo.gl/Z4ZmTiec96PcKVpC9", img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80", guideKey: "shibuya" },
            { time: "12:00 – 13:30", title: "🍽️ 澀谷–Shake Shack Shibuya", desc: "🚶 步行約1分鐘", type: "food", tag: "🍜 美食", map: "https://share.google/9ij3RMB5skAei156Q", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80", guideKey: "shibuya" },
            { time: "13:30 – 14:00", title: "🚊 澀谷 ➔ 池袋", desc: "🚇 山手線 / 副都心線約25分鐘", type: "transit", tag: "🚇 電車", map: "https://maps.app.goo.gl/NrG8Qb9RqNvtUuit8", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", guideKey: "ikebukuro" },
            { time: "14:00 – 16:30", title: "📍 池袋–Pokémon Center Mega Tokyo", desc: "太陽城 🚎 ＩＫＥＢＵＳ 路線Ａ /🚶 步行約11分鐘 ", type: "shop", tag: "⚡ 聖地", map: "https://maps.app.goo.gl/VxbEGpZgbSNwGw7B7", img: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80", guideKey: "ikebukuro" },
            { time: "16:30 – 17:00", title: "🚊 池袋 ➔ 上野", desc: "🚇 山手線約35分鐘", type: "transit", tag: "🚇 電車", map: "https://www.google.com/maps/search/?api=1&query=Ueno+Station", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2voAQb4sNYFyF-QoEX1dssr7GOQqpugzfBHdLgXkbF_N3vb-Fst3m9Nsc&s=10" },
            { time: "17:00 – 20:00", title: "🛍️ 上野–阿美橫丁 (Ameyoko)", desc: "🚶 上野不忍口步行3分鐘 / 藥妝、零食小吃與晚餐散策", type: "shop", tag: "🛍️ 購物", map: "https://www.google.com/maps/search/?api=1&query=Ameyoko+Ueno", img: "https://d1grca2t3zpuug.cloudfront.net/2022/12/uenoameyokocho03.jpg" },
            { time: "20:00 – 20:30", title: "🏨 上野 ➔ 錦糸町", desc: "🚇 JR 或地鐵約35分鐘返飯店休息", type: "transit", tag: "🏨 住宿", map: "https://maps.app.goo.gl/FNJt1Qgp63BxqM2u8", img: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWltYZ2KFAbBZjfzOF9paWmNE9gNMS1T-MOcxwP4jL1nGpDtPYEFHRYHzf2DXTpsj5c64qxiKaEHWJ1P7_J10ZcwMoM_FGE-dwOVM4-ikilFpE5O2r7qYnGQhLQHhe8OxboiepfJDQ=w408-h541-k-no", guideKey: "kinshicho" }
        ]
    },
    {
        day: 4,
        title: "Day 4：押上晴空塔 ➔ 淺草豬排飯 ➔ 日本橋 ➔ 東京車站治一郎 ➔ 台場煙火",
        desc: "📍 主要區域：押上、淺草、日本橋、東京車站、台場<br>點擊景點卡片可以查看攻略，按右側按鈕導航",
        items: [
            { time: "09:00", title: "🏨 從錦糸町出發", desc: "🚶 步行至半藏門線", type: "transit", tag: "🚶 步行", map: "https://maps.app.goo.gl/kqkJRoWAyMvqi6E66", img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/05/a0005776/img/zh-tw/a0005776_parts_68c9eae462026.jpg?20260107151700&q=80&rw=620&rw=443", guideKey: "kinshicho" },
            { time: "09:05 – 09:15", title: "🚊 錦糸町 ➔ 押上 (晴空塔)", desc: "🚇 地鐵半藏門線直達1站約3分鐘", type: "transit", tag: "🚇 電車", map: "https://www.google.com/maps/search/?api=1&query=Oshiage+Station", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", guideKey: "skytree" },
            { time: "09:15 – 11:30", title: "📍 押上–東京晴空塔 Solamachi", desc: "🚶 出站即達 / 逛 Solamachi 與遠眺晴空塔", type: "anime", tag: "📸 景點", map: "https://www.google.com/maps/search/?api=1&query=Tokyo+Skytree", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", guideKey: "skytree" },
            { time: "11:30 – 11:40", title: "🚊 押上 ➔ 淺草", desc: "🚇 都營淺草線約5分鐘", type: "transit", tag: "🚇 電車", map: "https://maps.app.goo.gl/a4j12SC4jnovavnb7", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", guideKey: "skytree" },
            { time: "11:40 – 13:30", title: "🍽️ 淺草–雷門壓馬路 ＆ 午餐豬排飯", desc: "🚶 步行 / 雷門打卡與經典炸豬排飯/豚肉飯美食", type: "food", tag: "🍜 美食", map: "https://www.google.com/maps/search/?api=1&query=Asakusa+Tonkatsu", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80", guideKey: "skytree" },
            { time: "13:30 – 13:45", title: "🚊 淺草 ➔ 日本橋", desc: "🚇 銀座線約20分鐘", type: "transit", tag: "🚇 電車", map: "https://maps.app.goo.gl/AdDt2wddEs3B3zik9", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80" },
            { time: "13:45 – 15:00", title: "📍 日本橋–古蹟與高島屋壓馬路", desc: "🚶 日本橋B2出口 / 百年老店與古典建築造景", type: "shop", tag: "🛍️ 購物", map: "https://www.google.com/maps/search/?api=1&query=Nihonbashi", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80" },
            { time: "15:00 – 15:15", title: "🚊 日本橋 ➔ 東京車站", desc: "🚶 步行約10分鐘 或 🚇 地鐵1站", type: "transit", tag: "🚶 步行", map: "https://maps.app.goo.gl/cLGoGwxBVaScqiF27", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", guideKey: "skytree" },
            { time: "15:15 – 17:00", title: "🍮 東京車站–治一郎專賣店 (布丁&年輪蛋糕)", desc: "📍 八重洲地下街 / 必買超濃郁綿密治一郎布丁！", type: "food", tag: "🍜 美食", map: "https://maps.app.goo.gl/mkhbPkCBTbJWhRBD6", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", guideKey: "skytree" },
            { time: "17:00 – 17:40", title: "🚊 東京車站 ➔ 台場 (新橋轉百合海鷗號)", desc: "🚇 山手線至新橋轉乘百合海鷗號至台場海濱公園約30分鐘", type: "transit", tag: "🚇 電車", map: "https://www.google.com/maps/search/?api=1&query=Odaiba+Marine+Park+Station", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80" },
            { time: "17:40 – 20:30", title: "🎆 台場–海濱公園 ＆ 東京灣煙火夜景", desc: "🚶 步行3分鐘 / 獨角獸鋼彈、彩虹大橋與夜間煙火美景", type: "anime", tag: "📸 景點", map: "https://www.google.com/maps/search/?api=1&query=Odaiba+Marine+Park", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80" },
            { time: "20:30 – 21:15", title: "🏨 台場 ➔ 返回錦糸町", desc: "🚇 電車約40分鐘返回飯店休息", type: "transit", tag: "🏨 住宿", map: "https://maps.app.goo.gl/FNJt1Qgp63BxqM2u8", img: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWltYZ2KFAbBZjfzOF9paWmNE9gNMS1T-MOcxwP4jL1nGpDtPYEFHRYHzf2DXTpsj5c64qxiKaEHWJ1P7_J10ZcwMoM_FGE-dwOVM4-ikilFpE5O2r7qYnGQhLQHhe8OxboiepfJDQ=w408-h541-k-no", guideKey: "kinshicho" }
        ]
    },
    {
        day: 5,
        title: "Day 5：錦糸町採購 ➔ 前往成田機場 (18:00 到達)",
        desc: "📍 主要區域：錦糸町、成田國際機場<br>點擊景點卡片可以查看攻略，按右側按鈕導航",
        items: [
            { time: "10:00 – 12:00", title: "🛍️ 錦糸町–ARCAKIT & PARCO 採購", desc: "🚶 車站前 / 補齊 Uniqlo、大創與零食藥妝伴手禮", type: "shop", tag: "🛍️ 購物", map: "https://www.google.com/maps/search/?api=1&query=Kinshicho+ARCAKIT", img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/05/a0005776/img/zh-tw/a0005776_parts_68c9eae462026.jpg?20260107151700&q=80&rw=620&rw=443", guideKey: "kinshicho" },
            { time: "12:00 – 13:30", title: "🍜 錦糸町–真鯛拉麵 麵魚", desc: "🚶 步行約5分鐘 / 濃郁鮮美鯛魚高湯拉麵午餐", type: "food", tag: "🍜 美食", map: "https://www.google.com/maps/search/?api=1&query=Mengyo+Kinshicho", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80", guideKey: "kinshicho" },
            { time: "16:00 – 16:30", title: "🏨 錦糸町飯店取行李準備出發", desc: "前往車站搭乘成田特急 N'EX 或 JR 總武快速線", type: "transit", tag: "🚶 步行", map: "https://maps.app.goo.gl/kqkJRoWAyMvqi6E66", img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/05/a0005776/img/zh-tw/a0005776_parts_68c9eae462026.jpg?20260107151700&q=80&rw=620&rw=443", guideKey: "kinshicho" },
            { time: "16:30 – 18:00", title: "🛬 抵達 ✈️ 成田國際機場 (18:00 前)", desc: "搭乘 JR 總武快速/N'EX 約70分鐘直達機場，辦理退稅登機！", type: "transit", tag: "🛬 機場", map: "https://www.google.com/maps/search/?api=1&query=Narita+Airport", img: "https://d1grca2t3zpuug.cloudfront.net/2025/09/2025naritaairport2-640x427-1758845721.webp" }
        ]
    }
];

document.addEventListener("DOMContentLoaded", function() {
    fetchTokyoWeather();
    fetchJpyRate();
    switchDay(0);
    renderExpenses();
    renderPackingList();
});

function togglePayerInput() {
    const type = document.querySelector('input[name="expenseType"]:checked').value;
    document.getElementById("payerInputBox").style.display = (type === "group") ? "block" : "none";
}

function openSpotModal(spotKey) {
    const data = spotGuides[spotKey];
    if (!data) return;

    document.getElementById("modalImg").src = data.img;
    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalEat").innerHTML = data.eat.map(item => `<li>${item}</li>`).join("");
    document.getElementById("modalBuy").innerHTML = data.buy.map(item => `<li>${item}</li>`).join("");
    document.getElementById("modalGo").innerHTML = data.go.map(item => `<li>${item}</li>`).join("");

    document.getElementById("spotModal").classList.add("active");
}

function closeSpotModal() {
    document.getElementById("spotModal").classList.remove("active");
}

function switchDay(dayIndex) {
    const tabs = document.querySelectorAll('.day-btn');
    tabs.forEach((tab, idx) => tab.classList.toggle('active', idx === dayIndex));
    const dayData = fullItinerary[dayIndex] || fullItinerary[0];

    document.getElementById('day-summary').innerHTML = `<h2>${dayData.title}</h2><p>${dayData.desc}</p>`;
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    dayData.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'timeline-item';

        const imgHtml = item.img ? `
            <div class="card-img-wrapper">
                <img src="${item.img}" alt="${item.title}" class="card-img" loading="lazy">
                ${item.guideKey ? '<span class="spot-detail-badge">💡 查看攻略</span>' : ''}
            </div>
        ` : '';

        const clickAttr = item.guideKey ? `onclick="openSpotModal('${item.guideKey}')"` : '';

        itemEl.innerHTML = `
            <div class="card" ${clickAttr}>
                ${imgHtml}
                <div class="card-content">
                    <div class="card-main">
                        <span class="time">${item.time}</span>
                        <span class="event">${item.title}</span>
                        <span class="card-desc">${item.desc}</span>
                    </div>
                    <div class="card-actions" onclick="event.stopPropagation();">
                        <span class="tag ${item.type}">${item.tag}</span>
                        <a class="nav-btn" href="${item.map}" target="_blank" title="Google Maps 定位">
                            🗺️ 地圖
                        </a>
                    </div>
                </div>
            </div>`;
        container.appendChild(itemEl);
    });
}

function addExpense() {
    const desc = document.getElementById("itemDesc").value.trim();
    const amount = parseFloat(document.getElementById("itemAmount").value);
    const currency = document.getElementById("inputCurrency").value;
    const type = document.querySelector('input[name="expenseType"]:checked').value;
    const name = document.getElementById("payerName").value.trim() || "成員";
    const day = document.getElementById("expenseDay").value;

    if (!desc || isNaN(amount) || amount <= 0) {
        alert("請輸入正確的項目與金額！");
        return;
    }

    const item = {
        id: Date.now(),
        day: day,
        payer: name,
        desc: desc,
        currency: currency,
        amount: amount,
        type: type
    };

    if (type === "group") {
        if (window.firebaseAddGroupExpense) {
            window.firebaseAddGroupExpense(item);
        }
    } else {
        let localPrivate = JSON.parse(localStorage.getItem("my_private_expenses")) || [];
        localPrivate.push(item);
        localStorage.setItem("my_private_expenses", JSON.stringify(localPrivate));
        renderExpenses();
    }

    document.getElementById("itemDesc").value = "";
    document.getElementById("itemAmount").value = "";
    document.getElementById("twdPreview").innerText = "≈ NT$ 0";
}

function deletePrivateExpense(id) {
    let localPrivate = JSON.parse(localStorage.getItem("my_private_expenses")) || [];
    localPrivate = localPrivate.filter(item => item.id !== id);
    localStorage.setItem("my_private_expenses", JSON.stringify(localPrivate));
    renderExpenses();
}

function deleteGroupExpense(firebaseKey) {
    if (window.firebaseDeleteGroupExpense) window.firebaseDeleteGroupExpense(firebaseKey);
}

window.renderExpenses = function() {
    const listEl = document.getElementById("expenseList");
    if (!listEl) return;
    listEl.innerHTML = "";

    const localPrivate = JSON.parse(localStorage.getItem("my_private_expenses")) || [];
    const allExpenses = [...window.cloudGroupExpenses, ...localPrivate];

    const filterDay = document.getElementById("filterDay") ? document.getElementById("filterDay").value : "all";

    let totalJpy = 0;
    let totalTwd = 0;

    allExpenses.forEach(item => {
        const itemDay = item.day || "1";
        
        if (filterDay !== "all" && itemDay.toString() !== filterDay) {
            return;
        }

        const isTwd = item.currency === "TWD";
        if (isTwd) {
            totalTwd += item.amount;
        } else {
            totalJpy += item.amount;
        }

        const li = document.createElement("li");
        li.className = "expense-item";

        const amountDisplay = isTwd ? `NT$ ${item.amount}` : `¥ ${item.amount}`;

        if (item.type === "group") {
            li.innerHTML = `
                <div>
                    <span class="tag-badge tag-day">Day ${itemDay}</span>
                    <span class="tag-badge tag-group">👥 群體公用</span>
                    <strong>[${item.payer} 墊付] ${item.desc}</strong>
                </div>
                <div>
                    <span>${amountDisplay}</span>
                    <button onclick="deleteGroupExpense('${item.firebaseKey}')" style="border:none; background:none; color:red; cursor:pointer; margin-left:8px;">❌</button>
                </div>
            `;
        } else {
            li.innerHTML = `
                <div>
                    <span class="tag-badge tag-day">Day ${itemDay}</span>
                    <span class="tag-badge tag-personal">🙋‍♂️ 個人私有</span>
                    <strong>${item.desc}</strong>
                </div>
                <div>
                    <span>${amountDisplay}</span>
                    <button onclick="deletePrivateExpense(${item.id})" style="border:none; background:none; color:red; cursor:pointer; margin-left:8px;">❌</button>
                </div>
            `;
        }
        listEl.appendChild(li);
    });

    document.getElementById("totalJpy").innerText = `¥ ${totalJpy}`;
    document.getElementById("totalTwd").innerText = `NT$ ${totalTwd}`;
    document.getElementById("quickTotalJpy").innerText = `¥ ${totalJpy}`;

    calculateAutoSplit();
};

function calculateAutoSplit() {
    const box = document.getElementById("splitResultBox");
    if (!box) return;

    const peopleCount = parseInt(document.getElementById("splitPeopleCount").value) || 1;

    let groupJpy = 0;
    let groupTwd = 0;

    const payerJpyTotals = {};
    const payerTwdTotals = {};

    window.cloudGroupExpenses.forEach(item => {
        const payer = item.payer || "成員";
        if (item.currency === "TWD") {
            groupTwd += item.amount;
            payerTwdTotals[payer] = (payerTwdTotals[payer] || 0) + item.amount;
        } else {
            groupJpy += item.amount;
            payerJpyTotals[payer] = (payerJpyTotals[payer] || 0) + item.amount;
        }
    });

    const avgJpy = Math.round(groupJpy / peopleCount);
    const avgTwd = Math.round(groupTwd / peopleCount);

    let html = `
        <p style="margin-bottom: 6px;">👥 群體公用總計：<strong>¥ ${groupJpy}</strong> / <strong>NT$ ${groupTwd}</strong></p>
        <p style="margin-bottom: 12px; font-size: 0.95rem; color: var(--accent-blue);">👉 每人分攤：<strong>¥ ${avgJpy}</strong> + <strong>NT$ ${avgTwd}</strong></p>
        <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 12px 0;">
    `;

    const allPayers = Array.from(new Set([...Object.keys(payerJpyTotals), ...Object.keys(payerTwdTotals)]));

    if (allPayers.length === 0) {
        html += `<p style="color:#888; font-size:0.85rem;">尚無群體公用消費紀錄</p>`;
    } else {
        allPayers.forEach(payer => {
            const paidJpy = payerJpyTotals[payer] || 0;
            const diffJpy = paidJpy - avgJpy;

            const paidTwd = payerTwdTotals[payer] || 0;
            const diffTwd = paidTwd - avgTwd;

            let jpyText = "";
            if (diffJpy > 0) jpyText = `<span class="amount-get">拿回 ¥ ${diffJpy}</span>`;
            else if (diffJpy < 0) jpyText = `<span class="amount-pay">補繳 ¥ ${Math.abs(diffJpy)}</span>`;
            else jpyText = `<span style="color:#666;">日幣平帳</span>`;

            let twdText = "";
            if (diffTwd > 0) twdText = `<span class="amount-get">拿回 NT$ ${diffTwd}</span>`;
            else if (diffTwd < 0) twdText = `<span class="amount-pay">補繳 NT$ ${Math.abs(diffTwd)}</span>`;
            else twdText = `<span style="color:#666;">台幣平帳</span>`;

            html += `
                <div class="split-user-row">
                    <div><strong>${payer}</strong></div>
                    <div style="text-align: right; font-size: 0.85rem;">
                        <div>日幣: ${jpyText}</div>
                        <div>台幣: ${twdText}</div>
                    </div>
                </div>
            `;
        });
    }

    box.innerHTML = html;
}

function renderPackingList() {
    const listEl = document.getElementById("packingList");
    if (!listEl) return;
    listEl.innerHTML = "";

    let checkedCount = 0;

    packingItems.forEach(item => {
        if (item.checked) checkedCount++;

        const li = document.createElement("li");
        li.className = `packing-item ${item.checked ? 'checked' : ''}`;
        li.innerHTML = `
            <div class="packing-left" onclick="togglePackingItem(${item.id})">
                <input type="checkbox" ${item.checked ? 'checked' : ''} onclick="event.stopPropagation(); togglePackingItem(${item.id})">
                <span class="packing-text">${item.text}</span>
            </div>
            <button onclick="deletePackingItem(${item.id})" style="border:none; background:none; color:red; cursor:pointer; margin-left:8px;">❌</button>
        `;
        listEl.appendChild(li);
    });

    document.getElementById("packingProgress").innerText = `${checkedCount} / ${packingItems.length} 已完成`;
}

function renderPackingList() {
    const listEl = document.getElementById("packingList");
    if (!listEl) return;
    listEl.innerHTML = "";

    let checkedCount = 0;

    packingItems.forEach(item => {
        if (item.checked) checkedCount++;

        const li = document.createElement("li");
        li.className = `packing-item ${item.checked ? 'checked' : ''}`;
        li.innerHTML = `
            <div class="packing-left" onclick="togglePackingItem(${item.id})">
                <input type="checkbox" ${item.checked ? 'checked' : ''} onclick="event.stopPropagation(); togglePackingItem(${item.id})">
                <span class="packing-text">${item.text}</span>
            </div>
            <button onclick="deletePackingItem(${item.id})" style="border:none; background:none; color:red; cursor:pointer; margin-left:8px;">❌</button>
        `;
        listEl.appendChild(li);
    });

    document.getElementById("packingProgress").innerText = `${checkedCount} / ${packingItems.length} 已完成`;
}

function addPackingItem() {
    const text = document.getElementById("newPackingItem").value.trim();
    if (!text) {
        alert("請輸入物品名稱！");
        return;
    }

    const newItem = {
        id: Date.now(),
        text: text,
        checked: false
    };

    packingItems.push(newItem);
    savePackingItems();
    document.getElementById("newPackingItem").value = "";
    renderPackingList();
}

function togglePackingItem(id) {
    packingItems = packingItems.map(item => {
        if (item.id === id) item.checked = !item.checked;
        return item;
    });
    savePackingItems();
    renderPackingList();
}

function deletePackingItem(id) {
    packingItems = packingItems.filter(item => item.id !== id);
    savePackingItems();
    renderPackingList();
}

function savePackingItems() {
    localStorage.setItem("my_tokyo_packing_list", JSON.stringify(packingItems));
}

async function fetchTokyoWeather() {
    try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current_weather=true");
        const data = await res.json();
        document.getElementById("weatherInfo").innerText = `🌡️ ${data.current_weather.temperature}°C (東京市區)`;
    } catch (e) {
        document.getElementById("weatherInfo").innerText = "☀️ 20°C (東京)";
    }
}

async function fetchJpyRate() {
    try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/JPY");
        const data = await res.json();
        currentJpyToTwdRate = data.rates.TWD;
        document.getElementById("rateBadge").innerText = `當前匯率：1 JPY ≈ ${currentJpyToTwdRate.toFixed(4)} TWD`;
    } catch (e) {
        document.getElementById("rateBadge").innerText = `預設匯率：1 JPY ≈ ${currentJpyToTwdRate} TWD`;
    }
}

function switchPage(pageId) {
    document.querySelectorAll(".page-view").forEach(el => el.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    event.target.classList.add("active");
    document.getElementById(tabId).classList.add("active");
}

function calcTwdPreview() {
    const jpy = parseFloat(document.getElementById("itemJpy").value) || 0;
    document.getElementById("twdPreview").innerText = `≈ NT$ ${Math.round(jpy * currentJpyToTwdRate)}`;
}