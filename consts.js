const BASE_URL = 'https://test.netlify.app/';
const THANK_YOU_URL = /thank-you/;

const selectors = {
    name: '#name',
    email: '#email',
    phone: '#phone',
    company: '#company',
    website: '#website',
    employees: '#employees',
    submit: 'text=Request a call back',
};

const validDetails = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0501234567',
    company: 'Jones Ltd',
    website: 'https://jones.com',
    employees: '51-500',
};

module.exports = { BASE_URL, THANK_YOU_URL, selectors, validDetails };