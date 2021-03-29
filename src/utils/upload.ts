// import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {api, toast} from '../utils';
// import Colors from "../constants/Colors";
// import {IFile} from "../interfaces/i_app";
//
// export enum ECameraTypes {
//   Camera = 'camera',
//   Gallery = 'gallery'
// }
//
// export const apiUploadImage = async (type: ECameraTypes): Promise<IFile | null> => {
//   let img: IFile | null = null;
//   try {
//     if (type === 'camera') {
//       img = await Cropper.camera();
//     } else {
//       img = await Cropper.gallery();
//     }
//     return img;
//   } catch (e) {
//     toast(e.message);
//     return null;
//   }
// };
//
//
// export default class Cropper {
//   static params: Options = {
//     cropperToolbarTitle: "",
//     multiple: false,
//     cropperToolbarColor: Colors.bg,
//     cropperToolbarWidgetColor: '#ffffff',
//     cropperActiveWidgetColor: Colors.tintColor,
//     cropperStatusBarColor: Colors.bg,
//     includeBase64: true,
//     mediaType: "photo",
//     cropping: true,
//   };
//
//   static async gallery(props = {}): Promise<IFile | null> {
//     try {
//       let image = await ImagePicker.openPicker(Object.assign({...Cropper.params}, props));
//       let name = image.path.split('/').pop();
//       const response = await api('/files/upload_base64', {
//         file: {
//           name: name,
//           data: 'data:image/png;base64,' + image.data
//         }
//       });
//       return response?.[0];
//     } catch (e) {
//       console.log('ERR', e);
//       return null;
//     }
//   }
//
//   static async camera(props = {}): Promise<IFile | null> {
//     try {
//       let image = await ImagePicker.openCamera(Object.assign({...Cropper.params}, props));
//       let name = image.path.split('/').pop();
//       const response = await api('/files/upload_base64', {
//         file: {
//           name: name,
//           data: 'data:image/png;base64,' + image.data
//         }
//       });
//       return response?.[0];
//     } catch (e) {
//       return null;
//     }
//   }
// }
