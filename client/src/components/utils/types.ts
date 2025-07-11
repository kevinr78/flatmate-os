export type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  };
};

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface HouseForm {
  name: string;
  inviteList: string[];
}

export interface HouseResponse {
  success: boolean;
  data: {
    house: {
      id: string;
      name: string;
      members: {
        id: string;
        name: string;
        email: string;
      }[];
    };
  };
}
