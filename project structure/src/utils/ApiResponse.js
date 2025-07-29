class ApiResponse{
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode
        this.ApiResponse = ApiResponse
        this.data=data
        this.message=message
        this.success = statusCode <400
    }
}

export {ApiResponse}