import { parsePolygon, replaceAll } from "../helpers/geo_helpers"
import axios from 'axios';

export const actions = {

    async getCityDetails(state, postCode) {
        const res = await axios.get(`https://geo.api.gouv.fr/communes?codePostal=${postCode}&fields=nom,code,codeDepartement,codeRegion&format=json`)
        if (res.data) {
            if (res.data.length === 1) {
                return res.data[0]
            }
            return res.data
        }
        return []
    },

    async getAddressDetails(state, address) {
        address = address.replace(', France')
        const res = await axios.get(`https://autocomplete-cloud.svc.groupe-seloger.com/api/V3.0/auto/complete/fr/32798?text=${address}`)
        if (res.data) {
            return res.data
        }
        return null
    },

    async getPolygon(state, address) {
        const addressDetails = await state.dispatch('getAddressDetails', address);
        if (addressDetails.Addresses && addressDetails.Addresses.length > 0) {
            const externalId = addressDetails.Addresses[0].Params.ExternalId
            let res = await axios.post('https://ws.lacoteimmo.com/api/LocalityV2/GetPolygonWkt', {
                LocalityType: 1,
                LocalityId: externalId
            })
            if (res.data) {
                res = res.data
            } else {
                return null
            }
            return parsePolygon(res.wkt)
        }
    }
}
