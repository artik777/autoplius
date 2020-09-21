import firebase from 'firebase/app'
import 'firebase/database'

class Ad {
  constructor (brand, title, description, price, imageSrc = '', promo = false, city, id = null) {
    this.brand = brand
    this.title = title
    this.description = description
    this.price = price
    this.imageSrc = imageSrc
    this.promo = promo
    this.city = city
    this.id = id
  }
}
export default {
  state: {
    ads: [],
    selectedItems: [],
    selectedItemCount: 0,
    filters: [],
    filters2: [],
    itemsPerPageOptions: [
      {
        count: 16,
        selected: false,
      },
      {
        count: 32,
        selected: true,
      },
      {
        count: 64,
        selected: false,
      }
    ],
    sortOptions: [
      {
        name: 'Lowest price',
        selected: true,
        sortFunction: (a, b) => (a.price > b.price ? 1 : a.price == b.price ? 0 : -1)
      },
      {
        name: 'Highest price',
        selected: false,
        sortFunction: (a, b) => a.price < b.price ? 1 : a.price == b.price ? 0 : -1
      }
    ],
    pagination: {
      currentPage: 1,
      pages: []
    },
  },
  actions: {
    async fetchAds ({commit, dispatch}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const cars =
          (
            await firebase
              .database()
              .ref('/12lE1Mgn9USYGjnjO7GRMHIICfcM48d3QGRa7msZx0N4/cars')
              .once('value')
          ).val() || {}
          const array = [];
          Object.keys(cars).forEach(key => {
            const ad = cars[key]
            array.push(
              new Ad(ad.brand, ad.title, ad.description, ad.price, ad.imageSrc, ad.promo, ad.city, key)
            );
        })
        commit('loadAds', array)
        commit('CREATE_CATEGORY_FILTERS',array);
        commit('CREATE_CATEGORY_FILTERS2',array);
        dispatch('selectItems');
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    filterItems({ commit, dispatch }, filterName) {
      commit('TOGGLE_FILTER', filterName);
      dispatch('selectItems');
    },
    filterItems2({ commit, dispatch }, filterName2) {
      commit('TOGGLE_FILTER2', filterName2);
      dispatch('selectItems');
    },
    changeItemsPerPageOption({ commit, dispatch }, itemsPerPage) {
      commit('CHANGE_ITEMS_PER_PAGE_OPTION', itemsPerPage);
      commit('SET_PAGE', 1);
      dispatch('selectItems');
    },
    changeSortOption({ commit, dispatch }, name) {
      commit('CHANGE_SORT_OPTION', name);
      dispatch('selectItems');
    },
    setPage({commit, dispatch}, page){
      commit('SET_PAGE', page);
      dispatch('selectItems');
    },
    selectItems({commit}){
      commit('SELECT_ITEMS');
      commit('SET_ITEM_COUNT');
      commit('SORT_ITEMS');
      commit('SELECT_PAGE_ITEMS');
      commit('CREATE_PAGINATION');
    }
  },
  mutations: {
    loadAds(state, array) {
      state.ads = array
    },
    CREATE_CATEGORY_FILTERS(state, payload ) {
      // state.ads = payload //perduoda is payload i state.ads viska
      state.filters = payload
      .reduce((acc, el) => acc = [...acc, el.brand], []) //istraukia is masyvo brandus
      .filter((el, i, arr) => i == arr.indexOf(el)) // kad nebutu kopiju
        .map(br => ({
          name: br,
          display: true,
          filterFunction: (el) => !el.brand.includes(br)
        }));
    },
    CREATE_CATEGORY_FILTERS2(state, payload ) {
      // state.ads = payload //perduoda is payload i state.ads viska
      state.filters2 = payload
      .reduce((acc, el) => acc = [...acc, el.city], []) //istraukia is masyvo brandus
      .filter((el, i, arr) => i == arr.indexOf(el)) // kad nebutu kopiju
        .map(br => ({
          name: br,
          display: true,
          filterFunction2: (el) => !el.city.includes(br)
        }));
    },
    SELECT_ITEMS(state) {
      let selectedItems = state.ads.slice(); // COPY ARRAY
      state.filters.forEach(({ display, filterFunction }) => { //RODO IS FILTRO
        if (!display) {
          selectedItems = selectedItems.filter(filterFunction)
        }
      })
      state.filters2.forEach(({ display, filterFunction2 }) => { //RODO IS FILTRO
        if (!display) {
          selectedItems = selectedItems.filter(filterFunction2)
        }
      })
      state.selectedItems = selectedItems;
    },
    SET_ITEM_COUNT(state){
      state.selectedItemCount = state.selectedItems.length;
    },
     TOGGLE_FILTER({ filters }, name) {
      const index = filters.findIndex(el => el.name == name)
      filters[index].display = !filters[index].display;
    },
    TOGGLE_FILTER2({ filters2 }, name) {
      const index = filters2.findIndex(el => el.name == name)
      filters2[index].display = !filters2[index].display;
    },
  
    CHANGE_ITEMS_PER_PAGE_OPTION({ itemsPerPageOptions }, itemsPerPage) {
      const index = itemsPerPageOptions.findIndex(el => el.count == itemsPerPage);
      for (let i = 0; i < itemsPerPageOptions.length; i++)
        itemsPerPageOptions[i].selected = i == index;
    },
    CHANGE_SORT_OPTION({ sortOptions }, name) {
      const index = sortOptions.findIndex(el => el.name == name);
      for (let i = 0; i < sortOptions.length; i++)
        sortOptions[i].selected = i == index;
    },
    SORT_ITEMS({ selectedItems, sortOptions }) {
      selectedItems.sort(sortOptions.find(el => el.selected).sortFunction);
    },
    SELECT_PAGE_ITEMS(state){
      const {selectedItems, pagination, itemsPerPageOptions} = state;
      const itemsPerPage = itemsPerPageOptions.find(el => el.selected).count;
      state.selectedItems = selectedItems.splice(
       itemsPerPage * (pagination.currentPage-1),
       itemsPerPage
      );
    },
    CREATE_PAGINATION({pagination, selectedItemCount, itemsPerPageOptions}){
      const itemsPerPage = itemsPerPageOptions.find(el => el.selected).count;
      const pageCount = Math.ceil(selectedItemCount/itemsPerPage);
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push({
          number: i
        })
      }
      pagination.pages = pages;
    },
    SET_PAGE({pagination}, page){
      pagination.currentPage = page;
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    getSelectedItems (state) {
      return state.selectedItems
    },
    getItemCount: ({ selectedItemCount }) => selectedItemCount,
  
   
    getFilters: ({ filters }) => filters,
    getFilters2: ({ filters2 }) => filters2,
  
    getItemsPerPageOptions: ({ itemsPerPageOptions }) => itemsPerPageOptions,
  
    getSortOptions: ({ sortOptions }) => sortOptions,
  
    getPagination: ({pagination}) => pagination,

  }
}
