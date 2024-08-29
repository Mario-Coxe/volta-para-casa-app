import React, { useEffect } from 'react';
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
import Icon from "@expo/vector-icons/Ionicons";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { formatDate } from '@/components/src/utils/date-formatter';
const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const { missingPersons, loading, error } = useHomeViewModel();

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

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
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>

        <View style={styles.details}>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {formatDate(item.created_at)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="person" size={20} color="#555" style={styles.icon} />
            <Text style={styles.name}>
              {item.name}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="location-sharp" size={20} color="#555" style={styles.icon} />
            <Text style={styles.location}>
              Última localização: {item.last_location}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="information-circle" size={20} color="#555" style={styles.icon} />
            <Text style={styles.status}>
              Status: {item.status.name}
            </Text>
          </View>
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
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 8,
    width: screenWidth * 0.95,
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
    width: screenWidth * 0.95,
    height: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'contain', // Garante que a imagem seja contida no container
  },
  details: {
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    marginRight: 8,
    color: '#555',
  },
  name: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'PoppinsBold',
  },
  gender: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
    fontFamily: 'SpaceMono', // Adiciona a fonte personalizada
  },
  location: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
    fontFamily: 'SpaceMono', // Adiciona a fonte personalizada
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
    marginBottom: 4,
    fontFamily: 'SpaceMono', // Adiciona a fonte personalizada
  },
  reportedBy: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#34495E',
    marginTop: 12,
    fontFamily: 'SpaceMono', // Adiciona a fonte personalizada
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 50,
    fontFamily: 'SpaceMono', // Adiciona a fonte personalizada
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
    fontFamily: 'SpaceMono', // Adiciona a fonte personalizada
  },
  age: {
    fontSize: 16, // Ajuste o tamanho da fonte como preferir
    color: '#7F8C8D', // Cor da fonte
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',  // Alinha o texto à direita
  },
  dateText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
});
