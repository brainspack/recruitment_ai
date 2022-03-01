import axios from 'axios';
import { getToken, setToken, handleInvalidToken } from 'recruitment-utils/Service.js';
const AdminInstance = axios.create();
AdminInstance.interceptors.response.use(function (response) {
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
		if (error.response.status == 500) {
			return { data: { data: "", message: "server_error", status: 500 } }
		}
		let msg = error.response.data.message;
		console.log(msg)
		if (msg == 'Unauthenticated' || msg == 'session_timeout' || msg == 'server_error' || msg == 'token_not_found') {
			handleInvalidToken();
		}

		return Promise.reject(error);
	}
});

AdminInstance.interceptors.request.use(function (config) {
	const token = getToken();
	if (token) {
		config.headers.Authorization = token;
	}

	return config;
});

const apiUrl = process.env.REACT_APP_RECRUITMENT_API;

export const getYears = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-years', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getAllYears = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/common/get-all-years', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const changePassword = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/change-password', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}
export const createYear = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/create-year', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const deleteYear = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/delete-year', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const updateYear = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-year', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getForms = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-forms', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getAllForms = async (id) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/common/get-forms-by-year/' + id,);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const createForm = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/create-form', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const deleteForm = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/delete-form', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const updateForm = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-form', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getSubjects = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-subjects', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const createSubject = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/create-subject', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const updateSubject = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-subject', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const deleteSubject = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/delete-subject', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const saveSubjectImage = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/common/upload-media', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getGroup = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-students-per-group', formData);
		console.log("response.data", response.data)
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getGroups = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-students-per-group', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const createGroup = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/create-group', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const updateGroup = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-group', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const deleteGroup = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/delete-group', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const assignClient = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/assign-client', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const createClient = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/create-client', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getClients = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-clients', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const deleteClient = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/delete-client', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getClient = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-client/' + formData.id, formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const updateClient = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-client', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getStudents = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-students', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getStudent = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-student/' + formData.id, formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const createStudent = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/create-student', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const updateStudent = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-student', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const deleteStudent = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/delete-student', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const updateProfile = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-my-profile', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const updateTerm = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/update-school-profile', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getTerm = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/school-profile', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getUserProfile = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/profile', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getAllClients = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/common/get-all-clients', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getAllTerms = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/common/get-terms', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const assignStudent = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/assign-student', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}
export const removeStudentFromGroup = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/remove-student-from-group', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}
export const getAllClientsPerGroup = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-all-clients-per-group', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}

export const removeClientFromGroup = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/remove-client-from-group', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
};

export const getTimeTable = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-timetable', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const saveTimeTableSlots = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/add-edit-timetable-slots', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getTimeTableSlots = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-timetable-slots', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const addEditTimeTable = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/add-edit-timetable', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}
export const checkTimeTableExist = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/check-timetable-exists/' + formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
}
export const searchSubjects = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/common/get-subjects', formData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
export const getAllStudentAssignedSubjects = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-students-assigned-subjects/' + formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const getAllClientAssignedSubjects = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-client-assigned-subjects/' + formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const getAllAvtars = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/common/get-all-avatars', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const assignAvtarToAdmin = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/common/assign-avatar/admin', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const getFormDetails = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-form/' + formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const getStudentByForm = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-students-by-form', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const removeStudentFromForm = async (formData) => {
	try {
		let response = await AdminInstance.post(apiUrl + '/admin/remove-student-from-form', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const moveStudentToNewGroup = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/move-students-to-new-group', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const moveStudentToNewForm = async (formData) => {
	try {
		let response = await AdminInstance.put(apiUrl + '/admin/move-students-to-new-form', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const uploadClientCSV = (file, onUploadProgress) => {
	debugger;
	let formData = new FormData();
	formData.append("file", file);
	return AdminInstance.post(apiUrl + "/admin/upload-client-csv", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress,
	});
};

export const uploadSubjectCSV = (file, onUploadProgress) => {
	debugger;
	let formData = new FormData();
	formData.append("file", file);
	return AdminInstance.post(apiUrl + "/admin/upload-subject-csv", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress,
	});
};

export const uploadStudentCSV = (file, onUploadProgress) => {
	debugger;
	let formData = new FormData();
	formData.append("file", file);
	return AdminInstance.post(apiUrl + "/admin/upload-student-csv", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress,
	});
};

export const getStudentsStatus = async (formData) => {
	try {
		let response =  await AdminInstance.get(apiUrl + "/admin/dashboard/get-student-stats");
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}

export const getClientStatus = async (formData) => {
	try {
		let response =  await AdminInstance.get(apiUrl + "/admin/dashboard/get-client-stats");
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const getYearDetails = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-year/' + formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
export const getStudentByYear = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/get-students', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}
// export const getClientTopPerformance = async (formData) => {
// 	try {
// 		let response = await AdminInstance.get(apiUrl + '/admin/dashboard/get-top-performing-clients', formData);
// 		return response.data;
// 	}
// 	catch (error) {
// 		return error.response.data;
// 	}
// }
export const getStudentTopPerformance = async (formData) => {
	try {
		let response = await AdminInstance.get(apiUrl + '/admin/dashboard/get-admin-dashboard', formData);
		return response.data;
	}
	catch (error) {
		return error.response.data;
	}
}