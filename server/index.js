//const Koa = require('koa')
//const consola = require('consola')
import Koa from "koa";
import consola from "consola";
const {
    Nuxt,
    Builder
} = require('nuxt')

/*--------------------start-----------------------------*/
//添加依赖
import mongoose from "mongoose"
import bodyParser from "koa-bodyparser"
import session from "koa-generic-session"
import Redis from "koa-redis"
//json格式化
import json from "koa-json"
//数据库配置
import dbConfig from "./dbs/config"
//passport配置
import passport from "./interface/utils/passport"
//user接口
import users from "./interface/users"
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'
/*--------------------end-----------------------------*/


const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
    /*---------------------start----------------------------*/
app.keys = ["mt", "keyskeys"]
    //require
app.proxy = true
app.use(session({
    key: "mt",
    prefix: "mt:uid",
    //session借助redis存储
    store: new Redis()
}))

app.use(bodyParser({
    extendTypes: ["json", "form", "text"]
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())
    /*--------------------end-----------------------------*/
    // Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }
    /*---------------------start----------------------------*/
    app.use(users.routes()).use(users.allowedMethods())
    app.use(geo.routes()).use(geo.allowedMethods())
    app.use(search.routes()).use(search.allowedMethods())
    app.use(categroy.routes()).use(categroy.allowedMethods())
    app.use(cart.routes()).use(cart.allowedMethods())
        /*--------------------end-----------------------------*/
    app.use(ctx => {
        ctx.status = 200 // koa defaults to 404 when it sees that status is unset

        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve)
            ctx.res.on('finish', resolve)
            nuxt.render(ctx.req, ctx.res, promise => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject)
            })
        })
    })

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()