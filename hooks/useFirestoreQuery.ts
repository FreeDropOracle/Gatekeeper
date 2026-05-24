'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export function useFirestoreQuery<T>(
  fetcher: (userId: string) => Promise<T[]>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetcher(user.uid)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, ...deps]);

  return { data, loading, error, refetch: () => {
    if (!user) return;
    setLoading(true);
    fetcher(user.uid).then(setData).finally(() => setLoading(false));
  }};
}
