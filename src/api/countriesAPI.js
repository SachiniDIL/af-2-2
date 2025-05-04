const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return await response.json();
};

export const getIndependentCountries = async (status) => {
    const response = await fetch(`${BASE_URL}/independent?status=${status}`);
    if (!response.ok) throw new Error('Failed to fetch independent countries');
    return await response.json();
}

export const searchByCountryName = async (countryName) => {
    const response = await fetch(`${BASE_URL}/name/${countryName}`);
    if (!response.ok) throw new Error('Failed to fetch name');
    return await response.json();
}

export const searchByFullName = async (countryName) => {
    const response = await fetch(`${BASE_URL}/name/${countryName}?fullText=true`);
    if (!response.ok) throw new Error('Failed to fetch name');
    return await response.json();
}

export const searchByCountryCode = async (countryCode) => {
    const response = await fetch(`${BASE_URL}/alpha/${countryCode}`);
    if (!response.ok) throw new Error('Failed to fetch alpha code');
    return await response.json();
}

export const searchByListOfCodes = async (countryCode) => {
    let url = `${BASE_URL}/alpha?codes=`;
    countryCode.forEach(code => {
        url += `${code};`;
    })
    const response =  await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch alpha code');
    return await response.json();
}

export const getByCurrencyCode = async (currencyCode) => {
    const response = await fetch(`${BASE_URL}/currency/${currencyCode}`);
    if (!response.ok) throw new Error('Failed to fetch currency');
    return await response.json();
}

export const getByLangCode = async (langCode) => {
    const response = await fetch(`${BASE_URL}/lang/${langCode}`);
    if (!response.ok) throw new Error('Failed to fetch lang');
    return await response.json();
}

export const  getByCapitalCity = async (capital) => {
    const response = await fetch(`${BASE_URL}/capital/${capital}`);
    if (!response.ok) throw new Error('Failed to fetch capital');
    return await response.json();
}

export const getByCallingCode = async (callingCode) => {
    const response = await fetch(`${BASE_URL}/callingcode/${callingCode}`);
    if (!response.ok) throw new Error('Failed to fetch call');
    return await response.json();
}

export const getByRegion = async (region) => {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) throw new Error('Failed to fetch region');
    return await response.json();
}

export const getByRegionalBloc = async (regionalBloc) => {
    const response = await fetch(`${BASE_URL}/regionalbloc/${regionalBloc}`);
    if (!response.ok) throw new Error('Failed to fetch region');
    return await response.json();
}

export const getBySubRegion =  async (region) => {
    const response = await fetch(`${BASE_URL}/subregion/${region}`);
    if (!response.ok) throw new Error('Failed to fetch subregion');
    return await response.json();
}

export const getByTranslation = async (translation) => {
    const response = await fetch(`${BASE_URL}/translation/${translation}`);
    if (!response.ok) throw new Error('Failed to fetch translation');
    return await response.json();
}

export const filterFields = async (fields) => {
    let url = `${BASE_URL}/all?fields=`;
    fields.forEach(field => {
        url += `${field},`;
    })
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch all data');
    return await response.json();
}