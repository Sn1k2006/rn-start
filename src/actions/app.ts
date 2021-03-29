import {api} from "../utils";
import {ILanguages, ITranslates} from "../interfaces/i_app";

export const apiGetLangs = async (): Promise<ILanguages> => {
  try {
    const res = await api('/langs', {}, 'GET', true);
    return res.data;
  } catch (e) {
    throw e;
  }
}

export const apiGetTranslates = async (): Promise<ITranslates> => {
  try {
    const res = await api('/translate', {}, 'GET', true);
    return res.data;
  } catch (e) {
    throw e;
  }
};
