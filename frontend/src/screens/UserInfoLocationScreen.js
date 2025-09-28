import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { HONG_KONG_LOCATIONS, formatLocationDisplay } from '../constants/locations';

export default function UserInfoLocationScreen({ navigation, route }) {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);

  const userData = route?.params?.userData || {};

  const handleNext = () => {
    if (!selectedDistrict) {
      Alert.alert('Required', 'Please select a district');
      return;
    }

    if (!selectedArea) {
      Alert.alert('Required', 'Please select an area');
      return;
    }

    const formattedLocation = formatLocationDisplay(selectedDistrict, selectedArea);
    
    navigation.navigate('UserInfoGoals', {
      userData: {
        ...userData,
        location: formattedLocation,
      }
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedArea(''); // Reset area when district changes
    setShowDistrictModal(false);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setShowAreaModal(false);
  };

  const getAvailableAreas = () => {
    const district = HONG_KONG_LOCATIONS.find(loc => loc.district === selectedDistrict);
    return district ? district.areas : [];
  };

  const renderDistrictItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        selectedDistrict === item.district && styles.modalItemSelected
      ]}
      onPress={() => handleDistrictSelect(item.district)}
    >
      <Text style={[
        styles.modalItemText,
        selectedDistrict === item.district && styles.modalItemTextSelected
      ]}>
        {item.district}
      </Text>
    </TouchableOpacity>
  );

  const renderAreaItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        selectedArea === item && styles.modalItemSelected
      ]}
      onPress={() => handleAreaSelect(item)}
    >
      <Text style={[
        styles.modalItemText,
        selectedArea === item && styles.modalItemTextSelected
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.stepText}>Step 4 of 5</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Where are you located?</Text>
        <Text style={styles.subtitle}>
          Help us find meal options near you
        </Text>

        <View style={styles.form}>
          {/* District Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>District</Text>
            <TouchableOpacity
              style={[
                styles.selector,
                !selectedDistrict && styles.selectorPlaceholder
              ]}
              onPress={() => setShowDistrictModal(true)}
            >
              <Text style={[
                styles.selectorText,
                !selectedDistrict && styles.selectorPlaceholderText
              ]}>
                {selectedDistrict || 'Select a district'}
              </Text>
              <Text style={styles.selectorArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Area Selection - only show if district is selected */}
          {selectedDistrict && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Area</Text>
              <TouchableOpacity
                style={[
                  styles.selector,
                  !selectedArea && styles.selectorPlaceholder
                ]}
                onPress={() => setShowAreaModal(true)}
              >
                <Text style={[
                  styles.selectorText,
                  !selectedArea && styles.selectorPlaceholderText
                ]}>
                  {selectedArea || 'Select an area'}
                </Text>
                <Text style={styles.selectorArrow}>▼</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Preview of selected location */}
          {selectedDistrict && selectedArea && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewLabel}>Selected Location:</Text>
              <Text style={styles.previewText}>
                {formatLocationDisplay(selectedDistrict, selectedArea)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* District Selection Modal */}
      <Modal
        visible={showDistrictModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDistrictModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select District</Text>
              <TouchableOpacity
                onPress={() => setShowDistrictModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={HONG_KONG_LOCATIONS}
              keyExtractor={(item) => item.district}
              renderItem={renderDistrictItem}
              style={styles.modalList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Area Selection Modal */}
      <Modal
        visible={showAreaModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAreaModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Area in {selectedDistrict}</Text>
              <TouchableOpacity
                onPress={() => setShowAreaModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={getAvailableAreas()}
              keyExtractor={(item) => item}
              renderItem={renderAreaItem}
              style={styles.modalList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#4CAF50',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    minHeight: 56,
  },
  selectorPlaceholder: {
    borderColor: '#dee2e6',
  },
  selectorText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  selectorPlaceholderText: {
    color: '#adb5bd',
  },
  selectorArrow: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 8,
  },
  previewContainer: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  previewLabel: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 4,
  },
  previewText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#6c757d',
  },
  modalList: {
    paddingHorizontal: 24,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  modalItemSelected: {
    backgroundColor: '#e8f5e8',
  },
  modalItemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  modalItemTextSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});