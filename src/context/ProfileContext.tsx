import { createContext, ReactNode, useState } from 'react';
import { Profile } from '../utils/types';

interface ProfileContextType {
  profileToken: string | null;
  setProfileToken: (token: string) => void;
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
  profileToken: null,
  setProfileToken: () => {},
  selectedProfile: null,
  setSelectedProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileToken, setProfileToken] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  return (
    <ProfileContext.Provider
      value={{
        profileToken,
        setProfileToken,
        selectedProfile,
        setSelectedProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
