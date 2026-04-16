export type PhotoItem = {
  slug: string;
  image: string;
  alt: string;
  orientation: "portrait" | "landscape";
  size: "small" | "medium" | "large";
  note: string[];
};

export type InfoItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  size: "small" | "medium" | "large";
  note: string;
};

export type Post = {
  slug: string;
  title: string;
  country: string;
  countryCode: string;
  excerpt: string;
  cover: string;
  intro: string[];
  photos: PhotoItem[];
  information: InfoItem[];
};

export const posts: Post[] = [
  {
    slug: "delhi",
    title: "Delhi",
    country: "India",
    countryCode: "IN",
    excerpt: "雑踏と乾いた空気のなかで、都市の大きさを身体で知った。",
    cover: "/images/delhi/cover.jpeg",
    intro: [
      "バックパッカーの聖地、パハールガンジは埃っぽい空気と人の熱気で満ちていた。",
      "久しぶりに、旅のはじめの頃のような、好奇心と緊張が入り混じった感覚を思い出した。",
    ],
    photos: [
      {
        slug: "p1",
        image: "/images/delhi/1.jpeg",
        alt: "Delhi photo 1",
        orientation: "landscape",
        size: "large",
        note: ["Paharganj in the morning",
               "バックパッカーの聖地と呼ばれるこのエリアは、世界中から旅人が集まる場所。",
               "朝からこの通りは活気にあふれ、屋台や小さな店が軒を連ねていた。"],
      },
      {
        slug: "p2",
        image: "/images/delhi/2.jpeg",
        alt: "Delhi photo 2",
        orientation: "portrait",
        size: "medium",
        note: ["チャイを売る屋台",
               "パハールガンジの通りには、至る所にチャイを売る屋台があった。"],
      },
      {
        slug: "p3",
        image: "/images/delhi/3.jpeg",
        alt: "Delhi photo 3",
        orientation: "landscape",
        size: "small",
        note: ["素焼きのカップ",
               "素焼きのカップでチャイを飲むのが夢だった。素焼きで飲むと美味しさが2倍である。"],
      },
      {
        slug: "p4",
        image: "/images/delhi/4.jpeg",
        alt: "Delhi photo 4",
        orientation: "landscape",
        size: "large",
        note: ["オールドデリーの若者",
               "ジャーマー・マスジドには多くのムスリムが礼拝に訪れる。",
               "そこには、市内とは違う空気が流れていて、若者たちもどこか誇らしげに見えた。"],
      },
      {
        slug: "p5",
        image: "/images/delhi/5.jpeg",
        alt: "Delhi photo 5",
        orientation: "portrait",
        size: "medium",
        note: ["少年たち",
               "学校帰りの少年たち。",
               "彼らの笑顔が、この国の未来を明るく照らしているように感じた。"],
      },
      {
        slug: "p6",
        image: "/images/delhi/6.jpeg",
        alt: "Delhi photo 6",
        orientation: "landscape",
        size: "large",
        note: ["チャイ屋の少年",
               "オールドデリーの路地裏でチャイを売る少年。",
               "彼にとっては、日常の一部であろうこの風景も、旅人にとっては新鮮で、つい写真を撮りたくなってしまう。"],
      },
      {
        slug: "p7",
        image: "/images/delhi/7.jpeg",
        alt: "Delhi photo 7",
        orientation: "portrait",
        size: "medium",
        note: ["どこまでも、人。",
               "むき出しの電線、食事を待つ人々。ニューデリーとは全く異なる空気が流れる。"],
      },
      {
        slug: "p8",
        image: "/images/delhi/8.jpeg",
        alt: "Delhi photo 8",
        orientation: "landscape",
        size: "large",
        note: ["たくさんの詐欺師",
               "パハールガンジやニューデリー駅周辺には、詐欺師がたくさんいる。",
               "日本語の勧誘を無視していると、'Are you Neapl?'と聞かれ、笑ってしまった。"],
      },
    ],
    information: [
      {
        slug: "restaurant-1",
        title: "Amristsari Chur Chur Naan",
        category: "Restaurant",
        image: "/images/delhi/info1.jpeg",
        alt: "Delhi information 1",
        size: "large",
        note: "test",
      },
      {
        slug: "cafe-1",
        title: "Shri Bankey Bihari Samosa Wale",
        category: "Fastfood",
        image: "/images/delhi/info2.jpeg",
        alt: "Delhi information 2",
        size: "medium",
        note: "test",
      },
      {
        slug: "market-1",
        title: "unknown",
        category: "Cafe",
        image: "/images/delhi/info3.jpeg",
        alt: "Delhi information 3",
        size: "small",
        note: "test",
      },
    ],
  },
  {
    slug: "varanasi",
    title: "Varanasi",
    country: "India",
    countryCode: "IN",
    excerpt: "祈りよりも先に、そこにある生活の手触りが残った。",
    cover: "/images/varanasi/cover.jpeg",
    intro: [
      "聖と俗、生と死。全てが交差し、溶け合い、境界は曖昧になる。",
      "生きることも、死ぬことも、自然の一部なのだろう、そう感じさせる街だった。",
    ],
    photos: [
      { slug: "p1", image: "/images/varanasi/1.jpeg", alt: "Varanasi photo 1", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p2", image: "/images/varanasi/2.jpeg", alt: "Varanasi photo 2", orientation: "portrait", size: "large", note: ["test"] },
      { slug: "p3", image: "/images/varanasi/3.jpeg", alt: "Varanasi photo 3", orientation: "landscape", size: "large", note: ["test"] },
      { slug: "p4", image: "/images/varanasi/4.jpeg", alt: "Varanasi photo 4", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p5", image: "/images/varanasi/5.jpeg", alt: "Varanasi photo 5", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p6", image: "/images/varanasi/6.jpeg", alt: "Varanasi photo 6", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p7", image: "/images/varanasi/7.jpeg", alt: "Varanasi photo 7", orientation: "landscape", size: "small", note: ["test"] },
      { slug: "p8", image: "/images/varanasi/8.jpeg", alt: "Varanasi photo 8", orientation: "landscape", size: "large", note: ["test"] },
    ],
    information: [],
  },
  {
    slug: "bangkok",
    title: "Bangkok",
    country: "Thailand",
    countryCode: "TH",
    excerpt: "熱気と湿度の中で、街の速さと軽やかさが同時にあった。",
    cover: "/images/bangkok/cover.jpeg",
    intro: [
      "混沌という言葉では足りないくらい、すべてが軽やかに流れていた。",
      "速さの中にある柔らかさが、この街の印象として残っている。",
    ],
    photos: [
      { slug: "p1", image: "/images/bangkok/1.jpeg", alt: "Bangkok photo 1", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p2", image: "/images/bangkok/2.jpeg", alt: "Bangkok photo 2", orientation: "portrait", size: "medium", note: ["test"] },
    ],
    information: [],
  },
  {
    slug: "hanoi",
    title: "Hanoi",
    country: "Vietnam",
    countryCode: "VN",
    excerpt: "山の輪郭と霧の気配が静かに残った。",
    cover: "/images/hanoi/cover.jpeg",
    intro: [
      "この街の熱気が好きだ。",
      "人の多さ、バイクの騒音、どこか薄暗い雰囲気、そのすべてが心地よい。",
    ],
    photos: [
      { slug: "p1", image: "/images/hanoi/1.jpeg", alt: "hanoi photo 1", orientation: "landscape", size: "medium", note: ["熱気", "飛行機を降りると、独特の熱気が肌にまとわりつく。", "また、ハノイにやってきた。"] },
      { slug: "p2", image: "/images/hanoi/2.jpeg", alt: "hanoi photo 2", orientation: "landscape", size: "medium", note: ["bia hoi", "お気に入りのビアホイのお店で、ビールを流し込む。このためにハノイにやってきたのだ。", "日本での生活の圧迫感から解放される瞬間だった。"] },
      { slug: "p3", image: "/images/hanoi/3.jpeg", alt: "hanoi photo 3", orientation: "landscape", size: "medium", note: ["いつもの景色", "ビアホイを飲みながら外を眺める。ああ、この景色が好きだ。"] },
      { slug: "p4", image: "/images/hanoi/4.jpeg", alt: "hanoi photo 4", orientation: "landscape", size: "large", note: ["低すぎるテーブルと椅子", "夜になると、歩道にテーブルと椅子を出して、ご飯やビアホイを楽しむ人たちであふれる。", "低すぎるテーブルと椅子が、なんとも言えない心地よさを生み出している。"] },
      { slug: "p5", image: "/images/hanoi/5.jpeg", alt: "hanoi photo 5", orientation: "portrait", size: "small", note: ["バイクと花束", "ハノイの旧市街は、バイクの洪水のような場所だ。", "そんな中、花束を運ぶ自転車が、なんとも言えない美しさを放っていた。"] },
      { slug: "p6", image: "/images/hanoi/6.jpeg", alt: "hanoi photo 6", orientation: "landscape", size: "large", note: ["日常", "ホアンキエム湖の周りは、地元の人たちの憩いの場だ。", "ありふれた日常の風景が、旅人にとっては非日常の連続となり、気がつくとシャッターを切っていた。"] },
      { slug: "p7", image: "/images/hanoi/7.jpeg", alt: "hanoi photo 7", orientation: "portrait", size: "small", note: ["シクロ"] },
      { slug: "p8", image: "/images/hanoi/8.jpeg", alt: "hanoi photo 8", orientation: "landscape", size: "medium", note: ["VIETNAM", "この街には至るところにTシャツを売る店がある。", "Tシャツに描かれた黄色の星が、ベトナムにいることを実感させてくれる。"] },
    ],
    information: [],
  },
  {
    slug: "sapa",
    title: "Sapa",
    country: "Vietnam",
    countryCode: "VN",
    excerpt: "山の輪郭と霧の気配が静かに残った。",
    cover: "/images/sapa/cover.jpeg",
    intro: [
      "山を見るというより、霧の中で輪郭を待つ時間の方が印象に残っている。",
      "見えなさの中にある静けさが、この場所の記憶になった。",
    ],
    photos: [
      { slug: "p1", image: "/images/sapa/1.jpeg", alt: "Sapa photo 1", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p2", image: "/images/sapa/2.jpeg", alt: "Sapa photo 2", orientation: "portrait", size: "medium", note: ["test"] },
    ],
    information: [],
  },
  {
    slug: "halong",
    title: "Ha Long Bay",
    country: "Vietnam",
    countryCode: "VN",
    excerpt: "山の輪郭と霧の気配が静かに残った。",
    cover: "/images/halong/cover.jpeg",
    intro: [
      "世界遺産、ハロン湾に行った日の思い出。",
      "一期一会の出会いが、僕をさらなる旅へ導き、人生を大きく変えた。",
    ],
    photos: [
      { slug: "p1", image: "/images/halong/1.jpeg", alt: "halong photo 1", orientation: "landscape", size: "large", note: ["印象・日の出・ハロン湾", "ハロン湾の夕日は、まるで絵画のように美しかった。"] },
      { slug: "p2", image: "/images/halong/2.jpeg", alt: "halong photo 2", orientation: "portrait", size: "medium", note: ["出会い", "クルーズ船での不思議な出会い。", "人生には、偶然の出会いがある。あの日、あの場所で、あの人と出会わなければ、今の自分はなかったかもしれない。"] },
      { slug: "p3", image: "/images/halong/3.jpeg", alt: "halong photo 3", orientation: "landscape", size: "large", note: ["in the movie", "まるで映画の中のような、幻想的な洞窟の風景。"] },
      { slug: "p4", image: "/images/halong/4.jpeg", alt: "halong photo 4", orientation: "landscape", size: "medium", note: ["人工物", "ハロン湾の自然の美しさに、人工物が混ざり、なんとも言えない違和感が生まれた。"] },
      { slug: "p5", image: "/images/halong/5.jpeg", alt: "halong photo 5", orientation: "landscape", size: "medium", note: ["一人旅", "一人旅は、自分と向き合い、対話する時間だ。", "流れるままに生きて、流れるままに出会い、流れるままに別れていく。", "ハロン湾での出会いは、そんな一人旅の喜びと寂しさを感じさせてくれた。"] },
    ],
    information: [],
  },
  {
    slug: "khiva",
    title: "Khiva",
    country: "Uzbekistan",
    countryCode: "UZ",
    excerpt: "山の輪郭と霧の気配が静かに残った。",
    cover: "/images/khiva/cover.jpeg",
    intro: [
      "シルクロードのオアシス都市、ヒヴァは、砂漠の中の宝石のような場所だった。",
    ],
    photos: [
      { slug: "p1", image: "/images/khiva/1.jpeg", alt: "khiva photo 1", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p2", image: "/images/khiva/2.jpeg", alt: "khiva photo 2", orientation: "portrait", size: "medium", note: ["test"] },
      { slug: "p3", image: "/images/khiva/3.jpeg", alt: "khiva photo 3", orientation: "portrait", size: "medium", note: ["test"] },
      { slug: "p4", image: "/images/khiva/4.jpeg", alt: "khiva photo 4", orientation: "portrait", size: "small", note: ["test"] },
      { slug: "p5", image: "/images/khiva/5.jpeg", alt: "khiva photo 5", orientation: "portrait", size: "medium", note: ["test"] },
      { slug: "p6", image: "/images/khiva/6.jpeg", alt: "khiva photo 6", orientation: "portrait", size: "large", note: ["test"] },
      { slug: "p7", image: "/images/khiva/7.jpeg", alt: "khiva photo 7", orientation: "portrait", size: "medium", note: ["test"] },
    ],
    information: [],
  },
  {
    slug: "panjikent",
    title: "Panjikent",
    country: "Tajikistan",
    countryCode: "TJ",
    excerpt: "山の輪郭と霧の気配が静かに残った。",
    cover: "/images/panjikent/cover.jpeg",
    intro: [
      "サマルカンドからタジキスタンに入ると、風景が一変した。",
      "中央アジア最貧国と言われるこの国で、豊かさとは何かと考えていた。",
    ],
    photos: [
      { slug: "p1", image: "/images/sapa/1.jpeg", alt: "Sapa photo 1", orientation: "landscape", size: "medium", note: ["test"] },
      { slug: "p2", image: "/images/sapa/2.jpeg", alt: "Sapa photo 2", orientation: "portrait", size: "medium", note: ["test"] },
    ],
    information: [],
  },
];