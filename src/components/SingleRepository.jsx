import { View, Pressable, FlatList } from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import * as Linking from 'expo-linking';

const styles = {
  button: {
    backgroundColor: '#0366d6',
    padding: 10,
    marginHorizontal: 10
  },
  textStyle: {
    color: 'white',
    textAlign: 'center'
  },
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  flexContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  repo: {
    backgroundColor: 'white'
  },
  separator: {
    height: 10,
  },
  ratingStyles: {
    borderRadius: 35,
    borderStyle: 'solid',
    borderColor: '#0366d6',
    borderWidth: 2,
    width: 40,
    height: 40
  }
}

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  const handleGithubUrl = async (url) => {
    await Linking.openURL(url);
  }

  return (
    <View style={styles.repo}>
      <RepositoryItem repo={repository}/>
      <Pressable style={styles.button} onPress={() => handleGithubUrl(repository.url)}>
          <Text fontWeight='bold' style={styles.textStyle}>Open in Github</Text>
      </Pressable>
    </View>
  )
};

export const ReviewItem = ({ review }) => {
  console.log('working...');
  const dateString = review.createdAt.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];
  const year = dateString.slice(0,4);
  const month = dateString.slice(5,7);
  const day = dateString.slice(8,10);
  return (
    <View style={[styles.flexContainerRow, {backgroundColor: 'white'}]}>
      <View style={[styles.flexColumnItem, styles.ratingStyles]}>
        <Text color='primary' fontSize='subheading' style={{textAlign: 'center'}}>{review.rating}</Text>
      </View>
      <View style={[styles.flexContainerColumn, styles.flexColumnItem]}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text>{day + '.' + month + '.' + year}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;



const SingleRepository = ({repo, fetchMore}) => {
  if(!repo) {
    return null;
  }

  const reviews = repo.reviews.edges.map(edge => edge.node);
  console.log(reviews);

  const onEndReach = () => {
    console.log('end of list');
    fetchMore();
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repo} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
    />
  );
};

export default SingleRepository;