import Router from "koa-router";
import Config from '../dbs/config';
import axios from "./utils/axios"
import Poi from "../dbs/models/poi"
const router = new Router({
    prefix: '/search'
})

router.get('/top', async(ctx) => {
    // console.log('ctx.query.input,ctx.query.city', ctx.query.input, ctx.query.city);
    let {
        status,
        data: {
            top
        }
    } = await axios.get(`${Config.requestUrl}/search/top`, {
        params: {
            input: ctx.query.input,
            city: ctx.query.city,
            sign: Config.sign
        }
    })
    ctx.body = {
        top: status === 200 ? top : []
    }
})
router.get('/hotPlace', async(ctx) => {
    let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
    let {
        status,
        data: {
            result
        }
    } = await axios.get(`${Config.requestUrl}/search/hotPlace`, {
        params: {
            city: city,
            sign: Config.sign
        }
    })
    ctx.body = {
        result: status === 200 ? result : []
    }
})

router.get('/resultsByKeywords', async(ctx) => {
    const {
        city,
        keyword
    } = ctx.query;
    let {
        status,
        data: {
            count,
            pois
        }
    } = await axios.get(`${Config.requestUrl}/search/resultsByKeywords`, {
        params: {
            city,
            keyword,
            sign: Config.sign
        }
    })
    ctx.body = {
        count: status === 200 ? count : 0,
        pois: status === 200 ? pois : []
    }
})
router.get('/products', async(ctx) => {
    let {
        keyword,
        city
    } = ctx.query
    let {
        status,
        data: {
            product,
            more
        }
    } = await axios.get(`${Config.requestUrl}/search/products`, {
        params: {
            keyword,
            city,
            sign: Config.sign
        }
    })
    if (status === 200) {
        ctx.body = {
            product,
            more: ctx.isAuthenticated() ? more : [],
            login: ctx.isAuthenticated()
        }
    } else {
        ctx.body = {
            product: {},
            more: ctx.isAuthenticated() ? more : [],
            login: ctx.isAuthenticated()
        }
    }
})
export default router