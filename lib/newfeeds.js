import vietnam from "./newFeeds/vietnam.js";
import aumi from "./newFeeds/aumi.js";

export default function newFeeds(app) {
  // việt nam
  app.get("/newfeeds:Viet-Nam", async(request, response) => {
    response.send(vietnam);
  });
  // âu mĩ (us)
  app.get("/newfeeds:Au-My", async(request, response) => {
    response.send(aumi);
  });
  // Hàn quốc
  app.get("/newfeeds:Han-Quoc", async(request, response) => {
    return response.send({
      "data": {
        "total": 1,
        "items": [
          {
            "content": {
              "type": "feedVideo",
              "thumbnail": "https://photo-zmedia-zmp3.zmdcdn.me/w512_png/9446f547d2023b5c6213",
              "source": {
                "240p": "https://mplatform-mcloud-bf-s8.zadn.vn/F5qOByf9olY/0edcc435ec6e03305a7f/3e541e78050aea54b31b/240/1664134718732.mp4?authen=exp=1698092857~acl=/F5qOByf9olY/*~hmac=3022d6456168d85d6c0f8ea3bc0c42fc",
                "ratio": 0.5607476635514018,
                "thumbnail": "httpss://mplatform-mcloud-img-s8.zadn.vn/Ez7CE0n_Cbo/a52662cf4a94a5cafc85/37fd1ad101a3eefdb7b2/240/1664134718732.jpg"
              }
            },
            "id": "IW77E766",
            "type": 2,
            "title": "More teasers… what a cheek",
            "createdTime": 1664134718,
            "publishTime": 1668531784,
            "shortDescription": "More teasers… what a cheek",
            "description": "More teasers… what a cheek",
            "onlyVN": true,
            "sourceType": 3,
            "publisher": {
              "id": "IWZ96CO8",
              "name": "Olly Murs",
              "link": "/nghe-si/Olly-Murs",
              "spotlight": false,
              "alias": "Olly-Murs",
              "playlistId": "ZODWA9BU",
              "cover": "https://photo-zmp3.zmdcdn.me/cover3_artist/9/9/99909c5d43665fb4a3d7184d79ad901c_1415201489.jpg",
              "thumbnail": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/8/1/b/b81b4d2bc4e09c35193635a3197a8729.jpg"
            },
            "status": "public",
            "like": 0,
            "commend": 0,
            "liked": false
          }
        ]
      },
      "timestamp": 1697923655790
    });
  });
  // trung quốc
  app.get("/newfeeds:Trung-Quoc", async(request, response) => {
    return response.send({
      "data": {
        "total": 1,
        "items": [
          {
            "content": {
              "type": "feedVideo",
              "thumbnail": "https://photo-zmedia-zmp3.zmdcdn.me/w512_png/9446f547d2023b5c6213",
              "source": {
                "240p": "https://mplatform-mcloud-bf-s8.zadn.vn/F5qOByf9olY/0edcc435ec6e03305a7f/3e541e78050aea54b31b/240/1664134718732.mp4?authen=exp=1698092857~acl=/F5qOByf9olY/*~hmac=3022d6456168d85d6c0f8ea3bc0c42fc",
                "ratio": 0.5607476635514018,
                "thumbnail": "httpss://mplatform-mcloud-img-s8.zadn.vn/Ez7CE0n_Cbo/a52662cf4a94a5cafc85/37fd1ad101a3eefdb7b2/240/1664134718732.jpg"
              }
            },
            "id": "IW77E766",
            "type": 2,
            "title": "🍑🤪👌🏻",
            "createdTime": 1664134718,
            "publishTime": 1668531784,
            "shortDescription": "🍑🤪👌🏻",
            "description": "🍑🤪👌🏻",
            "onlyVN": true,
            "sourceType": 3,
            "publisher": {
              "id": "IWZ96CO8",
              "name": "Olly Murs",
              "link": "/nghe-si/Olly-Murs",
              "spotlight": false,
              "alias": "Olly-Murs",
              "playlistId": "ZODWA9BU",
              "cover": "https://photo-zmp3.zmdcdn.me/cover3_artist/9/9/99909c5d43665fb4a3d7184d79ad901c_1415201489.jpg",
              "thumbnail": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/8/1/b/b81b4d2bc4e09c35193635a3197a8729.jpg"
            },
            "status": "public",
            "like": 0,
            "commend": 0,
            "liked": false
          }
        ]
      },
      "timestamp": 1697923655790
    });
  });
};