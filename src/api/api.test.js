import { getCategories, getProducts } from '../api/generic';
it('fetches categories', () => {
    getCategories().then(data => expect(data.categories).toBeGreaterThan(0));
});

it('get products', () => {
    getProducts().then(data => expect(data.products).toBeGreaterThan(0));
});