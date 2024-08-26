// //BASE_URL: A constant string representing the base URL for API requests.

// const BASE_URL = "http://localhost:5001";

// //request Function: Asynchronous function that makes HTTP requests.
// export const request = async (url, method = 'GET', headers = {}, body = {}, isNotStringified = false) => {
//     let res;
//     let data;

//     try {
//         switch (method) {
//             case 'GET':
//                 res = await fetch(BASE_URL + url, { headers });
//                 break;
//             case 'POST':
//                 res = await fetch(BASE_URL + url, {
//                     headers,
//                     method,
//                     body: isNotStringified ? body : JSON.stringify(body)
//                 });
//                 break;
//             case 'PUT':
//                 res = await fetch(BASE_URL + url, {
//                     headers,
//                     method,
//                     body: JSON.stringify(body)
//                 });
//                 break;
//             case 'DELETE':
//                 res = await fetch(BASE_URL + url, { headers, method });
//                 break;
//             default:
//                 throw new Error('Unsupported request method');
//         }

//         if (!res.ok) {
//             const contentType = res.headers.get('content-type');
//             if (contentType && contentType.includes('application/json')) {
//                 data = await res.json();
//             } else {
//                 const textData = await res.text();
//                 throw new Error(`HTTP error! status: ${res.status}. Response: ${textData}`);
//             }
//             throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const contentType = res.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             data = await res.json();
//         } else {
//             data = await res.text();
//         }

//         return data;
//     } catch (error) {
//         console.error('Request failed:', error);
//         throw error;
//     }
// };

// BASE_URL: A constant string representing the base URL for API requests.
const BASE_URL = "http://localhost:5001";

// request Function: Asynchronous function that makes HTTP requests.
export const request = async (url, method = 'GET', headers = {}, body = {}, isNotStringified = false) => {
    let res;
    let data;

    try {
        // Configure the fetch options based on the HTTP method
        const options = {
            method,
            headers,
            body: ['POST', 'PUT'].includes(method) ? (isNotStringified ? body : JSON.stringify(body)) : undefined,
        };

        res = await fetch(BASE_URL + url, options);

        // Handle unsuccessful responses
        if (!res.ok) {
            const contentType = res.headers.get('content-type');
            data = contentType && contentType.includes('application/json') ? await res.json() : await res.text();
            throw new Error(`HTTP error! Status: ${res.status}. Response: ${data}`);
        }

        // Handle successful responses based on content type
        const contentType = res.headers.get('content-type');
        data = contentType && contentType.includes('application/json') ? await res.json() : await res.text();

        return data;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};
