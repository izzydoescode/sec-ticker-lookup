export interface User {
	id: number;
	name: string;
	email: string;
}

export interface UserCreateRequest {
	name: string;
	email: string;
}
