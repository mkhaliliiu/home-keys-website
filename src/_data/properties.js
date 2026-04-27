const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'imnhlgw5',
  dataset: 'production',
  token: 'skXPrtWTmQrDAUSfhq5gAHaINRnsWxbz3VZoqyX9v2awX3dyVRVqL943nhGgm2cLojwNTtpHxsQoCS1mlDPvPmliKpQxBSaLl3PC4wNmCAvnJIlVWugZOZjfdlOggQF5rHUMDplP9xoZpBxVe9XNIEZWgvocFaYfFAMNup7vTDEJAT2wjCok',
  useCdn: false,
  apiVersion: '2024-01-01'
});

module.exports = async function() {
  const query = `*[_type == "property"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    price,
    priceLabel,
    city,
    area,
    fullAddress,
    type,
    developer,
    beds,
    baths,
    sqft,
    parking,
    floors,
    furnishing,
    ownership,
    completion,
    view,
    serviceCharges,
    description,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    tags,
    amenities,
    reference,
    rentalYield,
    goldenVisa,
    annualRent,
    capitalGrowth,
    showOnHomepage,
    showInTopProjects,
    topProjectCity
  }`;

  return client.fetch(query);
};