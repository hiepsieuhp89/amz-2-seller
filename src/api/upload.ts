import axios from "axios";
import { httpPostWithConfig } from "./axios";

export const stringToSlug = (str: string) => {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  return str.toLocaleLowerCase();
};

export const uploadFileAttachment = async (file: any, callback?: (param: any) => void): Promise<any> => {
  const formData = new FormData();

  formData.append("file", file, stringToSlug(file.name));

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const res = await httpPostWithConfig(`/v1/files/upload/`, formData, {
    headers,
    onUploadProgress(progressEvent) {
      if (callback) {
        callback(progressEvent);
      }
    },
  });

  return res;
};
