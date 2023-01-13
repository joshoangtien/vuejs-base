import ProductsRepository from './repositories/ProductsRepository';

const repositories = {
    products: ProductsRepository,
}
export const RepositoryFactory = {
    get: (name) => repositories[name]
}
