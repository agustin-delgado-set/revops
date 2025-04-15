'use client'

import { createClient } from '@/lib/supabase/client';
import React, { createContext, useContext, useEffect } from 'react';
import { Users } from './components/columns';

type UsersContextType = {
  users: Users[];
  loading: boolean;
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
};

const UsersContext = createContext<undefined | UsersContextType>(undefined);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a SnippetsHotkeysProvider');
  }
  return context;
};


export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function getData(): Promise<Users[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("users")
      .select("*")

    if (error) {
      throw error
    }

    return data
  }

  useEffect(() => {
    getData().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  return (
    <UsersContext.Provider value={{ users, loading, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};