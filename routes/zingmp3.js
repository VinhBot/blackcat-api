import { zing } from "zingmp3-api-next";
import express from 'express';
var router = express.Router()

class ZingControllers {
    async getHome(req, res) {
        const data = await zing.get_home()
        res.json(data)
    }
    async getPlayList(req, res) {
        const data = await zing.get_playlist(req.params.id)
        res.json(data)
    }
    async GetSuggestedPlaylists(req, res) {
        const data = await zing.get_suggested_playlists(req.params.id)
        res.json(data)
    }

    async getSong(req, res) {
        const data = await zing.get_song(req.params.id)
        res.json(data)
    }

    async getSongInfo(req, res) {
        const data = await zing.get_song_info(req.params.id)
        res.json(data)
    }

    async getSongLyrics(req, res) {
        const data = await zing.get_song_lyric(req.params.id)
        res.json(data)
    }

    async getHomeChart(req, res) {
        const data = await zing.get_home_chart()
        res.json(data)
    }

    async getNewReleaseChart(req, res) {
        const data = await zing.get_new_release_chart()
        res.json(data)
    }

    async getWeekChart(req, res) {
        const data = await zing.get_week_chart(req.params.id)
        res.json(data)
    }

    async getRadio(req, res) {
        const data = await zing.get_radio()
        res.json(data)
    }

    async getNewFeeds(req, res) {
        //http://localhost:3000/api/newfeeds?id=IWZ9Z08I&page=3
        const data = await zing.get_list_by_genre(req.query.id, req.query.page)
        res.json(data)
    }

    async getArtist(req, res) {
        // http://localhost:3000/api/artist/Alan-Walker
        const data = await zing.get_artist(req.params.name)
        res.json(data)
    }

    // The loai
    async getHub(req, res) {
        const data = await zing.get_hub_home()
        res.json(data)
    }

    async getHubDetail(req, res) {
        const data = await zing.get_hub_detail(req.params.id)
        res.json(data)
    }

    async getTop100(req, res) {
        const data = await zing.get_top_100()
        res.json(data)
    }
    async getListMv(req, res) {
        // http://localhost:3000/api/listmv?id=IWZ9Z08I&page=1&count=50
        const data = await zing.get_list_mv(req.query.id, req.query.page, req.query.count, req.query.sorts)
        res.json(data)
    }
    async getCategoryMv(req, res) {
        const data = await zing.get_category_mv(req.params.id)
        res.json(data)
    }
    async getMv(req, res) {
        const data = await zing.get_mv(req.params.id)
        res.json(data)
    }
    async getEvents(req, res) {
        const data = await zing.get_events()
        res.json(data)
    }
    async getEventInfo(req, res) {
        const data = await zing.get_event_info(req.params.id)
        res.json(data)
    }
    async getSearchAll(req, res) {
        const data = await zing.search_all(req.query.keyword)
        res.json(data)
    }
    async getSearchbyType(req, res) {
        // type: song , video , artist,playlist
        // page,
        // count
        // http://localhost:3000/api/searchtype?keyword=karik&type=video
        const data = await zing.search_by_type(req.query.keyword, req.query.type, req.query.page, req.query.count)
        res.json(data)
    }
    async getSuggestionKeyword(req, res) {
        const data = await zing.get_suggestion_keyword(req.query.keyword)
        res.json(data)
    }
    async getRecommendKeyword(req, res) {
        res.json({
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
    };
};

const ZingController = new ZingControllers();

router.get("/home", ZingController.getHome);
router.get("/playlist/:id", ZingController.getPlayList);
router.get("/suggestedplaylists/:id", ZingController.GetSuggestedPlaylists);
router.get("/song/:id", ZingController.getSong);
router.get("/songinfo/:id", ZingController.getSongInfo);
router.get("/songlyrics/:id", ZingController.getSongLyrics);
router.get("/homechart", ZingController.getHomeChart);
router.get("/newreleasechart", ZingController.getNewReleaseChart);
router.get("/weekchart/:id", ZingController.getWeekChart);
router.get("/radio", ZingController.getRadio);
router.get("/newfeeds", ZingController.getNewFeeds);
router.get("/artist/:name", ZingController.getArtist);
router.get("/hubhome", ZingController.getHub);
router.get("/hubdetails/:id", ZingController.getHubDetail);
router.get("/top100", ZingController.getTop100);
router.get("/listmv", ZingController.getListMv);
router.get("/categorymv/:id", ZingController.getCategoryMv);
router.get("/mv/:id", ZingController.getMv);
router.get("/events", ZingController.getEvents);
router.get("/eventinfo/:id", ZingController.getEventInfo);
router.get("/searchall", ZingController.getSearchAll);
router.get("/searchtype", ZingController.getSearchbyType);
router.get("/recommendkeyword", ZingController.getRecommendKeyword);
router.get("/suggestionkeyword", ZingController.getSuggestionKeyword);
// Xuất router để sử dụng trong ứng dụng Express
export default router;