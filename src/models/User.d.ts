type ProfileRecordType = UserRecordType & {
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn: boolean;
};

type UserRecordType = {
  id?: string;
  name?: string;
  role?: string;
  email?: string;
  isEmailVerified?: boolean;
  avatar?: string;
};

type UpdateUserBody = {
  id: string;
  password: string;
};

type UserPayloadType = {
  email: string;
  password: string;
  name: string;
};

type UserPaginateType = PaginateType & {
  results: UserRecordType[];
};

type UserParams = PaginateParams;
