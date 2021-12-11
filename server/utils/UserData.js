export default class UserDto {
	constructor(model) {
			this.login = model.login;
			this.id = model._id;
			this.isActivated = model.isActivated
	}
}