import axios from 'axios'

export const getCityDetails = async (postCode) => {
  const res = await axios.get(`https://geo.api.gouv.fr/communes?codePostal=${postCode}&fields=nom,code,codeDepartement,codeRegion&format=json`)
  if (res.data) {
    if (res.data.length === 1) {
      return res.data[0]
    }
    return res.data
  }
  return []
}

export const getAddressDetails = async (address) => {
  address = address.replace(', France')
  const res = await axios.get(`https://autocomplete-cloud.svc.groupe-seloger.com/api/V3.0/auto/complete/fr/32798?text=${address}`)
  if (res.data) {
    return res.data
  }
  return null
}

export const getPolygon = async (address) => {
  const addressDetails = await getAddressDetails(address)
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

const parsePolygon = (stringPolygon) => {
  let polygonString = replaceAll(stringPolygon, 'POLYGON', '')
  polygonString = replaceAll(polygonString, '(', '')
  polygonString = replaceAll(polygonString, ')', '')
  return polygonString.split(',').map((coord) => {
    return new window.google.maps.LatLng(
      parseFloat(coord.split(' ')[1]),
      parseFloat(coord.split(' ')[0])
    )
  })
}

const replaceAll = (str, find, replace) => {
  return str.split(find).join(replace)
}
