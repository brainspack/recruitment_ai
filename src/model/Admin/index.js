import { Action, action, thunk, Thunk } from 'easy-peasy';
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import {
  getYears,
  getAllYears,
  createYear,
  updateYear,
  deleteYear,
  getForms,
  changePassword,
  getAllForms,
  createForm,
  deleteForm,
  updateForm,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  saveSubjectImage,
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  assignClient,
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  updateProfile,
  updateTerm,
  getTerm,
  getUserProfile,
  getAllClients,
  getAllTerms,
  getTimeTable,
  saveTimeTableSlots,
  checkTimeTableExist,
  addEditTimeTable,
  assignStudent,
  removeStudentFromGroup,
  removeStudentFromForm,
  getAllClientsPerGroup,
  removeClientFromGroup,
  getTimeTableSlots,
  searchSubjects,
  getAllStudentAssignedSubjects,
  getAllClientAssignedSubjects,
  getAllAvtars,
  assignAvtarToAdmin,
  getFormDetails,
  getStudentByForm,
  moveStudentToNewGroup,
  moveStudentToNewForm,
  getStudentsStatus,
  getClientStatus,
  getStudentByYear,
  getYearDetails,
  getClientTopPerformance,
  getStudentTopPerformance
} from 'recruitment-api/AdminApi.js';



const adminModel = {
	setYears: action((state, payload) => {
		state.years = payload;
	}),
	setAllYears: action((state, payload) => {
		state.allYears = payload;
	}),
	setAllTerms: action((state, payload) => {
		state.allTerms = payload;
	}),
	setAllClients: action((state, payload) => {
		state.allClients = payload;
	}),
	setUserProfile: action((state, payload) => {
		state.userProfile = payload;
	}),
	setPreviousSelectedYear: action((state, payload) => {
		state.previousSelectedYear = payload;
	}),
	setPreviousFilterOfStudent: action((state, payload) => {
		state.previousStudentFilter = payload;
	}),
	setPreviousFilterOfClient: action((state, payload) => {
		state.previousClientFilter = payload;
	}),
	getYears: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getYears(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			  });
		} else {
			await actions.setYears(response.data);
		}
	}),
	getAllYears: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllYears(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			  });
		} else {
			await actions.setAllYears(response.data);
		}
	}),
	createYear: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createYear(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setYears(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	deleteYear: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteYear(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setYears(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	updateYear: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateYear(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setYears(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	setAllForms: action((state, payload) => {
		state.allForms = payload;
	}),
	setForms: action((state, payload) => {
		state.forms = payload;
	}),
	getAllForms: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllForms(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
		} else {
			//debugger;
			await actions.setAllForms(response.data);
		}
	}),
	getForms: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getForms(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
		} else {
			await actions.setForms(response.data);
		}
	}),
	createForm: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createForm(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setForms(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	deleteForm: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteForm(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setForms(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	updateForm: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateForm(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			await actions.setForms(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	setSubjects: action((state, payload) => {
		state.subjects = payload;
	}),
	
	setSubjectsList:action((state, payload) => {
		state.subjectsList = payload.data;
	}),

	setSubjectYearId:action((state, payload) => {
		state.subjectYearId = payload;
	}),
	
	getSubjects: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getSubjects(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
		} else {
			
			await actions.setSubjects(response.data);
			await actions.setSubjectsList(response.data);
			await actions.setSubjectYearId(payload.params.year_id);
		}
	}),

	setNewSubjectId: action((state, payload) => {
		state.newSubjectId = payload;
	}),

	createSubject: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createSubject(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			const subject = response.data.data.find(sub => sub.name === payload.name)
			if(subject){
				await actions.setNewSubjectId(subject.id);
			}
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	updateSubject: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateSubject(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	deleteSubject: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteSubject(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	
	setSubjectImage: action((state, payload) => {
		state.subjectImage = payload;
	}),


	
	saveSubjectImage: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await saveSubjectImage(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setSubjectImage(response.data.name);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return response.data.name;
		}
	}),

	setGroups: action((state, payload) => {
		state.groups = payload;
	}),
	// getGroups: thunk(async (actions, payload, { getStoreActions }) => {
	// 	let response = await getGroups(payload);
	// 	// if(response.status != 200) {
	// 	// 	toast.error(<ToastUI message={response.data.message} type={"Error"} />);
	// 	// } else {
	// 	// 	await actions.setGroups(response.data);
	// 	// }
	// }),

	setGroup: action((state, payload) => {
		state.group = payload;
	}),

	getGroup: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getGroup(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
		} else {
			await actions.setGroup(response.data);
		}
	}),

	createGroup: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createGroup(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	updateGroup: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateGroup(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	deleteGroup: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteGroup(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        		toastId: 'toast-show'
     		 });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
       			 toastId: 'toast-show'
      		});
			return true;
		}
	}),
	assignClient: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await assignClient(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	setClients: action((state, payload) => {
		state.clients = payload;
	}),

	setClient: action((state, payload) => {
		state.client = payload;
	}),
	setClientSuggestion: action((state, payload) => {
		state.clientSuggestion = payload;
	}),
	createClient: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createClient(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClients(response.data);
			actions.setClient(undefined)

			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	updateClient: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateClient(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClients(response.data);
			actions.setClient(undefined)
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	getClients: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getClients(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClients(response.data.clients);
			return true;
		}
	}),

	deleteClient: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteClient(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClients(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	getClient: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getClient(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClient(response.data);
			return true;
		}
	}),
	getClientSuggestion: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllClients(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClientSuggestion(response.data);
			return true;
		}
	}),
	setProfile: action((state, payload) => {
		state.profile = payload;
	}),

	updateProfile: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateProfile(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, { toastId: 'toast-show' });
			await actions.setUserProfile(response.data);
			return true;
		}
	}),


	setTerm: action((state, payload) => {
		state.term = payload;
	}),

	updateTerm: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateTerm(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	getTerm: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getTerm(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setTerm(response.data);
			return true;
		}
	}),


	setStudents: action((state, payload) => {
		state.students = payload;
	}),
	setStudent: action((state, payload) => {
		state.student = payload;
	}),
	getStudents: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStudents(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
		} else {
			await actions.setStudents(response.data);
		}
	}),
	createStudent: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createStudent(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	updateStudent: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateStudent(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			actions.setStudent(response.data);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	getStudent: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStudent(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setStudent(response.data);
			return response.data;
		}
	}),


	deleteStudent: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteStudent(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	getUserProfile: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getUserProfile(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setUserProfile(response.data.user);
		}
	}),
	getAllClients: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllClients();
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setAllClients(response.data);
		}
	}),
	getAllTerms: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllTerms();
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setAllTerms(response.data);
		}
	}),
	
	setTimeTable: action((state, payload) => {
		state.timetable = payload;
	}),

	getTimeTable: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getTimeTable(payload);
		//toast.dismiss();
		if(response.status != 200) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setTimeTable(response.data);
		}
	}),
	saveTimeTableSlots: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await saveTimeTableSlots(payload);
		//toast.dismiss();
		if(response.status != 200) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	addEditTimeTable:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await addEditTimeTable(payload);
		//toast.dismiss();
		if(response.status != 200) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	checkTimeTableExist:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await checkTimeTableExist(payload);
		//toast.dismiss();
		if(response.status != 200) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />);
			return false
		} else {
			
			return response.data.timetable_exists;
		}
	}),
	assignStudent:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await assignStudent(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(response.data.message)
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	removeStudentFromGroup: thunk(async (actions, payload, { getStoreActions }) => {
		//debugger;
		let response = await removeStudentFromGroup(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	removeStudentFromForm:thunk(async (actions, payload, { getStoreActions }) => {
		//debugger;
		let response = await removeStudentFromForm(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	setAllClientsPerGroup: action((state, payload) => {
		state.allClientsPerGroup = payload;
	}),
	getAllClientsPerGroup: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllClientsPerGroup(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setAllClientsPerGroup(response.data);
			return true;
		}
	}),
	removeClientFromGroup: thunk(async (actions, payload, { getStoreActions }) => {
		//;
		let response = await removeClientFromGroup(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),

	setTimeTableSlots: action((state, payload) => {
	    state.timeTableSlots = payload;
  	}),

	setSearchedSubjects: action((state, payload) => {
	    state.searchedSubjects = payload;
  	}),

	getTimeTableSlots:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getTimeTableSlots(payload);
		//toast.dismiss();
		if(response.status != 200) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        		toastId: 'toast-show'
     		});
			return false
		} else {
			await actions.setTimeTableSlots(response.data);
			return true;
		}
	}),

	searchSubjects:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await searchSubjects(payload);
		//toast.dismiss();
		if(response.status != 200) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setSearchedSubjects(response.data);
			return true;
		}
	}),
	setAllStudentAssignedSubjects: action((state, payload) => {
		state.studentAssignedSubjects = payload;
	}),
	getAllStudentAssignedSubjects: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllStudentAssignedSubjects(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setAllStudentAssignedSubjects(response.data);
			return true;
		}
	}),
	setAllClientAssignedSubjects: action((state, payload) => {
		state.clientAssignedSubjects = payload;
	}),
	getAllClientAssignedSubjects: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllClientAssignedSubjects(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setAllClientAssignedSubjects(response.data);
			return true;
		}
	}),
	setAllAvtars:action((state, payload) => {
		state.allAvtars = payload;
	}),
	getAllAvtars:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllAvtars(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setAllAvtars(response.data);
			return true;
		}
	}),
	assignAvtarToAdmin:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await assignAvtarToAdmin(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return response;
		}
	}),
	setFormDetails:action((state, payload) => {
		state.formDetails = payload;
	}),
	getFormDetails:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getFormDetails(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setFormDetails(response.data);
			return true;
		}
	}),
	setFormStudentList:action((state, payload) => {
		state.formStudentsList = payload;
	}),
	getStudentByForm:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStudentByForm(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setFormStudentList(response.data);
			return true;
		}
	}),
	moveStudentToNewGroup:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await moveStudentToNewGroup(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	moveStudentToNewForm:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await moveStudentToNewForm(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	setStudentProgressbar:action((state, payload) => {
		state.studentProgressbar = payload;
	}),
	setNewStudentData:action((state,payload)=>{
		state.newStudentData = payload
	}),
	setStudentStatus:action((state, payload) => {
		state.studentStatus = payload;
	}),
	getStudentsStatus:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStudentsStatus(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setStudentStatus(response.data);
			return true;
		}
	}),
	setClientStatus:action((state, payload) => {
		state.clientStatus = payload;
	}),
	getClientStatus:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getClientStatus(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setClientStatus(response.data);
			return true;
		}
	}),
	setYearDetails:action((state, payload) => {
		state.yearDetails = payload;
	}),
	getYearDetails:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getYearDetails(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setYearDetails(response.data);
			return true;
		}
	}),
	setYearStudentList:action((state, payload) => {
		state.yearStudentsList = payload;
	}),
	getStudentByYear:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStudentByYear(payload);
		//toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      });
			return false
		} else {
			await actions.setYearStudentList(response.data);
			return true;
		}
	}),
	setClientTopPerformance:action((state, payload) => {
		state.clientTopPerformance = payload;
	}),
	// getClientTopPerformance:thunk(async (actions, payload, { getStoreActions }) => {
	// 	let response = await getClientTopPerformance(payload);
	// 	if(!response.success) {
	// 		toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
    //     		toastId: 'toast-show'
    //  		 });
	// 		return false
	// 	} else {
	// 		await actions.setClientTopPerformance(response.data);
	// 		return true;
	// 	}
	// }),
	setStudentTopPerformance:action((state, payload) => {
		state.studentTopPerformance = payload;
	}),
	getStudentTopPerformance:thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStudentTopPerformance(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        		toastId: 'toast-show'
     		 });
			return false
		} else {
			await actions.setStudentTopPerformance(response.data);
			return true;
		}
	}),
	changePassword: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await changePassword(payload);
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"error"} />);
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return true;
		}
	})
};

export default adminModel;
