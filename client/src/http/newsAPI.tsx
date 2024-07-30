import {$authHost, $host} from "./index";


export const create = async (name: string, description: string, published: Date, authorId: number): Promise<any> => {
    const { data } = await $host.post('api/news/create', {name, description, published, authorId});
    localStorage.setItem('data', data);
    return data;
  };