import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { getMenu, MenuItem } from '../api/menu';
import { ProfileContext } from './ProfileContext';

interface MenuContextType {
  menuItems: MenuItem[];
  loading: boolean;
  refreshMenu: () => Promise<void>;
}

export const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  loading: true,
  refreshMenu: async () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const { selectedProfile } = useContext(ProfileContext);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = useCallback(async () => {
    try {
      if (!selectedProfile) {
        setMenuItems([]);
        setLoading(false);
        return;
      }
      const data = await getMenu();
      setMenuItems(data);
    } catch {
      Alert.alert('Error fetching menu', 'Please try again later.');
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }, [selectedProfile]);

  useEffect(() => {
    fetchMenu();
  }, [selectedProfile, fetchMenu]);

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        loading,
        refreshMenu: fetchMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
