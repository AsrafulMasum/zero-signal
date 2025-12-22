export const queryParmasBuilder = (params: Record<string, any>) => {

    const query = new URLSearchParams(params);
    return query.toString();
    
};