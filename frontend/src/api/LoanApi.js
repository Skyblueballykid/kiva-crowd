import API from './API';

async function getLoans() {
  try {
    const res = await API.get('/api/loan/');
    const { results } = res.data;
    return results;
  } catch (error) {
    console.log('error', error);
  }
}

export default getLoans;
