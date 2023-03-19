const usersController = require("../users/users.controller");

class ArticlesController {
  async create(req, res, next) {
    try {
      const article = await articlesService.create(req.body);
      const userId = user.id;
      req.io.emit("article:create", article, userId);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const title = req.title;
      if (user.role = admin) {
        const articleModified = await articlesService.update(id, data, title);
        res.json(articleModified);
      }      
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      if (user.role = admin) {
        await articlesService.delete(id);
        req.io.emit("article:delete", { id });
        res.status(204).send();
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();