import axios from 'axios'

const { REACT_APP_API } = process.env;

export default {
  async getLoans() {
    try {
      const res = await axios.get(`${REACT_APP_API}/api/loan`)
      const { results } = res.data
      return results
    } catch (error) {
      console.log('error', error)
    }
  }
};
