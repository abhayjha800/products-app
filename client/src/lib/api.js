import api from "./axios";

// users api
export const syncUser = async (userData) => {
    const { data } = await api.post('/users/sync', userData);
    return data;
};

// products api
export const getAllProducts = async () => {
    const { data } = await api.get('/products');
    return data;
};

export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const getUserProducts = async () => {
    const { data } = await api.get('/products/user');
    return data;
}

export const createProduct = async (productData) => {
    const { data } = await api.post('/products', { productData });
    return data;
}

export const updateProduct = async (id, productData) => {
    const { data } = await api.put(`/products/${id}`, { productData });
    return data;
}

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}

//comments api
export const createComment = async (productId, content) => {
    const { data } = await api.post(`/comments/${productId}`, { content });
    return data;
}

export const deleteComment = async (id) => {
    const { data } = await api.delete(`/comments/${id}`);
    return data;
}