import Api from '../services/Api';

export interface CheckUser {
  userId: String;
}
export const checkUser = async (params: CheckUser) => {
  try {
    const data = await Api.get('/users/checkByUserId/' + params?.userId);
    return { data };
  } catch (error) {
    return { error };
  }
};

export interface UploadUserImages {
  userId: String;
  front_img1: String;
  front_img2: String;
  back_img: String;
  face_img: String;
}
export const uploadUserImages = async (params: UploadUserImages) => {
  try {
    console.log(params);
    // const data = await Api.get('/users/checkByUserId/' + params?.userId);
    return { data: true };
  } catch (error) {
    return { error };
  }
};
