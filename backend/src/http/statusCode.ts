export const ok = (data: unknown) => {
    return {
        body: data,
        statusCode: 200
    }
}

export const created = (data: unknown) => {
    return {
        body: data,
        statusCode: 201
    }
}

export const badRequest = (error: string) => {
    return {
        body: {data: {error}},
        statusCode: 400
    }
}

export const NotFound = (error: string) => {
    return {
        body: {data: {error}},
        statusCode: 404
    }
}

export const ServerError = (error: string) => {
    return {
        body: {data: {error}},
        statusCode: 500
    }
}