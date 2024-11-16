import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  flexContainerCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    flexGrow: 1
  },
  logo: {
    width: 50,
    height: 50
  },
  repo: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  padding: {
    paddingHorizontal: 5
  }
})

const parseToText = (value) => {
  if (value >= 1000) {
    return ((value/1000).toFixed(1).toString() + 'k');
  }

  return value;
}

const RepositoryItem = ({repo}) => {
  return(
    <View style={styles.repo}>
      <View style={styles.flexContainerRow}>
        <View style={styles.padding}>
          <Image style={styles.logo} source={{uri: repo.ownerAvatarUrl}}/>
        </View>
        <View style={styles.flexContainerCol}>
          <Text fontWeight='bold'>{repo.fullName}</Text>
          <Text>{repo.description}</Text>
          <View>
            <Text color='primary'>{repo.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainerRow}>
        <View style={styles.flexContainerCol}>
          <Text>{parseToText(repo.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flexContainerCol}>
          <Text>{parseToText(repo.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flexContainerCol}>
          <Text>{parseToText(repo.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.flexContainerCol}>
          <Text>{parseToText(repo.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem;