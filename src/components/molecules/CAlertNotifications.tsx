import {Dialog, ALERT_TYPE} from 'react-native-alert-notification';

export const modalSuccess = (textBody: string) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'SUCCESS',
    textBody: textBody,
    button: 'Close',
  });
};

export const modalError = (textBody: string) => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: 'ERROR',
    textBody: textBody,
    button: 'Close',
  });
};
