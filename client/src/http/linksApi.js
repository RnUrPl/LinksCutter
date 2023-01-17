import { $host, $authHost } from '../http/index'

const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
}

export const generateLink = async ({from}) =>{
    const {data} = await $authHost.post(
        'api/link/generate',
        {from},
        config
    )
    return data
}

export const getLinkById = async (linkId) =>{
    const {data} = await $authHost.get(
        `api/link/${linkId}`,
        config
    )
    return data
}

export const getAllLinks = async () => {
    const {data} = await $authHost.get(
        'api/link/getAll',
        config
    )
    return data
}

