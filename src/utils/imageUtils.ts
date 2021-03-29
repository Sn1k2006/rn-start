import {HOST} from "./api";
import {IFile} from "../interfaces/i_app";

type TQuality = 'path_768' | 'path_1080' | 'path_1334' | 'path_1920'

export const addHostToPath = (image: IFile | string | undefined, maxQuality?: number, needAddHost: boolean = true): void | null | string => {
  if (!image) return null;
  let path = '';
  if (typeof image === 'string') {
    path = image;
  } else {
    if (maxQuality) {
      const listQuality = [768, 1080, 1334, 1920];
      listQuality.every(q => {
        //@ts-ignore
        let key: TQuality = `path_${q}`;
        if (maxQuality < q) {
          path = image[key] || image.path;
          return false;
        }

      })
    }
    if (!path) path = (image.path_768 || image.path_1080 || image.path_1334 || image.path);
  }
  if (needAddHost) path = HOST + (path);
  return path;
};