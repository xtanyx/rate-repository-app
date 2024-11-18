import { useState, useEffect} from 'react';
import { REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = ({principle, searchKeyword, first}) => {
  const [repositories, setRepositories] = useState();
  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  switch(principle){
    case 'highest_rated_repositories': {
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    }
    case 'lowest_rated_repositories': {
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    }
    default: {
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    }
  }

  const {data, loading, fetchMore, ...result} = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchKeyword, first}
  })

  useEffect(() => {
      if(result.data) {
        const json = result.data.repositories;
        setRepositories(json);
      }
  }, [result.data]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: orderBy,
        orderDirection: orderDirection,
        searchKeyword: searchKeyword,
        first: first
      },
    });
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch: result.refetch,
    ...result,
  };
};

export default useRepositories;