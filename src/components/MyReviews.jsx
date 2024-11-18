import { useMutation, useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"
import { Alert, FlatList, Pressable, View } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { DELETEREVIEW } from "../graphql/mutations";

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
    paddingHorizontal: 5,
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

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  console.log('working...');
  const [mutate, data] = useMutation(DELETEREVIEW);
  const dateString = review.createdAt.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];
  const year = dateString.slice(0,4);
  const month = dateString.slice(5,7);
  const day = dateString.slice(8,10);

  const handleViewRepository = () => {
    navigate(`/${review.repositoryId}`);
  }

  const handleDeleteReview = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        onPress: () => {}
      },
      {
        text: 'OK',
        onPress: async () => {
          await mutate({variables: {id: review.id}});
          await refetch({includeReviews: true});
        }
      }
    ]);
    
  }

  return (
    <View>
      <View style={[styles.flexContainerRow, {backgroundColor: 'white'}]}>
        <View style={[styles.flexColumnItem, styles.ratingStyles]}>
          <Text color='primary' fontSize='subheading' style={{textAlign: 'center'}}>{review.rating}</Text>
        </View>
        <View style={[styles.flexContainerColumn]}>
          <Text fontWeight='bold'>{review.repository.fullName}</Text>
          <Text>{day + '.' + month + '.' + year}</Text>
          <Text style={[{paddingRight: 5}]}>{review.text}</Text>
        </View>
      </View>
      <View style={[styles.flexContainerRow, {backgroundColor: 'white'}]}>
        <Pressable onPress={handleViewRepository} style={styles.button}>
          <Text style={[{color: 'white'}]}>View repository</Text>
        </Pressable>
        <Pressable onPress={handleDeleteReview} style={[styles.button, {backgroundColor: 'red'}]}>
          <Text style={[{color: 'white'}]}>Delete review</Text>
        </Pressable>
      </View>
    </View>
    
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const {loading, error, data, refetch} = useQuery(ME, {
    variables: {
      includeReviews: true
    }
  });

  if(loading || !data) {
    return null;
  }

  console.log(data.me)
  if(data){
    const reviews = data.me !== null ? data.me.reviews.edges.map(edge => edge.node) : [];
    console.log(reviews);
    return(
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
}

export default MyReviews