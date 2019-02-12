import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'


let router = new Router({
    prefix: '/geo'
})

router.get('/getPosition', async(ctx, next) => {
    let {
        status,
        data: {
            province,
            city
        }
    } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${Config.sign}`)
    if (status === 200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})
router.get('/menu', async(ctx) => {
    let {
        status,
        data: {
            menu
        }
    } = await axios.get(`${Config.requestUrl}/geo/menu?sign=${Config.sign}`);
    ctx.body = {
        menu: status === 200 ? menu : []
    }
})

router.get('/province', async(ctx) => {
    // let province = await Province.find();
    // console.log(province);
    // ctx.body = {
    //   province: province.map(item => {
    //     return {
    //       id: item.id,
    //       name: item.value[0]
    //     }
    //   })
    // }

    let {
        status,
        data: {
            province
        }
    } = await axios.get(`${Config.requestUrl}/geo/province?sign=${Config.sign}`)
    ctx.body = {
        province: status === 200 ? province : []
    }
})
router.get('/province/:id', async(ctx) => {
    let {
        status,
        data: {
            code,
            city
        }
    } = await axios.get(`${Config.requestUrl}/geo/province/${ctx.params.id}?sign=${Config.sign}`)
    ctx.body = {
        city: status === 200 ? city : []
    }
})
router.get('/city', async(ctx) => {
    let {
        status,
        data: {
            code,
            city
        }
    } = await axios.get(`${Config.requestUrl}/geo/city?sign=${Config.sign}`)
    ctx.body = {
        city: status === 200 ? city : []
    }
})
router.get('/hotCity', async(ctx) => {
    let {
        status,
        data: {
            hots
        }
    } = await axios.get(`${Config.requestUrl}/geo/hotCity?sign=${Config.sign}`)
    ctx.body = {
        city: status === 200 ? hots : []
    }
})
export default router;