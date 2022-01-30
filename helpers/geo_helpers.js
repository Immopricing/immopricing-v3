export const parsePolygon = (stringPolygon) => {
    let polygonString = replaceAll(stringPolygon, 'POLYGON', '')
    polygonString = replaceAll(polygonString, '(', '')
    polygonString = replaceAll(polygonString, ')', '')
    return polygonString.split(',').map((coord) => {
        return new window.google.maps.LatLng(
            parseFloat(coord.split(' ')[1]),
            parseFloat(coord.split(' ')[0])
        )
    })
};

export const replaceAll = (str, find, replace) => {
    return str.split(find).join(replace)
}

export const findPostCode = (address) => {
    return address.address_components.find(c => c.types.includes('postal_code'));
}