// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ID = string;
  type User = {
    _id?: ID;
    userId?: string;
    name?: string;
    front_img1?: string;
    front_img2?: string;
    back_img?: string;
    face_img?: string;
    // 审核状态 0:未审核 1:审核中 2:审核成功 3:审核失败
    verify_status?: string;
  };
  type Result<T = any> = {
    total: number;
    list: T[];
  };
}
