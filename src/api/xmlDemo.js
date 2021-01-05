import request from '@/utils/request'

export function getDataList(query) {
    return request({
        url: '/lmis-md-web/cusm/totalQuery.do',
        method: 'get',
        params: query
    })
}