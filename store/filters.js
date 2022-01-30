export const state = () => ({
    houseTypes: [1, 2]
});


export const mutations = {
    setHouseTypes(state, value) {
        state.houseTypes = value;
    }
};