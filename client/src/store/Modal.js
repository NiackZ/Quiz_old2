import { makeAutoObservable } from "mobx";

export default class Modal{
	
	show = false
	modalFocus = 'login-tab'

	constructor(){
		makeAutoObservable(this)
	}

	setShow(bool){
		this.show = bool
	}

	setModalFocus(string){
		this.modalFocus = string
	}

}