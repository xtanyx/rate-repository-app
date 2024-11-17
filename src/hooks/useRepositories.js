import { useState, useEffect} from 'react';
import { REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const result = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
      if(result.data) {
        const json = result.data.repositories;
        setLoading(false);
        setRepositories(json);
      }
  }, [result.data]);

  return { repositories, loading, refetch: result.refetch };
};

export default useRepositories;