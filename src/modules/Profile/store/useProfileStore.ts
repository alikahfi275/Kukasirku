import { create } from 'zustand';

interface ProfileState {
    displayPhotoUrl: string;

    setDisplayPhotoUrl: (displayPhotoUrl: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    displayPhotoUrl: '',

    setDisplayPhotoUrl: (displayPhotoUrl: string) => set({ displayPhotoUrl }),
}))