import axios from 'axios'

const { REACT_APP_API } = process.env;

export default {
  async getLenders() {
    try {
      const res = await axios.get(`${REACT_APP_API}/api/lender`)
      const { results } = res.data
      return results
    } catch (error) {
      console.log('error', error)
    }
  }
};
