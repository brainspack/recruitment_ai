import { Action, action, thunk, Thunk } from 'easy-peasy';
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";

import {
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  submitOTP,
  resendOTP
} from 'recruitment-api/AuthApi.js';



const authenticationModel = {
	setToken: action((state, payload) => {
	    state.token = payload;
  	}),
	logoutUser: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await logoutUser(payload);
		if(!response.success) {
			console.log(response.data.message);
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	browserDATA : action ((state,payload)=>{
		localStorage.setItem('isLoggedIn', "true");
		localStorage.setItem('loggedInUser', JSON.stringify(payload));
		localStorage.setItem('session', JSON.stringify(Date.now() + 3600000))
	}),

	loginUser: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await loginUser(payload);
		console.log(response);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			localStorage.setItem('api_token', response.data.token);
			//toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return response.data;
		}
	}),
	submitOTP: thunk(async(actions, payload, {getStoreActions}) => {
		let response = await submitOTP(payload);
		toast.dismiss();
		if (response.status !== 200){
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			  })
					return false
		}
		else {
			//toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return true;
		}
	}),

	resendOTP: thunk(async(actions, payload, {getStoreActions}) => {
		let response = await resendOTP(payload);
		toast.dismiss();
		if (!response.success){
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			  })
					return false
		}
		else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return true;
		}
	}),
	forgetPassword: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await forgetPassword(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	resetPassword: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await resetPassword(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	})
};

export default authenticationModel;
