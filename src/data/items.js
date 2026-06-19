// 物品数据库（精选常用礼物物品）。
// 字段：id 物品ID（不带前缀，礼物口味用的就是这种）、en 英文名、zh 中文名、cat 分类标签。
// 这是一份「常用物品」起始集，不是全部 ~800 个物品。要补全可对照
// Stardew Valley Wiki 的物品 ID 表，或游戏 Content/Data/Objects 的本地化文件，
// 按同样的结构往这个数组里加即可（搜索/选择器会自动支持新加的项）。
export const ITEMS = [
  // 宝石矿物
  { id: 60, en: "Emerald", zh: "绿宝石", cat: "gem" },
  { id: 62, en: "Aquamarine", zh: "海蓝宝石", cat: "gem" },
  { id: 64, en: "Ruby", zh: "红宝石", cat: "gem" },
  { id: 66, en: "Amethyst", zh: "紫水晶", cat: "gem" },
  { id: 68, en: "Topaz", zh: "黄玉", cat: "gem" },
  { id: 70, en: "Jade", zh: "翡翠", cat: "gem" },
  { id: 72, en: "Diamond", zh: "钻石", cat: "gem" },
  { id: 74, en: "Prismatic Shard", zh: "五彩碎片", cat: "gem" },
  { id: 80, en: "Quartz", zh: "石英", cat: "mineral" },
  { id: 82, en: "Fire Quartz", zh: "火水晶", cat: "mineral" },
  { id: 84, en: "Frozen Tear", zh: "冰晶泪", cat: "mineral" },
  { id: 86, en: "Earth Crystal", zh: "地晶", cat: "mineral" },

  // 通用最爱
  { id: 446, en: "Rabbit's Foot", zh: "兔子的脚", cat: "animal" },
  { id: 797, en: "Pearl", zh: "珍珠", cat: "misc" },
  { id: 279, en: "Magic Rock Candy", zh: "神奇水果硬糖", cat: "misc" },

  // 花
  { id: 18, en: "Daffodil", zh: "黄水仙", cat: "flower" },
  { id: 22, en: "Dandelion", zh: "蒲公英", cat: "forage" },
  { id: 376, en: "Poppy", zh: "罂粟花", cat: "flower" },
  { id: 421, en: "Sunflower", zh: "向日葵", cat: "flower" },
  { id: 591, en: "Tulip", zh: "郁金香", cat: "flower" },
  { id: 593, en: "Summer Spangle", zh: "夏季亮片", cat: "flower" },
  { id: 595, en: "Fairy Rose", zh: "仙女蔷薇", cat: "flower" },
  { id: 597, en: "Blue Jazz", zh: "蓝爵", cat: "flower" },

  // 蔬菜
  { id: 24, en: "Parsnip", zh: "防风草", cat: "veg" },
  { id: 190, en: "Cauliflower", zh: "花椰菜", cat: "veg" },
  { id: 192, en: "Potato", zh: "土豆", cat: "veg" },
  { id: 248, en: "Garlic", zh: "大蒜", cat: "veg" },
  { id: 256, en: "Tomato", zh: "番茄", cat: "veg" },
  { id: 262, en: "Wheat", zh: "小麦", cat: "veg" },
  { id: 270, en: "Corn", zh: "玉米", cat: "veg" },
  { id: 272, en: "Eggplant", zh: "茄子", cat: "veg" },
  { id: 276, en: "Pumpkin", zh: "南瓜", cat: "veg" },
  { id: 280, en: "Yam", zh: "山药", cat: "veg" },

  // 水果
  { id: 88, en: "Coconut", zh: "椰子", cat: "fruit" },
  { id: 90, en: "Cactus Fruit", zh: "仙人掌果", cat: "fruit" },
  { id: 254, en: "Melon", zh: "甜瓜", cat: "fruit" },
  { id: 258, en: "Blueberry", zh: "蓝莓", cat: "fruit" },
  { id: 268, en: "Starfruit", zh: "杨桃", cat: "fruit" },
  { id: 613, en: "Apple", zh: "苹果", cat: "fruit" },
  { id: 634, en: "Apricot", zh: "杏子", cat: "fruit" },
  { id: 635, en: "Orange", zh: "橙子", cat: "fruit" },
  { id: 636, en: "Peach", zh: "桃子", cat: "fruit" },
  { id: 637, en: "Pomegranate", zh: "石榴", cat: "fruit" },
  { id: 638, en: "Cherry", zh: "樱桃", cat: "fruit" },

  // 拾取物
  { id: 16, en: "Wild Horseradish", zh: "野山葵", cat: "forage" },
  { id: 257, en: "Morel", zh: "羊肚菌", cat: "forage" },
  { id: 404, en: "Common Mushroom", zh: "普通蘑菇", cat: "forage" },
  { id: 406, en: "Wild Plum", zh: "野梅", cat: "forage" },
  { id: 408, en: "Hazelnut", zh: "榛子", cat: "forage" },
  { id: 410, en: "Blackberry", zh: "黑莓", cat: "forage" },
  { id: 414, en: "Crystal Fruit", zh: "水晶果", cat: "forage" },

  // 手工艺品
  { id: 340, en: "Honey", zh: "蜂蜜", cat: "artisan" },
  { id: 344, en: "Jelly", zh: "果酱", cat: "artisan" },
  { id: 348, en: "Wine", zh: "葡萄酒", cat: "artisan" },
  { id: 424, en: "Cheese", zh: "奶酪", cat: "artisan" },
  { id: 459, en: "Mead", zh: "蜂蜜酒", cat: "artisan" },
  { id: 614, en: "Green Tea", zh: "绿茶", cat: "artisan" },
  { id: 395, en: "Coffee", zh: "咖啡", cat: "artisan" },
  { id: 724, en: "Maple Syrup", zh: "枫糖浆", cat: "artisan" },

  // 熟食
  { id: 206, en: "Pizza", zh: "披萨", cat: "cooked" },
  { id: 220, en: "Chocolate Cake", zh: "巧克力蛋糕", cat: "cooked" },
  { id: 221, en: "Pink Cake", zh: "粉红蛋糕", cat: "cooked" },
  { id: 222, en: "Rhubarb Pie", zh: "大黄派", cat: "cooked" },
  { id: 224, en: "Spaghetti", zh: "意大利面", cat: "cooked" },
  { id: 226, en: "Spicy Eel", zh: "香辣鳗鱼", cat: "cooked" },
  { id: 233, en: "Ice Cream", zh: "冰激凌", cat: "cooked" },
  { id: 608, en: "Pumpkin Pie", zh: "南瓜派", cat: "cooked" },

  // 容易被讨厌的东西
  { id: 245, en: "Sugar", zh: "糖", cat: "ingredient" },
  { id: 246, en: "Wheat Flour", zh: "小麦粉", cat: "ingredient" },
  { id: 247, en: "Oil", zh: "食用油", cat: "ingredient" },
  { id: 330, en: "Clay", zh: "黏土", cat: "resource" },
  { id: 78, en: "Cave Carrot", zh: "洞穴胡萝卜", cat: "forage" },
];
