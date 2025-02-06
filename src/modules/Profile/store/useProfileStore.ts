import {create} from 'zustand';

interface ProfileState {
  displayPhotoUrl: string;
  isBluetoothEnabled: boolean;
  connectedDevice: string;
  permissionCamera: boolean;
  permissionBluetooth: boolean;
  permissionBluetoothScan: boolean;
  showModalValidation: boolean;
  permissionLocation: boolean;
  photoBase64: string;

  setDisplayPhotoUrl: (displayPhotoUrl: string) => void;
  setIsBluetoothEnabled: (isBluetoothEnabled: boolean) => void;
  setConnectedDevice: (connectedDevice: string) => void;
  setPermissionCamera: (permissionCamera: boolean) => void;
  setPermissionBluetooth: (permissionBluetooth: boolean) => void;
  setPermissionBluetoothScan: (permissionBluetoothScan: boolean) => void;
  setShowModalValidation: (showModalValidation: boolean) => void;
  setPermissionLocation: (permissionLocation: boolean) => void;
  setPhotoBase64: (photoBase64: string) => void;
}

export const useProfileStore = create<ProfileState>(set => ({
  displayPhotoUrl: '',
  isBluetoothEnabled: false,
  connectedDevice: '',
  permissionCamera: false,
  permissionBluetooth: false,
  permissionBluetoothScan: false,
  permissionLocation: false,
  showModalValidation: false,
  photoBase64: '',

  setDisplayPhotoUrl: (displayPhotoUrl: string) => set({displayPhotoUrl}),
  setIsBluetoothEnabled: (isBluetoothEnabled: boolean) =>
    set({isBluetoothEnabled}),
  setConnectedDevice: (connectedDevice: string) => set({connectedDevice}),
  setPermissionCamera: (permissionCamera: boolean) => set({permissionCamera}),
  setPermissionBluetooth: (permissionBluetooth: boolean) =>
    set({permissionBluetooth}),
  setPermissionBluetoothScan: (permissionBluetoothScan: boolean) =>
    set({permissionBluetoothScan}),
  setPermissionLocation: (permissionLocation: boolean) =>
    set({permissionLocation}),
  setShowModalValidation: (showModalValidation: boolean) =>
    set({showModalValidation}),
  setPhotoBase64: (photoBase64: string) => set({photoBase64}),
}));
