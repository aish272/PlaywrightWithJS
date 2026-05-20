class APIUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data : this.loginPayload
            }
        );
        const responseJson = await loginResponse.json();
        const token = responseJson.token;
        return token;

    }

    async createOrder(orderPayload)
    {
        const token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers : {
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                }
            }
        )

        const orderResponseJson = await createOrderResponse.json();
        console.log(orderResponseJson);
        const orderID = orderResponseJson.orders[0];
        let response = {};
        response.orderID = orderID;
        response.token = token;
        return response;
    }
}

module.exports = {APIUtils};