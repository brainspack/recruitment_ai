import axios from 'axios';
import { getToken, setToken, handleInvalidToken } from 'recruitment-utils/Service.js';
const AuthInstance = axios.create();
AuthInstance.interceptors.response.use(function (response) {
	if (response.headers) {
		//localStorage.setItem('api_token', response.headers.api_token);
	}

	let msg = response.data.message;
	// console.log(msg)
	if (msg == 'Unauthenticated' || msg == 'session_timeout' || msg == 'server_error' || msg == 'token_not_found') {
		handleInvalidToken();
	}
	return response;
}, function (error) {
	if (!error.response) {
		return { data: { data: "", message: "server_error", status: 500 } }
	} else {
		if (error.response.status == 400) {
			return { data: { data: "", message: error.response.data.message, status: error.response.status } }
		}

		return Promise.reject(error);
	}
});

AuthInstance.interceptors.request.use(function (config) {
	const token = getToken();
	if (token) {
		config.headers.Authorization = token;
	}

	return config;
});

const apiUrl = process.env.REACT_APP_RECRUITMENT_API;

export const loginUser = async (formData) => {
	try {
		let response = await AuthInstance.post(apiUrl + '/auth/login', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const submitOTP = async(formData) => {
	try{
		let response = await AuthInstance.post(apiUrl + '/verify_otp' , formData)
		return response.data
	}
	catch(error){
		return error.response.data
	}
};

export const resendOTP = async(formData) => {
	try{
		let response = await AuthInstance.post(apiUrl + '/resend_otp' , formData)
		return response.data
	}
	catch(error){
		return error.response.data
	}
};

export const logoutUser = async (formData) => {
	try {
		let response = await AuthInstance.post(apiUrl + '/auth/logout', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const forgetPassword = async (formData) =>{
	try {
		let response = await AuthInstance.post(apiUrl + '/admin/forgot-password',formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}
export const resetPassword = async (formData) =>{
	try {
		let response = await AuthInstance.post(apiUrl + '/admin/reset-password',formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}