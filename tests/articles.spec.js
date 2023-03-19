const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const Article = require("../api/articles/articles.model");
const mockingoose = require("mockingoose");

describe("tester API articles", () => {
    let token;
    const ARTICLE_ID = "fake";

    const MOCK_DATA_CREATED = {
        title: "lorem",
        content: "lorem ipsum dolor sit amet",
    };   
    const MOCK_DATA_UPDATED = {
        title: "ipsum",
        content: "ipsum dolor sit ametlorem",
    };     
    const MOCK_DATA_DELETED = {
        title: "",
        content: "",
    };   

    beforeEach(() => {
    token = jwt.sign({ articleID: ARTICLE_ID }, config.secretJwtToken);
    // mongoose.Query.prototype.find = jest.fn().mockResolvedValue(MOCK_DATA);
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
    mockingoose(Article).toReturn(MOCK_DATA_UPDATED, "update");
    mockingoose(Article).toReturn(MOCK_DATA_DELETED, "delete");
    });

    test("[Articles] Create Article", async () => {
        const res = await request(app)
          .post("/api/articles")
          .send(MOCK_DATA_CREATED)
          .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(MOCK_DATA_CREATED.name);
    });

    test("[Articles] Update Article", async () => {
        const res = await request(app)
            .post("/api/articles")
            .send(MOCK_DATA_UPDATED)
            .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(MOCK_DATA_UPDATED.name);
    });

    test("[Articles] Delete Article", async () => {
        const res = await request(app)
            .post("/api/articles")
            .send(MOCK_DATA_DELETED)
            .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(MOCK_DATA_DELETED.name);
    });

});