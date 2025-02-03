'use client';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: GlobalContextType = {
  unreadCount: 0,
  setUnreadCount: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultContextValue);

export function GlobalProvider({ children } : { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
      </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
