const { REACT_APP_API } = process.env;

export default {
    getLenders() {
        return fetch(`${REACT_APP_API}/api/lender/`, {mode:'no-cors'})
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    }
}