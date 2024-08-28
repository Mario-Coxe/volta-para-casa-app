import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import useHomeViewModel from '@/components/src/view-models/HomeViewModel';
import MissingPerson from '@/components/src/models/missing-person';
import { API_URL_ACESS_FILE } from '@/enviroments';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const { missingPersons, loading, error } = useHomeViewModel();

  console.log(missingPersons)

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F02A4B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar os dados.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: MissingPerson }) => {
    const imageUrls = getValidImageUrls(item);

    return (
      <View style={styles.card}>
        <Swiper
          style={styles.swiper}
          showsPagination
          activeDotColor="#F02A4B"
          loop
        >
          {imageUrls.map((imageUrl, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{ uri: `${API_URL_ACESS_FILE}${imageUrl}` }}
                style={styles.carouselImage}
                resizeMode="contain"
              />
            </View>

          ))}
        </Swiper>

        <View style={styles.details}>
          <Text style={styles.name}>
            {item.name}, {item.age} anos
          </Text>
          <Text style={styles.gender}>Gênero: {item.gender}</Text>
          <Text style={styles.location}>
            Última localização: {item.last_location}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={missingPersons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma pessoa desaparecida encontrada.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const getValidImageUrls = (item: MissingPerson): string[] => {
  return [
    item.first_photo,
    item.second_photo,
    item.third_photo,
    item.fourth_photo,
  ].filter(Boolean);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 10,
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },
  swiper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: screenWidth * 0.9,
    height: 250,
    borderRadius: 12,
  },
  details: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  gender: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    lineHeight: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 18,
    color: '#D9534F',
    textAlign: 'center',
  },
});
