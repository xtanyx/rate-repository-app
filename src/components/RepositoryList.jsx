import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate, useParams } from 'react-router-native';
import { REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import SingleRepository from './SingleRepository';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repo: {
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 10,
    marginHorizontal: 10
  },
  textStyle: {
    color: 'white',
    textAlign: 'center'
  }
});

const SelectPrinciple = ({principle, setPrinciple}) => {
  return (
    <Picker selectedValue={principle} onValueChange={(itemValue, itemIndex) => setPrinciple(itemValue)}>
      <Picker.Item label='Latest repositories' value='latest_repositories'/>
      <Picker.Item label='Highest rated repositories' value='highest_rated_repositories'/>
      <Picker.Item label='Lowest rated repositories' value='lowest_rated_repositories'/>
    </Picker>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    const props = this.props

    return (
      <>
        <TextInput
          style={[{backgroundColor: 'white', padding: 10, margin: 10}]}
          placeholder='search'
          value={props.searchKeyword}
          onChangeText={props.setSearchKeyword}
        />
        <SelectPrinciple principle={props.principle} setPrinciple={props.setPrinciple}/>
      </>
    )
  }

  repositoryNodes = () => this.props.repositories
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];

  singleRepo = () => this.props.result.data
    ? this.props.result.data.repository
    : undefined

  render () {
    return (
      <>
        {
          !this.props.id
            ? <FlatList
                data={this.repositoryNodes()}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => (
                  <Pressable onPress={() => this.props.handleOnPress(item.id)}>
                    <RepositoryItem repo={item}/>
                  </Pressable>
                )}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader()}
                onEndReached={this.props.onEndReach}
                onEndReachedThreshold={0.5}
              />
            : <SingleRepository repo={this.singleRepo()} fetchMore={this.props.fetchMore}/>
        }
      </>
    );
  }
}

const RepositoryList = () => {
  const [principle, setPrinciple] = useState('latest_repositories');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [value] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();
  const id = useParams().id;
  const {repositories, fetchMore} = useRepositories({principle, value, first: 7});
  const result = useQuery(REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {id, first: 5}
  })

  const handleOnPress = (id) => {
    navigate(`/${id}`);
  }

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  }

  const handleFetchMore = () => {
    const canFetchMore = !result.loading && result.data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    console.log('fetching...');
    result.fetchMore({
      variables: {
        after: result.data.repository.reviews.pageInfo.endCursor,
        id: id,
        first: 1
      },
    });
  }

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      result={result} 
      id={id}
      handleOnPress={handleOnPress}
      principle={principle}
      setPrinciple={setPrinciple}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
      fetchMore={handleFetchMore}
    />
  );
};

export default RepositoryList;