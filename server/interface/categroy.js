import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'


let router = new Router({
    prefix: '/categroy'
})
router.get('/list', async(ctx) => {

    let {
        status,
        data: {
            areas,
            types
        }
    } = await axios.get(`${Config.requestUrl}/categroy/crumbs`, {
        params: {
            city: ctx.query.city.replace('市', '') || "北京",
            sign: Config.sign
        }
    })

    ctx.body = {
        areas: status === 200 ? areas : [],
        types: status === 200 ? types : []
    }
})
export default router