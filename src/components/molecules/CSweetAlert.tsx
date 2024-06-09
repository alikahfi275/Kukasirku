import SweetAlert from 'react-native-sweet-alert';

export const AlertSuccsess = (subTitle: string) => {
  SweetAlert.showAlertWithOptions({
    title: 'Success',
    subTitle: subTitle,
    confirmButtonTitle: 'OK',
    confirmButtonColor: '#28a745', // Custom color for the confirm button
    otherButtonTitle: 'Cancel',
    otherButtonColor: '#6c757d', // Custom color for the cancel button
    style: 'success',
    cancellable: true,
  });
};

export const AlertError = (subTitle: string) => {
  SweetAlert.showAlertWithOptions({
    title: 'Error',
    subTitle: subTitle,
    confirmButtonTitle: 'OK',
    confirmButtonColor: '#28a745', // Custom color for the confirm button
    otherButtonTitle: 'Cancel',
    otherButtonColor: '#6c757d', // Custom color for the cancel button
    style: 'error',
    cancellable: true,
  });
};

export const AlertInfo = () => {
  SweetAlert.showAlertWithOptions({
    title: 'Info',
    subTitle: 'Product Berhasil Dibuat',
    confirmButtonTitle: 'OK',
    confirmButtonColor: '#28a745', // Custom color for the confirm button
    otherButtonTitle: 'Cancel',
    otherButtonColor: '#6c757d', // Custom color for the cancel button
    style: 'info',
    cancellable: true,
  });
};
