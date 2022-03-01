import { Action, action, thunk, Thunk } from 'easy-peasy';
import { ToastContainer, toast } from "react-toastify";

const classimizeModel = {
	setShowProgressBar: action((state, payload) => {
	    state.showProgressBar = payload;
  	}),
};

export default classimizeModel;
