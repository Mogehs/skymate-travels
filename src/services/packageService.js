// src/services/packageService.js
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Fetch all packages from Firebase
 * @returns {Object} Object containing all package categories
 */
export const fetchAllPackages = async () => {
  try {
    console.log('🔍 [SERVICE] Fetching ALL packages from Firestore...');
    const querySnapshot = await getDocs(collection(db, 'packages'));
    console.log('📊 [SERVICE] Total docs in packages:', querySnapshot.size);

    const data = {};
    querySnapshot.forEach((doc) => {
      const items = doc.data().items || [];
      console.log(`📁 [SERVICE] Category: ${doc.id} | items: ${items.length}`);
      if (items.length > 0) {
        console.log('🧪 [SERVICE] Sample item:', items[0]);
      }
      data[doc.id] = items;
    });
    console.log('✅ [SERVICE] Aggregated categories:', Object.keys(data));
    return data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

/**
 * Fetch packages for a specific category
 * @param {string} category - The category name (e.g., 'top-destinations', 'best-deals')
 * @returns {Array} Array of packages for the specified category
 */
export const fetchPackagesByCategory = async (category) => {
  try {
    console.log(`🔍 Fetching packages for category: ${category}`);
    const docRef = doc(db, 'packages', category);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`✅ Found data for ${category}:`, data);
      const items = data.items || [];
      console.log(`📦 ${category} items count:`, items.length);
      return items;
    } else {
      console.log(`❌ No document found for category: ${category}`);
      return [];
    }
  } catch (error) {
    console.error(
      `🚨 Error fetching packages for category ${category}:`,
      error
    );
    throw error;
  }
};

/**
 * Fetch top destination packages
 * @returns {Array} Array of top destination packages
 */
export const fetchTopDestinations = async () => {
  return await fetchPackagesByCategory('top-destinations');
};

/**
 * Fetch best deals packages
 * @returns {Array} Array of best deals packages
 */
export const fetchBestDeals = async () => {
  return await fetchPackagesByCategory('best-deals');
};

/**
 * Fetch most searched packages
 * @returns {Array} Array of most searched packages
 */
export const fetchMostSearched = async () => {
  return await fetchPackagesByCategory('most-searched');
};

/**
 * Fetch curated packages
 * @returns {Array} Array of curated packages
 */
export const fetchCuratedPackages = async () => {
  return await fetchPackagesByCategory('curated');
};

/**
 * Fetch Umrah packages
 * @returns {Array} Array of Umrah packages
 */
export const fetchUmrahPackages = async () => {
  return await fetchPackagesByCategory('umrah');
};

// Landing: content collections
export const fetchTestimonialsContent = async () => {
  try {
    const snap = await getDocs(collection(db, 'testimonials'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('Error fetching testimonials:', e);
    return [];
  }
};

export const fetchDestinationHighlightsContent = async () => {
  try {
    const snap = await getDocs(collection(db, 'destination-highlights'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('Error fetching destination highlights:', e);
    return [];
  }
};

export const fetchDestinationsMonthContent = async () => {
  try {
    const snap = await getDocs(collection(db, 'destinations-month'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('Error fetching destinations of month:', e);
    return [];
  }
};

/**
 * Create sample best deals data for testing (temporary function)
 * @returns {Promise<void>}
 */
export const createSampleBestDeals = async () => {
  try {
    const sampleDeals = [
      {
        title: 'Tokyo, Japan',
        days: '7 Days Trip',
        price: '$2.5k',
        imageUrl:
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      },
      {
        title: 'Paris, France',
        days: '5 Days Trip',
        price: '$1.8k',
        imageUrl:
          'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
      },
      {
        title: 'Dubai, UAE',
        days: '4 Days Trip',
        price: '$1.2k',
        imageUrl:
          'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
      },
      {
        title: 'London, UK',
        days: '6 Days Trip',
        price: '$2.1k',
        imageUrl:
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
      },
    ];

    const docRef = doc(db, 'packages', 'best-deals');
    await setDoc(
      docRef,
      {
        items: sampleDeals,
      },
      { merge: true }
    );

    console.log('✅ Sample best deals created successfully!');
    return sampleDeals;
  } catch (error) {
    console.error('🚨 Error creating sample best deals:', error);
    throw error;
  }
};

/**
 * Comprehensive logging function to display all packages data
 * Call this function to see all 4 types of packages data in the console
 */
export const logAllPackagesData = async () => {
  console.log('🚀 ================ ALL PACKAGES DATA ================');

  try {
    // Fetch all data in parallel
    const [topDestinations, bestDeals, mostSearched, curatedPackages] =
      await Promise.all([
        fetchTopDestinations(),
        fetchBestDeals(),
        fetchMostSearched(),
        fetchCuratedPackages(),
      ]);

    console.log('\n📍 TOP DESTINATIONS PACKAGES:');
    console.log('   Count:', topDestinations.length);
    console.log('   Data:', topDestinations);

    console.log('\n💰 BEST DEALS PACKAGES:');
    console.log('   Count:', bestDeals.length);
    console.log('   Data:', bestDeals);

    console.log('\n🔍 MOST SEARCHED PACKAGES:');
    console.log('   Count:', mostSearched.length);
    console.log('   Data:', mostSearched);

    console.log('\n🎨 CURATED PACKAGES:');
    console.log('   Count:', curatedPackages.length);
    console.log('   Data:', curatedPackages);

    console.log('\n📊 SUMMARY:');
    console.log(
      '   Total packages across all categories:',
      topDestinations.length +
        bestDeals.length +
        mostSearched.length +
        curatedPackages.length
    );

    console.log('🏁 ================ END OF DATA ================\n');

    return {
      topDestinations,
      bestDeals,
      mostSearched,
      curatedPackages,
      totalCount:
        topDestinations.length +
        bestDeals.length +
        mostSearched.length +
        curatedPackages.length,
    };
  } catch (error) {
    console.error('🚨 Error fetching all packages data:', error);
    throw error;
  }
};

/**
 * Debug function to check Firebase connection and available data
 * @returns {Object} Debug information about Firebase collections
 */
export const debugFirebaseConnection = async () => {
  try {
    console.log('🔍 Debugging Firebase connection...');

    // Test basic connection by fetching all packages
    const querySnapshot = await getDocs(collection(db, 'packages'));
    console.log(
      '📊 Total documents in packages collection:',
      querySnapshot.size
    );

    const collections = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      collections[doc.id] = {
        exists: true,
        itemsCount: data.items ? data.items.length : 0,
        hasItems: !!(data.items && data.items.length > 0),
        sampleItem: data.items && data.items.length > 0 ? data.items[0] : null,
      };
      console.log(`📁 Collection "${doc.id}":`, collections[doc.id]);
    });

    return {
      connected: true,
      totalCollections: querySnapshot.size,
      collections,
    };
  } catch (error) {
    console.error('🚨 Firebase connection error:', error);
    return {
      connected: false,
      error: error.message,
      collections: {},
    };
  }
};
