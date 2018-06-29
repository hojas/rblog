const Post = require('../models/Post')
const Category = require('../models/Category')
const { isAdmin, save, update, remove, findAll } = require('./utils')

const mapCates = async () => {
  const cates = await Category.find({})
  const catesObj = {}
  cates.map(cate => {
    catesObj[cate.url] = cate
  })
  return catesObj
}

module.exports = class PostController {
  static async add(ctx, next) {
    if (!isAdmin(ctx)) {
      await next()
    }

    const cates = await mapCates()
    const {
      title,
      content,
      category,
    } = ctx.request.body
    console.log('category ', category)
    console.log('category ', cates[category])
    const post = new Post({
      title,
      content,
      category: cates[category],
      author: ctx.session.user,
    })

    const res = await save(post)
    console.log(res)
    if (res.ok) {
      ctx.body = { ok: true, message: '添加文章成功' }
    } else {
      ctx.body = { ok: false, message: '添加文章失败' }
    }
  }

  static async update(ctx, next) {
    if (!isAdmin(ctx)) {
      await next()
    }

    const cates = await mapCates()
    const {
      _id,
      title,
      content,
      category,
    } = ctx.request.body
    const post = {
      _id,
      title,
      content,
      category: cates[category],
    }

    const res = await update(Post, post)
    if (res.ok) {
      ctx.body = { ok: true, message: '更新文章成功' }
    } else {
      ctx.body = { ok: false, message: '更新文章失败' }
    }
  }

  static async remove(ctx, next) {
    if (!isAdmin(ctx)) {
      await next()
    }

    const { _id } = ctx.request.body
    const res = remove(Post, _id)
    if (res.ok) {
      ctx.body = { ok: true, message: '删除文章成功' }
    } else {
      ctx.body = { ok: false, message: '删除文章失败' }
    }
  }

  static async findAll(ctx) {
    ctx.body = await findAll(Post, 'posts')
  }
}
