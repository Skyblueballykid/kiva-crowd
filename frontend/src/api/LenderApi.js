import API from './API';

async function getLenders() {
  try {
    const res = await API.get('/api/lender/')
    const { results } = res.data
    return results
  } catch (error) {
    console.log('error', error)
  }
}

export default getLenders;
