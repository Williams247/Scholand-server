const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.paystack.co"
});

instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = instance;
