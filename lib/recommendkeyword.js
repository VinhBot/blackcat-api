export default function recommendkeyword(app) {
   app.get("/recommendkeyword", async(request, response) => {
    response.send({
      "err": 0,
      "msg": "Success",
      "data": [
        {
            "keyword": "em thật là ngốc",
            "link": ""
        },
        {
            "keyword": "Họ Đâu Thương Em",
            "link": ""
        },
        {
            "keyword": "Có Mới Nới Cũ",
            "link": ""
        },
        {
            "keyword": "anh đâu muốn thấy em buồn",
            "link": ""
        },
        {
            "keyword": "em là ai",
            "link": ""
        },
        {
            "keyword": "hoa cỏ lau",
            "link": ""
        }
      ],
      "timestamp": 1693926266114
    });
  });
};